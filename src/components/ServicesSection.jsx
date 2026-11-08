import React from 'react';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

export default function ServicesSection() {
  return (
    <section id="services" className="services-section" aria-label="Our Cleaning Services">
      <div className="container">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Tailored Cleaning Solutions for Every Space"
          subtitle="Explore our comprehensive range of specialized cleaning treatments formulated for residences, commercial enterprises, and high-demand environments."
          align="center"
        />

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

