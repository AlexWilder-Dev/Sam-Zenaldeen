import { reviews, serviceById, type Service } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { useVisit } from '../lib/VisitContext'
import { telHref, waHref } from '../lib/contact'
import { Check, Plus } from './Icons'

const lucy = reviews.quotes.find((q) => q.id === 'lucy')!

const GROUPS: { title: string; ids: string[] }[] = [
  { title: 'In one visit', ids: ['pkg-cut-shave', 'pkg-cut-beard'] },
  { title: 'Five visits', ids: ['bundle-5-cuts', 'bundle-5-shaves'] },
  { title: 'Together', ids: ['father-and-son'] },
]

function covers(p: Service) {
  return p
    .covers!.map((c) => {
      const s = serviceById(c.id)!
      return c.count > 1 ? `${c.count} × ${s.name}` : s.name
    })
    .join(' + ')
}

function Row({ id }: { id: string }) {
  const { has, toggle } = useVisit()
  const p = serviceById(id)!
  const on = has(p.id)
  const count = p.covers![0].count
  return (
    <li>
      <button type="button" className={`prow${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => toggle(p.id)}>
        <span className="prow__name">
          {p.id === 'father-and-son' ? 'Father & Son' : p.name}
          <small>
            {covers(p)}
            {count > 1 && <>. {gbp(p.price / count)} a visit</>}
            {p.note && <>. {p.note}</>}
          </small>
        </span>
        <span className="prow__was">
          <span className="prow__label">Separately</span>
          <s>{gbp(listPriceOf(p))}</s>
        </span>
        <span className="prow__price">£{p.price}</span>
        <span className="prow__save">Save {gbp(savingOf(p))}</span>
        <span className="row__toggle" aria-hidden>
          {on ? <Check size={15} /> : <Plus size={15} />}
        </span>
        <span className="visually-hidden">{on ? ', in your visit' : ', add to your visit'}</span>
      </button>
    </li>
  )
}

export function Packages() {
  return (
    <section id="packages" className="block packages" aria-labelledby="packages-title">
      <div className="idx">
        <span>03</span>
        <span>Packages</span>
      </div>
      <div className="packages__head">
        <h2 id="packages-title" className="display">
          The complete <em>experience.</em>
        </h2>
        <p className="packages__note">Every saving here is worked out from the list prices above.</p>
      </div>

      <div className="ptable">
        <p className="ptable__cols" aria-hidden>
          <span />
          <span>Separately</span>
          <span>Package</span>
          <span>You save</span>
          <span />
        </p>
        {GROUPS.map((g) => (
          <div key={g.title} className="ptable__group">
            <h3>{g.title}</h3>
            <ul>
              {g.ids.map((id) => (
                <Row key={id} id={id} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="packages__foot">
        <figure className="pull">
          <blockquote>“{lucy.text}”</blockquote>
          <figcaption>
            {lucy.author}, Google review, {lucy.year}
          </figcaption>
        </figure>
        <p className="packages__group">
          <strong>Group bookings available.</strong> <a href={telHref}>Call</a> or{' '}
          <a href={waHref('Hello Sam, I’d like to ask about a group booking.')} target="_blank" rel="noopener">
            WhatsApp
          </a>{' '}
          to arrange.
        </p>
      </div>
    </section>
  )
}
