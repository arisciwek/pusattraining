# Rencana Pengisian Konten Awal — Pusattraining

> Status: rencana kerja tahap awal, disusun setelah scaffold Astro di-merge dan dipasang.
> Branch: `content/initial-training-catalog`
> Sumber inventaris: `INVENTARIS-URL-SITEMAP.csv`, `ANALISIS-SITEMAP-DAN-RENCANA-MIGRASI-ASTRO.md`, dan sitemap snapshot lama.
> Catatan: klasifikasi di bawah adalah kandidat editorial dari sitemap, bukan pengesahan bahwa semua program masih aktif.

## 1. Tujuan tahap awal

Membentuk halaman yang dapat dirender dengan data minimum tanpa menunggu seluruh komponen/block selesai. Pekerjaan dipisahkan menjadi:

1. menetapkan dan mengimplementasikan schema collection;
2. membuat landing page kategori;
3. membuat master program pelatihan;
4. membuat jadwal yang merujuk master program;
5. menyempurnakan konten dan block secara bertahap.

Jangan membuat satu file untuk setiap URL lama secara otomatis. Sitemap lama berisi 572 URL (136 page dan 436 post), termasuk batch jadwal berulang, artikel, promosi, lowongan, berita, dan konten historis.

## 2. Urutan konten yang diprioritaskan

| Urutan | Jenis konten | Tujuan | Ketergantungan |
|---|---|---|---|
| 1 | Schema dan kontrak collection | Menjamin field dan relasi stabil sebelum data dibuat | Tidak ada |
| 2 | Landing page kategori | Membentuk navigasi dan halaman rumpun pelatihan | Schema pages |
| 3 | Master program (`trainings`) | Membentuk URL detail program kanonis | Schema trainings |
| 4 | Jadwal (`schedules`) | Menghubungkan batch ke program melalui `trainingSlug` | Master training dan kontrak schedule |
| 5 | Halaman institusional | Beranda, tentang, kontak, pendaftaran, in-house | Schema pages |
| 6 | Layanan non-pelatihan | Memisahkan konsultasi/jasa dari katalog training | Keputusan jenis collection/halaman |
| 7 | Artikel | Mengembangkan topical coverage dan internal linking | Schema articles |

Tahap awal tidak perlu mengisi semua paragraf, FAQ, gallery, syllabus, atau block. Frontmatter minimal yang valid cukup untuk menghasilkan halaman dasar. Field wajib schema tetap wajib; "minimal" bukan berarti mengabaikan kontrak.

## 3. Kandidat taksonomi kategori

Berikut 14 rumpun dari analisis sitemap. Nama dan cakupan perlu diperiksa terhadap isi halaman lama dan dikonfirmasi sebelum dianggap final.

| Kode kerja | Kandidat kategori | Contoh program/kelompok yang terdeteksi |
|---|---|---|
| KAT-01 | Ahli K3 dan Manajemen K3 | Ahli K3 Umum, Ahli K3 Konstruksi, Ahli K3 Migas, Auditor SMK3, Pengawas K3 |
| KAT-02 | K3 Konstruksi dan Infrastruktur | K3 Ketinggian, TKBT, TKPK, perancah |
| KAT-03 | K3 Migas dan Energi | Ahli/Pengawas K3 Migas, POP, H2S, BOSIET/HUET, rigger offshore |
| KAT-04 | Kebakaran dan Tanggap Darurat | Damkar kelas D/C/B/A, fireman, fire officer, ERP |
| KAT-05 | Ruang Terbatas dan Gas Berbahaya | Teknisi K3 ruang terbatas, rescue confined space, gas tester, H2S |
| KAT-06 | Operator Alat Berat dan Pesawat Angkat | Forklift, crane, gondola, wheel loader, genset |
| KAT-07 | Pesawat Uap, Bejana Tekan, dan Produksi | Operator boiler tingkat 1/2, bejana tekan, pesawat tenaga dan produksi |
| KAT-08 | K3 Listrik dan Kelistrikan | Ahli K3 Listrik, Teknisi K3 Listrik |
| KAT-09 | Pengelasan dan Rigging | Welder SMAW/GTAW, juru ikat/rigger |
| KAT-10 | Higiene Industri dan Kesehatan Kerja | HIMU/HIMA/HIU, Hiperkes, kesehatan kerja |
| KAT-11 | Lingkungan dan Energi | PPPA/PPPU/POPAL/POIPU, limbah B3, AMDAL, manajemen energi |
| KAT-12 | P3K dan Kesiapsiagaan Medis | Petugas P3K, first aid |
| KAT-13 | K3 Kimia dan Risiko Proses | Petugas K3 Kimia, HAZOPS, investigasi insiden |
| KAT-14 | Program Sertifikasi dan Khusus | Program BNSP/Kemnaker/OPITO yang belum tepat masuk rumpun lain |

**Catatan klasifikasi:** KAT-14 adalah kelompok kerja sementara, bukan rekomendasi untuk menjadikan badan sertifikasi sebagai kategori katalog. Skema sertifikasi sebaiknya menjadi atribut program. Awareness dan in-house adalah format program/penyelenggaraan, bukan rumpun kompetensi.

## 4. Aturan membentuk halaman kategori dan program

- Landing kategori adalah halaman navigasi/kurasi rumpun, bukan master program.
- Master program dibuat satu kali di collection `trainings`, meskipun dapat ditampilkan di lebih dari satu landing kategori.
- URL detail program mengikuti keputusan arsitektur URL: dangkal di bawah `/pelatihan/<slug-program>/`; kategori disimpan sebagai relasi/data, bukan wajib menjadi parent URL.
- Program dengan kelas/jenjang berbeda hanya menjadi record terpisah bila substansi kompetensi, kurikulum, atau intent pencariannya memang berbeda.
- Kemnaker, BNSP, dan OPITO tidak otomatis membuat duplikasi program.
- Jangan menulis tanggal, harga, kuota, lokasi, status aktif, atau badan sertifikasi berdasarkan dugaan dari slug.
- Setiap record yang dapat direlasikan wajib memiliki `id` dan `ulid`. Untuk master training, `trainingSlug` tetap digunakan sesuai kontrak relasi schedule.
- Schedule tetap mengikuti `FRONTMATTER-SCHEDULE-CONTRACT.md`; jangan membuat nama field schedule alternatif.

## 5. Kontrak frontmatter dan progressive content

Dokumen `CONTENT-DRIVEN-PAGE-ARCHITECTURE.md` menjadi acuan halaman. Dokumen `FRONTMATTER-SCHEDULE-CONTRACT.md` menjadi acuan schedule.

Sebelum membuat record pertama, implementasikan dan validasi schema collection untuk:
- `pages`: halaman institusional dan landing kategori;
- `trainings`: master program pelatihan;
- `schedules`: batch pelatihan dengan kontrak bersama;
- `articles`: konten editorial.

Jangan mengasumsikan schema `trainings` atau `pages` sudah terpasang hanya karena kontraknya tercatat di dokumen. Pada saat rencana ini dibuat, branch `main` belum memiliki `src/content.config.ts` maupun direktori `src/content/`.

Setelah schema tersedia, record minimum hanya berisi field wajib schema, identitas stabil, title/description, status publikasi, dan relasi yang sudah diverifikasi. Field untuk block opsional dapat ditambahkan belakangan. Halaman tanpa block khusus harus tetap dirender dengan template dasar yang aman.

## 6. Urutan implementasi teknis berikutnya

1. Tambahkan `src/content.config.ts` menggunakan API Content Layer sesuai versi Astro yang terpasang.
2. Definisikan collection dan schema tanpa mengubah kontrak schedule.
3. Buat route dinamis untuk landing kategori dan detail training.
4. Buat template fallback sederhana yang tidak bergantung pada block yang belum tersedia.
5. Masukkan satu kategori dan beberapa program contoh yang datanya dapat diverifikasi.
6. Jalankan `npm run check` dan `npm run build`.
7. Setelah lolos, lanjutkan pengisian kategori dan program secara batch kecil.
8. Tambahkan jadwal hanya setelah relasi `trainingSlug` valid dan data batch faktual tersedia.

## 7. Kriteria selesai tahap katalog awal

- Semua landing kategori yang disetujui memiliki URL dan frontmatter valid.
- Semua program prioritas memiliki satu master record kanonis.
- Tidak ada duplikasi ID, ULID, trainingSlug, atau slug.
- Relasi kategori-program dan schedule-training tervalidasi.
- Program dapat dirender tanpa seluruh block selesai.
- Build Astro berhasil.
- Belum ada redirect otomatis yang diputuskan hanya dari kecocokan slug.


## 8. Status implementasi branch

Pekerjaan awal sudah ditambahkan pada branch `content/initial-training-catalog`:

- [x] Content Collections `pages`, `trainings`, `schedules`, dan `articles`.
- [x] Route katalog `/pelatihan/`.
- [x] Route dinamis kategori/program `/pelatihan/<slug>/`.
- [x] Alias katalog lama `/training/` dengan canonical ke `/pelatihan/`.
- [x] Empat belas record kategori kandidat.
- [x] Delapan master program awal yang ditemukan di sitemap.
- [x] Relasi program-kategori melalui `categoryIds`.
- [x] Validasi identitas unik dan relasi kategori/schedule saat static generation.
- [x] Homepage dan navigasi utama mengambil/mengarah ke katalog baru.
- [ ] Jalankan `npm run check` dan `npm run build` setelah branch di-pull.
- [ ] Audit manual taksonomi dan verifikasi seluruh deskripsi/program terhadap konten sumber.

Build belum diklaim lulus karena eksekusi lokal belum dilakukan pada environment repository. Jangan merge sebelum `npm run check` dan `npm run build` berhasil.
