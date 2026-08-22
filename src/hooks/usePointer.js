import { useEffect, useRef } from 'react'

/** Pointer position normalised to -1..1, smoothed by the consumer. */
export function usePointer() {
  const ref = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1
      ref.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      ref.current.x = 0
      ref.current.y = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}

export default usePointer
