import { useState } from 'react'

function BrandLogo({ url, name }) {
  const [failed, setFailed] = useState(false)
  let domain = null
  try { domain = url ? new URL(url).hostname.replace('www.', '') : null } catch {}
  if (!domain || failed) return (
    <div className="brand-logo brand-logo--fallback">{name ? name[0].toUpperCase() : '?'}</div>
  )
  return (
    <img className="brand-logo" src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`} onError={() => setFailed(true)} />
  )
}

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false)
  if (!url) return null
  const copy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }
  return (
    <button className="icon-btn" onClick={copy} title="Copy link" aria-label="Copy link">
      {copied ? '✓' : '⎘'}
    </button>
  )
}

export default function ProductCard({ product, onBookmark, isBookmarked, compact }) {
  return (
    <article className={`product-card ${compact ? 'product-card--compact' : ''}`}>
      <div className="product-card__top">
        <BrandLogo url={product.studentDiscountLink} name={product.name} />
        <div className="product-card__header">
          <h3 className="product-card__name">{product.name}</h3>
          {product.bestFor && <span className="product-card__tag">{product.bestFor}</span>}
        </div>
        <div className="product-card__price">{product.priceRange}</div>
        {onBookmark && (
          <button
            className={`icon-btn ${isBookmarked ? 'icon-btn--active' : ''}`}
            onClick={onBookmark} title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
          >{isBookmarked ? '★' : '☆'}</button>
        )}
      </div>
      {!compact && product.specs && <p className="product-card__specs">{product.specs}</p>}
      {product.studentDiscount && (
        <div className="product-card__discount">🎓 {product.studentDiscount}</div>
      )}
      {!compact && (
        <div className="product-card__actions">
          {product.studentDiscountLink && (
            <a href={product.studentDiscountLink} target="_blank" rel="noreferrer" className="btn btn--primary btn--small">
              Get discount
            </a>
          )}
          {product.checkPriceLink && (
            <a href={product.checkPriceLink} target="_blank" rel="noreferrer" className="btn btn--ghost btn--small">
              Compare prices
            </a>
          )}
          <CopyButton url={product.studentDiscountLink} />
        </div>
      )}
    </article>
  )
}
