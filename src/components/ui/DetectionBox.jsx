/**
 * The recurring motif: four corner brackets plus a class label and a
 * confidence score, the way a detector draws what it has found.
 */
export default function DetectionBox({
  label,
  conf,
  accent = 'signal',
  locked = false,
  className = '',
  children,
}) {
  const cls = [
    'det',
    accent === 'amber' ? 'det--amber' : '',
    locked ? 'is-locked' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls}>
      {label && (
        <span className="det__label" aria-hidden="true">
          {label}
          {conf && <span className="det__conf">{conf}</span>}
        </span>
      )}
      <span className="det__corner tl" aria-hidden="true" />
      <span className="det__corner tr" aria-hidden="true" />
      <span className="det__corner bl" aria-hidden="true" />
      <span className="det__corner br" aria-hidden="true" />
      {children}
    </div>
  )
}
