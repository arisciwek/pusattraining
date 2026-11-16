# Strategi Redirect: Vercel Staging dan VPS Production

**Repository:** `arisciwek/pusattraining`  
**Status:** infrastruktur redirect disiapkan (pola damkar, domain-aware); **belum ada redirect path legacy aktif**.  
**Diperbarui:** 2026-11-16

## Kondisi saat ini (fresh)

- **`vercel.json` (root):** `trailingSlash: true`, `redirects: []` — siap menampung aturan redirect **path relatif** (berlaku di host/domain tempat deploy: `.lan`, staging, Vercel, maupun production).
- **`public/.htaccess` (Apache/cPanel/VPS):** pola damkar — `ErrorDocument 404`, MIME/kompresi/cache/header keamanan, normalisasi `/index.html` → `/` (301, relatif ke host), dan **kanonisasi host hanya untuk produksi** `https://pusattrainingk3.com` (tanpa `www`, paksa https). Domain `.lan`/staging **tidak** dipaksa ke domain produksi. Bagian redirect path legacy masih placeholder (belum ada aturan).
- **`astro.config.mjs`:** `site` dari `SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → fallback `https://pusattrainingk3.com`; `trailingSlash: 'always'`, `build.format: 'directory'`, sitemap aktif. Build staging dapat memakai `SITE_URL=http://<domain>.lan`.
- **Mapping legacy:** `docs/MASTER-LEGACY-URL-MAPPING.csv` (572 URL: 136 page, 436 post) masih `NOT_REVIEWED` → **belum ada** keputusan `REDIRECT` dengan `new_url` terverifikasi yang boleh diekspor/diaktifkan.
- **Sitemap build (saat ini):** `dist/sitemap-index.xml` + `dist/sitemap-0.xml` (28 URL kanonis situs baru). `docs/` menyimpan snapshot sitemap legacy (`sitemap.xml`, `page-sitemap.xml`, `post-sitemap.xml`) sebagai referensi inventaris.

## Keputusan deployment

| Lingkungan | Platform | Mekanisme redirect |
|---|---|---|
| Staging `.lan` / lokal | Apache (sesuai hosting) atau preview | `public/.htaccess` (aturan relatif, tanpa paksa domain produksi) |
| Staging/Production di Vercel | Vercel | `vercel.json` (path relatif; `permanent: true` untuk redirect permanen) |
| Production VPS | VPS sendiri (Apache/Nginx) | `public/.htaccess` (Apache) atau snippet Nginx; kanonisasi host hanya aktif untuk `pusattrainingk3.com` |

Satu master mapping menjadi sumber keputusan. Aturan path untuk semua target deploy harus **konsisten** dan berasal dari mapping yang sama. Gunakan **path relatif ke host** agar perilaku sama di `.lan`, Vercel, dan production.

## Prinsip penting

1. Tidak ada redirect aktif hanya karena slug lama terlihat mirip dengan slug baru.
2. Hanya record dengan keputusan `REDIRECT` dan `new_url` yang sudah diverifikasi boleh diekspor menjadi aturan.
3. `KEEP`, `MERGE`, `ARCHIVE`, dan `410` tidak boleh diterjemahkan menjadi redirect biasa.
4. Setiap target harus URL internal valid, sudah tersedia, dan setara dari sisi isi serta search intent.
5. Jangan mengarahkan halaman yang tidak ditemukan ke homepage atau kategori umum.
6. Satu URL sumber hanya boleh memiliki satu keputusan aktif; hindari duplikasi, chain, dan loop.
7. Pertahankan query string kecuali ada alasan teknis/SEO yang terdokumentasi.
8. Jangan memasang aturan migrasi path pada production sebelum staging dan daftar target lulus pengujian.

## Perbedaan kode status

- **Vercel:** `permanent: true` menghasilkan redirect permanen (308).
- **Nginx production:** gunakan `return 301` untuk migrasi URL permanen.
- **Apache `.htaccess`:** gunakan `[R=301,L]` untuk migrasi URL permanen.
- Semuanya menyatakan perpindahan permanen; tujuan dan cakupan mapping harus tetap sama.

## Alur implementasi

### Tahap A — Audit dan persetujuan mapping
- Periksa konten lama, title, H1, canonical, status HTTP, dan intent setiap URL.
- Cocokkan dengan halaman baru yang sudah ada; isi `old_title`, `old_intent`, `new_url`, `decision`, `reason`, `content_action`, status audit.
- Tandai data yang tidak dapat diverifikasi sebagai perlu review; jangan menebak target.
- Gunakan GSC/analytics/backlink untuk prioritas bila tersedia.

### Tahap B — Ekspor/generator konfigurasi (setelah mapping disetujui)
- Hasilkan aturan path yang konsisten ke `vercel.json` dan/atau snippet server (mis. `deploy/nginx/redirects.conf`) dari sumber mapping yang sama.
- Generator/proses wajib gagal (fail closed) bila: URL sumber duplikat, REDIRECT tanpa target, target eksternal/tidak valid, source=target, chain/loop, atau record belum selesai audit ikut diekspor.
- Hanya keputusan `REDIRECT` yang disetujui yang diekspor.

### Tahap C — Verifikasi staging
- Uji status permanen & `Location` benar, target 200 (bukan 404/soft-404), variasi trailing slash, query string/encoding, tidak ada loop/chain, canonical tujuan ke dirinya sendiri.
- Pastikan perilaku sama di domain `.lan` dan/atau Vercel sesuai environment.

### Tahap D — Production
- Terapkan konfigurasi yang sama-sama telah diuji (Vercel dan/atau VPS). Untuk Nginx: simpan config lama, `nginx -t`, reload. Untuk Apache: pastikan `.htaccess`/vhost termuat.
- Uji dari jaringan publik; pantau 404/3xx/landing page via log & Search Console.

## Pemisahan file dan tanggung jawab

| File/lokasi | Fungsi |
|---|---|
| `docs/MASTER-LEGACY-URL-MAPPING.csv` | Sumber keputusan URL lama → URL baru |
| `docs/AUDIT-LEGACY-URL-MIGRATION.md` | Prosedur audit dan kriteria keputusan |
| `docs/ARSITEKTUR-URL-DAN-STRATEGI-REDIRECT.md` | Arsitektur URL & strategi redirect (rancangan) |
| `vercel.json` | Konfigurasi deploy Vercel; `redirects` diisi hanya dari mapping REDIRECT terverifikasi |
| `public/.htaccess` | Konfigurasi Apache (kanonisasi produksi + placeholder/aturan path redirect saat disetujui) |
| `deploy/nginx/redirects.conf` (opsional) | Snippet Nginx production, bila digunakan, dari mapping yang sama |
| `scripts/generate-redirects.mjs` (opsional) | Generator/validasi, bila disiapkan setelah format mapping final |

## Kriteria selesai

Redirect migration siap production jika:
- Semua URL bernilai SEO/bisnis tinggi sudah diaudit.
- Semua keputusan `REDIRECT` memiliki target yang disetujui dan hidup.
- Konfigurasi untuk target deploy konsisten dan berasal dari satu sumber data.
- Automated/manual checks lulus untuk duplikasi, chain, loop, status target, dan konsistensi hasil.
- Uji staging selesai dan hasilnya disetujui sebelum aturan path diterapkan di production.
