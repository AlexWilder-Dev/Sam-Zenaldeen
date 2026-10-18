import { AnimatePresence, m } from 'framer-motion'
import { serviceById } from '../data/salon'
import { useVisit } from '../lib/VisitContext'
import { gbp, offerLine, savingOf } from '../lib/visit'
import { Arrow, Close } from './Icons'

/** What the chosen packages, bundles and Father & Son save against list prices */
export function useSaved(ids: string[]) {
  return ids.reduce((sum, id) => {
    const s = serviceById(id)
    return s?.covers ? sum + Math.max(0, savingOf(s)) : sum
  }, 0)
}

export function Ticket({ onBook, showOffer = true }: { onBook?: () => void; showOffer?: boolean }) {
  const { ids, total, hasFrom, offer, take, remove } = useVisit()
  const saved = useSaved(ids)

  return (
    <div className="ticket">
      <p className="ticket__head">
        <span>Your visit</span>
        <span>119 Sheen Lane</span>
      </p>

      {ids.length === 0 ? (
        <p className="ticket__empty">Tap a price to start your visit.</p>
      ) : (
        <ul className="ticket__items">
          <AnimatePresence initial={false}>
            {ids.map((id) => {
              const s = serviceById(id)!
              return (
                <m.li
                  key={id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <span className="ticket__name">{s.name}</span>
                  <span className="ticket__price">
                    {s.from && <small>from </small>}
                    {gbp(s.price)}
                  </span>
                  <button type="button" onClick={() => remove(id)} aria-label={`Remove ${s.name}`}>
                    <Close size={13} />
                  </button>
                </m.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}

      <div className="ticket__total">
        <span>
          Total
          <AnimatePresence>
            {saved > 0 && (
              <m.span
                key={saved}
                className="saved"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                Saved {gbp(saved)}
              </m.span>
            )}
          </AnimatePresence>
        </span>
        <m.strong key={total} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {hasFrom && <small>from </small>}
          {gbp(total)}
        </m.strong>
      </div>

      <AnimatePresence>
        {showOffer && offer && (
          <m.div
            key={offer.pkg.id}
            className="ticket__offer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p>{offerLine(offer)}</p>
            <button type="button" className="link" onClick={() => take(offer)}>
              {offer.kind === 'bundle' ? 'Make it five' : 'Switch'}, save {gbp(offer.saving)}
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {onBook && (
        <button type="button" className="cta ticket__go" onClick={onBook} disabled={ids.length === 0}>
          Choose a time <Arrow size={18} />
        </button>
      )}
    </div>
  )
}
