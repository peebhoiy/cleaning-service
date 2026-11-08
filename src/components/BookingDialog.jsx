import React, { useEffect, useRef } from 'react';
import { X, Calendar, Phone, Mail, Clock, MapPin, CheckCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function BookingDialog({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content-card" ref={dialogRef}>
        <div className="modal-header" style={{ background: 'var(--color-navy-primary)', color: 'var(--color-white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Calendar size={20} color="var(--color-gold-light)" />
            <h2 id="booking-modal-title" className="modal-title" style={{ color: 'var(--color-white)', fontSize: '1.2rem' }}>
              Schedule Your Cleaning Appointment
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close booking dialog"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-white)' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '2rem' }}>
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--color-gold-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(210, 154, 50, 0.3)',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start'
            }}
          >
            <CheckCircle size={22} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: 'var(--color-navy-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                Instant Booking Notice
              </h4>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.86rem', lineHeight: '1.5' }}>
                Our online booking schedule is being finalized. In the meantime, you can reach our dispatch desk directly to secure your preferred date and time immediately!
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-navy-primary)' }}>
            Direct Contact Options
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: 'var(--color-navy-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-light)')}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-dark)'
                }}
              >
                <Phone size={20} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  CALL FOR IMMEDIATE BOOKING
                </span>
                <strong style={{ fontSize: '1.05rem' }}>{siteConfig.contact.phone}</strong>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.contact.email}?subject=Cleaning%20Appointment%20Inquiry`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: 'var(--color-navy-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-light)')}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-dark)'
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  EMAIL RESERVATIONS
                </span>
                <strong style={{ fontSize: '1.05rem' }}>{siteConfig.contact.email}</strong>
              </div>
            </a>
          </div>

          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={15} color="var(--color-gold-dark)" />
              <span>{siteConfig.contact.workingHours}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={15} color="var(--color-gold-dark)" />
              <span>{siteConfig.contact.location}</span>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-navy"
              onClick={onClose}
              style={{ width: '100%', padding: '0.8rem' }}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

