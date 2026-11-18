# Generator Frontmatter Schedule dari Discovery Registry

## Tujuan

Mengubah kandidat dalam `var/schedule-discovery/registry.json` menjadi file Markdown dengan frontmatter yang mengikuti `FRONTMATTER-SCHEDULE-CONTRACT.md`. Generator tidak mengubah `src/content/schedules`; output awal selalu berada di `var/schedule-discovery/frontmatter/` agar bisa diperiksa sebelum dipindahkan.

## Menjalankan

```bash
npm run schedules:generate
npm run test:schedules:generate
```

Opsi CLI:

```bash
node scripts/generate-schedule-frontmatter.mjs --registry=var/schedule-discovery/registry.json --mapping=config/schedule-training-mappings.json --output=var/schedule-discovery/frontmatter
```

## Pencocokan master training

Aturan berada di `config/schedule-training-mappings.json`. Setiap aturan memetakan pola regex pada gabungan `sourceSlug` dan `title` ke `trainingSlug`. Hasil hanya diterima jika tepat satu aturan cocok dan master training dengan ID tersebut benar-benar ada di `src/content/trainings`.

- Tidak ada aturan cocok: kandidat masuk laporan review.
- Lebih dari satu aturan cocok: kandidat masuk laporan review.
- trainingSlug tidak ditemukan: kandidat masuk laporan review.
- Jangan membuat mapping luas yang berpotensi mencocokkan dua program berbeda.

## Data yang dihasilkan

- `scheduleId`: deterministik dari publisher dan URL sumber.
- `id`: angka positif dari hash URL; collision diperiksa terhadap schedule yang sudah ada.
- `ulid`: ULID deterministik dari tanggal mulai dan hash URL.
- `trainingSlug`: hanya dari mapping yang terverifikasi terhadap master.
- `batchNo`: nomor urut dua digit berdasarkan training dan urutan tanggal dalam satu registry. Periksa ulang bila registry tidak memuat semua batch historis.
- `slug`: slug sumber yang dinormalisasi.
- `title`, `dateLabel`, tanggal, timezone: hasil discovery.
- `description`: deskripsi kerja yang dihasilkan; perlu review editorial.
- `pubDate` dan `updatedDate`: waktu generator dijalankan, bukan tanggal dari sitemap.
- `draft: true`, `status: scheduled`, `sites.main.enabled: false`: nilai provisional untuk draft yang belum boleh dipublikasikan.

Generator tidak membuat nilai registration, delivery, venue, completion, atau URL pendaftaran.

## Output dan review

Output mengikuti struktur:

```text
var/schedule-discovery/frontmatter/<tahun>/<training-slug>/<schedule-slug>.md
var/schedule-discovery/generation-report.json
```

File tidak pernah ditimpa. Jika nama output sudah ada, generator berhenti agar tidak menghilangkan hasil review sebelumnya. Laporan memuat kandidat yang berhasil dibuat dan kandidat yang perlu pemetaan/review.

Sebelum memindahkan draft ke `src/content/schedules/<tahun>/<training-slug>/`:

1. periksa judul terhadap halaman sumber;
2. periksa tanggal mulai/selesai;
3. pastikan mapping training benar;
4. pastikan batchNo tidak bentrok dengan data historis;
5. revisi deskripsi;
6. verifikasi status lifecycle; `scheduled` pada generator hanya nilai sementara karena schema mewajibkan enum;
7. pertahankan `draft: true` sampai fakta dan halaman detail siap ditinjau.

Jangan menyalin kandidat review ke collection content.
