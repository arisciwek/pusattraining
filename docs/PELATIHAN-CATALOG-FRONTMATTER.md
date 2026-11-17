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

## Audit implementasi pada main — 17 November 2026

**Baseline audit:** `main` pada commit `3a7a673e4179dd07ccc68e323e40c12b51a53e11`.

### Kesimpulan audit

Migrasi inti halaman `/pelatihan/` sebenarnya sudah berada di `main` sebelum pekerjaan ini dimulai. Karena itu, route dan tampilan yang telah berfungsi tidak ditulis ulang. Perubahan implementasi pada branch audit dibatasi pada penegasan kontrak tipe data turunan agar label jumlah program yang dihitung route tetap dikenali sepanjang rantai renderer.

| Area | Implementasi yang diaudit | Hasil |
|---|---|---|
| Sumber konten | `src/content/pages/pelatihan.md` | Frontmatter menjadi satu-satunya sumber copy editorial dan urutan block; body Markdown kosong. |
| Identitas | `id: 1004`, `ulid: 01KCV000000000000000000018` | Dipertahankan sesuai schema collection `pages`. |
| Schema | `src/content.config.ts` | `type`, `id`, `ulid`, `slug`, `title`, `description`, tanggal editorial, `draft`, dan `blocks` tervalidasi. |
| Route | `src/pages/pelatihan/index.astro` | Mengambil entry halaman, kategori aktif, dan master training aktif; tidak menyimpan copy judul/deskripsi section. |
| Relasi kategori | `categoryIds` terhadap `pages.id` | Jumlah program dihitung dari relasi ID dan tidak memasukkan draft. Kategori kosong tetap tampil sebagai `Segera hadir`. |
| Block | `training-catalog` | Copy H1, pengantar, judul daftar kategori, deskripsi, dan empty state diatur dari frontmatter. |
| Renderer | `BlockRenderer` → `TrainingCatalog` → `TrainingCategoryOverview` | Registry memilih komponen berdasarkan `type`; komponen visual mempertahankan kartu kategori dan label jumlah. |
| SEO | `SiteLayout` | Title, description, canonical, Open Graph, dan Twitter Card dirender dari metadata halaman/layout. Tidak menambahkan gambar sosial tanpa aset sumber yang terverifikasi. |
| Visual dan markup | Block katalog, heading, kategori, breadcrumb, container | Semantic class dipertahankan; styling memakai Tailwind dan design tokens yang sudah ada. |

### Penyesuaian kontrak tipe

Route katalog membentuk properti turunan `count` untuk tiap kategori. Komponen `TrainingCategoryOverview` telah menerima properti tersebut, tetapi tipe perantara di `BlockRenderer.astro` dan `TrainingCatalog.astro` belum mendeklarasikannya. Keduanya kini menyatakan `count?: string` agar kontrak data eksplisit dan konsisten dari route sampai komponen visual. Tidak ada perubahan format frontmatter atau hasil tampilan yang dimaksudkan.

### Batas scope

- Route indeks `/pelatihan/` saja yang diaudit.
- `src/pages/pelatihan/[slug].astro`, halaman kategori, dan halaman detail training tidak diubah.
- Tidak ada kategori, program, harga, jadwal, atau klaim baru yang ditambahkan.
- Tidak ada perubahan pada `main`; semua perubahan berada di branch audit dan menunggu review melalui pull request.

### Status verifikasi lokal

Pemeriksaan statis terhadap file dan kontrak repository selesai. `npm run check` dan `npm run build` belum dapat dijalankan: clone repository gagal karena environment tidak dapat me-resolve `github.com` (`Could not resolve host: github.com`). Node yang tersedia adalah `v22.16.0`, sedangkan `package.json` mensyaratkan `>=22.22.0`. Hasil build karena itu tidak boleh dianggap lulus berdasarkan audit kode saja.

Setelah branch tersedia pada environment dengan akses dependency dan Node sesuai versi repository, jalankan:

```bash
npm run check
npm run build
```
