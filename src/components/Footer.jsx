import React from 'react';
import { siteConfig } from '../config/siteConfig';
import Logo from './Logo';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function XIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
    </svg>
  );
}

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
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
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* Top Row: Logo, Navigation, Socials */}
        <div className="footer-top-row">
          {/* Logo & Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <Logo variant="light" />
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginTop: '1rem', lineHeight: '1.6' }}>
              Professional residential, commercial, and deep cleaning services delivering spotless spaces and peace of mind.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="footer-nav" aria-label="Footer Navigation">
            {siteConfig.navLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
                {idx < siteConfig.navLinks.length - 1 && (
                  <span className="footer-nav-separator">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Social Channels */}
          <div className="footer-socials">
            <span className="footer-social-label">Follow Us:</span>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Cleaning Service on Instagram"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Cleaning Service on X (formerly Twitter)"
            >
              <XIcon size={15} />
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Cleaning Service on Facebook"
            >
              <FacebookIcon size={17} />
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Cleaning Service on YouTube"
            >
              <YoutubeIcon size={17} />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Slogan */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</p>
          <span className="footer-slogan">{siteConfig.tagline}</span>
          <p className="footer-dev-credit">
            Site developed by{' '}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
