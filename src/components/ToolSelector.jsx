import { FEATURED_DEALS } from '../data/featuredDeals.js'

const TOOLS = [
  {
    mode: 'deals',
    icon: '🛍️',
    label: 'Deal Finder',
    desc: 'Student discounts on tech, software, and subscriptions',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.25)',
  },
  {
    mode: 'campus',
    icon: '🎓',
    label: 'Campus Finder',
    desc: 'Tutoring, scholarships, clubs, food pantries, and more',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.25)',
  },
  {
    mode: 'resources',
    icon: '🧭',
    label: 'Resource Guide',
    desc: 'Financial aid, healthcare, food, mental health, and more',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.25)',
  },
]

export default function ToolSelector({ onSelect }) {
  return (
    <div className="home">
      <div className="home__gradient-bg" aria-hidden="true" />
      <div className="home__hero">
        <span className="home__badge">For College Students &amp; Young Adults</span>
        <h1 className="home__title">
          Community<br />
          <span className="home__title-accent">Resource Navi</span>
        </h1>
        <p className="home__subtitle">
          AI-powered tools to find discounts, campus programs, and public benefits — through plain conversation.
        </p>
      </div>

      {/* Featured deals strip */}
      <div className="featured-strip" aria-label="Featured deals">
        <span className="featured-strip__label">⚡ Top deals</span>
        <div className="featured-strip__scroll">
          {FEATURED_DEALS.map((deal) => (
            <a
              key={deal.label}
              href={deal.url}
              target="_blank"
              rel="noreferrer"
              className="featured-chip"
              title={deal.desc}
            >
              {deal.label}
              <span className="featured-chip__tag">{deal.tag}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="tool-grid">
        {TOOLS.map((tool, i) => (
          <button
            key={tool.mode}
            type="button"
            className="tool-card"
            style={{
              '--card-accent': tool.accent,
              '--card-glow': tool.glow,
              '--delay': `${i * 0.08}s`,
            }}
            onClick={() => onSelect(tool.mode)}
          >
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
