# Checklist Implementasi Struktur HTML Halaman Referensi

**Jenis dokumen:** audit implementasi halaman detail pelatihan  
**Basis audit:** struktur HTML halaman referensi yang dicatat pada 16 November 2026, lalu dibandingkan dengan source code branch `main` saat dokumen ini dibuat.  
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
