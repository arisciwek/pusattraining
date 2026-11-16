# Implementasi Content Collections dan Katalog Awal

**Branch:** `content/initial-training-catalog`  
**Status:** fondasi schema dan route awal ditambahkan; build lokal masih harus diverifikasi setelah branch di-pull.

## 1. Collection yang tersedia

Konfigurasi ada di `src/content.config.ts` menggunakan Content Layer API Astro dan `glob` loader.

| Collection | Folder | Tujuan |
|---|---|---|
| `pages` | `src/content/pages/` | Halaman institusional dan landing kategori |
| `trainings` | `src/content/trainings/` | Master program pelatihan |
| `schedules` | `src/content/schedules/` | Batch pelaksanaan; kontrak mengikuti dokumen schedule bersama |
| `articles` | `src/content/articles/` | Artikel editorial |

Semua collection memakai `id` integer positif dan `ulid` 26 karakter. Identitas tersebut stabil dan tidak boleh dibuat ulang ketika slug/judul berubah.

### 1.1 Page

Field wajib mengikuti `CONTENT-DRIVEN-PAGE-ARCHITECTURE.md`: `type`, `id`, `ulid`, `slug`, `title`, `description`, `pubDate`, `updatedDate`, dan `draft`.

Implementasi menambahkan `pageType` dengan nilai:
- `category`: landing rumpun pelatihan.
- `standard`: halaman institusional atau halaman konten lain.

Field tambahan: `image`, `related` (array ID), dan `blocks`. Block tidak wajib; halaman minimal tanpa block tetap valid.

### 1.2 Training

Field utama:
- `type: training`
- `id`, `ulid`
- `trainingId`: identitas stabil yang dirujuk schedule.
- `slug`, `title`, `description`
- `categoryIds`: relasi ke `pages.id` dari halaman kategori.
- `pubDate`, `updatedDate`, `draft`
- `image` dan `related` opsional.

Satu program hanya memiliki satu master record. Schedule tidak boleh menyalin data master program.

### 1.3 Schedule

Collection schedule mempertahankan nama field dan enum dari `FRONTMATTER-SCHEDULE-CONTRACT.md`, termasuk `scheduleId`, `publisherId`, `trainingId`, `batchNo`, tanggal, lifecycle status, registration, delivery, venue, completion, dan sites.

`id` dan `ulid` ditambahkan sebagai identitas universal sesuai arsitektur content-driven; keduanya tidak menggantikan `scheduleId`.

Validasi tanggal menerima date-only ISO `YYYY-MM-DD` atau datetime ISO dengan zona waktu. Validasi juga memastikan `endDate >= startDate` dan `updatedDate >= pubDate`.

### 1.4 Article

Schema artikel mengikuti pola editorial yang sudah digunakan pada proyek: identitas, slug, title, description, pubDate, author, category, tags, draft, dan image. `updatedDate` opsional.

## 2. Routing yang ditambahkan

| URL | Sumber | Perilaku |
|---|---|---|
| `/pelatihan/` | `pages` dengan `pageType: category` | Daftar kategori |
| `/pelatihan/<slug>/` | `pages` kategori atau `trainings` | Satu route dinamis untuk landing kategori dan detail program |
| `/training/` | Alias katalog lama | Menampilkan katalog yang sama dengan canonical ke `/pelatihan/` |

Route kategori menampilkan program yang `categoryIds`-nya memuat `pages.id` kategori tersebut. Route program menggunakan template dasar; detail kurikulum, persyaratan, FAQ, galeri, dan block tambahan dapat dilengkapi tanpa mengubah URL.

Homepage dan navigasi utama sudah diarahkan ke `/pelatihan/`. Homepage mengambil empat kategori pertama dari collection, bukan lagi menyimpan daftar kategori hardcoded.

## 3. Data awal yang dibuat

### 3.1 Kategori

Empat belas record kandidat dibuat di `src/content/pages/categories/`. ID yang dialokasikan: `2001–2014`.

Kategori tersebut berasal dari inventaris sitemap dan taksonomi kerja. Klasifikasi masih perlu ditinjau terhadap isi halaman lama sebelum dianggap taksonomi final.

### 3.2 Master training

Delapan master program awal dibuat di `src/content/trainings/`. ID yang dialokasikan: `3001–3008`.

| trainingId | Nama program | Kategori |
|---|---|---|
| `ahli-k3-umum` | Ahli K3 Umum | Ahli K3 dan Manajemen K3 |
| `damkar-kelas-d` | Pemadam Kebakaran Kelas D | Kebakaran dan Tanggap Darurat |
| `pemadam-kebakaran-kelas-a` | Pemadam Kebakaran Kelas A | Kebakaran dan Tanggap Darurat |
| `operator-gondola` | Operator Gondola | Operator Alat Berat dan Pesawat Angkat |
| `operator-boiler-tingkat-1` | Operator Boiler Tingkat 1 | Pesawat Uap, Bejana Tekan, dan Pesawat Produksi |
| `operator-boiler-tingkat-2` | Operator Boiler Tingkat 2 | Pesawat Uap, Bejana Tekan, dan Pesawat Produksi |
| `training-emergency-response-plan` | Emergency Response Plan | Kebakaran dan Tanggap Darurat |
| `training-k3-bahaya-confined-space` | K3 Ruang Terbatas (Confined Space) | Ruang Terbatas dan Gas Berbahaya |

Record awal hanya berisi identitas, title, description ringkas, relasi kategori, tanggal editorial, dan status publikasi. Tidak ada jadwal, harga, kapasitas, lokasi, atau klaim sertifikasi yang direka.

## 4. Hal yang belum dikerjakan

- [ ] Jalankan `npm run check` dan `npm run build` pada environment lokal.
- [ ] Tambahkan validasi lintas collection untuk keunikan `id`, `ulid`, `trainingId`, dan slug.
- [ ] Tambahkan validasi bahwa setiap `categoryIds` mengarah ke page kategori yang tersedia.
- [ ] Tambahkan schema block terperinci sesuai registry; saat ini `blocks` belum wajib dan belum menjadi syarat render.
- [ ] Migrasikan seluruh copy homepage, tentang, kontak, dan halaman institusional ke frontmatter Markdown.
- [ ] Lengkapi program lain setelah klasifikasi sitemap dan sumber kontennya diverifikasi.
- [ ] Tambahkan route jadwal bulan dan detail schedule setelah data batch faktual tersedia.
- [ ] Buat redirect map final setelah audit setiap URL lama.

## 5. Cara verifikasi setelah pull

Jalankan:

```bash
npm run check
npm run build
```

Jika ada error schema atau TypeScript, perbaiki di branch ini sebelum merge. Jangan membuat jadwal dummy hanya untuk mengisi tampilan.
