=== LAKONAN SCHEDULE DISCOVERY & GENERATOR (2026-11-16) ===

1. DISCOVERY PHASE (npm run schedules:discover)
   - Sumber: 1 sitemap (pusattrainingk3.com)
   - Total URL yang di-crawl: 598
   - Kandidat jadwal terdeteksi punya indikasi tanggal: 296 dari 598 URL (49.5%)
   - Registry output: var/schedule-discovery/registry.json

2. GENERATOR PHASE (npm run schedules:generate)
   - Input: registry.json (296 kandidat)
   - Mapping source: config/schedule-training-mappings.json (8 aturan)
   - Output generated (lulus mapping): 30 schedules
   - Output perlu review (no-mapping-rule): 266 schedules
   - Total: 296 (sesuai kandidat dari discovery)

3. DISTRIBUSI GENERATED PER TRAINING
   - ahli-k3-umum: 18 schedules
   - damkar-kelas-d: 2 schedules
   - operator-gondola: 5 schedules
   - training-emergency-response-plan: 3 schedules
   - training-k3-bahaya-confined-space: 2 schedules

4. DISTRIBUSI BATCHNO PER TRAINING (urutan tercatat)
   - ahli-k3-umum: batchNo = 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18
   - damkar-kelas-d: batchNo = 01, 02
   - operator-gondola: batchNo = 01, 02, 03, 04, 05
   - training-emergency-response-plan: batchNo = 01, 02, 03
   - training-k3-bahaya-confined-space: batchNo = 01, 02

5. REVIEW BREAKDOWN (alasan no-mapping-rule: 266)
   Semua 266 kandidat review karena tidak ada pattern regex di config/schedule-training-mappings.json yang match.
   Contoh kandidat review (pertama 30):
   - Siap Jalan Ahli Muda K3 Konstruksi Jakarta
   - Pelatihan Ahli K3 Pesawat Tenaga Produksi Yogyakarta
   - Ahli Muda K3 Konstruksi
   - Siap Jalan Ahli K3 Konstruksi Surabaya
   - Promo Pelatihan Hiperkes Hanya 25jt Pusat K3 Cempaka Putih Jakarta Pusat
   - Pelatihan Teknisi K3 Listrik Jakarta Dan Batam
   - Promo 25jt Pelatihan Hiperkes Paramedis Jakarta
   - Pelatihan Hiperkes Dokter 26 Nop Sd Di Tangerang
   - Pelatihan Damkar Tingkat Dcba Jakarta
   - Selamat Dan Sukses Kepada Peserta K3 Migas Di Cilacap
   - Pelatihan Keselamatan Dan Kesehatan Kerja Rumah Sakit Siap Jalan
   - Hiperkes Dokter Siap Jalan
   - Ahli K3 Listrik Siap Jalan
   - Operator Rigger Juru Ikat Siap Jalan
   - Pelatihan Operator Boiler Kelas 2 Siap Jalan
   - Siap Jalan Teknisi K3 Listrik
   - Siap Jalan Operastor Crane Kelas 2
   - Siap Jalan Operator Crane Kelas 3
   - Siap Jalan Damkar Dcba
   - Siap Jalan Petugas K3 Utama Ruang Terbatas
   - Operator Genset Siap Jalan
   - Siap Jalan Operator Forklift
   - K3 Rigger Juru Ikat Siap Jalan
   - Ahli K3 Kimia Siap Jalan
   - Operator Forklift Siap Jalan
   - POP Pertambangan Siap Jalan
   - Teknisi Listrik Siap Jalan
   - K3 Migas Siap Jalan
   - P3k Di Tempat Kerja Siap Jalan
   - POP Pertambangan Siap Jalan Jogja

6. FILES PRODUK
   - var/schedule-discovery/registry.json (296 kandidat)
   - var/schedule-discovery/generation-report.json (laporan lengkap)
   - var/schedule-discovery/frontmatter/ (30 file MD draft)
   - Setiap file draft berisi frontmatter lengkap: type: schedule, id, ulid, scheduleId, publisherId, trainingSlug, batchNo, slug, title, description, startDate, endDate, dateLabel, timezone, pubDate, updatedDate, draft: true, status: scheduled, sites.main.enabled: false
   - .gitignore: baris 170 menambah "var/" agar output generator tidak ikut ter-commit (review manual sebelum dipindahkan ke src/content/schedules/)

7. TEST RESULTS
   - npm run test:schedules:discover: 6/6 pass
   - npm run test:schedules:generate: 5/5 pass
   - npm run schedules:generate: berhasil (30 generated, 266 review)

8. STATUS REPOSITORY
   - Branch: main (up-to-date dengan origin/main)
   - Commit terbaru: 26d4f88 chore: ignore generated schedule discovery output (var/)
   - PR #15 (feat/schedule-frontmatter-generator): sudah merged ke main
   - Remote branch: feat/schedule-frontmatter-generator masih ada di origin (tidak dihapus sesuai permintaan)

9. TINDAKAN SELANJUTNYA (next steps)
   a) Isi config/schedule-training-mappings.json untuk 266 kandidat review
      - Butuh pattern regex untuk varian judul: ahli-muda-k3-konstruksi, operator-rigger, k3-rigger, pop-pertambangan, dll.
      - Label "Siap Jalan" dan "Promo" perlu aturan mapping baru
   b) Audit 30 frontmatter draft di var/schedule-discovery/frontmatter/
      - Verifikasi relasi schedule ↔ training benar
      - Cek distribusi batchNo sudah urut (01–18 untuk ahli-k3-umum sudah benar, tidak bentrok)
   c) Setelah diverifikasi manual, pindahkan file draft yang valid ke src/content/schedules/
      - Ubah draft: true → draft: false, sites.main.enabled: true
   d) Jalankan npm run build untuk memastikan tidak ada regresi