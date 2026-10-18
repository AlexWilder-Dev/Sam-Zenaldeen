import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, services, type CategoryId } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { ServiceRow } from './ServiceRow'
import { Ticket } from './Ticket'

const COLUMNS: CategoryId[][] = [
  ['barbering', 'threading'],
  ['shaving', 'beards'],
]

export function Tariff() {
  const navigate = useNavigate()
  const aside = useRef<HTMLElement>(null)

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
    <section id="prices" className="block tariff" aria-labelledby="prices-title">
      <div className="idx">
        <span>01</span>
        <span>Price list</span>
      </div>
      <div className="tariff__head">
        <h2 id="prices-title" className="display">
          The <em>prices.</em>
        </h2>
        <p className="tariff__note">Tap any service to add it to your visit. If your choice matches a package, your visit will say so.</p>
      </div>

      <div className="tariff__layout">
        {COLUMNS.map((col, i) => (
          <div key={i} className="tariff__col">
            {col.map((id) => {
              const c = categories.find((x) => x.id === id)!
              return (
                <article key={id} className="cat">
                  <h3 className="cat__title">{c.title}</h3>
                  <p className="cat__intro">{c.intro}</p>
                  <ul className="rows">
                    {services
                      .filter((s) => s.category === id)
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
              )
            })}
          </div>
        ))}
        <aside className="tariff__ticket" ref={aside} aria-label="Your visit">
          <Ticket onBook={() => navigate('/book')} />
        </aside>
      </div>
    </section>
  )
}
