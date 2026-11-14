# Kontrak Frontmatter Schedule — Pusattraining

> **Status: kontrak acuan untuk implementasi Pusattraining.**
> Dokumen ini dikunci sebelum pembuatan collection, contoh data, route, dan komponen schedule.
> Berlaku untuk integrasi Pusattraining, Damkar, Confinedspace, dan sumber data bersama.
>
> **Aturan perubahan:** jangan mengganti nama field, tipe, enum, atau makna field secara sepihak di tengah implementasi. Perubahan kontrak harus dibahas dan dicatat di dokumen ini terlebih dahulu, lalu diterapkan serentak pada seluruh consumer yang terdampak.

## 1. Keputusan utama

Pusattraining **tidak membuat skema schedule sendiri**. Kontrak mengikuti arsitektur schedule bersama yang telah didokumentasikan pada repository Damkar, khususnya bagian *Kontrak frontmatter schedule bersama* dan addendum sumber data terpusat.

Satu file Markdown mewakili satu penyelenggaraan/angkatan. Program induk disimpan terpisah pada collection `trainings`; schedule mengacu kepadanya melalui `trainingId`.

Nama collection dan direktori kanonis:

- `trainings`
- `schedules` (plural, bukan `schedule`)

Struktur sumber yang dituju:

```text
src/content/
├── trainings/
│   └── <training-slug>.md
└── schedules/
    └── <YYYY>/
        └── <training-slug>/
            └── <schedule-slug>.md
```

Folder tahun berasal dari tahun `startDate`. Folder training mengikuti slug/identitas master training. Nama file adalah slug schedule. Path file bukan primary key dan bukan penentu URL.

## 2. Kontrak frontmatter kanonis

Berikut bentuk lengkap frontmatter schedule. Field opsional boleh tidak ditulis jika belum memiliki nilai, tetapi **nama dan maknanya tetap menjadi bagian kontrak bersama**.

```yaml
---
type: schedule

# Identitas dan relasi
scheduleId: damkar_01M7C6X149Y76P9DM0BDKA0RDG
publisherId: damkar
trainingId: kelas-a
batchNo: '11'
slug: november-2026-kelas-a-gelombang-11

# Informasi schedule
title: Jadwal Pelatihan Damkar Kelas A — 16–23 November 2026
description: Informasi penyelenggaraan dan pendaftaran Damkar Kelas A gelombang 11.

# Tanggal pelaksanaan
startDate: '2026-11-16'
endDate: '2026-11-23'
dateLabel: 16–23 November 2026
timezone: Asia/Jakarta

# Metadata editorial
pubDate: '2026-11-12T20:16:10Z'
updatedDate: '2026-11-12T22:04:28Z'
draft: false

# Lifecycle penyelenggaraan
status: scheduled

# Pendaftaran
registration:
  status: open
  deadline: '2026-11-09'
  capacity: 20

# Metode pelaksanaan
delivery:
  mode: offline
  attendanceMode: offline

# Lokasi pelaksanaan
venue:
  name: Nama tempat pelatihan
  address: Alamat lengkap
  city: Jakarta
  province: DKI Jakarta
  countryCode: ID

# Data setelah pelatihan; tidak perlu ditulis sebelum tersedia
completion:
  completedDate: '2026-11-23'
  participants:
    - name: Nama peserta (hanya jika disetujui untuk dipublikasikan)
      certificateNumber: NOMOR-SERTIFIKAT
  gallery:
    - src: /images/schedules/contoh/foto-01.webp
      alt: Peserta mengikuti pelatihan
      caption: Dokumentasi kegiatan pelatihan

# Pengaturan distribusi dan copy per situs; opsional
sites:
  main:
    enabled: true
    title: Jadwal Pelatihan Damkar Kelas A — November 2026
    description: Jadwal pelatihan dari penyelenggara Damkar.
    ctaLabel: Lihat Jadwal
    registrationUrl: https://example.com/pendaftaran/
  damkar:
    enabled: true
  confinedspace:
    enabled: false
---
```

Contoh di atas menunjukkan bentuk field, bukan data pelatihan aktual. Nilai identitas, tanggal, kapasitas, URL, peserta, dan lokasi harus berasal dari sumber yang benar.

## 3. Kamus field dan tipe data

| Field | Tipe | Wajib | Aturan |
|---|---|---:|---|
| `type` | literal `schedule` | Ya | Selalu bernilai `schedule`. |
| `scheduleId` | string | Ya | ID global dan stabil untuk satu penyelenggaraan; tidak berasal dari tanggal/judul/slug. |
| `publisherId` | string/enum ID situs | Ya | Penerbit atau penyelenggara asal, mis. `damkar`, `confinedspace`. Bukan daftar situs distribusi. |
| `trainingId` | string | Ya | Relasi ke `trainingId` pada master `trainings`. |
| `batchNo` | string | Ya | Nomor angkatan/gelombang; simpan sebagai string agar format seperti `01` tetap terjaga. |
| `slug` | string | Ya | Slug URL schedule pada situs terkait; bukan primary key. |
| `title` | string | Ya | Judul default schedule. |
| `description` | string | Ya | Deskripsi schedule. |
| `startDate` | string tanggal/ISO 8601 | Ya | Tanggal/waktu mulai pelaksanaan. |
| `endDate` | string tanggal/ISO 8601 | Ya | Tanggal/waktu selesai pelaksanaan. |
| `dateLabel` | string | Ya | Label tanggal untuk tampilan; bukan sumber kalkulasi. |
| `timezone` | string IANA | Ya | Zona waktu, default `Asia/Jakarta`. |
| `pubDate` | ISO 8601 datetime | Ya | Waktu publikasi record, wajib dengan zona waktu. |
| `updatedDate` | ISO 8601 datetime | Ya | Pembaruan editorial terakhir, wajib dengan zona waktu dan tidak boleh lebih awal dari `pubDate`. |
| `draft` | boolean | Ya | Default `false`. |
| `status` | enum | Ya | `scheduled`, `ongoing`, `completed`, `postponed`, `cancelled`. |
| `registration` | object | Tidak | Informasi pendaftaran yang terpisah dari lifecycle schedule. |
| `registration.status` | enum | Jika object ada | `not-open`, `open`, `closed`. |
| `registration.deadline` | string tanggal/ISO 8601 | Tidak | Batas pendaftaran bila tersedia. |
| `registration.capacity` | integer positif | Tidak | Kapasitas peserta bila tersedia. |
| `delivery` | object | Tidak | Metode pelaksanaan. |
| `delivery.mode` | enum | Jika object ada | `offline`, `online`, `blended`. |
| `delivery.attendanceMode` | enum | Jika object ada | `offline`, `online`, `mixed`. |
| `venue` | object | Tidak | Lokasi fisik pelaksanaan. |
| `venue.name` | string | Jika object ada | Nama tempat. |
| `venue.address` | string | Tidak | Alamat. |
| `venue.city` | string | Tidak | Kota/kabupaten. |
| `venue.province` | string | Tidak | Provinsi. |
| `venue.countryCode` | string 2 karakter | Tidak | Kode negara ISO 3166-1 alpha-2; default `ID`. |
| `completion` | object | Tidak | Data pascapelatihan; tidak ditulis sebelum tersedia. |
| `completion.completedDate` | string tanggal | Tidak | Tanggal selesai aktual bila perlu dicatat. |
| `completion.participants` | array object | Tidak | Data peserta yang boleh dipublikasikan. |
| `completion.participants[].name` | string | Ya jika item ada | Nama peserta sesuai persetujuan publikasi. |
| `completion.participants[].certificateNumber` | string | Tidak | Nomor sertifikat jika boleh dipublikasikan. |
| `completion.gallery` | array object | Tidak | Dokumentasi pascapelatihan. |
| `completion.gallery[].src` | string | Ya jika item ada | Path gambar. |
| `completion.gallery[].alt` | string | Ya jika item ada | Teks alternatif gambar. |
| `completion.gallery[].caption` | string | Tidak | Keterangan gambar. |
| `sites` | object | Tidak | Override presentasi/distribusi per situs; bukan untuk mengubah fakta operasional. |
| `sites.<siteId>.enabled` | boolean | Ya jika site entry ada | Apakah record ditampilkan di situs tersebut. |
| `sites.<siteId>.title` | string | Tidak | Override judul; fallback ke root `title`. |
| `sites.<siteId>.description` | string | Tidak | Override deskripsi; fallback ke root `description`. |
| `sites.<siteId>.ctaLabel` | string | Tidak | Label CTA khusus situs. |
| `sites.<siteId>.registrationUrl` | URL | Tidak | URL pendaftaran khusus situs; tidak boleh ditebak. |

### Enum dan validasi

- `status` dan `registration.status` adalah dua hal berbeda. Jangan menggabungkannya.
- `startDate` dan `endDate` harus menggunakan ISO 8601. Format date-only `YYYY-MM-DD` boleh bila jam memang tidak ditetapkan. Jika berupa datetime, sertakan offset atau `Z`.
- `endDate` tidak boleh lebih awal dari `startDate`.
- `updatedDate` tidak boleh lebih awal dari `pubDate`.
- `dateLabel` tidak boleh dipakai untuk menghitung bulan arsip, tanggal Event, atau JSON-LD.
- `sites.<siteId>` hanya boleh mengubah copy/CTA/URL distribusi. Jangan menaruh tanggal, status, lokasi, kapasitas, atau fakta penyelenggaraan berbeda di override situs.
- Validasi relasi `trainingId` harus memastikan master training tersedia.
- `scheduleId` harus unik lintas sumber; `publisherId` harus berasal dari daftar ID situs yang disepakati.

## 4. Pemisahan tanggal: jangan pernah tertukar

| Tujuan | Field sumber |
|---|---|
| Tanggal mulai event / JSON-LD `startDate` | `startDate` |
| Tanggal akhir event / JSON-LD `endDate` | `endDate` |
| Label tanggal manusia | `dateLabel` |
| Waktu publikasi / sitemap `lastmod` awal | `pubDate` |
| Waktu perubahan konten / sitemap `lastmod` terbaru | `updatedDate` |

Setelah pelatihan selesai, penambahan status, peserta, nomor sertifikat, atau galeri **tidak mengubah** `startDate` dan `endDate`. Perubahan konten bermakna memperbarui `updatedDate`.

## 5. Relasi master training

File schedule bukan tempat menyimpan ulang seluruh informasi program. Data program berada di `src/content/trainings/<training-slug>.md` dan memiliki `trainingId` stabil.

Ketentuan:

- Satu training dapat memiliki banyak schedule.
- Setiap schedule harus mengacu ke satu `trainingId` yang valid.
- `trainingId` yang sama harus digunakan di semua situs untuk program yang benar-benar sama.
- Program yang sekilas mirip tetapi berbeda jenjang/definisi tidak boleh dipaksa memakai ID yang sama.
- Nama atau SEO title boleh berubah; `trainingId` tidak berubah.

## 6. Identitas penerbit dan distribusi

- `publisherId` menyatakan asal/pemilik penyelenggaraan.
- `sites` menyatakan ke situs mana schedule didistribusikan.
- Satu schedule mempunyai satu `publisherId`, tetapi dapat aktif pada lebih dari satu situs melalui `sites`.
- Portal Pusattraining mengagregasi semua schedule dengan `sites.main.enabled: true`.
- Situs khusus memfilter sesuai publisher dan flag situs masing-masing.
- Root fields adalah nilai default. Override situs hanya untuk copy/CTA/URL yang memang perlu berbeda.

## 7. Perbedaan implementasi yang ditemukan saat audit

Audit kode saat penulisan dokumen ini menunjukkan **implementasi saat ini belum identik**, walaupun ada rencana kontrak bersama.

| Area | Damkar (main) | Confinedspace (main) | Target bersama |
|---|---|---|---|
| Collection | `schedules` | `schedule` | `schedules` |
| Identity | `scheduleId`, `publisherId`, `trainingId` | `id`, `ulid`; belum ada tiga field identitas bersama | Gunakan tiga field identitas bersama |
| Batch | `batchNo` | `batchNo` | `batchNo` |
| Dates | `startDate`, `endDate`, `dateLabel`, `timezone` | `startDate`, `endDate`, `dateLabel`; belum ada `timezone` | Nama dan tipe disamakan |
| Delivery | `delivery.mode`, `delivery.attendanceMode` | `mode`, `attendanceMode` di root | Gunakan object `delivery` |
| Venue | object `venue` | string `venue` | Gunakan object `venue` |
| Lifecycle | `status` | belum ada | Tambahkan `status` |
| Registration | object `registration` | belum ada | Object `registration` |
| Completion | object `completion` | belum ada | Object `completion` |
| Editorial dates | `pubDate`, `updatedDate` | `pubDate`, `updatedDate` | Sama |
| Distribution override | belum ada di schema aktif | belum ada di schema aktif | Tambahkan `sites` sesuai kontrak sumber terpusat |

### Migrasi field lama Confinedspace

Field lama tidak boleh dipertahankan sebagai variasi kedua dalam kontrak baru. Saat migrasi, gunakan pemetaan:

| Field lama Confinedspace | Field kanonis |
|---|---|
| `id`, `ulid` | Tidak menggantikan identitas global; buat/isi `scheduleId` |
| — | Isi `publisherId: confinedspace` |
| — | Isi `trainingId` sesuai master training |
| `mode` | `delivery.mode` |
| `attendanceMode` | `delivery.attendanceMode` |
| `venue` string | `venue.name`; lengkapi properti venue lain jika datanya tersedia |
| `seoTitle` | Bukan field kontrak inti schedule; pengaturan SEO halaman dikelola situs/route |
| `keywords` | Bukan field kontrak inti schedule; kelola pada lapisan SEO situs bila benar-benar diperlukan |
| `canonical`, `noindex` | Metadata route/SEO situs, bukan fakta schedule kanonis |

Jangan menghapus atau mengubah data lama sebelum proses migrasi dan pemetaan diuji. Tabel ini adalah panduan konversi, bukan instruksi untuk langsung memodifikasi repository Confinedspace.

## 8. URL dan penyajian tidak mengubah frontmatter

Satu record schedule dapat disajikan dengan pola URL berbeda tanpa menggandakan atau mengganti field sumber:

- Pusattraining: `/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/`
- Confinedspace: `/jadwal/<schedule-slug>/` (pola lokal yang telah digunakan).
- Damkar: mengikuti route lokal Damkar yang berlaku; arsip bulanan seperti `/jadwal/2026-11/` tetap dipertahankan.

Bulan portal diturunkan dari `startDate` menggunakan `timezone`, bukan dari `pubDate` atau `updatedDate`. Kartu pada arsip bulanan harus menaut ke entitas detail schedule.

## 9. Aturan implementasi agar tidak berubah di tengah jalan

Sebelum implementasi schedule dimulai:

1. Gunakan dokumen ini sebagai sumber acuan tunggal untuk frontmatter Pusattraining.
2. Buat schema Astro/Zod dari tabel kontrak ini; jangan mendesain ulang field saat menulis schema.
3. Buat fixture schedule yang mencakup kondisi scheduled, ongoing, completed, postponed, dan cancelled.
4. Uji field opsional: tanpa venue, tanpa registration, tanpa completion, serta dengan override sites.
5. Pastikan komponen dan route membaca struktur kanonis yang sama.
6. Jika ada kebutuhan field baru, dokumentasikan alasan, tipe, default, dampak lintas situs, dan migrasinya sebelum mengubah schema.
7. Jangan menambahkan alias seperti `mode` root bersamaan dengan `delivery.mode`, `venue` string bersamaan dengan object venue, atau `id/ulid` sebagai pengganti `scheduleId`.
8. Jangan mengubah kontrak hanya untuk mempermudah satu komponen atau satu halaman.

## 10. Checklist penerimaan

- [ ] Collection bernama `schedules`.
- [ ] Struktur folder `schedules/<YYYY>/<training-slug>/<schedule-slug>.md`.
- [ ] Field identitas `scheduleId`, `publisherId`, `trainingId` tersedia.
- [ ] Field `batchNo`, `slug`, `title`, `description` konsisten.
- [ ] Field tanggal `startDate`, `endDate`, `dateLabel`, `timezone` konsisten.
- [ ] Field editorial `pubDate`, `updatedDate`, `draft` konsisten.
- [ ] `status`, `registration`, `delivery`, `venue`, `completion` mengikuti kontrak.
- [ ] Distribusi per situs menggunakan `sites`, bukan field alternatif.
- [ ] Schema Zod memvalidasi enum, tanggal, relasi, dan ID.
- [ ] Penambahan completion tidak mengubah tanggal event.
- [ ] Route portal memakai `startDate` + `timezone` untuk bulan URL.
- [ ] Tidak ada alias field lama di schema baru.
- [ ] Perbedaan implementasi Damkar/Confinedspace dicatat dan dimigrasikan terencana, bukan ditutupi dengan dua bentuk schema.
