# Project Rules

## Aturan yang wajib diikuti

- **DILARANG KERAS** menggunakan akun GitHub apa pun yang tersimpan di laptop ini (credential, token, SSH key, ataupun akun yang sudah login).
- **Dilarang** menjalankan perintah `git push`, `git pull`, `git fetch`, `git clone`, ataupun operasi remote GitHub lainnya yang memerlukan otentikasi akun GitHub.
- **Dilarang** menggunakan perintah `gh` (GitHub CLI), `git credential`, atau tool lain yang mengakses kredensial GitHub.
- **Dilarang** membaca, menyalin, atau mengunggah credential/token GitHub dari konfigurasi git lokal (`~/.gitconfig`, `~/.ssh`, git credential store).
- Operasi git yang diperbolehkan hanya bersifat lokal sepenuhnya tanpa otentikasi GitHub (misalnya `git status`, `git diff`, `git add`, `git commit`).
- Jangan membuat, mengubah, atau menjalankan workflow/deploy apa pun yang menargetkan GitHub.