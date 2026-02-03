"use client";

import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export default function Carousel({ images, autoPlayInterval = 3000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [totalSlides, autoPlayInterval]);

  const changeSlide = (direction: number) => {
    setCurrentSlide((prev) => {
      const newSlide = (prev + direction + totalSlides) % totalSlides;
      return newSlide;
    });
  };

  const setSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-nav-btn left" onClick={() => changeSlide(-1)}>
        <i className="fas fa-chevron-left"></i>
      </button>

      <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Lombok View ${index + 1}`}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/800x450/4a63e7/white?text=Image+Missing';
            }}
          />
        ))}
      </div>

      <button className="carousel-nav-btn right" onClick={() => changeSlide(1)}>
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
