export const SORT_OPTIONS = [
  { value: 'default', label: 'Best match' },
  { value: 'price-asc', label: 'Lowest price' },
  { value: 'price-desc', label: 'Highest price' },
  { value: 'name', label: 'A – Z' },
]

export function parseMinPrice(priceRange) {
  if (!priceRange) return Infinity
  const clean = priceRange.replace(/[^0-9.%]/g, ' ').trim()
  const nums = clean.match(/\d+(\.\d+)?/g)
  if (!nums) return 0
  return parseFloat(nums[0])
}

export function sortProducts(products, sort) {
  if (!products?.length) return products
  const copy = [...products]
  if (sort === 'price-asc') return copy.sort((a, b) => parseMinPrice(a.priceRange) - parseMinPrice(b.priceRange))
  if (sort === 'price-desc') return copy.sort((a, b) => parseMinPrice(b.priceRange) - parseMinPrice(a.priceRange))
  if (sort === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name))
  return copy
}

export default function ResultsFilter({ sort, onChange, count }) {
  return (
    <div className="results-filter">
      <span className="results-filter__count">{count} result{count !== 1 ? 's' : ''}</span>
      <div className="results-filter__controls">
        <span className="results-filter__label">Sort:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`filter-chip ${sort === opt.value ? 'filter-chip--active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
