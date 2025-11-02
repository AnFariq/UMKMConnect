
-----

# 🚀 UMKMConnect: Peta Interaktif Digitalisasi UMKM

[](/path/to/status)
[](LICENSE)
[](https://github.com/AnFariq/UMKMConnect/stargazers)

## 🎯 Latar Belakang & Masalah

  * **Masalah:** Banyak UMKM yang sudah memiliki lokasi fisik, namun sulit ditemukan oleh konsumen digital. Informasi mengenai lokasi, produk, dan jam operasional seringkali tidak terpusat.
  * **Solusi:** **UMKMConnect** adalah solusi *frontend* yang berfokus pada visualisasi geografis. Dengan menggunakan peta interaktif, proyek ini mempermudah konsumen untuk menemukan UMKM terdekat dan mendapatkan informasi mendalam hanya dengan sekali klik pada titik lokasi.

## ✨ Fitur Utama (Highlight Peta Interaktif)

Fokus pada fitur-fitur yang ada di *frontend* dan terkait dengan peta:

  * **🗺️ Peta Interaktif Lokasi UMKM:** Menampilkan titik-titik (marker) lokasi UMKM secara akurat di seluruh area yang dicakup.
  * **📍 Detail *On-Click*:** Ketika pengguna mengklik sebuah titik lokasi di peta, akan muncul *popup* atau *sidebar* yang menampilkan:
      * **Nama UMKM**
      * **Deskripsi Singkat**
      * **Kategori Produk** (Cth: Makanan, Kerajinan, Jasa)
      * **Arah/Navigasi** (Link ke Google Maps/Waze)
  * **🔍 Pencarian Berbasis Lokasi/Nama:** Memungkinkan pengguna menyaring tampilan peta berdasarkan nama UMKM atau kategori produk.
  * **Akses Cepat:** Desain antarmuka yang responsif dan cepat diakses, berfokus pada pengalaman pengguna yang intuitif (*User Experience*).

## 🖼️ Tampilan Aplikasi (Demonstrasi)

> **Link Demo Langsung (Deployed App):** [[https://umkmconnect.vercel.app](https://umkm-connect-six.vercel.app/)] *(Ganti dengan link deployment Anda)*

## 🛠️ Teknologi yang Digunakan (Fokus Frontend)

| Kategori | Teknologi | Versi Kunci |
| :--- | :--- | :--- |
| **Framework Utama** | [React / Vue ] |
| **Library Peta** | **[Leaflet.js]** |
| **Styling** | [Tailwind CSS] | |
| **Deployment** | [Vercel, Netlify, GitHub Pages] | |
| **Data (Simulasi/Mock)** | Menggunakan data JSON lokal untuk simulasi lokasi. | |

## ⚙️ Panduan Instalasi Lokal (Frontend Saja)

Panduan ini kini lebih sederhana karena hanya melibatkan *frontend*.

### Prasyarat

  * [Git](https://git-scm.com/)
  * [Node.js](https://nodejs.org/) 

### Langkah-langkah

1.  **Clone Repositori:**

    ```bash
    git clone https://github.com/AnFariq/UMKMConnect.git
    cd UMKMConnect
    ```

2.  **Instal Dependensi:**

    ```bash
    npm install
    ```

3.  **Konfigurasi Kunci API:**
    ```
    # Contoh: Kunci API Google Maps
    REACT_APP_MAP_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Jalankan Aplikasi:**

    ```bash
    npm run dev
    ```

    Aplikasi akan dapat diakses di `http://localhost:5173`.

## 🤝 Tim Pengembang

  * **[Andicha Fariq Putra Pratama]** - *[Peran: Frontend Developer & Map Implementation]* ([Link GitHub/LinkedIn])
  * **[Kefiar Sakki Widyarinakit]** - *[Peran: Backend Developer]* ([Link GitHub/LinkedIn])
  * **[Mochammad Hafizh Yastito}** - *[Peran: UI/UX Designer]* ([Link GitHub/LinkedIn])
  * *(Sesuaikan dengan jumlah anggota tim Anda)*

## 📜 Lisensi

Proyek ini didistribusikan di bawah [Lisensi MIT](LICENSE).

-----
