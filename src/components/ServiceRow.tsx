import { m } from 'framer-motion'
import { useVisit } from '../lib/VisitContext'
import { Check, Plus } from './Icons'
import type { Service } from '../data/salon'

/** A whole price row that adds or removes the service from the visit */
export function ServiceRow({ s, extra }: { s: Service; extra?: string }) {
  const { has, toggle } = useVisit()
  const on = has(s.id)
  return (
    <li>
      <button
        type="button"
        className={`row${on ? ' is-on' : ''}`}
        aria-pressed={on}
        onClick={() => toggle(s.id)}
      >
        <span className="row__name">
          {s.name}
          {s.note && <small className="row__note">{s.note}</small>}
          {extra && <small className="row__extra">{extra}</small>}
        </span>
        <span className="row__leader" aria-hidden />
        <span className="row__price">
          {s.from && <small>from </small>}£{s.price}
        </span>
        <span className="row__toggle" aria-hidden>
          <m.span
            key={on ? 'on' : 'off'}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18 }}
          >
            {on ? <Check size={18} /> : <Plus size={18} />}
          </m.span>
        </span>
        <span className="visually-hidden">{on ? ', in your visit' : ', add to your visit'}</span>
      </button>
    </li>
  )
}
