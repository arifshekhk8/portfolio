import { skillGroups, competencies, softSkills } from '../data/skills.js'
import SectionHead from '../components/ui/SectionHead.jsx'
import useReveal from '../hooks/useReveal.js'

const SEGMENTS = 20

export default function Skills() {
  const ref = useReveal({ stagger: 60 })

  return (
    <section className="section skills" id="skills" ref={ref}>
      <div className="scrim scrim--full" aria-hidden="true" />
      <div className="wrap">
        <SectionHead idx="04" title="Skills" note="self-assessed, same scale as my BDjobs profile" />

        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div className="bank" key={group.id} data-reveal-child>
              <div className="bank__head">
                <h3 className="bank__title">{group.label}</h3>
                <span className="bank__note mono">{group.note}</span>
              </div>

              <ul className="bank__list">
                {group.items.map((item) => {
                  const lit = Math.round((item.level / 100) * SEGMENTS)
                  return (
                    <li className="gauge" key={item.name}>
                      <span className="gauge__name">{item.name}</span>
                      <span
                        className="gauge__meter"
                        role="meter"
                        aria-valuenow={item.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={item.name}
                      >
                        {Array.from({ length: SEGMENTS }, (_, i) => (
                          <i
                            key={i}
                            className={i < lit ? 'is-lit' : ''}
                            style={{ transitionDelay: `${i * 22}ms` }}
                          />
                        ))}
                      </span>
                      <span className="gauge__val mono">{item.level}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="skills__tail">
          <div data-reveal-child>
            <h3 className="skills__tail-title mono">Core competencies</h3>
            <ul className="skills__chips">
              {competencies.map((c) => (
                <li key={c} className="chip chip--signal">{c}</li>
              ))}
            </ul>
          </div>

          <div data-reveal-child>
            <h3 className="skills__tail-title mono">Soft skills</h3>
            <ul className="skills__chips">
              {softSkills.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
