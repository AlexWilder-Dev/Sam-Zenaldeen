import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
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
  [0.06, 0.3],
  [0.4, 0.1],
  [0.6, 0.86],
  [0.94, 0.62],
]
function razorAt(t: number) {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const e = t * t * t
  const x = a * R[0][0] + b * R[1][0] + c * R[2][0] + e * R[3][0]
  const y = a * R[0][1] + b * R[1][1] + c * R[2][1] + e * R[3][1]
  const dx = 3 * u * u * (R[1][0] - R[0][0]) + 6 * u * t * (R[2][0] - R[1][0]) + 3 * t * t * (R[3][0] - R[2][0])
  const dy = 3 * u * u * (R[1][1] - R[0][1]) + 6 * u * t * (R[2][1] - R[1][1]) + 3 * t * t * (R[3][1] - R[2][1])
  return { x, y, angle: Math.atan2(dy, dx) }
}
const MASSAGE = [
  [0.3, 0.58],
  [0.7, 0.44],
]

function makeFog(w: number, h: number, dpr: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')!
  g.fillStyle = 'rgb(206, 216, 211)'
  g.fillRect(0, 0, w, h)
  const big = Math.max(w, h)
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const r = (0.06 + Math.random() * 0.22) * big
    const light = Math.random() > 0.45
    const rgb = light ? '244, 247, 245' : '150, 168, 161'
    const grad = g.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, `rgba(${rgb}, ${light ? 0.3 : 0.22})`)
    grad.addColorStop(1, `rgba(${rgb}, 0)`)
    g.fillStyle = grad
    g.fillRect(x - r, y - r, r * 2, r * 2)
  }
  const drops = Math.round((w * h) / (2200 * dpr * dpr))
  for (let i = 0; i < drops; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const r = (0.6 + Math.random() * Math.random() * 3.4) * dpr
    g.fillStyle = 'rgba(110, 130, 124, 0.32)'
    g.beginPath()
    g.arc(x + r * 0.3, y + r * 0.35, r, 0, Math.PI * 2)
    g.fill()
    g.fillStyle = 'rgba(255, 255, 255, 0.6)'
    g.beginPath()
    g.arc(x, y, r * 0.82, 0, Math.PI * 2)
    g.fill()
  }
  return c
}

function useFog(
  glass: RefObject<HTMLDivElement | null>,
  canvas: RefObject<HTMLCanvasElement | null>,
  fog: MotionValue<number>,
  razor: MotionValue<number>,
  massage: MotionValue<number>,
) {
  useEffect(() => {
    const el = glass.current
    const cv = canvas.current
    if (!el || !cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    let texture: HTMLCanvasElement | null = null
    const mask = document.createElement('canvas')
    const mctx = mask.getContext('2d')!
    let maskLive = 0
    let visible = false
    let raf = 0
    let last: { x: number; y: number } | null = null

    const size = () => {
      const r = el.getBoundingClientRect()
      W = Math.max(1, Math.round(r.width * dpr))
      H = Math.max(1, Math.round(r.height * dpr))
      cv.width = W
      cv.height = H
      mask.width = W
      mask.height = H
      texture = makeFog(W, H, dpr)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(el)

    const brush = (x: number, y: number) => {
      const r = Math.max(W, H) * 0.09
      const grad = mctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, 'rgba(0,0,0,1)')
      grad.addColorStop(0.55, 'rgba(0,0,0,0.9)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      mctx.globalCompositeOperation = 'source-over'
      mctx.fillStyle = grad
      mctx.fillRect(x - r, y - r, r * 2, r * 2)
    }
    const onMove = (e: PointerEvent) => {
      if (fog.get() < 0.2) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) * dpr
      const y = (e.clientY - r.top) * dpr
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y)
        const steps = Math.max(1, Math.ceil(dist / (Math.max(W, H) * 0.03)))
        for (let i = 1; i <= steps; i++) brush(last.x + ((x - last.x) * i) / steps, last.y + ((y - last.y) * i) / steps)
      } else brush(x, y)
      last = { x, y }
      maskLive = 240
    }
    const onLeave = () => (last = null)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerup', onLeave)
    el.addEventListener('pointercancel', onLeave)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible || !texture) return
      const f = fog.get()
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, W, H)
      if (f <= 0.001) return

      // Steam rises from the bottom of the glass
      ctx.globalAlpha = 0.93
      ctx.drawImage(texture, 0, 0)
      ctx.globalAlpha = 1
      const top = H * (1 - f * 1.35)
      ctx.globalCompositeOperation = 'destination-in'
      const rise = ctx.createLinearGradient(0, top - H * 0.28, 0, top + H * 0.06)
      rise.addColorStop(0, 'rgba(0,0,0,0)')
      rise.addColorStop(1, 'rgba(0,0,0,1)')
      ctx.fillStyle = rise
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'destination-out'
      // The razor's clean line
      const t = razor.get()
      if (t > 0) {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = Math.min(W, H) * 0.2
        ctx.strokeStyle = 'rgba(0,0,0,1)'
        ctx.shadowColor = 'rgba(0,0,0,1)'
        ctx.shadowBlur = Math.min(W, H) * 0.05
        ctx.beginPath()
        const n = Math.max(2, Math.round(t * 80))
        for (let i = 0; i <= n; i++) {
          const pt = razorAt((i / n) * t)
          if (i === 0) ctx.moveTo(pt.x * W, pt.y * H)
          else ctx.lineTo(pt.x * W, pt.y * H)
        }
        ctx.stroke()
        ctx.restore()
      }
      // Massage: two widening circles clear the rest
      const m = massage.get()
      if (m > 0) {
        const maxR = Math.hypot(W, H) * 0.72
        for (const [cx, cy] of MASSAGE) {
          const r = Math.max(1, maxR * m)
          const grad = ctx.createRadialGradient(cx * W, cy * H, 0, cx * W, cy * H, r)
          grad.addColorStop(0, 'rgba(0,0,0,1)')
          grad.addColorStop(0.72, 'rgba(0,0,0,0.95)')
          grad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = grad
          ctx.fillRect(cx * W - r, cy * H - r, r * 2, r * 2)
        }
      }
      // Finger and pointer wipes, which mist over again
      if (maskLive > 0) {
        ctx.drawImage(mask, 0, 0)
        mctx.globalCompositeOperation = 'destination-out'
        mctx.fillStyle = 'rgba(0,0,0,0.012)'
        mctx.fillRect(0, 0, W, H)
        maskLive--
        if (maskLive === 0) mctx.clearRect(0, 0, W, H)
      }
      ctx.globalCompositeOperation = 'source-over'
    }
    raf = requestAnimationFrame(draw)

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerup', onLeave)
      el.removeEventListener('pointercancel', onLeave)
    }
  }, [glass, canvas, fog, razor, massage])
}

function RazorTip({ t }: { t: MotionValue<number> }) {
  const left = useTransform(t, (v) => `${razorAt(v).x * 100}%`)
  const top = useTransform(t, (v) => `${razorAt(v).y * 100}%`)
  const rotate = useTransform(t, (v) => (razorAt(v).angle * 180) / Math.PI)
  const opacity = useTransform(t, [0, 0.04, 0.96, 1], [0, 1, 1, 0])
  return (
    <motion.svg className="razor-tip" viewBox="-60 -40 130 60" style={{ left, top, rotate, opacity }} aria-hidden>
      <path d="M-4 -6h56l6 8c-22 7-44 7-62 0Z" fill="#e9ecea" stroke="#1b1a18" strokeWidth="1.2" />
      <path d="M-4 -6 -52 -34" stroke="#1b1a18" strokeWidth="11" strokeLinecap="round" />
      <path d="M-4 -6 -52 -34" stroke="#3a2a22" strokeWidth="8" strokeLinecap="round" />
      <circle cx="-4" cy="-6" r="3.2" fill="#be9f4a" />
    </motion.svg>
  )
}

function GlassContent() {
  const luxury = serviceById('luxury-shave')!
  const express = serviceById('express-shave')!
  const { has, toggle } = useVisit()
  return (
    <div className="glass-content">
      <p className="eyebrow eyebrow--gold">{luxury.name}</p>
      <p className="glass-content__price">£{luxury.price}</p>
      <p className="glass-content__alt">
        or the {express.name}, £{express.price}
      </p>
      <div className="glass-content__add">
        {[luxury, express].map((s) => (
          <button
            key={s.id}
            type="button"
            className={`chip${has(s.id) ? ' is-on' : ''}`}
            aria-pressed={has(s.id)}
            onClick={() => toggle(s.id)}
          >
            {has(s.id) ? <Check size={16} /> : <Plus size={16} />}
            {s.id === 'luxury-shave' ? 'Luxury' : 'Express'} £{s.price}
          </button>
        ))}
      </div>
    </div>
  )
}

function Deals() {
  const five = serviceById('bundle-5-shaves')!
  const withCut = serviceById('pkg-cut-shave')!
  const { has, toggle } = useVisit()
  return (
    <div className="deals wrap">
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
  )
}

export function SteamMirror() {
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const glass = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress: p } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const fog = useTransform(p, [0.02, 0.28], [0, 1], { clamp: true })
  const razor = useTransform(p, [0.34, 0.6], [0, 1], { clamp: true })
  const massage = useTransform(p, [0.68, 0.94], [0, 1], { clamp: true })
  const steam = useTransform(p, [0, 0.12, 0.3, 0.4], [0, 1, 1, 0])
  const hint = useTransform(p, [0.26, 0.32, 0.66, 0.72], [0, 1, 1, 0])
  useMotionValueEvent(p, 'change', (v) => setActive(v < 0.32 ? 0 : v < 0.65 ? 1 : 2))
  useFog(glass, canvas, fog, razor, massage)

  const head = (
    <header className="steam__head">
      <p className="eyebrow eyebrow--gold">The hot towel shave</p>
      <h2 id="shave-title" className="title title--light">
        Sit back and relax
      </h2>
    </header>
  )

  if (reduce) {
    return (
      <section id="shave" className="steam steam--static" aria-labelledby="shave-title">
        <div className="wrap">
          {head}
          <div className="steam-mirror">
            <div className="steam-mirror__glass">
              <img className="steam-mirror__reflection" src={interior960} alt="" />
              <GlassContent />
            </div>
          </div>
          <ol className="steam__steps">
            {STEPS.map((s) => (
              <li key={s.n} className="is-active">
                <span>{s.n}</span>
                <strong>{s.title}</strong> {s.body}
              </li>
            ))}
          </ol>
        </div>
        <Deals />
      </section>
    )
  }

  return (
    <section id="shave" className="steam" aria-labelledby="shave-title">
      <div className="steam__track" ref={track}>
        <div className="steam__stage">
          <div className="wrap steam__layout">
            {head}
            <div className="steam-mirror">
              <span className="steam-mirror__lamp" aria-hidden />
              <div className="steam-mirror__glass" ref={glass} data-cursor="Wipe">
                <img className="steam-mirror__reflection" src={interior960} alt="" />
                <GlassContent />
                <canvas ref={canvas} className="steam-mirror__fog" aria-hidden />
                <motion.svg className="steam-mirror__wisps" viewBox="0 0 300 160" style={{ opacity: steam }} aria-hidden>
                  <path d="M70 160c-14-22 14-38 0-60s14-38 0-60" />
                  <path d="M150 160c-14-22 14-38 0-60s14-38 0-60" />
                  <path d="M230 160c-14-22 14-38 0-60s14-38 0-60" />
                </motion.svg>
                <RazorTip t={razor} />
                <motion.p className="steam-mirror__hint" style={{ opacity: hint }} aria-hidden>
                  Wipe the glass
                </motion.p>
              </div>
            </div>
            <ol className="steam__steps">
              {STEPS.map((s, i) => (
                <li key={s.n} className={i === active ? 'is-active' : i < active ? 'is-done' : ''}>
                  <span>{s.n}</span>
                  <strong>{s.title}</strong> {s.body}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Deals />
    </section>
  )
}
