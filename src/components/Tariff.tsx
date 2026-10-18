import { categories, services, type CategoryId } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { ServiceRow } from './ServiceRow'
import { Comb, Razor, Scissors, Thread } from './Icons'
import type { ReactNode } from 'react'

const ICONS: Partial<Record<CategoryId, ReactNode>> = {
  barbering: <Comb size={40} />,
  shaving: <Razor size={40} />,
  beards: <Scissors size={40} />,
  threading: <Thread size={40} />,
}

export function Tariff() {
  const shown = categories.filter((c) => c.id !== 'packages')
  return (
    <section id="prices" className="section section--wall tariff" aria-labelledby="prices-title">
      <div className="wrap">
        <header className="section__head">
          <p className="eyebrow">Prices</p>
          <h2 id="prices-title" className="title">
            Tap anything to build your visit
          </h2>
          <p className="lede">
            Pick what you’d like and the total adds up below. If it matches one of Sam’s packages, you’ll see it, and
            what it saves.
          </p>
        </header>

        <div className="tariff__grid">
          {shown.map((c) => (
            <article key={c.id} className={`panel tariff__cat tariff__cat--${c.id}`}>
              <div className="tariff__cathead">
                <span className="tariff__icon">{ICONS[c.id]}</span>
                <h3>{c.title}</h3>
              </div>
              <p className="tariff__intro">{c.intro}</p>
              <ul className="rows">
                {services
                  .filter((s) => s.category === c.id)
                  .map((s) => (
                    <ServiceRow
                      key={s.id}
                      s={s}
                      extra={
                        s.covers && savingOf(s) > 0
                          ? `${gbp(savingOf(s))} less than the two cuts separately (${gbp(listPriceOf(s))})`
                          : undefined
                      }
                    />
                  ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
