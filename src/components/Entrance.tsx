import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { reviews, salon, serviceById } from '../data/salon'
import { telHref, waHref } from '../lib/contact'
import { StatusLamp } from './StatusLamp'
import { Chat, Phone, Star } from './Icons'
import markUrl from '../assets/img/sz-mark.png'
import interior1600 from '../assets/img/interior-1600.webp'
import interior960 from '../assets/img/interior-960.webp'

const PANO_RATIO = 1600 / 681

/* Points in the owner's panorama, as fractions of its width and height */
const SPOTS = [
  { x: 0.1, y: 0.17, title: 'Walnut mirrors', line: 'Full-height walnut frames, each with its own brass lamp.' },
  { x: 0.21, y: 0.62, title: 'A basin at every station', line: 'White ceramic basins set into walnut and black granite.' },
  { x: 0.43, y: 0.69, title: 'Red leather chairs', line: 'Chrome, white piping, and room to sit back and relax.' },
  { x: 0.71, y: 0.44, title: 'Sam', line: 'Fourteen years a barber when he opened his own salon on Sheen Lane.' },
  { x: 0.925, y: 0.7, title: 'The red bench', line: 'Take a seat. Seven Google reviews mention the free drinks.' },
]

function useViewport() {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    // Ignore the small height changes of mobile toolbars showing and hiding
    let last = { w: window.innerWidth, h: window.innerHeight }
    const on = () => {
      const next = { w: window.innerWidth, h: window.innerHeight }
      if (next.w !== last.w || Math.abs(next.h - last.h) > 120) {
        last = next
        setVp(next)
      }
    }
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

/** The sign board, laid out as it is painted on Sheen Lane */
function Fascia() {
  return (
    <header className="fascia">
      <div className="fascia__board">
        <a className="fascia__painted fascia__painted--left" href={`tel:${salon.phone.tel}`}>
          {salon.phone.display}
        </a>
        <div className="fascia__sign">
          <img className="fascia__mark" src={markUrl} alt="" width={200} height={200} />
          <h1 className="wordmark">
            <span className="wordmark__name gilt">Sam Zenaldeen</span>
            <span className="wordmark__trade gilt">Gentlemen’s Grooming</span>
          </h1>
        </div>
        <span className="fascia__painted fascia__painted--right">{salon.web}</span>
      </div>
    </header>
  )
}

function DoorGlass({ style }: { style?: { opacity: MotionValue<number>; y: MotionValue<number> } }) {
  const navigate = useNavigate()
  const cut = serviceById('wash-cut-finish')!
  const teen = serviceById('teen-wash-cut-finish')!
  const express = serviceById('express-shave')!
  return (
    <motion.div className="glass" style={style}>
      <StatusLamp />
      <div className="glass__price">
        <p className="glass__label">{cut.name}</p>
        <p className="glass__amount">£{cut.price}</p>
        <p className="glass__others">
          Teen £{teen.price} · Hot towel shave from £{express.price}
        </p>
      </div>
      <div className="glass__actions">
        <button className="btn btn--leather btn--block" onClick={() => navigate('/book')}>
          Request a time
        </button>
        <div className="glass__row">
          <a className="btn btn--line" href={telHref}>
            <Phone size={18} /> Call
          </a>
          <a className="btn btn--line" href={waHref()} target="_blank" rel="noopener">
            <Chat size={18} /> WhatsApp
          </a>
        </div>
      </div>
      <a className="glass__rating" href={salon.links.reviews} target="_blank" rel="noopener">
        <span className="stars" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={12} />
          ))}
        </span>
        {reviews.rating} on Google · {reviews.count} reviews
      </a>
    </motion.div>
  )
}

/** Shop window: the room seen from the street, shifting a little with the pointer */
function ShopWindow({ side, tilt }: { side: 'left' | 'right'; tilt: MotionValue<number> }) {
  const x = useTransform(tilt, (v) => v * (side === 'left' ? 14 : 10))
  return (
    <div className={`window window--${side}`} aria-hidden>
      <motion.img src={interior960} alt="" style={{ x }} width={960} height={409} />
      <span className="window__glow" />
      <span className="window__sheen" />
    </div>
  )
}

function Captions({ active }: { active: number }) {
  return (
    <div className="captions" aria-live="polite">
      {SPOTS.map((s, i) => (
        <motion.div
          key={s.title}
          className="caption"
          initial={false}
          animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 14 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          aria-hidden={i !== active}
        >
          <span className="caption__n">
            {String(i + 1).padStart(2, '0')} / {String(SPOTS.length).padStart(2, '0')}
          </span>
          <strong>{s.title}</strong>
          <span>{s.line}</span>
        </motion.div>
      ))}
    </div>
  )
}

export function Entrance() {
  const reduce = useReducedMotion()
  const vp = useViewport()
  const track = useRef<HTMLElement>(null)
  const doorway = useRef<HTMLDivElement>(null)
  const facade = useRef<HTMLDivElement>(null)
  const [origin, setOrigin] = useState({ x: vp.w / 2, y: vp.h * 0.6, scale: 4 })
  const [active, setActive] = useState(-1)

  const imgW = Math.round(vp.h * PANO_RATIO)
  const pan = Math.max(0, imgW - vp.w)
  const doorLen = vp.h * 1.3
  const panLen = Math.max(vp.h * 1.4, pan * 2.1)
  const trackH = vp.h + doorLen + panLen
  const d = doorLen / (doorLen + panLen)

  // Zoom towards the middle of the doorway, far enough for it to fill the screen
  useLayoutEffect(() => {
    const dw = doorway.current
    const fa = facade.current
    if (!dw || !fa) return
    const r = dw.getBoundingClientRect()
    const f = fa.getBoundingClientRect()
    setOrigin({
      x: r.left - f.left + r.width / 2,
      y: r.top - f.top + r.height * 0.55,
      scale: Math.max(vp.w / r.width, vp.h / r.height) * 1.25,
    })
  }, [vp.w, vp.h])

  const { scrollYProgress: p } = useScroll({ target: track, offset: ['start start', 'end end'] })

  const glassOpacity = useTransform(p, [0, d * 0.22], [1, 0])
  const glassY = useTransform(p, [0, d * 0.22], [0, -24])
  const doorAngle = useTransform(p, [d * 0.12, d * 0.62], [0, -108])
  const facadeScale = useTransform(p, [d * 0.3, d], [1, origin.scale])
  const facadeOpacity = useTransform(p, [d * 0.78, d * 0.98], [1, 0])
  const roomScale = useTransform(p, [0, d], [1.18, 1])
  const roomBright = useTransform(p, [0, d * 0.7, d], [0.35, 0.75, 1])
  const roomFilter = useTransform(roomBright, (b) => `brightness(${b})`)
  const panX = useTransform(p, [d, 1], [0, -pan])
  const progress = useTransform(p, [d, 1], [0, 1])
  const hintOpacity = useTransform(p, [0, 0.03], [1, 0])

  // Pointer tilt for the shop windows (desktop)
  const tiltRaw = useSpring(0, { stiffness: 60, damping: 20 })
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const on = (e: PointerEvent) => tiltRaw.set((e.clientX / window.innerWidth - 0.5) * 2)
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [tiltRaw])

  useMotionValueEvent(p, 'change', (v) => {
    if (v < d * 1.02) return setActive(-1)
    const x = panX.get()
    let best = -1
    let bestDist = Infinity
    SPOTS.forEach((s, i) => {
      const sx = s.x * imgW + x
      const dist = Math.abs(sx - vp.w * 0.5)
      if (sx > -40 && sx < vp.w + 40 && dist < bestDist) {
        best = i
        bestDist = dist
      }
    })
    setActive(best)
  })

  if (reduce) {
    return (
      <section className="entrance entrance--static" aria-label="Open now, prices and booking">
        <div className="facade facade--static">
          <div className="facade__brick" aria-hidden />
          <Fascia />
          <div className="facade__front">
            <ShopWindow side="left" tilt={tiltRaw} />
            <div className="doorway">
              <div className="door">
                <DoorGlass />
              </div>
            </div>
            <ShopWindow side="right" tilt={tiltRaw} />
          </div>
          <div className="facade__pavement" aria-hidden />
        </div>
        <img className="entrance__pano" src={interior1600} alt="Inside the salon: walnut mirrors and white basins along one wall, red leather chairs, and Sam by the counter beside the red bench" width={1600} height={681} />
      </section>
    )
  }

  return (
    <section ref={track} className="entrance" style={{ height: trackH }} aria-label="Open now, prices and booking">
      <div className="entrance__stage">
        <motion.div
          className="room"
          style={{ width: imgW, x: panX, scale: roomScale, filter: roomFilter, transformOrigin: `${vp.w / 2}px 55%` }}
        >
          <img
            src={interior1600}
            alt="Inside the salon: walnut-framed mirrors and white basins along one wall, red leather barber chairs, and Sam by the counter beside the red buttoned bench"
            width={1600}
            height={681}
          />
          {SPOTS.map((s, i) => (
            <span
              key={s.title}
              className={`spot${i === active ? ' is-active' : ''}`}
              style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}
              aria-hidden
            />
          ))}
        </motion.div>
        <div className="room__shade" aria-hidden />

        <motion.div
          ref={facade}
          className="facade"
          style={{ scale: facadeScale, opacity: facadeOpacity, transformOrigin: `${origin.x}px ${origin.y}px` }}
        >
          <div className="facade__brick" aria-hidden />
          <Fascia />
          <div className="facade__front">
            <ShopWindow side="left" tilt={tiltRaw} />
            <div className="doorway" ref={doorway}>
              <motion.div className="door" style={{ rotateY: doorAngle }}>
                <DoorGlass style={{ opacity: glassOpacity, y: glassY }} />
                <div className="door__panel" aria-hidden />
                <span className="door__handle" aria-hidden />
              </motion.div>
            </div>
            <ShopWindow side="right" tilt={tiltRaw} />
          </div>
          <div className="facade__pavement" aria-hidden />
          <motion.p className="entrance__hint" style={{ opacity: hintOpacity }} aria-hidden>
            Scroll to come in
          </motion.p>
        </motion.div>

        <Captions active={active} />
        <div className="pan-progress" aria-hidden>
          <motion.span style={{ scaleX: progress }} />
        </div>
      </div>
    </section>
  )
}
