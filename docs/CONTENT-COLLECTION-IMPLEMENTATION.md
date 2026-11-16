# Implementasi Content Collections dan Katalog Awal

**Repository:** `arisciwek/pusattraining`  
**Status:** katalog awal sudah terpasang dan build berhasil pada environment pemilik repository. Audit kontrak schedule diperbarui pada branch `fix/schedule-contract-audit`.

## 1. Collection yang tersedia

Konfigurasi ada di `src/content.config.ts` menggunakan Content Layer API Astro dan `glob` loader.

| Collection | Folder | Tujuan |
|---|---|---|
| `pages` | `src/content/pages/` | Halaman institusional dan landing kategori |
| `trainings` | `src/content/trainings/` | Master program pelatihan |
| `schedules` | `src/content/schedules/` | Batch pelaksanaan; kontrak mengikuti dokumen schedule bersama |
| `articles` | `src/content/articles/` | Artikel editorial |

Semua collection memakai `id` integer positif dan `ulid` 26 karakter. Identitas tersebut stabil dan tidak boleh dibuat ulang ketika slug/judul berubah.

## 2. Schema utama

### 2.1 Page

Field wajib mengikuti `CONTENT-DRIVEN-PAGE-ARCHITECTURE.md`: `type`, `id`, `ulid`, `slug`, `title`, `description`, `pubDate`, `updatedDate`, dan `draft`.

Implementasi menambahkan `pageType` dengan nilai `category` atau `standard`. Field tambahan `image`, `related`, dan `blocks` tersedia; block tidak wajib sehingga halaman minimal tetap dapat dirender.

### 2.2 Training

Field utama:
- `type: training`
- `id`, `ulid`, dan `trainingId`
- `slug`, `title`, `description`
- `categoryIds` sebagai relasi ke `pages.id` kategori
- `pubDate`, `updatedDate`, `draft`
- `image` dan `related` opsional.

Satu program hanya memiliki satu master record. Schedule merujuknya melalui `trainingId`.

### 2.3 Schedule

Collection bernama plural `schedules`. Schema mempertahankan field dan enum dari `FRONTMATTER-SCHEDULE-CONTRACT.md`, termasuk:
- Identitas universal `id` dan `ulid`.
- Identitas schedule `scheduleId`, `publisherId`, dan relasi `trainingId`.
- `batchNo`, `slug`, `title`, `description`.
- `startDate`, `endDate`, `dateLabel`, `timezone`.
- `pubDate`, `updatedDate`, `draft`, dan lifecycle `status`.
- Object opsional `registration`, `delivery`, `venue`, `completion`, dan `sites`.

Validasi memeriksa tanggal kalender ISO, datetime dengan zona waktu, timezone IANA, `endDate >= startDate`, dan `updatedDate >= pubDate`. Relasi `trainingId` diperiksa saat validasi lintas collection.

**Belum selesai:** registry allowlist `publisherId`, fixture semua status, route arsip bulanan, dan route detail schedule. Struktur folder kanonis sudah diperiksa oleh validator lintas collection. Rincian audit ada di `docs/AUDIT-SCHEDULE-CONTRACT-AND-ROUTING.md`.

### 2.4 Article

Schema artikel mengikuti pola editorial: identitas, slug, title, description, pubDate, author, category, tags, draft, dan image. `updatedDate` opsional.

## 3. Routing yang tersedia

| URL | Sumber | Status |
|---|---|---|
| `/` | Halaman homepage | Tersedia |
| `/pelatihan/` | Pages kategori | Tersedia |
| `/pelatihan/<slug>/` | Page kategori atau master training | Tersedia |
| `/training/` | Alias katalog lama, canonical ke `/pelatihan/` | Tersedia |
| `/jadwal/` | Indeks jadwal | Tersedia, saat ini empty state |
| `/jadwal/<YYYY-MM>/` | Arsip bulanan | Belum tersedia |
| `/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/` | Detail schedule portal | Belum tersedia |

Route kategori menampilkan program yang `categoryIds`-nya memuat `pages.id` kategori. Route training menggunakan template dasar; kurikulum, persyaratan, FAQ, galeri, dan block tambahan dapat dilengkapi tanpa mengubah URL.

## 4. Data awal

### 4.1 Kategori

Empat belas record kategori kandidat tersedia di `src/content/pages/categories/`, dengan ID 2001–2014. Taksonomi berasal dari inventaris sitemap dan masih perlu diverifikasi terhadap isi halaman lama.

### 4.2 Master training

Delapan master program awal tersedia di `src/content/trainings/`, dengan ID 3001–3008:

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

Record awal tidak mengarang jadwal, harga, kapasitas, lokasi, atau klaim sertifikasi.

## 5. Verifikasi

Pemilik repository melaporkan build selesai dengan 29 halaman dan `sitemap-index.xml` berhasil dibuat. Log tersebut menunjukkan Astro build berhasil pada environment lokal. Audit schedule tetap mencatat bahwa route arsip/detail belum tersedia; keberhasilan build tidak berarti semua rencana URL sudah diimplementasikan.

Perintah pemeriksaan yang digunakan:
```bash
npm run check
npm run build
```

## 6. Pekerjaan berikutnya

1. Verifikasi dan finalisasi taksonomi kategori serta daftar master program berdasarkan konten sumber.
2. Tetapkan registry `publisherId` lintas situs.
3. Tegakkan struktur folder dan fixture schedule.
4. Implementasikan route arsip bulanan dan detail schedule.
5. Migrasikan halaman institusional ke Markdown/frontmatter.
6. Buat redirect map final setelah audit isi dan performa URL lama.
