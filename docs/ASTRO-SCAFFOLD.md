# Astro Scaffold — Pusattraining

## Keputusan teknis

- Framework: Astro 7.4.0 (disamakan dengan Damkar dan Confinedspace).
- Styling: Tailwind CSS 4 melalui `@tailwindcss/vite`.
- Bahasa: TypeScript dengan konfigurasi strict Astro.
- Rendering: static-first; belum memasang adapter server karena kebutuhan deployment belum ditentukan.
- UI: Astro components dan native HTML; belum menambahkan framework client-side.
- Package manager: npm.

Tailwind 4 dipasang melalui Vite plugin resmi. Integrasi lama `@astrojs/tailwind` tidak digunakan karena sudah deprecated untuk proyek Tailwind 4. Lihat dokumentasi resmi Astro dan Tailwind:
- https://docs.astro.build/en/guides/styling/
- https://tailwindcss.com/docs/installation/framework-guides/astro

## File scaffold

- `package.json`: dependencies, Node engine, dan scripts.
- `astro.config.mjs`: Astro config + Tailwind Vite plugin.
- `tsconfig.json`: strict Astro TypeScript config dan alias `@/*`.
- `src/env.d.ts`: Astro client types.
- `src/layouts/SiteLayout.astro`: document shell, SEO metadata, header, footer.
- `src/styles/global.css`: Tailwind entry dan global baseline.
- `src/pages/`: homepage, katalog, jadwal, tentang, kontak, dan 404.
- `public/`: favicon dan robots.txt.

## Menjalankan setelah merge

```bash
node --version
npm install
npm run check
npm run build
npm run dev
```

Gunakan Node.js 22.22.0 atau lebih baru. Versi proyek dicatat pada file `.nvmrc`. `npm install` akan membuat `package-lock.json` sesuai versi dependency yang ter-resolve di lingkungan lokal. Simpan `package-lock.json` ke repository setelah dependency berhasil di-resolve agar instalasi berikutnya reproducible. Branch ini belum menyertakan lockfile karena proses instalasi dependency tidak dapat dijalankan dari lingkungan kerja saat ini.

## Status verifikasi

Scaffold dan file konfigurasi sudah ditambahkan ke branch fitur. Build belum dieksekusi di lingkungan repository karena perubahan dilakukan melalui GitHub Contents API, bukan checkout lokal dengan Node/npm. Karena itu, jangan anggap build sudah lulus sebelum menjalankan perintah di atas setelah pull/merge.

## Batas implementasi saat ini

- Belum ada adapter deployment (Vercel/Netlify/Node) karena target hosting belum ditetapkan.
- Belum ada content collection/schema untuk training dan schedule; bentuk data final perlu diselaraskan dengan sumber dan kebutuhan portal induk.
- Belum ada data jadwal atau program contoh yang berpotensi disalahartikan sebagai informasi aktual.
- Canonical URL akan aktif setelah properti `site` di `astro.config.mjs` diisi dengan domain produksi.
- Kontak resmi, logo final, foto, dan aset organisasi belum dimasukkan.
