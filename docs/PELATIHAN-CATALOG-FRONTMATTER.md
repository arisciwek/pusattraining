# Migrasi halaman katalog /pelatihan/

## Status dan ruang lingkup

Halaman `/pelatihan/` dimigrasikan menjadi halaman content-driven. Pekerjaan ini hanya mencakup halaman indeks katalog dan komponen blok yang dibutuhkan untuk merendernya. Halaman kategori dan detail training tidak termasuk scope migrasi ini.

## Audit implementasi sebelumnya

Sebelum migrasi, `src/pages/pelatihan/index.astro` menyimpan langsung:

- Judul halaman: `Katalog Pelatihan`.
- Meta description.
- Eyebrow, H1, dan paragraf pengantar katalog.
- Pesan empty state.

Route mengambil collection `pages` dengan `pageType: category`, lalu menyusun tautan kategori untuk komponen `TrainingCategoryOverview`. Akibatnya, data kategori sudah berasal dari content collection, tetapi konten editorial dan susunan utama halaman masih tertanam di file route.

## Sumber konten

File sumber halaman:

`src/content/pages/pelatihan.md`

Frontmatter wajib mengikuti schema collection `pages` di `src/content.config.ts`:

| Field | Fungsi |
|---|---|
| `type` | Harus bernilai `page`. |
| `id` | ID numerik positif untuk kebutuhan relasi. |
| `ulid` | ULID 26 karakter sebagai identifier stabil. |
| `pageType` | `standard` untuk halaman katalog ini. |
| `slug` | `pelatihan`, dipakai route untuk menemukan entry. |
| `title` | Judul halaman dan title metadata. |
| `description` | Meta description halaman. |
| `pubDate` | Tanggal publikasi ISO 8601 dengan offset. |
| `updatedDate` | Tanggal pembaruan ISO 8601 dengan offset. |
| `draft` | Mengontrol publikasi entry. |
| `related` | Relasi berbasis ID; kosong jika belum ada relasi. |
| `blocks` | Urutan dan konfigurasi section yang dirender. |

Konten halaman katalog saat ini seluruhnya berada di frontmatter; body Markdown sengaja kosong.

## Kontrak blok `training-catalog`

Blok didefinisikan pada schema collection `pages` dan tipe TypeScript `TrainingCatalogPageBlock`.

| Properti | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| `type` | literal `training-catalog` | Ya | Memilih renderer katalog. |
| `eyebrow` | string | Tidak | Label kecil di atas judul. |
| `title` | string | Ya | H1 katalog. |
| `description` | string | Ya | Pengantar katalog. |
| `emptyMessage` | string | Tidak | Pesan saat belum ada kategori aktif. |
| `categoryTitle` | string | Ya | Judul section daftar kategori. |
| `categoryDescription` | string | Tidak | Pengantar section daftar kategori. |

Renderer: `src/blocks/training/TrainingCatalog.astro`.

Renderer menerima daftar kategori sebagai props, bukan mengambil data sendiri. Daftar kategori berasal dari collection `pages` dengan `pageType: category`, diurutkan berdasarkan judul, dan URL detail kategori dibentuk sebagai `/pelatihan/{slug}/`.

## Alur rendering

1. `src/pages/pelatihan/index.astro` mengambil entry halaman dengan `slug: pelatihan` dan `draft: false`.
2. Route mengambil kategori aktif dari collection `pages`.
3. Route meneruskan `entry.data.blocks` dan kategori ke `BlockRenderer.astro`.
4. `BlockRenderer.astro` memilih komponen melalui `src/blocks/registry.ts`.
5. `TrainingCatalog.astro` merender H1, pengantar, daftar kategori, atau empty state.
6. `SiteLayout` menerima title dan description dari frontmatter untuk metadata SEO; canonical, Open Graph, dan Twitter Card tetap dikelola layout.

Route hanya bertanggung jawab mengambil data, menyiapkan relasi kategori, dan menyusun komponen kerangka halaman. Konten editorial dan urutan blok tidak disimpan di route.

## Aturan implementasi

- Pertahankan seluruh semantic class pada section, header, heading, paragraf, wrapper, link, dan elemen navigasi.
- Styling tetap menggunakan Tailwind CSS v4; jangan menambahkan framework styling lain.
- Pertahankan komponen visual kategori yang sudah digunakan agar karakter desain katalog tidak berubah menjadi layout generik.
- Jangan menambahkan data kategori atau program fiktif.
- Perubahan schema blok harus diselaraskan pada schema Zod, tipe TypeScript, registry, dan dokumentasi.
- Jangan memperluas perubahan ke route kategori atau detail training dalam pekerjaan ini.

## Verifikasi

Jalankan dari root repository dengan Node.js sesuai `.nvmrc`:

```bash
npm run check
npm run build
```

Pastikan halaman `/pelatihan/` tetap menghasilkan breadcrumb, heading katalog, daftar kategori aktif, dan empty state ketika collection kategori kosong. Build harus memvalidasi frontmatter melalui Astro Content Collections.
