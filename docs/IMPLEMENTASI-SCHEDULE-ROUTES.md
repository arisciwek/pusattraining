# Implementasi Route Schedule — Pusattraining

> Status: route indeks, arsip bulanan, dan detail schedule sudah terimplementasi pada `main`. Dokumen ini menjelaskan perilaku route; kontrak frontmatter tetap mengacu ke `FRONTMATTER-SCHEDULE-CONTRACT.md`.

## 1. Pola URL

| Jenis halaman | URL | Sumber |
|---|---|---|
| Indeks | `/jadwal/` | `src/content/pages/jadwal.md` + collection `schedules` |
| Arsip bulanan | `/jadwal/<YYYY-MM>/` | Group collection `schedules` berdasarkan `startDate` dan `timezone` |
| Detail | `/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/` | Satu entry `schedules` dan master `trainings` |

Route Astro:

- `src/pages/jadwal/index.astro`
- `src/pages/jadwal/[month]/index.astro`
- `src/pages/jadwal/[month]/[trainingSlug]/[scheduleSlug].astro`

Tidak dibuat file Markdown duplikat untuk setiap bulan atau setiap halaman detail. Satu file schedule menjadi sumber fakta untuk halaman detail dan arsip.

## 2. Aturan pembentukan URL

- Hanya schedule non-draft dengan `sites.main.enabled: true` yang diterbitkan pada portal utama.
- Setiap schedule harus memiliki `trainingId` yang cocok dengan master training.
- Bulan URL diturunkan dari `startDate` dengan zona waktu IANA pada field `timezone`, melalui `getScheduleMonth()`.
- Segmen training berasal dari `training.slug`; segmen schedule berasal dari `schedule.slug`.
- Validasi relasi memeriksa struktur file sumber, relasi `trainingId`, dan keunikan URL portal.
- Tidak ada fallback yang menebak slug atau membuat data schedule.

## 3. Kartu dan anchor

Komponen `ScheduleCard.astro` menggunakan `getScheduleHref()` sebagai tujuan anchor pada judul dan tautan aksi. Dengan demikian kartu pada indeks, arsip bulanan, dan bagian jadwal di detail training menunjuk ke URL entitas schedule yang sama:

`/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/`

## 4. Isi indeks dan halaman arsip

Indeks `/jadwal/`:

- Mengambil schedule publik yang memiliki relasi valid ke master training.
- Jika tersedia schedule yang tanggal mulainya hari ini atau setelah hari ini, menampilkan maksimal enam schedule mendatang terdekat dalam urutan tanggal menaik.
- Jika tidak ada schedule mendatang, menampilkan maksimal enam schedule dengan tanggal pelaksanaan paling baru sebagai fallback historis.
- Arsip bulanan tetap mencakup seluruh schedule publik, termasuk schedule historis.

Arsip bulanan:

- Mengelompokkan schedule menurut bulan pelaksanaan, bukan tanggal publikasi.
- Menampilkan kartu schedule dengan status, angkatan, program, tanggal, ringkasan, dan lokasi yang tersedia.
- Menyediakan breadcrumb dan tautan kembali ke indeks jadwal.
- Tidak dibuat jika belum ada schedule yang memenuhi filter publikasi.

## 5. Isi halaman detail

Halaman detail mengambil fakta dari frontmatter schedule dan master training:

- status dan nomor angkatan;
- tanggal mulai, tanggal selesai, label tanggal, dan timezone;
- metode/kehadiran serta lokasi jika tersedia;
- informasi pendaftaran hanya jika disediakan;
- CTA pendaftaran hanya jika status pendaftaran `open` dan `sites.main.registrationUrl` tersedia;
- tautan ke halaman master program.

Tidak dibuat klaim harga, kuota, lokasi, atau URL pendaftaran jika data sumber tidak tersedia. Data peserta/sertifikat dari bagian completion tidak ditampilkan pada implementasi awal.

Detail schedule juga menghasilkan JSON-LD `Event` dari field sumber, termasuk tanggal, status, metode kehadiran, lokasi, dan URL penawaran jika tersedia. Metadata title, description, canonical, Open Graph, dan Twitter Card menggunakan `SiteLayout`.

## 6. Validasi dan batasan

- `getStaticPaths()` pada route arsip dan detail menjalankan `validateContentRelations()`.
- Collection `schedules` sudah berisi data publik. Catatan rebuild pada `docs/hasil-rebuiild.txt` menunjukkan 84 halaman berhasil dibangun, termasuk route detail schedule dan arsip bulanan. Jumlah halaman akan mengikuti jumlah record schedule valid yang dipublikasikan.
- Jangan menambahkan fixture atau schedule fiktif hanya untuk membuat route muncul.
- Setelah perubahan route atau data schedule, jalankan `npm run check` dan `npm run build`; periksa output route dan sitemap.
- Uji manual berikutnya perlu mencakup variasi status schedule, timezone yang melewati batas bulan UTC, venue kosong, delivery online/offline/blended, dan pendaftaran tanpa URL.

## 7. Berkas implementasi

- `src/pages/jadwal/[month]/index.astro`
- `src/pages/jadwal/[month]/[trainingSlug]/[scheduleSlug].astro`
- `src/components/schedule/ScheduleCard.astro` (anchor menggunakan helper route yang sama)
- `src/lib/schedule-utils.ts`
- `src/lib/validate-content.ts`
