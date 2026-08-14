export interface Theme {
  slug: string
  name: string
  desc: string
  heroImage: string
  couple: string
  date: string
  rsvpDeadline: string
  groom: { name: string; parents: string; ig: string }
  bride: { name: string; parents: string; ig: string }
}

const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

export const THEMES: Theme[] = [
  {
    slug: 'simple-wedding',
    name: 'Simple Wedding',
    desc: 'Elegan dark gold, cocok untuk undangan modern.',
    heroImage: asset('/hero-bg.jpg'),
    couple: 'Ahmad & Fatimah',
    date: 'Sabtu, 12 September 2026',
    rsvpDeadline: '1 September 2026',
    groom: { name: 'Ahmad Fauzan', parents: 'Putra dari Bpk. H. Supriyadi & Ibu Hj. Maryam', ig: '@ahmadfauzan' },
    bride: { name: 'Fatimah Az-Zahra', parents: 'Putri dari Bpk. H. Abdullah & Ibu Hj. Khadijah', ig: '@fatimah_azzahra' },
  },
  {
    slug: 'timeless',
    name: 'Timeless',
    desc: 'Abadi dan mewah dengan nuansa navy keemasan.',
    heroImage: asset('/akhmad-jazuli-AF-60rjVslY-unsplash.jpg'),
    couple: 'Raka & Nadia',
    date: 'Sabtu, 19 September 2026',
    rsvpDeadline: '8 September 2026',
    groom: { name: 'Raka Pradana', parents: 'Putra dari Bpk. H. Joko Susilo & Ibu Hj. Sri Rahayu', ig: '@rakapradana' },
    bride: { name: 'Nadia Ayu', parents: 'Putri dari Bpk. H. Bambang Waluyo & Ibu Hj. Retno Palupi', ig: '@nadiaayu' },
  },
  {
    slug: 'romantic',
    name: 'Romantic',
    desc: 'Nuansa romantis burgundy yang hangat dan lembut.',
    heroImage: asset('/akhmad-jazuli-L56JtZ4HgBk-unsplash.jpg'),
    couple: 'Bima & Aulia',
    date: 'Minggu, 27 September 2026',
    rsvpDeadline: '16 September 2026',
    groom: { name: 'Bima Sakti', parents: 'Putra dari Bpk. H. Dedi Kurniawan & Ibu Hj. Lilis Suryani', ig: '@bimasakti' },
    bride: { name: 'Aulia Rahman', parents: 'Putri dari Bpk. H. Yusuf Hamdani & Ibu Hj. Siti Aminah', ig: '@auliarahman' },
  },
  {
    slug: 'bloom',
    name: 'Bloom',
    desc: 'Fresh floral dengan sentuhan emerald yang segar.',
    heroImage: asset('/annie-spratt-OWq8w3BYMFY-unsplash.jpg'),
    couple: 'Dimas & Sekar',
    date: 'Sabtu, 3 Oktober 2026',
    rsvpDeadline: '22 September 2026',
    groom: { name: 'Dimas Anggara', parents: 'Putra dari Bpk. H. Agus Salim & Ibu Hj. Rina Marlina', ig: '@dimasanggara' },
    bride: { name: 'Sekar Arum', parents: 'Putri dari Bpk. H. Wibowo Saputra & Ibu Hj. Dewi Lestari', ig: '@sekararum' },
  },
  {
    slug: 'midnight',
    name: 'Midnight',
    desc: 'Elegan gelap dengan aksen biru malam berkilau.',
    heroImage: asset('/hero-bg.jpg'),
    couple: 'Farhan & Aisyah',
    date: 'Sabtu, 10 Oktober 2026',
    rsvpDeadline: '29 September 2026',
    groom: { name: 'Farhan Maulana', parents: 'Putra dari Bpk. H. Rudi Hartono & Ibu Hj. Nurhayati', ig: '@farhanmaulana' },
    bride: { name: 'Aisyah Putri', parents: 'Putri dari Bpk. H. Zainal Abidin & Ibu Hj. Halimah', ig: '@aisyahputri' },
  },
]

export const getTheme = (slug?: string): Theme =>
  THEMES.find((t) => t.slug === slug) ?? THEMES[0]
