# Migrasi Post Sitemap — Batch 15 (Ordinal 99–102)

Tanggal pengerjaan: 2026-11-17

## Keputusan editorial

Keempat URL lama tidak dipaksakan menjadi salinan persis dari sumber yang tidak dapat diakses. Atas arahan pemilik situs, konten dialihkan menjadi materi editorial baru dengan klasifikasi brosur atau leaflet. Tanggal `pubDate` mengikuti `lastmod` sitemap untuk mempertahankan kronologi arsip; tanggal itu bukan klaim tanggal pelaksanaan kelas.

| Ordinal | Materi baru | Type | pubDate dari sitemap | Service ID |
|---:|---|---|---|---:|
| 99 | Jadwal Training BNSP | `brochure` | 2019-09-30 | — |
| 100 | Mengenal Ahli K3 Kimia | `leaflet` | 2019-08-14 | 4002 |
| 101 | Mengenal Kompetensi Operator Forklift | `leaflet` | 2019-08-15 | 4001 |
| 102 | Mengenal Ahli K3 Pesawat Angkat dan Angkut | `leaflet` | 2019-08-15 | 4002 |

## Perlakuan konten

- Ordinal 99 menjadi brosur informasi pelatihan dan sertifikasi BNSP. Karena detail jadwal lama tidak tersedia, materi hanya menyebut konteks periode akhir September 2019 berdasarkan tanggal sitemap dan tidak mengarang tanggal kelas, biaya, kuota, atau venue.
- Ordinal 100 menjadi leaflet evergreen tentang peran, ruang lingkup, kompetensi, dan batas antara pelatihan, sertifikat, serta penunjukan Ahli K3 Kimia.
- Ordinal 101 menjadi leaflet evergreen tentang kompetensi, risiko operasi, pemeriksaan, dan pelatihan Operator Forklift.
- Ordinal 102 menjadi leaflet evergreen tentang ruang lingkup, risiko, dan tanggung jawab Ahli K3 Pesawat Angkat dan Angkut.

## CTA dan relasi layanan

- Service ID 4002 (`perpanjang-lisensi-k3`) dipakai untuk Ahli K3 Kimia dan Ahli K3 Pesawat Angkat dan Angkut. CTA dibatasi secara eksplisit pada perpanjangan/mutasi SKP atau Lisensi K3, bukan pelatihan awal.
- Service ID 4001 (`perpanjang-sio-forklift`) dipakai untuk Operator Forklift. CTA hanya menawarkan pendampingan perpanjangan SIO/Lisensi K3, bukan pelatihan operator awal.

## Implementasi teknis

- Schema koleksi articles menerima `article`, `brochure`, dan `leaflet`.
- Schema artikel menambahkan `serviceIds` dan blok frontmatter untuk intro, section, catatan jadwal, serta CTA layanan.
- Route `/artikel/[slug]/` menampilkan materi dan menghubungkan CTA berdasarkan numeric service ID.
- Semua materi disimpan di frontmatter Markdown; tidak ada body Markdown biasa.

## File utama

- `src/content.config.ts`
- `src/pages/artikel/[slug].astro`
- `src/content/articles/jadwal-training-bnsp.md`
- `src/content/articles/ahli-k3-kimia-leaflet.md`
- `src/content/articles/operator-forklift-leaflet.md`
- `src/content/articles/ahli-k3-pesawat-angkat-angkut-leaflet.md`
- `docs/LEGACY-POST-AUDIT-QUEUE.csv`
- `docs/MASTER-LEGACY-URL-MAPPING.csv`

Build belum diklaim berhasil; perubahan perlu diverifikasi melalui build setelah PR diperiksa.
