import profile from '../data/profile.js'
import SectionHead from '../components/ui/SectionHead.jsx'
import DetectionBox from '../components/ui/DetectionBox.jsx'
import useReveal from '../hooks/useReveal.js'

const BASE = import.meta.env.BASE_URL

export default function About() {
  const ref = useReveal()

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="scrim" aria-hidden="true" />
      <div className="wrap">
        <SectionHead idx="01" title="About" note="who is typing" />

        <div className="about__grid">
          <div className="about__copy">
            {profile.bio.map((para, i) => (
              <p key={i} className="prose" data-reveal-child>
                {para}
              </p>
            ))}

            <dl className="about__langs" data-reveal-child>
              {profile.languages.map((l) => (
                <div key={l.name}>
                  <dt className="mono">{l.name}</dt>
                  <dd>{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about__side">
            <DetectionBox className="about__photo" label="arif_shekh" conf="1.00">
              <img
                src={`${BASE}arif-headshot.webp`}
                srcSet={`${BASE}arif-headshot-sm.webp 460w, ${BASE}arif-headshot.webp 900w`}
                sizes="(max-width: 900px) 60vw, 340px"
                alt="Md. Arif Shekh"
                width="2778"
                height="2983"
                loading="lazy"
                decoding="async"
              />
            </DetectionBox>

            <ul className="about__edu" data-reveal-child>
              {profile.education.map((e) => (
                <li key={e.degree}>
                  <span className="about__edu-period mono">{e.period}</span>
                  <span className="about__edu-degree">{e.degree}</span>
                  <span className="about__edu-org">{e.org}</span>
                  <span className="about__edu-result mono">{e.result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
