import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { serviceById } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { useVisit } from '../lib/VisitContext'
import { Check, Plus } from './Icons'
import interior960 from '../assets/img/interior-960.webp'

// Their own description of the hot towel shave: "a hot towel, followed by a
// traditional shave followed by facial massage"
const STEPS = [
  { n: '01', title: 'A hot towel', body: 'The steam comes first.' },
  { n: '02', title: 'A traditional shave', body: 'The cut-throat razor, with the finest products.' },
  { n: '03', title: 'Facial massage', body: 'So you leave relaxed and confident.' },
]

/* The razor's line across the glass: a cubic curve in 0..1 coordinates */
const R = [
  [0.0, 0.42],
  [0.35, 0.3],
  [0.62, 0.66],
  [1.0, 0.5],
]
function razorAt(t: number) {
  const u = 1 - t
  const x = u * u * u * R[0][0] + 3 * u * u * t * R[1][0] + 3 * u * t * t * R[2][0] + t * t * t * R[3][0]
  const y = u * u * u * R[0][1] + 3 * u * u * t * R[1][1] + 3 * u * t * t * R[2][1] + t * t * t * R[3][1]
  const dx = 3 * u * u * (R[1][0] - R[0][0]) + 6 * u * t * (R[2][0] - R[1][0]) + 3 * t * t * (R[3][0] - R[2][0])
  const dy = 3 * u * u * (R[1][1] - R[0][1]) + 6 * u * t * (R[2][1] - R[1][1]) + 3 * t * t * (R[3][1] - R[2][1])
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI }
}

function Reflection({ price, label }: { price: number; label: string }) {
  return (
    <>
      <img className="mirror-glass__room" src={interior960} alt="" width={960} height={409} loading="lazy" />
      <div className="mirror-glass__text">
        <span>{label}</span>
        <strong>£{price}</strong>
      </div>
    </>
  )
}

/** Condensation: a few hundred droplets, scattered once and reused as a texture */
let dropsUrl = ''
function droplets() {
  if (dropsUrl) return dropsUrl
  const c = document.createElement('canvas')
  c.width = 480
  c.height = 600
  const g = c.getContext('2d')
  if (!g) return ''
  for (let i = 0; i < 520; i++) {
    const x = Math.random() * c.width
    const y = Math.random() * c.height
    const r = 0.6 + Math.random() * Math.random() * 4.2
    g.fillStyle = 'rgba(96, 116, 110, 0.32)'
    g.beginPath()
    g.ellipse(x + r * 0.25, y + r * 0.35, r, r * 1.08, 0, 0, Math.PI * 2)
    g.fill()
    g.fillStyle = 'rgba(255, 255, 255, 0.78)'
    g.beginPath()
    g.ellipse(x, y, r * 0.82, r * 0.9, 0, 0, Math.PI * 2)
    g.fill()
  }
  dropsUrl = c.toDataURL('image/png')
  return dropsUrl
}

/**
 * A misted mirror. The mist is a blurred copy of what's behind the glass,
 * shown through a small mask that the razor and your finger wipe clear.
 */
function Mirror() {
  const reduce = useReducedMotion()
  const glass = useRef<HTMLDivElement>(null)
  const mist = useRef<HTMLDivElement>(null)
  const razor = useRef<SVGSVGElement>(null)
  const [hint, setHint] = useState(false)
  const luxury = serviceById('luxury-shave')!

  useEffect(() => {
    const g = glass.current
    const f = mist.current
    const rz = razor.current
    if (reduce || !g || !f || !rz) return

    const drops = f.querySelector<HTMLElement>('.mirror-mist__drops')
    if (drops) drops.style.backgroundImage = `url(${droplets()})`

    const W = 120
    const H = 150
    const c = document.createElement('canvas')
    c.width = W
    c.height = H
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, W, H)

    let queued = false
    const commit = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        const url = `url(${c.toDataURL()})`
        f.style.setProperty('-webkit-mask-image', url)
        f.style.setProperty('mask-image', url)
      })
    }
    commit()

    const wipe = (x: number, y: number, r: number) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, 'rgba(0,0,0,1)')
      grad.addColorStop(0.6, 'rgba(0,0,0,0.85)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = grad
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
      ctx.globalCompositeOperation = 'source-over'
    }
    const line = (x0: number, y0: number, x1: number, y1: number, r: number) => {
      const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / (r * 0.35)))
      for (let i = 1; i <= steps; i++) wipe(x0 + ((x1 - x0) * i) / steps, y0 + ((y1 - y0) * i) / steps, r)
    }

    // Mist returns slowly after a wipe, as a mirror does in a warm room
    let regrow = 0
    let idle = 0
    const misting = () => {
      window.clearTimeout(idle)
      window.clearInterval(regrow)
      idle = window.setTimeout(() => {
        let n = 0
        regrow = window.setInterval(() => {
          ctx.globalAlpha = 0.06
          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, W, H)
          ctx.globalAlpha = 1
          commit()
          if (++n > 70) window.clearInterval(regrow)
        }, 70)
      }, 1600)
    }

    let last: { x: number; y: number } | null = null
    const onMove = (e: PointerEvent) => {
      const r = g.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * W
      const y = ((e.clientY - r.top) / r.height) * H
      if (last) line(last.x, last.y, x, y, 13)
      else wipe(x, y, 13)
      last = { x, y }
      commit()
      misting()
    }
    const onLeave = () => (last = null)
    g.addEventListener('pointermove', onMove)
    g.addEventListener('pointerleave', onLeave)
    g.addEventListener('pointercancel', onLeave)
    g.addEventListener('pointerup', onLeave)

    // Once in view: the steam settles, then the razor takes one stroke
    let raf = 0
    let timer = 0
    const shave = () => {
      const start = performance.now()
      const dur = 1500
      let prev = razorAt(0)
      rz.style.opacity = '1'
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        const p = razorAt(eased)
        line(prev.x * W, prev.y * H, p.x * W, p.y * H, 22)
        prev = p
        commit()
        rz.style.transform = `translate(${p.x * g.clientWidth}px, ${p.y * g.clientHeight}px) rotate(${p.angle}deg)`
        if (t < 1) raf = requestAnimationFrame(step)
        else {
          rz.style.opacity = '0'
          setHint(true)
        }
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        f.classList.add('is-on')
        timer = window.setTimeout(shave, 1300)
      },
      { threshold: 0.5 },
    )
    io.observe(g)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      window.clearTimeout(idle)
      window.clearInterval(regrow)
      g.removeEventListener('pointermove', onMove)
      g.removeEventListener('pointerleave', onLeave)
      g.removeEventListener('pointercancel', onLeave)
      g.removeEventListener('pointerup', onLeave)
    }
  }, [reduce])

  return (
    <figure className="mirror-frame">
      <span className="mirror-frame__lamp" aria-hidden />
      <div className="mirror-glass" ref={glass}>
        <Reflection price={luxury.price} label={luxury.name} />
        {!reduce && (
          <div className="mirror-mist" ref={mist} aria-hidden>
            <div className="mirror-mist__blur">
              <Reflection price={luxury.price} label={luxury.name} />
            </div>
            <span className="mirror-mist__haze" />
            <span className="mirror-mist__drops" />
          </div>
        )}
        <svg className="mirror-razor" ref={razor} viewBox="-60 -40 130 60" aria-hidden>
          <path d="M-4 -6h56l6 8c-22 7-44 7-62 0Z" fill="#eef1ef" stroke="#1b1a18" strokeWidth="1.2" />
          <path d="M-4 -6 -52 -34" stroke="#2a1d17" strokeWidth="10" strokeLinecap="round" />
          <circle cx="-4" cy="-6" r="3.2" fill="#be9f4a" />
        </svg>
        <p className={`mirror-glass__hint${hint ? ' is-on' : ''}`} aria-hidden>
          Wipe the glass
        </p>
      </div>
    </figure>
  )
}

export function ShaveMirror() {
  const { has, toggle } = useVisit()
  const luxury = serviceById('luxury-shave')!
  const express = serviceById('express-shave')!
  const five = serviceById('bundle-5-shaves')!
  const withCut = serviceById('pkg-cut-shave')!

  return (
    <section id="shave" className="section shave" aria-labelledby="shave-title">
      <div className="wrap shave__layout">
        <Mirror />
        <div className="shave__text">
          <p className="eyebrow eyebrow--gold">The hot towel shave</p>
          <h2 id="shave-title" className="title title--light">
            Sit back
            <br />
            <em>and relax.</em>
          </h2>
          <ol className="shave__steps">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span>{s.n}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="shave__add">
            {[luxury, express].map((s) => (
              <button
                key={s.id}
                type="button"
                className={`chip${has(s.id) ? ' is-on' : ''}`}
                aria-pressed={has(s.id)}
                onClick={() => toggle(s.id)}
              >
                {has(s.id) ? <Check size={16} /> : <Plus size={16} />}
                {s.name} £{s.price}
              </button>
            ))}
          </div>
          <div className="deals">
            {[
              { pkg: five, line: `Five Luxury shaves. ${gbp(listPriceOf(five))} as single visits.` },
              { pkg: withCut, line: `With a Wash Cut & Finish. ${gbp(listPriceOf(withCut))} booked separately.` },
            ].map(({ pkg, line }) => (
              <button
                key={pkg.id}
                type="button"
                className={`deal${has(pkg.id) ? ' is-on' : ''}`}
                aria-pressed={has(pkg.id)}
                onClick={() => toggle(pkg.id)}
              >
                <span className="deal__price">£{pkg.price}</span>
                <span className="deal__text">
                  <strong>{pkg.name}</strong>
                  <span>
                    {line} <em>Save {gbp(savingOf(pkg))}.</em>
                  </span>
                </span>
                <span className="row__toggle" aria-hidden>
                  {has(pkg.id) ? <Check size={18} /> : <Plus size={18} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
