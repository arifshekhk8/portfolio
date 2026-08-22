import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import useScrollSpy from '../../hooks/useScrollSpy.js'

const LINKS = [
  { id: 'about', label: 'About', idx: '01' },
  { id: 'work', label: 'Work', idx: '02' },
  { id: 'journey', label: 'Journey', idx: '03' },
  { id: 'skills', label: 'Skills', idx: '04' },
  { id: 'awards', label: 'Awards', idx: '05' },
  { id: 'contact', label: 'Contact', idx: '06' },
]

const IDS = ['top', ...LINKS.map((l) => l.id)]

export default function Nav({ scrollRef }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [progress, setProgress] = useState(0)
  const active = useScrollSpy(IDS)

  useEffect(() => {
    let raf = 0
    const read = () => {
      setStuck(window.scrollY > 80)
      setProgress(scrollRef?.current?.progress ?? 0)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrollRef])

  // Close the sheet on escape and lock the page behind it.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.classList.add('is-locked')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`nav${stuck ? ' is-stuck' : ''}`}>
        <div className="nav__inner wrap">
          <a className="nav__mark" href="#top" aria-label="Back to top">
            <span className="nav__mark-box" aria-hidden="true">
              <span className="det__corner tl" />
              <span className="det__corner tr" />
              <span className="det__corner bl" />
              <span className="det__corner br" />
              AS
            </span>
            <span className="nav__mark-text mono">arif shekh</span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`nav__link mono${active === l.id ? ' is-active' : ''}`}
                aria-current={active === l.id ? 'true' : undefined}
              >
                <span className="nav__link-idx">{l.idx}</span>
                {l.label}
              </a>
            ))}
          </nav>

          <a className="nav__hire mono" href="#contact">
            <span className="nav__hire-dot" aria-hidden="true" />
            Available
          </a>

          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="nav__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <div id="nav-sheet" className={`sheet${open ? ' is-open' : ''}`} hidden={!open}>
        <nav className="sheet__links" aria-label="Sections">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={active === l.id ? 'is-active' : ''}
            >
              <span className="mono">{l.idx}</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
