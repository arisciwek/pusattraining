# Panduan Kolom Jadwal Pelatihan 2027

File data jadwal: `docs/data/jadwal-pelatihan-2027.csv`

CSV ini digunakan untuk mencatat jadwal penyelenggaraan pelatihan. Setiap baris mewakili satu jadwal pelatihan, sedangkan identitas program pelatihan merujuk pada data pelatihan yang sudah tersedia di repository.

## Keterangan Kolom

| Kolom | Wajib | Fungsi |
|---|---|---|
| ID | Ya | ID numerik pelatihan dari data pelatihan, untuk identifikasi dan pencocokan baris. |
| TrainingSlug | Ya | Menghubungkan jadwal ke halaman pelatihan melalui slug; juga dipakai sebagai nama folder foto training (`public/images/training/<TrainingSlug>/`). |
| startDate | Ya | Tanggal mulai pelatihan, format `YYYY-MM-DD`. |
| endDate | Ya | Tanggal selesai pelatihan, format `YYYY-MM-DD`. |
| timezone | Tidak | Zona waktu jadwal, misalnya `Asia/Jakarta`. |
| locationType | Tidak | Jenis pelaksanaan: `offline`, `online`, atau `hybrid`. |
| venue | Tidak | Nama gedung atau tempat pelatihan. |
| city | Tidak | Kota penyelenggaraan. |
| province | Tidak | Provinsi penyelenggaraan. |
| registrationStatus | Tidak | Status pendaftaran: `open`, `closed`, `full`, atau `cancelled`. |
| price | Tidak | Harga dalam angka numerik, tanpa simbol mata uang. |
| currency | Tidak | Kode mata uang, misalnya `IDR`. |
| quota | Tidak | Kuota peserta pelatihan. |
| registrationUrl | Tidak | URL pendaftaran, jika tersedia. |
| notes | Tidak | Catatan internal atau catatan terkait jadwal. |

## Aturan Pengisian

- Gunakan `ID` dan `TrainingSlug` sesuai data pelatihan di repository; jangan membuat identitas baru untuk jadwal.
- Tanggal harus ditulis dalam format ISO `YYYY-MM-DD`.
- `price` diisi angka saja (contoh: `1500000`), tanpa `Rp`, pemisah ribuan, atau simbol mata uang.
- `currency` menggunakan kode mata uang, misalnya `IDR`.
- Kolom opsional yang belum diketahui boleh dikosongkan.
- Nilai `registrationStatus`, jika diisi, harus menggunakan salah satu nilai yang dicantumkan di tabel.
- `locationType`, jika diisi, harus menggunakan `offline`, `online`, atau `hybrid`.

