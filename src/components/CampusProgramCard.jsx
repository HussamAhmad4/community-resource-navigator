import { useState } from 'react'

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

export default function CampusProgramCard({ program, onBookmark, isBookmarked, compact }) {
  return (
    <article className={`campus-card ${compact ? 'campus-card--compact' : ''}`}>
      <div className="campus-card__header-row">
        <div className="campus-card__header">
          <h3 className="campus-card__name">{program.name}</h3>
          {program.department && <span className="campus-card__dept">{program.department}</span>}
        </div>
        {onBookmark && (
          <button
            className={`icon-btn ${isBookmarked ? 'icon-btn--active' : ''}`}
            onClick={onBookmark} title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
          >{isBookmarked ? '★' : '☆'}</button>
        )}
      </div>
      <p className="campus-card__desc">{program.description}</p>
      {!compact && program.howToAccess && (
        <p className="campus-card__how"><strong>How to access:</strong> {program.howToAccess}</p>
      )}
      {!compact && (
        <div className="campus-card__actions">
          {program.directLink && (
            <a href={program.directLink} target="_blank" rel="noreferrer" className="btn btn--primary btn--small">Visit page</a>
          )}
          {program.searchLink && (
            <a href={program.searchLink} target="_blank" rel="noreferrer" className="btn btn--ghost btn--small">Search Google</a>
          )}
          <CopyButton url={program.directLink || program.searchLink} />
        </div>
      )}
    </article>
  )
}
