# Checklist Standar Komponen Halaman Pelatihan

Dokumen ini menjadi standar pemeriksaan untuk **setiap halaman detail pelatihan** di Pusat Training K3. Halaman **Ahli K3 Umum** digunakan sebagai acuan kelengkapan, terutama untuk pola hero, gambar, dan jadwal.

Tujuannya adalah menjaga konsistensi struktur dan pengalaman pengguna. Konsistensi tidak berarti semua pelatihan harus memiliki isi yang identik: komponen yang relevan wajib tersedia, sedangkan data yang memang tidak berlaku harus ditandai dengan jelas dan tidak boleh diisi dengan informasi rekaan.

## 1. Identitas dan data utama

- [ ] Setiap pelatihan memiliki satu record utama pada collection pelatihan.
- [ ] Memiliki `id`/identifier yang stabil dan tidak duplikat.
- [ ] Memiliki `slug` unik dan URL detail yang benar.
- [ ] Memiliki nama/judul resmi yang konsisten di navigasi, kartu, breadcrumb, hero, dan metadata.
- [ ] Memiliki ringkasan/deskripsi singkat yang menjelaskan manfaat dan konteks pelatihan.
- [ ] Memiliki kategori/jenis pelatihan yang benar.
- [ ] Relasi ke jadwal menggunakan identifier pelatihan yang sama (misalnya `trainingSlug`), bukan pencocokan judul.
- [ ] Status publikasi/draft ditetapkan dengan benar.

## 2. Hero pelatihan

- [ ] Hero tampil pada bagian atas halaman detail.
- [ ] Judul utama (H1) menyebut nama pelatihan secara jelas.
- [ ] Terdapat ringkasan yang menjelaskan siapa yang membutuhkan pelatihan dan hasil/manfaat utamanya.
- [ ] Terdapat gambar hero yang relevan dengan pelatihan.
- [ ] Gambar memiliki path/URL valid dan dapat dimuat pada production build.
- [ ] Gambar memiliki teks alternatif (`alt`) yang deskriptif; bukan nama file atau keyword berulang.
- [ ] Rasio, crop, ukuran, dan posisi gambar tetap baik pada desktop maupun mobile.
- [ ] Informasi ringkas yang ditampilkan di hero (contoh: metode, durasi, sertifikasi, atau harga) bersumber dari data pelatihan yang benar.
- [ ] Informasi yang belum tersedia tidak ditampilkan sebagai angka atau klaim asumsi.
- [ ] CTA utama terlihat dan mengarah ke tindakan yang benar (konsultasi/pendaftaran/WhatsApp sesuai konfigurasi situs).
- [ ] CTA memiliki label yang jelas dan dapat digunakan dengan keyboard/perangkat sentuh.

## 3. Jadwal pelatihan

- [ ] Bagian jadwal tersedia pada halaman detail.
- [ ] Jadwal ditarik dari collection/registry jadwal, bukan ditulis ulang secara manual di komponen halaman.
- [ ] Setiap jadwal terhubung ke pelatihan melalui `trainingSlug` yang valid.
- [ ] Nama pelatihan pada jadwal sesuai dengan halaman detail.
- [ ] Tanggal mulai dan tanggal selesai tersedia serta berurutan.
- [ ] Rentang tanggal ditampilkan dengan format yang konsisten dan mudah dibaca.
- [ ] Tahun tidak hilang atau tertukar saat jadwal melintasi pergantian tahun.
- [ ] Zona waktu dan parsing tanggal tidak menyebabkan tanggal bergeser.
- [ ] Metode/lokasi pelaksanaan ditampilkan sesuai data (offline, online, blended, atau format lain yang didukung schema).
- [ ] Status jadwal ditampilkan sesuai kondisi sebenarnya (upcoming, ongoing, completed, cancelled, postponed, atau status schema yang berlaku).
- [ ] Jadwal selesai tidak ditawarkan sebagai jadwal mendatang.
- [ ] Jadwal batal/ditunda tidak tampil seolah-olah tersedia untuk pendaftaran.
- [ ] Urutan jadwal konsisten: jadwal relevan terdekat lebih dahulu.
- [ ] Jika tidak ada jadwal aktif/mendatang, tampilkan empty state yang informatif dan CTA untuk meminta jadwal terbaru.
- [ ] Tidak ada tanggal, harga, kuota, lokasi, atau status yang dibuat berdasarkan asumsi.
- [ ] Untuk pelatihan yang jadwalnya juga muncul di situs/repo lain, data tanggal dan nama kelas disinkronkan dengan sumber yang telah ditetapkan.

## 4. Informasi inti pelatihan

- [ ] Deskripsi lengkap menjelaskan ruang lingkup dan konteks pelatihan.
- [ ] Tujuan pelatihan tersedia.
- [ ] Kompetensi atau hasil belajar yang diharapkan tersedia.
- [ ] Materi/silabus tersedia dan terstruktur.
- [ ] Sasaran peserta tersedia.
- [ ] Persyaratan/prasyarat peserta dijelaskan jika memang berlaku.
- [ ] Durasi atau jumlah jam pelajaran (JP) dicantumkan jika terverifikasi.
- [ ] Metode pelaksanaan dijelaskan (online, offline, blended, teori/praktik, atau kombinasi yang sesuai).
- [ ] Informasi sertifikat/lisensi/pengesahan dijelaskan secara akurat sesuai penyelenggara dan otoritas terkait.
- [ ] Fasilitas atau hal yang termasuk dalam biaya dijelaskan jika tersedia.
- [ ] Harga/biaya hanya ditampilkan jika ada data yang valid dan masih berlaku.
- [ ] Informasi teknis khusus pelatihan (misalnya evaluasi, praktik lapangan, atau dokumen peserta) ditampilkan bila relevan.

## 5. Komponen konversi dan kepercayaan

- [ ] CTA pendaftaran/konsultasi tersedia di area hero.
- [ ] CTA lanjutan tersedia setelah informasi utama atau jadwal.
- [ ] Kontak/kanal pendaftaran konsisten dengan konfigurasi situs.
- [ ] Profil penyelenggara/informasi legal ditampilkan sesuai data yang dapat diverifikasi.
- [ ] Testimoni, logo, foto kegiatan, atau bukti pendukung hanya ditampilkan jika sumbernya valid dan penggunaannya diizinkan.
- [ ] FAQ tersedia untuk pertanyaan yang relevan; jawaban tidak membuat janji yang tidak didukung data.
- [ ] Tautan ke pelatihan terkait tersedia bila ada relasi yang relevan.
- [ ] Tidak ada tombol mati, placeholder, tautan kosong, atau CTA dengan tujuan yang keliru.

## 6. SEO dan struktur halaman

- [ ] Hanya ada satu H1 utama.
- [ ] Struktur heading H2/H3 berurutan dan menggambarkan isi, bukan sekadar styling.
- [ ] Title dan meta description unik serta sesuai isi halaman.
- [ ] Canonical URL mengarah ke URL final yang benar.
- [ ] Open Graph dan Twitter Card menggunakan judul, deskripsi, dan gambar yang sesuai.
- [ ] Gambar sosial memiliki URL absolut yang dapat diakses.
- [ ] Breadcrumb tampil dan setiap item mengarah ke halaman yang benar.
- [ ] Internal link menggunakan URL pelatihan yang benar.
- [ ] Structured data/schema hanya memuat klaim yang benar-benar didukung data.
- [ ] Tidak ada konten duplikat yang disalin antarhalaman tanpa penyesuaian konteks.
- [ ] Halaman masuk sitemap jika statusnya memang publik dan indexable.

## 7. UI, aksesibilitas, dan responsivitas

- [ ] Semua halaman menggunakan kerangka/layout detail pelatihan yang sama.
- [ ] Urutan komponen utama konsisten antarpelatihan.
- [ ] Komponen opsional memiliki aturan tampil/sembunyi yang konsisten.
- [ ] Tidak ada section kosong atau heading tanpa isi.
- [ ] Tidak ada teks mentah, HTML yang tercetak sebagai teks, atau placeholder yang tertinggal.
- [ ] Semua gambar memiliki `alt`; gambar dekoratif menggunakan alt kosong bila tepat.
- [ ] Tombol dan tautan memiliki nama yang jelas.
- [ ] Kontras teks dan latar memadai.
- [ ] Layout tidak overflow pada layar kecil.
- [ ] Jadwal, CTA, kartu, dan gambar tetap terbaca pada mobile.
- [ ] Elemen interaktif dapat diakses dengan keyboard dan memiliki focus state yang terlihat.
- [ ] Setiap elemen HTML menggunakan class semantik yang konsisten sesuai konvensi proyek.

## 8. Validasi teknis sebelum halaman dinyatakan lengkap

- [ ] Frontmatter/data lolos validasi schema Astro.
- [ ] Semua relasi pelatihan-jadwal dapat ditemukan dan tidak orphan.
- [ ] Tidak ada identifier, slug, atau jadwal duplikat.
- [ ] Semua asset gambar tersedia pada path yang benar.
- [ ] Tidak ada import komponen yang hilang.
- [ ] Tidak ada error TypeScript/Astro saat build.
- [ ] `npm run build` berhasil.
- [ ] URL detail hasil build menghasilkan halaman HTML.
- [ ] Halaman diuji pada desktop dan mobile.
- [ ] Semua tautan internal dan CTA diuji.
- [ ] Tampilan hero, gambar, dan jadwal dibandingkan dengan halaman acuan Ahli K3 Umum.
- [ ] Jika jadwal bersumber dari repo/situs lain, lakukan pemeriksaan silang tanggal, nama kelas, metode, dan status sebelum publikasi.

## 9. Matriks audit seluruh pelatihan

Gunakan tabel ini untuk memantau penerapan standar pada semua pelatihan.

| Pelatihan | Hero | Gambar | Jadwal | Informasi inti | CTA | SEO | Mobile | Build | Status audit |
|---|---|---|---|---|---|---|---|---|---|
| Ahli K3 Umum | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit; FAQ diperbaiki |
| Pemadam Kebakaran Kelas A | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Pemadam Kebakaran Kelas B | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Pemadam Kebakaran Kelas C | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Pemadam Kebakaran Kelas D | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Operator Boiler Tingkat 1 | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Operator Boiler Tingkat 2 | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Operator Gondola | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Emergency Response Plan | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit |
| Teknisi K3 Ruang Terbatas (Confined Space) | Ada | Ada | Ada | Ada | Ada | Belum diverifikasi | Belum diuji | Belum diuji | Konten diaudit; FAQ diperbaiki |

Lihat laporan rinci: `docs/AUDIT-KELENGKAPAN-10-TRAINING.md`.

**Catatan status:** "Ada" berarti blok atau data ditemukan di frontmatter; bukan klaim bahwa seluruh tampilan, tautan, SEO, jadwal eksternal, dan build telah lolos pengujian.


## 10. Kriteria selesai (Definition of Done)

Satu halaman pelatihan dinyatakan **lengkap** jika:

1. Semua checklist pada bagian Identitas, Hero, Jadwal, Informasi Inti, SEO, UI, dan Validasi Teknis telah diperiksa.
2. Komponen wajib tersedia dan mengikuti layout standar.
3. Komponen opsional yang tidak relevan disembunyikan dengan benar, bukan dibiarkan kosong.
4. Data penting memiliki sumber yang dapat diverifikasi.
5. Jadwal terhubung ke pelatihan yang tepat dan statusnya akurat.
6. Halaman lolos build dan pemeriksaan tampilan desktop/mobile.
7. Tidak ada placeholder, tautan rusak, atau konten yang tercetak mentah.

**Prinsip utama:** setiap pelatihan memiliki standar komponen dan kualitas yang sama; perbedaan hanya pada data serta komponen khusus yang memang relevan untuk jenis pelatihannya.
