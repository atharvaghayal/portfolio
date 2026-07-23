import React, { useState } from 'react';
import './ChromaGrid.css';
import externalIcon from '../../assets/external-link.svg';

export const ChromaGrid = ({
  items = [],
  className = '',
  columns = 3,
  onProjectClick
}) => {
  const handleCardClick = (item, e) => {
    // If it's the external link icon, let it do its thing via href, but if it's the card, open modal
    if (onProjectClick) {
      onProjectClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`chroma-grid ${className}`}
      style={{
        '--cols': columns
      }}
    >
      {items.map((c, i) => (
        <article
          key={i}
          className={`chroma-card ${c.isBlankCanvas ? 'blank-canvas-card' : ''}`}
          onClick={(e) => handleCardClick(c, e)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default'
          }}
        >
          {c.isBlankCanvas ? (
            <div className="blank-canvas-surface" aria-label={c.title} />
          ) : (
            <>
              <div className="chroma-img-wrapper">
                <ImageWithSkeleton src={c.image} alt={c.title} />
              </div>
              <footer className="chroma-info">
                <h3 className="name">{c.title}</h3>
                {c.handle && <span className="handle">{c.handle}</span>}
                <p className="role">{c.subtitle}</p>
                {c.location && <span className="location">{c.location}</span>}
              </footer>
              <a
                className={`chroma-external-link ${c.url ? '' : 'disabled'}`}
                href={c.url || '#'}
                target={c.url ? '_blank' : undefined}
                rel={c.url ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!c.url) e.preventDefault();
                }}
                aria-label={c.url ? `Open ${c.title} in new tab` : `${c.title} link not available`}
                aria-disabled={!c.url}
                tabIndex={c.url ? 0 : -1}
              >
                <img src={externalIcon} alt="" width="16" height="16" aria-hidden="true" />
              </a>
            </>
          )}
        </article>
      ))}
    </div>
  );
};

const ImageWithSkeleton = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <div className="chroma-img-skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? 'loaded' : 'loading'}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </>
  );
};

export default ChromaGrid;
