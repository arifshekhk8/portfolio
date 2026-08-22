import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../utils/device.js'

const STEPS = [
  { label: 'init runtime', weight: 12 },
  { label: 'load weights · arif.v2026', weight: 34 },
  { label: 'warm up detector', weight: 22 },
  { label: 'build latent field', weight: 20 },
  { label: 'mount scene', weight: 12 },
]

/**
 * Boot sequence. Progress is driven by real work where there is real work to
 * wait on (fonts, window load) and eased across the rest, so the bar never
 * sits at 97% waiting for something that already finished.
 */
export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone?.()
      return
    }

    let raf = 0
    let target = 8
    let shown = 0
    const started = performance.now()
    const MIN_MS = 1150

    const ready = Promise.allSettled([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((res) => {
        if (document.readyState === 'complete') res()
        else window.addEventListener('load', res, { once: true })
      }),
    ])

    ready.then(() => {
      target = 100
    })

    // Creep forward on a curve while waiting, so it always looks alive.
    const tick = () => {
      const elapsed = performance.now() - started
      if (target < 100) target = Math.min(92, 8 + (elapsed / 1400) * 84)

      shown += (target - shown) * 0.06
      const rounded = Math.min(100, Math.round(shown))
      setPct(rounded)

      let acc = 0
      let idx = 0
      for (let i = 0; i < STEPS.length; i += 1) {
        acc += STEPS[i].weight
        if (rounded <= acc) { idx = i; break }
        idx = i
      }
      setStep(idx)

      if (rounded >= 100 && elapsed > MIN_MS && !done.current) {
        done.current = true
        setLeaving(true)
        window.setTimeout(() => onDone?.(), 620)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    document.body.classList.add('is-locked')
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('is-locked')
    }
  }, [onDone])

  return (
    <div className={`boot${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="boot__inner">
        <div className="boot__mark det is-locked">
          <span className="det__corner tl" />
          <span className="det__corner tr" />
          <span className="det__corner bl" />
          <span className="det__corner br" />
          <span className="boot__initials">AS</span>
        </div>

        <ol className="boot__log">
          {STEPS.map((s, i) => (
            <li key={s.label} className={i < step ? 'is-done' : i === step ? 'is-active' : ''}>
              <span className="boot__caret">{i < step ? '✓' : i === step ? '>' : ' '}</span>
              <span className="boot__label">{s.label}</span>
              <span className="boot__dots" aria-hidden="true" />
              <span className="boot__state">{i < step ? 'ok' : i === step ? '...' : ''}</span>
            </li>
          ))}
        </ol>

        <div className="boot__bar">
          <div className="boot__fill" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="boot__pct">
          <span>loading</span>
          <span>{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
