# Legacy URL Crawl — Tahap 2

**Repository:** `arisciwek/pusattraining`  
**Branch:** `seo/legacy-url-crawl-tooling`  
**Status:** tooling tersedia; crawl massal belum dijalankan.  
**Tanggal:** 2026-11-16

## Tujuan

Mengumpulkan bukti teknis dan editorial dari 572 URL legacy sebelum keputusan migrasi SEO dibuat. Hasil crawl disimpan terpisah dari master mapping agar data observasi tidak tercampur dengan keputusan reviewer.

## Sumber dan output

| File | Fungsi |
|---|---|
| `docs/MASTER-LEGACY-URL-MAPPING.csv` | Master 572 URL dan sumber keputusan; tidak diubah crawler. |
| `scripts/crawl-legacy-urls.mjs` | Crawler berbasis Node.js built-in, tanpa dependency tambahan. |
| `docs/LEGACY-URL-CRAWL-RESULTS.csv` | Output crawl lokal; dibuat saat crawler dijalankan dan tidak perlu di-commit jika berisi data sementara. |

Crawler menghasilkan kolom:
- `old_url`, `requested_url`, `final_url`
- `http_status`, `content_type`, `redirect_chain`
- `title`, `h1`, `meta_description`, `canonical`, `meta_robots`
- `word_count`, `content_excerpt`
- `crawl_error`, `crawled_at`

## Cara menjalankan

Persyaratan: Node.js >= 22.22.0 (mengikuti `package.json`). Tidak perlu `npm install` untuk crawler ini.

Uji coba terbatas dahulu:

```bash
node scripts/crawl-legacy-urls.mjs --limit 10
```

Jika hasil dan beban server wajar, jalankan seluruh URL:

```bash
node scripts/crawl-legacy-urls.mjs
```

Opsi yang tersedia:

```bash
node scripts/crawl-legacy-urls.mjs --help
```

Default:
- concurrency 3 (maksimum 8)
- timeout 15 detik per request
- jeda 500 ms per worker
- mengikuti redirect secara manual hingga 10 hop
- checkpoint setiap 10 URL
- melanjutkan URL yang belum memiliki hasil pada file output

Untuk mengulang baris yang gagal karena error jaringan:

```bash
node scripts/crawl-legacy-urls.mjs --retry-errors
```

Untuk menguji ulang seluruh crawl dari awal, hapus file output terlebih dahulu atau gunakan path output baru:

```bash
node scripts/crawl-legacy-urls.mjs --output docs/LEGACY-URL-CRAWL-RECHECK.csv
```

## Cara membaca hasil

- `http_status` adalah status respons akhir setelah redirect diikuti.
- `redirect_chain` menyimpan setiap hop redirect yang ditemukan.
- `final_url` adalah URL akhir yang merespons crawler; belum tentu URL yang seharusnya menjadi target migrasi.
- `canonical` adalah deklarasi canonical yang ditemukan pada HTML. Nilai ini harus dibandingkan dengan final URL dan canonical situs baru.
- `word_count` dan `content_excerpt` hanya indikator awal; keduanya bukan pengganti pembacaan isi lengkap.
- `crawl_error` menandai timeout, kegagalan DNS/TLS, redirect loop/terlalu panjang, atau error request lain.

Status 200 tidak otomatis berarti konten layak KEEP. Status 404/410 juga tidak otomatis berarti URL boleh dihapus; periksa backlink, trafik, dan riwayat URL jika tersedia.

## Batasan dan keselamatan

1. Crawler hanya melakukan GET dan tidak mengirim form, login, komentar, atau tindakan tulis.
2. Crawler tidak mengubah master CSV, tidak mengisi `new_url`, dan tidak menetapkan `decision`.
3. Crawler tidak mengambil keputusan berdasarkan kemiripan slug.
4. Output berisi cuplikan teks untuk membantu triase; reviewer tetap perlu memeriksa halaman prioritas secara manual.
5. Crawler menghormati batas concurrency dan jeda request. Jangan menaikkan concurrency secara agresif pada situs produksi.
6. Hasil dapat berbeda menurut waktu, cache, firewall, geolokasi, atau kondisi server. Simpan tanggal crawl dan ulangi URL yang hasilnya meragukan.
7. Data GSC, analytics, backlink, dan konfirmasi pemilik bisnis tetap diperlukan untuk menentukan prioritas SEO.

## Tahap setelah crawl

1. Validasi kelengkapan: jumlah baris output harus 572; identifikasi URL yang error atau bukan HTML.
2. Kelompokkan URL berdasarkan status, title/H1, canonical, redirect chain, dan kemiripan konten.
3. Cocokkan setiap URL dengan koleksi dan route situs baru yang benar-benar tersedia.
4. Susun rekomendasi awal untuk reviewer, bukan keputusan otomatis.
5. Setelah reviewer menyetujui keputusan dan target, baru bangun generator redirect fail-closed untuk Vercel dan server VPS.
