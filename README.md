# StreamVault — Video Streaming Template

Template Netflix-style untuk platform streaming video. Responsif, SEO-friendly, dan siap deploy ke Vercel / GitHub Pages.

---

## Struktur File

```
streamvault/
├── index.html          ← Halaman utama (home)
├── video.html          ← Halaman player video
├── vercel.json         ← Konfigurasi routing Vercel
├── css/
│   └── style.css       ← Semua stylesheet
└── js/
    ├── data.js         ← DATA VIDEO KAMU (edit ini!)
    └── main.js         ← Logic utama (pagination, routing, dll.)
```

---

## Cara Mengisi Konten

Edit file `js/data.js`. Setiap video adalah satu objek dalam array `videoData`:

```js
{
    id: 1,                          // ID unik (angka)
    title: "Judul Video Kamu",      // Judul video
    thumbnail: "https://...",       // URL thumbnail (16:9)
    embedUrl: "https://...",        // URL embed player
    category: "Action",             // Kategori
    tags: ["action", "adventure"],  // Tag (array)
    uploadDate: "2026-03-01",       // Tanggal upload (YYYY-MM-DD)
    duration: "1:23:45",            // Durasi (opsional)
    views: "1.2M",                  // Jumlah views (opsional)
    rating: 4.8                     // Rating 0–5 (opsional)
}
```

### Konfigurasi lainnya di `data.js`:

```js
// Daftar kategori yang tampil di filter
const categories = ["All", "Action", "Drama", "Comedy", ...];

// ID video yang tampil di hero slider
const heroVideos = [1, 5, 10, 17];
```

---

## Deploy ke Vercel

1. Push semua file ke repositori GitHub
2. Buka [vercel.com](https://vercel.com) → New Project → Import repo
3. Klik **Deploy** — selesai!

Vercel otomatis membaca `vercel.json` untuk routing friendly URL.

---

## Fitur

- ✅ Hero slider otomatis (dengan gambar thumbnail video)
- ✅ Row horizontal scroll: Top Picks, New Uploads, Trending
- ✅ Browse All dengan filter kategori & pagination
- ✅ Halaman video player + related videos sidebar
- ✅ Search real-time (judul, kategori, tag)
- ✅ URL SEO-friendly (`/category/judul-video`)
- ✅ JSON-LD structured data untuk Google
- ✅ Open Graph & Twitter Card meta tags
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Back to top button
- ✅ Copy link share button

---

## Kustomisasi Domain

Ganti semua `https://yourdomain.com` di `index.html` dengan domain kamu.

---

## Lisensi

Template bebas digunakan dan dimodifikasi.
