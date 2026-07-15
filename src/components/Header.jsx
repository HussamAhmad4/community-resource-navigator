const MODE_META = {
  deals:     { icon: '🛍️', label: 'Deal Finder' },
  campus:    { icon: '🎓', label: 'Campus Finder' },
  resources: { icon: '🧭', label: 'Resource Guide' },
}

export default function Header({ mode, onBack, onReset, hasConversation, bookmarkCount, onBookmarksToggle }) {
  const meta = MODE_META[mode] || MODE_META.resources
  return (
    <header className="app-header">
      <div className="app-header__left">
        <button type="button" className="btn btn--icon" onClick={onBack} aria-label="Back to tools">←</button>
        <div className="app-header__brand">
          <span className="app-header__mode-icon">{meta.icon}</span>
          <div>
            <h1>{meta.label}</h1>
            <p>Community Resource Navigator</p>
          </div>
        </div>
      </div>
      <div className="app-header__right">
        {hasConversation && (
          <button type="button" className="btn btn--ghost" onClick={onReset}>New chat</button>
        )}
        <button
          type="button"
          className={`btn btn--icon bookmark-toggle ${bookmarkCount > 0 ? 'bookmark-toggle--has' : ''}`}
          onClick={onBookmarksToggle}
          aria-label={`Bookmarks${bookmarkCount > 0 ? ` (${bookmarkCount})` : ''}`}
        >
          ★
          {bookmarkCount > 0 && <span className="bookmark-badge">{bookmarkCount}</span>}
        </button>
      </div>
    </header>
  )
}
