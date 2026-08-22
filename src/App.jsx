import { useCallback, useEffect, useState } from 'react'
import Experience from './components/canvas/Experience.jsx'
import Preloader from './components/ui/Preloader.jsx'
import Nav from './components/ui/Nav.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Work from './sections/Work.jsx'
import Journey from './sections/Journey.jsx'
import Skills from './sections/Skills.jsx'
import Awards from './sections/Awards.jsx'
import useScrollProgress from './hooks/useScrollProgress.js'
import usePointer from './hooks/usePointer.js'
import { detectTier, prefersReducedMotion } from './utils/device.js'

export default function App() {
  const [tier, setTier] = useState('mid')
  const [booted, setBooted] = useState(() => prefersReducedMotion())
  const scrollRef = useScrollProgress()
  const pointerRef = usePointer()

  useEffect(() => {
    setTier(detectTier())
  }, [])

  const onBooted = useCallback(() => setBooted(true), [])

  return (
    <>
      {!booted && <Preloader onDone={onBooted} />}

      <div className={`stage${tier === 'low' ? ' stage--static' : ''}`}>
        <Experience tier={tier} scrollRef={scrollRef} pointerRef={pointerRef} />
      </div>

      <div className="plate plate--grid" aria-hidden="true" />
      <div className="plate plate--grain" aria-hidden="true" />
      <div className="plate plate--vignette" aria-hidden="true" />

      <div className={`shell${booted ? ' is-booted' : ''}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav scrollRef={scrollRef} />
        <main id="main">
          <Hero />
          <About />
          <Work />
          <Journey />
          <Skills />
          <Awards />
        </main>
      </div>
    </>
  )
}
