import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { reviews, salon } from '../data/salon'
import { Star } from './Icons'

const featured = ['jack', 'peter']

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const v = useMotionValue(0)
  const text = useTransform(v, (n) => n.toFixed(1))
  useEffect(() => {
    if (!inView) return
    const c = animate(v, to, { duration: 1.8, ease: [0.2, 0.7, 0.2, 1] })
    return () => c.stop()
  }, [inView, to, v])
  return <motion.span ref={ref}>{text}</motion.span>
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Review topics rolling past, faster when you scroll faster */
function Marquee() {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1200], [0, 5], { clamp: false })
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)
  useAnimationFrame((_, delta) => {
    let move = dir.current * -1.6 * (delta / 1000)
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    move += move * Math.abs(b)
    base.set(base.get() + move)
  })
  const items = reviews.topics.map((t) => t.label)
  return (
    <div className="marquee" aria-hidden>
      <motion.div className="marquee__inner" style={{ x }}>
        {[0, 1].map((k) => (
          <span key={k} className="marquee__set">
            {items.map((label) => (
              <span key={label} className="marquee__item">
                {label}
                <svg viewBox="0 0 20 20" width="20" height="20">
                  <rect x="3" y="3" width="14" height="14" transform="rotate(45 10 10)" />
                </svg>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Reviews() {
  const max = Math.max(...reviews.topics.map((t) => t.count))
  const quotes = reviews.quotes.filter((q) => featured.includes(q.id))
  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <Marquee />
      <div className="wrap reviews__layout">
        <header className="reviews__score">
          <p className="eyebrow eyebrow--gold">What Sheen says</p>
          <h2 id="reviews-title" className="reviews__number">
            <CountUp to={reviews.rating} />
            <span className="visually-hidden"> out of 5</span>
          </h2>
          <p className="reviews__stars" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 500, damping: 18 }}
              >
                <Star size={22} />
              </motion.span>
            ))}
          </p>
          <p className="reviews__count">from {reviews.count} Google reviews</p>
          <a className="link-gold" href={salon.links.reviews} target="_blank" rel="noopener">
            Read them on Google
          </a>
        </header>

        <div className="reviews__topics">
          <h3 className="reviews__sub">What reviewers mention most</h3>
          <ul>
            {reviews.topics.map((t, i) => (
              <li key={t.label}>
                <span className="topic__label">{t.label}</span>
                <span className="topic__bar" aria-hidden>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: t.count / max }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                </span>
                <span className="topic__count">{t.count}</span>
              </li>
            ))}
          </ul>
          <p className="reviews__note">Number of Google reviews mentioning each, as grouped by Google.</p>
        </div>

        <div className="reviews__quotes">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.id}
              className="quote"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <blockquote>
                <p>“{q.text}”</p>
              </blockquote>
              <figcaption>
                {q.author} · Google review · {q.year}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
