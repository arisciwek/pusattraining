# Audit Kontrak Schedule dan Routing — Pusattraining

**Branch audit schema:** `fix/schedule-contract-audit`  
**Branch implementasi dan audit lanjutan:** `fix/schedule-archive-audit`  
**Acuan:** `docs/FRONTMATTER-SCHEDULE-CONTRACT.md` dan `docs/CONTENT-DRIVEN-PAGE-ARCHITECTURE.md`  
**Status:** schema dan route portal sudah tersedia. Build terbaru dan fixture validasi masih harus dijalankan.

## 1. Hasil pemeriksaan schema

Schema aktif berada di `src/content.config.ts`. Nama field dan enum schedule mengikuti kontrak frontmatter yang dikunci.

| Area kontrak | Hasil |
|---|---|
| Collection `schedules` | Sesuai |
| Identitas universal `id` dan `ulid` | Ada |
| Identitas schedule `scheduleId` | Ada; tidak menggantikan `id` atau `ulid` |
| `publisherId`, `trainingId`, `batchNo` | Ada |
| `slug`, `title`, `description` | Ada |
| `startDate`, `endDate`, `dateLabel`, `timezone` | Ada |
| `pubDate`, `updatedDate`, `draft` | Ada dan wajib |
| Lifecycle `status` | Enum sesuai |
| `registration.status` | Enum sesuai |
| `delivery.mode`, `delivery.attendanceMode` | Nama dan enum sesuai |
| Object `venue`, `completion`, dan `sites` | Struktur sesuai kontrak |
| Relasi schedule ke master training | Divalidasi melalui `trainingId` |

Validasi tanggal memeriksa tanggal kalender ISO, datetime dengan offset/`Z`, rentang jam dan offset, timezone IANA, `endDate >= startDate`, serta `updatedDate >= pubDate`. Tidak ada nama field atau enum kontrak yang diganti.

## 2. Validasi relasi dan URL

Validator lintas collection memeriksa:

- Keunikan `id`, `ulid`, `trainingId`, dan `scheduleId`.
- Relasi `trainingId` ke master training.
- Path sumber `schedules/<tahun-startDate>/<training-slug>/<schedule-slug>.md`.
- Keunikan URL schedule portal untuk record yang aktif di `sites.main.enabled`, menggunakan kombinasi bulan lokal, slug training, dan slug schedule.

Bulan URL diturunkan dari `startDate` menggunakan `timezone`, bukan dari `pubDate` atau `updatedDate`. Label tanggal yang dibaca pengguna berasal dari `dateLabel`; data terstruktur Event memakai `startDate` dan `endDate`.

## 3. Routing yang sudah diimplementasikan

- `/jadwal/` menampilkan jadwal yang dipublikasikan dan arsip bulan; jika belum ada data, tampil empty state.
- `/jadwal/<YYYY-MM>/` dibangkitkan untuk bulan yang mempunyai schedule aktif di portal.
- `/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/` dibangkitkan untuk schedule aktif yang memiliki master training valid.
- Halaman master training menampilkan batch terkait melalui `trainingId` dan komponen `ScheduleCard`.

Detail schedule memuat breadcrumb, informasi pelaksanaan, status, pendaftaran, dokumentasi completion bila tersedia, dan Event JSON-LD. Tombol pendaftaran hanya ditampilkan jika URL tersedia dan status pendaftaran secara eksplisit `open`. Tidak ada data schedule faktual atau dummy yang ditambahkan.

## 4. Hal yang masih pending

1. Registry allowlist `publisherId` lintas situs belum tersedia. Schema sementara menerima string non-kosong; allowlist baru diterapkan setelah daftar ID disepakati.
2. Belum ada fixture non-publik untuk lima lifecycle status dan variasi field opsional.
3. Collection `schedules` masih kosong; route bulanan dan detail baru akan terbit setelah data faktual ditambahkan.
4. Build terbaru belum diverifikasi. Commit implementasi schedule tidak memiliki status check atau workflow run yang dapat dipakai sebagai bukti build.

## 5. Verifikasi yang harus dilakukan

Setelah checkout branch `fix/schedule-archive-audit`, jalankan:

```bash
npm run check
npm run build
```

Setelah data schedule faktual ditambahkan, periksa:

- URL bulan sesuai `startDate` dan `timezone`.
- Link dari kartu batch pada halaman training menuju detail yang benar.
- Canonical, sitemap, breadcrumb, dan Event JSON-LD.
- Status pendaftaran dan CTA tidak mengasumsikan pendaftaran terbuka.
- Field opsional `venue`, `registration`, dan `completion` tidak menyebabkan halaman gagal dirender.

## 6. Keputusan yang dipertahankan

- `FRONTMATTER-SCHEDULE-CONTRACT.md` tetap menjadi sumber kebenaran.
- Tidak menambahkan alias seperti `mode` root atau `venue` string.
- Tidak mengubah tanggal event setelah pelatihan selesai hanya karena status berubah.
- Halaman minimal boleh dirender sebelum seluruh block siap.
- Semua tindak lanjut dilakukan pada branch terpisah; `main` tidak diubah dalam pekerjaan audit ini.
