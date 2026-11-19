# Mengelola folder foto training, layanan, dan schedule

Gunakan `scripts/create-media-folders.sh` untuk membuat direktori foto berdasarkan slug. Script tidak menghapus atau mengubah file foto yang sudah ada.

## Struktur
- Training: `public/images/training/<TrainingSlug>/`
- Service: `public/images/service/<serviceSlug>/`
- Schedule/batch: `public/images/schedule/<scheduleSlug>/`

## Penggunaan

Dari root repo:

```bash
chmod +x scripts/create-media-folders.sh

scripts/create-media-folders.sh --training operator-forklift ahli-k3-umum
scripts/create-media-folders.sh --service riksa-uji-forklift riksa-uji-overhead-crane
scripts/create-media-folders.sh --schedule slug-jadwal-1 slug-jadwal-2

# File daftar slug: satu slug per baris (CSV kolom pertama juga diterima)
scripts/create-media-folders.sh --training-file docs/training-slugs.txt
scripts/create-media-folders.sh --service-file docs/service-slugs.txt
scripts/create-media-folders.sh --schedule-file docs/schedule-slugs.txt

# Sekaligus
scripts/create-media-folders.sh --training-file docs/training-slugs.txt --service-file docs/service-slugs.txt --schedule-file docs/schedule-slugs.txt
```

Path relatif file daftar ditafsirkan dari working directory saat menjalankan script. Path absolut juga dapat digunakan.

Baris kosong dan komentar `#` diabaikan. Header `slug`, `TrainingSlug`, `serviceSlug`, atau `scheduleSlug` dikenali. Script memvalidasi slug agar tidak menerima path traversal, dan aman dijalankan berulang kali.
