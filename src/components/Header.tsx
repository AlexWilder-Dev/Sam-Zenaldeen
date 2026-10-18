import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { scrollToId, scrollToTop } from '../lib/contact'
import { Close, Menu } from './Icons'
import markUrl from '../assets/img/sz-mark.png'

export const SECTIONS = [
  { id: 'prices', label: 'Prices' },
  { id: 'shave', label: 'The shave' },
  { id: 'packages', label: 'Packages' },
  { id: 'sam', label: 'Sam' },
  { id: 'find', label: 'Find us' },
]

export function Header() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
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
    <header className={`top${scrolled || menu ? ' is-scrolled' : ''}`}>
      <div className="top__bar">
        <button type="button" className="top__brand" onClick={() => scrollToTop()} aria-label="Sam Zenaldeen Gentlemen’s Grooming, back to top">
          <img src={markUrl} alt="" width={26} height={26} />
          Sam Zenaldeen
        </button>
        <nav className="top__nav" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button key={s.id} type="button" onClick={() => go(s.id)}>
              {s.label}
            </button>
          ))}
        </nav>
        <button type="button" className="top__book" onClick={() => navigate('/book')}>
          Book
        </button>
        <button type="button" className="top__menu" aria-expanded={menu} aria-controls="site-menu" onClick={() => setMenu((v) => !v)}>
          {menu ? <Close size={20} /> : <Menu size={20} />}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
      <AnimatePresence>
        {menu && (
          <m.nav
            id="site-menu"
            className="sheet"
            aria-label="Sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ul>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button type="button" onClick={() => go(s.id)}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
