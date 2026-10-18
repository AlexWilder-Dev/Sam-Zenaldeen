import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { reviews, serviceById } from '../data/salon'
import { gbp, listPriceOf, savingOf } from '../lib/visit'
import { ServiceRow } from './ServiceRow'
import { useVisit } from '../lib/VisitContext'
import { Check, Plus } from './Icons'

const jack = reviews.quotes.find((q) => q.id === 'jack')!

// Their own description of the hot towel shave: "a hot towel, followed by a
// traditional shave followed by facial massage"
const STEPS = [
  {
    n: '01',
    title: 'A hot towel',
    body: `“${jack.more}”`,
    credit: `${jack.author}, Google review`,
  },
  {
    n: '02',
    title: 'A traditional shave',
    body: 'The traditional cut-throat shave, with the finest products.',
  },
  {
    n: '03',
    title: 'Facial massage',
    body: 'Then a facial massage, so you leave relaxed and confident.',
  },
]

/* The jaw line the razor follows: a quadratic curve */
const P0 = [52, 120]
const P1 = [160, 236]
const P2 = [268, 120]
const JAW = `M${P0} Q${P1} ${P2}`
function onJaw(t: number) {
  const u = 1 - t
  const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0]
  const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]
  const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0])
  const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1])
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI }
}

function Towel({ steam }: { steam?: MotionValue<number> }) {
  return (
    <g>
      <motion.g style={{ y: steam }}>
        <g opacity=".28">
          <path d="M118 112c-10-14 10-24 0-38s10-24 0-38" />
          <path d="M160 104c-10-14 10-24 0-38s10-24 0-38" />
          <path d="M202 112c-10-14 10-24 0-38s10-24 0-38" />
        </g>
        <g className="steam">
          <path d="M118 112c-10-14 10-24 0-38s10-24 0-38" />
          <path d="M160 104c-10-14 10-24 0-38s10-24 0-38" />
          <path d="M202 112c-10-14 10-24 0-38s10-24 0-38" />
        </g>
      </motion.g>
      <path d="M84 140h150a28 28 0 0 1 0 56H84" />
      <circle cx="84" cy="168" r="28" />
      <path d="M84 168m0-6a6 6 0 1 1-6 6 12 12 0 1 1 12 12 18 18 0 1 1-18-18" />
      <path d="M140 140v56M186 140v56" strokeDasharray="2 6" opacity=".5" />
    </g>
  )
}

function RazorOnJaw({ t }: { t: MotionValue<number> }) {
  const x = useTransform(t, (v) => onJaw(v).x)
  const y = useTransform(t, (v) => onJaw(v).y)
  const rotate = useTransform(t, (v) => onJaw(v).angle)
  return (
    <g>
      <path d={JAW} strokeDasharray="1.5 7" opacity=".55" />
      <motion.path d={JAW} style={{ pathLength: t }} strokeWidth={2.2} />
      <motion.g style={{ x, y, rotate, scale: 1.45 }}>
        {/* blade along the line, handle swung up and back */}
        <path d="M-6 -2h40l2 6c-14 4-28 4-42 0Z" fill="var(--green-deep)" />
        <path d="M-6 -2 -40 -38" strokeWidth={9} strokeLinecap="round" opacity=".35" />
        <path d="M-6 -2 -40 -38" />
        <circle cx="-6" cy="-2" r="2.4" fill="currentColor" />
      </motion.g>
    </g>
  )
}

function Rings({ scale }: { scale?: MotionValue<number> }) {
  return (
    <motion.g style={{ scale }}>
      {[0, 1, 2].map((i) =>
        [116, 204].map((cx) => (
          <circle key={`${i}-${cx}`} className="ring" cx={cx} cy="150" r="22" style={{ animationDelay: `${i * 0.9}s` }} />
        )),
      )}
      <circle cx="116" cy="150" r="5" fill="currentColor" />
      <circle cx="204" cy="150" r="5" fill="currentColor" />
    </motion.g>
  )
}

function Shaves() {
  const luxury = serviceById('luxury-shave')!
  const express = serviceById('express-shave')!
  const five = serviceById('bundle-5-shaves')!
  const withCut = serviceById('pkg-cut-shave')!
  const { has, toggle } = useVisit()
  return (
    <div className="shave__menu wrap">
      <ul className="rows rows--dark">
        <ServiceRow s={luxury} />
        <ServiceRow s={express} />
      </ul>
      <div className="shave__deals">
        {[
          { pkg: five, line: `Five Luxury shaves, ${gbp(savingOf(five))} less than five single visits (${gbp(listPriceOf(five))}).` },
          { pkg: withCut, line: `With a Wash Cut & Finish, ${gbp(savingOf(withCut))} less than booking both (${gbp(listPriceOf(withCut))}).` },
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
              <span>{line}</span>
            </span>
            <span className="row__toggle" aria-hidden>
              {has(pkg.id) ? <Check size={18} /> : <Plus size={18} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ShaveStory() {
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2))

  const o1 = useTransform(p, [0, 0.28, 0.36], [1, 1, 0])
  const o2 = useTransform(p, [0.28, 0.36, 0.61, 0.69], [0, 1, 1, 0])
  const o3 = useTransform(p, [0.61, 0.69, 1], [0, 1, 1])
  const steam = useTransform(p, [0, 0.36], [8, -18])
  const stroke = useTransform(p, [0.38, 0.6], [0, 1], { clamp: true })
  const rings = useTransform(p, [0.66, 1], [0.7, 1.08])
  const opacities = [o1, o2, o3]

  const head = (
    <header className="section__head shave__head">
      <p className="eyebrow eyebrow--gold">The hot towel shave</p>
      <h2 id="shave-title" className="title title--light">
        Sit back and relax
      </h2>
    </header>
  )

  if (reduce) {
    return (
      <section id="shave" className="shave" aria-labelledby="shave-title">
        <div className="wrap">
          {head}
          <ol className="shave__static">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="shave__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.credit && <p className="shave__credit">{s.credit}</p>}
              </li>
            ))}
          </ol>
        </div>
        <Shaves />
      </section>
    )
  }

  return (
    <section id="shave" className="shave" aria-labelledby="shave-title">
      <div className="shave__track" ref={track}>
        <div className="shave__stage">
          <div className="wrap shave__layout">
            {head}
            <div className="shave__art" aria-hidden>
              <svg viewBox="0 0 320 260" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <motion.g style={{ opacity: o1 }}>
                  <Towel steam={steam} />
                </motion.g>
                <motion.g style={{ opacity: o2 }}>
                  <RazorOnJaw t={stroke} />
                </motion.g>
                <motion.g style={{ opacity: o3 }}>
                  <Rings scale={rings} />
                </motion.g>
              </svg>
            </div>
            <div className="shave__steps">
              {STEPS.map((s, i) => (
                <motion.div key={s.n} className="shave__step" style={{ opacity: opacities[i] }} aria-hidden={active !== i}>
                  <span className="shave__n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {s.credit && <p className="shave__credit">{s.credit}</p>}
                </motion.div>
              ))}
            </div>
            <ol className="shave__progress" aria-hidden>
              {STEPS.map((s, i) => (
                <li key={s.n} className={i === active ? 'is-active' : i < active ? 'is-done' : ''}>
                  <span />
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Shaves />
    </section>
  )
}
