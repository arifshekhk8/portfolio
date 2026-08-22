import { useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import profile from '../data/profile.js'
import SectionHead from '../components/ui/SectionHead.jsx'
import useReveal from '../hooks/useReveal.js'

export default function Contact() {
  const ref = useReveal({ stagger: 80 })
  const [form, setForm] = useState({ name: '', from: '', message: '' })

  /**
   * No backend, no third-party form service. Submitting composes a mailto
   * with the fields filled in and hands off to whatever mail client the
   * visitor already uses, which is honest about where the message goes.
   */
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Portfolio enquiry from ${form.name || 'someone'}`
    const body = `${form.message}\n\n—\n${form.name}\n${form.from}`
    window.location.href =
      `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="scrim" aria-hidden="true" />
      <div className="wrap">
        <SectionHead idx="06" title="Contact" note={profile.status} />

        <div className="contact__grid">
          <div className="contact__left">
            <p className="contact__pitch" data-reveal-child>
              If you have a problem where the data is messy and the model has to run in
              production, I would like to hear about it.
            </p>

            <a className="contact__email" href={`mailto:${profile.contact.email}`} data-reveal-child>
              <span>{profile.contact.email}</span>
              <ArrowUpRight size={22} strokeWidth={2.2} aria-hidden="true" />
            </a>

            <ul className="contact__socials" data-reveal-child>
              {profile.socials
                .filter((s) => s.id !== 'mail')
                .map((s) => (
                  <li key={s.id}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      <span className="contact__social-label mono">{s.label}</span>
                      <span className="contact__social-handle">{s.handle}</span>
                      <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                    </a>
                  </li>
                ))}
            </ul>

            <div className="contact__refs" data-reveal-child>
              <h3 className="contact__refs-title mono">References</h3>
              <ul>
                {profile.references.map((r) => (
                  <li key={r.name}>
                    <span className="contact__ref-name">{r.name}</span>
                    <span className="contact__ref-role">{r.role}, {r.org}</span>
                    <a className="contact__ref-mail mono" href={`mailto:${r.email}`}>{r.email}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form className="contact__form" onSubmit={onSubmit} data-reveal-child>
            <p className="contact__form-note mono">
              This opens your mail app with the message ready to send.
            </p>

            <label className="field">
              <span className="field__label mono">Your name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="Who is writing"
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span className="field__label mono">Your email</span>
              <input
                type="email"
                required
                value={form.from}
                onChange={set('from')}
                placeholder="where I should reply"
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span className="field__label mono">Message</span>
              <textarea
                required
                rows="5"
                value={form.message}
                onChange={set('message')}
                placeholder="The role, the problem, or just hello"
              />
            </label>

            <button type="submit" className="btn btn--signal contact__send">
              <span>Compose message</span>
              <Send size={14} strokeWidth={2.4} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
