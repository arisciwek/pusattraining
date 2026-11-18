# Arsitektur Halaman Content-Driven — Pusattraining

> **Status: keputusan arsitektur untuk implementasi.** Seluruh halaman yang kontennya dikelola harus bersumber dari Astro Content Collections menggunakan file Markdown (.md), frontmatter terstruktur, dan Markdown body bila diperlukan. File .astro bertugas merender data, bukan menjadi tempat menyimpan copy halaman.
>
> **Aturan perubahan:** jangan mengganti nama field, tipe, enum, atau makna kontrak secara sepihak di tengah implementasi. Perubahan harus dicatat terlebih dahulu dan dampaknya diperiksa pada seluruh collection serta consumer.

## 1. Prinsip utama

Pusattraining menggunakan pendekatan **content-driven**:
- Konten halaman, artikel, program training, dan jadwal disimpan sebagai file Markdown.
- Frontmatter menyimpan identitas, metadata SEO, relasi, dan konfigurasi block.
- Markdown body menyimpan konten editorial panjang atau narasi yang lebih sesuai ditulis sebagai Markdown.
- Astro layouts mengatur kerangka halaman.
- Astro components dan block renderer menyajikan konten berdasarkan data.
- Route mengambil data, menentukan layout, dan membentuk URL; route bukan tempat menulis konten halaman.
- Konten tidak boleh di-hardcode di file .astro jika secara wajar dapat dikelola melalui Markdown/frontmatter.

## 2. Struktur direktori kanonis

Halaman indeks jadwal portal (`/jadwal/`) juga merupakan entri pada collection `pages`, yaitu `src/content/pages/jadwal.md`. Metadata SEO halaman berasal dari frontmatter; block `schedule-index` mengatur copy bagian daftar, arsip, dan empty state. Route Astro hanya mengambil data schedule/training dan merendernya.

Halaman arsip bulanan (`/jadwal/<YYYY-MM>/`) dan detail (`/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/`) dibangkitkan dari collection `schedules`; konten faktual detail berasal dari frontmatter schedule dan relasi ke master training. Keduanya tidak membutuhkan file halaman duplikat per bulan atau per batch.


```text
src/content/
├── pages/
│   ├── home.md
│   ├── tentang-kami.md
│   ├── kontak.md
│   └── layanan/
│       ├── damkar-kelas-a.md
│       └── confined-space.md
├── articles/
│   └── <article-slug>.md
├── trainings/
│   └── <training-slug>.md
└── schedules/
    └── <YYYY>/
        └── <training-slug>/
            └── <schedule-slug>.md
```

Nama direktori collection menggunakan bentuk plural: pages, articles, trainings, dan schedules. Satu file Markdown mewakili satu entitas konten.

## 3. Identitas universal dan relasi

Semua entitas konten yang dapat direlasikan harus memiliki identitas berikut:

| Field | Tipe | Aturan |
|---|---|---|
| id | integer positif | ID internal stabil untuk relasi antarkonten. |
| ulid | string ULID | Identitas global stabil untuk integrasi, sinkronisasi, dan penggabungan data lintas sumber. |
| slug | string | Identitas URL yang dapat berubah; bukan primary key dan bukan target relasi permanen. |

Ketentuan:
- id dan ulid wajib ada pada setiap record pages, articles, trainings, dan schedules.
- Keduanya tidak boleh berubah ketika judul, slug, URL, kategori, atau metadata SEO berubah.
- id tidak boleh duplikat dalam ruang ID portal yang digabungkan. Jika beberapa publisher membuat data secara independen, proses ingest harus mencegah benturan ID; ulid menjadi identitas global untuk deduplikasi lintas sumber.
- ulid tidak boleh dibuat ulang setiap kali build.
- Jangan menggunakan indeks array, urutan file, nama file, atau slug sebagai identitas relasi.
- Referensi relasi menggunakan id dan harus divalidasi agar targetnya tersedia.
- Untuk relasi lintas publisher, gunakan pasangan publisherId + id atau ulid; jangan mengasumsikan ID numerik dari dua publisher pasti berbeda.
- Penghapusan atau penggantian entitas harus memperhitungkan seluruh relasi yang menunjuk kepadanya.

### Hubungan dengan scheduleId

Schedule tetap menggunakan scheduleId sesuai kontrak schedule bersama untuk identitas schedule pada integrasi lintas situs. Field ini **tidak menggantikan** id maupun ulid.
- id: ID internal untuk relasi konten portal.
- ulid: identitas global.
- scheduleId: identitas schedule pada kontrak distribusi/sumber bersama.
- publisherId: publisher asal.
- trainingSlug: relasi ke master training.

Ketiganya memiliki tujuan berbeda dan tidak boleh dipertukarkan.

## 4. Kontrak frontmatter halaman

Contoh minimum:

```yaml
---
type: page
id: 1001
ulid: 01KXXXXX...

slug: tentang-kami
title: Tentang Kami
description: Informasi mengenai penyelenggara pelatihan.

pubDate: '2026-11-16T00:00:00+07:00'
updatedDate: '2026-11-16T00:00:00+07:00'
draft: false

trainingId: 3001

blocks:
  - type: hero
    title: Mengenal Pusat Training
    description: Informasi mengenai layanan pelatihan kami.

  - type: benefits
    title: Mengapa Memilih Kami?
    items:
      - title: Instruktur Berpengalaman
        description: Didukung instruktur dengan pengalaman sesuai bidangnya.

  - type: faq
    title: Pertanyaan Umum
    items:
      - question: Bagaimana cara mendaftar?
        answer: Hubungi tim pendaftaran melalui kanal resmi.
---

Konten Markdown tambahan dapat ditulis di sini bila halaman membutuhkan narasi panjang yang tidak cocok dijadikan block.
```

### Kamus field halaman

| Field | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| type | literal page | Ya | Penanda jenis konten. |
| id | integer positif | Ya | Identitas internal stabil untuk relasi. |
| ulid | ULID string | Ya | Identitas global stabil. |
| slug | string | Ya | Slug URL halaman. |
| title | string | Ya | Judul halaman. |
| description | string | Ya | Deskripsi ringkas untuk metadata dan ringkasan. |
| pubDate | ISO 8601 datetime | Ya | Waktu publikasi dengan zona waktu. |
| updatedDate | ISO 8601 datetime | Ya | Waktu pembaruan konten terakhir dengan zona waktu. |
| draft | boolean | Ya | Status publikasi draft. |
| trainingId | integer | Tidak | Satu id numerik master `trainings`; wajib ditemukan saat build. |
| blocks | array block | Tidak | Susunan section/block halaman yang dirender registry. |

Field SEO tambahan seperti image, canonical, noindex, atau social metadata dapat ditetapkan dalam schema SEO bersama bila dibutuhkan. Jangan membuat variasi metadata tanpa alasan dan dokumentasi.

## 5. Frontmatter dan Markdown body

**Frontmatter** menyimpan identitas (id, ulid, slug), metadata halaman dan SEO, relasi, konfigurasi/urutan block, serta data terstruktur yang perlu divalidasi dan digunakan komponen.

**Markdown body** menyimpan narasi editorial panjang, penjelasan, heading, paragraf, daftar, tabel, dan konten tekstual yang lebih alami ditulis sebagai Markdown. Body bukan tempat menyimpan salinan data terstruktur yang sudah ada di frontmatter.

Tidak semua halaman wajib memiliki Markdown body. Halaman yang seluruh susunannya berupa block boleh hanya memiliki frontmatter. Sebaliknya, konten panjang tidak perlu dipaksa menjadi puluhan block kecil hanya demi menghindari Markdown body. Jangan menyimpan HTML layout atau kode komponen Astro di dalam Markdown.

## 6. Block-driven rendering

Field blocks adalah konfigurasi urutan block. Setiap block memiliki type yang terdaftar di registry dan props yang sesuai dengan schema block tersebut.

```text
Markdown + Frontmatter
        |
        v
Astro Content Collection
        |
        v
Page Route / Page Layout
        |
        +----> Markdown Renderer (jika body tersedia)
        |
        v
BlockRenderer
        |
        v
Block Registry
        |
        v
Reusable Astro Components
        |
        v
HTML
```

Aturan implementasi:
- Setiap type block harus memiliki schema props dan komponen renderer yang jelas.
- Block tidak dikenal harus menghasilkan error validasi/build atau penanganan eksplisit; jangan diam-diam menghilangkannya.
- Urutan array blocks adalah urutan tampilan halaman.
- Komponen tidak boleh mengambil keputusan berdasarkan nama file atau slug halaman tertentu.
- Komponen menerima data melalui props.
- Block boleh menggunakan relasi id untuk mengambil entitas lain, tetapi relasi tersebut harus divalidasi.
- Konten global (misalnya header/footer) tetap dikelola sebagai konfigurasi situs atau komponen bersama, bukan disalin ke setiap halaman.

## 7. Relasi antarkonten

Relasi menggunakan ID stabil, bukan slug. Contoh:

```yaml
trainingId: 3001       # satu id numerik master trainings (pages, trainings, articles, services)
serviceId: 4002        # satu id numerik master services (hanya articles)
```

Keduanya **tunggal** (`optional`, bukan array): satu entitas hanya merujuk satu training dan/atau satu layanan. Pada artikel, `trainingId` lebih diutamakan untuk kalimat footer "menyelenggarakan pelatihan …"; `serviceId` dipakai sebagai fallback "menyediakan layanan …" bila `trainingId` tidak ada. Membuat keduanya array berisiko menghasilkan beberapa klaim sekaligus, sehingga tidak dipakai.

Ketentuan implementasi:
1. Tetapkan ruang ID dan aturan alokasi yang mencegah benturan; `src/lib/validate-content.ts` memaksa keunikan id global di seluruh collection.
2. Validasi bahwa setiap ID yang direferensikan ditemukan — validasi `trainingId`, `serviceId`, dan `categoryIds` berjalan saat build dan menggagalkan build bila ada ID basi.
3. Pastikan target relasi berasal dari collection yang diizinkan untuk jenis relasi tersebut.
4. Untuk relasi lintas publisher, gunakan identitas yang tidak ambigu: publisherId + id, atau ulid.
5. Jangan mengubah relasi otomatis hanya karena slug berubah.
6. Hindari relasi yang menunjuk kembali ke dirinya sendiri kecuali jenis relasinya memang mengizinkan.

Nama yang mudah tertukar, jangan disamakan: **`trainingId`** dan **`serviceId`** pada konten adalah relasi numerik ke id master, sedangkan kunci alami berupa string selalu berakhiran `...Slug` — **`trainingSlug`** pada master `trainings` (dipakai schedule dan routing) dan **`serviceSlug`** pada master `services`. Karena itu nilai string tidak boleh memakai nama `...Id`.

Nama `related` dicadangkan untuk konsep awal **artikel → artikel** dan boleh berupa array (satu artikel dapat merujuk beberapa artikel lain). Konsep ini **belum ditambahkan ke schema** karena belum ada datanya; jangan memakai `related` untuk relasi ke training atau layanan — gunakan `trainingId`/`serviceId` seperti di atas. Jangan mengubah arti field relasi secara diam-diam: `related` historis pernah terisi id training, itulah yang kini diperbaiki dengan memindahkannya ke `trainingId`.

Jika kebutuhan relasi berkembang, gunakan nama field eksplisit yang menamai collection tujuan (misalnya `relatedPages`, `relatedArticles`) agar target collection tidak ambigu.

## 8. Hubungan dengan collection lain

| Collection | File | Identitas wajib | Catatan |
|---|---|---|---|
| pages | Markdown | id, ulid, slug | Memiliki blocks dan dapat memiliki Markdown body. |
| articles | Markdown | id, ulid, slug | Konten editorial; frontmatter menyimpan metadata dan relasi. |
| trainings | Markdown | id, ulid, trainingSlug | Master program; trainingSlug dipakai schedule untuk relasi. |
| schedules | Markdown | id, ulid, scheduleId | Mengikuti FRONTMATTER-SCHEDULE-CONTRACT.md; scheduleId tidak menggantikan identitas universal. |

Setiap collection memiliki schema validasi sendiri. Kesamaan prinsip identitas tidak berarti semua collection harus memiliki seluruh field yang sama.

## 9. SEO, URL, dan metadata

- Metadata SEO berasal dari frontmatter dan/atau konfigurasi SEO route yang terdokumentasi.
- title dan description menjadi fallback dasar metadata halaman.
- URL dibentuk oleh route Astro dan slug, bukan id atau ulid.
- Perubahan URL harus disertai redirect bila URL lama sudah dipublikasikan dan perlu dipertahankan.
- pubDate dan updatedDate adalah metadata editorial, bukan tanggal pelaksanaan training.
- JSON-LD dibentuk dari data terstruktur yang relevan; jangan mengambil fakta dari teks tampilan jika field sumber tersedia.

## 10. Aturan markup dan desain

- Tailwind CSS menjadi satu-satunya utility styling framework.
- Hindari AI slop: utamakan hirarki visual, tipografi, spacing, komposisi, dan variasi layout yang memiliki alasan.
- Gunakan semantic HTML dan semantic class yang konsisten pada elemen penting.
- Komponen shared tidak menyimpan copy halaman tertentu.
- Gunakan link untuk navigasi dan button untuk aksi.
- Pastikan aksesibilitas keyboard, label, heading hierarchy, dan responsive layout.

## 11. Validasi dan acceptance checklist

- [ ] Semua halaman yang dikelola sebagai konten disimpan dalam file Markdown di collection pages.
- [ ] Konten halaman tidak di-hardcode di route atau layout .astro.
- [ ] Setiap page memiliki id, ulid, dan slug.
- [ ] Collection articles, trainings, dan schedules juga mengikuti prinsip identitas universal.
- [ ] scheduleId tetap dipertahankan sebagai identitas khusus schedule dan tidak menggantikan id/ulid.
- [ ] Relasi menggunakan ID stabil dan divalidasi.
- [ ] Relasi lintas publisher tidak mengasumsikan ID numerik selalu unik secara global.
- [ ] Frontmatter memiliki schema Astro/Zod yang ketat.
- [ ] Setiap block type terdaftar dan memiliki schema props.
- [ ] Urutan block mengikuti urutan array frontmatter.
- [ ] Markdown body dapat dirender bila tersedia dan tidak diwajibkan untuk semua halaman.
- [ ] Metadata SEO dibentuk dari field sumber yang konsisten.
- [ ] Perubahan slug tidak merusak relasi.
- [ ] Build gagal dengan pesan jelas jika identitas duplikat, relasi tidak ditemukan, atau block tidak valid.
- [ ] Tidak ada perubahan schema sepihak di tengah implementasi.

## 12. Dokumen terkait

- docs/FRONTMATTER-SCHEDULE-CONTRACT.md: kontrak detail schedule bersama.
- docs/ASTRO-SCAFFOLD.md: struktur dan setup aplikasi Astro.
- docs/COMPONENT-BLOCK-INVENTORY.md: inventaris komponen, block, dan renderer.
- docs/DESIGN-SYSTEM-REFERENCE.md: arah visual dan design system.