# Rencana Implementasi Schema.org

Dokumen kerja untuk merencanakan, mengevaluasi, dan mencatat implementasi structured data Schema.org pada seluruh halaman Pusat Training.

Dokumen ini bukan daftar final. Daftar URL harus terus dicocokkan dengan sitemap, route Astro, halaman yang benar-benar dipublikasikan, serta halaman baru yang ditambahkan selama pengembangan.

## Tujuan dan prinsip

- Memetakan seluruh jenis halaman dan URL sebelum menambahkan structured data.
- Menggunakan tipe Schema.org yang sesuai dengan isi utama dan fungsi halaman, bukan sekadar mengejar banyaknya schema.
- Menjaga agar data JSON-LD berasal dari data halaman/frontmatter yang benar dan sama dengan informasi yang terlihat oleh pengunjung.
- Menghubungkan entitas yang sama menggunakan `@id` yang konsisten, terutama organisasi, website, halaman, training, jadwal, dan artikel.
- Tidak membuat tanggal, lokasi, harga, status pendaftaran, penulis, atau informasi lain yang tidak tersedia di sumber.
- Menambahkan `BreadcrumbList` hanya jika breadcrumb memang tersedia dan sesuai dengan hierarki halaman.
- Tidak menjanjikan rich result Google. Schema.org membantu mesin pencari memahami konten, tetapi kelayakan rich result mengikuti kebijakan dan persyaratan Google masing-masing fitur.
- Satu commit untuk setiap halaman/jenis halaman yang dikerjakan agar perubahan mudah ditinjau dan dibatalkan.

## Status

| Area | Status | Catatan |
| --- | --- | --- |
| Homepage `/` | Sudah diimplementasikan pada perubahan homepage | Graph dasar `Organization`, `WebSite`, `WebPage`, ditambah daftar jadwal dan artikel. Perlu validasi build dan hasil JSON-LD setelah merge. |
| Halaman lain | Belum dikerjakan | Tinjau daftar dan cocokkan dengan route serta sitemap sebelum implementasi. |

## 3. Urutan halaman berikutnya

Urutan berikut adalah rencana awal berdasarkan struktur situs yang telah dibahas. Ini bukan asumsi bahwa semua route sudah ada atau semuanya masih aktif. Setiap butir perlu diverifikasi terhadap route Astro, sitemap, dan halaman yang benar-benar terbit.

| Urutan | Halaman / pola URL | Schema yang direncanakan | Catatan evaluasi |
| ---: | --- | --- | --- |
| 1 | `/` | `Organization`, `WebSite`, `WebPage`, `ItemList` jadwal dengan item `Event`, dan `ItemList` artikel dengan item `BlogPosting` | Sudah dikerjakan. Jadwal dan artikel harus mengikuti data yang benar-benar ditampilkan di homepage. |
| 2 | `/pelatihan/` | `CollectionPage`, `ItemList` | Daftar katalog pelatihan. Pastikan item list sesuai kartu/entri yang ditampilkan dan URL kanonis. |
| 3 | `/pelatihan/{kategori}/` | `CollectionPage`, `ItemList`, `BreadcrumbList` | Halaman kategori. Periksa apakah seluruh kategori memakai satu template atau ada variasi. |
| 4 | `/pelatihan/{training}/` | `Course`, `BreadcrumbList` | Detail pelatihan. Evaluasi properti course berdasarkan data yang benar-benar tersedia; jangan mengisi provider, durasi, mode, atau penawaran dengan asumsi. |
| 5 | `/jadwal/` | `CollectionPage`, `ItemList` berisi `Event` | Daftar jadwal. Pastikan daftar mengikuti filter, pengurutan, dan status jadwal pada halaman. |
| 6 | `/jadwal/{bulan}/` | `CollectionPage`, `ItemList`, `BreadcrumbList` | Arsip/daftar jadwal per bulan. Verifikasi format URL bulan dan apakah halaman kosong/noindex dapat terbentuk. |
| 7 | `/jadwal/{bulan}/{trainingSlug}/{scheduleSlug}/` | `Event`, `BreadcrumbList` | Detail satu jadwal. Ini kandidat utama untuk markup Event yang lengkap. Pastikan status, tanggal, lokasi/virtual location, attendance mode, dan offers sesuai data aktual. |
| 8 | `/artikel/` | `Blog` atau `CollectionPage`, `ItemList` | Pilih tipe halaman sesuai struktur konten aktual; daftar artikel harus sama dengan artikel yang ditampilkan. |
| 9 | `/artikel/{slug}/` | `BlogPosting` atau `Article`, `BreadcrumbList` | Detail artikel. Gunakan metadata publikasi, modifikasi, penulis, gambar, dan publisher dari sumber konten. |
| 10 | `/tentang-kami/` atau route profil perusahaan yang aktif | `AboutPage`, `BreadcrumbList` bila tersedia | Nama route perlu diverifikasi. Hubungkan halaman ke entitas Organization yang sama dengan homepage. |
| 11 | `/kontak/` | `ContactPage`, `BreadcrumbList` bila tersedia | Data kontak harus konsisten dengan informasi kontak aktual di halaman dan entitas Organization. |

### Catatan penting untuk daftar homepage

- **Jadwal training terdekat:** gunakan `ItemList` dengan item `Event` sebagai representasi daftar jadwal. Jangan menganggap markup pada homepage otomatis membuat setiap jadwal memenuhi syarat rich result Event; halaman detail jadwal perlu memiliki markup dan informasi yang memadai.
- **Artikel Terbaru:** gunakan `ItemList` dengan item `BlogPosting` untuk menjelaskan daftar artikel. Markup artikel yang lebih lengkap tetap ditempatkan pada halaman detail artikel.
- Daftar terstruktur harus mencerminkan item yang benar-benar terlihat, termasuk jumlah item, urutan, filter, dan URL.

## 4. Inventaris halaman yang perlu diperiksa

Sebelum menganggap rencana di atas lengkap, cocokkan dengan:

1. Semua file route di `src/pages/`, termasuk route dinamis dan route hasil generator.
2. Sitemap XML yang dipublikasikan dan seluruh sitemap index/child sitemap jika ada.
3. Halaman institusional seperti tentang kami, kontak, kebijakan privasi, syarat dan ketentuan, FAQ, atau halaman lain yang ditemukan.
4. Halaman pencarian, halaman indeks, halaman arsip, halaman kategori, serta variasi halaman yang mungkin tidak masuk sitemap.
5. Route redirect/legacy: jangan menambahkan schema pada URL lama yang hanya redirect; markup dipasang pada URL tujuan kanonis.
6. Halaman baru yang ditambahkan setelah dokumen ini dibuat.

Tambahkan baris baru ke tabel **Urutan halaman berikutnya** setiap kali ditemukan jenis halaman atau pola URL baru. Jika satu pola URL memiliki beberapa template atau tujuan yang berbeda, pisahkan menjadi baris tersendiri.

## 5. Checklist evaluasi per halaman

- [ ] Route dan URL kanonis sudah diverifikasi.
- [ ] Halaman benar-benar aktif dan dapat diindeks.
- [ ] Tipe schema sesuai dengan tujuan serta konten utama halaman.
- [ ] Properti JSON-LD bersumber dari data aktual, bukan teks/angka rekaan.
- [ ] Informasi penting pada schema juga terlihat di halaman.
- [ ] `@id` konsisten dan terhubung ke entitas yang tepat.
- [ ] `BreadcrumbList` sesuai breadcrumb yang terlihat.
- [ ] Tidak ada entitas duplikat atau konflik dengan schema dari layout/komponen lain.
- [ ] URL gambar dan URL halaman absolut serta valid.
- [ ] Hasil JSON-LD diperiksa setelah build.
- [ ] Hasil diuji dengan Schema Markup Validator dan, bila relevan, Google Rich Results Test.
- [ ] Catat hasil pemeriksaan, temuan, dan tindak lanjut di dokumen ini.

## 6. Log evaluasi dan revisi

| Tanggal | Halaman/pola | Temuan atau perubahan | Keputusan | Status |
| --- | --- | --- | --- | --- |
| 2026-11-18 | Homepage `/` | Menambahkan graph organisasi, website, homepage, daftar jadwal terdekat, dan artikel terbaru. | Pertahankan sebagai implementasi awal; validasi hasil build dan JSON-LD sebelum dinyatakan final. | Menunggu validasi build |

## 7. Aturan pemeliharaan dokumen

- Jangan menghapus halaman dari inventaris hanya karena belum dikerjakan.
- Tandai halaman yang tidak lagi aktif dan tuliskan alasan serta URL penggantinya.
- Tambahkan halaman baru segera setelah route atau jenis halaman baru dibuat.
- Revisi tipe schema jika struktur konten atau tujuan halaman berubah.
- Perbarui status implementasi hanya setelah perubahan tersedia di branch dan hasil validasinya dicatat.
