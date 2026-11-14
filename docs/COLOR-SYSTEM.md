# Pusattraining — Color System

## Arah visual

Palet Pusattraining menggunakan **deep slate sebagai fondasi dan warm amber sebagai aksen merek**. Slate memberi kesan tepercaya dan korporat; amber dipakai secukupnya untuk menandai aksi, navigasi aktif, dan informasi penting. Putih serta slate terang menjaga halaman katalog dan jadwal tetap lapang.

Ini adalah identitas warna Pusattraining sendiri, bukan pengambilan nilai warna dari stylesheet Wahana Totalita. Wahana dipakai sebagai referensi pola visual dan hierarki, bukan sebagai sumber aset atau identitas merek.

## Warna inti

| Peran | Token Tailwind | HEX | Pemakaian |
|---|---|---:|---|
| Ink / teks utama | slate-950 | `#020617` | Heading, teks utama, kontras tertinggi |
| Surface gelap | slate-900 | `#0F172A` | Header gelap, footer, tabel, CTA |
| Teks sekunder | slate-600 | `#475569` | Deskripsi dan isi |
| Teks redup | slate-500 | `#64748B` | Metadata, label sekunder |
| Surface utama | white | `#FFFFFF` | Kartu dan area konten |
| Surface alternatif | slate-50 | `#F8FAFC` | Section selang-seling dan panel |
| Border | slate-200 | `#E2E8F0` | Garis, pemisah, outline kartu |
| Brand accent | amber-400 | `#FBBF24` | CTA primer pada permukaan gelap, highlight |
| Brand hover | amber-300 | `#FCD34D` | Hover CTA primer |
| Brand tint | amber-50 | `#FFFBEB` | Latar aksen ringan |
| Brand text | amber-800 | `#92400E` | Teks pada latar amber terang |
| Brand link | amber-700 | `#B45309` | Link dan penanda pada latar putih |

## Skala brand

| Token | HEX | Penggunaan |
|---|---:|---|
| amber-50 | `#FFFBEB` | Highlight paling ringan |
| amber-100 | `#FEF3C7` | Badge dan nomor langkah |
| amber-200 | `#FDE68A` | Border aksen |
| amber-300 | `#FCD34D` | Hover aksen |
| amber-400 | `#FBBF24` | Aksen utama / CTA |
| amber-500 | `#F59E0B` | Focus ring / aksen kuat |
| amber-600 | `#D97706` | Aksen gelap |
| amber-700 | `#B45309` | Link dan teks aksen |
| amber-800 | `#92400E` | Teks pada amber terang |
| amber-900 | `#78350F` | Teks aksen sangat kuat |

## Warna status

Status tidak boleh menggantikan warna merek. Gunakan hanya untuk menyampaikan keadaan yang bermakna.

| Status | Latar | Teks | Pemakaian |
|---|---|---|---|
| Tersedia / sukses | emerald-100 `#D1FAE5` | emerald-800 `#065F46` | Batch dibuka, berhasil, terverifikasi |
| Terbatas / perhatian | amber-100 `#FEF3C7` | amber-900 `#78350F` | Kuota terbatas, perlu perhatian |
| Peringatan | orange-100 `#FFEDD5` | orange-900 `#7C2D12` | Informasi yang perlu ditindaklanjuti |
| Ditutup / gagal | rose-100 `#FFE4E6` | rose-800 `#9F1239` | Pendaftaran ditutup atau proses gagal |
| Informasi | sky-100 `#E0F2FE` | sky-900 `#0C4A6E` | Catatan informatif |

Jangan mengandalkan warna saja untuk membedakan status. Sertakan label teks atau ikon yang memiliki nama aksesibel.

## Pemetaan komponen

- **Primary button:** amber-400 dengan teks slate-950; hover amber-300.
- **Secondary button:** putih/transparan, border slate-200, teks slate-800.
- **Dark CTA:** slate-950 dengan teks putih; tombol primer amber-400.
- **Heading:** slate-950; body slate-600; metadata slate-500.
- **Card:** putih, border slate-200; hover border amber-300 dan shadow.
- **Active navigation/tab:** amber-500 sebagai garis/indikator, teks slate-950.
- **Table header:** slate-900 dengan teks putih; row selang-seling slate-50.
- **Form focus:** border amber-500 dan ring amber-100.
- **Schedule status:** emerald / amber / rose / slate sesuai keadaan batch.

## Kontras dan aksesibilitas

- Teks normal harus memakai warna gelap di atas surface terang. Hindari teks putih kecil di atas amber-400.
- Untuk teks di atas amber terang gunakan slate-950 atau amber-900.
- Amber-400 adalah warna aksen dan tombol, bukan warna teks kecil di atas putih.
- Focus state harus terlihat jelas dan tidak dihilangkan.
- Informasi status harus tetap terbaca tanpa membedakan warna.
- Foto dokumentasi tidak menjadi bagian dari palet UI; jaga overlay dan teks agar kontras.

## File implementasi

- `src/styles/tokens.css`: skala warna dan semantic CSS custom properties.
- `src/styles/components.css`: kelas komponen Tailwind yang memakai keluarga slate/amber dan warna status.
- Import `tokens.css` sebelum `components.css` pada entry stylesheet global ketika scaffold Astro dibuat.

## Catatan tema gelap

Token surface dan teks untuk `[data-theme="dark"]` sudah disediakan sebagai fondasi, tetapi tema gelap belum diaktifkan pada halaman. Komponen yang ada tetap dirancang untuk tema terang; jangan menambahkan toggle tema sebelum seluruh komponen dan kontrasnya diuji.
