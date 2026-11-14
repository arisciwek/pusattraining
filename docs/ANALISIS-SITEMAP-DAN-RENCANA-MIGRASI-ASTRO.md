# Analisis Sitemap dan Rencana Migrasi Pusat Training K3

> Status dokumen: analisis awal berbasis sitemap, bukan audit isi halaman.
> Sumber: snapshot sitemap yang disimpan di `docs/page-sitemap.xml`, `docs/post-sitemap.xml`, dan `docs/sitemap.xml`.
> Tanggal snapshot sumber: 14 November 2026 (metadata generator WordPress).
> Domain lama: https://pusattrainingk3.com/

## 1. Ringkasan eksekutif

Sitemap snapshot berisi **572 URL**: **136 URL page** dan **436 URL post**. Angka ini adalah jumlah URL yang ditemukan, bukan jumlah produk pelatihan. Banyak post adalah pengumuman batch/jadwal yang berulang untuk program yang sama, sementara sebagian lain berupa artikel, promosi, berita, lowongan, atau konten historis.

Kesimpulan strategis: migrasi tidak boleh dilakukan dengan mengubah setiap URL menjadi satu halaman Astro tanpa normalisasi. Pisahkan entitas **program pelatihan**, **jadwal/batch**, **artikel**, **layanan konsultasi**, dan **halaman institusional**. Program menjadi sumber data kanonis; jadwal dan artikel menghubungkan ke program terkait.

### Angka yang dapat dipastikan dari sitemap

| Kelompok sitemap | URL |
|---|---:|
| Page | 136 |
| Post | 436 |
| Total | 572 |

Angka ini adalah jumlah entri `<loc>` dalam dua sitemap, bukan jumlah URL unik lintas sumber yang sudah dideduplikasi secara menyeluruh. Inventaris mentah tersedia di [INVENTARIS-URL-SITEMAP.csv](./INVENTARIS-URL-SITEMAP.csv).

## 2. Apa yang tampak di dalam sitemap

### 2.1 Halaman utama (page)

Page sitemap mencampur beberapa fungsi:

- **Halaman institusional**: beranda, tentang kami, kontak, pendaftaran, galeri, berita.
- **Halaman kategori/landing**: Ahli K3, Operator K3, Teknisi K3, Safety General, Safety Pertambangan, Safety Ketinggian, Safety Kebakaran, SMK3, Higiene Industri.
- **Landing program spesifik**: Ahli K3 Umum, Ahli K3 Konstruksi, Ahli K3 Migas, Ahli Higiene Industri (HIMU/HIMA/HIU), Teknisi K3 Listrik, Teknisi K3 Ruang Terbatas, Operator Boiler, Forklift, Crane, Gondola, Welder, dan lainnya.
- **Layanan non-pelatihan**: pendampingan SMK3, pendampingan ISO 9001, Riksa Uji, pengurusan SLF, perpanjangan SIO Forklift, perpanjangan lisensi K3.
- **Halaman yang perlu audit manual**: slug generik/ambigu seperti `operator`, `teknisi`, `petugas`, `pelatihank3`, `12314-2`, `ketinggian-percobaan-nawi-iki-jangan-dihapus`, dan beberapa halaman WordPress/duplikat seperti `home`, `about`, `services`, `contact-3`.

### 2.2 Post sitemap

Post sitemap memuat rentang konten historis yang panjang. Pola yang terlihat:

1. **Jadwal/batch pelatihan**: judul mengandung tanggal, bulan, tahun, lokasi, mode training, atau kata seperti siap jalan, in-house, batch.
2. **Artikel edukasi/materi**: misalnya materi K3 Listrik, sertifikasi K3 Listrik, transfer/pengaliran arus, perhitungan arus, dan materi migas.
3. **Promosi dan pengumuman**: promo pelatihan, kuota penuh, pendaftaran ditutup.
4. **Lowongan/rekrutmen**: kebutuhan operator, welder, ahli K3, dokter perusahaan, POP.
5. **Konten non-K3 atau tidak jelas relevansinya**: beberapa post lama terkait operasi migas/keuangan atau slug yang perlu ditinjau.

Karena itu 436 post tidak boleh otomatis dianggap 436 artikel SEO yang harus dipertahankan sebagai artikel aktif.

## 3. Taksonomi layanan dan pelatihan yang disarankan

Berikut taksonomi awal untuk navigasi dan pengelompokan katalog. Ini **bukan hitungan final jumlah program unik**; beberapa nama dapat menjadi subprogram, jenjang, atau varian sertifikasi.

| Kode | Kategori induk | Cakupan program yang teridentifikasi |
|---|---|---|
| KAT-01 | Ahli K3 dan Manajemen K3 | Ahli K3 Umum (muda/madya/utama), auditor SMK3, pengawas K3, dasar-dasar K3 |
| KAT-02 | K3 Konstruksi dan Infrastruktur | Ahli K3 Konstruksi (muda/madya/utama), tenaga kerja pada ketinggian, perancah, supervisi perancah |
| KAT-03 | K3 Migas dan Energi | Ahli K3 Migas, pengawas K3 Migas, POP pertambangan, H2S, BOSIET/HUET/OPITO, rigger offshore |
| KAT-04 | K3 Kebakaran dan Tanggap Darurat | Damkar kelas D/C/B/A, fireman, fire officer, emergency response plan, awareness ERP |
| KAT-05 | Ruang Terbatas dan Gas Berbahaya | Teknisi K3 ruang terbatas, petugas penyelamat confined space, gas tester, H2S, deteksi gas |
| KAT-06 | Operator Alat Berat dan Pesawat Angkat | Forklift, crane, wheel loader, gondola, operator genset, operator alat angkat/angkut |
| KAT-07 | Pesawat Uap, Bejana Tekan, dan Produksi | Operator boiler kelas/tingkat 1–2, teknisi bejana tekan/tangki timbun, pesawat tenaga dan produksi, mesin produksi/perkakas |
| KAT-08 | K3 Listrik dan Kelistrikan | Ahli K3 Listrik, teknisi K3 listrik, keselamatan kerja listrik |
| KAT-09 | Pengelasan dan Rigging | Welder SMAW/GTAW, juru ikat/rigger, rigger offshore |
| KAT-10 | Higiene Industri dan Kesehatan Kerja | HIMU/HIMA/HIU, Hiperkes dokter/paramedis, medical check-up/fit to work |
| KAT-11 | Lingkungan dan Energi | PPPA/PPPU/POPAL/POIPU, limbah B3/non-B3, AMDAL, operator pengambilan contoh air, manajer/auditor energi |
| KAT-12 | P3K dan Kesiapsiagaan Medis | Petugas P3K/first aid, P3K awareness |
| KAT-13 | K3 Kimia dan Risiko Proses | Petugas K3 Kimia, HAZOPS, APD, investigasi kecelakaan/insiden |
| KAT-14 | Sertifikasi dan Program Khusus | Program BNSP, Kemnaker RI, OPITO; in-house dan awareness sebagai format penyelenggaraan, bukan kategori kompetensi |

### Prinsip klasifikasi

- **Kategori** menjawab bidang kompetensi; bukan lembaga sertifikasi.
- **Program** adalah produk pelatihan yang dapat dipilih pengguna.
- **Jenjang/kelas** (muda/madya/utama; kelas A/B/C/D; tingkat 1/2) menjadi atribut program atau varian yang memang berbeda secara kurikulum.
- **Skema sertifikasi** (Kemnaker, BNSP, OPITO) adalah atribut terpisah. Jangan menjadikannya kategori utama yang menggandakan seluruh katalog.
- **Mode penyelenggaraan** (public, in-house, online, offline, blended) dan lokasi adalah atribut jadwal/batch.
- **Awareness** dan **in-house** umumnya format program/penyelenggaraan, bukan bidang kompetensi baru.

## 4. Model konten yang disarankan

Pisahkan data menjadi entitas berikut:

### 4.1 Program pelatihan

Satu record untuk satu program kanonis. Contoh: Teknisi K3 Ruang Terbatas. Field yang disarankan:

- `id`, `slug`, `title`, `shortTitle`, `description`
- `category`, `subcategory`, `competencyCode` bila tersedia
- `certificationBodies[]` (Kemnaker/BNSP/OPITO atau lainnya setelah verifikasi)
- `levels[]` / `classes[]` bila memang relevan
- `audience`, `prerequisites`, `learningOutcomes[]`
- `duration`, `deliveryModes[]`
- `relatedPrograms[]`, `relatedArticles[]`
- metadata SEO: title, description, canonical, OG image
- `legacyUrls[]` untuk pemetaan URL lama

### 4.2 Jadwal/batch

Satu record untuk satu penyelenggaraan program pada tanggal tertentu:

- `id`, `programId`, `startDate`, `endDate`
- `registrationDeadline`, `location`, `deliveryMode`
- `quota`, `availabilityStatus`, `price` (hanya bila datanya valid dan boleh dipublikasikan)
- `legacyUrl`, metadata SEO dan status publikasi

Jadwal lama yang sudah lewat jangan dihapus otomatis. Evaluasi apakah tetap berguna sebagai arsip, punya backlink/traffic, atau lebih baik dialihkan. Hindari menampilkan jadwal kadaluwarsa seolah masih tersedia.

### 4.3 Artikel

Artikel edukasi memiliki URL dan metadata sendiri, serta relasi ke satu atau lebih program. Jangan mencampur artikel dengan halaman program. Artikel sebaiknya memberi jawaban informasional, sedangkan halaman program berorientasi konversi/pendaftaran.

### 4.4 Layanan non-pelatihan

Buat entitas/halaman layanan tersendiri untuk pendampingan SMK3, ISO 9001, Riksa Uji, SLF, perpanjangan SIO, dan lisensi K3. Jangan memaksa layanan konsultasi masuk ke katalog program training.

## 5. Rekomendasi struktur navigasi

Navigasi sebaiknya dimulai dari kebutuhan pengunjung, bukan daftar panjang semua URL.

- **Pelatihan K3**
  - Ahli K3 dan Manajemen K3
  - Konstruksi dan Ketinggian
  - Migas dan Pertambangan
  - Kebakaran dan Emergency Response
  - Ruang Terbatas dan Gas Berbahaya
  - Operator dan Alat Berat
  - Pesawat Uap dan Produksi
  - Listrik
  - Welder dan Rigging
  - Higiene Industri dan Kesehatan Kerja
  - Lingkungan dan Energi
  - P3K dan K3 Kimia
- **Sertifikasi** (halaman penjelasan skema/badan sertifikasi; filter katalog, bukan duplikasi katalog)
- **Jadwal Pelatihan**
- **In-House Training**
- **Jasa K3** (SMK3, ISO, Riksa Uji, SLF, SIO/lisensi)
- **Artikel / Panduan**
- **Tentang Kami / Kontak / Pendaftaran**

Di mobile, kategori dapat memakai navigasi bertingkat; jangan menampilkan 14 kategori induk sekaligus pada header.

## 6. Strategi URL dan SEO migrasi

### 6.1 Jangan mengganti slug yang sudah punya nilai SEO tanpa alasan

- Pertahankan URL lama bila struktur dan maksud pencariannya masih benar.
- Bila URL harus berubah, buat redirect **301 satu-ke-satu** ke halaman paling relevan.
- Jangan mengarahkan semua URL lama ke beranda atau kategori umum.
- Buat mapping eksplisit dari setiap URL lama ke URL baru; mapping harus diperiksa manusia.
- Satu program kanonis memiliki satu URL utama. Variasi nama, kelas, sertifikasi, dan lokasi tidak boleh membuat halaman tipis yang saling bersaing.

### 6.2 Pisahkan intent pencarian

- **Transactional**: halaman program, jadwal aktif, in-house training, jasa.
- **Informational**: artikel, materi, syarat, prosedur, perbedaan sertifikasi.
- **Navigational**: tentang, kontak, pendaftaran.

Halaman program harus memiliki informasi yang cukup unik: tujuan, sasaran peserta, persyaratan, materi, durasi, metode, sertifikasi, FAQ, jadwal, dan CTA. Hindari membuat halaman program hanya berisi beberapa paragraf generik.

### 6.3 Jadwal dan arsip

- Jadwal aktif: tampilkan tanggal, lokasi, mode, status, dan CTA dengan jelas.
- Jadwal lampau: arsipkan bila punya nilai pencarian/backlink; beri penanda sudah terlaksana dan tautan ke jadwal mendatang/program induk.
- Jika konten jadwal lama sangat tipis/duplikat/tidak relevan, evaluasi 301 atau 410 berdasarkan nilai dan kesepadanan kontennya.
- Jangan menghapus semua post lama hanya karena tanggalnya lewat.

### 6.4 Metadata dan structured data

- Sediakan title dan meta description unik untuk halaman penting.
- Canonical harus menunjuk URL final yang konsisten.
- Gunakan BreadcrumbList, Organization, Article/BlogPosting, dan Course/Event hanya jika sesuai dengan konten nyata dan implementasi memenuhi pedoman Google.
- Sitemap baru hanya memuat URL canonical yang boleh diindeks (status 200, bukan noindex, bukan redirect).
- Pastikan robots.txt, sitemap index, canonical, pagination, dan internal linking konsisten.

### 6.5 Ukur sebelum dan sesudah migrasi

Sebelum cutover, simpan baseline dari Search Console/Analytics bila tersedia: klik, impresi, query, landing page, backlink, dan konversi. Setelah rilis, pantau 404, redirect chain, canonical terpilih, indeksasi, perubahan klik/impresi, dan formulir masuk.

## 7. Audit yang masih wajib sebelum menetapkan jumlah program

Sitemap hanya memberi URL, bukan isi lengkap, status program, silabus, atau validitas sertifikasi. Sebelum menyatakan jumlah final program:

1. Buka setiap 136 halaman dan catat judul/H1, isi, CTA, skema sertifikasi, serta statusnya.
2. Baca 436 post untuk membedakan jadwal, artikel, promosi, berita, lowongan, dan konten yang tidak relevan.
3. Normalisasi nama: contoh variasi ejaan TKBT/TKPK, confined space/ruang terbatas, damkar/pemadam, AK3U/Ahli K3 Umum.
4. Cocokkan program dengan sumber resmi/pemilik program untuk memastikan nama skema, jenjang, persyaratan, dan badan sertifikasi.
5. Tandai setiap URL: keep, merge, redirect, archive, noindex, atau remove.
6. Minta pemilik bisnis mengonfirmasi layanan aktif, layanan unggulan, jadwal reguler, harga, dan wilayah layanan.

**Catatan hitungan:** taksonomi 14 kategori di atas adalah kerangka pengelompokan yang disarankan dari nama URL. Ini bukan klaim bahwa situs menawarkan tepat 14 jenis pelatihan atau 14 program. Jumlah program unik baru bisa dihitung setelah deduplikasi judul dan pemeriksaan isi.

## 8. Rencana kerja bertahap

| Tahap | Pekerjaan | Output / kriteria selesai |
|---|---|---|
| 0. Baseline | Simpan sitemap, crawl URL, ekspor GSC/Analytics, cek status HTTP dan canonical | Baseline SEO + daftar URL lengkap |
| 1. Audit konten | Klasifikasi 572 URL, ekstrak title/H1, tanggal, tipe konten, status | Inventaris tervalidasi dan keputusan keep/merge/redirect |
| 2. Taksonomi | Tetapkan kategori, program kanonis, jenjang, sertifikasi, relasi | Master katalog program disetujui |
| 3. Arsitektur Astro | Definisikan collections/schema, layout, komponen kartu, filter, halaman detail | PRD dan struktur data stabil |
| 4. Migrasi konten | Migrasikan halaman institusional, kategori, program, artikel, layanan | Konten terstruktur dan review editorial |
| 5. Jadwal | Hubungkan batch ke program induk, status aktif/arsip, kalender | Satu sumber data jadwal yang konsisten |
| 6. SEO teknis | Redirect map, canonical, metadata, schema, sitemap, robots | Tidak ada redirect massal/chain; sitemap valid |
| 7. QA dan rilis | Uji build, tautan, mobile, formulir, structured data, crawl pascarilis | Checklist QA lulus dan monitoring aktif |

## 9. Prinsip implementasi Astro

- Pisahkan collections: `programs`, `categories`, `schedules`, `articles`, `services`, `pages`.
- Gunakan relasi berbasis ID/slug, bukan menyalin detail program ke setiap jadwal.
- Sediakan satu halaman kategori yang menampilkan program terkait dan artikel pendukung.
- Sediakan halaman detail program dengan jadwal aktif yang terhubung.
- Artikel memiliki relasi ke program; jangan mengubah setiap post menjadi halaman program.
- Buat redirect map sebagai data yang dapat diuji, bukan aturan regex yang terlalu luas.
- Terapkan komponen UI yang konsisten untuk card program, card jadwal, card artikel, breadcrumb, CTA, FAQ, dan filter.
- Konten sertifikasi, durasi, persyaratan, dan legalitas harus berasal dari data yang diverifikasi; jangan menebak dari slug.

## 10. Keputusan yang perlu dikunci bersama

1. Apakah katalog hanya menampilkan program yang masih aktif, sementara program lama disimpan sebagai arsip?
2. Apakah jadwal lampau tetap memiliki halaman publik atau sebagian digabung ke arsip program?
3. Apakah layanan non-pelatihan (Riksa Uji, SLF, SMK3, ISO, SIO) tetap berada di domain utama?
4. Apakah nama kategori memakai istilah yang familiar bagi calon peserta (mis. Operator Forklift) atau istilah regulasi/kompetensi yang lebih formal?
5. Sumber data resmi untuk sertifikasi, durasi, persyaratan, dan silabus siapa yang akan mengesahkan?

---

## Lampiran: sumber data

- `docs/sitemap.xml`: sitemap index.
- `docs/page-sitemap.xml`: 136 URL halaman.
- `docs/post-sitemap.xml`: 436 URL post.
- `docs/INVENTARIS-URL-SITEMAP.csv`: daftar URL mentah dengan klasifikasi heuristik awal.

Dokumen ini menjadi dasar diskusi dan audit lanjutan. Jangan jadikan klasifikasi heuristik sebagai keputusan redirect atau penghapusan tanpa pemeriksaan isi halaman.
