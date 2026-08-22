import journey from '../data/journey.js'
import SectionHead from '../components/ui/SectionHead.jsx'
import useReveal from '../hooks/useReveal.js'

const KIND_LABEL = {
  edu: 'education',
  build: 'build',
  award: 'award',
  paper: 'paper',
  next: 'open',
}

export default function Journey() {
  const ref = useReveal({ stagger: 55 })

  return (
    <section className="section journey" id="journey" ref={ref}>
      <div className="scrim" aria-hidden="true" />
      <div className="wrap">
        <SectionHead idx="03" title="Journey" note="2019 to now" />

        <ol className="track">
          {journey.map((step) => (
            <li key={`${step.date}-${step.title}`} className={`track__item track__item--${step.kind}`} data-reveal-child>
              <div className="track__rail" aria-hidden="true">
                <span className="track__node" />
              </div>

              <div className="track__meta">
                <time className="track__date mono">{step.date}</time>
                <span className="track__stamp mono">{step.stamp}</span>
              </div>

              <div className="track__body">
                <h3 className="track__title">{step.title}</h3>
                <p className="track__org mono">{step.org}</p>
                <p className="track__note prose">{step.note}</p>
                <span className="sr-only">Category: {KIND_LABEL[step.kind]}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
