import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80',
  'https://images.unsplash.com/photo-1586771107445-d3ca888e1c0b?w=1200&q=80',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container bg-gray-900 py-20">
      <h2 className="text-4xl font-bold text-center text-green-400 mb-12">Our Gallery</h2>
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl">
        <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
        <button onClick={goToPrevious} className="carousel-control prev">&#10094;</button>
        <button onClick={goToNext} className="carousel-control next">&#10095;</button>
      </div>
    </div>
  );
};

export default Carousel;
