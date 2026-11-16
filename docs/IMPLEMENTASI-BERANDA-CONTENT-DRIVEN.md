# Implementasi Beranda Content-Driven

**Repository:** `arisciwek/pusattraining`  
**Branch kerja:** `content/homepage-frontmatter`  
**Basis:** `main` setelah merge halaman Tentang dan Kontak.

## Tujuan

Memindahkan konfigurasi dan copy utama Beranda dari `src/pages/index.astro` ke Astro Content Collection. Route Beranda hanya mengambil record, menyiapkan data relasional, dan menyerahkannya ke renderer.

## Perubahan

- [x] Membuat record `src/content/pages/home.md` dengan `type: page`, `id`, `ulid`, `pageType`, `slug`, metadata editorial, dan `blocks`.
- [x] Memindahkan copy Hero, pengantar portal, kategori, manfaat, jadwal, dan CTA ke frontmatter.
- [x] Membuat tipe block khusus Beranda di `src/blocks/types.ts`.
- [x] Memperketat schema `pages.blocks` dengan discriminated union untuk block halaman standar dan block Beranda.
- [x] Membuat `HomePageRenderer.astro` untuk merender block berdasarkan `type`.
- [x] Memisahkan pengantar dan CTA Beranda ke komponen tersendiri.
- [x] Mempertahankan komponen visual yang sudah digunakan agar desain tidak berubah hanya karena migrasi konten.
- [x] Kategori tetap berasal dari collection halaman kategori; frontmatter mengatur heading dan batas jumlah kategori.
- [x] Route `src/pages/index.astro` tidak lagi menyimpan copy halaman.
- [ ] Jalankan `npm run check` dan `npm run build` setelah branch di-pull.

## Kontrak block Beranda

| Type | Fungsi | Data dari frontmatter | Data relasional |
|---|---|---|---|
| `home-hero` | Hero utama | Eyebrow, judul, deskripsi, CTA, proof points | — |
| `home-introduction` | Pengantar portal | Eyebrow, judul, deskripsi, CTA | — |
| `home-category-overview` | Navigasi kategori | Heading dan limit | Record kategori dari collection `pages` |
| `home-benefits` | Manfaat portal | Heading dan daftar manfaat | — |
| `home-upcoming-schedule` | Jadwal terdekat | Heading dan URL arsip | Data schedule; saat ini belum ada schedule aktif |
| `home-contact` | CTA penutup | Eyebrow, judul, deskripsi, dua CTA | — |

## Keputusan implementasi

1. Isi yang bersifat editorial dan konfigurasi tampilan disimpan di frontmatter.
2. Data kategori tidak diduplikasi ke `home.md`; kategori tetap menjadi entitas halaman sendiri dan dipanggil berdasarkan collection.
3. Block jadwal tidak menyimpan salinan data batch di frontmatter Beranda. Komponen tetap menampilkan empty state sampai schedule yang memenuhi filter portal tersedia. Integrasi data batch dilakukan dengan kontrak `FRONTMATTER-SCHEDULE-CONTRACT.md`.
4. Tidak membuat statistik, testimoni, angka peserta, atau klaim penyelenggara yang belum memiliki sumber terverifikasi.
5. ID dan ULID halaman Beranda harus dipertahankan ketika copy atau desain diperbarui.
6. Urutan block pada halaman mengikuti urutan array `blocks` di `home.md`.
7. Komponen visual tetap memakai Tailwind dan semantic class yang sudah menjadi pola repository.

## Verifikasi

Belum ada klaim bahwa build berhasil pada branch ini. Catatan build dari `main` tidak dapat menggantikan pemeriksaan branch baru. Setelah pull, jalankan:

```bash
npm run check
npm run build
```

Jika TypeScript atau Astro melaporkan error, perbaiki pada branch ini sebelum merge.
