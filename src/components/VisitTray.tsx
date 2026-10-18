import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { serviceById } from '../data/salon'
import { useVisit } from '../lib/VisitContext'
import { gbp, type Offer } from '../lib/visit'
import { Arrow, Close } from './Icons'

export function offerLine(o: Offer) {
  if (o.pkg.id === 'father-and-son')
    return `Booking for you and your son (under 18)? Father & Son is ${gbp(o.pkg.price)}, not ${gbp(o.listPrice)}.`
  if (o.kind === 'bundle')
    return `Coming back regularly? ${o.pkg.name} is ${gbp(o.pkg.price)}, not ${gbp(o.listPrice)} for five single visits.`
  return `That’s the ${o.pkg.name} package: ${gbp(o.pkg.price)}, not ${gbp(o.listPrice)}.`
}

export function OfferCard({ offer, onTake }: { offer: Offer; onTake: () => void }) {
  return (
    <motion.div
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
    </motion.div>
  )
}

function offerShort(o: Offer) {
  if (o.pkg.id === 'father-and-son') return `Father & Son: ${gbp(o.pkg.price)}`
  if (o.kind === 'bundle') return `Five visits: ${gbp(o.pkg.price)}`
  return `As a package: ${gbp(o.pkg.price)}`
}

/** One-line version for the tray */
function OfferStrip({ offer, onTake }: { offer: Offer; onTake: () => void }) {
  return (
    <motion.div
      className={`offer offer--strip${offer.kind === 'bundle' ? ' offer--quiet' : ''}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      role="status"
    >
      <p className="offer__text" title={offerLine(offer)}>
        <span aria-hidden>
          {offerShort(offer)} <em>save {gbp(offer.saving)}</em>
        </span>
        <span className="visually-hidden">{offerLine(offer)}</span>
      </p>
      <button type="button" className="offer__take" onClick={onTake}>
        {offer.kind === 'bundle' ? 'Make it five' : 'Switch'}
      </button>
    </motion.div>
  )
}

export function VisitTray() {
  const { ids, total, hasFrom, offer, take, remove } = useVisit()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const n = ids.length

  useEffect(() => {
    document.body.toggleAttribute('data-tray', n > 0)
    return () => document.body.removeAttribute('data-tray')
  }, [n])

  return (
    <AnimatePresence>
      {n > 0 && (
        <motion.aside
          className="tray"
          aria-label="Your visit"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        >
          <AnimatePresence initial={false}>
            {offer && <OfferStrip key={offer.pkg.id} offer={offer} onTake={() => take(offer)} />}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                className="tray__list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {ids.map((id) => {
                  const s = serviceById(id)!
                  return (
                    <li key={id}>
                      <span>{s.name}</span>
                      <span className="tray__price">
                        {s.from && 'from '}
                        {gbp(s.price)}
                      </span>
                      <button type="button" className="tray__remove" onClick={() => remove(id)} aria-label={`Remove ${s.name}`}>
                        <Close size={16} />
                      </button>
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="tray__bar">
            <button type="button" className="tray__summary" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <span className="tray__count">
                {n} {n === 1 ? 'service' : 'services'}
                <small>{open ? 'Hide' : 'Show'}</small>
              </span>
              <motion.span key={total} className="tray__total" initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                {hasFrom && <small>from </small>}
                {gbp(total)}
              </motion.span>
            </button>
            <button type="button" className="btn btn--leather tray__go" onClick={() => navigate('/book')}>
              Choose a time <Arrow size={18} />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
