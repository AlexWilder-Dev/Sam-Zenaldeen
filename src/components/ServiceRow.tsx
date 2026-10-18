import { useVisit } from '../lib/VisitContext'
import { Check, Plus } from './Icons'
import type { Service } from '../data/salon'

/** A whole price row that adds or removes the service from the visit */
export function ServiceRow({ s, extra }: { s: Service; extra?: string }) {
  const { has, toggle } = useVisit()
  const on = has(s.id)
  return (
    <li>
      <button type="button" className={`row${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => toggle(s.id)}>
        <span className="row__name">
          {s.name}
          {s.note && <small className="row__note">{s.note}</small>}
          {extra && <small className="row__extra">{extra}</small>}
        </span>
        <span className="row__price">
          {s.from && <small>from </small>}£{s.price}
        </span>
        <span className="row__toggle" aria-hidden>
          {on ? <Check size={15} /> : <Plus size={15} />}
        </span>
        <span className="visually-hidden">{on ? ', in your visit' : ', add to your visit'}</span>
      </button>
    </li>
  )
}
