import { useState } from 'react'
  { mode: 'deals', icon: '🛍️', label: 'Deal Finder', desc: 'Student discounts on tech, software & subscriptions', accent: '#818cf8', glow: 'rgba(129,140,248,0.25)', badge: null },
  { mode: 'campus', icon: '🎓', label: 'Campus Finder', desc: 'Tutoring, scholarships, food pantries, clubs at your school', accent: '#22d3ee', glow: 'rgba(34,211,238,0.25)', badge: null },
  { mode: 'cuny', icon: '🏫', label: 'CUNY Guide', desc: 'ASAP, SEEK, TAP, Excelsior, Single Stop & all CUNY programs', accent: '#f59e0b', glow: 'rgba(245,158,11,0.25)', badge: 'NYC' },
  { mode: 'opportunities', icon: '🚀', label: 'Student Opportunities', desc: 'Paid internships, scholarships, research programs & fellowships', accent: '#a855f7', glow: 'rgba(168,85,247,0.25)', badge: 'New' },
  { mode: 'resources', icon: '🧭', label: 'Resource Guide', desc: 'FAFSA, SNAP, Medicaid, mental health, legal aid — 28+ programs', accent: '#34d399', glow: 'rgba(52,211,153,0.25)', badge: null },
  ]

const DEAL_CATEGORIES = ['All', 'Free', 'CUNY', '$5.99/mo', '60% off', 'Free trial', '67% off']

export default function ToolSelector({ onSelect }) {
    const [dealFilter, setDealFilter] = useState('All')
    const [showCunySchools, setShowCunySchools] = useState(false)
    const filteredDeals = dealFilter === 'All' ? FEATURED_DEALS : FEATURED_DEALS.filter((d) => d.tag === dealFilter)

  return (
        <div className="home">
              <div className="home__gradient-bg" aria-hidden="true" />
              <div className="home__hero">
                      <span className="home__badge">For College Students &amp; Young Adults</span>
                      <h1 className="home__title">Community<br /><span className="home__title-accent">Resource Navi</span></h1>
                      <p className="home__subtitle">AI-powered tools to find discounts, campus programs, CUNY opportunities, and public benefits — through plain conversation.</p>
              </div>
        
              <div className="deal-filter-strip" aria-label="Filter deals">
                {DEAL_CATEGORIES.map((cat) => (
                    <button key={cat} type="button" className={`deal-filter-btn${dealFilter === cat ? ' deal-filter-btn--active' : ''}`} onClick={() => setDealFilter(cat)}>{cat}</button>
                  ))}
              </div>
        
              <div className="featured-strip" aria-label="Featured deals">
                      <span className="featured-strip__label">⚡ Top deals</span>
                      <div className="featured-strip__scroll">
                        {filteredDeals.map((deal) => (
                      <a key={deal.label} href={deal.url} target="_blank" rel="noreferrer" className={`featured-chip${deal.tag === 'CUNY' ? ' featured-chip--cuny' : ''}`} title={deal.desc}>
                        {deal.label}<span className="featured-chip__tag">{deal.tag}</span>
                      </a>
                    ))}
                      </div>
              </div>
        
              <div className="cuny-schools-section">
                      <button type="button" className="cuny-schools-toggle" onClick={() => setShowCunySchools((v) => !v)}>
                                🏫 {showCunySchools ? 'Hide' : 'Browse'} CUNY Schools ({CUNY_SCHOOLS.length}) <span>{showCunySchools ? '▲' : '▼'}</span>
                      </button>
                {showCunySchools && (
                    <div className="cuny-schools-grid">
                      {CUNY_SCHOOLS.map((school) => (
                                    <a key={school.name} href={school.url} target="_blank" rel="noreferrer" className="cuny-school-chip">
                                                    <span className="cuny-school-name">{school.name}</span><span className="cuny-school-borough">{school.borough}</span>
                                    </a>
                                  ))}
                    </div>
                      )}
              </div>
        
              <div className="tool-grid">
                {TOOLS.map((tool, i) => (
                    <button key={tool.mode} type="button" className="tool-card" style={{'--card-accent': tool.accent, '--card-glow': tool.glow, '--delay': `${i * 0.08}s`}} onClick={() => onSelect(tool.mode)}>
                      {tool.badge && <span className="tool-card__badge">{tool.badge}</span>}
                                <span className="tool-card__icon">{tool.icon}</span>
                                <h2 className="tool-card__label">{tool.label}</h2>
                                <p className="tool-card__desc">{tool.desc}</p>
                                <span className="tool-card__cta">Chat now →</span>
                    </button>
                  ))}
              </div>
        </div>
      )
}
