import { useState } from 'react'
import ResourceCard from './ResourceCard.jsx'
import ProductCard from './ProductCard.jsx'
import CampusProgramCard from './CampusProgramCard.jsx'
import ResultsFilter, { sortProducts } from './ResultsFilter.jsx'

export default function MessageBubble({ message, bookmarkHandlers }) {
  const isUser = message.role === 'user'
  const [sort, setSort] = useState('default')

  const sortedProducts = sortProducts(message.products, sort)
  const { add, remove, isBookmarked } = bookmarkHandlers || {}

  const mkBookmark = (type, item) => ({
    onBookmark: add
      ? () => {
          const name = item.name || item.id
          isBookmarked(name)
            ? remove(bookmarkHandlers.bookmarks?.find((b) => b.data?.name === name || b.data?.id === name)?.id)
            : add(type, item)
        }
      : null,
    isBookmarked: isBookmarked ? isBookmarked(item.name || item.id) : false,
  })

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
              {sortedProducts.map((p, i) => (
                <ProductCard key={i} product={p} {...mkBookmark('deal', p)} />
              ))}
            </div>
          </>
        )}

        {!isUser && message.resources?.length > 0 && (
          <div className="result-grid">
            {message.resources.map((r) => (
              <ResourceCard key={r.id} resource={r} {...mkBookmark('resource', r)} />
            ))}
          </div>
        )}

        {!isUser && message.programs?.length > 0 && (
          <div className="result-list">
            {message.programs.map((p, i) => (
              <CampusProgramCard key={i} program={p} {...mkBookmark('program', p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
