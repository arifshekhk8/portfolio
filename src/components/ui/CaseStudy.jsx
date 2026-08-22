import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

/** Full case study, opened from a project card. */
export default function CaseStudy({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // Keep focus inside the dialog while it is open.
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const previous = document.activeElement
    document.body.classList.add('is-locked')
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null
  const accent = project.accent === 'amber' ? 'amber' : 'signal'

  return (
    <div className="study" role="dialog" aria-modal="true" aria-labelledby="study-title">
      <button className="study__backdrop" onClick={onClose} aria-label="Close case study" />

      <div className={`study__panel study__panel--${accent}`} ref={panelRef}>
        <button className="study__close" onClick={onClose} ref={closeRef} aria-label="Close">
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="study__scroll">
          <p className="study__eyebrow mono">
            <span>{project.idx}</span>
            <span>{project.org}</span>
            <span>{project.year}</span>
          </p>

          <h2 className="study__title" id="study-title">{project.title}</h2>
          <p className="study__subtitle">{project.subtitle}</p>

          <div className="study__tags">
            {project.award && <span className={`chip chip--${accent}`}>{project.award}</span>}
            <span className="chip">{project.role}</span>
          </div>

          <ul className="study__metrics">
            {project.metrics.map((m) => (
              <li key={m.key} className="metric">
                <span className="metric__val">{m.val}</span>
                <span className="metric__key">{m.key}</span>
              </li>
            ))}
          </ul>

          <div className="study__body">
            <p className="study__lede prose">{project.summary}</p>
            {project.detail.map((d, i) => (
              <p key={i} className="prose">{d}</p>
            ))}
          </div>

          <div className="study__stack">
            <span className="mono study__stack-key">Stack</span>
            <ul>
              {project.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </div>

          <div className="study__links">
            {project.links.map((l) => (
              <a key={l.url} className="btn btn--ghost" href={l.url} target="_blank" rel="noreferrer">
                <span>{l.label}</span>
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
