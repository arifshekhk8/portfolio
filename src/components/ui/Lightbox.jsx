import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react'

const BASE = import.meta.env.BASE_URL

export default function Lightbox({ items, index, onClose, onStep }) {
  useEffect(() => {
    if (index == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.body.classList.add('is-locked')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [index, onClose, onStep])

  if (index == null) return null
  const item = items[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title}, ${item.event}`}>
      <button className="lightbox__backdrop" onClick={onClose} aria-label="Close" />

      <div className="lightbox__inner">
        <figure className="lightbox__figure">
          <img src={`${BASE}${item.img}`} alt={`${item.title} — ${item.event}`} />
          <figcaption>
            <span className="lightbox__title">{item.title}</span>
            <span className="lightbox__event">{item.event}</span>
            <span className="lightbox__detail mono">{item.detail} · {item.date}</span>
          </figcaption>
        </figure>

        <div className="lightbox__bar">
          <button onClick={() => onStep(-1)} aria-label="Previous certificate">
            <ChevronLeft size={17} />
          </button>
          <span className="mono">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <button onClick={() => onStep(1)} aria-label="Next certificate">
            <ChevronRight size={17} />
          </button>
          {item.pdf && (
            <a
              className="lightbox__pdf mono"
              href={`${BASE}${item.pdf}`}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={13} /> PDF
            </a>
          )}
        </div>
      </div>

      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>
    </div>
  )
}
