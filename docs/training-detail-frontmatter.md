# Struktur frontmatter halaman detail pelatihan

Halaman detail pelatihan dirender dari collection `trainings`. Susunan section ditentukan oleh urutan block pada frontmatter Markdown, bukan hardcode pada route.

## Urutan section yang disarankan

1. `training-detail-intro` — judul, deskripsi, dan catatan singkat program.
2. `training-summary` — ringkasan fakta utama seperti durasi, metode, skema sertifikasi, atau investasi.
3. `training-cta` — CTA konsultasi cepat atau penawaran perusahaan di area atas.
4. `training-schedule-list` — daftar batch yang terhubung ke entity `schedules`.
5. `training-content-section` — deskripsi program, kurikulum/silabus, persyaratan peserta, dan fasilitas.
6. `training-faq` — pertanyaan yang sering diajukan.
7. `training-cta` — CTA penutup.

Urutan tersebut fleksibel. Tambahkan hanya section yang memiliki informasi terverifikasi untuk program terkait.

## Contoh block

Contoh berikut adalah pola struktur, bukan konten siap publikasi. Ganti teks contoh dengan informasi yang telah dikonfirmasi oleh penyelenggara.

```yaml
blocks:
  - type: training-detail-intro
    eyebrow: PROGRAM PELATIHAN
    noticeTitle: Informasi program
    noticeDescription: Ringkasan singkat dan catatan penting untuk calon peserta.

  - type: training-summary
    id: ringkasan-program
    eyebrow: RINGKASAN PROGRAM
    items:
      - label: Durasi
        value: "[durasi terverifikasi]"
      - label: Metode
        value: "[online / tatap muka / blended]"
      - label: Sertifikasi
        value: "[skema sertifikasi]"
      - label: Investasi
        value: "[biaya terkonfirmasi]"

  - type: training-cta
    eyebrow: KONSULTASI PROGRAM
    title: Konsultasikan kebutuhan pelatihan Anda
    description: Diskusikan jadwal, persyaratan, dan penawaran untuk tim perusahaan.
    actionLabel: Hubungi tim
    actionHref: /kontak/
    secondaryLabel: Lihat jadwal
    secondaryHref: "#jadwal-pelatihan"

  - type: training-schedule-list
    id: jadwal-pelatihan
    eyebrow: BATCH TERSEDIA
    title: Jadwal pelatihan
    allLabel: Semua jadwal
    emptyMessage: Jadwal untuk program ini belum dipublikasikan.

  - type: training-content-section
    id: deskripsi-program
    eyebrow: TENTANG PROGRAM
    title: Deskripsi program
    description: Penjelasan tujuan, ruang lingkup, dan hasil pembelajaran program.
    items: []

  - type: training-content-section
    id: silabus
    eyebrow: KURIKULUM
    title: Materi dan silabus pelatihan
    description: Ringkasan ruang lingkup materi yang telah dikonfirmasi.
    items:
      - title: "[nama materi]"
        description: "[uraian materi]"

  - type: training-content-section
    id: persyaratan-peserta
    eyebrow: PERSYARATAN
    title: Persyaratan peserta
    items:
      - title: "[persyaratan]"
        description: "[keterangan bila diperlukan]"

  - type: training-content-section
    id: fasilitas
    eyebrow: FASILITAS
    title: Fasilitas dan keluaran program
    items:
      - title: "[fasilitas atau dokumen keluaran]"
        description: "[keterangan yang telah diverifikasi]"

  - type: training-faq
    id: faq-pelatihan
    title: Pertanyaan umum
    items:
      - question: "[pertanyaan calon peserta]"
        answer: "[jawaban terverifikasi]"

  - type: training-cta
    eyebrow: LANGKAH BERIKUTNYA
    title: Siap mengikuti pelatihan?
    description: Hubungi tim untuk mengonfirmasi jadwal dan proses pendaftaran.
    actionLabel: Konsultasi program
    actionHref: /kontak/
```

## Perilaku navigasi section

- Navigasi section muncul otomatis setelah intro ketika terdapat lebih dari satu section yang dapat dituju.
- `training-summary`, `training-schedule-list`, `training-content-section`, dan `training-faq` memiliki anchor ID.
- Tetapkan `id` secara eksplisit bila judul section berpotensi sama atau URL anchor perlu dipertahankan.
- FAQ memakai elemen HTML `details/summary`; tidak membutuhkan JavaScript.
- CTA menerima URL internal maupun eksternal. Pastikan URL pendaftaran dan kontak telah diverifikasi.

## Batas data

Jangan menyalin harga, klaim lisensi, persyaratan, kurikulum, atau fasilitas dari halaman pihak lain. Setiap nilai harus diverifikasi berdasarkan dokumen dan informasi penyelenggara untuk program yang sedang diterbitkan.
