import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../utils/device.js'

const HOVERABLE = 'a, button, input, textarea, [role="button"], .card, .certs__card'

/**
 * A reticle rather than a pointer. The ring lags the dot, and over anything
 * interactive it snaps to that element's box and reads out its type, which
 * is the same language the detection boxes use everywhere else.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    setEnabled(true)

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let box = null
    let raf = 0

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const hit = e.target.closest?.(HOVERABLE)

      if (hit) {
        const r = hit.getBoundingClientRect()
        // Do not try to wrap something enormous; fall back to the plain ring.
        box = r.width < 460 && r.height < 260 ? r : null
        ring.dataset.state = box ? 'lock' : 'hot'
      } else {
        box = null
        ring.dataset.state = 'idle'
      }
    }

    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }

    const tick = () => {
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`

      if (box) {
        // Ease the ring onto the element's box.
        ringPos.x += (box.left + box.width / 2 - ringPos.x) * 0.24
        ringPos.y += (box.top + box.height / 2 - ringPos.y) * 0.24
        ring.style.width = `${box.width + 12}px`
        ring.style.height = `${box.height + 12}px`
      } else {
        ringPos.x += (pos.x - ringPos.x) * 0.18
        ringPos.y += (pos.y - ringPos.y) * 0.18
        ring.style.width = ''
        ring.style.height = ''
      }

      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    document.documentElement.classList.add('has-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__dot" ref={dotRef} />
      <span className="cursor__ring" ref={ringRef} data-state="idle">
        <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
      </span>
    </div>
  )
}
