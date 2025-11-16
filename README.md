# 🏢 HR Dashboard - Sistem Manajemen Karyawan

Aplikasi **Employee Management System** yang dibangun menggunakan **React + TypeScript** untuk mengelola data karyawan, absensi, departemen, dan laporan analitik.

---

### Fitur Utama:
- 👥 **Manajemen Karyawan** - CRUD lengkap untuk data karyawan
- 📅 **Sistem Absensi** - Tracking kehadiran dengan kalender interaktif
- 🏢 **Manajemen Departemen** - Overview departemen dan jumlah karyawan
- 📊 **Dashboard & Laporan** - Statistik dan analitik workforce
- 🔐 **Autentikasi** - Sistem login dengan protected routes

---

## 🛠️ Teknologi yang Digunakan

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **Context API** - State management
- **LocalStorage** - Data persistence

---

## 🚀 Cara Menjalankan Project

### Prasyarat
- Node.js (versi 14 ke atas)
- npm atau yarn

### Langkah Instalasi

```bash
# 1. Clone repository
git clone <repository-url>
cd test-sagara

# 2. Install dependencies
npm install

# 3. Jalankan aplikasi
npm start

# 4. Buka di browser
# http://localhost:3000
```

---

## 🔑 Login

Gunakan kredensial berikut untuk login:
- **Username:** `admin@example.com`
- **Password:** `admin123`

---

## 📂 Struktur Project

```
src/
├── components/        # Komponen reusable
│   ├── attendance/    # Komponen absensi
│   ├── charts/        # Komponen chart
│   ├── common/        # Button, Input, dll
│   ├── layout/        # Layout utama (Sidebar, Header)
│   ├── modals/        # Modal dialogs
│   └── tables/        # Table components
├── context/           # State management (Context API)
├── pages/             # Halaman-halaman utama
├── hooks/             # Custom hooks
├── types/             # TypeScript definitions
├── data/              # Data dummy (users.json)
└── utils/             # Utility functions
```

---

## ✨ Fitur-Fitur Detail

### 1. Manajemen Karyawan
- ✅ Tambah karyawan baru dengan form validasi
- ✅ Edit data karyawan yang sudah ada
- ✅ Hapus karyawan dengan konfirmasi
- ✅ Pencarian dan filter berdasarkan role
- ✅ Sorting data berdasarkan kolom
- ✅ Pagination untuk navigasi data

### 2. Sistem Absensi
- ✅ Kalender bulanan dengan indikator kehadiran
- ✅ Quick check-in untuk tandai kehadiran
- ✅ Status: Present, Late, Absent, Leave
- ✅ Statistik harian dan bulanan
- ✅ History absensi per tanggal

### 3. Dashboard
- ✅ Total karyawan dan statistik aktif/nonaktif
- ✅ Chart distribusi departemen
- ✅ Growth trend karyawan
- ✅ Quick action cards
- ✅ Recent activity

### 4. Laporan
- ✅ Statistik role (Admin, User, Guest)
- ✅ Status overview (Active/Inactive)
- ✅ Top 5 departemen
- ✅ Growth rate bulanan
- ✅ Average tenure karyawan

---

## 💾 Penyimpanan Data

Semua data disimpan di **localStorage** browser, sehingga:
- ✅ Data tetap tersimpan meskipun refresh halaman
- ✅ Tidak perlu setup database
- ✅ Cocok untuk demo dan testing

---

## 📱 Responsive Design

Aplikasi sudah dioptimasi untuk berbagai ukuran layar:
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px - 1920px)
- 📱 Tablet (768px - 1366px)
- 📱 Mobile (< 768px)

---

## 🎨 Highlight Project

### Kelebihan:
1. **User-Friendly Interface** - Design yang clean dan mudah digunakan
2. **Real-time Updates** - Data langsung update tanpa reload
3. **Form Validation** - Validasi input untuk mencegah error
4. **Smooth Animations** - Transisi yang halus antar halaman
5. **Clean Code** - Struktur code yang rapi dan mudah dipahami

### Best Practices:
- ✅ TypeScript untuk type safety
- ✅ Component reusability
- ✅ Custom hooks untuk logic sharing
- ✅ Context API untuk global state
- ✅ Consistent naming convention
- ✅ Responsive design pattern

---

## 📞 Kontak

**Developer:** [Nama Anda]  
**Email:** [dhika.farizi@gmail.com]  
**GitHub:** [@syahandhika001](https://github.com/Syahandhika001)  
**LinkedIn:** [linkedin.com/in/syahandhika-f](https://linkedin.com/in/syahandhika-f)

---

## 🙏 Penutup

Project ini dibuat dengan sepenuh hati untuk memenuhi requirements take-home test SAGARA Technology. Terima kasih atas kesempatan yang diberikan!
