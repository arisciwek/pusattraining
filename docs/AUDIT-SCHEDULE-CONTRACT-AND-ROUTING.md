# Audit Kontrak Schedule dan Routing — Pusattraining

**Branch:** `fix/schedule-contract-audit`  
**Acuan:** `docs/FRONTMATTER-SCHEDULE-CONTRACT.md` dan `docs/CONTENT-DRIVEN-PAGE-ARCHITECTURE.md`  
**Status:** audit schema selesai; routing schedule dan fixture data belum diimplementasikan.

## 1. Hasil pemeriksaan schema

Schema aktif berada di `src/content.config.ts`. Pemeriksaan dilakukan terhadap nama field, tipe, enum, field wajib/opsional, dan aturan validasi dalam kontrak.

| Area kontrak | Hasil |
|---|---|
| Collection `schedules` | Sesuai |
| Identitas universal `id` dan `ulid` | Ada, sesuai arsitektur content-driven |
| Identitas schedule `scheduleId` | Ada; tidak menggantikan `id` atau `ulid` |
| `publisherId`, `trainingId`, `batchNo` | Ada |
| `slug`, `title`, `description` | Ada |
| `startDate`, `endDate`, `dateLabel`, `timezone` | Ada |
| `pubDate`, `updatedDate`, `draft` | Ada dan wajib |
| Lifecycle `status` | Enum sesuai kontrak |
| `registration.status` | Enum sesuai kontrak |
| `registration.deadline`, `capacity` | Opsional dan tipe sesuai |
| `delivery.mode`, `delivery.attendanceMode` | Nama dan enum sesuai |
| Object `venue` | Nama dan properti sesuai |
| Object `completion` | Properti peserta dan galeri sesuai |
| Object `sites` | Override copy, CTA, URL sesuai |
| Relasi schedule ke master training | Divalidasi melalui `trainingId` |

### Perbaikan pada audit ini

Implementasi sebelumnya memeriksa format tanggal dan `Date.parse()`, tetapi belum cukup ketat untuk menolak tanggal kalender yang tidak valid, misalnya tanggal 31 Februari. Validasi tersebut diperketat agar:

- Tanggal kalender ISO benar-benar valid.
- Datetime wajib menyertakan `Z` atau offset.
- Jam, menit, detik, dan offset berada dalam rentang yang valid.
- `timezone` harus dikenali sebagai zona waktu IANA.
- Aturan `endDate >= startDate` dan `updatedDate >= pubDate` tetap dipertahankan.

Tidak ada nama field atau enum kontrak yang diganti.

## 2. Catatan yang belum boleh dianggap selesai

1. Daftar nilai `publisherId` yang sah belum tersedia sebagai registry terpusat. Schema sementara menerima string non-kosong; validasi allowlist baru boleh diterapkan setelah daftar ID publisher disepakati.
2. Struktur folder kanonis `schedules/<YYYY>/<training-slug>/<schedule-slug>.md` kini diperiksa oleh validator lintas collection. Pemeriksaan ini akan aktif ketika record schedule ditambahkan.
3. Belum ada fixture schedule untuk menguji semua lifecycle status dan variasi field opsional.
4. Belum ada halaman arsip bulanan dan detail schedule di route Astro.
5. Belum ada data schedule faktual. Jangan membuat data dummy untuk sekadar mengisi halaman.
6. `registrationUrl` divalidasi sebagai URL absolut. URL pendaftaran harus berasal dari sumber yang benar, bukan ditebak.

## 3. Audit routing dan hasil build

Route yang ditemukan saat audit:

- `/jadwal/` tersedia sebagai halaman indeks, tetapi masih menampilkan empty state statis.
- Belum ditemukan route arsip bulan `/jadwal/<YYYY-MM>/`.
- Belum ditemukan route detail portal `/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/`.
- Route kategori dan master training sudah tersedia di bawah `/pelatihan/`.

Build yang dijalankan pemilik repository menghasilkan 29 halaman dan membuat `sitemap-index.xml`. Ini mengonfirmasi build Astro selesai pada environment tersebut, tetapi tidak membuktikan route schedule sudah tersedia karena belum ada route arsip/detail schedule.

## 4. Langkah implementasi berikutnya

1. Tetapkan registry `publisherId` yang disepakati lintas situs.
2. Tambahkan fixture untuk membuktikan validasi struktur folder schedule dan relasi berjalan sesuai kontrak.
3. Siapkan fixture validasi untuk lima lifecycle status dan variasi field opsional; fixture dapat berada di test/fixture, bukan menjadi data publik.
4. Implementasikan arsip bulanan berdasarkan `startDate` dan `timezone`.
5. Implementasikan detail schedule dengan pola URL portal yang sudah didokumentasikan.
6. Hubungkan kartu batch pada halaman training ke detail schedule.
7. Uji sitemap, canonical, breadcrumb, Event JSON-LD, dan internal link setelah data faktual tersedia.

## 5. Prinsip yang dipertahankan

- Kontrak `FRONTMATTER-SCHEDULE-CONTRACT.md` adalah sumber kebenaran.
- Tidak membuat alias field seperti `mode` root atau `venue` string.
- Tidak mengubah `startDate`/`endDate` setelah pelatihan selesai hanya karena status berubah.
- Halaman minimal tetap boleh dirender sebelum seluruh block siap.
- Tidak mengubah `main` secara langsung; pekerjaan audit berada di branch terpisah.
