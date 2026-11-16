# Deployment Astro Static Site di Nginx

Astro dikonfigurasi memakai `trailingSlash: 'always'` dan `build.format: 'directory'`. Karena itu setiap halaman harus disajikan dari file `index.html` di dalam direktori hasil build.

## 1. Build dan document root

Jalankan dari root project:

```bash
npm ci
npm run build
test -f dist/index.html
```

Document root Nginx harus menunjuk ke direktori **`dist`**, bukan root repository:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /ABSOLUTE/PATH/TO/pusattraining/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(?:css|js|mjs|json|xml|svg|png|jpe?g|webp|ico|woff2?)$ {
        try_files $uri =404;
        expires 7d;
        access_log off;
    }
}
```

Ganti `example.com` dan `/ABSOLUTE/PATH/TO/pusattraining/dist` sesuai server. Jika TLS dikelola di server block terpisah, pertahankan konfigurasi sertifikat yang sudah ada dan pastikan `root` serta `index` sama.

## 2. Verifikasi file halaman

Contoh untuk halaman detail Pemadam Kebakaran Kelas D:

```bash
test -f dist/index.html
test -f dist/pelatihan/damkar-kelas-d/index.html
```

Jika file kedua tidak ada, periksa hasil build dan data collection; jangan mengatasi kondisi ini dengan mengaktifkan directory listing.

## 3. Diagnosis 403 Forbidden

Jalankan:

```bash
sudo nginx -T | grep -nE 'server_name|root |index |try_files'
namei -l /ABSOLUTE/PATH/TO/pusattraining/dist/index.html
sudo tail -n 80 /var/log/nginx/error.log
```

Interpretasi umum:
- `directory index ... is forbidden`: Nginx menemukan direktori tetapi tidak menemukan `index.html`; periksa `root`, `index index.html`, dan hasil build.
- `Permission denied`: user worker Nginx tidak dapat membaca file atau menelusuri salah satu direktori induk; periksa permission setiap direktori dengan `namei -l`.
- `No such file or directory`: document root atau path file salah, atau build belum disalin ke lokasi deployment.

Setelah memperbaiki konfigurasi:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Catatan: Nginx tidak membaca `.htaccess`; file tersebut hanya berlaku untuk Apache. Untuk output Astro statis dengan direktori dan `index.html`, konfigurasi Nginx di atas sudah cukup tanpa aturan rewrite aplikasi.
