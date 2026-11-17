# Rekonsiliasi Post Sitemap — Batch 11 (Ordinal 83–86)

Tanggal audit: 2026-11-17

## Hasil

Keempat URL ditandai `WAITING_SOURCE` / `HOLD_SOURCE_CONTENT`. Sumber asli tidak dapat diakses melalui crawler dan pencarian tidak menemukan salinan yang dapat diverifikasi. Keputusan migrasi tidak ditetapkan dari slug saja.

| Ordinal | URL lama | Petunjuk awal dari slug | Keputusan |
|---:|---|---|---|
| 83 | /ahli-k3-listrik-18-mar-06-apr-2019-siap-jalan/ | Batch Ahli K3 Listrik, Maret–April 2019 | HOLD_SOURCE_CONTENT |
| 84 | /operator-rigger-juru-ikat-20-22-maret-2019-siap-jalan/ | Batch Operator Rigger/Juru Ikat, 20–22 Maret 2019 | HOLD_SOURCE_CONTENT |
| 85 | /pelatihan-operator-boiler-kelas-2-18-21-maret-2019-siap-jalan/ | Batch Operator Boiler kelas 2, 18–21 Maret 2019 | HOLD_SOURCE_CONTENT |
| 86 | /pelatihan-operator-boiler-kelas-1-18-23-maret-siap-jalan/ | Batch Operator Boiler kelas 1, 18–23 Maret (tahun tidak tertulis di slug) | HOLD_SOURCE_CONTENT |

## Upaya verifikasi

- Membuka empat URL post secara langsung melalui crawler web.
- Mencoba endpoint WordPress REST API berdasarkan slug untuk setiap post.
- Mencari exact slug/URL melalui mesin pencari.

Seluruh upaya belum menghasilkan isi post atau salinan yang dapat diverifikasi. Pencarian umum tentang topik pelatihan tidak dianggap sebagai bukti isi post Pusattraining.

## Keputusan migrasi

- Tidak membuat schedule record: istilah "siap jalan" dan slug bertanggal bukan bukti bahwa batch benar-benar terlaksana.
- Tidak membuat halaman training baru atau menyimpulkan isi materi dari halaman training yang sekarang.
- Tidak menetapkan target URL baru maupun redirect.
- Memperbarui audit queue dan master mapping menjadi `WAITING_SOURCE`.
- Audit dapat dibuka kembali jika URL asli atau salinan arsip yang dapat diverifikasi tersedia.

Redirect tetap menunggu seluruh post selesai diaudit.
