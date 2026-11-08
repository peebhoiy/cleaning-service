import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useBooking } from '../context/BookingContext';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { handleBookAppointment } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'why-us', 'process', 'tips', 'testimonials'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
        role="banner"
      >
        <div className="container navbar-container">
          {/* Logo aligned to left */}
          <a
            href="#home"
            className="brand-logo-link"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Cleaning Service Home"
          >
            <Logo variant="light" />
          </a>

          {/* Desktop Navigation aligned to right */}
          <nav className="nav-desktop" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Prominent Gold Book Appointment Button */}
            <button
              type="button"
              className="btn btn-gold header-cta-btn"
              onClick={handleBookAppointment}
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open mobile navigation menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Accessible Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Mobile Navigation"
        aria-modal="true"
      >
        <div className="mobile-drawer-header">
          <Logo variant="light" />
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
            style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--color-white)' }}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {siteConfig.navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.85rem' }}
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleBookAppointment(e);
            }}
          >
            <Calendar size={18} />
            <span>Book Appointment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

