# Strategi Redirect: Vercel Staging dan VPS Production

**Repository:** `arisciwek/pusattraining`  
**Branch kerja:** `seo/redirect-deployment-strategy`  
**Status:** rancangan deployment; belum ada redirect aktif.

## Keputusan deployment

| Lingkungan | Platform | Mekanisme redirect |
|---|---|---|
| Staging | Vercel | `vercel.json` pada root project |
| Production | VPS sendiri | Konfigurasi Nginx pada virtual host/domain production |

Satu master mapping di `docs/MASTER-LEGACY-URL-MAPPING.csv` menjadi sumber keputusan. Aturan untuk kedua platform harus dihasilkan dari mapping yang sama, bukan dipelihara manual secara terpisah.

## Prinsip penting

1. Tidak ada redirect yang boleh aktif hanya karena slug lama terlihat mirip dengan slug baru.
2. Hanya record dengan keputusan `REDIRECT` dan `new_url` yang sudah diverifikasi boleh diekspor menjadi aturan.
3. `KEEP`, `MERGE`, `ARCHIVE`, dan `410` tidak boleh diterjemahkan menjadi redirect biasa.
4. Setiap target harus merupakan URL internal yang valid, sudah tersedia, dan setara dari sisi isi serta search intent.
5. Jangan mengarahkan halaman yang tidak ditemukan ke homepage atau kategori umum.
6. Satu URL sumber hanya boleh memiliki satu keputusan aktif. Hindari duplikasi, chain, dan loop.
7. Pertahankan query string pada redirect kecuali ada alasan teknis dan SEO yang terdokumentasi.
8. Jangan memasang aturan migrasi pada domain production sebelum staging dan daftar target lulus pengujian.

## Perbedaan kode status

- **Vercel:** properti `permanent: true` menghasilkan redirect permanen Vercel (308).
- **Nginx production:** gunakan `return 301` untuk migrasi URL permanen.
- Keduanya menyatakan perpindahan permanen kepada crawler. Perbedaan 301/308 tidak boleh menghasilkan perbedaan tujuan atau cakupan mapping.

Jangan menambahkan `vercel.json` berisi aturan kosong atau contoh URL lama sebagai konfigurasi produksi. File konfigurasi baru dibuat ketika ada mapping REDIRECT yang telah disetujui dan targetnya tersedia.

## Alur implementasi

### Tahap A — Audit dan persetujuan mapping

- Periksa konten lama, title, H1, canonical, status HTTP, dan intent setiap URL.
- Cocokkan dengan halaman baru yang sudah ada.
- Isi `old_title`, `old_intent`, `new_url`, `decision`, `reason`, `content_action`, dan status audit.
- Tandai data yang tidak dapat diverifikasi sebagai perlu review; jangan menebak target.
- Gunakan data Google Search Console, analytics, dan backlink untuk menentukan prioritas bila tersedia.

### Tahap B — Generator konfigurasi

Setelah kontrak mapping disepakati, siapkan generator deterministik yang membaca CSV dan menghasilkan:

- `vercel.json` untuk staging.
- Snippet Nginx terpisah untuk production, misalnya `deploy/nginx/redirects.conf`.

Generator wajib gagal (fail closed) bila menemukan:
- URL sumber duplikat.
- Keputusan REDIRECT tanpa target.
- Target eksternal atau target tanpa path yang valid.
- Source sama dengan target.
- Redirect chain/loop di antara aturan yang diekspor.
- Record yang belum ditandai selesai audit tetapi dimasukkan ke ekspor.

Jangan memasukkan seluruh mapping ke konfigurasi runtime. Hanya keputusan REDIRECT yang sudah disetujui yang diekspor.

### Tahap C — Verifikasi staging

Pada domain staging Vercel:
- Uji setiap source dan pastikan status redirect permanen serta Location benar.
- Pastikan target mengembalikan 200, bukan 404/soft-404.
- Uji variasi slash sesuai kebijakan trailing slash Astro.
- Uji query string, URL encoding, dan path yang mengandung karakter khusus.
- Periksa tidak ada redirect loop atau chain.
- Pastikan URL baru memiliki canonical ke dirinya sendiri.

### Tahap D — Production VPS

- Salin snippet Nginx yang sama-sama dihasilkan dari mapping yang sudah diuji.
- Simpan salinan konfigurasi aktif sebelumnya untuk rollback.
- Jalankan `nginx -t` sebelum reload.
- Reload Nginx hanya setelah tes konfigurasi berhasil.
- Uji beberapa URL dari jaringan publik setelah deployment.
- Pantau 404, 3xx, dan landing page melalui log server serta Search Console.

## Pemisahan file dan tanggung jawab

| File/lokasi | Fungsi |
|---|---|
| `docs/MASTER-LEGACY-URL-MAPPING.csv` | Sumber keputusan URL lama → URL baru |
| `docs/AUDIT-LEGACY-URL-MIGRATION.md` | Prosedur audit dan kriteria keputusan |
| `vercel.json` | Output deployment staging, dibuat setelah mapping disetujui |
| `deploy/nginx/redirects.conf` | Output untuk VPS production, dibuat dari mapping yang sama |
| `scripts/generate-redirects.mjs` | Generator dan validasi, dibuat setelah format mapping final |

## Kondisi saat dokumen ini dibuat

- Inventaris berisi 572 URL (136 page dan 436 post).
- Semua record pada master mapping masih berstatus `NOT_REVIEWED`.
- Karena belum ada target yang diverifikasi, belum ada `vercel.json` redirect atau snippet Nginx yang dibuat.
- Halaman lama dan halaman baru yang substansinya belum setara harus diselesaikan kontennya terlebih dahulu. Contohnya halaman profil perusahaan dan kontak: jangan diarahkan sebelum isi penting dari halaman lama dipertahankan di tujuan baru.

## Kriteria selesai

Redirect migration siap production jika:
- Semua URL bernilai SEO/bisnis tinggi sudah diaudit.
- Semua keputusan REDIRECT memiliki target yang disetujui dan hidup.
- Generator menghasilkan kedua konfigurasi dari satu sumber data.
- Automated checks lulus untuk duplikasi, chain, loop, status target, dan konsistensi hasil Vercel/Nginx.
- Uji staging selesai dan hasilnya disetujui sebelum aturan diterapkan di VPS.
