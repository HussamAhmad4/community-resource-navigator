export default function SkeletonCard({ type = 'product' }) {
  if (type === 'product') return (
    <div className="skeleton-card">
      <div className="skeleton-card__top">
        <div className="skeleton skeleton--avatar" />
        <div className="skeleton-card__lines">
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--tag" />
        </div>
        <div className="skeleton skeleton--price" />
      </div>
      <div className="skeleton skeleton--body" />
      <div className="skeleton skeleton--actions" />
    </div>
  )
  if (type === 'resource') return (
    <div className="skeleton-card skeleton-card--resource">
      <div className="skeleton skeleton--tag" />
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--body" />
      <div className="skeleton skeleton--actions" />
    </div>
  )
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__lines">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--tag" />
      </div>
      <div className="skeleton skeleton--body" />
      <div className="skeleton skeleton--actions" />
    </div>
  )
}
