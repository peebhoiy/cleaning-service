import React from 'react';
import placeholderLogo from '../assets/logo/placeholder-logo.svg';

export default function Logo({ variant = 'light', className = '' }) {
  const textColor = variant === 'light' ? 'var(--color-white)' : 'var(--color-navy-primary)';
  const subtextColor = variant === 'light' ? 'var(--color-text-inverse-muted)' : 'var(--color-text-muted)';

  return (
    <div className={`brand-logo-lockup ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <img
        src={placeholderLogo}
        alt="Cleaning Service Logo"
        className="brand-logo-img"
        style={{ height: '42px', width: '42px', objectFit: 'contain', display: 'block' }}
      />
      <div className="brand-text-lockup" style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          className="brand-name"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: textColor,
          }}
        >
          Cleaning Service
        </span>
        <span
          className="brand-subtext"
          style={{
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: subtextColor,
            marginTop: '2px',
          }}
        >
          Cleaning Services
        </span>
      </div>
    </div>
  );
}

