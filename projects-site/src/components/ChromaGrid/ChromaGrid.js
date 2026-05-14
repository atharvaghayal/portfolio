import './ChromaGrid.css';
import externalIcon from '../../assets/external-link.svg';

export const ChromaGrid = ({
  items = [],
  className = '',
  columns = 3
}) => {
  const handleCardClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
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
          className="chroma-card"
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default'
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
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
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
