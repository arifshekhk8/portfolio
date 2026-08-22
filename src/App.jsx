import { useEffect, useState } from 'react'
import Experience from './components/canvas/Experience.jsx'
import useScrollProgress from './hooks/useScrollProgress.js'
import usePointer from './hooks/usePointer.js'
import { detectTier } from './utils/device.js'

export default function App() {
  const [tier, setTier] = useState('mid')
  const scrollRef = useScrollProgress()
  const pointerRef = usePointer()

  useEffect(() => {
    setTier(detectTier())
  }, [])

  return (
    <>
      <div className={`stage${tier === 'low' ? ' stage--static' : ''}`}>
        <Experience tier={tier} scrollRef={scrollRef} pointerRef={pointerRef} />
      </div>

      <div className="plate plate--grid" aria-hidden="true" />
      <div className="plate plate--grain" aria-hidden="true" />
      <div className="plate plate--vignette" aria-hidden="true" />

      <div className="shell">
        <main id="main" style={{ minHeight: '400vh' }} />
      </div>
    </>
  )
}
