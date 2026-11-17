# Rekonsiliasi Post Sitemap — Batch 07 (Ordinal 67–70)

Tanggal audit: 2026-11-17

## Hasil

Keempat URL ditahan dengan status `WAITING_SOURCE` / `HOLD_SOURCE_CONTENT`. Percobaan membuka masing-masing halaman sumber secara langsung gagal. Karena itu, klasifikasi awal dari slug tidak diperlakukan sebagai bukti isi.

| Ordinal | URL lama | Petunjuk dari slug | Keputusan |
|---:|---|---|---|
| 67 | /jadwal-pelatihan-ahli-k3-umum-terdekat-di-beberapa-kota/ | Jadwal AK3 Umum | HOLD_SOURCE_CONTENT |
| 68 | /lowongan-kerja/ | Lowongan kerja | HOLD_SOURCE_CONTENT |
| 69 | /siap-jalan-pop-pertambangan-feb-2019-bandung-dan-palangkaraya/ | Batch POP Februari 2019 | HOLD_SOURCE_CONTENT |
| 70 | /jadwal-pelatihan-ak3-umum-terdekat-di-beberapa-kota/ | Jadwal AK3 Umum | HOLD_SOURCE_CONTENT |

## Catatan keputusan

- **67 dan 70:** belum dapat dipastikan apakah keduanya berisi arsip jadwal, variasi konten yang sama, atau materi berbeda. Perlu dibandingkan sebelum konsolidasi.
- **68:** tidak langsung dikecualikan. Slug menunjukkan lowongan, tetapi isi dan cakupan halaman belum diketahui; mungkin arsip atau indeks lowongan.
- **69:** frasa “siap jalan” bukan bukti bahwa kelas benar-benar terlaksana. Tidak membuat schedule record dari informasi slug.
- Tidak ada halaman training baru, schedule record, maupun redirect yang dibuat.

## Tindak lanjut

Buka kembali keputusan setelah konten sumber dapat diakses atau tersedia salinan/arsip yang dapat diverifikasi. Sambil menunggu, audit dapat berlanjut ke batch berikutnya tanpa mengarang isi keempat halaman ini.
