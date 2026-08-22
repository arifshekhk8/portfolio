export default function SectionHead({ idx, title, note }) {
  return (
    <header className="head">
      <span className="head__idx">{idx}</span>
      <h2 className="head__title">{title}</h2>
      <span className="head__rule" aria-hidden="true" />
      {note && <span className="head__note">{note}</span>}
    </header>
  )
}
