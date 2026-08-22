import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/device.js'

/**
 * Reveals a section the first time it enters view, staggering any
 * [data-reveal-child] descendants.
 *
 * This deliberately does not use IntersectionObserver. With a WebGL scene
 * running every frame, IO callbacks get queued behind rendering and can land
 * a second or more late, which showed up as sections that were still blank
 * when the reader had already scrolled to them. A rAF-throttled scroll check
 * is dispatched predictably and costs one getBoundingClientRect per section
 * until it fires, after which the listener detaches.
 *
 * The hidden state is also scoped to .reveal-ready on <html>, which only
 * React sets, so a failed or slow bundle leaves the page plainly readable.
 */
export function useReveal({ threshold = 0.9, stagger = 70 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => {
      el.classList.add('is-in')
      el.querySelectorAll('[data-reveal-child]').forEach((child, i) => {
        // Capped: with a dozen children the tail would otherwise still be
        // fading in long after the reader arrived.
        child.style.transitionDelay = `${Math.min(i * stagger, 520)}ms`
        child.classList.add('is-in')
      })
    }

    if (prefersReducedMotion()) {
      reveal()
      return
    }

    let raf = 0
    let done = false

    const check = () => {
      raf = 0
      if (done) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * threshold && rect.bottom > 0) {
        done = true
        reveal()
        detach()
      }
    }

    const onScroll = () => {
      if (!raf && !done) raf = requestAnimationFrame(check)
    }

    function detach() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }

    check()
    if (!done) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }
    return detach
  }, [threshold, stagger])

  return ref
}

export default useReveal
