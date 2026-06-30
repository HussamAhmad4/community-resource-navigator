import ResourceCard from './ResourceCard.jsx'
import ProductCard from './ProductCard.jsx'
import CampusProgramCard from './CampusProgramCard.jsx'

const TYPE_META = {
  deal:     '🛍️ Deal',
  program:  '🎓 Campus',
  resource: '🧭 Resource',
}

export default function BookmarksPanel({ bookmarks, onRemove, onClose }) {
  return (
    <>
      <div className="bookmarks-overlay" onClick={onClose} />
      <aside className="bookmarks-panel" role="dialog" aria-label="Bookmarks">
        <div className="bookmarks-panel__header">
          <h2>★ Bookmarks <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({bookmarks.length})</span></h2>
          <button className="btn btn--icon" onClick={onClose} aria-label="Close bookmarks">✕</button>
        </div>
        <div className="bookmarks-panel__body">
          {bookmarks.length === 0 ? (
            <div className="bookmarks-panel__empty">
              <span>☆</span>
              <p>No bookmarks yet.</p>
              <p style={{ marginTop: 6, fontSize: '0.82rem' }}>Tap ☆ on any result to save it here.</p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div key={b.id} className="bookmark-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="bookmark-item__type">{TYPE_META[b.type] || b.type}</span>
                  <button className="icon-btn" onClick={() => onRemove(b.id)} aria-label="Remove bookmark" style={{ fontSize: '0.75rem' }}>✕</button>
                </div>
                {b.type === 'deal'     && <ProductCard      product={b.data} compact />}
                {b.type === 'program'  && <CampusProgramCard program={b.data} compact />}
                {b.type === 'resource' && <ResourceCard      resource={b.data} compact />}
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
