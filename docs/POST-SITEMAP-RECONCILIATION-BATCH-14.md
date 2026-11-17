# Rekonsiliasi Post Sitemap — Batch 14 (Ordinal 95–98)

Tanggal audit: 2026-11-17

## Ringkasan keputusan

| Ordinal | URL lama | Indikasi dari slug | Keputusan |
|---:|---|---|---|
| 95 | `/siap-jalan-operator-forklift-06-08-agustus-2019/` | Operator Forklift, 6–8 Agustus 2019 | WAITING_SOURCE |
| 96 | `/k3-rigger-juru-ikat-siap-jalan-14-16-agustus-2019/` | K3 Rigger/Juru Ikat, 14–16 Agustus 2019 | WAITING_SOURCE |
| 97 | `/siap-jalan-ahli-k3-umum-19-31-agustus-2019/` | Ahli K3 Umum, 19–31 Agustus 2019 | WAITING_SOURCE |
| 98 | `/ahli-k3-umum-batam-supa-jalan-19-30-agustus-2019/` | Ahli K3 Umum Batam, 19–30 Agustus 2019 | WAITING_SOURCE |

Keempatnya diberi keputusan `HOLD_SOURCE_CONTENT`. Indikasi topik/tanggal di atas hanya berasal dari slug, bukan hasil verifikasi isi post.

## Upaya verifikasi

Untuk setiap URL, audit mencoba:
1. Membuka URL asli melalui HTTPS.
2. Membuka URL melalui HTTP.
3. Mengakses WordPress REST API berdasarkan slug.
4. Mencari kombinasi exact slug/judul, topik, dan tanggal di indeks web.

URL langsung dan REST API tidak dapat diakses melalui alat penelusuran yang tersedia. Pencarian exact tidak menemukan salinan halaman yang dapat diverifikasi. Karena itu, audit tidak mengisi H1, ringkasan isi, lokasi, biaya, persyaratan, materi, atau rincian pelaksanaan yang tidak dapat dibuktikan.

## Mengapa tidak langsung dipetakan ke halaman training yang ada?

Repositori Astro memang sudah memiliki halaman Operator Forklift, Rigger, dan Ahli K3 Umum. Namun keberadaan halaman dengan topik serupa tidak membuktikan bahwa post lama hanya berisi pengumuman batch. Bisa saja sumber lama memuat rincian program, jenjang, persyaratan, atau konteks yang perlu dipertahankan. Untuk ordinal 96, kesamaan kata “rigger/juru ikat” juga tidak cukup untuk menyimpulkan kesetaraan skema.

Dengan demikian, pemetaan ke halaman existing ditunda sampai konten sumber dapat diperiksa.

## Tindakan

- Keempat baris queue dan master mapping ditandai `WAITING_SOURCE` / `HOLD_SOURCE_CONTENT`.
- Tidak membuat halaman training baru.
- Tidak membuat schedule record dari pengumuman batch 2019.
- Tidak menetapkan target redirect.
- Redirect tetap menunggu seluruh post selesai diaudit.

## File yang diperbarui

- `docs/LEGACY-POST-AUDIT-QUEUE.csv`
- `docs/MASTER-LEGACY-URL-MAPPING.csv`
- `docs/POST-SITEMAP-RECONCILIATION-BATCH-14.md`
