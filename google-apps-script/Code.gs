/**
 * Wedding Invitation - Apps Script back-end
 *
 * Setup:
 * 1. Buat 1 Google Spreadsheet. Rename sheet pertama menjadi "RSVP" dan
 *    tambah sheet kedua bernama "GUESTBOOK".
 * 2. Isi header baris 1:
 *    - Sheet "RSVP"     : Timestamp | Nama | Jumlah Tamu | Kehadiran | Pesan
 *    - Sheet "GUESTBOOK": Timestamp | Nama | Ucapan
 * 3. Buka menu Extensions > Apps Script, tempel seluruh isi file ini, lalu Save.
 * 4. Deploy > New deployment > Web app:
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Salin URL Web App dan taruh di src/config.ts (variable APP_SCRIPT_URL).
 *
 * Endpoint yang dipakai frontend:
 *   - POST { action: "rsvp",      ... } -> tulis ke sheet RSVP
 *   - POST { action: "guestbook", ... } -> tulis ke sheet GUESTBOOK
 *   - GET  ?action=guestbook            -> balas JSON daftar ucapan & doa
 */

// Jika script BUKAN terikat (bound) ke spreadsheet, isi ID spreadsheet di sini.
// Jika bound, biarkan kosong / "ACTIVE".
const SPREADSHEET_ID = 'ACTIVE';

// Token rahasia untuk membatasi akses. WAJIB sama dengan token di src/config.ts.
// Ganti bebas dengan kombinasi huruf/angka sesukamu lalu sesuaikan keduanya.
const SECRET_TOKEN = 'wedding-undangan-2026';

function authorize_(params) {
  // Token diterima via body (POST) atau parameter (GET).
  const token = (params && params.token) || (params && params.t);
  if (token !== SECRET_TOKEN) {
    throw new Error('Akses ditolak.');
  }
}

function getSpreadsheet_() {
  return SPREADSHEET_ID === 'ACTIVE'
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(SPREADSHEET_ID);
}

/**
 * Jalankan fungsi ini satu kali dari editor Apps Script (Run > ensureSheets).
 * Membuat otomatis sheet "RSVP" dan "GUESTBOOK" beserta header baris 1
 * jika belum ada. List semuanya lewat menu Extensions > Apps Script,
 * lalu pilih function ensureSheets dan klik Run.
 */
function ensureSheets() {
  const ss = getSpreadsheet_();

  createSheetIfMissing_(ss, 'RSVP', ['Timestamp', 'Nama', 'Jumlah Tamu', 'Kehadiran', 'Pesan']);
  createSheetIfMissing_(ss, 'GUESTBOOK', ['Timestamp', 'Nama', 'Ucapan']);

  Logger.log('Sheet siap.');
}

function createSheetIfMissing_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  const last = sheet.getLastRow();
  if (last === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  }
}

function json_(payload, status) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function ok_(message, data) {
  return json_({ ok: true, message: message, data: data || null });
}

function fail_(message) {
  return json_({ ok: false, message: message }, 500);
}

function appendRow_(sheetName, values) {
  const sheet = getSpreadsheet_().getSheetByName(sheetName);
  if (!sheet) throw new Error('Sheet "' + sheetName + '" tidak ditemukan.');
  sheet.appendRow(values);
}

function doPost(e) {
  try {
    ensureSheets();
    const params = JSON.parse(e.postData.contents);
    authorize_(params);
    const now = new Date();

    if (params.action === 'rsvp') {
      appendRow_('RSVP', [
        now,
        params.name || '',
        params.guests || '1',
        params.attendance || 'yes',
        params.message || ''
      ]);
      return ok_('Konfirmasi kehadiran berhasil tercatat.');
    }

    if (params.action === 'guestbook') {
      appendRow_('GUESTBOOK', [
        now,
        (params.name || '').toString().trim(),
        (params.text || '').toString().trim()
      ]);
      return ok_('Ucapan & doa berhasil dikirim.');
    }

    return fail_('Aksi tidak dikenal.');
  } catch (err) {
    return fail_('Gagal menyimpan: ' + err.message);
  }
}

function doGet(e) {
  try {
    ensureSheets();
    authorize_(e.parameter);
    if (!e.parameter || e.parameter.action !== 'guestbook') {
      return fail_('Aksi tidak dikenal.');
    }

    const sheet = getSpreadsheet_().getSheetByName('GUESTBOOK');
    if (!sheet) return ok_('', []);

    const values = sheet.getDataRange().getValues();
    const messages = [];

    // Lewati baris header (baris 1)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const name = (row[1] || '').toString().trim();
      const text = (row[2] || '').toString().trim();
      if (!name || !text) continue;

      const ts = row[0] ? new Date(row[0]) : null;
      messages.push({
        name: name,
        text: text,
        date: ts ? ts.toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''
      });
    }

    // Terbaru dulu
    messages.reverse();
    return ok_('', messages);
  } catch (err) {
    return fail_('Gagal memuat: ' + err.message);
  }
}