"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { dictionary } from '../dictionary';
import Carousel from './Carousel';

// SWRL Rules untuk smart search
const swrlRules: any = {
  holiday: { keywords: ['liburan', 'holiday', 'summer', 'vacation', 'libur', 'rekreasi'], types: ['Marine', 'Island', 'Park', 'Natural'], badge: '✨ Holiday Choice', badgeId: '✨ Pilihan Liburan' },
  budget: { keywords: ['murah', 'cheap', 'budget', 'hemat', 'gratis', 'free', 'affordable', 'terjangkau'], priceFilter: 'cheap', badge: '💰 Budget Friendly', badgeId: '💰 Hemat Budget' },
  expensive: { keywords: ['mahal', 'expensive', 'premium', 'luxury', 'mewah', 'eksklusif'], priceFilter: 'expensive', badge: '💎 Premium', badgeId: '💎 Wisata Premium' },
  family: { keywords: ['keluarga', 'family', 'kids', 'anak', 'children'], types: ['Park', 'Waterfall', 'Bathing', 'Island'], badge: '👨‍👩‍👧‍👦 Family Friendly', badgeId: '👨‍👩‍👧‍👦 Ramah Keluarga' },
  adventure: { keywords: ['petualangan', 'adventure', 'hiking', 'trekking', 'pendakian', 'extreme'], types: ['Mountain', 'Cave', 'Natural', 'Forrest'], badge: '🧗 Adventure Spot', badgeId: '🧗 Spot Petualangan' },
  culture: { keywords: ['budaya', 'culture', 'tradisi', 'sasak', 'adat', 'traditional'], types: ['Cultural', 'Village', 'Educational'], badge: '🏛️ Cultural Heritage', badgeId: '🏛️ Warisan Budaya' },
  religious: { keywords: ['religi', 'religious', 'spiritual', 'ibadah', 'temple', 'mosque', 'masjid', 'pura', 'ziarah'], types: ['Religious', 'Cultural'], badge: '🕌 Religious Tourism', badgeId: '🕌 Wisata Religi' },
  nature: { keywords: ['alam', 'nature', 'eco', 'green', 'hijau', 'forest', 'hutan', 'natural'], types: ['Natural', 'Forrest', 'Eco', 'Park', 'Waterfall', 'Mountain', 'Lake'], badge: '🌿 Nature Escape', badgeId: '🌿 Wisata Alam' },
  education: { keywords: ['edukasi', 'education', 'belajar', 'learn', 'museum', 'sejarah', 'history', 'pengetahuan'], types: ['Educational', 'Cultural', 'Agrotourism'], badge: '📚 Educational', badgeId: '📚 Wisata Edukasi' },
  popular: { keywords: ['populer', 'popular', 'terkenal', 'famous', 'top', 'terbaik', 'best', 'trending'], ratingFilter: 'high', badge: '⭐ Popular', badgeId: '⭐ Populer' },
  unpopular: { keywords: ['hidden', 'tersembunyi', 'rahasia', 'secret', 'sepi', 'quiet', 'underrated'], ratingFilter: 'low', badge: '🔍 Hidden Gem', badgeId: '🔍 Permata Tersembunyi' },
  relax: { keywords: ['relax', 'santai', 'spa', 'wellness', 'healing', 'pemandian', 'istirahat'], types: ['Bathing', 'Park', 'Island'], badge: '🧘 Relaxation', badgeId: '🧘 Relaksasi' },
  photo: { keywords: ['foto', 'photo', 'instagram', 'scenic', 'view', 'pemandangan', 'sunset'], types: ['Marine', 'Mountain', 'Island', 'Valley', 'Savana', 'Waterfall'], badge: '📸 Instagrammable', badgeId: '📸 Spot Foto' },
  water: { keywords: ['air', 'water', 'swim', 'berenang', 'snorkeling', 'diving', 'surfing', 'laut'], types: ['Marine', 'Island', 'Waterfall', 'Bathing', 'Lake'], badge: '🌊 Water Activities', badgeId: '🌊 Wisata Air' },
  food: { keywords: ['makanan', 'food', 'kuliner', 'culinary', 'makan', 'eat', 'restaurant', 'kopi'], types: ['Culinary'], badge: '🍜 Culinary Tour', badgeId: '🍜 Wisata Kuliner' },
  events: { keywords: ['event', 'acara', 'festival', 'perayaan', 'celebration', 'ceremony'], types: ['Events'], badge: '🎉 Events', badgeId: '🎉 Acara' }
};

// Terjemahan transportasi
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
  const [activeCategories, setActiveCategories] = useState<string[]>(['all']);
  const [modalItem, setModalItem] = useState<any>(null);

  const t = dictionary[lang];

  // Carousel images
  const carouselImages = [
    '/01.png',
    '/02.png',
    '/03.png',
    '/04.png',
    '/05.png'
  ];

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

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalItem(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Helper functions
  const translateTransport = (transport: string) => {
    if (!transport) return lang === 'id' ? 'Kendaraan Pribadi' : 'Private Vehicle';
    let translated = transport;
    Object.keys(transportTranslations).forEach(key => {
      const regex = new RegExp(key, 'gi');
      translated = translated.replace(regex, transportTranslations[key][lang]);
    });
    return translated;
  };

  const formatPrice = (price: string) => {
    if (!price || price === '') return t.free;
    if (price.includes(' - ') || price.includes('–') || price.includes('/') ||
      price.includes('weekday') || price.includes('weekend') ||
      price.includes('domestic') || price.includes('foreign') ||
      price.includes('wisatawan') || price.includes('tiket') ||
      price.includes('sewa') || price.includes('rental') ||
      price.length > 50) {
      return price;
    }
    const priceMatch = price.match(/^[\d.,]+$/);
    if (priceMatch) {
      const priceStr = price.replace(/\./g, '').replace(/,/g, '');
      const priceNum = parseInt(priceStr);
      if (priceNum && priceNum < 10000000) {
        return 'Rp ' + priceNum.toLocaleString('id-ID');
      }
    }
    if (price.toLowerCase().includes('free') || price === '0' || price.toLowerCase().includes('gratis')) {
      return t.free;
    }
    return price;
  };

  const extractVideoId = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  // Filtering Logic
  const filteredData = useMemo(() => {
    let filtered = initialData;

    // Active rules dari keyword
    let activeRules: any[] = [];
    for (const [ruleName, rule] of Object.entries(swrlRules)) {
      if (rule.keywords.some((kw: string) => keyword.toLowerCase().includes(kw))) {
        activeRules.push({ name: ruleName, ...rule });
      }
    }
    const isSmartSearchActive = activeRules.length > 0;

    filtered = filtered.filter((item) => {
      const itemData = {
        title: lang === 'id' ? item.nameId : item.nameEn,
        typeLabel: lang === 'id' ? item.typeLabelId : item.typeLabelEn,
        desc: lang === 'id' ? item.descId : item.descEn,
        activity: lang === 'id' ? item.activityId : item.activityEn,
        facility: lang === 'id' ? item.facilityId : item.facilityEn,
        price: lang === 'id' ? item.priceId : item.priceEn,
        openingHours: lang === 'id' ? item.openingHoursId : item.openingHoursEn,
        location: lang === 'id' ? item.locationId : item.locationEn,
      };

      // Category filter
      let passCategory = activeCategories.includes('all') ? true :
        activeCategories.some(cat => item.typeURI.includes(cat));

      // Location filter
      let passLocation = (locFilter === 'all') ? true : (item.locationURI || '').includes(locFilter);

      // Transport filter
      let passTransport = (transFilter === 'all') ? true : item.transport.toLowerCase().includes(transFilter.toLowerCase());

      // Keyword filter
      let passKeyword = true;
      if (!isSmartSearchActive && keyword !== "") {
        passKeyword = itemData.title.toLowerCase().includes(keyword.toLowerCase()) ||
          item.nameEn.toLowerCase().includes(keyword.toLowerCase()) ||
          item.nameId.toLowerCase().includes(keyword.toLowerCase()) ||
          itemData.desc.toLowerCase().includes(keyword.toLowerCase());
      }

      // Smart rule filter
      let passSmartRule = true;
      if (isSmartSearchActive) {
        passSmartRule = false;
        for (const rule of activeRules) {
          if (rule.types && rule.types.some((t: string) => item.typeURI.includes(t))) {
            passSmartRule = true;
            break;
          }
          if (rule.priceFilter === 'cheap') {
            let priceVal = parseInt(itemData.price.replace(/[^0-9]/g, '')) || 0;
            if (itemData.price.toLowerCase().includes('free') || itemData.price.toLowerCase().includes('gratis') || priceVal < 50000 || itemData.price === '') {
              passSmartRule = true;
              break;
            }
          }
          if (rule.priceFilter === 'expensive') {
            let priceVal = parseInt(itemData.price.replace(/[^0-9]/g, '')) || 0;
            if (priceVal >= 50000) {
              passSmartRule = true;
              break;
            }
          }
          if (rule.ratingFilter === 'high') {
            let ratingVal = parseFloat(item.rating) || 0;
            if (ratingVal >= 4.5) {
              passSmartRule = true;
              break;
            }
          }
          if (rule.ratingFilter === 'low') {
            let ratingVal = parseFloat(item.rating) || 0;
            if (ratingVal > 0 && ratingVal < 4.5) {
              passSmartRule = true;
              break;
            }
          }
        }
      }

      return passCategory && passLocation && passTransport && passKeyword && passSmartRule;
    });

    return { filtered, activeRules };
  }, [initialData, keyword, locFilter, transFilter, activeCategories, lang]);

  const setCategory = (cat: string) => {
    if (cat === 'all') {
      setActiveCategories(['all']);
    } else {
      let newCategories = activeCategories.filter(c => c !== 'all');
      if (newCategories.includes(cat)) {
        newCategories = newCategories.filter(c => c !== cat);
        if (newCategories.length === 0) {
          newCategories = ['all'];
        }
      } else {
        newCategories.push(cat);
      }
      setActiveCategories(newCategories);
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Trigger search - nothing to do, filtering is automatic
    }
  };

  return (
    <>
      <div id="particles"></div>

      <div className="language-switcher">
        <button className={`lang-btn ${lang === 'id' ? 'active' : ''}`} onClick={() => setLang('id')}>
          🇮🇩 ID
        </button>
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
          🇬🇧 EN
        </button>
      </div>

      <div className="container">
        {/* Welcome Screen */}
        <div id="welcomeScreen" className={`screen ${screen === 'welcome' ? 'active' : ''}`}>
          <h1 dangerouslySetInnerHTML={{ __html: t.welcome.replace("Lombok Paradise", "<span class='highlight'>Lombok Paradise</span>") }}></h1>
          <p>{t.subtitle}</p>

          <Carousel images={carouselImages} />

          <div className="lombok-info">
            <h3>{t.why}</h3>
            <ul>
              {t.reasons.map((reason: string, index: number) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>

          <button className="btn btn-primary" onClick={() => setScreen('search')}>
            <i className="fas fa-play-circle"></i> {t.startBtn}
          </button>
        </div>

        {/* Search Screen */}
        <div id="searchScreen" className={`screen ${screen === 'search' ? 'active' : ''}`}>
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
            <button onClick={() => { }}>
              <i className="fas fa-search"></i> Cari
            </button>
          </div>

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
            <div className={`category-btn ${activeCategories.includes('all') ? 'active' : ''}`} onClick={() => setCategory('all')}>
              <i className="fas fa-globe"></i> {t.catAll}
            </div>
            <div className={`category-btn ${activeCategories.includes('MarineTourism') ? 'active' : ''}`} onClick={() => setCategory('MarineTourism')}>
              <i className="fas fa-umbrella-beach"></i> {t.catBeach}
            </div>
            <div className={`category-btn ${activeCategories.includes('MountainTourism') ? 'active' : ''}`} onClick={() => setCategory('MountainTourism')}>
              <i className="fas fa-mountain"></i> {t.catMountain}
            </div>
            <div className={`category-btn ${activeCategories.includes('CulturalandReligiousTourism') ? 'active' : ''}`} onClick={() => setCategory('CulturalandReligiousTourism')}>
              <i className="fas fa-landmark"></i> {t.catCulture}
            </div>
            <div className={`category-btn ${activeCategories.includes('WaterfallTourism') ? 'active' : ''}`} onClick={() => setCategory('WaterfallTourism')}>
              <i className="fas fa-water"></i> {t.catWaterfall}
            </div>
            <div className={`category-btn ${activeCategories.includes('IslandTourism') ? 'active' : ''}`} onClick={() => setCategory('IslandTourism')}>
              <i className="fas fa-tree"></i> {t.catIsland}
            </div>
            <div className={`category-btn ${activeCategories.includes('CaveTourism') ? 'active' : ''}`} onClick={() => setCategory('CaveTourism')}>
              <i className="fas fa-dungeon"></i> {t.catCave}
            </div>
            <div className={`category-btn ${activeCategories.includes('Agrotourism') ? 'active' : ''}`} onClick={() => setCategory('Agrotourism')}>
              <i className="fas fa-seedling"></i> {t.catAgro}
            </div>
            <div className={`category-btn ${activeCategories.includes('CulinaryTourism') ? 'active' : ''}`} onClick={() => setCategory('CulinaryTourism')}>
              <i className="fas fa-utensils"></i> {t.catCulinary}
            </div>
            <div className={`category-btn ${activeCategories.includes('BathingTourism') ? 'active' : ''}`} onClick={() => setCategory('BathingTourism')}>
              <i className="fas fa-swimming-pool"></i> {t.catBathing}
            </div>
            <div className={`category-btn ${activeCategories.includes('ShoppingTour') ? 'active' : ''}`} onClick={() => setCategory('ShoppingTour')}>
              <i className="fas fa-shopping-bag"></i> {t.catShopping}
            </div>
            <div className={`category-btn ${activeCategories.includes('TouristPark') ? 'active' : ''}`} onClick={() => setCategory('TouristPark')}>
              <i className="fas fa-tree"></i> {t.catPark}
            </div>
            <div className={`category-btn ${activeCategories.includes('Events') ? 'active' : ''}`} onClick={() => setCategory('Events')}>
              <i className="fas fa-calendar-alt"></i> {t.catEvents}
            </div>
          </div>

          <button className="btn btn-secondary" onClick={() => setScreen('welcome')}>
            <i className="fas fa-arrow-left"></i> {t.backWelcome}
          </button>

          <div id="results">
            {filteredData.filtered.length === 0 ? (
              <div className='result' style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                <h3>{t.noResult}</h3>
              </div>
            ) : (
              filteredData.filtered.map((item, index) => {
                const itemData = {
                  title: lang === 'id' ? item.nameId : item.nameEn,
                  typeLabel: lang === 'id' ? item.typeLabelId : item.typeLabelEn,
                  desc: lang === 'id' ? item.descId : item.descEn,
                  price: lang === 'id' ? item.priceId : item.priceEn,
                  location: lang === 'id' ? item.locationId : item.locationEn,
                };

                let imageUrl = item.img && item.img.startsWith('http') ? item.img : 'https://placehold.co/300x200/4a63e7/white?text=No+Image';
                
                let smartBadge = "";
                let smartClass = "";
                if (filteredData.activeRules.length > 0) {
                  smartClass = "smart-result";
                  const badge = lang === 'id' ? filteredData.activeRules[0].badgeId : filteredData.activeRules[0].badge;
                  smartBadge = badge;
                }

                let ratingHtml = '';
                if (item.rating) {
                  const starCount = Math.round(parseFloat(item.rating));
                  for (let i = 0; i < 5; i++) {
                    ratingHtml += `<i class="fas fa-star" style="color: ${i < starCount ? '#ffd700' : '#ddd'}; font-size: 0.85rem;"></i>`;
                  }
                }

                return (
                  <div key={index} className={`result ${smartClass}`}>
                    {smartBadge && <div className="smart-badge">{smartBadge}</div>}
                    <h3>{itemData.title}</h3>
                    <div style={{ height: '180px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                      <img
                        src={imageUrl}
                        alt={itemData.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/300x200/4a63e7/white?text=No+Image'}
                      />
                    </div>
                    {item.video && extractVideoId(item.video) && (
                      <div style={{ width: '100%', marginTop: '10px', marginBottom: '15px' }}>
                        <div className="video-container">
                          <iframe
                            src={`https://www.youtube.com/embed/${extractVideoId(item.video)}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ border: 'none' }}
                          />
                        </div>
                      </div>
                    )}
                    <span className="tag">{itemData.typeLabel}</span>
                    <div className="info-row">
                      <i className="fas fa-map-marker-alt" style={{ color: '#e91e63' }}></i>
                      <span>{itemData.location || 'Lombok'}</span>
                    </div>
                    <div className="info-row">
                      <i className="fas fa-tag" style={{ color: '#4caf50' }}></i>
                      <span>{formatPrice(itemData.price)}</span>
                    </div>
                    {ratingHtml && (
                      <div className="info-row">
                        <i className="fas fa-star" style={{ color: '#ffd700' }}></i>
                        <span dangerouslySetInnerHTML={{ __html: `${ratingHtml} (${item.rating})` }}></span>
                      </div>
                    )}
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {itemData.desc || t.noDesc}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '10px 15px', fontSize: '14px', color: '#333', borderColor: '#ccc' }}
                        onClick={() => setModalItem(item)}
                      >
                        <i className="fas fa-info-circle"></i> {t.moreDetails}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalItem && (
        <div className="modal-overlay active" onClick={(e) => {
          if (e.target === e.currentTarget) setModalItem(null);
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <img
                className="modal-image"
                src={modalItem.img && modalItem.img.startsWith('http') ? modalItem.img : 'https://placehold.co/700x400/4a63e7/white?text=No+Image'}
                alt="Destination"
                onError={(e) => e.currentTarget.src = 'https://placehold.co/700x400/4a63e7/white?text=No+Image'}
              />
              <button className="modal-close" onClick={() => setModalItem(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{lang === 'id' ? modalItem.nameId : modalItem.nameEn}</h2>
              <div className="modal-type">{lang === 'id' ? modalItem.typeLabelId : modalItem.typeLabelEn}</div>

              {modalItem.rating && (
                <div className="modal-rating">
                  <span className="stars" dangerouslySetInnerHTML={{
                    __html: Array.from({ length: 5 }, (_, i) =>
                      `<i class="fas fa-star" style="color: ${i < Math.round(parseFloat(modalItem.rating)) ? '#ffc107' : '#ddd'}"></i>`
                    ).join('')
                  }}></span>
                  <span className="rating-value">{modalItem.rating}</span>
                </div>
              )}

              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <label><i className="fas fa-map-marker-alt"></i> {t.modalLocation}</label>
                  <p>{lang === 'id' ? modalItem.locationId : modalItem.locationEn || 'Lombok, Indonesia'}</p>
                </div>
                <div className="modal-info-item">
                  <label><i className="fas fa-clock"></i> {t.modalHours}</label>
                  <p>{lang === 'id' ? modalItem.openingHoursId : modalItem.openingHoursEn || t.noHours}</p>
                </div>
                <div className="modal-info-item">
                  <label><i className="fas fa-tag"></i> {t.modalPrice}</label>
                  <p>{formatPrice(lang === 'id' ? modalItem.priceId : modalItem.priceEn)}</p>
                </div>
                <div className="modal-info-item">
                  <label><i className="fas fa-car"></i> {t.modalTransport}</label>
                  <p>{translateTransport(modalItem.transport)}</p>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">
                  <i className="fas fa-running"></i> {t.modalActivities}
                </h3>
                <p>{lang === 'id' ? modalItem.activityId : modalItem.activityEn || t.noActivity}</p>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">
                  <i className="fas fa-info-circle"></i> {t.modalDesc}
                </h3>
                <p>{lang === 'id' ? modalItem.descId : modalItem.descEn || t.noDesc}</p>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">
                  <i className="fas fa-concierge-bell"></i> {t.modalFacilities}
                </h3>
                <p>{lang === 'id' ? modalItem.facilityId : modalItem.facilityEn || t.noFacility}</p>
              </div>

              {modalItem.video && extractVideoId(modalItem.video) && (
                <div className="modal-section">
                  <h3 className="modal-section-title">
                    <i className="fas fa-video"></i> Video
                  </h3>
                  <div className="video-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractVideoId(modalItem.video)}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {modalItem.timeEvents && (
                <div className="modal-section">
                  <h3 className="modal-section-title">
                    <i className="fas fa-calendar-alt"></i> {t.eventTime}
                  </h3>
                  <p>{modalItem.timeEvents}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
