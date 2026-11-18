# Audit Mapping Schedule Discovery

## Snapshot

Audit ini menggunakan registry dan generation report yang sudah tersimpan di repository, tanpa menjalankan ulang discovery atau menimpa draft yang ada.

| Item | Jumlah |
|---|---:|
| URL sitemap sumber | 598 |
| Kandidat bertanggal | 296 |
| Draft frontmatter berhasil dibuat | 30 |
| Kandidat menunggu mapping/review | 266 |

Seluruh draft hasil generator tetap berada di `var/schedule-discovery/frontmatter/`, berstatus `draft: true`, dan `sites.main.enabled: false`. Draft tersebut bukan jadwal publik.

## Mapping yang saat ini terkonfirmasi

Mapping di `config/schedule-training-mappings.json` menunjuk ke `trainingSlug` master yang harus tersedia di `src/content/trainings/`.

- Ahli K3 Umum
- Pemadam Kebakaran Kelas A
- Damkar Kelas D
- Operator Boiler Tingkat 1
- Operator Boiler Tingkat 2
- Operator Gondola
- Emergency Response Plan
- Confined Space

Generator hanya menerima kandidat jika tepat satu aturan cocok dan `trainingSlug` tujuan ditemukan pada master training. Nol kecocokan menghasilkan `no-mapping-rule`; lebih dari satu kecocokan menghasilkan `multiple-mapping-rules`; tujuan yang tidak ada menghasilkan `mapped-training-not-found`.

## Mengapa mapping belum diperluas otomatis

Audit judul kandidat menemukan beberapa kelompok yang tampak seperti program tersendiri, antara lain Ahli Muda K3 Konstruksi, Hiperkes Dokter/Paramedis, Teknisi K3 Listrik, Operator Crane, Operator Forklift, POP Pertambangan, Operator Genset, K3 Migas, P3K, dan Petugas K3 Ruang Terbatas.

Namun nama kandidat saja tidak cukup untuk membuat relasi. Pemeriksaan path master yang diperkirakan untuk beberapa kelompok tersebut tidak menemukan file yang sesuai. Karena itu, menambahkan `trainingSlug` berdasarkan tebakan akan membuat relasi schedule ke master yang belum tentu ada. Kandidat tersebut sengaja tetap masuk review.

Daftar kandidat per URL dan alasan review tersedia di `var/schedule-discovery/generation-report.json`.

## Kebijakan sebelum mapping berikutnya

1. Ambil daftar aktual seluruh file master dari `src/content/trainings/`.
2. Cocokkan kandidat berdasarkan identitas program, bukan sekadar kata umum seperti `pelatihan`, `operator`, atau `K3`.
3. Tambahkan aturan hanya jika target `trainingSlug` sudah ada dan pola tidak tumpang tindih dengan aturan lain.
4. Uji kandidat representatif untuk setiap aturan baru.
5. Jangan memindahkan draft ke collection jadwal publik sebelum tanggal, program, batch, dan sumber diverifikasi.

## Perbaikan generator

Parser identitas konten kini membaca whitespace YAML secara benar untuk `id` dan `scheduleId`. Pemeriksaan collision menggunakan helper terpisah dan memiliki unit test untuk kedua jenis identitas tersebut. Ini mencegah jadwal yang memakai `scheduleId` lama lolos dari pemeriksaan duplikasi.
