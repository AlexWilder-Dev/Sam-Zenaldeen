import { AnimatePresence, m, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'
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
  const shake = useAnimationControls()
  const prevSaved = useRef(saved)

  // The stamp lands with a thump
  useEffect(() => {
    if (saved > prevSaved.current) shake.start({ x: [0, -5, 4, -2, 0], transition: { duration: 0.35, delay: 0.12 } })
    prevSaved.current = saved
  }, [saved, shake])

  return (
    <m.div className="ticket" animate={shake}>
      <div className="ticket__head">
        <span className="ticket__sz">SZ</span>
        <span>Your visit</span>
        <span>119 Sheen Lane</span>
      </div>

      {ids.length === 0 ? (
        <p className="ticket__empty">Tap a price to start your ticket.</p>
      ) : (
        <ul className="ticket__items">
          <AnimatePresence initial={false}>
            {ids.map((id) => {
              const s = serviceById(id)!
              return (
                <m.li
                  key={id}

                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span>{s.name}</span>
                  <span className="ticket__price">
                    {s.from && <small>from </small>}
                    {gbp(s.price)}
                  </span>
                  <button type="button" onClick={() => remove(id)} aria-label={`Remove ${s.name}`}>
                    <Close size={14} />
                  </button>
                </m.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}

      <div className="ticket__total">
        <span>Total</span>
        <m.strong key={total} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {hasFrom && <small>from </small>}
          {gbp(total)}
        </m.strong>
        <AnimatePresence>
          {saved > 0 && (
            <m.div
              key={saved}
              className="stamp"
              initial={{ scale: 2.4, opacity: 0, rotate: -24 }}
              animate={{ scale: 1, opacity: 1, rotate: -11 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 520, damping: 17 }}
              aria-label={`You save ${gbp(saved)}`}
            >
              <span>Saved</span>
              <strong>{gbp(saved)}</strong>
            </m.div>
          )}
        </AnimatePresence>
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
            <button type="button" onClick={() => take(offer)}>
              {offer.kind === 'bundle' ? 'Make it five' : 'Switch'} · save {gbp(offer.saving)}
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {onBook && (
        <button type="button" className="btn btn--leather btn--block ticket__go" onClick={onBook} disabled={ids.length === 0}>
          Choose a time <Arrow size={18} />
        </button>
      )}
    </m.div>
  )
}
