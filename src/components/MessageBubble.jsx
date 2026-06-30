import { useState } from 'react'
import ResourceCard from './ResourceCard.jsx'
import ProductCard from './ProductCard.jsx'
import CampusProgramCard from './CampusProgramCard.jsx'
import ResultsFilter, { sortProducts } from './ResultsFilter.jsx'

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  const [sort, setSort] = useState('default')

  const sortedProducts = sortProducts(message.products, sort)

  return (
    <div className={`message ${isUser ? 'message--user' : 'message--assistant'}`}>
      {!isUser && <div className="message__avatar" aria-hidden="true">N</div>}
      <div className="message__content">
        <div className={`bubble ${isUser ? 'bubble--user' : 'bubble--assistant'}`}>{message.content}</div>
        {!isUser && message.followUp && <div className="follow-up">{message.followUp}</div>}

        {!isUser && sortedProducts?.length > 0 && (
          <>
            <ResultsFilter sort={sort} onChange={setSort} count={sortedProducts.length} />
            <div className="result-list">
              {sortedProducts.map((p, i) => <ProductCard key={i} product={p} />)}
            </div>
          </>
        )}

        {!isUser && message.resources?.length > 0 && (
          <div className="result-grid">
            {message.resources.map((r) => <ResourceCard key={r.id} resource={r} />)}
          </div>
        )}

        {!isUser && message.programs?.length > 0 && (
          <div className="result-list">
            {message.programs.map((p, i) => <CampusProgramCard key={i} program={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
