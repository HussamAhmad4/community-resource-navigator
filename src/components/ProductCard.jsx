import { useState } from 'react'

function BrandLogo({ url, name }) {
  const [failed, setFailed] = useState(false)
  let domain = null
  try { domain = url ? new URL(url).hostname.replace('www.', '') : null } catch {}
  if (!domain || failed) {
    return (
      <div className="brand-logo brand-logo--fallback">
        {name ? name[0].toUpperCase() : '?'}
      </div>
    )
  }
  return (
    <img
      className="brand-logo"
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
    />
  )
}

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__top">
        <BrandLogo url={product.studentDiscountLink} name={product.name} />
        <div className="product-card__header">
          <h3 className="product-card__name">{product.name}</h3>
          {product.bestFor && <span className="product-card__tag">{product.bestFor}</span>}
        </div>
        <div className="product-card__price">{product.priceRange}</div>
      </div>
      {product.specs && <p className="product-card__specs">{product.specs}</p>}
      {product.studentDiscount && (
        <div className="product-card__discount">🎓 {product.studentDiscount}</div>
      )}
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
        {product.amazonLink && (
          <a href={product.amazonLink} target="_blank" rel="noreferrer" className="btn btn--ghost btn--small">
            Amazon
          </a>
        )}
      </div>
    </article>
  )
}
