# Rekonsiliasi Post Sitemap — Batch 12 (Ordinal 87–90)

Tanggal audit: 2026-11-17

## Ringkasan keputusan

| Ordinal | Judul sumber | Keputusan | Target Astro |
|---:|---|---|---|
| 87 | Siap Jalan Teknisi K3 Listrik 25–30 Maret 2019 | EXISTING_TRAINING | `/operator-k3/teknisi-k3-listrik/` |
| 88 | Siap Jalan Operator Crane Kelas 2 19–22 Maret 2019 | EXISTING_TRAINING | `/operator-k3/operator-crane/` |
| 89 | Siap Jalan Operator Crane Kelas 3 20–22 Maret 2019 | EXISTING_TRAINING | `/operator-k3/operator-crane/` |
| 90 | Siap Jalan Damkar DCBA 19 Maret–6 April 2019 | EXISTING_PAGE | `/jadwal/` |

## Hasil pemeriksaan sumber

### 87 — Teknisi K3 Listrik

Sumber memuat tujuan kompetensi teknisi listrik, pencegahan bahaya listrik, prosedur kerja selamat, pembacaan gambar, pemeriksaan/pengujian instalasi, materi kelistrikan, serta persyaratan pengalaman kerja minimal dua tahun. Informasi batch 25–30 Maret 2019, Hotel Ibis Jakarta, biaya Rp6.900.000, dan jadwal berikutnya 22–27 April 2019 adalah historis. Materi program sudah dilayani `src/content/trainings/teknisi-k3-listrik.md`.

### 88–89 — Operator Crane kelas 2 dan 3

Kedua sumber membahas perbedaan kewenangan Operator Crane kelas I, II, dan III, materi pengoperasian dan keselamatan crane, tujuan, metode teori/praktik/ujian, serta rincian batch kelas masing-masing. Halaman program yang sama, `src/content/trainings/operator-crane.md`, sudah melayani intent program dan pembagian kelas. Biaya, tempat, dan tanggal batch 2019 tidak dipindahkan sebagai jadwal aktif.

### 90 — Paket Damkar DCBA

Sumber HTTP berhasil diakses setelah URL HTTPS gagal. Konten menjelaskan paket D-C-B-A selama 18 hari, prasyarat sertifikat antarjenjang, tujuan, materi masing-masing kelas, persyaratan pendidikan, dan lokasi Hotel Ibis Jakarta Cawang. Harga dan jadwal 2019 sudah kedaluwarsa. Materi evergreen per jenjang telah dilayani oleh empat halaman Astro: `damkar-kelas-a.md`, `damkar-kelas-b.md`, `damkar-kelas-c.md`, dan `damkar-kelas-d.md`. Karena sumber adalah penawaran satu batch historis, tidak dibuat halaman paket aktif baru atau schedule record; arsip jadwal dipetakan ke `/jadwal/`.

## Perlakuan data historis

- Tidak membuat schedule record untuk tanggal 2019. Label "siap jalan" adalah status promosi saat diterbitkan, bukan bukti bahwa pelatihan benar-benar terlaksana.
- Tidak membawa harga, venue, dan jadwal selanjutnya tahun 2019 menjadi penawaran aktif.
- Tidak membuat halaman training duplikat untuk Teknisi K3 Listrik maupun Operator Crane.
- Tidak membuat halaman paket Damkar DCBA yang berpotensi menyajikan penawaran paket lama sebagai layanan aktif.

## File yang diperbarui

- `docs/LEGACY-POST-AUDIT-QUEUE.csv`
- `docs/MASTER-LEGACY-URL-MAPPING.csv`

Redirect belum dibuat; menunggu seluruh post selesai diaudit.
