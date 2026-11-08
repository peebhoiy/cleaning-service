import React from 'react';
import { Home, Building2, Sparkles, Check, ArrowRight, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const iconMap = {
  Home,
  Building2,
  Sparkles
};

export default function ServiceCard({ service }) {
  const { handleBookAppointment } = useBooking();
  const IconComponent = iconMap[service.iconName] || Sparkles;

  return (
    <article className="service-card">
      <div className="service-card-media">
        <img
          src={service.image}
          alt={service.alt}
          className="service-card-img"
          loading="lazy"
        />
        <span className="service-badge-pill">{service.badgeLabel}</span>
        <div className="service-icon-floating" aria-hidden="true">
          <IconComponent size={24} />
        </div>
      </div>

      <div className="service-card-body">
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-subtitle">{service.subtitle}</p>
        <p className="service-card-description">{service.description}</p>

        <ul className="service-features-list">
          {service.features.map((feature, idx) => (
            <li key={idx} className="service-feature-item">
              <Check size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="btn btn-outline service-card-cta"
          onClick={handleBookAppointment}
        >
          <Calendar size={15} />
          <span>Book Service</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

