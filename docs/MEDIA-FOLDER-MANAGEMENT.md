# Mengelola folder foto training dan layanan

Gunakan `scripts/create-media-folders.sh` untuk membuat folder foto berdasarkan slug, tanpa mengubah atau menghapus foto yang sudah ada.

## Lokasi folder
- Foto training: `public/images/training/<TrainingSlug>/`
- Foto layanan: `public/images/service/<serviceSlug>/`

## Penggunaan
Dari root repo:

```bash
chmod +x scripts/create-media-folders.sh

# Slug secara langsung
scripts/create-media-folders.sh --training operator-forklift ahli-k3-umum
scripts/create-media-folders.sh --service riksa-uji-forklift riksa-uji-overhead-crane

# File daftar slug (satu slug per baris, atau CSV dengan slug di kolom pertama)
scripts/create-media-folders.sh --training-file docs/training-slugs.txt
scripts/create-media-folders.sh --service-file docs/service-slugs.txt

# Kedua kategori dalam satu kali jalan
scripts/create-media-folders.sh --training-file docs/training-slugs.txt --service-file docs/service-slugs.txt
```

File daftar slug dapat disimpan di repo atau di luar repo. Path relatif ditafsirkan dari working directory saat menjalankan script; path absolut juga dapat digunakan.

## Format daftar slug
```text
operator-forklift
ahli-k3-umum
operator-overhead-crane
```

Komentar yang diawali `#` dan baris kosong diabaikan. Untuk CSV, script mengambil kolom pertama; header `slug`, `TrainingSlug`, atau `serviceSlug` diabaikan.

Script memvalidasi slug agar tidak menerima path traversal atau karakter path yang tidak diharapkan, dan aman dijalankan berulang kali.
