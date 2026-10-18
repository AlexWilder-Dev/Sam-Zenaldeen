import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { pauseScroll, resumeScroll } from '../lib/smooth'
import markUrl from '../assets/img/sz-mark.png'

const KEY = 'sz-intro-seen'

function shouldPlay() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

const NAME = 'SAM ZENALDEEN'
const ease = [0.2, 0.7, 0.2, 1] as const

/** First visit of a session: the gold frame draws, the sign is gilded, then the curtain lifts */
export function Intro() {
  const [show, setShow] = useState(shouldPlay)

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* fine without */
    }
    pauseScroll()
    const html = document.documentElement
    html.style.overflow = 'hidden'
    const t = window.setTimeout(() => setShow(false), 2300)
    return () => {
      window.clearTimeout(t)
      html.style.overflow = ''
      resumeScroll()
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          onClick={() => setShow(false)}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          aria-hidden
        >
          <div className="intro__mark">
            <svg viewBox="0 0 100 100" className="intro__frame">
              <motion.rect
                x="2"
                y="2"
                width="96"
                height="96"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease }}
              />
            </svg>
            <motion.img
              src={markUrl}
              alt=""
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.6, ease }}
            />
          </div>
          <p className="intro__name gilt">
            {NAME.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.035, duration: 0.5, ease }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </p>
          <motion.p
            className="intro__trade"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.24em' }}
            transition={{ delay: 1.45, duration: 0.8, ease }}
          >
            Gentlemen’s Grooming · Sheen Lane
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
