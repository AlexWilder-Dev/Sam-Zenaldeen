import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { reviews, salon, serviceById } from '../data/salon'
import { scrollToId, telHref, waHref } from '../lib/contact'
import { statusAt, formatTime, hoursFor } from '../lib/time'
import { useLondonNow } from '../lib/useLondonNow'
import { useVisit } from '../lib/VisitContext'
import { gbp } from '../lib/visit'
import { RoomDrawing, type Pick } from './RoomDrawing'
import { Live } from './Live'
import { Arrow, Check, Close, Plus } from './Icons'

/* What each part of the room offers */
const PICKS: Record<Pick, { id: string; note: string }> = {
  cut: { id: 'wash-cut-finish', note: 'Every appointment begins with a consultation.' },
  wash: { id: 'wash-blow-dry', note: '' },
  shave: { id: 'luxury-shave', note: 'A hot towel, a traditional shave, facial massage.' },
  family: { id: 'father-and-son', note: 'Son under 18 years.' },
}

function PickCard({ kind, at, onClose }: { kind: Pick; at: { x: number; y: number; flip: boolean }; onClose: () => void }) {
  const { has, toggle } = useVisit()
  const s = serviceById(PICKS[kind].id)!
  const on = has(s.id)
  return (
    <m.div
      className={`pick${at.flip ? ' pick--flip' : ''}`}
      style={{ left: at.x, top: at.y }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-label={s.name}
    >
      <button type="button" className="pick__close" onClick={onClose} aria-label="Close">
        <Close size={14} />
      </button>
      <p className="pick__name">{s.name}</p>
      <p className="pick__price">{gbp(s.price)}</p>
      {PICKS[kind].note && <p className="pick__note">{PICKS[kind].note}</p>}
      <div className="pick__actions">
        <button type="button" className={`pick__add${on ? ' is-on' : ''}`} onClick={() => toggle(s.id)} aria-pressed={on}>
          {on ? <Check size={15} /> : <Plus size={15} />} {on ? 'In your visit' : 'Add to visit'}
        </button>
        <button type="button" className="pick__more" onClick={() => scrollToId('prices')}>
          All prices
        </button>
      </div>
    </m.div>
  )
}

function Room({ lit }: { lit: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const [pick, setPick] = useState<{ kind: Pick; x: number; y: number; flip: boolean } | null>(null)
  const [moved, setMoved] = useState(false)

  const onPick = useCallback((kind: Pick, el: Element) => {
    const b = box.current
    if (!b) return
    const r = el.getBoundingClientRect()
    const o = b.getBoundingClientRect()
    const x = Math.min(Math.max(r.left + r.width / 2 - o.left, 120), o.width - 120)
    // Above the thing pressed, unless that would run under the header
    const flip = r.top < 300
    setPick({ kind, x, y: flip ? r.bottom - o.top + 10 : r.top - o.top - 10, flip })
  }, [])

  useEffect(() => {
    if (!pick) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPick(null)
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('.pick, .target')) setPick(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [pick])

  useEffect(() => {
    const el = strip.current
    if (!el) return
    const on = () => {
      if (el.scrollLeft > 12) setMoved(true)
      setPick(null)
    }
    el.addEventListener('scroll', on, { passive: true })
    return () => el.removeEventListener('scroll', on)
  }, [])

  return (
    <div className="room" ref={box}>
      <div className="room__strip" ref={strip} tabIndex={-1}>
        <div className="room__canvas">
          <RoomDrawing lit={lit} onPick={onPick} />
        </div>
      </div>
      <p className={`room__swipe${moved || pick ? ' is-gone' : ''}`} aria-hidden>
        Swipe to look round
      </p>
      <AnimatePresence>
        {pick && <PickCard key={pick.kind + pick.x} kind={pick.kind} at={pick} onClose={() => setPick(null)} />}
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  const navigate = useNavigate()
  const now = useLondonNow()
  const s = statusAt(now)
  const today = hoursFor(now.day)
  const cut = serviceById('wash-cut-finish')!
  const lights = s.open ? `Lights on until ${formatTime(today.close)}` : s.headline.replace('Closed, ', 'Lights off. ').replace('opens', 'On at')

  return (
    <section className="hero" aria-label="Open now, prices and booking">
      <div className="hero__grid">
        <h1 className="hero__title">
          Sharp <em>and</em>
          <br />
          dapper.
        </h1>
        <div className="hero__side">
          <Live />
          <div className="hero__price">
            <span>{cut.name}</span>
            <strong>{gbp(cut.price)}</strong>
          </div>
          <button type="button" className="cta" onClick={() => navigate('/book')}>
            Book a time <Arrow size={18} />
          </button>
          <p className="hero__links">
            <a href={telHref}>Call {salon.phone.display}</a>
            <a href={waHref()} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </p>
        </div>
        <p className="hero__meta">
          <span>Gentlemen’s grooming</span>
          <span>119 Sheen Lane, SW14</span>
        </p>
      </div>

      <Room lit={s.open} />
      <p className="hero__caption">
        <span>
          The salon at 119 Sheen Lane. <em>{lights}.</em>
        </span>
        <span>
          Tap a chair, a basin, the towels or the bench · {reviews.rating} on Google from {reviews.count} reviews
        </span>
      </p>
    </section>
  )
}
