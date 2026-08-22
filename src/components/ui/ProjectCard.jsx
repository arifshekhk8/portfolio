import { ArrowUpRight, Trophy } from 'lucide-react'

export default function ProjectCard({ project, onOpen }) {
  const accent = project.accent === 'amber' ? 'amber' : 'signal'

  return (
    <article
      className={`card card--${accent}${project.featured ? ' card--wide' : ''}`}
      data-reveal-child
    >
      <button
        type="button"
        className="card__hit"
        onClick={() => onOpen(project)}
        aria-label={`Open case study: ${project.title}`}
      />

      <span className="card__corner tl" aria-hidden="true" />
      <span className="card__corner tr" aria-hidden="true" />
      <span className="card__corner bl" aria-hidden="true" />
      <span className="card__corner br" aria-hidden="true" />
      <span className="card__scan" aria-hidden="true" />

      <div className="card__top">
        <span className="card__idx mono">{project.idx}</span>
        {project.award && (
          <span className={`chip chip--${accent} card__award`}>
            <Trophy size={11} strokeWidth={2.4} />
            &nbsp;{project.award}
          </span>
        )}
        <span className="card__year mono">{project.year}</span>
      </div>

      <h3 className="card__title">{project.title}</h3>
      <p className="card__subtitle">{project.subtitle}</p>
      <p className="card__org mono">{project.org}</p>

      <p className="card__summary prose">{project.summary}</p>

      <ul className="card__metrics">
        {project.metrics.slice(0, 4).map((m) => (
          <li key={m.key} className="metric">
            <span className="metric__val">{m.val}</span>
            <span className="metric__key">{m.key}</span>
          </li>
        ))}
      </ul>

      <ul className="card__stack">
        {project.stack.slice(0, 5).map((s) => (
          <li key={s} className="chip">{s}</li>
        ))}
        {project.stack.length > 5 && (
          <li className="chip">+{project.stack.length - 5}</li>
        )}
      </ul>

      <span className="card__cta mono" aria-hidden="true">
        Case study <ArrowUpRight size={13} strokeWidth={2.4} />
      </span>
    </article>
  )
}
