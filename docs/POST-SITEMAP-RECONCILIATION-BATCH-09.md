# Rekonsiliasi Post Sitemap — Batch 09 (Ordinal 75–78)

Tanggal audit: 2026-11-17

## Hasil

| Ordinal | Konten sumber | Temuan sumber | Keputusan |
|---:|---|---|---|
| 75 | Selamat dan Sukses Kepada Peserta K3 Migas di Cilacap 06–14 Feb 2019 | Laporan pelaksanaan pelatihan K3 Migas level Pengawas dan Operator di Cilacap, 48 peserta, dokumentasi foto. | NEW_SCHEDULE |
| 76 | Dibutuhkan Lowongan Kerja Bagi Dokter | Rekrutmen dokter untuk penempatan tambang batu bara; keberangkatan 16 Februari 2019. | DO_NOT_MIGRATE |
| 77 | Lowongan Tenaga Ahli Boiler | Rekrutmen tenaga ahli boiler bersertifikat untuk pemasangan boiler di Batam. | DO_NOT_MIGRATE |
| 78 | Lowongan Inspector Scafolding | Rekrutmen inspector scaffolding untuk PT Gemilang Makmur Jaya Raya. | DO_NOT_MIGRATE |

## 75 — Arsip pelaksanaan K3 Migas di Cilacap

Sumber asli menyatakan pelatihan K3 Migas level Pengawas dan Operator berlangsung di Cilacap pada 6–14 Februari 2019 dan diikuti 48 peserta. Empat foto dokumentasi tersedia. Banner pada salah satu foto menyebut Tempat Uji Kompetensi PT Ashindo Tama–Cilacap dengan periode 12–14 Februari 2019. Dengan demikian, tanggal kegiatan 6–14 Februari dan periode uji kompetensi 12–14 Februari dibedakan; tidak mengubah tanggal pelaksanaan utama.

Dibuat schedule historis:
- Training: `training-ahli-k3-migas`
- Periode: 6–14 Februari 2019
- Status: `completed`
- Lokasi: PT Ashindo Tama, Cilacap
- Jumlah peserta yang dipublikasikan: 48 (tanpa data identitas)
- Galeri: empat foto yang tertaut pada post sumber

Tidak membuat schedule untuk jadwal berikutnya 21 Februari–2 Maret 2019 karena halaman hanya menyebut rencana batch berikutnya dan tidak membuktikan pelaksanaan aktualnya.

## 76–78 — Lowongan kerja historis

Ketiganya dikecualikan sebagai rekrutmen temporal, bukan konten pelatihan:
- **76:** lowongan dokter dengan kualifikasi Hiperkes, ACLS, dan ATLS untuk tambang batu bara.
- **77:** tenaga ahli boiler bersertifikat untuk pemasangan boiler di Batam. Tidak diarahkan ke halaman pelatihan Operator Boiler.
- **78:** Inspector Scaffolding untuk PT Gemilang Makmur Jaya Raya. Tidak diarahkan ke halaman pelatihan Teknisi K3 Perancah.

## Implementasi

- Menambahkan satu schedule historis berstatus `completed` beserta galeri foto sumber.
- Memperbarui audit queue dan master mapping untuk ordinal 75–78.
- Tidak membuat halaman training baru.
- Tidak membuat redirect; redirect tetap dikerjakan secara kolektif setelah seluruh post selesai diaudit.
- Build Astro belum dijalankan dalam sesi ini.
