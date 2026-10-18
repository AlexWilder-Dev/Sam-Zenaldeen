import { motion } from 'framer-motion'
import { reviews, serviceById, services } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { useVisit } from '../lib/VisitContext'
import { telHref, waHref } from '../lib/contact'
import { Check, Crossed, Plus } from './Icons'

const lucy = reviews.quotes.find((q) => q.id === 'lucy')!

/** Five visits, marked off one by one */
function FiveMarks() {
  return (
    <span className="five" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.3, opacity: 0.25 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 500, damping: 20 }}
        />
      ))}
    </span>
  )
}

export function Packages() {
  const { has, toggle } = useVisit()
  const pkgs = services.filter((s) => s.category === 'packages')
  const combos = pkgs.filter((p) => p.covers!.length > 1)
  const bundles = pkgs.filter((p) => p.covers!.length === 1)
  const fatherSon = serviceById('father-and-son')!

  const card = (id: string, five = false) => {
    const p = serviceById(id)!
    const on = has(p.id)
    const perVisit = five ? p.price / p.covers![0].count : undefined
    return (
      <motion.button
        key={p.id}
        type="button"
        className={`pass${on ? ' is-on' : ''}${five ? ' pass--five' : ''}`}
        aria-pressed={on}
        onClick={() => toggle(p.id)}
        initial={{ opacity: 0, y: 30, rotate: five ? -1.5 : 1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <span className="pass__name">{p.name}</span>
        {five && <FiveMarks />}
        <span className="pass__prices">
          <s>{gbp(listPriceOf(p))}</s>
          <span className="pass__price">£{p.price}</span>
        </span>
        <span className="pass__save">
          Save {gbp(savingOf(p))}
          {perVisit !== undefined && <> · {gbp(perVisit)} a visit</>}
        </span>
        <span className="pass__add">
          {on ? <Check size={18} /> : <Plus size={18} />}
          {on ? 'On your ticket' : 'Add to ticket'}
        </span>
      </motion.button>
    )
  }

  return (
    <section id="packages" className="section packages" aria-labelledby="packages-title">
      <div className="wrap">
        <header className="section__head">
          <p className="eyebrow eyebrow--gold">
            <Crossed size={22} /> Packages
          </p>
          <h2 id="packages-title" className="title title--huge title--light">
            The complete
            <br />
            <em>experience.</em>
          </h2>
          <p className="lede lede--light">Every saving below is worked out from the list prices.</p>
        </header>

        <div className="packages__grid">
          <div>
            <h3 className="packages__sub">In one visit</h3>
            <div className="passes">{combos.map((p) => card(p.id))}</div>
          </div>
          <div>
            <h3 className="packages__sub">For regulars: five visits</h3>
            <div className="passes">{bundles.map((p) => card(p.id, true))}</div>
          </div>
        </div>

        <aside className="family">
          <div>
            <h3 className="family__title">
              Father &amp; Son <span>£{fatherSon.price}</span>
            </h3>
            <p>
              Son under 18. {gbp(savingOf(fatherSon))} less than a Wash Cut &amp; Finish and a Teen Wash Cut &amp; Finish
              booked separately.
            </p>
            <button
              type="button"
              className={`chip${has(fatherSon.id) ? ' is-on' : ''}`}
              aria-pressed={has(fatherSon.id)}
              onClick={() => toggle(fatherSon.id)}
            >
              {has(fatherSon.id) ? <Check size={16} /> : <Plus size={16} />} Father &amp; Son
            </button>
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
