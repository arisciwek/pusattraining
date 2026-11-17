# Implementasi Route Schedule — Pusattraining

> Status: route indeks, arsip bulanan, dan detail schedule dibangkitkan dari content collections. Kontrak frontmatter tetap mengacu ke `FRONTMATTER-SCHEDULE-CONTRACT.md`.

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

Segmen training di URL portal membedakan schedule dengan slug sama dari program berbeda. File sumber tetap mengikuti `schedules/<tahun-startDate>/<training-slug>/<schedule-slug>.md`. Path file bukan primary key dan bukan penentu URL.

## 2. Kontrak dan pembentukan URL

- Hanya schedule non-draft dengan `sites.main.enabled: true` yang diterbitkan pada portal utama.
- Setiap schedule harus memiliki `trainingId` yang cocok dengan master training terbit.
- Bulan URL diturunkan oleh `getScheduleMonth()` dari `startDate` dan `timezone`; `pubDate/updatedDate` tidak dipakai untuk menentukan bulan event.
- Parameter detail menggunakan `getScheduleRouteParams()`; anchor internal memakai `getScheduleHref()`.
- Validator mencocokkan path sumber secara tepat berdasarkan tahun, training slug atau training ID, dan schedule slug. Slug yang sama pada training berbeda tidak saling menimpa.
- Segmen URL diperiksa dan di-encode; slug tidak boleh mengandung slash, query, atau hash.
- Tidak ada fallback yang menebak slug atau membuat data schedule.

## 3. Indeks dan arsip

Indeks `/jadwal/`:
- Mengambil schedule publik yang memiliki relasi valid ke master training.
- Menampilkan maksimal enam schedule berstatus `scheduled` yang tanggal mulainya hari ini atau setelah hari ini, serta schedule berstatus `ongoing` walaupun tanggal mulainya sudah lewat.
- Status `completed`, `postponed`, dan `cancelled` tidak masuk daftar mendatang.
- Jika tidak ada schedule aktif mendatang/berlangsung, menggunakan maksimal enam tanggal pelaksanaan terbaru sebagai fallback historis.
- Menyediakan link ke arsip bulan yang memiliki schedule publik.
- Copy, title, description, dan empty state berasal dari frontmatter halaman `jadwal.md`.

Arsip bulanan:
- Dibuat hanya untuk bulan yang mempunyai schedule publik dan master training valid.
- Mengelompokkan berdasarkan bulan pelaksanaan, bukan tanggal publikasi.
- Menampilkan status, batch, program, tanggal, ringkasan, dan lokasi/metode jika tersedia.
- Menyediakan breadcrumb dan tautan kembali ke indeks.

Kedua listing menghasilkan JSON-LD `ItemList` berisi tautan ke URL detail. Listing tidak menghasilkan Event node agar Event tidak terduplikasi.

## 4. Halaman detail

Halaman detail mengambil fakta dari frontmatter schedule dan master training:
- status lifecycle dan nomor angkatan;
- tanggal mulai/selesai, label tanggal, dan timezone;
- metode/kehadiran serta lokasi jika tersedia;
- status pendaftaran, deadline, dan kapasitas jika tersedia;
- CTA pendaftaran hanya jika status eksplisit `open` dan `sites.main.registrationUrl` tersedia;
- tautan ke halaman master program;
- data completion (tanggal selesai, peserta/nomor sertifikat yang boleh dipublikasikan, dan galeri) hanya jika field terkait tersedia.

Section opsional tidak dirender jika datanya kosong. Nama peserta dan nomor sertifikat hanya boleh dimasukkan ke frontmatter jika ada persetujuan publikasi. Menambahkan completion tidak mengubah `startDate`, `endDate`, `scheduleId`, atau URL detail.

Halaman detail menghasilkan JSON-LD `Event` dengan `@id` berupa canonical detail URL + `#event`. Tanggal Event berasal dari `startDate/endDate`. Event tidak ditempatkan pada listing.

## 5. Metadata, breadcrumb, dan sitemap

- `SiteLayout` menghasilkan title, description, canonical, Open Graph, dan Twitter Card. Canonical menggunakan path halaman saat ini pada `Astro.site`.
- Komponen `Breadcrumb` merender navigasi HTML dan JSON-LD `BreadcrumbList`.
- `@astrojs/sitemap` menerima static routes hasil build dan mengecualikan halaman 404.
- Konfigurasi sitemap saat ini belum memetakan `updatedDate` schedule ke `lastmod`; ini dicatat sebagai tindak lanjut, bukan diasumsikan telah selesai.
- Internal links pada ScheduleCard dan halaman training memakai helper URL yang sama.

## 6. Inventaris dan validasi

Pada tree `main` tanggal 17 November 2026 terdapat 115 file schedule Markdown dan 21 master training. Jumlah halaman publik berbeda dari jumlah file karena filter `draft`, `sites.main.enabled`, dan relasi training.

Perintah CI:
```bash
npm ci
npm run test:schedules:discover
npm run test:schedules:generate
npm run test:schedules:routing
npm run check
npm run build
```

Jangan menambahkan fixture atau schedule fiktif ke collection publik hanya untuk membuat route muncul. Uji lifecycle lengkap dan visual QA desktop/mobile tetap perlu ditinjau setelah build berhasil.

## 7. Berkas implementasi

- `src/content.config.ts`
- `src/pages/jadwal/index.astro`
- `src/pages/jadwal/[month]/index.astro`
- `src/pages/jadwal/[month]/[trainingSlug]/[scheduleSlug].astro`
- `src/components/schedule/ScheduleCard.astro`
- `src/components/shared/Breadcrumb.astro`
- `src/lib/schedule-utils.ts`
- `src/lib/validate-content.ts`
- `astro.config.mjs`
