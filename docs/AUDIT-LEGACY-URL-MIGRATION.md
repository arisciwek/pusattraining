# Audit Master URL Lama — Tahap 1

**Repository:** `arisciwek/pusattraining`  
**Basis audit:** sitemap snapshot 14 November 2026  
**Sumber:** `docs/INVENTARIS-URL-SITEMAP.csv`  
**Status:** inventaris awal; belum menjadi redirect produksi

## Tujuan

Menyiapkan satu master mapping yang menjadi sumber keputusan migrasi URL lama. Setiap URL harus memiliki keputusan eksplisit sebelum konfigurasi redirect dibuat. Tahap ini sengaja memisahkan inventaris dari keputusan agar URL tidak diarahkan hanya berdasarkan tebakan slug.

## Cakupan terukur

Master berisi **572 URL**:
- **136** URL bertipe page.
- **436** URL bertipe post.

Klasifikasi heuristik awal dari inventaris sumber:
- Page: 95 program/kategori pelatihan (perlu validasi), 10 institusional/navigasi, 31 jasa/layanan.
- Post: 371 jadwal/batch/promosi pelatihan (heuristik), 46 post lain (perlu klasifikasi), 3 artikel/materi/edukasi (heuristik), 16 lowongan/rekrutmen.

Angka klasifikasi tersebut hanya menyalin kategori awal berbasis slug. Itu **bukan hasil pemeriksaan isi halaman** dan tidak boleh dipakai otomatis untuk redirect atau penghapusan.

## Master mapping

File `MASTER-LEGACY-URL-MAPPING.csv` memuat semua URL sumber dan kolom kerja:

| Kolom | Fungsi |
|---|---|
| `source_type` | Jenis sitemap asal: page atau post. |
| `old_url`, `old_slug` | Identitas URL lama dari snapshot. |
| `initial_classification`, `source_note` | Petunjuk klasifikasi awal, bukan keputusan. |
| `old_title`, `old_intent` | Diisi setelah halaman lama diperiksa. |
| `new_url` | Tujuan kanonis setelah diputuskan. |
| `decision` | KEEP, REDIRECT, MERGE, ARCHIVE, atau 410. |
| `reason` | Alasan keputusan yang dapat diaudit. |
| `content_action` | Keep, rewrite, merge, archive, atau remove sesuai keputusan. |
| `priority` | Diisi dari GSC, analytics, backlink, dan kepentingan bisnis. |
| `audit_status` | Status pemeriksaan; seluruh record saat ini NOT_REVIEWED. |
| `reviewer_notes` | Catatan pemeriksaan manual. |

## Aturan keputusan

1. Jangan mengisi `new_url` atau `decision` sebelum konten lama dan intent-nya diperiksa.
2. Jangan mengarahkan semua URL lama ke homepage atau kategori umum.
3. Artikel edukasi tidak otomatis diarahkan ke halaman program; jadwal historis tidak otomatis diarahkan ke jadwal aktif.
4. Pertahankan URL lama jika masih relevan dan dapat digunakan sebagai canonical.
5. Gunakan REDIRECT/MERGE hanya jika tujuan baru benar-benar setara atau menjadi pengganti substansi.
6. ARCHIVE untuk konten historis yang masih layak diakses; 410 hanya setelah dipastikan tidak ada nilai dan tidak ada pengganti relevan.
7. Prioritas SEO tidak boleh ditebak dari sitemap. Gunakan data Search Console, analytics, backlink, crawl, dan konfirmasi bisnis bila tersedia.

## Tahapan lanjutan

1. Crawl halaman lama untuk memperoleh title, H1, status HTTP, canonical, dan ringkasan konten.
2. Klasifikasikan ulang setiap URL berdasarkan isi dan search intent.
3. Kelompokkan duplikat dan tentukan satu halaman kanonis.
4. Cocokkan dengan kategori, master training, artikel, jadwal, layanan, atau halaman institusional di situs baru.
5. Isi keputusan serta alasan; tandai URL ambigu untuk review pemilik.
6. Setelah mapping disetujui, implementasikan redirect sesuai kemampuan platform deployment dan tambahkan automated tests untuk loop, chain, target 404, dan duplikasi sumber.

## Batasan tahap ini

- Tidak ada redirect produksi yang ditambahkan.
- Tidak ada URL yang dinyatakan KEEP/REDIRECT/MERGE/ARCHIVE/410.
- Tidak ada asumsi trafik atau backlink.
- Sitemap snapshot bukan pengganti crawl situs lama atau data performa Search Console.
