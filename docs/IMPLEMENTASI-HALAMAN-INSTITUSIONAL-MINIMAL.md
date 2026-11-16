# Implementasi Halaman Institusional Minimal

**Repository:** `arisciwek/pusattraining`  
**Branch kerja:** `content/institutional-pages-minimal`  
**Basis:** `main` setelah merge audit schedule dan pencatatan hasil build.

## Tujuan

Memindahkan copy halaman institusional dari file Astro ke Astro Content Collections tanpa menunggu seluruh block selesai. Setiap halaman tetap memiliki frontmatter valid; Markdown body digunakan untuk narasi editorial yang belum perlu dijadikan block.

## Cakupan tahap ini

- [x] Membuat record halaman Tentang di `src/content/pages/tentang-kami.md`.
- [x] Membuat record halaman Kontak di `src/content/pages/kontak.md`.
- [x] Menggunakan field wajib page yang sudah ada: `type`, `id`, `ulid`, `pageType`, `slug`, `title`, `description`, `pubDate`, `updatedDate`, dan `draft`.
- [x] Memindahkan narasi kedua halaman ke Markdown body.
- [x] Mengubah route Tentang dan Kontak agar mengambil konten dari collection `pages`.
- [x] Menyediakan rendering untuk `blocks` jika kelak diisi; halaman tetap bekerja ketika array blocks kosong.
- [x] Menambahkan validasi keunikan slug untuk seluruh record halaman.
- [ ] Menjalankan `npm run check` dan `npm run build` pada checkout branch ini.

## Prinsip implementasi

1. Field wajib schema tidak dihilangkan meskipun konten halaman masih minimal.
2. `id` dan `ulid` bersifat stabil; jangan dibuat ulang saat copy atau desain diperbarui.
3. `slug` menentukan URL dan bukan identitas relasi.
4. Markdown body boleh digunakan sebelum block lengkap.
5. Block opsional dirender melalui `BlockRenderer`; jangan membuat type block yang belum memiliki komponen dan schema props.
6. Informasi kontak seperti email dan telepon tidak boleh direkayasa. Halaman Kontak menyatakan kanal resmi menunggu konfirmasi.
7. Perubahan dilakukan pada branch terpisah; jangan mengubah `main`.

## Tahap berikutnya

1. Migrasikan halaman Beranda ke record `home.md`. Ini memerlukan pemetaan komponen homepage ke block type yang memiliki schema dan renderer eksplisit.
2. Setelah Beranda, audit kebutuhan halaman institusional lain berdasarkan sitemap dan keputusan URL.
3. Lengkapi landing kategori dan master program berdasarkan sumber konten lama, bukan asumsi dari slug.
4. Tambahkan jadwal hanya dari data batch faktual dengan kontrak `FRONTMATTER-SCHEDULE-CONTRACT.md`.
5. Artikel dikerjakan setelah halaman inti dan katalog program stabil.

## Status verifikasi

Build pada `main` sebelumnya tercatat berhasil di `docs/hasil-rebuiild.txt` (29 halaman). Itu bukan bukti build branch ini; branch ini tetap harus menjalani `npm run check` dan `npm run build` setelah di-pull.
