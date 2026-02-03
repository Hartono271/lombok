# Lombok Tourism - Search Engine Wisata

Aplikasi pencarian destinasi wisata Lombok berbasis Web Semantik dengan SPARQL endpoint.

## 🚀 Fitur Utama

- **Multi-bahasa**: Indonesia & English
- **Carousel Gambar**: Galeri foto Lombok yang menarik
- **Smart Search dengan SWRL Rules**: 16 aturan pencarian cerdas
  - Holiday, Budget, Expensive, Family, Adventure
  - Culture, Religious, Nature, Education, Popular
  - Unpopular (Hidden Gems), Relax, Photo Spots, Water Activities
  - Food/Culinary, Events
- **Filter Lanjutan**: 
  - Lokasi (Central, East, North, West Lombok, Mataram)
  - Transportasi (Mobil, Motor, Bus, Taksi, Perahu, dll)
  - Kategori (Pantai, Gunung, Budaya, Air Terjun, dll)
- **Modal Detail**: Informasi lengkap dengan embed YouTube video
- **Events Support**: Dukungan untuk event dan festival
- **Responsive Design**: Mobile-friendly

## 🛠️ Teknologi

- **Next.js 16** - React Framework
- **TypeScript** - Type Safety
- **SPARQL** - Semantic Web Query
- **Apache Jena Fuseki** - Triple Store Server

## 📋 Prerequisites

- Node.js 20+ 
- npm atau yarn
- Apache Jena Fuseki server (atau akses ke SPARQL endpoint)

## 🔧 Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd lombok-tourism
```

2. Install dependencies:
```bash
npm install
```

3. Konfigurasi environment variables:
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan SPARQL endpoint:
```
SPARQL=http://localhost:3030/lombok/sparql
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Project

```
lombok-tourism/
├── public/               # Static files & carousel images
│   ├── 01.png           # Carousel image 1
│   ├── 02.png           # Carousel image 2
│   ├── 03.png           # Carousel image 3
│   ├── 04.png           # Carousel image 4
│   └── 05.png           # Carousel image 5
├── src/
│   └── app/
│       ├── components/
│       │   ├── ClientView.tsx    # Main client component
│       │   └── Carousel.tsx      # Carousel component
│       ├── lib/
│       │   └── data.ts           # SPARQL data fetching
│       ├── actions.ts            # Server actions
│       ├── dictionary.ts         # Translations
│       ├── globals.css           # Global styles
│       ├── layout.tsx            # Root layout
│       └── page.tsx              # Home page
├── .env                 # Environment variables
├── .env.example        # Example env file
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies
└── README.md           # This file
```

## 🎨 Styling

Aplikasi menggunakan custom CSS dengan:
- Glassmorphism effects
- Smooth animations
- Gradient backgrounds
- Responsive design
- Modal overlays
- Category filters dengan active states

## 🔍 SWRL Rules

Aplikasi menggunakan 16 SWRL (Semantic Web Rule Language) rules untuk smart search:

1. **Holiday** - Filter destinasi liburan (pantai, pulau, taman)
2. **Budget** - Wisata murah/gratis (< Rp 50.000)
3. **Expensive** - Wisata premium (≥ Rp 50.000)
4. **Family** - Ramah keluarga (taman, air terjun, pemandian)
5. **Adventure** - Petualangan (gunung, gua, trekking)
6. **Culture** - Budaya (tradisi Sasak, village, museum)
7. **Religious** - Religi (masjid, pura, ziarah)
8. **Nature** - Alam (hutan, eco, natural)
9. **Education** - Edukasi (museum, agrowisata)
10. **Popular** - Populer (rating ≥ 4.5)
11. **Hidden Gems** - Tersembunyi (rating < 4.5)
12. **Relax** - Relaksasi (pemandian, spa)
13. **Photo Spots** - Instagrammable (pemandangan indah)
14. **Water Activities** - Aktivitas air (snorkeling, diving)
15. **Culinary** - Kuliner (restoran, makanan)
16. **Events** - Acara & festival

## 📊 Data Source

Data wisata diambil dari SPARQL endpoint yang berisi:
- Nama destinasi (ID & EN)
- Kategori/tipe wisata
- Deskripsi (ID & EN)
- Lokasi
- Harga
- Rating
- Fasilitas
- Aktivitas
- Jam buka
- Transportasi
- Video YouTube
- Event time (untuk kategori Events)

## 🌐 Multi-language

Dukungan 2 bahasa:
- 🇮🇩 Bahasa Indonesia (default)
- 🇬🇧 English

Switch language menggunakan tombol di pojok kanan atas.

## 🚢 Build untuk Production

```bash
npm run build
npm start
```

## 📝 License

MIT License

## 👥 Contributors

- [Your Name]

## 🙏 Acknowledgments

- Apache Jena Fuseki untuk triple store
- Ontologi wisata Lombok
- Font Awesome untuk icons
- Unsplash untuk background images
