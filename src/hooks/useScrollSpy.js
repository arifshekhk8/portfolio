import { useEffect, useState } from 'react'

/** Returns the id of whichever section currently owns the viewport. */
export function useScrollSpy(ids, { offset = 0.34 } = {}) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return

    let raf = 0
    const pick = () => {
      const line = window.innerHeight * offset
      let current = nodes[0].id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id
      }
      setActive(current)
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick)
    }

    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids, offset])

  return active
}

export default useScrollSpy
