# Kontrak Konten Artikel dan Brosur

> **Status: keputusan editorial dan arsitektur konten untuk migrasi.**
> Dokumen ini menjadi acuan saat memetakan konten situs lama ke collection artikel, brosur, training, dan schedule di Pusattraining.

## 1. Prinsip pemisahan

Artikel dan brosur bukan dua variasi tampilan dari konten yang sama. Keduanya memiliki tujuan, struktur, dan jalur tindakan yang berbeda.

### Artikel — edukasi dan pencarian informasi

Gunakan `type: article` untuk konten editorial yang menjawab pertanyaan, menjelaskan konsep, memberi panduan, atau membantu pembaca memahami suatu topik.

Contoh:
- Apa Itu Ahli K3 Umum?
- Syarat Mengikuti Pelatihan Ahli K3 Kimia
- Tugas dan Tanggung Jawab Ahli K3 Pesawat Angkat Angkut
- Perbedaan SIO dan Sertifikat Kompetensi

Karakteristik:
- Informatif, edukatif, dan kontekstual.
- Pembahasan dikembangkan dengan struktur heading H1, H2, dan H3.
- Dapat memuat tabel, daftar, ilustrasi, referensi, serta tautan internal.
- Mengarahkan pembaca ke artikel lain, halaman training, brosur, atau jadwal yang relevan.
- Fokus utama pada kebutuhan informasi dan jangkauan pencarian organik.

### Brosur — penawaran dan keputusan pendaftaran

Gunakan `type: brochure` untuk halaman penawaran program pelatihan yang membantu calon peserta memahami layanan dan mengambil tindakan.

Contoh:
- Brosur Pelatihan Ahli K3 Umum
- Brosur Pelatihan Ahli K3 Kimia
- Brosur Pelatihan Operator Forklift

Karakteristik:
- Persuasif, ringkas, terstruktur, dan mudah dipindai.
- Hierarki heading tetap wajib: H1 untuk judul program, H2 untuk tiap bagian informasi, dan H3 untuk sub-bagian. Brosur bukan pengecualian dari aturan heading.
- Menonjolkan ringkasan program, manfaat, sasaran peserta, persyaratan, materi, metode, dan informasi penyelenggara.
- Menampilkan jadwal yang relevan jika tersedia.
- Memiliki CTA yang jelas, seperti konsultasi atau pendaftaran.
- Tidak boleh mengarang harga, durasi, persyaratan, sertifikasi, jadwal, atau klaim yang belum terverifikasi.
- Tetap berupa halaman HTML responsif dan dapat diindeks; PDF resmi dapat disediakan sebagai unduhan tambahan, bukan pengganti halaman HTML.

## 2. Perbedaan implementasi

| Aspek | Artikel | Brosur |
|---|---|---|
| Tipe konten | `article` | `brochure` |
| Tujuan utama | Edukasi dan informasi | Penawaran dan konversi |
| Gaya bahasa | Editorial dan informatif | Persuasif dan ringkas |
| Struktur | Narasi dengan H1/H2/H3 | H1/H2/H3 pada bagian informasi program yang mudah dipindai |
| CTA utama | Tautan baca dan eksplorasi | Konsultasi atau pendaftaran |
| Layout | Editorial, nyaman untuk membaca | Landing page penawaran |
| Aside/relasi | Artikel dan konten terkait | Training dan jadwal terkait |
| JSON-LD | `BlogPosting` | `WebPage` |
| Open Graph | `article` | `website` |

Perbedaan schema dan Open Graph di atas adalah aturan implementasi Pusattraining. Schema tidak menggantikan kebutuhan konten yang benar dan tidak boleh dipakai untuk menyatakan informasi yang tidak tampil atau tidak didukung data.

## 3. Struktur halaman yang diharapkan

### Halaman artikel

- Judul, ringkasan, tanggal, dan gambar utama.
- Isi editorial dengan hierarki heading yang benar.
- Daftar isi bila panjang konten membutuhkannya.
- Tautan kontekstual ke training, brosur, jadwal, dan artikel lain.
- Aside atau rekomendasi konten terkait bila relevan.

### Halaman brosur

- Hero penawaran dengan nama program, CTA, dan tepat satu H1.
- Hierarki heading H1/H2/H3 yang benar: H1 judul program, H2 tiap bagian (ringkasan, manfaat, persyaratan, materi, jadwal), H3 sub-bagian di dalamnya.
- Ringkasan program.
- Manfaat atau kompetensi yang dituju.
- Sasaran dan persyaratan peserta.
- Materi atau ruang lingkup.
- Metode pelaksanaan dan informasi penyelenggara bila datanya tersedia.
- Jadwal terkait yang tersedia.
- CTA konsultasi/pendaftaran yang jelas.
- Unduhan PDF hanya jika berkas resmi memang tersedia.

Bagian yang datanya belum tersedia sebaiknya tidak ditampilkan sebagai fakta. Jangan mengisi bagian kosong dengan asumsi atau placeholder yang terlihat seperti informasi aktual.

## 4. Relasi brosur dengan training dan schedule

**Brosur harus memiliki relasi ke master training, bukan menyimpan daftar jadwal sebagai data utama.**

Gunakan `trainingId` sebagai penghubung antara brosur dan master training. Schedule juga sudah memiliki `trainingId` sesuai kontrak `docs/FRONTMATTER-SCHEDULE-CONTRACT.md`.

Alur relasi:

```text
Brochure
  └── trainingId ──> Training
                       └── trainingId <── Schedule A
                                      <── Schedule B
                                      <── Schedule C
```

Konsekuensi implementasi:
- Satu brosur menjelaskan satu program/master training.
- Satu master training dapat memiliki banyak schedule.
- Halaman brosur mengambil daftar schedule dengan mencocokkan `schedule.trainingId === brochure.trainingId`.
- Jadwal ditampilkan secara dinamis dari collection `schedules`, bukan disalin manual ke frontmatter brosur.
- Perubahan tanggal, status, lokasi, kapasitas, atau pendaftaran cukup dilakukan pada record schedule; brosur akan menampilkan data terbaru saat dibangun ulang.
- Brosur tidak perlu memiliki field `scheduleId` tunggal atau array `scheduleIds` sebagai relasi normal. Relasi langsung semacam itu akan membuat brosur cepat usang ketika angkatan baru dibuat atau jadwal lama ditutup.
- Jika suatu konten hanya membahas satu penyelenggaraan/angkatan tertentu, konten tersebut seharusnya direpresentasikan sebagai halaman schedule, bukan brosur program.

### Kontrak field relasi

- Tambahkan/gunakan `trainingId` pada frontmatter brosur.
- Nilainya harus sama persis dengan `trainingId` pada satu record master `trainings`.
- Validasi harus memastikan `trainingId` brosur mengarah ke master training yang tersedia.
- Saat menampilkan jadwal, hanya ambil schedule dengan `trainingId` yang sama dan yang memang boleh ditampilkan pada situs Pusattraining sesuai aturan distribusi schedule.
- Schedule yang berstatus `cancelled` atau `postponed`, pendaftaran tertutup, maupun schedule lampau harus ditampilkan sesuai status faktualnya; jangan dipromosikan sebagai jadwal aktif.
- Jika belum ada master training atau relasi belum dapat dipastikan dari data sumber, jangan menebak ID. Catat sebagai pekerjaan migrasi yang perlu pemetaan.

Contoh frontmatter konseptual:

```yaml
---
type: brochure
title: Brosur Pelatihan Ahli K3 Kimia
description: Informasi program Pelatihan Ahli K3 Kimia dan cara pendaftaran.
trainingId: ahli-k3-kimia
---
```

Contoh di atas hanya menunjukkan pola relasi. Gunakan ID yang benar-benar ada pada master training; jangan menganggap nilai contoh sebagai ID yang sudah terdaftar.

## 5. Alur pengunjung dan tautan internal

Alur yang diharapkan:

1. Pengunjung menemukan artikel melalui pencarian dan memperoleh pemahaman.
2. Artikel mengarahkan pengunjung ke halaman training atau brosur yang sesuai.
3. Brosur menjelaskan penawaran dan menampilkan jadwal yang terkait melalui `trainingId`.
4. Pengunjung membuka detail schedule untuk memeriksa tanggal, lokasi, status, dan pendaftaran.
5. Pengunjung melakukan konsultasi atau pendaftaran melalui CTA yang tersedia.

Jangan mengarahkan semua artikel langsung ke satu jadwal tertentu jika ada beberapa angkatan. Gunakan halaman brosur/training sebagai penghubung program, lalu biarkan pengunjung memilih schedule yang sesuai.

## 6. Aturan migrasi konten lama

Saat migrasi:
1. Klasifikasikan konten berdasarkan tujuan dan substansinya, bukan hanya nama file, panjang konten, atau format desain lama.
2. Konten edukasi, panduan, penjelasan, dan berita program masuk sebagai `article`.
3. Materi penawaran program yang memiliki informasi program dan CTA masuk sebagai `brochure`.
4. Konten yang berisi satu penyelenggaraan/angkatan dengan tanggal dan informasi operasional spesifik harus dipetakan ke collection `schedules` sesuai kontrak schedule, bukan dipaksakan menjadi brosur.
5. Hubungkan brosur ke master training menggunakan `trainingId` yang telah diverifikasi.
6. Jangan menyalin tanggal, venue, status, kapasitas, atau URL pendaftaran schedule ke frontmatter brosur sebagai data duplikat.
7. Jika konten lama mencampur penjelasan edukatif dan penawaran, pisahkan hanya jika masing-masing hasil memiliki tujuan dan isi yang cukup; jangan membuat duplikasi tipis untuk mengejar jumlah halaman.
8. Pertahankan URL lama dan petakan redirect sesuai dokumen arsitektur URL dan strategi redirect.
9. Periksa CTA, tautan internal, metadata SEO, gambar, dan status publikasi setelah migrasi.

## 7. Kriteria penerimaan

- [ ] Artikel dan brosur dibedakan berdasarkan tujuan serta substansi.
- [ ] Artikel memakai pola editorial dan CTA eksplorasi.
- [ ] Brosur memakai pola landing page penawaran dan CTA konversi.
- [ ] Brosur memakai hierarki heading H1/H2/H3 yang benar dengan tepat satu H1.
- [ ] Brosur tetap berupa halaman HTML yang dapat diindeks.
- [ ] Brosur terhubung ke master training melalui `trainingId`.
- [ ] Jadwal brosur diambil dinamis dari collection `schedules` berdasarkan `trainingId`.
- [ ] Tidak ada salinan manual data operasional schedule pada frontmatter brosur.
- [ ] Konten untuk satu angkatan tertentu dimodelkan sebagai schedule.
- [ ] Tidak ada informasi program atau jadwal yang dikarang saat migrasi.
- [ ] JSON-LD dan Open Graph mengikuti tipe konten.
