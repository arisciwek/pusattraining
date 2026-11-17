# Rekonsiliasi Post Sitemap — Batch 10 (Ordinal 79–82)

Tanggal audit: 2026-11-17

## Hasil

Keempat URL ditandai `WAITING_SOURCE` / `HOLD_SOURCE_CONTENT`. URL post asli tidak dapat diakses dan tidak ditemukan salinan konten yang cukup untuk menetapkan keputusan migrasi secara akurat.

| Ordinal | URL lama | Petunjuk awal dari slug | Keputusan |
|---:|---|---|---|
| 79 | /pelatihan-keselamatan-dan-kesehatan-kerja-rumah-sakit-siap-jalan-18-22-april-2019/ | Pelatihan K3 Rumah Sakit, 18–22 April 2019 | HOLD_SOURCE_CONTENT |
| 80 | /jadwal-pelatihan-siap-jalan-terdekat/ | Daftar/jadwal training siap jalan | HOLD_SOURCE_CONTENT |
| 81 | /ahli-k3-umum-jakarta-18-30-maret-siap-jalan/ | Batch Ahli K3 Umum Jakarta, 18–30 Maret | HOLD_SOURCE_CONTENT |
| 82 | /hiperkes-dokter-18-23-maret-2019-siap-jalan/ | Batch Hiperkes Dokter, 18–23 Maret 2019 | HOLD_SOURCE_CONTENT |

## Upaya verifikasi sumber

- Membuka keempat URL post secara langsung.
- Mencoba variasi HTTP, HTTPS, dan hostname WWW.
- Mencoba WordPress REST API berdasarkan slug masing-masing post.
- Mencoba post sitemap dan WordPress sitemap.
- Mencari URL, slug, serta frasa judul melalui mesin pencari.
- Membuka arsip berita `/berita-training/page/44/`; halaman yang dapat diakses berisi arsip 2017–2018, bukan keempat post yang sedang diaudit.

Semua jalur di atas belum menghasilkan salinan isi yang dapat diverifikasi.

## Catatan per ordinal

- **79:** slug mengindikasikan pelatihan K3 Rumah Sakit pada 18–22 April 2019. Belum dapat dipastikan apakah hanya pengumuman batch atau juga berisi materi program yang perlu dipertahankan.
- **80:** slug menunjukkan daftar jadwal agregat. Tidak membuat ulang daftar atau schedule record tanpa rincian program dan tanggal yang dapat diverifikasi.
- **81:** slug mengindikasikan batch Ahli K3 Umum Jakarta pada 18–30 Maret 2019. Belum ada bukti apakah jadwal tersebut terlaksana atau apakah isi post memiliki materi evergreen.
- **82:** slug mengindikasikan batch Hiperkes Dokter 18–23 Maret 2019. Pencarian menemukan jadwal serupa di situs pihak ketiga, tetapi bukan salinan post Pusattraining; informasi tersebut tidak dipakai sebagai bukti isi atau pelaksanaan post ini.

## Keputusan

- Tidak membuat halaman training baru.
- Tidak membuat schedule record; frasa "siap jalan" bukan bukti pelaksanaan.
- Tidak menetapkan target migrasi maupun redirect berdasarkan slug.
- Memperbarui audit queue dan master mapping dengan status `WAITING_SOURCE`.
- Redirect tetap menunggu seluruh post selesai diaudit.

Audit dapat dilanjutkan ke ordinal berikutnya; keputusan 79–82 dapat dibuka kembali jika sumber asli atau arsip yang dapat diverifikasi tersedia.
