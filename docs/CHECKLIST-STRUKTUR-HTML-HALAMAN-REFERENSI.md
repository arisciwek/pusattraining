# Checklist Implementasi Struktur HTML Halaman Referensi

**Jenis dokumen:** audit implementasi halaman detail pelatihan  
**Basis audit:** struktur HTML halaman referensi dibandingkan dengan source code branch `main`, lalu diperbarui untuk konten delapan halaman pelatihan pada branch `content/training-detail-pages-and-checklists` (17 November 2026).  
**Halaman yang diaudit:** `/pelatihan/[slug]/` dan komponen yang dipakai oleh halaman tersebut.  
**Referensi visual/interaksi:** halaman detail program Wahana Totalita dan pola scheduler Damkar `/layanan/damkar-kelas-d/`.

> Checklist ini mengukur keberadaan dan integrasi pada halaman detail pelatihan, bukan sekadar apakah pernah ada komponen dengan nama serupa di repository. Komponen yang tersedia tetapi belum dipanggil oleh renderer tetap ditandai **Belum terintegrasi**.

## 1. Legenda status

- [x] **Sudah ada** — elemen dirender pada halaman detail pelatihan dan fungsi utamanya tersedia.
- [~] **Sebagian** — pola/markup dasarnya ada, tetapi cakupan konten, perilaku, atau integrasinya belum setara dengan referensi.
- [ ] **Belum ada** — belum ditemukan implementasi pada halaman detail pelatihan.
- [?] **Perlu verifikasi** — source menunjukkan fondasi, tetapi hasil visual/interaksi belum diverifikasi melalui browser.

## 2. Checklist struktur HTML halaman referensi

| No. | Elemen halaman referensi | Status | Implementasi Pusattraining saat audit | Kekurangan / pekerjaan lanjutan |
|---:|---|:---:|---|---|
| 1 | Skip to content | [ ] | Belum ditemukan skip link pada `SiteLayout.astro` atau `SiteHeader.astro`. | Tambahkan tautan pertama yang menuju `#main-content`; beri ID pada elemen main dan pastikan fokus terlihat. |
| 2 | Header / Navigation | [x] | `SiteLayout.astro` merender `SiteHeader.astro`; header sticky, navigasi desktop, tombol menu mobile, dan panel navigasi mobile tersedia. | Uji keyboard, Escape, fokus, dan tampilan mobile pada browser. |
| 3 | Mega menu | [ ] | `SiteHeader.astro` hanya merender daftar tautan navigasi biasa. Tidak ada panel mega menu/kategori bertingkat. | Rancang hanya bila kebutuhan kategori dan jumlah program memang memerlukannya. |
| 4 | Breadcrumb | [x] | Route `/pelatihan/[slug]/` merender `Breadcrumb.astro` dengan Beranda → Pelatihan → judul program. | Pastikan breadcrumb juga konsisten pada semua variasi halaman kategori dan detail. |
| 5 | Hero | [x] | `TrainingDetailIntro.astro` merender judul/intro program, eyebrow, dan notice program melalui block frontmatter. | Periksa hierarki visual, panjang deskripsi, gambar/visual pendukung, serta CTA di area hero terhadap referensi. |
| 6 | Highlights / program highlights | [~] | `TrainingSummary.astro` menyediakan daftar fakta berbentuk definition list (misalnya durasi, metode, sertifikasi, investasi). | Belum ada kontrak highlight yang lebih kaya seperti poin keunggulan/hasil utama; isi aktual bergantung pada data setiap training. |
| 7 | Pricing | [~] | Nilai investasi dapat ditampilkan sebagai item di `training-summary`. | Belum ada komponen pricing khusus yang menangani harga, apa yang termasuk, syarat, atau variasi biaya. Jangan tampilkan nominal tanpa konfirmasi penyelenggara. |
| 8 | CTA | [x] | `TrainingCta.astro` tersedia; CTA default juga dirender bila block CTA tidak ditulis. Tujuan kontak terpusat ke WhatsApp Tiara. | Verifikasi posisi dan copy CTA pada tiap program. CTA konsultasi tidak sama dengan proses registrasi langsung. |
| 9 | Sticky section navigation | [x] | `TrainingDetailRenderer.astro` membuat navigasi anchor dari summary, schedule, content section, dan FAQ; navigasi dibuat sticky/responsif. | Uji offset anchor, scroll, overflow horizontal, dan perilaku sticky pada viewport kecil. |
| 10 | Schedule / batch list | [x] | `TrainingScheduleList.astro` menampilkan grup per bulan/tahun, kartu batch, status tanggal, filter bulan, toggle arsip, tanggal/link detail, dan Google Calendar. | Uji data kosong, timezone, status berubah hari, link pendaftaran, dan jumlah batch pada data nyata. |
| 11 | In-house training | [ ] | Belum ada section khusus untuk permintaan pelatihan in-house pada renderer detail. | Tambahkan section/CTA in-house dengan alur permintaan kebutuhan perusahaan dan data yang memang dapat dipenuhi penyelenggara. |
| 12 | Description / program overview | [~] | `TrainingContentSection.astro` dapat menampilkan deskripsi dan daftar butir konten. | Belum ada kontrak konten khusus untuk tujuan, ruang lingkup, hasil belajar, dan deskripsi program secara terpisah. |
| 13 | Regulatory references | [ ] | Belum ada block khusus referensi regulasi, standar, atau dasar hukum pada renderer detail. | Tambahkan pola referensi sumber/regulasi dengan nama, nomor, tautan, dan status keberlakuan yang diverifikasi. |
| 14 | Requirements | [~] | Persyaratan dapat ditulis sebagai `training-content-section` generik. Komponen `TrainingRequirementList` tersedia di repository, tetapi tidak dipanggil oleh `TrainingDetailRenderer.astro`. | Integrasikan block persyaratan terstruktur ke schema, tipe, renderer, dan frontmatter; bedakan syarat wajib dan dokumen pendukung bila datanya tersedia. |
| 15 | Pricing & facilities | [~] | Investasi dapat dicantumkan pada summary dan fasilitas dapat ditulis sebagai content section generik. | Belum ada penyajian terpadu/terstruktur yang memisahkan komponen biaya, fasilitas, keluaran, dan hal yang tidak termasuk biaya. |
| 16 | Related certification | [ ] | Belum ditemukan section relasi sertifikasi terkait pada renderer detail. | Tambahkan relasi sertifikasi/program lanjutan hanya jika relasi tersebut valid dan didukung data. |
| 17 | Curriculum / syllabus | [~] | Kurikulum dapat ditampilkan melalui `training-content-section` berisi daftar item. Komponen `TrainingSyllabus` ada, tetapi tidak dipanggil oleh renderer detail saat audit. | Integrasikan syllabus khusus, termasuk struktur modul/materi dan deskripsi; tentukan dukungan nesting bila kurikulum bertingkat. |
| 18 | Trust indicators | [ ] | Belum ada trust-indicator khusus pada halaman detail pelatihan. Summary hanya menampilkan fakta yang dimasukkan editor. | Tambahkan bukti yang dapat diverifikasi, misalnya akreditasi, otorisasi, pengalaman penyelenggara, atau angka capaian dengan sumber. |
| 19 | Related programs | [ ] | Tidak ada section related program yang dirender oleh `TrainingDetailRenderer.astro`. | Definisikan relasi program dan tampilkan kartu program terkait; jangan menyamakan komponen yang hanya tersedia dengan fitur yang sudah terintegrasi. |
| 20 | Training information | [~] | Informasi umum dapat diisi melalui `TrainingSummary` dan beberapa `TrainingContentSection`. | Belum ada model terstruktur untuk seluruh informasi program seperti target peserta, level, metode, durasi, bahasa, dan hasil akhir. |
| 21 | FAQ | [x] | `TrainingFaq.astro` dirender dari block frontmatter dan memakai elemen native `details/summary`. | Pastikan jawaban per program tervalidasi dan uji aksesibilitas keyboard serta perilaku disclosure. |
| 22 | Related articles | [ ] | Belum ditemukan section artikel terkait pada renderer detail pelatihan. | Tambahkan relasi artikel berdasarkan ID/slug dan kartu artikel setelah strategi konten artikel ditetapkan. |
| 23 | Registration CTA | [~] | CTA utama halaman menghubungkan calon peserta ke WhatsApp Tiara. Kartu schedule dapat memakai URL registrasi jika `sites.main.registrationUrl` tersedia. | Belum ada alur registrasi terpadu dengan status pendaftaran, form/tautan per batch, konfirmasi, dan fallback jika URL registrasi tidak tersedia. |
| 24 | Related training | [ ] | Komponen `RelatedTraining.astro` tersedia, tetapi tidak dipanggil oleh `TrainingDetailRenderer.astro`. | Integrasikan block relasi training dan sumberkan daftar dari relasi konten yang eksplisit. |
| 25 | Corporate CTA | [~] | `TrainingCta.astro` dapat digunakan sebagai CTA konsultasi; kontaknya mengarah ke Tiara. | Belum ada varian khusus kebutuhan korporasi/in-house, misalnya jumlah peserta, lokasi, jadwal fleksibel, dan permintaan penawaran. |
| 26 | Footer | [x] | `SiteLayout.astro` merender `SiteFooter.astro` pada halaman. Footer berisi navigasi, ringkasan portal, kontak, dan copyright. | Verifikasi konsistensi tautan, informasi organisasi, dan tampilan responsif. |

## 3. Ringkasan hasil audit

Dari 26 elemen struktur referensi:

- **Sudah ada:** 8 elemen.
- **Sebagian:** 10 elemen.
- **Belum ada:** 8 elemen.
- **Perlu verifikasi visual/browser:** tetap diperlukan untuk seluruh elemen interaktif dan responsif; status kode tidak otomatis membuktikan kualitas hasil render.

### Sudah terintegrasi pada halaman detail

1. Header dan navigasi responsif.
2. Breadcrumb.
3. Hero/intro program.
4. Ringkasan fakta program.
5. CTA konsultasi.
6. Navigasi section sticky.
7. Daftar schedule dengan filter dan arsip.
8. FAQ.
9. Footer.

Catatan: ringkasan fakta dan beberapa section konten sudah tersedia, tetapi cakupannya belum setara dengan bagian referensi yang lebih spesifik. Karena itu beberapa elemen ditandai sebagian.

### Komponen tersedia tetapi belum terintegrasi ke renderer detail

- `TrainingRequirementList.astro`
- `TrainingSyllabus.astro`
- `RelatedTraining.astro`

Komponen tersebut tidak dihitung sebagai implementasi selesai sampai dipanggil melalui `TrainingDetailRenderer.astro` dan mempunyai kontrak frontmatter/schema yang sesuai.

## 4. Prioritas pekerjaan berikutnya

Urutan berikut disarankan agar struktur inti program lengkap sebelum menambah dekorasi:

### P0 — kelengkapan informasi inti program

- [ ] Skip to content dan target `main-content`.
- [ ] Block tujuan/deskripsi program yang terstruktur.
- [ ] Block persyaratan peserta dan dokumen.
- [ ] Block kurikulum/syllabus khusus.
- [ ] Block informasi biaya dan fasilitas dengan data terverifikasi.
- [ ] Block referensi regulasi/standar bila relevan untuk program.
- [ ] Pastikan status registrasi pada schedule membedakan tersedia, ditutup, dan belum dibuka.

### P1 — konversi dan keterhubungan konten

- [ ] CTA khusus in-house/corporate.
- [ ] Alur registrasi per batch yang jelas.
- [ ] Related training.
- [ ] Related certification bila relasi memang ada.
- [ ] Related articles.
- [ ] Trust indicators berbasis bukti yang dapat diverifikasi.

### P2 — navigasi dan penyempurnaan visual

- [ ] Evaluasi kebutuhan mega menu berdasarkan struktur kategori aktual.
- [ ] Highlights yang lebih jelas dan berbeda dari summary fakta.
- [ ] Pricing presentation khusus bila model harga sudah tersedia.
- [ ] Audit visual desktop/tablet/mobile terhadap halaman referensi.
- [ ] Audit keyboard, focus-visible, kontras, reduced motion, dan anchor offset.

## 5. File implementasi yang menjadi bukti audit

| Area | File |
|---|---|
| Route halaman detail | `src/pages/pelatihan/[slug].astro` |
| Layout global | `src/layouts/SiteLayout.astro` |
| Header dan navigasi | `src/components/shared/SiteHeader.astro` |
| Breadcrumb | `src/components/shared/Breadcrumb.astro` |
| Footer | `src/components/shared/SiteFooter.astro` |
| Renderer detail | `src/blocks/training/TrainingDetailRenderer.astro` |
| Intro/hero | `src/blocks/training/TrainingDetailIntro.astro` |
| Ringkasan | `src/blocks/training/TrainingSummary.astro` |
| Section konten | `src/blocks/training/TrainingContentSection.astro` |
| Jadwal | `src/blocks/training/TrainingScheduleList.astro` |
| FAQ | `src/blocks/training/TrainingFaq.astro` |
| CTA | `src/blocks/training/TrainingCta.astro` |
| Panduan frontmatter | `docs/training-detail-frontmatter.md` |
| Schema collection | `src/content.config.ts` |

## 6. Aturan pemeliharaan checklist

- Ubah status menjadi **Sudah ada** hanya setelah block masuk ke schema/type, dirender oleh renderer, dan mempunyai data frontmatter yang benar.
- Bila hanya komponen generik yang dapat menampung konten, gunakan status **Sebagian** sampai kontrak domain yang diperlukan tersedia.
- Bila komponen ada tetapi tidak dipakai pada halaman detail, jangan tandai selesai.
- Setelah integrasi, jalankan `npm run check` dan `npm run build`.
- Lakukan pemeriksaan browser untuk desktop dan mobile; checklist source code bukan pengganti QA visual/interaksi.
- Catat tanggal audit dan commit yang menjadi basis perubahan berikutnya.


## 7. Checklist kelengkapan konten per halaman pelatihan

Bagian ini memeriksa **isi masing-masing halaman**, bukan sekadar keberadaan komponen global. Status di bawah ini menggambarkan perubahan pada branch `content/training-detail-pages-and-checklists`; belum berarti seluruh data penyelenggara telah dikonfirmasi.

Legenda tambahan:
- [x] Konten dasar sudah ditulis pada frontmatter dan dirender oleh komponen yang tersedia.
- [~] Ada kerangka/gambaran, tetapi detail resmi atau data penyelenggara masih harus dikonfirmasi.
- [ ] Belum tersedia pada halaman.

| Halaman | Intro | Ringkasan | Deskripsi & tujuan | Sasaran peserta | Materi/kurikulum | Persyaratan | Dasar hukum | FAQ | Jadwal | CTA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Ahli K3 Umum | [x] | [x] | [x] | [~] | [~] | [~] | [x] | [~] | [x] | [x] |
| Pemadam Kebakaran Kelas D | [x] | [x] | [x] | [~] | [~] | [~] | [x] | [~] | [x] | [x] |
| Operator Boiler Tingkat 1 | [x] | [x] | [x] | [~] | [~] | [~] | [x] | [~] | [x] | [x] |
| Operator Boiler Tingkat 2 | [x] | [x] | [x] | [~] | [~] | [~] | [x] | [~] | [x] | [x] |
| Operator Gondola | [x] | [x] | [x] | [~] | [x] | [~] | [x] | [~] | [x] | [x] |
| Pemadam Kebakaran Kelas A | [x] | [x] | [x] | [~] | [~] | [~] | [x] | [~] | [x] | [x] |
| Emergency Response Plan | [x] | [x] | [x] | [x] | [~] | [~] | [x] | [~] | [x] | [x] |
| K3 Ruang Terbatas (Confined Space) | [x] | [x] | [x] | [~] | [x] | [~] | [x] | [~] | [x] | [x] |

### 7.1 Rincian pekerjaan dan verifikasi per halaman

#### Ahli K3 Umum — `src/content/trainings/ahli-k3-umum.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan cakupan.
- [x] Gambaran tujuan dan fungsi Ahli K3 Umum.
- [~] Sasaran peserta ditulis secara umum; kelayakan pendidikan/pengalaman perlu dicocokkan.
- [~] Pokok bahasan ditulis sebagai ruang lingkup, bukan silabus resmi final.
- [~] Persyaratan dan dokumen peserta harus diverifikasi terhadap skema/angkatan.
- [x] Acuan Permenaker PER.02/MEN/1992 dicantumkan.
- [~] FAQ tersedia; jawaban administratif tetap perlu konfirmasi penyelenggara.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi pasti, dan keluaran biaya belum dipublikasikan.

#### Pemadam Kebakaran Kelas D — `src/content/trainings/damkar-kelas-d.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan cakupan.
- [x] Tujuan tindakan awal, pencegahan, dan evakuasi.
- [~] Sasaran peserta ditulis secara umum.
- [~] Pokok bahasan disusun sebagai ruang lingkup; silabus resmi kelas D perlu konfirmasi.
- [~] Definisi jenjang kelas, persyaratan, praktik, dan dokumen perlu dikonfirmasi.
- [x] Acuan Kepmenaker KEP.186/MEN/1999 dicantumkan.
- [~] FAQ tersedia; rincian kelas dan praktik perlu konfirmasi.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi pasti, dan rincian keluaran belum tersedia.

#### Operator Boiler Tingkat 1 — `src/content/trainings/operator-boiler-tingkat-1.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan acuan regulasi terbaru.
- [x] Gambaran tugas dan tanggung jawab operator.
- [~] Sasaran peserta perlu dicocokkan dengan kelayakan resmi.
- [~] Ruang lingkup materi ditulis; silabus dan evaluasi final perlu verifikasi.
- [~] Kelas I harus dicocokkan dengan jenis/kapasitas pesawat uap dan persyaratan Permenaker 4/2025.
- [x] Permenaker Nomor 4 Tahun 2025 dicantumkan sebagai acuan yang berlaku.
- [~] FAQ tersedia; batas kewenangan spesifik harus merujuk ketentuan terbaru.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi pasti, dan rincian keluaran belum tersedia.

#### Operator Boiler Tingkat 2 — `src/content/trainings/operator-boiler-tingkat-2.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan acuan regulasi terbaru.
- [x] Gambaran tugas dan tanggung jawab operator.
- [~] Sasaran peserta perlu dicocokkan dengan kelayakan resmi.
- [~] Ruang lingkup materi ditulis; silabus dan evaluasi final perlu verifikasi.
- [~] Kelas II harus dicocokkan dengan jenis/kapasitas pesawat uap dan persyaratan Permenaker 4/2025.
- [x] Permenaker Nomor 4 Tahun 2025 dicantumkan sebagai acuan yang berlaku.
- [~] FAQ tersedia; batas kewenangan spesifik harus merujuk ketentuan terbaru.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi pasti, dan rincian keluaran belum tersedia.

#### Operator Gondola — `src/content/trainings/operator-gondola.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan acuan regulasi.
- [x] Gambaran tanggung jawab dan risiko pengoperasian.
- [~] Sasaran peserta dan kelayakan kerja di ketinggian perlu verifikasi.
- [x] Materi pembinaan merujuk materi Operator Gondola pada Permenaker 8/2020.
- [~] Persyaratan administrasi dan kesehatan perlu dikonfirmasi sesuai skema.
- [x] Permenaker 8/2020 dan Permenaker 9/2016 dicantumkan.
- [~] FAQ tersedia; praktik, lisensi, dan kelayakan peralatan dibedakan.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi angkatan, dan rincian keluaran belum tersedia.

#### Pemadam Kebakaran Kelas A — `src/content/trainings/pemadam-kebakaran-kelas-a.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan acuan regulasi.
- [x] Gambaran koordinasi dan organisasi penanggulangan kebakaran.
- [~] Sasaran peserta ditulis umum; persyaratan jabatan perlu verifikasi.
- [~] Ruang lingkup materi ditulis; silabus resmi kelas A perlu konfirmasi.
- [~] Jenjang kelas, pengalaman, dan dokumen peserta harus diverifikasi.
- [x] Acuan Kepmenaker KEP.186/MEN/1999 dicantumkan.
- [~] FAQ tersedia; perbedaan kelas A dan D tidak diasumsikan.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi pasti, dan rincian keluaran belum tersedia.

#### Emergency Response Plan — `src/content/trainings/training-emergency-response-plan.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan ruang lingkup.
- [x] Tujuan perencanaan, penerapan, pengujian, dan evaluasi ERP.
- [x] Sasaran peserta lintas fungsi.
- [~] Materi disusun sebagai ruang lingkup workshop; silabus dan skenario final perlu kesepakatan perusahaan.
- [~] Data lokasi, layout, risiko, organisasi, dan kebutuhan simulasi harus disiapkan perusahaan.
- [x] PP Nomor 50 Tahun 2012 dan Kepmenaker KEP.186/MEN/1999 dicantumkan sesuai relevansi.
- [~] FAQ tersedia; keluaran dokumen dan simulasi mengikuti ruang lingkup penawaran.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi, dan deliverable final belum ditetapkan.

#### K3 Ruang Terbatas (Confined Space) — `src/content/trainings/training-k3-bahaya-confined-space.md`

- [x] Intro dan deskripsi program.
- [x] Ringkasan fokus dan acuan regulasi.
- [x] Gambaran bahaya atmosfer/non-atmosfer dan pengendalian pekerjaan.
- [~] Sasaran peserta harus dipilah menurut fungsi personel.
- [x] Materi mencakup izin masuk, pengujian atmosfer, isolasi energi, komunikasi, dan penyelamatan.
- [~] Kualifikasi, pendidikan, pengalaman, dan dokumen harus dicocokkan dengan peran pada Permenaker 11/2023.
- [x] Permenaker Nomor 11 Tahun 2023 dicantumkan.
- [~] FAQ tersedia; praktik penyelamatan dan kualifikasi wajib diverifikasi.
- [x] Jadwal terhubung ke collection schedules.
- [x] CTA WhatsApp Tiara.
- [ ] Harga, fasilitas, durasi pasti, dan rincian keluaran belum tersedia.

### 7.2 Hal yang belum boleh dianggap final untuk semua halaman

- [ ] Durasi dan jumlah jam pelajaran per angkatan.
- [ ] Biaya, termin pembayaran, pajak, dan komponen yang termasuk.
- [ ] Fasilitas, konsumsi, akomodasi, alat praktik, dan bahan ajar.
- [ ] Persyaratan dokumen dan kelayakan peserta yang disahkan penyelenggara.
- [ ] Nama/otorisasi lembaga pembina, asesor, instruktur, dan penerbit sertifikat/lisensi.
- [ ] Bentuk evaluasi dan dokumen keluaran resmi.
- [ ] Foto kegiatan, testimoni, statistik lulusan, dan bukti trust.
- [ ] Relasi ke program lain dan artikel pendukung.

Jangan mengubah butir di atas menjadi klaim publik sampai ada dokumen atau konfirmasi tertulis dari penyelenggara.

## 8. Sumber regulasi yang digunakan untuk penyusunan awal

1. Ahli K3 Umum — JDIH Kemnaker, [Permenaker PER.02/MEN/1992](https://jdih.kemnaker.go.id/peraturan/detail/242/peraturan-menteri-tenaga-kerja-nomor-2-tahun-1992).
2. Pemadam Kebakaran — JDIH Kemnaker, [Kepmenaker KEP.186/MEN/1999](https://jdih.kemnaker.go.id/peraturan/detail/3122/keputusan-menteri-tenaga-kerja-nomor-186-tahun-1999).
3. Operator Boiler Tingkat 1 dan 2 — JDIH Kemnaker, [Permenaker Nomor 4 Tahun 2025](https://jdih.kemnaker.go.id/peraturan/detail/2684).
4. Operator Gondola — JDIH Kemnaker, [Permenaker Nomor 8 Tahun 2020](https://jdih.kemnaker.go.id/asset/data_puu/Permen_8_Tahun_2020.pdf) dan [Permenaker Nomor 9 Tahun 2016](https://jdih.kemnaker.go.id/peraturan/detail/1210/peraturan-menteri-ketenagakerjaan-nomor-9-tahun-2016).
5. Emergency Response Plan — JDIH Kemnaker, [PP Nomor 50 Tahun 2012](https://jdih.kemnaker.go.id/peraturan/detail/58/peraturan-pemerintah-nomor-50-tahun-2012).
6. K3 Ruang Terbatas — JDIH Kemnaker, [Permenaker Nomor 11 Tahun 2023](https://jdih.kemnaker.go.id/peraturan/detail/2412/peraturan-menteri-nomor-11-tahun-2023).

**Peringatan verifikasi:** referensi regulasi di atas adalah landasan penyusunan konten awal. Sebelum publikasi final, periksa naskah lengkap, status berlaku, perubahan/pencabutan, dan kesesuaian dengan skema pembinaan yang benar-benar diselenggarakan.
