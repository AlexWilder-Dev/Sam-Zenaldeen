import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { reviews, salon, serviceById } from '../data/salon'
import { telHref, waHref } from '../lib/contact'
import { StatusLamp } from './StatusLamp'
import { Chat, Phone, Star } from './Icons'
import interior1600 from '../assets/img/interior-1600.webp'

/* Points in the owner's panorama, as fractions of its width and height */
const SPOTS = [
  { x: 0.1, y: 0.22, label: 'Walnut mirrors, brass lamps' },
  { x: 0.21, y: 0.62, label: 'A basin at every station' },
  { x: 0.43, y: 0.69, label: 'Red leather chairs' },
  { x: 0.71, y: 0.44, label: 'Sam' },
  { x: 0.925, y: 0.7, label: 'The red bench' },
]

/** The room, swiped sideways with the finger like looking round from the doorway */
function Room() {
  const strip = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)
  const [moved, setMoved] = useState(false)

  useEffect(() => {
    const el = strip.current
    if (!el) return
    let raf = 0
    const read = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const w = el.scrollWidth
        // Only pick a spot by position when the room is wider than the screen
        if (w <= el.clientWidth + 2) return
        const centre = el.scrollLeft + el.clientWidth / 2
        let best = 0
        let bestD = Infinity
        SPOTS.forEach((s, i) => {
          const d = Math.abs(s.x * w - centre)
          if (d < bestD) {
            best = i
            bestD = d
          }
        })
        setActive(best)
        if (el.scrollLeft > 12) setMoved(true)
      })
    }
    read()
    el.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])

  const show = (i: number) => {
    const el = strip.current
    if (!el) return
    setActive(i)
    if (el.scrollWidth > el.clientWidth + 2) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ left: SPOTS[i].x * el.scrollWidth - el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  return (
    <div className="room">
      <div
        className="room__strip"
        ref={strip}
        tabIndex={0}
        role="region"
        aria-label="Panorama of the salon. Scroll sideways to look around."
      >
        <div className="room__pano">
          <img
            src={interior1600}
            alt="Inside the salon: walnut-framed mirrors with brass lamps and white basins along one wall, red leather barber chairs, and Sam at the counter beside the red buttoned bench"
            width={1600}
            height={681}
            fetchPriority="high"
          />
          {SPOTS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              className={`spot${i === active ? ' is-active' : ''}${s.x < 0.15 ? ' spot--start' : s.x > 0.85 ? ' spot--end' : ''}`}
              style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}
              onClick={() => show(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="spot__dot" aria-hidden />
              <span className="spot__label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      <p className={`room__swipe${moved ? ' is-gone' : ''}`} aria-hidden>
        Swipe to look round
      </p>
    </div>
  )
}

export function Hero() {
  const navigate = useNavigate()
  const cut = serviceById('wash-cut-finish')!
  const teen = serviceById('teen-wash-cut-finish')!
  const clipper = serviceById('clipper-one-grade')!
  const express = serviceById('express-shave')!

  return (
    <section className="hero" aria-label="Open now, prices and booking">
      <div className="hero__frame">
        <Room />
        <h1 className="hero__title">
          Leave sharp
          <br />
          <em>and dapper.</em>
        </h1>
      </div>

      <div className="hero__info">
        <StatusLamp />
        <div className="hero__price">
          <span>{cut.name}</span>
          <strong>£{cut.price}</strong>
        </div>
        <p className="hero__others">
          Teen £{teen.price} · Clipper all over £{clipper.price} · Hot towel shave from £{express.price}
        </p>
        <div className="hero__actions">
          <button className="btn btn--leather btn--block" onClick={() => navigate('/book')}>
            Request a time
          </button>
          <a className="btn btn--line" href={telHref}>
            <Phone size={18} /> Call
          </a>
          <a className="btn btn--line" href={waHref()} target="_blank" rel="noopener">
            <Chat size={18} /> WhatsApp
          </a>
        </div>
        <a className="hero__rating" href={salon.links.reviews} target="_blank" rel="noopener">
          <span className="stars" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={13} />
            ))}
          </span>
          {reviews.rating} on Google from {reviews.count} reviews
        </a>
      </div>
    </section>
  )
}
