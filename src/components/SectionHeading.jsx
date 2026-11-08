import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleColor,
  textColor,
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`section-heading-box ${className}`}
      style={{
        textAlign: align,
        marginBottom: isCenter ? '3.5rem' : '1.75rem',
        maxWidth: isCenter ? '680px' : 'none',
        marginLeft: isCenter ? 'auto' : '0',
        marginRight: isCenter ? 'auto' : '0'
      }}
    >
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2
        style={{
          fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: titleColor || 'var(--color-navy-primary)',
          marginBottom: subtitle ? '0.75rem' : '0'
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: textColor || 'var(--color-text-muted)',
            marginTop: '0.5rem'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

