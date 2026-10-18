import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useVisit } from '../lib/VisitContext'
import { gbp, offerLine, type Offer } from '../lib/visit'
import { Ticket, useSaved } from './Ticket'
import { Arrow, Close } from './Icons'

/** Full-width suggestion, used on the booking page */
export function OfferCard({ offer, onTake }: { offer: Offer; onTake: () => void }) {
  return (
    <m.div
      className="offer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      role="status"
    >
      <p className="offer__text">{offerLine(offer)}</p>
      <button type="button" className="offer__take" onClick={onTake}>
        {offer.kind === 'bundle' ? 'Make it five' : 'Switch to the package'} · save {gbp(offer.saving)}
      </button>
    </m.div>
  )
}

function offerShort(o: Offer) {
  if (o.pkg.id === 'father-and-son') return `Father & Son: ${gbp(o.pkg.price)}`
  if (o.kind === 'bundle') return `Five visits: ${gbp(o.pkg.price)}`
  return `As a package: ${gbp(o.pkg.price)}`
}

/** The ticket, folded down to a bar at the bottom of the screen */
export function VisitTray() {
  const { ids, total, hasFrom, offer, take } = useVisit()
  const saved = useSaved(ids)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const n = ids.length

  useEffect(() => {
    document.body.toggleAttribute('data-tray', n > 0)
    if (n === 0) setOpen(false)
    return () => document.body.removeAttribute('data-tray')
  }, [n])

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <m.div
              className="ticket-sheet"
              role="dialog"
              aria-label="Your ticket"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="ticket-sheet__close" onClick={() => setOpen(false)} aria-label="Close ticket">
                <Close size={20} />
              </button>
              <Ticket onBook={() => navigate('/book')} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {n > 0 && !open && (
          <m.aside
            className="tray"
            aria-label="Your visit"
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            exit={{ y: '120%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          >
            <AnimatePresence initial={false}>
              {offer && (
                <m.div
                  key={offer.pkg.id}
                  className={`offer offer--strip${offer.kind === 'bundle' ? ' offer--quiet' : ''}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  role="status"
                >
                  <p className="offer__text" title={offerLine(offer)}>
                    <span aria-hidden>
                      {offerShort(offer)} <em>save {gbp(offer.saving)}</em>
                    </span>
                    <span className="visually-hidden">{offerLine(offer)}</span>
                  </p>
                  <button type="button" className="offer__take" onClick={() => take(offer)}>
                    {offer.kind === 'bundle' ? 'Make it five' : 'Switch'}
                  </button>
                </m.div>
              )}
            </AnimatePresence>
            <div className="tray__bar">
              <button type="button" className="tray__summary" onClick={() => setOpen(true)}>
                <span className="tray__count">
                  {n} {n === 1 ? 'service' : 'services'}
                  <small>{saved > 0 ? `Saved ${gbp(saved)} · ticket` : 'See ticket'}</small>
                </span>
                <m.span key={total} className="tray__total" initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  {hasFrom && <small>from </small>}
                  {gbp(total)}
                </m.span>
              </button>
              <button type="button" className="btn btn--leather tray__go" onClick={() => navigate('/book')}>
                Choose a time <Arrow size={18} />
              </button>
            </div>
          </m.aside>
        )}
      </AnimatePresence>
    </>
  )
}
