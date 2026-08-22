import { useEffect, useRef } from 'react'

/**
 * Scroll state in a ref rather than state. The canvas reads it every frame
 * and nothing in the DOM tree needs to re-render because the page moved.
 */
export function useScrollProgress() {
  const ref = useRef({ progress: 0, y: 0, velocity: 0 })

  useEffect(() => {
    let last = window.scrollY
    let raf = 0

    const read = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      ref.current.y = y
      ref.current.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      ref.current.velocity = y - last
      last = y
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}

export default useScrollProgress
