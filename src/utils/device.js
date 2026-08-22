/**
 * Cheap capability probe used to decide how much WebGL to attempt.
 * Anything that returns 'low' gets a static gradient instead of a canvas.
 */
export function detectTier() {
  if (typeof window === 'undefined') return 'high'

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return 'low'

  const cores = navigator.hardwareConcurrency || 4
  const mem = navigator.deviceMemory || 4
  const narrow = window.innerWidth < 720
  const coarse = window.matchMedia('(pointer: coarse)').matches

  let gl = null
  try {
    const canvas = document.createElement('canvas')
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  } catch {
    gl = null
  }
  if (!gl) return 'low'

  if (cores <= 4 || mem <= 4 || (narrow && coarse)) return 'mid'
  return 'high'
}

export const tierSettings = {
  high: { particles: 9000, dpr: [1, 2], bloom: true, links: true },
  mid: { particles: 3800, dpr: [1, 1.5], bloom: false, links: true },
  low: { particles: 0, dpr: [1, 1], bloom: false, links: false },
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
