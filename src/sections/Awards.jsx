import { useCallback, useState } from 'react'
import { Award, Medal } from 'lucide-react'
import { awards, participation, certificates } from '../data/achievements.js'
import SectionHead from '../components/ui/SectionHead.jsx'
import Lightbox from '../components/ui/Lightbox.jsx'
import useReveal from '../hooks/useReveal.js'

const BASE = import.meta.env.BASE_URL

export default function Awards() {
  const [shot, setShot] = useState(null)
  const ref = useReveal({ stagger: 70 })

  const step = useCallback(
    (dir) => setShot((i) => (i == null ? i : (i + dir + certificates.length) % certificates.length)),
    [],
  )

  return (
    <section className="section awards" id="awards" ref={ref}>
      <div className="scrim" aria-hidden="true" />
      <div className="wrap">
        <SectionHead idx="05" title="Awards" note={`${certificates.length} certificates on file`} />

        <ol className="podium">
          {awards.map((a) => (
            <li key={a.title} className={`podium__item podium__item--r${a.rank}`} data-reveal-child>
              <span className="podium__icon" aria-hidden="true">
                {a.rank <= 2 ? <Medal size={17} /> : <Award size={17} />}
              </span>
              <span className="podium__place">{a.place}</span>
              <div className="podium__body">
                <h3 className="podium__title">{a.title}</h3>
                <p className="podium__org mono">{a.org} · {a.role}</p>
                <p className="podium__note prose">{a.note}</p>
              </div>
              <span className="podium__year mono">{a.year}</span>
            </li>
          ))}
        </ol>

        <div className="awards__also" data-reveal-child>
          <h3 className="awards__also-title mono">Also took part in</h3>
          <ul>
            {participation.map((p) => (
              <li key={p.title}>
                <span className="awards__also-name">{p.title}</span>
                <span className="awards__also-org mono">{p.org}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="certs">
          <h3 className="certs__title mono">Certificates</h3>
          <ul className="certs__grid">
            {certificates.map((c, i) => (
              <li key={c.id} data-reveal-child>
                <button
                  type="button"
                  className="certs__card"
                  onClick={() => setShot(i)}
                  aria-label={`View certificate: ${c.title}, ${c.event}`}
                >
                  <span className="certs__frame" style={{ aspectRatio: c.ratio }}>
                    <img
                      src={`${BASE}${c.img}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="certs__glare" aria-hidden="true" />
                  </span>
                  <span className="certs__meta">
                    <span className="certs__event">{c.event}</span>
                    <span className="certs__detail mono">{c.detail}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Lightbox items={certificates} index={shot} onClose={() => setShot(null)} onStep={step} />
    </section>
  )
}
