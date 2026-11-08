import React from 'react';
import { ShieldCheck, Gem, Clock, Smile, Calendar, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function WhyChooseUs() {
  const { handleBookAppointment } = useBooking();

  const features = [
    {
      icon: ShieldCheck,
      title: 'Professional &\nTrustworthy',
      desc: 'Rigorously vetted, trustworthy personnel with comprehensive background checks.'
    },
    {
      icon: Gem,
      title: 'Attention to\nDetail',
      desc: 'Precision cleaning that never overlooks edges, crevices, or high-touch zones.'
    },
    {
      icon: Clock,
      title: 'Reliable &\nOn Time',
      desc: 'Punctual arrival and dependable schedules that respect your daily commitments.'
    },
    {
      icon: Smile,
      title: 'Customer\nSatisfaction',
      desc: 'Consistent 5-star standard with prompt follow-up and dedicated customer care.'
    }
  ];

  return (
    <section id="why-us" className="why-us-section" aria-label="Why Choose Cleaning Service">
      <div className="why-us-bg-accent" />
      <div className="container">
        <div className="why-us-container">
          {/* Left Intro */}
          <div className="why-us-intro">
            <span className="section-eyebrow" style={{ color: 'var(--color-gold-light)' }}>
              WHY CHOOSE CLEANING SERVICE
            </span>
            <h2>
              Experience the <span>Cleaning Service</span> Difference
            </h2>
            <p>
              We go beyond cleaning — we deliver peace of mind. Every visit is backed by exacting standards, specialized equipment, and a sincere commitment to your space's comfort and health.
            </p>
            <button
              type="button"
              className="btn btn-gold"
              onClick={handleBookAppointment}
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Features Grid */}
          <div className="why-us-features-grid">
            {features.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="why-us-feature-card">
                  <div className="why-feature-icon-wrapper" aria-hidden="true">
                    <IconComp size={26} />
                  </div>
                  <h3>
                    {item.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

