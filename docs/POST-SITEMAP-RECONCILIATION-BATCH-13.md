# Rekonsiliasi Post Sitemap — Batch 13 (Ordinal 91–94)

Tanggal audit: 2026-11-17

## Ringkasan keputusan

| Ordinal | Judul sumber | Keputusan | Target Astro |
|---:|---|---|---|
| 91 | Siap Jalan Petugas K3 Utama Ruang Terbatas 18–22 Maret 2019 | EXISTING_TRAINING | `/pelatihan/training-k3-bahaya-confined-space/` |
| 92 | Jadwal Pelatihan Ahli K3 Migas Cilacap Cepu | EXISTING_TRAINING | `/pelatihan/training-ahli-k3-migas/` |
| 93 | Pelatihan K3 Di Rumah Sakit Sertifikat Kemenaker RI | NEW_TRAINING | `/pelatihan/training-k3-rumah-sakit/` |
| 94 | Operator Genset Siap Jalan 19–22 Agustus 2019 | HOLD_SOURCE_CONTENT | Belum ditetapkan |

## Hasil pemeriksaan sumber

### 91 — Petugas K3 Utama Ruang Terbatas

Sumber asli berhasil dibuka melalui HTTP. Halaman menjelaskan program Petugas K3 Utama/Madya Ruang Terbatas, tujuan kompetensi, prosedur izin kerja, HIRA/JSA, LOTO, bahan kimia berbahaya, deteksi gas, ERP/P3K, APD, SCBA, persyaratan pendidikan SMA dan pengalaman minimal dua tahun, serta praktik. Sumber menyebut SE No. 01/DJPPK/I/2011 dan KEP.113/DJPPK/IX/2006.

Topik umum keselamatan ruang terbatas dipetakan ke `src/content/trainings/training-k3-bahaya-confined-space.md`. Namun halaman Astro saat ini membahas Teknisi K3 Ruang Terbatas dengan acuan Permenaker 11/2023. Pemetaan tidak menyatakan bahwa jabatan/kualifikasi Petugas K3 Utama/Madya 2019 setara dengan program Teknisi K3 saat ini. Jadwal 18–22 Maret 2019, jadwal berikutnya, biaya Rp7,5 juta, dan lokasi lama tidak dipindahkan sebagai penawaran aktif.

### 92 — Jadwal Pelatihan Ahli K3 Migas Cilacap–Cepu

Sumber terverifikasi. Program yang dijelaskan membagi pelaksanaan menjadi tujuh hari pembinaan materi di Cilacap dan tiga hari praktik/ujian di Cepu. Sumber membedakan level Operator (minimal SLTA) dan Pengawas (minimal D3), serta mencantumkan fasilitas, biaya lama, dan daftar jadwal sepanjang 2019.

Intent program sudah dilayani `src/content/trainings/training-ahli-k3-migas.md`. Tidak dibuat halaman duplikat atau schedule historis. Harga, fasilitas, dan tanggal 2019 tidak diperlakukan sebagai penawaran aktif.

### 93 — Pelatihan K3 Rumah Sakit

Sumber lama berhasil diverifikasi melalui halaman arsip yang sekarang tersedia di `/k3-rumah-sakit/`. Konten mencakup latar belakang dan potensi bahaya rumah sakit, dasar hukum yang dicantumkan sumber, ruang lingkup higiene/keselamatan/kesehatan kerja dan ergonomi, serta 15 pokok kurikulum: regulasi, pelayanan kesehatan kerja, infeksi nosokomial, kecelakaan/PAK, prasarana, laboratorium, radiologi, peralatan medis, keselamatan dan keamanan, B3, limbah medis, kebakaran, keadaan darurat, SMK3RS, manajemen risiko, praktik lapangan, dan evaluasi.

Belum ada halaman training K3 Rumah Sakit pada koleksi Astro. Karena itu ditambahkan `src/content/trainings/training-k3-rumah-sakit.md` sebagai halaman frontmatter-only. Halaman baru tidak menyalin harga, kuota, atau jadwal lama. Klaim sertifikat Kemnaker, dasar hukum, persyaratan, dan metode perlu diverifikasi kembali sebelum menjadi janji penawaran.

### 94 — Operator Genset 19–22 Agustus 2019

Sumber belum dapat diverifikasi. URL langsung HTTPS/HTTP, variasi jalur `/berita-training-k3/`, dan WordPress REST API berdasarkan slug tidak berhasil diakses. Pencarian exact judul/slug tidak menemukan salinan yang dapat diverifikasi. Halaman Astro Operator Genset memang ada, tetapi tidak digunakan sebagai bukti isi post lama.

Ordinal ini ditahan dengan `WAITING_SOURCE` / `HOLD_SOURCE_CONTENT`. Jangan membuat schedule atau menetapkan target redirect sebelum isi post asli/salinan terverifikasi tersedia.

## Perlakuan data historis dan kehati-hatian

- Tidak membuat schedule record dari pengumuman “siap jalan” tanpa bukti pelaksanaan aktual.
- Tidak membawa tanggal, biaya, venue, kuota, atau fasilitas tahun 2019/2023 menjadi penawaran aktif.
- Pemetaan ordinal 91 hanya berdasarkan topik umum ruang terbatas; tidak menyamakan skema/jabatan lama dengan Teknisi K3 Ruang Terbatas berdasarkan Permenaker 11/2023.
- Halaman K3 Rumah Sakit baru menghindari klaim otomatis penerbitan sertifikat/lisensi dan meminta verifikasi ketentuan terbaru.

## File yang diperbarui

- `docs/LEGACY-POST-AUDIT-QUEUE.csv`
- `docs/MASTER-LEGACY-URL-MAPPING.csv`
- `docs/POST-SITEMAP-RECONCILIATION-BATCH-13.md`
- `src/content/trainings/training-k3-rumah-sakit.md`

Redirect belum dibuat; menunggu seluruh post selesai diaudit.
