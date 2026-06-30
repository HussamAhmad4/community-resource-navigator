import { useState } from 'react'

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false)
  if (!url) return null
  const copy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }
  return (
    <button className="icon-btn" onClick={copy} title="Copy link" aria-label="Copy link">
      {copied ? "✓" : "⎘"}
    </button>
  )
}

export default function ResourceCard({ resource, onBookmark, isBookmarked, compact }) {
  return (
    <article className={`resource-card ${compact ? "resource-card--compact" : ""}`}>
      <div className="resource-card__header-row">
        <div>
          <span className="resource-card__category">{resource.category}</span>
          <h3>{resource.name}</h3>
        </div>
        {onBookmark && (
          <button
            className={`icon-btn ${isBookmarked ? "icon-btn--active" : ""}`}
            onClick={onBookmark} title={isBookmarked ? "Bookmarked" : "Bookmark"}
          >{isBookmarked ? "★" : "☆"}</button>
        )}
      </div>
      <p className="resource-card__desc">{resource.shortDescription}</p>
      {!compact && <p className="resource-card__who"><strong>Who it's for:</strong> {resource.whoItsFor}</p>}
      {!compact && (
        <div className="resource-card__actions">
          <a href={resource.link} target="_blank" rel="noreferrer" className="btn btn--primary btn--small">
            Learn more / Apply
          </a>
          {resource.phone && <a href={`tel:${resource.phone.replace(/[^\d+]/g, "")}`} className="resource-card__phone">Call {resource.phone}</a>}
          <CopyButton url={resource.link} />
        </div>
      )}
    </article>
  )
}
