# Legacy Page Audit — Batch 02: Training Pages

**Repository:** arisciwek/pusattraining  
**Basis:** `docs/LEGACY-PAGE-AUDIT-QUEUE.csv` on main  
**Scope:** 95 candidate training/category URLs  
**Status:** pre-audit; classification is provisional and no migration decisions have been made.

## Tujuan batch

Batch ini mencakup URL yang pada master mapping sementara dikelompokkan sebagai program atau kategori pelatihan. Daftar ini dipisahkan dari batch foundation agar audit dapat membedakan:
- halaman induk/rumpun pelatihan;
- detail satu program atau jenjang sertifikasi;
- varian skema, kelas, lokasi, atau level;
- halaman yang ternyata merupakan jasa konsultasi, artikel, arsip, atau duplikat.

Klasifikasi awal hanya petunjuk untuk menentukan urutan review. Jangan menganggapnya sebagai tipe konten final.

## Aturan pemeriksaan

Untuk setiap URL, isi antrean audit berdasarkan bukti:
1. **Teknis:** HTTP status, final URL, redirect chain, title, H1, meta description, canonical, robots, word count, excerpt, dan error crawl.
2. **Editorial:** tipe aktual (PROGRAM_DETAIL, TRAINING_CATEGORY, SERVICE, INSTITUTIONAL, EDITORIAL, ARCHIVE_OR_CAMPAIGN, DUPLICATE_OR_VARIANT, atau UNCLEAR).
3. **Intent:** transactional, informational, navigational, atau mixed.
4. **Entitas:** nama program, skema/sertifikasi, level/kelas, target peserta, dan hubungan parent-child jika dapat dibuktikan.
5. **Migrasi:** kandidat route baru yang benar-benar tersedia/direncanakan dan keputusan KEEP, REDIRECT, MERGE, ARCHIVE, atau 410 beserta alasan.
6. **Prioritas SEO:** jangan ditetapkan dari lastmod atau urutan sitemap; gunakan data Search Console, analytics, backlink, dan konfirmasi bisnis.

Jika halaman tidak dapat diakses crawler, tandai kegagalan dan lakukan pemeriksaan alternatif. Jangan otomatis mengarahkannya ke kategori terdekat atau menghapusnya.

## Daftar kandidat — 95 URL

| No. | URL lama | Klasifikasi awal |
|---:|---|---|
| 1 | https://pusattrainingk3.com/ahli-k3/ | Program / kategori pelatihan (perlu validasi) |
| 2 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-migas/ | Program / kategori pelatihan (perlu validasi) |
| 4 | https://pusattrainingk3.com/safety-kesehatan-2/ | Program / kategori pelatihan (perlu validasi) |
| 7 | https://pusattrainingk3.com/operator-k3/ | Program / kategori pelatihan (perlu validasi) |
| 8 | https://pusattrainingk3.com/safety-general/ | Program / kategori pelatihan (perlu validasi) |
| 9 | https://pusattrainingk3.com/safety-pertambangan/ | Program / kategori pelatihan (perlu validasi) |
| 10 | https://pusattrainingk3.com/safety-bekerja-di-ketinggian/ | Program / kategori pelatihan (perlu validasi) |
| 11 | https://pusattrainingk3.com/safety-kebakaran/ | Program / kategori pelatihan (perlu validasi) |
| 12 | https://pusattrainingk3.com/smk3/ | Program / kategori pelatihan (perlu validasi) |
| 13 | https://pusattrainingk3.com/safety-kebakaran/damkar-kelas-d/ | Program / kategori pelatihan (perlu validasi) |
| 14 | https://pusattrainingk3.com/safety-kebakaran/pemadam-kebakaran-kelas-a/ | Program / kategori pelatihan (perlu validasi) |
| 15 | https://pusattrainingk3.com/safety-kebakaran/training-paket-pemadam-kebakaran-kelas-d-b-a/ | Program / kategori pelatihan (perlu validasi) |
| 16 | https://pusattrainingk3.com/sistem-manajemen-keselamatan-dan-kesehatan-kerja-k3/ | Program / kategori pelatihan (perlu validasi) |
| 17 | https://pusattrainingk3.com/operator-k3/operator-gondola-2/ | Program / kategori pelatihan (perlu validasi) |
| 20 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-pemadam-kebakaran/pemadam-kebakaran-kelas-c/ | Program / kategori pelatihan (perlu validasi) |
| 21 | https://pusattrainingk3.com/operator-k3/pelatihan-operator-boiler-tingkat-1/ | Program / kategori pelatihan (perlu validasi) |
| 22 | https://pusattrainingk3.com/operator-k3/pelatihan-operator-boiler-tingkat-2/ | Program / kategori pelatihan (perlu validasi) |
| 25 | https://pusattrainingk3.com/safety-general/training-emergency-response-plan/ | Program / kategori pelatihan (perlu validasi) |
| 26 | https://pusattrainingk3.com/bnsp/ | Program / kategori pelatihan (perlu validasi) |
| 27 | https://pusattrainingk3.com/k3-umum-bnsp/ | Program / kategori pelatihan (perlu validasi) |
| 28 | https://pusattrainingk3.com/k3-migas-bnsp/ | Program / kategori pelatihan (perlu validasi) |
| 29 | https://pusattrainingk3.com/higiene-industri/ | Program / kategori pelatihan (perlu validasi) |
| 30 | https://pusattrainingk3.com/k3-konstruksi-bnsp/ | Program / kategori pelatihan (perlu validasi) |
| 31 | https://pusattrainingk3.com/bnsp/ahli-muda-k3-umum-bnsp/ | Program / kategori pelatihan (perlu validasi) |
| 34 | https://pusattrainingk3.com/juru-las-welder/juru-las-gtaw/ | Program / kategori pelatihan (perlu validasi) |
| 35 | https://pusattrainingk3.com/juru-las-welder/juru-las-smaw/ | Program / kategori pelatihan (perlu validasi) |
| 36 | https://pusattrainingk3.com/training-k3-listrik/ | Program / kategori pelatihan (perlu validasi) |
| 37 | https://pusattrainingk3.com/bnsp/pemantauan-dan-analisis-pengelolaan-limbah-b3/ | Program / kategori pelatihan (perlu validasi) |
| 40 | https://pusattrainingk3.com/pelatihan-awareness/energi/ | Program / kategori pelatihan (perlu validasi) |
| 42 | https://pusattrainingk3.com/bnsp/okupasi-nasional-penjamah-makanan-food-handler/ | Program / kategori pelatihan (perlu validasi) |
| 43 | https://pusattrainingk3.com/pelatihan-awareness/training-awareness-emergency-response-plan/ | Program / kategori pelatihan (perlu validasi) |
| 44 | https://pusattrainingk3.com/safety-offshore/ | Program / kategori pelatihan (perlu validasi) |
| 45 | https://pusattrainingk3.com/training-k3-bahaya-confined-space/ | Program / kategori pelatihan (perlu validasi) |
| 46 | https://pusattrainingk3.com/training-k3-manajemen-alat-pelindung-diri/ | Program / kategori pelatihan (perlu validasi) |
| 53 | https://pusattrainingk3.com/bnsp/k3-migas-bnsp-jakarta/ | Program / kategori pelatihan (perlu validasi) |
| 56 | https://pusattrainingk3.com/operator/ | Program / kategori pelatihan (perlu validasi) |
| 57 | https://pusattrainingk3.com/teknisi/ | Program / kategori pelatihan (perlu validasi) |
| 58 | https://pusattrainingk3.com/petugas/ | Program / kategori pelatihan (perlu validasi) |
| 59 | https://pusattrainingk3.com/bnsp/pemantauan-dan-analisis-pengolahan-sampah-limbah-padat-non-b3/ | Program / kategori pelatihan (perlu validasi) |
| 60 | https://pusattrainingk3.com/bnsp/operator-pengambilan-contoh-air/ | Program / kategori pelatihan (perlu validasi) |
| 61 | https://pusattrainingk3.com/pelatihank3/ | Program / kategori pelatihan (perlu validasi) |
| 62 | https://pusattrainingk3.com/pelatihan-awareness/ | Program / kategori pelatihan (perlu validasi) |
| 63 | https://pusattrainingk3.com/petugas-teknisi/ | Program / kategori pelatihan (perlu validasi) |
| 69 | https://pusattrainingk3.com/safety-general/incident-investigation/ | Program / kategori pelatihan (perlu validasi) |
| 70 | https://pusattrainingk3.com/safety-offshore/pelatihan-penanganan-h2s/ | Program / kategori pelatihan (perlu validasi) |
| 73 | https://pusattrainingk3.com/safety-offshore/rigger-offshore/ | Program / kategori pelatihan (perlu validasi) |
| 74 | https://pusattrainingk3.com/inhouse-first-aid-p3k-awareness/ | Program / kategori pelatihan (perlu validasi) |
| 75 | https://pusattrainingk3.com/12314-2/ | Program / kategori pelatihan (perlu validasi) |
| 79 | https://pusattrainingk3.com/ahli-k3/pelatihan-k3-umum-slta/ | Program / kategori pelatihan (perlu validasi) |
| 81 | https://pusattrainingk3.com/operator-pemula/pelatihan-operator-forklift-bisa-untuk-pemula/ | Program / kategori pelatihan (perlu validasi) |
| 82 | https://pusattrainingk3.com/operator-pemula/ | Program / kategori pelatihan (perlu validasi) |
| 83 | https://pusattrainingk3.com/operator-k3/pelatihan-petugas-k3-kimia/ | Program / kategori pelatihan (perlu validasi) |
| 84 | https://pusattrainingk3.com/training-auditor-smk3/ | Program / kategori pelatihan (perlu validasi) |
| 85 | https://pusattrainingk3.com/operator-wheel-loader/ | Program / kategori pelatihan (perlu validasi) |
| 86 | https://pusattrainingk3.com/safety-kesehatan-2/pelatihan-medical-check-up-and-fit-to-work/ | Program / kategori pelatihan (perlu validasi) |
| 87 | https://pusattrainingk3.com/basic-h2s-training-course-9014-opito-approved/ | Program / kategori pelatihan (perlu validasi) |
| 89 | https://pusattrainingk3.com/ahli-k3/ahli-k3-pesawat-tenaga-produksi/ | Program / kategori pelatihan (perlu validasi) |
| 90 | https://pusattrainingk3.com/k3-migas/ | Program / kategori pelatihan (perlu validasi) |
| 91 | https://pusattrainingk3.com/safety-offshore/bosiet-huet-basic-sea-survival/ | Program / kategori pelatihan (perlu validasi) |
| 92 | https://pusattrainingk3.com/safety-kesehatan-2/training-hiperkes/ | Program / kategori pelatihan (perlu validasi) |
| 93 | https://pusattrainingk3.com/ahli-k3/ahli-k3-umum/ | Program / kategori pelatihan (perlu validasi) |
| 94 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-konstruksi/ | Program / kategori pelatihan (perlu validasi) |
| 95 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-listrik/ | Program / kategori pelatihan (perlu validasi) |
| 96 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-kimia/ | Program / kategori pelatihan (perlu validasi) |
| 97 | https://pusattrainingk3.com/operator-k3/teknisi-k3-listrik/ | Program / kategori pelatihan (perlu validasi) |
| 98 | https://pusattrainingk3.com/operator-k3/teknisi-k3-perancah/ | Program / kategori pelatihan (perlu validasi) |
| 99 | https://pusattrainingk3.com/operator-k3/pelatihan-p3k/ | Program / kategori pelatihan (perlu validasi) |
| 100 | https://pusattrainingk3.com/operator-k3/operator-boiler/ | Program / kategori pelatihan (perlu validasi) |
| 101 | https://pusattrainingk3.com/operator-k3/operator-gondola/ | Program / kategori pelatihan (perlu validasi) |
| 102 | https://pusattrainingk3.com/operator-k3/operator-dan-teknisi-lift/ | Program / kategori pelatihan (perlu validasi) |
| 103 | https://pusattrainingk3.com/supervisi-perancah/ | Program / kategori pelatihan (perlu validasi) |
| 104 | https://pusattrainingk3.com/training-teknisi-k3-bidang-bejana-tekanan-tangki-timbun/ | Program / kategori pelatihan (perlu validasi) |
| 105 | https://pusattrainingk3.com/training-teknisi-k3-bidang-pesawat-angkat-dan-angkut/ | Program / kategori pelatihan (perlu validasi) |
| 106 | https://pusattrainingk3.com/training-teknisi-k3-bidang-pesawat-tenaga-produksi/ | Program / kategori pelatihan (perlu validasi) |
| 107 | https://pusattrainingk3.com/pelatihan-operator-mesin-produksi-perkakas-kelas-1/ | Program / kategori pelatihan (perlu validasi) |
| 108 | https://pusattrainingk3.com/pelatihan-k3-operator-mesin-produksi-perkakas-kelas-2/ | Program / kategori pelatihan (perlu validasi) |
| 109 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-pesawat-uap-dan-bejana-tekan/ | Program / kategori pelatihan (perlu validasi) |
| 110 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-pesawat-angkat-angkut/ | Program / kategori pelatihan (perlu validasi) |
| 111 | https://pusattrainingk3.com/ahli-k3/ahli-k3-lingkungan/ | Program / kategori pelatihan (perlu validasi) |
| 113 | https://pusattrainingk3.com/petugas-penyelamat-ruang-terbatas-confined-space/ | Program / kategori pelatihan (perlu validasi) |
| 114 | https://pusattrainingk3.com/operator-k3/pelatihan-rigger-juru-ikat/ | Program / kategori pelatihan (perlu validasi) |
| 115 | https://pusattrainingk3.com/safety-offshore/bosiet-opito/ | Program / kategori pelatihan (perlu validasi) |
| 116 | https://pusattrainingk3.com/pelatihan-tenaga-kerja-pada-ketinggian-tingkat-2/ | Program / kategori pelatihan (perlu validasi) |
| 117 | https://pusattrainingk3.com/safety-bekerja-di-ketinggian/bekerja-pada-ketinggian-tat/ | Program / kategori pelatihan (perlu validasi) |
| 118 | https://pusattrainingk3.com/operator-k3/operator-forklift/ | Program / kategori pelatihan (perlu validasi) |
| 119 | https://pusattrainingk3.com/operator-k3/operator-crane/ | Program / kategori pelatihan (perlu validasi) |
| 122 | https://pusattrainingk3.com/juru-las-welder/ | Program / kategori pelatihan (perlu validasi) |
| 123 | https://pusattrainingk3.com/operator-k3/operator-genset/ | Program / kategori pelatihan (perlu validasi) |
| 124 | https://pusattrainingk3.com/ahli-k3/training-ahli-k3-pemadam-kebakaran/ | Program / kategori pelatihan (perlu validasi) |
| 125 | https://pusattrainingk3.com/ahli-k3/k3-ruang-terbatas/ | Program / kategori pelatihan (perlu validasi) |
| 126 | https://pusattrainingk3.com/safety-pertambangan/pembekalan-pengawas-operasional-pertama-pop-pertambangan/ | Program / kategori pelatihan (perlu validasi) |
| 127 | https://pusattrainingk3.com/ketinggian-percobaan-nawi-iki-jangan-dihapus/ | Program / kategori pelatihan (perlu validasi) |
| 128 | https://pusattrainingk3.com/sertifikasi-kemenaker-ri/teknisi-k3-ruang-terbatas/ | Program / kategori pelatihan (perlu validasi) |
| 135 | https://pusattrainingk3.com/pelatihan-mengedit-wordpress/ | Program / kategori pelatihan (perlu validasi) |
| 136 | https://pusattrainingk3.com/otomotif-getar-buana-p/ | Program / kategori pelatihan (perlu validasi) |

## Urutan kerja yang disarankan

1. Periksa URL induk dan rumpun terlebih dahulu, misalnya kategori Ahli K3, Operator K3, Safety, BNSP, dan rumpun lain yang terbukti dari isi.
2. Periksa detail program/jenjang setelah struktur induknya dipahami.
3. Bandingkan halaman yang tampak serupa berdasarkan isi, intent, target peserta, skema sertifikasi, dan CTA.
4. Tandai varian lokasi/kelas/level untuk keputusan canonical atau merge secara manual.
5. Cocokkan semua kandidat tujuan dengan arsitektur URL baru. Jangan membuat tujuan hanya dengan mengubah slug lama.
6. Sinkronkan keputusan final ke master mapping hanya setelah bukti cukup dan review disetujui.

## Batasan

- Jumlah kandidat: 95; total antrean seluruh page tetap 136 URL.
- Tidak ada data hasil crawl yang diasumsikan tersedia di dokumen ini.
- Tidak ada judul/H1 aktual, ringkasan isi, intent final, URL tujuan, atau keputusan migrasi yang diisi berdasarkan dugaan.
- Dokumen ini tidak mengubah aplikasi, master mapping 572 URL, maupun konfigurasi redirect.
- Pengujian crawler 10 URL yang dijadwalkan tetap menjadi gerbang sebelum crawl penuh 572 URL.
