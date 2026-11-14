# Pusattraining

Portal informasi program dan jadwal training dari berbagai bidang dan penyelenggara. Dibangun dengan Astro dan Tailwind CSS v4.

## Persyaratan

- Node.js 22.12.0 atau lebih baru
- npm 10 atau lebih baru

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Astro (umumnya `http://localhost:4321`).

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run check` | Memeriksa tipe dan komponen Astro |
| `npm run build` | Menjalankan pemeriksaan lalu membuat production build |
| `npm run preview` | Meninjau hasil production build secara lokal |

## Struktur utama

```text
src/
├── blocks/       # Section halaman yang dirangkai dari komponen
├── components/   # Komponen shared, content, training, schedule
├── layouts/      # Site layout dan metadata halaman
├── pages/        # File-based routes Astro
└── styles/       # Tailwind entry, design tokens, component layer
public/           # Aset statis
docs/             # Dokumentasi arsitektur dan design system
```

## Styling

Tailwind CSS v4 menggunakan plugin resmi `@tailwindcss/vite`. Entry stylesheet ada di `src/styles/global.css`, dengan urutan:

1. Tailwind CSS
2. Semantic color tokens dari `tokens.css`
3. Component layer dari `components.css`

Tidak menggunakan `@astrojs/tailwind` atau konfigurasi Tailwind v3. Komponen tetap memakai utility Tailwind dan semantic class names.

## Routes awal

- `/` — homepage portal
- `/training/` — katalog training (menunggu data program)
- `/jadwal/` — indeks jadwal (menunggu data batch)
- `/tentang/` — informasi portal
- `/kontak/` — halaman kontak (detail kanal menunggu konfirmasi)

Halaman katalog dan jadwal sengaja menampilkan empty state, bukan data training atau batch rekaan. Data program, penyelenggara, jadwal, dan URL produksi perlu diisi setelah sumber datanya ditetapkan.

## Konfigurasi sebelum produksi

1. Tetapkan domain produksi pada opsi `site` di `astro.config.mjs` agar canonical URL dapat dihasilkan.
2. Ganti informasi kontak dan identitas footer setelah data resmi tersedia.
3. Tambahkan data katalog dan batch dari sumber penyelenggara.
4. Tambahkan aset foto yang dimiliki atau berlisensi untuk digunakan.

## Dokumentasi

- `docs/DESIGN-SYSTEM-REFERENCE.md`
- `docs/COLOR-SYSTEM.md`
- `docs/COMPONENT-BLOCK-INVENTORY.md`
- `docs/ASTRO-SCAFFOLD.md`
