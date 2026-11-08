import React from 'react';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import AboutSection from './sections/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import CleaningProcess from './components/CleaningProcess';
import TestimonialsSlider from './components/TestimonialsSlider';
import BookingCTA from './components/BookingCTA';
import TipsSection from './sections/TipsSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <BookingProvider>
      <div className="cleaning-service-app">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="main-content" tabIndex={-1}>
          {/* 1. Hero Section Slider */}
          <HeroSlider />

          {/* 2. About Cleaning Service */}
          <AboutSection />

          {/* 3. Tailored Cleaning Services */}
          <ServicesSection />

          {/* 4. Why Choose Cleaning Service Feature Band */}
          <WhyChooseUs />

          {/* 5. Our Cleaning Process (4 Steps) */}
          <CleaningProcess />

          {/* 6. Client Testimonials Slider */}
          <TestimonialsSlider />

          {/* 7. Primary Call to Action Banner */}
          <BookingCTA />

          {/* 8. Cleaning Tips & Editorial Articles */}
          <TipsSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll Back to Top Button */}
        <BackToTop />
      </div>
    </BookingProvider>
  );
}

