# Rekonsiliasi Post Sitemap — Batch 15 (Ordinal 99–102)

Tanggal audit: 2026-11-17

## Ringkasan keputusan

| Ordinal | URL lama | Indikasi dari slug | Keputusan |
|---:|---|---|---|
| 99 | `/jadwal-trainingsertifikasi-bnsp-terdekat-jakarta-2019/` | Informasi jadwal/training sertifikasi BNSP 2019 | WAITING_SOURCE |
| 100 | `/ahli-k3-kimia-19-31-agustus-2019-siap-jalan/` | Ahli K3 Kimia, indikasi batch 19–31 Agustus 2019 | WAITING_SOURCE |
| 101 | `/operator-forklift-20-22-agustus-2019-siap-jalan/` | Operator Forklift, indikasi batch 20–22 Agustus 2019 | WAITING_SOURCE |
| 102 | `/siap-jalan-ahli-k3-pesawat-angkat-angkut-26-agst-21-sept-2019/` | Ahli K3 Pesawat Angkat dan Angkut, indikasi batch 26 Agustus–21 September 2019 | WAITING_SOURCE |

Keempatnya diberi keputusan `HOLD_SOURCE_CONTENT`. Indikasi topik/tanggal di atas hanya berasal dari slug dan metadata sitemap, bukan hasil verifikasi isi post.

## Upaya verifikasi

Untuk setiap URL, audit mencoba:
1. Membuka URL asli melalui HTTPS.
2. Mengakses WordPress REST API berdasarkan slug.
3. Mencari exact slug/judul dan variasi topik/tanggal.
4. Memeriksa apakah hasil indeks yang ditemukan benar-benar merupakan sumber post 2019, bukan halaman program atau jadwal terkini.

URL langsung dan REST API tidak dapat diakses melalui alat penelusuran. Pencarian exact tidak menemukan salinan post 2019 yang dapat diverifikasi. Untuk ordinal 100–102 ditemukan halaman program Astro terkini dengan topik serupa; ordinal 99 juga menghasilkan halaman jadwal/program terkini. Hasil tersebut bukan bukti isi post lama dan tidak cukup untuk menyimpulkan bahwa post hanya berisi pengumuman batch.

Karena sumber asli belum tersedia, audit tidak mengisi H1, ringkasan isi, persyaratan, lokasi, biaya, materi, atau rincian pelaksanaan yang tidak dapat dibuktikan.

## Tindakan

- Keempat baris queue dan master mapping ditandai `WAITING_SOURCE` / `HOLD_SOURCE_CONTENT`.
- Tidak membuat halaman training baru.
- Tidak membuat schedule record dari indikasi batch 2019.
- Tidak menetapkan target redirect.
- Redirect tetap menunggu seluruh post selesai diaudit.

## File yang diperbarui

- `docs/LEGACY-POST-AUDIT-QUEUE.csv`
- `docs/MASTER-LEGACY-URL-MAPPING.csv`
- `docs/POST-SITEMAP-RECONCILIATION-BATCH-15.md`
