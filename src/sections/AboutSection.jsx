import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const handleScrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="about-section" aria-label="About Cleaning Service">
      <div className="container">
        <div className="about-grid">
          {/* Left: Visual Collage */}
          <div className="about-collage">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
              alt="Bright, pristine modern living room with comfortable sofa"
              className="about-img-main"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80"
              alt="Immaculate corporate workspace interior"
              className="about-img-sub"
              loading="lazy"
            />
            <div className="about-badge-accent" aria-hidden="true">
              <Sparkles size={28} />
            </div>
          </div>

          {/* Right: Messaging */}
          <div className="about-content">
            <span className="section-eyebrow">ABOUT CLEANING SERVICE</span>
            <h2>Your Trusted Cleaning Partner</h2>
            <p className="about-text-lead">
              At Cleaning Service, we are committed to delivering exceptional cleaning services that create clean, comfortable and healthy spaces.
            </p>
            <p className="about-text-secondary">
              Whether you need regular residential care for your family home, tailored janitorial maintenance for your enterprise, or an intensive deep cleaning overhaul, our trained and dedicated cleaning specialists use proven methods and premium supplies to leave every surface immaculate.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-navy-primary)', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="var(--color-gold-primary)" />
                <span>Vetted, background-checked and professionally trained cleaners</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-navy-primary)', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="var(--color-gold-primary)" />
                <span>Tailored cleaning checklists customized to your space</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-navy-primary)', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="var(--color-gold-primary)" />
                <span>Eco-friendly, non-toxic sanitizing products for peace of mind</span>
              </div>
            </div>

            <a
              href="#services"
              className="btn btn-outline"
              onClick={handleScrollToServices}
            >
              <span>Learn More</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
