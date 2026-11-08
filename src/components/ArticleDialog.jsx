import React, { useEffect, useRef } from 'react';
import { X, Calendar, Clock, Tag } from 'lucide-react';

export default function ArticleDialog({ article, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content-card" ref={modalRef} style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-gold-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'var(--color-gold-soft)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-pill)'
              }}
            >
              {article.category}
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close article"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <h2
            id="article-dialog-title"
            style={{
              fontSize: '1.65rem',
              color: 'var(--color-navy-primary)',
              lineHeight: 1.25,
              marginBottom: '1rem'
            }}
          >
            {article.title}
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--color-border-light)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} />
              {article.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>

          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.75rem' }}>
            <img
              src={article.image}
              alt={article.alt}
              style={{ width: '100%', maxHeight: '320px', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--color-text-main)', lineHeight: 1.7 }}>
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-navy"
              onClick={onClose}
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

