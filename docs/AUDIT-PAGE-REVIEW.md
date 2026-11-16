# Audit Konten Legacy — 136 Halaman

**Repository:** arisciwek/pusattraining  
**Branch kerja:** audit/legacy-page-review  
**Sumber URL:** docs/page-sitemap.xml snapshot 14 November 2026  
**Jumlah:** 136 URL page  
**Status:** persiapan audit; keputusan konten belum ditetapkan.

## Tujuan

Mengaudit 136 URL bertipe page lebih dahulu sebelum beralih ke 436 URL post. Audit ini memisahkan fakta hasil observasi dari keputusan migrasi agar tidak ada redirect yang dibuat hanya berdasarkan slug atau struktur URL lama.

## Sumber kerja

- docs/LEGACY-PAGE-AUDIT-QUEUE.csv: antrean 136 halaman dengan urutan sesuai sitemap dan lastmod.
- docs/MASTER-LEGACY-URL-MAPPING.csv: master keputusan gabungan 572 URL. Jangan mengisi keputusan sebelum bukti cukup.
- docs/LEGACY-URL-CRAWL.md: prosedur crawler, format output, dan batasan interpretasi.
- docs/ANALISIS-SITEMAP-DAN-RENCANA-MIGRASI-ASTRO.md: taksonomi dan model konten awal.
- docs/ARSITEKTUR-URL-DAN-STRATEGI-REDIRECT.md: pola URL tujuan yang diusulkan.

## Tahap audit

### A. Observasi teknis (dari crawl)

Periksa status HTTP dan final URL, redirect chain, title, H1, meta description, canonical, robots, perkiraan jumlah kata, cuplikan isi, error crawl, konten non-HTML, halaman kosong, dan indikasi soft-404.

Data crawler adalah bukti awal, bukan keputusan KEEP/REDIRECT.

### B. Klasifikasi editorial

- PROGRAM_DETAIL: satu program/sertifikasi tertentu.
- TRAINING_CATEGORY: landing kategori/rumpun pelatihan.
- SERVICE: jasa konsultasi atau layanan non-pelatihan.
- INSTITUTIONAL: tentang, kontak, pendaftaran, profil.
- EDITORIAL: artikel/panduan/berita.
- ARCHIVE_OR_CAMPAIGN: promosi, kampanye, konten historis.
- DUPLICATE_OR_VARIANT: konten yang substansinya berulang atau varian lokasi/jenjang.
- UNCLEAR: isi tidak cukup jelas; wajib review manual.

Catat intent utama: transactional, informational, navigational, atau mixed. Jangan menganggap sertifikasi, kategori, dan program sebagai jenis halaman yang sama.

### C. Pencocokan ke situs baru

Sebelum menetapkan tujuan, pastikan halaman/entitas tujuan memang ada atau direncanakan secara eksplisit; intent dan substansi setara; tidak ada halaman baru yang lebih spesifik; relasi kategori, program, jadwal, artikel, dan layanan tidak tercampur; dan tujuan akhir mengembalikan 200 dengan canonical ke dirinya sendiri.

### D. Keputusan migrasi

- KEEP: pertahankan URL lama.
- REDIRECT: pindahkan ke satu URL baru yang setara.
- MERGE: gabungkan substansi ke halaman kanonis; sumber diarahkan ke hasil gabungan.
- ARCHIVE: pertahankan sebagai arsip yang jelas statusnya.
- 410: hapus permanen jika tidak ada pengganti dan tidak ada alasan mempertahankan.

Jika bukti belum cukup, biarkan keputusan kosong dan gunakan NEEDS_REVIEW. Jangan memilih 410 hanya karena halaman gagal di-crawl.

## Prioritas pemeriksaan

1. Halaman kategori/induk yang menjadi jalur navigasi.
2. Halaman program yang jelas dan kemungkinan masih menjadi produk aktif.
3. Halaman layanan yang menghasilkan prospek bisnis.
4. Halaman institusional dan konversi.
5. Halaman ambigu, duplikat, eksperimen, atau historis.

Urutan ini bukan prioritas SEO berbasis trafik. Prioritas SEO final memerlukan data Search Console, analytics, backlink, dan konfirmasi pemilik bisnis.

## Kelompok risiko untuk review manual

| Pola / URL | Alasan pemeriksaan |
|---|---|
| /operator/, /teknisi/, /petugas/ | Slug generik; intent dan cakupan harus dibaca. |
| /pelatihank3/, /safety-kesehatan-2/ | Kemungkinan halaman umum, variasi, atau duplikasi. |
| /bnsp/ dan halaman di bawahnya | Bedakan landing skema sertifikasi dari halaman program. |
| /smk3/ dan halaman pendampingan SMK3 | Bedakan pelatihan, sistem manajemen, dan jasa konsultasi. |
| /12314-2/, /contact-3/ | Slug teknis/generik; periksa halaman valid, duplikat, atau artefak CMS. |
| /pelatihan-mengedit-wordpress/, /otomotif-getar-buana-p/ | Indikasi konten tidak relevan/eksperimental; tetap periksa isi dan sinyal SEO. |
| URL bertingkat untuk program serupa | Periksa duplikasi, hierarki lama, dan kanonis yang tepat. |

Daftar ini adalah flag pemeriksaan, bukan keputusan redirect.

## Kriteria selesai

- [ ] 136 URL tercatat pada antrean.
- [ ] Hasil crawl tersedia atau setiap kegagalan diberi catatan.
- [ ] Semua halaman memiliki klasifikasi editorial atau UNCLEAR.
- [ ] Intent, judul/H1, dan ringkasan isi dicatat.
- [ ] Kandidat duplikat/varian dikelompokkan.
- [ ] Kandidat URL tujuan dicocokkan dengan arsitektur situs baru.
- [ ] Setiap keputusan memiliki alasan dan tingkat keyakinan.
- [ ] Kasus ambigu ditandai untuk persetujuan pemilik.
- [ ] Tidak ada redirect produksi sebelum mapping ditinjau dan disetujui.

## Batasan

Snapshot sitemap bertanggal 14 November 2026. lastmod adalah metadata sitemap WordPress, bukan bukti trafik atau kualitas konten. Antrean ini tidak mengubah master mapping dan tidak mengaktifkan redirect. Pengujian crawler 10 URL lalu 572 URL tetap mengikuti prosedur dan pengingat terpisah.