# Pusattraining — Design System Reference

## Tujuan

Membangun situs pusat yang menggabungkan berbagai program training dan jadwal dari beberapa penyelenggara/situs. Wahana Totalita menjadi referensi pola visual, hierarki informasi, dan interaksi; implementasi tetap berupa komponen Astro milik Pusattraining, bukan salinan kode atau aset sumber.

## Referensi yang diamati

- Homepage: hero dengan trust signals, jalur program, katalog unggulan, pencarian, jadwal batch, bukti korporasi, dokumentasi, FAQ, dan CTA.
- Katalog training: kategori sebagai navigasi cepat, daftar program dikelompokkan per bidang, metadata sertifikasi/metode/durasi/investasi, serta tautan detail.
- Detail/jadwal program: informasi program dan silabus dipisahkan dari batch yang memiliki tanggal, metode, lokasi, dan CTA pendaftaran.
- Kontak/pendaftaran: jalur peserta mandiri dan kebutuhan in-house, langkah pendaftaran, serta FAQ.

## Prinsip desain Pusattraining

1. Mengutamakan keterbacaan dan pencarian program, bukan menyalin identitas merek Wahana.
2. Memakai sistem token warna, tipografi, spacing, radius, shadow, dan container yang konsisten.
3. Layout editorial yang lapang, heading tegas, metadata ringkas, card dengan hierarki jelas, dan CTA yang mudah ditemukan.
4. Responsive dari mobile ke desktop; navigasi dan tabel jadwal harus tetap usable di layar kecil.
5. Konten program dan batch harus bersifat data-driven agar satu program dapat memiliki banyak jadwal.
6. Aksesibilitas: landmark semantik, label form, focus-visible, kontras memadai, dan interaksi keyboard.
7. JavaScript minimal dan progressive enhancement; gunakan HTML native untuk disclosure, form, dan navigasi bila memadai.
8. Semua elemen memakai semantic class yang konsisten, termasuk wrapper, link, button, dan item list.

## Peta halaman yang akan didukung

- / — portal utama: hero/search, kategori, program unggulan, jadwal terdekat, keunggulan, mitra/dokumentasi, artikel/FAQ, CTA.
- /training/ — katalog program, kategori, pencarian/filter, pagination atau load-more.
- /training/[slug]/ — detail program: overview, sasaran, persyaratan, silabus, fasilitas, metode, FAQ, jadwal terkait.
- /jadwal/ — kalender/daftar batch lintas program, filter bulan/kategori/metode.
- /jadwal/[yyyy-mm]/ — jadwal per bulan.
- /jadwal/[yyyy-mm]/[training]/[batch]/ — detail batch, jika arsitektur data final membutuhkan URL batch mandiri.
- Halaman kategori dan penyelenggara dapat ditambahkan tanpa mengubah fondasi komponen.

## Model data konseptual

**Training** adalah program yang stabil: judul, slug, ringkasan, kategori, penyelenggara, kredensial/sertifikasi, durasi, metode yang tersedia, gambar, silabus, persyaratan, dan CTA.

**Schedule/Batch** adalah pelaksanaan konkret dari Training: relasi training, tanggal mulai/selesai, metode, lokasi/timezone, kuota/status, harga (opsional), dan tautan pendaftaran.

Satu Training dapat memiliki banyak Schedule. Jadwal tidak ditanam sebagai teks statis di dalam TrainingCard.

## Audit parity terhadap repositori internal

Audit dilakukan terhadap struktur aktual `arisciwek/confinedspace` dan `arisciwek/damkar`. Cakupan yang diadopsi untuk Pusattraining meliputi:

- Shared content blocks: FAQ, benefits, reasons, gallery, image panel, comparison table, stats, testimonials, timeline, checklist, note, documents, glossary, source links, contact panel, dan CTA.
- Editorial: article card/grid, latest articles, related articles, dan navigasi artikel sebelumnya.
- Training: program grid, syllabus, requirements, facts, materi list, serta tabs.
- Schedule: status batch, month heading, filter, table, calendar, card dan list.
- Block infrastructure: kontrak `PageBlock`, registry, dan `BlockRenderer.astro` untuk komposisi halaman berbasis data.
- Interaksi: mobile menu, native details/dropdown/dialog, serta tabs dengan dukungan keyboard.

Komponen-komponen tersebut telah dibuat sebagai fondasi di branch `feat/training-design-system`. Status detail dan daftar file ada di `docs/COMPONENT-BLOCK-INVENTORY.md`.

## Aturan komponen

- components/shared/: elemen lintas halaman tanpa pengetahuan domain training.
- components/training/: komponen yang memahami entitas program.
- components/schedule/: komponen yang memahami batch dan tanggal.
- blocks/: section komposisi halaman; menerima data melalui props.
- layouts/: kerangka halaman dan metadata; bukan tempat menyimpan data program.
- scripts/: hanya modul interaksi yang dipakai lebih dari satu block.
- Hindari satu komponen raksasa yang mengatur seluruh halaman.
- Jangan membuat variasi visual dengan duplikasi markup; gunakan props/variant yang terkontrol.

## Arah visual dan warna

- Nuansa: corporate training directory, profesional, tepercaya, modern, dan mudah dipindai.
- Palet ditetapkan sebagai deep slate + warm amber: slate untuk fondasi, teks, dan struktur; amber untuk CTA dan highlight; putih/slate terang untuk ruang konten.
- Status memakai emerald (tersedia), amber/orange (perhatian), rose (ditutup/gagal), sky (informasi), dan slate (netral).
- Rincian skala, nilai HEX, pemetaan komponen, serta aturan kontras ada di `docs/COLOR-SYSTEM.md`.
- Token CSS berada di `src/styles/tokens.css`; import file tersebut sebelum `components.css` pada entry stylesheet global saat scaffold Astro dibuat.
- Tipografi: sans-serif kontemporer; skala heading kontras, body nyaman dibaca, metadata lebih kecil namun tetap terbaca.
- Grid: container terpusat dengan lebar maksimum konsisten; cards memakai grid responsif.
- Foto: dokumentasi training nyata atau aset berlisensi/diizinkan. Jangan hotlink atau mengambil aset milik situs referensi.
- Ikon: satu sistem ikon konsisten; hindari emoji sebagai pengganti ikon UI.

## JavaScript yang direncanakan

- Mobile navigation: buka/tutup, Escape, close setelah memilih link, sinkronisasi aria-expanded.
- Search/filter katalog: filter data yang sudah dirender atau navigasi ke query URL; URL harus dapat dibagikan.
- Accordion FAQ/silabus: native details jika tidak membutuhkan perilaku khusus.
- Tabs: hanya bila konten benar-benar berupa panel alternatif; dukung keyboard.
- Calendar/filter jadwal: query parameter sebagai state yang bisa di-refresh dan dibagikan.
- Tidak menambahkan slider/carousel kecuali konten dan UX memang membutuhkannya.

## Batasan referensi

Yang diadaptasi adalah pola komposisi, jenis komponen, hierarki konten, dan perilaku umum. Jangan menyalin source code, stylesheet, teks, logo, foto, atau aset proprietary Wahana Totalita. Semua markup, styling, konten contoh, dan aset Pusattraining dibuat sendiri.
