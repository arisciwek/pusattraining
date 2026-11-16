# Pengumpulan Sinyal SEO untuk Audit URL Legacy

**Repository:** `arisciwek/pusattraining`  
**Cakupan:** 572 URL (136 page + 436 post) dari master mapping  
**Status:** template pengumpulan data; belum berisi metrik aktual.

## Tujuan

Crawl memberi gambaran teknis dan cuplikan isi, tetapi tidak mengukur nilai organik historis. Sebelum memutuskan KEEP, REDIRECT, MERGE, ARCHIVE, atau 410, lengkapi sinyal performa dan otoritas URL sejauh data tersedia.

Template kerja: `docs/LEGACY-SEO-SIGNALS-TEMPLATE.csv`. Satu baris disediakan untuk setiap URL pada master mapping. Jangan mengubah atau menimpa master mapping dengan hasil ekspor mentah.

## Sumber data yang disarankan

### 1. Google Search Console

Ekspor data Performance untuk rentang 16 bulan terakhir (atau rentang maksimum yang tersedia):
- dimension **Pages** untuk memperoleh clicks, impressions, CTR, dan average position per URL;
- bila memungkinkan, ekspor terpisah dengan dimension **Pages + Queries** untuk memahami intent dan query yang memicu impresi;
- gunakan properti domain yang benar dan pastikan host lama `pusattrainingk3.com` terwakili.

Masukkan agregat per URL ke kolom `gsc_*`. Jangan menjumlahkan average position dari banyak query secara manual. Gunakan nilai agregat yang diekspor per halaman.

### 2. Analytics

Ekspor landing page/landing page + query string untuk periode yang sama:
- sessions atau landing sessions;
- conversions/key events yang relevan dengan lead/pendaftaran.

Normalisasi URL sebelum pencocokan: buang query string dan fragment hanya jika parameter tersebut bukan bagian dari identitas halaman; samakan trailing slash secara konsisten; pertahankan path dan host asal untuk audit. Catat definisi konversi yang dipakai.

### 3. Backlink

Gunakan ekspor dari tool backlink yang tersedia:
- referring domains unik per URL;
- jumlah backlinks per URL.

Jika tool hanya menyediakan data domain-level atau tidak memiliki data untuk URL tertentu, biarkan kosong dan jelaskan di notes. Jangan menganggap nilai kosong sama dengan nol.

## Definisi kolom

| Kolom | Isi |
|---|---|
| `old_url`, `source_type` | Kunci URL dan jenis sumber dari master mapping; jangan ubah. |
| `gsc_clicks`, `gsc_impressions` | Total klik dan impresi organik per URL. |
| `gsc_ctr` | CTR agregat sebagaimana diekspor; simpan konsisten sebagai desimal atau persen. |
| `gsc_average_position` | Posisi rata-rata agregat dari ekspor GSC. |
| `analytics_sessions` | Sesi yang mendarat pada URL tersebut. |
| `analytics_conversions` | Konversi/key events yang disepakati. |
| `referring_domains`, `backlinks` | Jumlah domain perujuk unik dan backlink menuju URL. |
| `data_start_date`, `data_end_date` | Rentang tanggal metrik. |
| `source_export` | Nama file ekspor atau sumber data. |
| `notes` | Catatan normalisasi, keterbatasan, atau ketidakcocokan URL. |

## Aturan pencocokan dan kualitas data

1. Gunakan `old_url` sebagai kunci utama; jangan cocokkan hanya berdasarkan slug.
2. Simpan ekspor mentah GSC, Analytics, dan backlink secara terpisah agar bisa ditelusuri ulang.
3. Jangan mengubah nilai kosong menjadi 0. Nol berarti sumber data memang melaporkan tidak ada metrik; kosong berarti belum tersedia/tidak dapat dipastikan.
4. Jangan menjumlahkan metrik lintas periode yang tumpang tindih.
5. Pastikan timezone dan rentang tanggal dicatat.
6. Perhatikan URL dengan parameter, variasi www/non-www, HTTP/HTTPS, trailing slash, dan redirect lama.
7. Metrik agregat bukan keputusan migrasi. URL bertrafik rendah masih dapat bernilai karena backlink, konversi, kewajiban institusional, atau relevansi bisnis.
8. Query GSC dan landing-page analytics dapat memiliki ambang privasi, sampling, atau perbedaan definisi; catat keterbatasannya.

## Cara menggunakan bersama audit konten

Urutan yang disarankan:
1. Lengkapi crawl teknis untuk 572 URL.
2. Isi sinyal SEO dari ekspor aktual.
3. Review isi dan intent pada antrean page/post.
4. Kelompokkan kandidat duplikat berdasarkan isi dan query, bukan slug saja.
5. Ajukan rekomendasi dengan bukti: status/canonical, substansi, intent, clicks/impressions, conversions, referring domains, dan kecocokan route baru.
6. Minta persetujuan sebelum mengisi keputusan final dan menghasilkan redirect.

**Peringatan:** jangan mengunggah atau menaruh kredensial, token, data pribadi pendaftar, atau ekspor berisi informasi pengguna ke repository. Yang dibutuhkan hanya agregat URL-level yang relevan.
