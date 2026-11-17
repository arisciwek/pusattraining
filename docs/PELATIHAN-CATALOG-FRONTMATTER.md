# Migrasi halaman katalog /pelatihan/

## Status dan ruang lingkup

Halaman `/pelatihan/` menggunakan content collection untuk konten editorial dan daftar kategori. Route juga menghitung jumlah master program aktif yang terhubung ke setiap kategori.

Ruang lingkup implementasi ini adalah indeks katalog. Halaman kategori dan detail training memiliki route serta renderer masing-masing.

## Sumber konten

File sumber halaman:

`src/content/pages/pelatihan.md`

Frontmatter mengikuti schema collection `pages` di `src/content.config.ts`. Field `blocks` menyimpan urutan dan konfigurasi editorial. Body Markdown sengaja kosong.

## Kontrak blok `training-catalog`

| Properti | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| `type` | literal `training-catalog` | Ya | Memilih renderer katalog. |
| `eyebrow` | string | Tidak | Label kecil di atas judul. |
| `title` | string | Ya | H1 katalog. |
| `description` | string | Ya | Pengantar katalog. |
| `emptyMessage` | string | Tidak | Pesan saat belum ada kategori aktif. |
| `categoryTitle` | string | Ya | Judul section daftar kategori. |
| `categoryDescription` | string | Tidak | Pengantar section daftar kategori. |

Renderer berada di `src/blocks/training/TrainingCatalog.astro`. Komponen meneruskan kategori ke `TrainingCategoryOverview`; komponen visual mendukung properti `count` untuk label jumlah program.

## Alur data dan jumlah program

1. Route `src/pages/pelatihan/index.astro` mengambil entry katalog, kategori aktif, dan master training aktif.
2. Kategori diurutkan berdasarkan judul.
3. Untuk setiap kategori, route menghitung jumlah training yang memiliki ID kategori tersebut di `categoryIds`.
4. Kategori dengan relasi aktif menampilkan label `N program`.
5. Kategori tanpa relasi aktif tetap ditampilkan, dengan label `Segera hadir`. Halaman kategori tidak disembunyikan dan empty state-nya tetap berasal dari frontmatter.
6. `BlockRenderer.astro` memilih `TrainingCatalog.astro` melalui registry.
7. `SiteLayout` menerima title dan description dari frontmatter untuk metadata SEO.

Jumlah program dihitung dari collection, bukan diketik manual. Draft tidak ikut dihitung. Penambahan atau penghapusan relasi program akan otomatis memperbarui label setelah build berikutnya.

## Kondisi katalog saat audit

Katalog saat ini memiliki 14 kategori terbit dan 10 master training terbit. Program tersebar pada kategori berdasarkan `categoryIds`. Kategori tanpa program tetap menjadi bagian taksonomi yang sudah ada, tetapi diberi penanda visual `Segera hadir` agar pengunjung tidak mengira kategori tersebut sudah memiliki daftar program.

Angka di atas merupakan kondisi data saat audit, bukan angka yang ditulis permanen pada halaman.

## Aturan implementasi

- Pertahankan semantic class pada section, header, heading, paragraf, wrapper, link, dan elemen navigasi.
- Styling tetap menggunakan Tailwind CSS v4.
- Jangan menambahkan kategori atau program fiktif.
- Jangan menghitung draft sebagai program yang tersedia.
- Relasi kategori-program menggunakan `categoryIds` dan `id`, bukan pencocokan judul.
- Jangan mengubah skema jadwal atau detail training sebagai bagian dari pekerjaan indeks katalog.

## Verifikasi

Jalankan dari root repository dengan Node.js sesuai `.nvmrc`:

```bash
npm run check
npm run build
```

Periksa hasil:
- Breadcrumb, H1, dan deskripsi katalog berasal dari frontmatter.
- Semua kategori aktif tetap tampil dan menuju `/pelatihan/{slug}/`.
- Label jumlah hanya menghitung master training yang tidak draft.
- Kategori tanpa program menampilkan `Segera hadir`.
- Detail kategori dengan program menampilkan kartu yang sesuai relasi `categoryIds`.
- Empty state kategori tanpa program tetap informatif.
