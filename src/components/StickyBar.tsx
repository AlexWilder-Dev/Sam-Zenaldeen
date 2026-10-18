import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { scrollToId } from '../lib/contact'
import { StatusLamp } from './StatusLamp'
import { Close, Menu } from './Icons'
import markUrl from '../assets/img/sz-mark.png'

export const SECTIONS = [
  { id: 'prices', label: 'Prices' },
  { id: 'shave', label: 'Hot towel shave' },
  { id: 'packages', label: 'Packages' },
  { id: 'sam', label: 'Sam’s story' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'find', label: 'Hours & find us' },
]

export function StickyBar() {
  const [shown, setShown] = useState(false)
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  const go = (id: string) => {
    setMenu(false)
    scrollToId(id)
  }

  return (
    <>
      <AnimatePresence>
        {(shown || menu) && (
          <motion.div
            className="bar"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <button type="button" className="bar__home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
              <img src={markUrl} alt="" width={34} height={34} />
            </button>
            <StatusLamp compact />
            <button type="button" className="bar__menu" aria-expanded={menu} aria-controls="site-menu" onClick={() => setMenu((m) => !m)}>
              {menu ? <Close size={22} /> : <Menu size={22} />}
              <span className="visually-hidden">Menu</span>
            </button>
            <button type="button" className="btn btn--leather btn--small" onClick={() => navigate('/book')}>
              Book
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menu && (
          <motion.nav
            id="site-menu"
            className="sheet"
            aria-label="Sections"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <ul>
              {SECTIONS.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                  <button type="button" onClick={() => go(s.id)}>
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
