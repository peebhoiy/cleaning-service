import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';
import { useBooking } from '../context/BookingContext';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const sliderRef = useRef(null);
  const { handleBookAppointment } = useBooking();

  const totalSlides = heroSlides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Autoplay with hover/focus pause & reduced motion check
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  // Keyboard navigation when slider has focus
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section
      id="home"
      className="hero-slider-section"
      ref={sliderRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Cleaning Services"
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`hero-slide ${isActive ? 'active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${totalSlides}: ${slide.category}`}
            aria-hidden={!isActive}
          >
            <div className="hero-bg-container">
              <img
                src={slide.image}
                alt={slide.altText}
                className="hero-bg-image"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="hero-overlay" />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
              <div className="hero-content-wrapper">
                <span className="hero-badge">{slide.eyebrow}</span>
                <h1 className="hero-headline">
                  {slide.headlinePrefix}
                  <span className="highlight">{slide.headlineHighlight}</span>
                </h1>
                <p className="hero-description">{slide.description}</p>
                <div className="hero-cta-group">
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={handleBookAppointment}
                  >
                    <Calendar size={18} />
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="#services"
                    className="btn btn-outline"
                    style={{ color: 'var(--color-white)', borderColor: 'rgba(255, 255, 255, 0.4)' }}
                  >
                    <span>Explore Services</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Previous Arrow */}
      <button
        type="button"
        className="hero-nav-arrow prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Arrow */}
      <button
        type="button"
        className="hero-nav-arrow next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="hero-indicators" role="tablist" aria-label="Slide Selection">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.category}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>

      {/* Sweeping Gold / White Curve at Hero Bottom */}
      <div className="hero-bottom-curve" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Subtle gold accent wave */}
          <path
            d="M0 60C320 20 640 75 960 40C1160 18 1320 30 1440 25V80H0V60Z"
            fill="var(--color-gold-light)"
            fillOpacity="0.4"
          />
          {/* Main crisp white section transition wave */}
          <path
            d="M0 70C360 30 720 85 1080 45C1240 25 1360 38 1440 32V80H0V70Z"
            fill="var(--color-white)"
          />
        </svg>
      </div>
    </section>
  );
}

