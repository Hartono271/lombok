"use client";

import React, { useState, useEffect, useMemo } from 'react';

// === DATA DICTIONARY ===
const dictionary: any = {
  id: {
    welcome: "🏝️ Selamat Datang di Lombok Paradise",
    subtitle: "Temukan permata tersembunyi Indonesia! Lombok menawarkan pantai-pantai yang menakjubkan, pegunungan yang megah, budaya yang semarak, dan petualangan tak terlupakan yang menanti Anda.",
    why: "🌴 Kenapa Lombok?",
    reasons: ["Pantai-pantai yang masih alami dengan air sebening kristal", "Gunung Rinjani - gunung berapi tertinggi kedua di Indonesia", "Budaya & tradisi Sasak yang otentik", "Tempat berselancar & menyelam kelas dunia", "Surga Kepulauan Gili yang indah", "Desa-desa tradisional Sasak", "Air terjun & hutan eksotis", "Masakan lokal yang lezat"],
    startBtn: "Mulai Jelajah",
    backWelcome: "Kembali",
    explore: "Jelajahi Wisata",
    searchPlace: "Cari wisata... (contoh: 'liburan' atau 'murah')",
    locLabel: "Lokasi:",
    transLabel: "Transportasi:",
    noResult: "Tidak ada wisata yang ditemukan.",
    allLoc: "Semua Lokasi",
    centralLombok: "Lombok Tengah",
    eastLombok: "Lombok Timur",
    northLombok: "Lombok Utara",
    westLombok: "Lombok Barat",
    mataramCity: "Kota Mataram",
    allTrans: "Semua Transportasi",
    car: "Mobil", motorcycle: "Motor", bus: "Bus", taxi: "Taksi",
    boat: "Perahu", ferry: "Kapal Feri", speedboat: "Speedboat", plane: "Pesawat",
    catAll: "Semua", catBeach: "Pantai", catMountain: "Gunung", catCulture: "Budaya",
    catWaterfall: "Air Terjun", catIsland: "Pulau", catCave: "Gua", catAgro: "Agrowisata",
    catCulinary: "Kuliner", catBathing: "Pemandian", catShopping: "Belanja",
    catNature: "Alam", catPark: "Taman",
    swrlTitle: "Pencarian Cerdas Aktif (10 SWRL Rules)",
    moreDetails: "Lihat Detail",
    modalLocation: "Lokasi",
    modalHours: "Jam Buka",
    modalPrice: "Harga",
    modalTransport: "Transportasi",
    modalActivities: "Aktivitas",
    modalDesc: "Deskripsi",
    modalFacilities: "Fasilitas",
    noDesc: "Tidak ada deskripsi tersedia.",
    noActivity: "Berbagai aktivitas tersedia.",
    noFacility: "Fasilitas dasar tersedia.",
    noHours: "Buka setiap hari",
    free: "Gratis"
  },
  en: {
    welcome: "🏝️ Welcome to Lombok Paradise",
    subtitle: "Discover the hidden gem of Indonesia! Lombok offers breathtaking beaches, majestic mountains, vibrant culture, and unforgettable adventures waiting for you.",
    why: "🌴 Why Visit Lombok?",
    reasons: ["Pristine beaches with crystal clear waters", "Mount Rinjani - Indonesia's second highest volcano", "Authentic Sasak culture & traditions", "World-class surfing & diving spots", "Beautiful Gili Islands paradise", "Traditional Sasak villages", "Exotic waterfalls & jungles", "Delicious local cuisine"],
    startBtn: "Start Exploring",
    backWelcome: "Back",
    explore: "Explore Destinations",
    searchPlace: "Search places... (try typing 'holiday' or 'budget')",
    locLabel: "Location:",
    transLabel: "Transportation:",
    noResult: "No destinations found.",
    allLoc: "All Locations",
    centralLombok: "Central Lombok",
    eastLombok: "East Lombok",
    northLombok: "North Lombok",
    westLombok: "West Lombok",
    mataramCity: "Mataram City",
    allTrans: "All Transportation",
    car: "Car", motorcycle: "Motorcycle", bus: "Bus", taxi: "Taxi",
    boat: "Boat", ferry: "Ferry", speedboat: "Speedboat", plane: "Plane",
    catAll: "All", catBeach: "Beach", catMountain: "Mountain", catCulture: "Culture",
    catWaterfall: "Waterfall", catIsland: "Island", catCave: "Cave", catAgro: "Agrotourism",
    catCulinary: "Culinary", catBathing: "Hot Springs", catShopping: "Shopping",
    catNature: "Nature", catPark: "Park",
    swrlTitle: "Smart Search Active (10 SWRL Rules)",
    moreDetails: "View Details",
    modalLocation: "Location",
    modalHours: "Opening Hours",
    modalPrice: "Price",
    modalTransport: "Transportation",
    modalActivities: "Activities",
    modalDesc: "Description",
    modalFacilities: "Facilities",
    noDesc: "No description available.",
    noActivity: "Various activities available.",
    noFacility: "Basic facilities available.",
    noHours: "Open daily",
    free: "Free"
  }
};

const swrlRules: any = {
  holiday: { keywords: ['liburan', 'holiday', 'summer', 'vacation', 'libur', 'rekreasi'], types: ['Marine', 'Island', 'Park', 'Natural'], badge: '✨ Holiday Choice', badgeId: '✨ Pilihan Liburan' },
  budget: { keywords: ['murah', 'cheap', 'budget', 'hemat', 'gratis', 'free', 'affordable'], priceFilter: true, badge: '💰 Budget Friendly', badgeId: '💰 Hemat Budget' },
  family: { keywords: ['keluarga', 'family', 'kids', 'anak', 'children'], types: ['Park', 'Waterfall', 'Bathing', 'Island'], badge: '👨‍👩‍👧‍👦 Family Friendly', badgeId: '👨‍👩‍👧‍👦 Ramah Keluarga' },
  adventure: { keywords: ['petualangan', 'adventure', 'hiking', 'trekking', 'pendakian', 'extreme'], types: ['Mountain', 'Cave', 'Natural', 'Forrest'], badge: '🧗 Adventure Spot', badgeId: '🧗 Spot Petualangan' },
  culture: { keywords: ['budaya', 'culture', 'sejarah', 'history', 'tradisi', 'sasak', 'religion'], types: ['Cultural', 'Religious', 'Village'], badge: '🏛️ Cultural Heritage', badgeId: '🏛️ Warisan Budaya' },
  nature: { keywords: ['alam', 'nature', 'eco', 'green', 'hijau', 'forest', 'hutan'], types: ['Natural', 'Forrest', 'Eco', 'Park'], badge: '🌿 Nature Escape', badgeId: '🌿 Wisata Alam' },
  relax: { keywords: ['relax', 'santai', 'spa', 'wellness', 'healing', 'pemandian', 'istirahat'], types: ['Bathing', 'Park', 'Island'], badge: '🧘 Relaxation', badgeId: '🧘 Relaksasi' },
  photo: { keywords: ['foto', 'photo', 'instagram', 'scenic', 'view', 'pemandangan', 'sunset'], types: ['Marine', 'Mountain', 'Island', 'Valley', 'Savana', 'Waterfall'], badge: '📸 Instagrammable', badgeId: '📸 Spot Foto' },
  water: { keywords: ['air', 'water', 'swim', 'berenang', 'snorkeling', 'diving', 'surfing', 'laut'], types: ['Marine', 'Island', 'Waterfall', 'Bathing', 'Lake'], badge: '🌊 Water Activities', badgeId: '🌊 Wisata Air' },
  food: { keywords: ['makanan', 'food', 'kuliner', 'culinary', 'makan', 'eat', 'restaurant', 'kopi'], types: ['Culinary'], badge: '🍜 Culinary Tour', badgeId: '🍜 Wisata Kuliner' }
};

// Terjemahan untuk nama transportasi
const transportTranslations: any = {
  'Car': { id: 'Mobil', en: 'Car' },
  'Motorcycle': { id: 'Motor', en: 'Motorcycle' },
  'Bus': { id: 'Bus', en: 'Bus' },
  'Taxi': { id: 'Taksi', en: 'Taxi' },
  'Boat': { id: 'Perahu', en: 'Boat' },
  'Ferry': { id: 'Kapal Feri', en: 'Ferry' },
  'Speedboat': { id: 'Speedboat', en: 'Speedboat' },
  'Plane': { id: 'Pesawat', en: 'Plane' },
  'PublicTransport': { id: 'Angkutan Umum', en: 'Public Transport' },
  'PrivateVehicle': { id: 'Kendaraan Pribadi', en: 'Private Vehicle' }
};

export default function ClientView({ initialData }: { initialData: any[] }) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [screen, setScreen] = useState<'welcome' | 'search'>('welcome');
  const [keyword, setKeyword] = useState('');
  const [locFilter, setLocFilter] = useState('all');
  const [transFilter, setTransFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalItem, setModalItem] = useState<any>(null);
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  // Particles
  useEffect(() => {
    const container = document.getElementById('particles');
    if (container && container.innerHTML === '') {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--tx', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--ty', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--r', `${Math.random() * 360}deg`);
            particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite alternate`;
            container.appendChild(particle);
        }
    }
  }, []);

  // Carousel Auto-slide Logic
  useEffect(() => {
    if (screen === 'welcome') {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 3000);
        return () => clearInterval(interval);
    }
  }, [screen]);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalItem(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Translation Helper
  const t = dictionary[lang];

  // Fungsi untuk menerjemahkan nama transportasi
  const translateTransport = (transport: string) => {
    if (!transport) return lang === 'id' ? 'Kendaraan Pribadi' : 'Private Vehicle';
    let translated = transport;
    Object.keys(transportTranslations).forEach(key => {
      const regex = new RegExp(key, 'gi');
      translated = translated.replace(regex, transportTranslations[key][lang]);
    });
    return translated;
  };

  // Helper to get language-specific data from item
  const getItemData = (item: any) => ({
    name: item.name,
    typeURI: item.typeURI,
    typeLabel: lang === 'id' ? item.typeLabelId : item.typeLabelEn,
    desc: lang === 'id' ? item.descId : item.descEn,
    activity: lang === 'id' ? item.activityId : item.activityEn,
    facility: lang === 'id' ? item.facilityId : item.facilityEn,
    price: lang === 'id' ? item.priceId : item.priceEn,
    openingHours: lang === 'id' ? item.openingHoursId : item.openingHoursEn,
    location: lang === 'id' ? item.locationId : item.locationEn,
    img: item.img,
    rating: item.rating,
    transport: item.transport
  });

  // Filtering Logic
  const filteredData = useMemo(() => {
    const results = { data: [], activeRules: [] } as any;
    
    // Check Rules
    const activeRules: any[] = [];
    const lowerKeyword = keyword.toLowerCase();
    for (const [ruleName, rule] of Object.entries(swrlRules) as any) {
        if (rule.keywords.some((kw: string) => lowerKeyword.includes(kw))) {
            activeRules.push({ name: ruleName, ...rule });
        }
    }
    const isSmartSearchActive = activeRules.length > 0;
    results.activeRules = activeRules;

    results.data = initialData.filter(item => {
        const itemData = getItemData(item);
        
        let passCategory = (activeCategory === 'all') ? true : item.typeURI.includes(activeCategory);
        let passLocation = (locFilter === 'all') ? true : itemData.location.includes(locFilter);
        let passTransport = (transFilter === 'all') ? true : item.transport.toLowerCase().includes(transFilter.toLowerCase());

        let passKeyword = true;
        if (!isSmartSearchActive && keyword !== "") {
            passKeyword = item.name.toLowerCase().includes(lowerKeyword) || itemData.desc.toLowerCase().includes(lowerKeyword);
        }

        let passSmartRule = true;
        if (isSmartSearchActive) {
            passSmartRule = false;
            for (const rule of activeRules) {
                if (rule.types && rule.types.some((type: string) => item.typeURI.includes(type))) {
                    passSmartRule = true;
                    break;
                }
                if (rule.priceFilter) {
                    let priceVal = parseInt(itemData.price.replace(/[^0-9]/g, '')) || 0;
                    if (itemData.price.toLowerCase().includes('free') || itemData.price.toLowerCase().includes('gratis') || priceVal < 50000 || itemData.price === '') {
                        passSmartRule = true;
                        break;
                    }
                }
            }
        }
        return passCategory && passLocation && passTransport && passKeyword && passSmartRule;
    });

    return results;
  }, [initialData, keyword, locFilter, transFilter, activeCategory, lang]);

  const formatPrice = (price: string) => {
    if (!price || price === '') return t.free;
    
    // Jika mengandung kata-kata deskriptif atau format kompleks, tampilkan apa adanya
    if (price.includes(' - ') || price.includes('–') || price.includes('/') || 
        price.includes('weekday') || price.includes('weekend') || 
        price.includes('domestic') || price.includes('foreign') ||
        price.includes('wisatawan') || price.includes('tiket') ||
        price.includes('sewa') || price.includes('rental') ||
        price.length > 50) {
      return price;
    }
    
    // Jika harga dalam format angka sederhana seperti "10.000" atau "25000"
    const priceMatch = price.match(/^[\d.,]+$/);
    if (priceMatch) {
      const priceStr = price.replace(/\./g, '').replace(/,/g, '');
      const priceNum = parseInt(priceStr);
      if (priceNum && priceNum < 10000000) { // Hanya format jika < 10 juta
        return 'Rp ' + priceNum.toLocaleString('id-ID');
      }
    }
    
    if (price.toLowerCase().includes('free') || price === '0' || price.toLowerCase().includes('gratis')) {
      return t.free;
    }
    
    return price;
  };

  const renderStars = (rating: string) => {
      if (!rating) return null;
      const starCount = Math.round(parseFloat(rating));
      const stars = [];
      for (let i = 0; i < 5; i++) {
          stars.push(
              <i key={i} className="fas fa-star" style={{ color: i < starCount ? '#ffd700' : '#ddd', fontSize: '0.85rem' }}></i>
          );
      }
      return <>{stars}</>;
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Trigger filter (already reactive via useMemo)
    }
  };

  return (
    <>
      <div className="language-switcher">
        <button className={`lang-btn ${lang === 'id' ? 'active' : ''}`} onClick={() => setLang('id')}>🇮🇩 ID</button>
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>🇬🇧 EN</button>
      </div>

      <div id="particles"></div>

      <div className="container">
        {/* WELCOME SCREEN */}
        {screen === 'welcome' && (
            <div id="welcomeScreen" className="screen active">
                <h1 dangerouslySetInnerHTML={{ __html: t.welcome.replace("Lombok Paradise", "<span class='highlight'>Lombok Paradise</span>") }}></h1>
                <p>{t.subtitle}</p>

                {/* React Carousel */}
                <div className="carousel-container" style={{ width: '100%', maxWidth: '800px', aspectRatio: '16/9', margin: '20px 0', borderRadius: '15px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                    
                    {/* Previous Button */}
                    <button 
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)} 
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', backdropFilter: 'blur(4px)' }}>
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <div className="carousel-track" style={{ display: 'flex', height: '100%', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentSlide * 100}%)` }}>
                        {Array.from({ length: totalSlides }).map((_, i) => {
                            const num = (i + 1).toString().padStart(2, '0');
                            return (
                                <img key={i} src={`/${num}.png`} alt={`Lombok View ${num}`} style={{ width: '100%', height: '100%', objectFit: 'cover', flexShrink: 0 }} 
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/800x450?text=Image+Missing'} />
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button 
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)} 
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', backdropFilter: 'blur(4px)' }}>
                        <i className="fas fa-chevron-right"></i>
                    </button>

                    {/* Dots */}
                    <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 2 }}>
                        {Array.from({ length: totalSlides }).map((_, i) => (
                             <div key={i} className="carousel-dot" style={{ 
                                 width: '8px', height: '8px', borderRadius: '50%', 
                                 background: currentSlide === i ? '#fff' : 'rgba(255,255,255,0.5)',
                                 transform: currentSlide === i ? 'scale(1.2)' : 'scale(1)',
                                 cursor: 'pointer'
                             }} onClick={() => setCurrentSlide(i)}></div>
                        ))}
                    </div>
                </div>

                <div className="lombok-info">
                    <h3>{t.why}</h3>
                    <ul>
                        {t.reasons.map((r: string, idx: number) => <li key={idx}>{r}</li>)}
                    </ul>
                </div>
                
                <button className="btn btn-primary" onClick={() => setScreen('search')}>
                    <i className="fas fa-play-circle"></i> {t.startBtn}
                </button>
            </div>
        )}

        {/* SEARCH SCREEN */}
        {screen === 'search' && (
            <div id="searchScreen" className="screen active">
                <div className="search-header">
                    <h2><i className="fas fa-search"></i> {t.explore}</h2>
                </div>

                <div className="search-box">
                    <input 
                      type="text" 
                      value={keyword} 
                      onChange={(e) => setKeyword(e.target.value)} 
                      onKeyUp={handleEnter}
                      placeholder={t.searchPlace} 
                    />
                    <button><i className="fas fa-search"></i> Cari</button>
                </div>

                {filteredData.activeRules.length > 0 && (
                    <div className="swrl-info active">
                        <h4><i className="fas fa-brain"></i> {t.swrlTitle}</h4>
                        <p>{lang === 'id' 
                            ? `Rule aktif: ${filteredData.activeRules.map((r:any) => r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(', ')}. Menampilkan rekomendasi berdasarkan kata kunci Anda.`
                            : `Active rules: ${filteredData.activeRules.map((r:any) => r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(', ')}. Showing recommendations based on your keywords.`}
                        </p>
                    </div>
                )}

                <div className="filter-section">
                    <div className="filter-group">
                        <label><i className="fas fa-map-marker-alt"></i> {t.locLabel}</label>
                        <select value={locFilter} onChange={(e) => setLocFilter(e.target.value)}>
                            <option value="all">{t.allLoc}</option>
                            <option value="Central_Lombok">{t.centralLombok}</option>
                            <option value="EastLombok">{t.eastLombok}</option>
                            <option value="NorthLombok">{t.northLombok}</option>
                            <option value="WestLombok">{t.westLombok}</option>
                            <option value="MataramCity">{t.mataramCity}</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label><i className="fas fa-bus"></i> {t.transLabel}</label>
                        <select value={transFilter} onChange={(e) => setTransFilter(e.target.value)}>
                            <option value="all">{t.allTrans}</option>
                            <option value="Car">{t.car}</option>
                            <option value="motorcyle">{t.motorcycle}</option>
                            <option value="bus">{t.bus}</option>
                            <option value="taxi">{t.taxi}</option>
                            <option value="boat">{t.boat}</option>
                            <option value="ferry">{t.ferry}</option>
                            <option value="speedboat">{t.speedboat}</option>
                            <option value="plane">{t.plane}</option>
                        </select>
                    </div>
                </div>

                <div className="category-filter">
                     {[
                        { id: 'all', icon: 'fa-globe', label: t.catAll },
                        { id: 'MarineTourism', icon: 'fa-umbrella-beach', label: t.catBeach },
                        { id: 'MountainTourism', icon: 'fa-mountain', label: t.catMountain },
                        { id: 'CulturalandReligiousTourism', icon: 'fa-landmark', label: t.catCulture },
                        { id: 'WaterfallTourism', icon: 'fa-water', label: t.catWaterfall },
                        { id: 'IslandTourism', icon: 'fa-tree', label: t.catIsland },
                        { id: 'CaveTourism', icon: 'fa-dungeon', label: t.catCave },
                        { id: 'Agrotourism', icon: 'fa-seedling', label: t.catAgro },
                        { id: 'CulinaryTourism', icon: 'fa-utensils', label: t.catCulinary },
                        { id: 'BathingTourism', icon: 'fa-swimming-pool', label: t.catBathing },
                        { id: 'ShoppingTour', icon: 'fa-shopping-bag', label: t.catShopping },
                        { id: 'NaturalTourism', icon: 'fa-leaf', label: t.catNature },
                        { id: 'TouristPark', icon: 'fa-tree', label: t.catPark },
                     ].map((cat) => (
                        <div key={cat.id} className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                            <i className={`fas ${cat.icon}`}></i> {cat.label}
                        </div>
                     ))}
                </div>

                <button className="btn btn-secondary" onClick={() => setScreen('welcome')} style={{ marginBottom: '15px' }}>
                    <i className="fas fa-arrow-left"></i> {t.backWelcome}
                </button>

                <div id="results">
                    {filteredData.data.length === 0 ? (
                         <div className='result' style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                             <h3>{t.noResult}</h3>
                         </div>
                    ) : (
                        filteredData.data.map((item: any, index: number) => {
                            const itemData = getItemData(item);
                            let imageUrl = item.img;
                            if (!imageUrl || !imageUrl.startsWith('http')) {
                                imageUrl = 'https://placehold.co/300x200/4a63e7/white?text=No+Image';
                            }
                            
                            const isSmart = filteredData.activeRules.length > 0;
                            const smartBadge = isSmart ? (lang === 'id' ? filteredData.activeRules[0].badgeId : filteredData.activeRules[0].badge) : null;

                            return (
                                <div key={index} className={`result ${isSmart ? 'smart-result' : ''}`}>
                                    {isSmart && <div className="smart-badge">{smartBadge}</div>}
                                    <h3>{item.name}</h3>
                                    <div style={{ height: '180px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                                        <img src={imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        onError={(e) => e.currentTarget.src = 'https://placehold.co/300x200/4a63e7/white?text=No+Image'} />
                                    </div>
                                    <span className="tag">{itemData.typeLabel}</span>
                                    <div className="info-row"><i className="fas fa-map-marker-alt" style={{ color: '#e91e63' }}></i><span>{itemData.location || 'Lombok'}</span></div>
                                    <div className="info-row"><i className="fas fa-tag" style={{ color: '#4caf50' }}></i><span>{formatPrice(itemData.price)}</span></div>
                                    {item.rating && (
                                        <div className="info-row"><i className="fas fa-star" style={{ color: '#ffd700' }}></i><span>{renderStars(item.rating)} ({item.rating})</span></div>
                                    )}
                                    <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {itemData.desc || t.noDesc}
                                    </p>
                                    <button className="btn btn-secondary" style={{ marginTop: '15px', padding: '10px 20px', fontSize: '14px', width: '100%', color: '#333', borderColor: '#ccc' }}
                                        onClick={() => setModalItem(item)}>
                                        <i className="fas fa-info-circle"></i> {t.moreDetails}
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {modalItem && (
          <div className="modal-overlay active" onClick={() => setModalItem(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                      <img 
                        className="modal-image" 
                        src={modalItem.img || 'https://placehold.co/700x400/4a63e7/white?text=No+Image'} 
                        alt="Destination"
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/700x400/4a63e7/white?text=No+Image'} 
                      />
                      <button className="modal-close" onClick={() => setModalItem(null)}><i className="fas fa-times"></i></button>
                  </div>
                  <div className="modal-body">
                      <h2 className="modal-title">{modalItem.name}</h2>
                      <div className="modal-type">{getItemData(modalItem).typeLabel}</div>

                      {modalItem.rating && (
                          <div className="modal-rating">
                              <span className="stars">{renderStars(modalItem.rating)}</span>
                              <span className="rating-value">{modalItem.rating}</span>
                          </div>
                      )}

                      <div className="modal-info-grid">
                          <div className="modal-info-item">
                              <label><i className="fas fa-map-marker-alt"></i> <span>{t.modalLocation}</span></label>
                              <p>{getItemData(modalItem).location || 'Lombok, Indonesia'}</p>
                          </div>
                          <div className="modal-info-item">
                              <label><i className="fas fa-clock"></i> <span>{t.modalHours}</span></label>
                              <p>{getItemData(modalItem).openingHours || t.noHours}</p>
                          </div>
                          <div className="modal-info-item">
                              <label><i className="fas fa-tag"></i> <span>{t.modalPrice}</span></label>
                              <p>{formatPrice(getItemData(modalItem).price)}</p>
                          </div>
                          <div className="modal-info-item">
                              <label><i className="fas fa-car"></i> <span>{t.modalTransport}</span></label>
                              <p>{translateTransport(modalItem.transport)}</p>
                          </div>
                      </div>

                      <div className="modal-section">
                          <h3 className="modal-section-title"><i className="fas fa-running"></i> <span>{t.modalActivities}</span></h3>
                          <p>{getItemData(modalItem).activity || t.noActivity}</p>
                      </div>

                      <div className="modal-section">
                          <h3 className="modal-section-title"><i className="fas fa-info-circle"></i> <span>{t.modalDesc}</span></h3>
                          <p>{getItemData(modalItem).desc || t.noDesc}</p>
                      </div>

                      <div className="modal-section">
                          <h3 className="modal-section-title"><i className="fas fa-concierge-bell"></i> <span>{t.modalFacilities}</span></h3>
                          <p>{getItemData(modalItem).facility || t.noFacility}</p>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </>
  );
}
