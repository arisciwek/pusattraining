# Arsitektur URL Baru dan Strategi Redirect

**Proyek:** PusatTrainingK3.com  
**Repository:** `arisciwek/pusattraining`  
**Branch kerja:** `docs/analisis-sitemap-dan-rencana-astro`  
**Status:** Usulan arsitektur untuk didiskusikan dan dikunci sebelum implementasi  
**Tanggal pencatatan:** 14 November 2026

---

## 1. Tujuan

Situs lama sudah berumur, memiliki trafik dan kemungkinan telah mengumpulkan nilai SEO serta backlink. Migrasi ke Astro tidak boleh sekadar mengganti tampilan dan struktur teknis. Kita perlu merancang URL baru yang:

1. Memiliki hierarki yang mudah dipahami pengunjung dan mesin pencari.
2. Mengelompokkan program pelatihan berdasarkan rumpun yang masuk akal.
3. Memisahkan program pelatihan, jadwal pelaksanaan, artikel, sertifikasi, dan jasa.
4. Stabil untuk jangka panjang meskipun program berpindah kategori.
5. Mempertahankan nilai URL lama melalui pemetaan redirect satu per satu.
6. Tidak mengarahkan semua URL lama ke homepage atau halaman kategori yang tidak relevan.

Dokumen ini adalah rancangan awal, bukan keputusan final untuk setiap slug. Nama program, klasifikasi, dan tujuan redirect harus divalidasi terhadap konten aktual.

## 2. Kondisi sumber data yang sudah diinventarisasi

Berdasarkan sitemap WordPress yang telah diperiksa:

- Sitemap halaman: **136 URL**.
- Sitemap post: **436 URL**.
- Total: **572 URL**.
- Jumlah tersebut bukan berarti ada 572 program pelatihan. Post mencakup jadwal, promosi, lowongan, artikel informasional, dan konten historis.
- File inventaris awal tersedia di `docs/INVENTARIS-URL-SITEMAP.csv`.
- Analisis awal sitemap tersedia di `docs/ANALISIS-SITEMAP-DAN-RENCANA-MIGRASI-ASTRO.md`.

Klasifikasi dalam inventaris CSV masih bersifat heuristik. Jangan menjadikannya keputusan redirect otomatis.

## 3. Usulan pohon URL

Pohon utama yang diusulkan:

```text
/
├── pelatihan/
│   ├── ahli-k3/
│   ├── operator-k3/
│   ├── teknisi-k3/
│   ├── kebakaran-dan-emergency/
│   ├── k3-konstruksi/
│   ├── k3-migas-dan-pertambangan/
│   ├── higiene-industri-dan-kesehatan-kerja/
│   ├── lingkungan-dan-energi/
│   ├── listrik-dan-kimia/
│   ├── welder-dan-rigging/
│   └── p3k-dan-kesehatan/
├── jadwal/
│   └── YYYY-MM/
│       └── nama-program/
│           └── rentang-tanggal/
├── sertifikasi/
│   ├── kemnaker/
│   ├── bnsp/
│   └── opito/
├── in-house-training/
├── jasa/
│   ├── pendampingan-smk3/
│   ├── pendampingan-iso-9001/
│   ├── riksa-uji/
│   ├── pengurusan-slf/
│   ├── perpanjangan-sio/
│   └── perpanjangan-lisensi-k3/
├── artikel/
├── tentang-kami/
├── kontak/
└── pendaftaran/
```

### 3.1 Kategori pelatihan dan contoh program

Contoh isi kategori berikut merupakan hipotesis awal yang perlu dicocokkan dengan katalog aktual.

**Ahli K3**
- Ahli K3 Umum
- Ahli K3 Konstruksi
- Ahli K3 Migas
- Ahli K3 Listrik
- Ahli K3 Kimia
- Ahli K3 Lingkungan

**Operator K3**
- Operator Forklift
- Operator Crane
- Operator Gondola
- Operator Boiler
- Operator Genset
- Operator Wheel Loader

**Teknisi K3**
- Teknisi K3 Listrik
- Teknisi K3 Ruang Terbatas
- Teknisi K3 Bejana Tekan
- Teknisi K3 Pesawat Angkat dan Angkut
- Teknisi K3 Pesawat Tenaga dan Produksi

**Kebakaran dan Emergency**
- Pemadam Kebakaran Kelas D
- Pemadam Kebakaran Kelas C
- Pemadam Kebakaran Kelas B
- Pemadam Kebakaran Kelas A
- Fireman
- Emergency Response

**K3 Konstruksi**
- K3 Ketinggian
- TKBT
- TKPK
- Perancah

**K3 Migas dan Pertambangan**
- POP Pertambangan
- Pengawas K3 Migas
- H2S
- Gas Tester
- BOSIET

**Higiene Industri dan Kesehatan Kerja**
- Ahli Higiene Industri Muda
- Ahli Higiene Industri Madya
- Ahli Higiene Industri Utama
- Hiperkes

**Lingkungan dan Energi**
- Pengelolaan Limbah B3
- Pengelolaan Limbah Non-B3
- PPPA
- PPPU
- Manajer Energi

Kategori lain yang perlu ditelaah dari inventaris: listrik dan kimia, welder dan rigging, P3K dan kesehatan kerja, serta program khusus.

### 3.2 URL detail program dibuat dangkal

Rekomendasi: URL detail program berada langsung di bawah `/pelatihan/`, bukan mengikuti seluruh kedalaman kategori.

Contoh yang disarankan:

- `/pelatihan/ahli-k3-umum/`
- `/pelatihan/operator-forklift/`
- `/pelatihan/teknisi-k3-listrik/`

Hindari struktur seperti:

- `/pelatihan/ahli-k3/ahli-k3-umum/`
- `/pelatihan/operator-k3/operator-forklift/`

Alasannya:
- URL lebih pendek dan mudah dibagikan.
- Program dapat ditampilkan di beberapa kategori tanpa memiliki beberapa URL.
- Perubahan klasifikasi tidak memaksa perubahan URL.
- Mengurangi risiko redirect tambahan saat taxonomy berkembang.

Kategori tetap memiliki landing page tersendiri, misalnya `/pelatihan/ahli-k3/` dan `/pelatihan/operator-k3/`. Relasi kategori disimpan di data konten, bukan harus tercermin seluruhnya dalam URL detail.

## 4. Struktur URL jadwal

Jadwal adalah entitas pelaksanaan dari suatu program, bukan duplikasi halaman program.

Pola yang diusulkan:

```text
/jadwal/
/jadwal/2026-11/
/jadwal/2026-11/ahli-k3-umum/07-10-desember-2026/
/jadwal/2026-11/teknisi-k3-ruang-terbatas/14-18-desember-2026/
```

Aturan:
- `YYYY-MM` adalah bulan pelaksanaan jadwal.
- Segmen program menghubungkan jadwal dengan halaman program kanonis.
- Segmen terakhir mengidentifikasi batch/rentang tanggal.
- Kartu jadwal menautkan judul ke halaman detail batch.
- Halaman detail jadwal memiliki canonical URL sendiri dan data terstruktur Event yang sesuai.
- Program menjadi sumber informasi utama; jadwal mereferensikan program melalui ID/slug, bukan menyalin seluruh informasi program.
- Jadwal lampau tidak boleh ditampilkan seolah-olah masih akan datang. Tentukan apakah akan dipertahankan sebagai arsip, digabung, dialihkan ke arsip program, atau dihapus setelah audit.

Pola ini juga konsisten dengan gagasan URL jadwal pusat yang pernah dibahas: `/jadwal/YYYY-MM/<nama-pelatihan>/<schedule>/`.

## 5. Pemisahan jenis konten

Gunakan jenis konten yang jelas dan tidak mencampuradukkan halaman program dengan artikel atau jadwal.

| Entitas | Fungsi | Contoh URL |
|---|---|---|
| Category | Landing page rumpun pelatihan | `/pelatihan/ahli-k3/` |
| Program | Informasi permanen suatu pelatihan | `/pelatihan/ahli-k3-umum/` |
| Schedule | Batch pelaksanaan program | `/jadwal/2026-11/ahli-k3-umum/07-10-desember-2026/` |
| Article | Edukasi/informasi editorial | `/artikel/persyaratan-ahli-k3-umum/` |
| Service | Jasa perusahaan di luar katalog pelatihan | `/jasa/pendampingan-smk3/` |
| Certification | Informasi skema/lembaga sertifikasi bila memang memiliki intent tersendiri | `/sertifikasi/kemnaker/` |
| Page | Halaman korporat dan konversi | `/kontak/` |

Jangan mengubah artikel informasional menjadi halaman program hanya karena keduanya menyebut istilah pelatihan yang sama. Pertahankan intent pencarian dan substansi kontennya.

## 6. Strategi redirect dan migrasi SEO

Redirect adalah bagian penting dari migrasi, bukan pekerjaan tambahan setelah halaman baru selesai.

### 6.1 Semua URL lama harus dipetakan

Setiap URL dalam sitemap lama harus mendapat keputusan eksplisit. Buat master mapping dengan kolom minimum:

| Kolom | Keterangan |
|---|---|
| `old_url` | URL lama lengkap atau path lama |
| `old_type` | page, post, jadwal, artikel, promosi, dan sebagainya |
| `old_title` | Judul lama |
| `old_intent` | Maksud/kebutuhan pencarian yang dilayani |
| `new_url` | URL tujuan baru, jika ada |
| `decision` | KEEP, REDIRECT, MERGE, ARCHIVE, atau 410 |
| `reason` | Alasan keputusan |
| `content_action` | Dipertahankan, ditulis ulang, digabung, atau diarsipkan |
| `priority` | Prioritas berdasarkan trafik, backlink, impresi, dan konversi |
| `verified` | Status pemeriksaan manual |

### 6.2 Jenis keputusan

- **KEEP** — URL lama tetap dipakai karena sudah baik, relevan, dan tidak perlu diubah.
- **REDIRECT** — URL lama dialihkan ke satu URL baru yang paling relevan.
- **MERGE** — Konten lama digabung ke halaman kanonis; URL sumber dialihkan ke hasil gabungan.
- **ARCHIVE** — Konten historis masih memiliki nilai dan layak dipertahankan sebagai arsip dengan status yang jelas.
- **410** — Konten memang dihapus permanen, tidak memiliki pengganti yang relevan, dan tidak layak dipertahankan.

Gunakan redirect permanen (301 atau mekanisme permanen setara yang didukung hosting) untuk perpindahan URL yang benar-benar permanen.

### 6.3 Prinsip pemetaan

- Jangan mengarahkan semua URL lama ke homepage.
- Jangan mengarahkan URL ke kategori umum jika ada halaman program yang lebih tepat.
- Jangan mengalihkan artikel edukasi ke halaman penjualan hanya karena topiknya berdekatan.
- Satu URL lama diarahkan langsung ke URL final, hindari rantai redirect.
- Hindari redirect berantai dan loop.
- Pastikan tujuan redirect mengembalikan status 200 dan canonical ke dirinya sendiri.
- Perbarui internal link agar langsung menunjuk URL baru, bukan mengandalkan redirect.
- Sitemap baru hanya memuat URL kanonis yang dapat diindeks.
- URL yang diarahkan atau berstatus 410 tidak dimasukkan ke sitemap baru.
- Pertahankan arsip jadwal jika memiliki trafik, backlink, atau nilai historis; evaluasi per URL, bukan berdasarkan umur saja.

### 6.4 Contoh ilustratif (belum final)

Contoh berikut hanya menjelaskan pola. Slug lama dan tujuan final harus diverifikasi terhadap seluruh konten aktual:

| URL lama (contoh) | Tujuan baru (contoh) | Keputusan |
|---|---|---|
| `/training-ahli-k3-umum/` | `/pelatihan/ahli-k3-umum/` | REDIRECT |
| `/pelatihan-operator-forklift-bisa-untuk-pemula/` | `/pelatihan/operator-forklift/` | REDIRECT atau MERGE setelah audit |
| `/teknisi-k3-ruang-terbatas/` | `/pelatihan/teknisi-k3-ruang-terbatas/` | REDIRECT |
| `/jasa-pendampingan-sertifikasi-smk3-perusahaan/` | `/jasa/pendampingan-smk3/` | REDIRECT |
| `/jasa-pengurusan-slf-sertifikat-laik-fungsi/` | `/jasa/pengurusan-slf/` | REDIRECT |

Jangan memasukkan contoh ini ke konfigurasi produksi sebelum memeriksa apakah URL tersebut benar-benar ada dan apakah kontennya sesuai.

## 7. Prioritas audit URL lama

Sitemap adalah inventaris awal, tetapi bukan satu-satunya sumber untuk menentukan nilai SEO. Sebelum mengunci redirect, gabungkan data berikut jika tersedia:

1. Google Search Console: klik, impresi, CTR, posisi, dan halaman yang memperoleh trafik.
2. Analytics: landing page, sesi organik, dan konversi.
3. Data backlink: domain rujukan dan URL tujuan.
4. Sitemap lama: daftar URL yang diketahui mesin pencari.
5. Crawl situs lama: status HTTP, title, canonical, internal link, dan konten.
6. Data bisnis: halaman yang menghasilkan pertanyaan, pendaftaran, atau penjualan.

Prioritaskan URL dengan trafik organik, backlink, impresi, dan konversi tinggi. URL yang tidak muncul di sitemap tetapi masih menerima trafik atau backlink juga harus masuk daftar migrasi.

## 8. Usulan Astro content collections dan routing

Koleksi data yang disarankan:

```text
src/content/
├── categories/
├── programs/
├── schedules/
├── articles/
├── services/
└── pages/
```

Pembagian tanggung jawab:
- `categories`: nama, slug, deskripsi, urutan, dan relasi program.
- `programs`: data kanonis pelatihan, kategori, deskripsi, persyaratan, materi, sertifikasi, dan CTA.
- `schedules`: tanggal, lokasi/metode, status, kapasitas bila relevan, serta referensi ke program.
- `articles`: konten editorial dan relasi ke program atau layanan.
- `services`: layanan konsultasi/jasa yang bukan program pelatihan.
- `pages`: halaman korporat, kontak, pendaftaran, dan halaman statis lain.

Contoh struktur routing Astro:

```text
src/pages/
├── index.astro
├── pelatihan/
│   ├── index.astro
│   └── [...slug].astro
├── jadwal/
│   ├── index.astro
│   └── [...slug].astro
├── sertifikasi/
├── in-house-training/
├── jasa/
├── artikel/
├── tentang-kami/
├── kontak/
└── pendaftaran/
```

Routing sebaiknya data-driven. Tidak perlu membuat satu file route fisik untuk setiap kategori atau program. Namun, URL hasil generate harus persis mengikuti keputusan arsitektur yang telah dikunci.

Redirect disimpan sebagai data/config terpisah, mudah diuji, dan tidak disembunyikan sebagai logika di dalam konten program. Implementasi akhirnya harus mengikuti kemampuan platform deployment yang dipakai.

## 9. Tahapan kerja yang disarankan

**Tahap 1 — Kunci prinsip URL**
- Diskusikan dan sepakati top-level tree.
- Sepakati pola URL detail program.
- Sepakati pola URL jadwal.
- Sepakati apakah sertifikasi merupakan landing page tersendiri atau bagian dari program.

**Tahap 2 — Audit dan klasifikasi konten**
- Periksa 572 URL inventaris.
- Identifikasi program unik, duplikasi, artikel, jadwal, promosi, lowongan, dan halaman korporat.
- Periksa konten aktual, bukan hanya slug.
- Tentukan canonical content untuk setiap kelompok duplikat.

**Tahap 3 — Master redirect mapping**
- Isi URL tujuan untuk seluruh URL lama.
- Catat alasan setiap keputusan.
- Prioritaskan URL bernilai SEO tinggi.
- Review manual mapping yang ambigu.

**Tahap 4 — Model data dan scaffold Astro**
- Finalisasi schema collections.
- Implementasikan route dan template.
- Bangun halaman kategori, program, jadwal, artikel, jasa, dan halaman korporat.
- Pastikan internal linking mengikuti URL kanonis.

**Tahap 5 — Uji migrasi**
- Uji semua redirect lama ke tujuan final.
- Uji tidak ada loop/rantai redirect.
- Uji canonical, metadata, structured data, robots, dan sitemap.
- Uji 404/410 secara sengaja.
- Crawl hasil build sebelum deployment.

**Tahap 6 — Pemantauan pascamigrasi**
- Pantau Search Console, indeksasi, klik, impresi, dan error.
- Perbaiki redirect yang salah atau URL penting yang terlewat.
- Pertahankan redirect permanen dalam jangka panjang.

## 10. Keputusan yang belum dikunci

Hal-hal berikut masih perlu disepakati sebelum implementasi:

1. Apakah semua halaman program menggunakan prefix `/pelatihan/` (rekomendasi: ya).
2. Apakah halaman sertifikasi menjadi section tersendiri atau hanya atribut/jenis pada program tertentu.
3. Apakah `/artikel/` menjadi prefix artikel baru atau sebagian artikel lama tetap mempertahankan URL yang sudah kuat.
4. Apakah jadwal historis dipertahankan sebagai arsip berdasarkan nilai SEO dan kebutuhan bisnis.
5. Daftar kategori final dan penempatan setiap program.
6. Slug final untuk setiap program.
7. Tujuan redirect untuk seluruh URL lama setelah audit konten dan data performa.

## 11. Prinsip keputusan akhir

Arsitektur ini harus mengutamakan **kejelasan informasi, kestabilan URL, dan preservasi nilai SEO**. Struktur folder atau taxonomy tidak harus dicerminkan secara penuh dalam URL. URL yang baik adalah URL yang konsisten dan tahan terhadap perubahan organisasi konten.

Jangan mulai memindahkan URL secara massal hanya berdasarkan tebakan dari slug. Kunci tree terlebih dahulu, audit isi dan performa URL lama, lalu buat redirect map yang dapat diuji secara otomatis sebelum situs baru diluncurkan.
