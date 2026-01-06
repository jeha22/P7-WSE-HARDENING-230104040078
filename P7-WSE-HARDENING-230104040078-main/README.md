\# 🛡️ Praktikum 7 – Web Service Engineering
## Hardening RESTful API Express.js

---

### 👤 Identitas Mahasiswa
- **Nama** : M. Reyhan  
- **NIM** : 230104040126  
- **Mata Kuliah** : Web Service Engineering  
- **Topik Praktikum** : Keamanan, Logging, dan Monitoring RESTful API  

---

## 📌 Deskripsi Praktikum

Praktikum 7 merupakan lanjutan dari project UTS pada mata kuliah Web Service Engineering.  
Pada praktikum ini dilakukan proses *hardening* terhadap RESTful API berbasis Express.js agar lebih aman, terpantau, dan siap digunakan pada level production minimal.

Hardening dilakukan dengan menambahkan lapisan keamanan, logging, error handling global, penggunaan environment variable, serta endpoint monitoring.

Resource utama API disesuaikan dengan project UTS mahasiswa, yaitu **Orders**.

---

## 🎯 Tujuan Praktikum

1. Menerapkan middleware keamanan dasar (Helmet, CORS, Rate Limit)
2. Menambahkan logging request secara sistematis
3. Mengimplementasikan global error handling
4. Menggunakan environment variable (.env) untuk konfigurasi sensitif
5. Menyediakan endpoint health check dan monitoring
6. Menjaga struktur project Express.js yang rapi dan modular

---

## 🧰 Tools & Dependencies

- **Runtime** : Node.js v18+  
- **Framework** : Express.js  
- **Security** : Helmet, CORS, express-rate-limit  
- **Logging** : Morgan  
- **Environment Config** : dotenv  
- **Testing** : Postman  

---

## 📂 Struktur Folder Project

```
p7-WSE-RESTful-API-Express.js-230104040126
│
├── app.js
├── package.json
├── .env
├── routes/
│   └── ordersRoutes.js
├── middlewares/
│   └── errorHandler.js
├── logs/
│   └── access.log
└── README.md
```

---

## ⚙️ Konfigurasi Environment (.env)

```env
PORT=3000
NODE_ENV=development
LOG_FORMAT=dev
LOG_FILE_PATH=logs/access.log
ALLOWED_ORIGINS=http://localhost:3000
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=100
```

---

## ▶️ Cara Menjalankan Aplikasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan server:
```bash
npm run dev
```

3. Server berjalan pada:
```
http://localhost:3000
```

---

## 🔐 Fitur Hardening yang Diterapkan

- **Helmet** → Menambahkan security HTTP headers  
- **CORS** → Membatasi origin tertentu  
- **Rate Limiting** → Mencegah spam dan request berlebihan  
- **Logging** → Mencatat request ke console dan file  
- **Global Error Handler** → Menangani error secara konsisten  
- **Monitoring** → Health check dan metrics endpoint  

---

## 📑 Tabel Endpoint (Sesuai Modul Praktikum 7)

### Endpoint Umum

| Method | Endpoint | Keterangan |
|------|---------|------------|
| GET | `/` | Root API |
| GET | `/api/info` | Informasi aplikasi |
| GET | `/api/health` | Health check service |
| GET | `/api/metrics` | Monitoring & request count |
| GET | `/api/error` | Simulasi error 500 |

### Resource Orders (Project UTS)

| Method | Endpoint | Deskripsi |
|------|---------|-----------|
| GET | `/api/orders` | Menampilkan semua orders |
| GET | `/api/orders/:id` | Menampilkan order berdasarkan ID |
| POST | `/api/orders` | Menambahkan order |
| PUT | `/api/orders/:id` | Mengubah data order |
| DELETE | `/api/orders/:id` | Menghapus order |

---

## 🧪 Pengujian API

Pengujian dilakukan menggunakan **Postman** sesuai tabel endpoint modul Praktikum 7.

Total **9 screenshot Postman** meliputi:
1. Root endpoint
2. API info
3. GET resource
4. POST resource
5. GET resource by ID (valid)
6. GET resource by ID (404)
7. Rate limit (429)
8. Health check
9. Metrics

---

## 📊 Logging & Monitoring

- Logging request menggunakan **Morgan**
- File log tersimpan pada:
```
logs/access.log
```
- Endpoint `/api/metrics` menampilkan:
  - Uptime server
  - Jumlah request
  - Penggunaan memory

---

## ✅ Kesimpulan

Dengan penerapan hardening pada Praktikum 7 ini, RESTful API telah:
- Memiliki lapisan keamanan dasar
- Mampu mencatat dan memonitor aktivitas request
- Menangani error secara konsisten
- Siap digunakan pada level production minimal

---

## 📎 Lampiran

- Screenshot pengujian Postman  


