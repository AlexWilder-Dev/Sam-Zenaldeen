import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { salon } from '../data/salon'
import { scrollToId, scrollToTop, telHref } from '../lib/contact'
import { Close, Menu, Phone } from './Icons'
import markUrl from '../assets/img/sz-mark.png'

export const SECTIONS = [
  { id: 'prices', label: 'Prices' },
  { id: 'shave', label: 'Hot towel shave' },
  { id: 'packages', label: 'Packages' },
  { id: 'sam', label: 'Sam’s story' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'find', label: 'Find us' },
]

/** The fascia, as a slim bar that stays at the top */
export function Header() {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()

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
    <header className="header">
      <div className="header__bar">
        <button type="button" className="header__brand" onClick={() => scrollToTop()} aria-label="Sam Zenaldeen Gentlemen’s Grooming, back to top">
          <img src={markUrl} alt="" width={40} height={40} />
          <span className="header__name">
            <span>Sam Zenaldeen</span>
            <small>Gentlemen’s Grooming</small>
          </span>
        </button>
        <nav className="header__nav" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button key={s.id} type="button" onClick={() => go(s.id)}>
              {s.label}
            </button>
          ))}
        </nav>
        <a className="header__phone" href={telHref}>
          <Phone size={16} /> {salon.phone.display}
        </a>
        <button type="button" className="btn btn--leather btn--small" onClick={() => navigate('/book')}>
          Book
        </button>
        <button
          type="button"
          className="header__menu"
          aria-expanded={menu}
          aria-controls="site-menu"
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? <Close size={22} /> : <Menu size={22} />}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
      <AnimatePresence>
        {menu && (
          <m.nav
            id="site-menu"
            className="sheet"
            aria-label="Sections"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => go(s.id)}>
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
