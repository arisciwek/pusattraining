# Rekonsiliasi Post Sitemap — Batch 02A (Ordinal 26–46)

## Ringkasan

21 URL post telah direkonsiliasi: 13 URL diarahkan ke konten Astro yang sudah ada dan 8 URL lowongan kerja dikecualikan dari migrasi konten pelatihan.

## Keputusan

| Ordinal | Konten | Keputusan | Tujuan |
|---:|---|---|---|
| 26 | Ahli K3 Umum Bekasi, September 2018 | EXISTING_TRAINING | /ahli-k3/ahli-k3-umum/ |
| 27 | Ahli K3 Umum Jakarta, September 2018 | EXISTING_TRAINING | /ahli-k3/ahli-k3-umum/ |
| 28 | Jadwal Pelatihan Damkar Terdekat | EXISTING_TRAINING | /pelatihan/damkar-kelas-d/ |
| 29 | Pelatihan Juru Las (Welder) Terdekat | EXISTING_PAGE | /juru-las-welder/ |
| 30 | Siap Jalan Pelatihan Teknisi K3 Listrik | EXISTING_TRAINING | /operator-k3/teknisi-k3-listrik/ |
| 31 | Materi Pelatihan Ahli K3 Listrik | EXISTING_TRAINING | /ahli-k3/training-ahli-k3-listrik/ |
| 32 | Sertifikasi K3 Listrik | EXISTING_TRAINING | /ahli-k3/training-ahli-k3-listrik/ |
| 33 | Jadwal Training K3 Listrik | EXISTING_PAGE | /jadwal/ |
| 34 | Pelatihan Operator Crane | EXISTING_TRAINING | /operator-k3/operator-crane/ |
| 35 | Pelatihan Ahli K3 Umum Murah | EXISTING_TRAINING | /ahli-k3/ahli-k3-umum/ |
| 36 | Dicari Operator Genset Bersertifikat | DO_NOT_MIGRATE | — |
| 37 | Dicari Tenaga Kerja Ketinggian untuk Proyek Kalimantan | DO_NOT_MIGRATE | — |
| 38 | Dicari Ahli K3 Umum Pengalaman Minimal 1 Tahun | DO_NOT_MIGRATE | — |
| 39 | Dibutuhkan Juru Las Bersertifikat | DO_NOT_MIGRATE | — |
| 40 | Pelatihan Hiperkes Dokter, November 2018 | EXISTING_TRAINING | /pelatihan/training-hiperkes/ |
| 41 | Lowongan Kerja PT Ricobana Abadi | DO_NOT_MIGRATE | — |
| 42 | Lowongan Kandidat POP Site Kaltim | DO_NOT_MIGRATE | — |
| 43 | Lowongan Kerja Dokter Perusahaan | DO_NOT_MIGRATE | — |
| 44 | Lowongan Dokter Proyek Pertamina EP | DO_NOT_MIGRATE | — |
| 45 | Jadwal Pelatihan K3 Surabaya | EXISTING_PAGE | /jadwal/ |
| 46 | Jadwal Pelatihan K3 Yogyakarta 2019 | EXISTING_PAGE | /jadwal/ |

## Prinsip rekonsiliasi

- Pengumuman batch tahun 2018 tidak dibuat sebagai jadwal aktif.
- Materi Ahli K3 Listrik dan informasi sertifikasi dikonsolidasikan ke halaman program Ahli K3 Listrik. Halaman Teknisi K3 Listrik tetap terpisah.
- Halaman Operator Crane, Ahli K3 Umum, Hiperkes, dan kategori Juru Las yang setara sudah tersedia; tidak dibuat duplikat.
- Lowongan kerja yang bersifat temporal dikecualikan karena bukan intent pelatihan evergreen.
- Arsip jadwal K3 Listrik dan jadwal regional diarahkan ke indeks jadwal.

## Batasan dan tindak lanjut

Ordinal 47–50 belum diselesaikan dalam dokumen ini. Keempatnya merupakan artikel teknis kelistrikan/migas dan perlu audit isi tersendiri agar tidak salah digabungkan ke halaman training. Tidak ada redirect dibuat; seluruh redirect tetap menunggu audit 436 URL post selesai.
