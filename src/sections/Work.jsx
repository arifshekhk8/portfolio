import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects, filters, sideProjects } from '../data/projects.js'
import SectionHead from '../components/ui/SectionHead.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import CaseStudy from '../components/ui/CaseStudy.jsx'
import useReveal from '../hooks/useReveal.js'

export default function Work() {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const ref = useReveal({ stagger: 90 })

  const shown = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )

  return (
    <section className="section work" id="work" ref={ref}>
      <div className="scrim scrim--full" aria-hidden="true" />
      <div className="wrap">
        <SectionHead idx="02" title="Work" note={`${projects.length} builds, all shipped`} />

        <div className="work__filters" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const count = f.id === 'all'
              ? projects.length
              : projects.filter((p) => p.tags.includes(f.id)).length
            return (
              <button
                key={f.id}
                type="button"
                className={`work__filter mono${filter === f.id ? ' is-active' : ''}`}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                disabled={count === 0}
              >
                {f.label}
                <span className="work__filter-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="work__grid">
          {shown.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpen} />
          ))}
        </div>

        <div className="work__more">
          <h3 className="work__more-title mono">Coursework and smaller builds</h3>
          <ul className="work__more-list">
            {sideProjects.map((s) => (
              <li key={s.title}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <span className="work__more-name">{s.title}</span>
                  <span className="work__more-note">{s.note}</span>
                  <span className="work__more-stack mono">{s.stack}</span>
                  <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CaseStudy project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
