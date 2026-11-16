# Migrasi halaman kategori pelatihan ke frontmatter

## Status dan ruang lingkup

Tahap ini memindahkan tampilan halaman kategori pada URL `/pelatihan/{slug}/` ke konfigurasi frontmatter. Pekerjaan ini merupakan lanjutan setelah indeks katalog `/pelatihan/` menjadi content-driven.

Scope:
- 14 entry kategori pada `src/content/pages/categories/`.
- Kontrak block `training-category`.
- Komponen `TrainingCategoryPage.astro`.
- Pemilihan block kategori melalui `BlockRenderer`.
- Branch kategori pada route dinamis `src/pages/pelatihan/[slug].astro`.

Halaman detail master training yang menggunakan slug pada route dinamis yang sama belum dimigrasikan pada tahap ini. Tampilan detail training tetap dipertahankan seperti sebelumnya.

## Audit kondisi sebelum migrasi

Sebelumnya, file kategori hanya menyimpan identitas, slug, title, description, tanggal editorial, dan relasi. Route `[slug].astro` menulis langsung eyebrow, H1, pengantar, heading daftar program, empty state, dan grid kartu program.

Dengan demikian, kategori sudah menjadi data content collection, tetapi susunan dan copy tampilan kategori masih berada di route Astro.

## Sumber konten kategori

Setiap kategori tetap berada di folder:

`src/content/pages/categories/{slug}.md`

Semua entry mempertahankan identitas yang sudah ada:
- `type: page`
- `id` integer positif dan unik
- `ulid` 26 karakter dan unik
- `pageType: category`
- `slug`, `title`, dan `description`
- `pubDate`, `updatedDate`, `draft`, dan `related`

Tahap ini menambahkan konfigurasi `blocks` pada frontmatter. Tidak ada perubahan ID, ULID, slug, atau relasi kategori-program.

## Kontrak block `training-category`

| Properti | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| `type` | literal `training-category` | Ya | Memilih renderer halaman kategori. |
| `eyebrow` | string | Tidak | Label kecil di atas H1. |
| `sectionTitle` | string | Ya | Heading bagian daftar program. |
| `sectionDescription` | string | Tidak | Pengantar daftar program. |
| `emptyMessage` | string | Ya | Pesan jika kategori belum memiliki program aktif. |

Judul utama dan deskripsi halaman berasal dari field top-level `title` dan `description`. Field yang sama juga digunakan untuk metadata SEO melalui `SiteLayout`.

## Alur data dan rendering

1. Route dinamis mengambil halaman kategori dan master training dari Content Collections.
2. Relasi program dihitung dengan mencocokkan `training.categoryIds` terhadap `category.id`.
3. Route menyiapkan data kartu program berupa title, description, dan href.
4. `BlockRenderer.astro` menerima block kategori, title/description halaman, dan data program terkait.
5. Registry memilih `TrainingCategoryPage.astro`.
6. Komponen merender H1, deskripsi, heading section, grid `TrainingGrid`, atau empty state.

Komponen tidak mengambil collection secara langsung. Semua data diterima melalui props. Route tidak lagi menulis copy editorial untuk halaman kategori.

## Daftar kategori yang dikonfigurasi

Seluruh 14 entry kategori telah diberi block `training-category`:
- Ahli K3 dan Manajemen K3
- K3 Konstruksi dan Infrastruktur
- K3 Migas dan Pertambangan
- Kebakaran dan Tanggap Darurat
- Ruang Terbatas dan Gas Berbahaya
- Operator Alat Berat dan Pesawat Angkat
- Pesawat Uap, Bejana Tekan, dan Pesawat Produksi
- K3 Listrik dan Kelistrikan
- Pengelasan dan Rigging
- Higiene Industri dan Kesehatan Kerja
- Lingkungan dan Energi
- P3K dan Kesiapsiagaan Medis
- K3 Kimia dan Risiko Proses
- Program Khusus dan Sertifikasi

Daftar program pada setiap kategori tetap sepenuhnya berasal dari relasi `categoryIds` pada master training. Tidak ada program, jadwal, harga, atau klaim sertifikasi baru yang dibuat dalam migrasi ini.

## Batas arsitektur

- `src/pages/pelatihan/[slug].astro` tetap menjadi satu route dinamis untuk kategori dan detail training karena URL keduanya berada pada pola yang sama.
- Branch kategori kini menggunakan BlockRenderer.
- Branch detail training belum diubah selain penyesuaian struktur kondisional agar dua jenis halaman dapat dirender terpisah.
- Detail training menjadi tahap migrasi berikutnya; jangan mencampur perubahan kontennya ke tahap kategori.
- Schema Zod, tipe TypeScript, registry, komponen, dan dokumentasi harus selalu diperbarui bersama ketika kontrak block berubah.
- Styling tetap menggunakan Tailwind; semantic class pada elemen dipertahankan.

## Verifikasi wajib

Setelah checkout branch:

```bash
npm run check
npm run build
```

Pemeriksaan manual:
- Semua 14 URL kategori tetap dihasilkan.
- H1 dan meta description berasal dari frontmatter.
- Kategori dengan program terkait menampilkan kartu yang benar.
- Kategori tanpa program menampilkan empty state dari frontmatter.
- URL detail training, breadcrumb, dan bagian jadwal pada detail training tidak berubah.
- Tidak ada duplicate `id` atau `ulid`.
