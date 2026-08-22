import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/device.js'

/**
 * Adds `is-in` to the element (and staggers any [data-reveal-child]
 * descendants) the first time it crosses into view.
 */
export function useReveal({ threshold = 0.18, stagger = 70 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.classList.add('is-in')
      el.querySelectorAll('[data-reveal-child]').forEach((c) => c.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          el.classList.add('is-in')
          el.querySelectorAll('[data-reveal-child]').forEach((child, i) => {
            child.style.transitionDelay = `${i * stagger}ms`
            child.classList.add('is-in')
          })
          io.unobserve(el)
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, stagger])

  return ref
}

export default useReveal
