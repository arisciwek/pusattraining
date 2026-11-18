# Migrasi halaman detail training ke frontmatter

## Status dan ruang lingkup

Tahap ini memindahkan konten editorial halaman detail program pada URL `/pelatihan/{slug}/` ke frontmatter Markdown di `src/content/trainings/{slug}.md`.

Tahap sebelumnya:
- Indeks `/pelatihan/` menggunakan block `training-catalog`.
- Seluruh 14 halaman kategori menggunakan block `training-category`.
- Route dinamis `src/pages/pelatihan/[slug].astro` masih merender detail training secara hard-coded.

Scope implementasi:
- Menambahkan kontrak block khusus detail training pada collection `trainings`.
- Menambahkan komponen renderer detail training.
- Mengonfigurasi setiap master training melalui frontmatter.
- Menjadikan branch `kind === 'training'` pada route sebagai pengambil data dan penghubung relasi.
- Mempertahankan schedule card, URL, breadcrumb, dan metadata SEO yang sudah berjalan.

Tidak termasuk:
- Mengubah kontrak collection `schedules` atau nama field schedule.
- Mengubah `trainingSlug`, `id`, `ulid`, slug, `categoryIds`, atau relasi yang sudah ada.
- Menambahkan materi, persyaratan, durasi, harga, sertifikasi, fasilitas, klaim, atau fakta program tanpa sumber terverifikasi.
- Mengubah tampilan dan block halaman kategori.

## Audit kondisi saat ini

Collection `trainings` sudah memiliki identitas `id` dan `ulid`, `trainingSlug`, `slug`, `title`, `description`, `categoryIds`, tanggal editorial, `draft`, `image`, dan `related`.

Contoh entry yang diperiksa:
- `ahli-k3-umum.md`
- `damkar-kelas-d.md`

Kedua contoh berisi metadata master dan body Markdown kosong. Deskripsi secara eksplisit menyatakan bahwa rincian materi/persyaratan masih menunggu verifikasi sumber. Karena itu migrasi tidak boleh mengarang isi detail program.

Route `src/pages/pelatihan/[slug].astro` saat ini masih menulis langsung:
- Eyebrow `PROGRAM PELATIHAN`.
- H1 dan deskripsi dari metadata training.
- Notice `Informasi program` beserta copy placeholder.
- Eyebrow dan heading jadwal.
- Link ke seluruh jadwal.
- Empty state jadwal.

Data jadwal sudah dihitung dari collection `schedules` melalui relasi `trainingSlug`, diurutkan berdasarkan `startDate`, dan dirender memakai `ScheduleCard`. Bagian ini adalah data relasional/dinamis, bukan konten editorial detail training, sehingga tetap dikelola route dan komponen schedule.

## Kontrak frontmatter detail training

Tambahkan field `blocks` pada schema collection `trainings`. Field ini berupa array discriminated union. Untuk tahap pertama, dukung block berikut:

### `training-detail-intro`

| Properti | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| `type` | literal `training-detail-intro` | Ya | Memilih renderer pengantar detail training. |
| `eyebrow` | string | Tidak | Label di atas H1; fallback presentasi boleh disediakan komponen. |
| `noticeTitle` | string | Ya | Judul panel informasi. |
| `noticeDescription` | string | Ya | Copy informasi yang aman dan faktual. |

H1 dan deskripsi utama tetap menggunakan field top-level `title` dan `description`, sehingga satu sumber dipakai untuk tampilan dan metadata SEO.

### `training-schedule-list`

| Properti | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| `type` | literal `training-schedule-list` | Ya | Penanda slot jadwal dinamis. |
| `eyebrow` | string | Tidak | Label di atas heading jadwal. |
| `title` | string | Ya | Heading daftar jadwal. |
| `allLabel` | string | Tidak | Label tautan ke arsip jadwal. |
| `emptyMessage` | string | Ya | Pesan ketika tidak ada jadwal yang ditampilkan. |

Block ini hanya mengatur copy dan urutan slot. Daftar schedule tetap dipasok route melalui relasi `trainingSlug`; frontmatter training tidak boleh menyalin atau meng-hardcode daftar schedule.

Urutan block pada frontmatter menentukan urutan konten editorial. Jadwal dirender pada posisi block `training-schedule-list`, agar susunan halaman juga content-driven.

## Alur data dan rendering

1. Route membuat static paths dari entry kategori dan master training seperti sekarang.
2. Branch kategori tetap memakai `BlockRenderer` tanpa perubahan perilaku.
3. Branch training membaca `entry.data.blocks` dan menyiapkan schedule berdasarkan `trainingSlug`.
4. Renderer detail training menerima title, description, blocks, slug, dan schedule terkait melalui props.
5. `TrainingDetailRenderer` memilih komponen berdasarkan `type`; renderer detail sengaja dipisah dari registry block halaman umum karena block jadwal membutuhkan data relasional dari route.
6. Komponen intro merender H1, deskripsi, dan notice sesuai frontmatter.
7. Komponen schedule merender schedule card atau empty state sesuai block.
8. `SiteLayout` tetap menerima title dan description dari metadata master training.

Komponen tidak boleh memanggil `getCollection` sendiri. Route tidak boleh menyimpan copy editorial detail training.

## Aturan implementasi

- Semua konten editorial dan urutan section halaman detail berasal dari frontmatter Markdown.
- Body Markdown setiap file training tetap kosong; jangan menambahkan konten body biasa.
- Pertahankan `id`, `ulid`, `trainingSlug`, `slug`, `categoryIds`, `related`, dan metadata yang sudah ada.
- Jangan mengubah kontrak schedule yang telah dikunci di `docs/FRONTMATTER-SCHEDULE-CONTRACT.md`.
- Jangan membuat fakta program baru. Copy yang belum didukung sumber harus tetap transparan sebagai informasi yang menunggu verifikasi, atau tidak ditampilkan.
- Schema Zod, tipe TypeScript, renderer, frontmatter semua training, dan dokumentasi harus diperbarui bersama. Registry `PageBlock` untuk halaman umum tidak perlu diubah karena block detail training memiliki kontrak dan data dinamis tersendiri.
- Gunakan Tailwind CSS yang sudah ada dan pertahankan semantic class pada setiap elemen.
- Pertahankan canonical, Open Graph, Twitter Card, breadcrumb, serta pola URL.
- Pertahankan filter `isMainSiteSchedule`, relasi `trainingSlug`, pengurutan tanggal, dan komponen `ScheduleCard`.

## Verifikasi wajib

Jalankan:

```bash
npm run check
npm run build
```

Pemeriksaan manual:
- Semua URL detail training yang aktif tetap dihasilkan.
- H1, deskripsi, notice, heading jadwal, dan empty state berasal dari frontmatter.
- Jadwal yang tampil hanya schedule situs utama yang memiliki `trainingSlug` sesuai.
- Jadwal terurut berdasarkan `startDate`.
- Halaman tanpa jadwal menampilkan empty state dari frontmatter.
- Breadcrumb, canonical, Open Graph, Twitter Card, dan URL tidak berubah.
- Ke-14 halaman kategori tetap berfungsi.
- Tidak ada duplikasi `id` atau `ulid`.
- Body Markdown seluruh entry training tetap kosong.
