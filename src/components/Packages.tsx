import { reviews, serviceById, services } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { useVisit } from '../lib/VisitContext'
import { telHref, waHref } from '../lib/contact'
import { Check, Crossed, Plus } from './Icons'

const lucy = reviews.quotes.find((q) => q.id === 'lucy')!

export function Packages() {
  const { has, toggle } = useVisit()
  const pkgs = services.filter((s) => s.category === 'packages')
  const combos = pkgs.filter((p) => p.covers!.length > 1)
  const bundles = pkgs.filter((p) => p.covers!.length === 1)
  const fatherSon = serviceById('father-and-son')!

  const card = (id: string, perVisit?: number) => {
    const p = serviceById(id)!
    const on = has(p.id)
    return (
      <button
        key={p.id}
        type="button"
        className={`ticket${on ? ' is-on' : ''}`}
        aria-pressed={on}
        onClick={() => toggle(p.id)}
      >
        <span className="ticket__name">{p.name}</span>
        <span className="ticket__price">£{p.price}</span>
        <span className="ticket__maths">
          <s>{gbp(listPriceOf(p))}</s> separately · <strong>save {gbp(savingOf(p))}</strong>
          {perVisit !== undefined && <> · {gbp(perVisit)} a visit</>}
        </span>
        <span className="ticket__add">
          {on ? <Check size={18} /> : <Plus size={18} />}
          {on ? 'In your visit' : 'Add to visit'}
        </span>
      </button>
    )
  }

  return (
    <section id="packages" className="section section--wall-shade packages" aria-labelledby="packages-title">
      <div className="wrap">
        <header className="section__head">
          <p className="eyebrow">
            <Crossed size={22} /> Packages
          </p>
          <h2 id="packages-title" className="title">
            The complete experience, for less
          </h2>
          <p className="lede">Savings worked out against the list prices above.</p>
        </header>

        <div className="packages__grid">
          <div>
            <h3 className="packages__sub">In one visit</h3>
            <div className="tickets">{combos.map((p) => card(p.id))}</div>
          </div>
          <div>
            <h3 className="packages__sub">For regulars: five visits</h3>
            <div className="tickets">
              {bundles.map((p) => card(p.id, p.price / p.covers![0].count))}
            </div>
          </div>
        </div>

        <aside className="family panel">
          <div>
            <h3 className="family__title">Father &amp; Son, £{fatherSon.price}</h3>
            <p>
              Son under 18. {gbp(savingOf(fatherSon))} less than a Wash Cut &amp; Finish and a Teen Wash Cut &amp; Finish
              booked separately.
            </p>
          </div>
          <figure className="family__quote">
            <blockquote>“{lucy.text}”</blockquote>
            <figcaption>
              {lucy.author}, Google review, {lucy.year}
            </figcaption>
          </figure>
        </aside>

        <p className="packages__group">
          Group bookings available. <a href={telHref}>Call</a> or{' '}
          <a href={waHref('Hello Sam, I’d like to ask about a group booking.')} target="_blank" rel="noopener">
            WhatsApp
          </a>{' '}
          to arrange.
        </p>
      </div>
    </section>
  )
}
