# Audit Kontrak Schedule dan Routing — Pusattraining

> **Audit terbaru: 17 November 2026.** Dokumen ini menggantikan temuan historis yang menyatakan collection schedule masih kosong. Audit dilakukan setelah PR #11 (pengumpulan sinyal SEO URL legacy) berstatus merged. Tidak ada redirect legacy atau master URL mapping yang diubah.

## 1. Baseline repository

- PR #11: merged pada 16 November 2026; merge commit `504aefd27d2d5edfd56eb0eef81c38e057369ce6`.
- `main` saat branch audit dibuat: `3a7a673e4179dd07ccc68e323e40c12b51a53e11`.
- Branch pekerjaan: `feat/schedule-url-content-architecture`, dibuat dari `main` tersebut.
- Inventory pada tree `main`: 115 file schedule Markdown dan 21 master training.
- Schedule tersebar pada 2017–2026; 91 file berada pada folder tahun 2026.
- Jumlah file bukan jumlah halaman publik. Route hanya diterbitkan untuk schedule non-draft dengan `sites.main.enabled: true` dan master training yang terbit.

## 2. Verifikasi kontrak lintas repository

Sumber yang diperiksa:
- Damkar: `src/content.config.ts`, `docs/SCHEDULE-IMPLEMENTASI-CHECKLIST-SCHEMA.md`, dan sample `src/content/schedules/2026/kelas-d/november-2026-kelas-d-gelombang-21.md`.
- Confined Space: `src/content.config.ts`, sample `src/content/schedule/23-27-november-2026.md`, serta `docs/SCHEDULE-ARCHITECTURE-PLAN.md`.
- Portal: `src/content.config.ts`, `docs/FRONTMATTER-SCHEDULE-CONTRACT.md`, dan sample Damkar Kelas D serta Confined Space pada `src/content/schedules/2026/`.

| Area | Damkar saat ini | Confined Space saat ini | Kontrak portal |
|---|---|---|---|
| Collection | `schedules` (plural) | Masih `schedule` (singular) pada implementasi lama | `schedules` (plural) |
| Identitas sumber | `scheduleId`, `publisherId`, `trainingId` | Sample lama belum memilikinya | Dipakai sesuai rencana kontrak bersama |
| Identitas portal | Tidak memakai `id/ulid` pada schema schedule Damkar | Memakai `id/ulid` | Memakai `id/ulid` dan `scheduleId`; ketiganya tidak saling menggantikan |
| Tanggal | `startDate`, `endDate`, `dateLabel`, `timezone` | `startDate`, `endDate`, `dateLabel`; sample lama belum memiliki `timezone` | Field target lengkap, validasi tanggal dan IANA timezone |
| Lifecycle | `status` | Sample lama belum memiliki `status` | Enum `scheduled/ongoing/completed/postponed/cancelled` |
| Pendaftaran | `registration.status/deadline/capacity` | Belum ada pada sample lama | Object `registration` |
| Metode | `delivery.mode/attendanceMode` | Sample lama memakai root `mode/attendanceMode` | Object nested `delivery`; tidak menerima alias root |
| Lokasi dan completion | `venue`, `completion` | Belum ada pada sample lama | Object `venue` dan `completion` |
| Distribusi situs | Tidak diperlukan untuk situs tunggal | Tidak ada pada sample lama | `sites` sebagai ekstensi portal multi-publisher |

**Keputusan kontrak:** portal mengikuti target kontrak bersama yang ditulis di `docs/FRONTMATTER-SCHEDULE-CONTRACT.md` dan rencana arsitektur Confined Space, bukan menyalin frontmatter lama Confined Space secara mentah. Contohnya, `mode` dan `attendanceMode` dari sumber lama dinormalisasi menjadi `delivery.mode` dan `delivery.attendanceMode`. Schema portal tidak diubah dalam pekerjaan ini.

Perbedaan yang memang diperlukan:
- `id` dan `ulid` adalah identitas universal konten portal.
- `publisherId` menerima string non-kosong karena portal mengagregasi lebih dari satu publisher; schema Damkar membatasi literal `damkar` untuk situsnya sendiri.
- `sites` mengatur publikasi/copy/CTA per situs pada portal induk.
- Schema portal memvalidasi tanggal kalender, offset, dan nama timezone IANA lebih ketat. Field inti dan enum schedule tetap mengikuti kontrak bersama.

## 3. Arsitektur sumber konten dan relasi

- Satu file Markdown pada `src/content/schedules/<tahun>/<training-slug>/<schedule-slug>.md` mewakili satu penyelenggaraan.
- Master program berada terpisah di `src/content/trainings/*.md`.
- Relasi schedule ke master training menggunakan `trainingId`, bukan judul, slug, atau posisi array.
- `id`, `ulid`, dan `scheduleId` memiliki fungsi berbeda dan dipertahankan.
- Metadata halaman indeks `/jadwal/` bersumber dari `src/content/pages/jadwal.md`; block `schedule-index` mengendalikan copy.
- Halaman arsip dan detail dibangkitkan dari collection; tidak ada Markdown duplikat untuk setiap bulan atau batch.

## 4. Struktur URL dan validasi

| Halaman | URL | Sumber |
|---|---|---|
| Indeks jadwal | `/jadwal/` | Page frontmatter + collection schedules |
| Arsip | `/jadwal/<YYYY-MM>/` | Pengelompokan `startDate` dalam timezone schedule |
| Detail | `/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/` | Schedule + master training |

Segmen training dipertahankan pada URL portal agar slug schedule yang sama di program berbeda tidak bertabrakan. Ini merupakan struktur URL portal, bukan perubahan master URL mapping legacy.

Temuan dan perbaikan:
1. Validator lama menyimpan path schedule pada `Map` dengan key hanya `schedule.slug`. Jika dua training memakai slug yang sama, path salah satu record dapat menimpa record lain. Validator kini mencocokkan path sumber secara tepat berdasarkan tahun, training slug/ID, dan schedule slug.
2. Pembentukan parameter route detail kini menggunakan `getScheduleRouteParams()`; anchor kartu memakai `getScheduleHref()`. Keduanya mengambil bulan dari helper yang sama.
3. Helper URL memvalidasi segmen agar tidak mengandung slash/query/hash dan melakukan encoding segmen URL.
4. Keunikan URL publik tetap diperiksa berdasarkan kombinasi bulan, training slug, dan schedule slug.

## 5. SEO, internal linking, dan structured data

- **Title/description:** indeks memakai frontmatter halaman; detail memakai `sites.main.title/description` jika ada, lalu fallback ke field schedule.
- **Canonical:** `SiteLayout` membentuk canonical absolut dari `Astro.url.pathname` dan `Astro.site`; route detail tidak memakai URL legacy.
- **Breadcrumb:** komponen bersama tetap merender navigasi HTML dan kini juga menghasilkan JSON-LD `BreadcrumbList`.
- **Sitemap:** integrasi `@astrojs/sitemap` membangun URL dari seluruh static routes dan mengecualikan 404. Konfigurasi saat ini belum memasang resolver `lastmod` khusus schedule; jangan menganggap `updatedDate` otomatis sudah menjadi sitemap lastmod.
- **Internal linking:** ScheduleCard memakai helper URL yang sama pada indeks, arsip, dan daftar jadwal di halaman master training. Detail schedule menaut kembali ke master training, arsip bulan, dan indeks.
- **ItemList:** indeks jadwal dan arsip bulanan menghasilkan JSON-LD `ItemList` yang hanya menunjuk ke URL detail kanonis. Listing tidak membuat Event duplikat.
- **Event:** satu JSON-LD `Event` berada pada halaman detail. `@id` menggunakan canonical detail URL + `#event`; `startDate` dan `endDate` selalu berasal dari tanggal pelaksanaan, bukan tanggal editorial.
- **Completion:** tanggal selesai, peserta/nomor sertifikat, dan galeri dirender secara kondisional dari `completion`. Jangan menyimpan nama atau nomor sertifikat tanpa persetujuan publikasi; bagian kosong tidak dirender.

## 6. Batas pekerjaan dan tindak lanjut

Tidak termasuk pekerjaan ini:
- redirect URL legacy;
- perubahan `docs/MASTER-LEGACY-URL-MAPPING.csv` atau keputusan mapping URL;
- keputusan penggabungan/pemecahan URL berdasarkan crawl, GSC, Analytics, atau backlink;
- perubahan kontrak schema lintas repository.

Tindak lanjut yang masih terbuka:
1. Registry allowlist `publisherId` lintas situs setelah daftar publisher disepakati.
2. Fixture uji untuk seluruh lifecycle dan variasi object opsional.
3. Penambahan resolver sitemap `lastmod` dari `updatedDate` schedule dan halaman arsip.
4. Verifikasi Rich Results dan visual QA setelah build berhasil.

## 7. Verifikasi

Workflow CI pada branch menjalankan:
```bash
npm ci
npm run test:schedules:discover
npm run test:schedules:generate
npm run test:schedules:routing
npm run check
npm run build
```

Clone lokal untuk menjalankan perintah gagal karena environment tidak dapat me-resolve `github.com`. Karena itu, build/check belum boleh dinyatakan lulus sampai workflow GitHub selesai. PR dibuat sebagai draft bila workflow belum memberikan hasil. `main` tidak diubah langsung dan PR tidak di-merge.
