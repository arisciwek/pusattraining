# Rekonsiliasi Arsip Jadwal Bulanan 2018 — Post Batch 01

## Keputusan migrasi

Delapan post arsip jadwal bulanan 2018 direkonsiliasi ke halaman indeks jadwal aktif `/jadwal/`. Tidak dibuat halaman arsip bulanan statis baru dan tidak dibuat entri schedule historis dari daftar yang tidak dapat diverifikasi.

## Alasan tidak membuat schedule historis

Sumber-sumber tersebut menyajikan daftar rencana/angkatan yang disebut "siap jalan", umumnya dengan tanggal mulai, nama program, dan durasi. Data tidak konsisten untuk setiap entri: venue sering tidak dicantumkan, tanggal akhir tidak disediakan, sebagian durasi kosong atau menggunakan satuan bulan, dan beberapa daftar memiliki entri tanggal berulang/tidak berurutan. Label "siap jalan" bukan bukti bahwa pelatihan benar-benar telah dilaksanakan.

Status `completed` pada koleksi schedule berarti pelatihan telah selesai. Mengisi status tersebut hanya dari daftar rencana akan membuat klaim historis yang tidak didukung sumber. Menghitung tanggal akhir dengan menambahkan durasi juga tidak aman karena sumber tidak menjelaskan apakah durasi berarti hari kalender atau hari pelatihan.

## Arsip yang direkonsiliasi

| Ordinal | Arsip lama | Hasil |
| ---: | --- | --- |
| 3 | [Daftar Training Siap Jalan Januari 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-januari-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 4 | [Daftar Training Siap Jalan Februari 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-februari-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 6 | [Daftar Training Siap Jalan Maret 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-maret-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 7 | [Daftar Training Siap Jalan April 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-april-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 14 | [Daftar Training Siap Jalan Mei 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-mei-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 16 | [Daftar Training Siap Jalan Bulan Juni 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-bulan-juni-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 17 | [Daftar Pelatihan Siap Jalan Juli 2018](https://pusattrainingk3.com/daftar-pelatihan-siap-jalan-juli-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |
| 21 | [Siap Jalan Agustus 2018](https://pusattrainingk3.com/siap-jalan-agustus-2018/) | `/jadwal/` — arsip 2018 kedaluwarsa; tidak dibuat schedule historis tanpa bukti pelaksanaan. |

## Sumber kompilasi tambahan

- [Jadwal Training K3](https://pusattrainingk3.com/jadwal-training-k3/) memuat kompilasi tanggal mulai dan durasi beberapa program pada 2018, termasuk Mei, Juni, Juli, dan Agustus.
- [Jadwal April 2018](https://pusattrainingk3.com/daftar-training-siap-jalan-april-2018/) memuat daftar tanggal mulai, program, dan durasi, tetapi bukan laporan realisasi.

## Batasan

- Tidak menghapus atau mengubah data schedule yang sudah ada di Astro.
- Tidak membuat schedule historis baru dari daftar agregat.
- Tidak membuat redirect dalam PR ini. Master mapping mencatat tujuan `/jadwal/` untuk dikerjakan pada tahap redirect kolektif setelah semua post sitemap selesai diaudit.
- Halaman training evergreen yang sudah tersedia tetap menjadi target untuk intent program; halaman indeks jadwal hanya menjadi tujuan untuk arsip tanggal yang sudah kedaluwarsa.
