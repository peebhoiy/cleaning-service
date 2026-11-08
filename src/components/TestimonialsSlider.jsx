import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = testimonials.length;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextTestimonial();
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      aria-label="Client Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="testimonials-grid">
          {/* Left Intro */}
          <div className="testimonials-intro">
            <span className="section-eyebrow" style={{ color: 'var(--color-gold-light)' }}>
              WHAT OUR CLIENTS SAY
            </span>
            <h2>
              Trusted by Homes and Businesses
            </h2>
            <p style={{ color: 'var(--color-text-inverse-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
              Read direct feedback from residential homeowners and corporate facility managers who rely on Cleaning Service for regular maintenance and intensive deep cleaning.
            </p>
          </div>

          {/* Right: Testimonial Card */}
          <div className="testimonial-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--color-gold-light)" color="var(--color-gold-light)" />
                ))}
              </div>
              <Quote size={28} color="rgba(210, 154, 50, 0.4)" />
            </div>

            <blockquote className="testimonial-quote">
              "{current.quote}"
            </blockquote>

            <div className="testimonial-author-row">
              <div className="testimonial-author-meta">
                <img
                  src={current.avatar}
                  alt={`${current.author} photo`}
                  className="testimonial-avatar"
                  loading="lazy"
                />
                <div>
                  <h4 className="testimonial-author-name">{current.author}</h4>
                  <p className="testimonial-author-role">
                    {current.role} • {current.location}
                  </p>
                </div>
              </div>

              <div className="testimonial-controls">
                <button
                  type="button"
                  className="testimonial-nav-btn"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="testimonial-nav-btn"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

