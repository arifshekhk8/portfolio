import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils/device.js'

const GLYPHS = '01<>[]{}/\\|_-=+*#%&$@!?ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Cycles through a list of strings, resolving each one character by
 * character out of noise. Reads like a classifier settling on a label.
 */
export function useScramble(words, { hold = 2600, speed = 34 } = {}) {
  const [text, setText] = useState(words[0] ?? '')
  const idx = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) {
      setText(words[0] ?? '')
      return
    }

    let timer = 0
    let frame = 0
    let cancelled = false

    const resolve = (next) => {
      const len = Math.max(next.length, text.length)
      let settled = 0

      const step = () => {
        if (cancelled) return
        settled += 0.62
        const out = next
          .split('')
          .map((ch, i) => {
            if (i < settled) return ch
            if (ch === ' ') return ' '
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')

        setText(out)
        if (settled < len) {
          frame = window.setTimeout(step, speed)
        } else {
          setText(next)
          timer = window.setTimeout(advance, hold)
        }
      }
      step()
    }

    const advance = () => {
      idx.current = (idx.current + 1) % words.length
      resolve(words[idx.current])
    }

    timer = window.setTimeout(advance, hold)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.clearTimeout(frame)
    }
    // Intentionally keyed on the joined list: the words are static per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join('|'), hold, speed])

  return text
}

export default useScramble
