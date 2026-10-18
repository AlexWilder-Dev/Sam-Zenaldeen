import { useEffect, useRef, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, services, type CategoryId } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { ServiceRow } from './ServiceRow'
import { Ticket } from './Ticket'
import { Comb, Razor, Scissors, Thread } from './Icons'

const ICONS: Partial<Record<CategoryId, ReactNode>> = {
  barbering: <Comb size={36} />,
  shaving: <Razor size={36} />,
  beards: <Scissors size={36} />,
  threading: <Thread size={36} />,
}

export function Tariff() {
  const navigate = useNavigate()
  const aside = useRef<HTMLElement>(null)
  const shown = categories.filter((c) => c.id !== 'packages')

  // While the ticket is on screen, the folded tray isn't needed
  useEffect(() => {
    const el = aside.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => document.body.classList.toggle('ticket-visible', e.isIntersecting && e.boundingClientRect.width > 0))
    io.observe(el)
    return () => {
      io.disconnect()
      document.body.classList.remove('ticket-visible')
    }
  }, [])

  return (
    <section id="prices" className="section section--wall tariff" aria-labelledby="prices-title">
      <div className="wrap">
        <header className="section__head tariff__head">
          <p className="eyebrow">The price list</p>
          <h2 id="prices-title" className="title title--huge">
            Tap a price.
            <br />
            <em>Build your visit.</em>
          </h2>
          <p className="lede">
            Your ticket adds up as you go. If what you’ve chosen matches one of the salon’s packages, it says so, and
            stamps the saving.
          </p>
        </header>

        <div className="tariff__layout">
          <div className="tariff__list">
            {shown.map((c) => (
              <article key={c.id} className={`tariff__cat tariff__cat--${c.id}`}>
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
          <aside className="tariff__ticket" ref={aside} aria-label="Your ticket">
            <Ticket onBook={() => navigate('/book')} />
          </aside>
        </div>
      </div>
    </section>
  )
}
