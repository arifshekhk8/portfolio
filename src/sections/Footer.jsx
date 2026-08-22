import { ArrowUp } from 'lucide-react'
import profile from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__id">
          <span className="footer__name display">{profile.name}</span>
          <span className="footer__role mono">{profile.tagline}</span>
        </div>

        <nav className="footer__links" aria-label="Elsewhere">
          {profile.socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="mono">
              {s.label}
            </a>
          ))}
        </nav>

        <div className="footer__meta mono">
          <span>Built with React, Three.js and GSAP</span>
          <span>Dhaka, Bangladesh</span>
        </div>

        <a className="footer__top mono" href="#top">
          Back to top <ArrowUp size={13} strokeWidth={2.4} />
        </a>
      </div>
    </footer>
  )
}
