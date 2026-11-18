# Sitemap Discovery untuk Schedule

> Status: implementasi tahap discovery. Registry hasil crawl adalah data penemuan dan bukan collection `schedules`.

## Tujuan

Menggunakan sitemap situs sumber untuk menemukan URL yang berpotensi mewakili jadwal/batch pelatihan. Dari URL tersebut, sistem menurunkan nama awal dan tanggal dari slug. Pusattraining kemudian menambahkan identitas dan metadata internal setelah kandidat dicocokkan dengan master training.

Sitemap WordPress lama Pusattraining K3 menggunakan `<loc>` dan `<lastmod>`. Nama/tanggal jadwal tidak selalu tersedia sebagai field XML; implementasi ini mengambil nama dari slug URL dan tanggal dari pola tanggal di slug. `lastmod` hanya dicatat sebagai metadata perubahan sumber, **bukan tanggal pelaksanaan**.

## Alur

```text
Sitemap index
  -> sitemap anak (jika ada)
  -> URL + lastmod
  -> filter host dan path
  -> parse tanggal dari slug
  -> titleize slug
  -> deduplikasi URL
  -> var/schedule-discovery/registry.json
  -> review manusia + pencocokan trainingSlug
  -> pembuatan frontmatter schedules
```

## Menjalankan

```bash
npm run schedules:discover
npm run test:schedules:discover
```

Perintah test menjalankan parser fixture menggunakan `node:test`; discovery sendiri mengambil sitemap live.

Opsi:

```bash
node scripts/discover-schedules.mjs --config=config/schedule-discovery-sources.json --output=var/schedule-discovery/registry.json
```

File registry berada di `var/` dan tidak dimaksudkan untuk di-commit sebagai konten publik.

## Struktur kandidat

Setiap kandidat menyimpan:

- `discoveryId` / `scheduleId`: ID deterministik dari publisher dan URL sumber; stabil selama URL sumber tidak berubah.
- `publisherId`: identitas situs sumber.
- `sourceUrl`, `sourceLastmod`, `sourceSlug`: jejak sumber.
- `title`, `slug`: judul awal dari slug URL dan slug sumber.
- `startDate`, `endDate`, `dateLabel`, `timezone`: tanggal yang diparse dari slug.
- `trainingSlug`, `batchNo`: sengaja `null` sampai dipetakan/diverifikasi.
- `confidence`: menyatakan bahwa title/tanggal hasil inferensi slug, bukan fakta yang sudah diverifikasi.
- `status: needs-review` dan `reviewRequired: true`: mencegah kandidat dianggap jadwal aktif.

## Aturan keselamatan data

1. URL sitemap adalah sumber discovery, bukan sumber kebenaran status jadwal.
2. `lastmod` tidak boleh dipakai sebagai `startDate`, `endDate`, `pubDate`, atau status event.
3. Parser hanya menerima tanggal kalender valid; tanggal ambigu/tidak lengkap tidak menjadi kandidat.
4. Parser tidak membuat asumsi lokasi, mode, kuota, harga, deadline, atau pendaftaran.
5. `trainingSlug` dan `batchNo` tidak ditebak. Kandidat yang belum dipetakan tetap berada di registry.
6. Jangan menyalin registry langsung ke `src/content/schedules`. Tahap generator frontmatter harus memvalidasi relasi ke master training dan menulis record sebagai draft untuk review.
7. Sitemap index dan sitemap anak boleh berubah; URL dideduplikasi sebelum disimpan.
8. Hanya URL dengan host yang sama seperti sitemap sumber yang diproses.

## Batasan parser saat ini

- Tanggal diekstrak dari pola tanggal dalam slug, termasuk `13-25-nopember-2017`, `12-17-feb-2018`, `7-20-mei-2018`, dan `14-nop-10-des-2018`.
- Untuk pola yang tidak cocok, kandidat dilewati; jangan mengisi tanggal dengan `lastmod`.
- Judul adalah title case dari slug setelah bagian tanggal dihapus. Ini label kerja, bukan pengganti pemeriksaan judul/H1 halaman sumber.
- Filter path dapat disesuaikan pada `config/schedule-discovery-sources.json` per publisher.

## Tahap berikutnya

Setelah registry pertama diperiksa, tahap generator perlu:

1. mencocokkan kandidat dengan `trainingSlug` yang sudah ada;
2. meminta review untuk kandidat yang ambigu atau tidak cocok;
3. membuat `scheduleId` final, nomor batch, dan slug kanonis;
4. mengisi nilai kontrak yang dapat diturunkan secara aman;
5. menghasilkan frontmatter dengan `draft: true`;
6. tidak mengaktifkan CTA, lokasi, metode, kapasitas, atau status pendaftaran tanpa bukti.
