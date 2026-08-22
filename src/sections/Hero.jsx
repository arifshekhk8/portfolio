import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import profile from '../data/profile.js'
import DetectionBox from '../components/ui/DetectionBox.jsx'
import useScramble from '../hooks/useScramble.js'

const BASE = import.meta.env.BASE_URL

export default function Hero() {
  const role = useScramble(profile.roles, { hold: 2800, speed: 30 })

  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <p className="hero__eyebrow mono">
          <span className="hero__pulse" aria-hidden="true" />
          {profile.location}
          <span className="hero__sep" aria-hidden="true">/</span>
          {profile.status}
        </p>

        <DetectionBox
          className="hero__box"
          label="person"
          conf="0.98"
          locked
        >
          <h1 className="hero__name display">
            <span className="hero__line"><span>Md. Arif</span></span>
            <span className="hero__line"><span>Shekh</span></span>
          </h1>
        </DetectionBox>

        <p className="hero__role">
          <span className="mono hero__role-key">class</span>
          <span className="hero__role-val" aria-label={profile.roles.join(', ')}>{role}</span>
        </p>

        <p className="hero__blurb prose">{profile.blurb}</p>

        <div className="hero__cta">
          <a className="btn btn--signal" href="#work">
            <span>See the work</span>
            <ArrowDown size={14} strokeWidth={2.4} />
          </a>
          <a
            className="btn btn--ghost"
            href={`${BASE}Md-Arif-Shekh-CV.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            <span>Download CV</span>
            <Download size={14} strokeWidth={2.4} />
          </a>
          <a
            className="btn btn--ghost"
            href="https://github.com/arifshekhk8"
            target="_blank"
            rel="noreferrer"
          >
            <span>GitHub</span>
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </a>
        </div>

        <ul className="hero__stats">
          {profile.metrics.map((m) => (
            <li key={m.key} className="metric">
              <span className="metric__val">{m.val}</span>
              <span className="metric__key">{m.key}</span>
              <span className="hero__stat-note">{m.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <a className="hero__scroll mono" href="#about" aria-label="Scroll to about">
        <span>scroll</span>
        <span className="hero__scroll-rail" aria-hidden="true"><i /></span>
      </a>
    </section>
  )
}
