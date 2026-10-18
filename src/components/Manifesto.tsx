import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

// Sam's way of working, in the salon's own words
const LINES: { words: string; accent?: boolean }[] = [
  { words: 'Every appointment begins with a consultation.' },
  { words: 'Traditional techniques, precision and skill.' },
  { words: 'You leave confident, comfortable and happy,' },
  { words: 'and most importantly,' },
  { words: 'sharp and dapper.', accent: true },
]

function Word({ text, range, p, accent }: { text: string; range: [number, number]; p: MotionValue<number>; accent?: boolean }) {
  const opacity = useTransform(p, range, [0.14, 1])
  const y = useTransform(p, range, [6, 0])
  return (
    <motion.span className={`mword${accent ? ' mword--accent' : ''}`} style={{ opacity, y }}>
      {text}{' '}
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.65'] })
  const all = LINES.flatMap((l) => l.words.split(' ').map((w) => ({ w, accent: l.accent })))
  let i = 0
  return (
    <section ref={ref} className="manifesto" aria-label="How Sam works">
      <div className="wrap">
        <p className="eyebrow eyebrow--gold">The SZ way</p>
        <p className="manifesto__text">
          {LINES.map((line, li) => (
            <span key={li} className="manifesto__line">
              {line.words.split(' ').map((w) => {
                const k = i++
                return <Word key={k} text={w} p={p} accent={line.accent} range={[k / all.length, (k + 1) / all.length]} />
              })}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
