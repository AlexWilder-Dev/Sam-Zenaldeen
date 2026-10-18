import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { reviews, salon, serviceById } from '../data/salon'
import { telHref, waHref } from '../lib/contact'
import { StatusLamp } from './StatusLamp'
import { Chat, Phone, Star } from './Icons'
import markUrl from '../assets/img/sz-mark.png'
import interior960 from '../assets/img/interior-960.webp'
import interior1600 from '../assets/img/interior-1600.webp'

/** The sign board, laid out as it is painted on Sheen Lane */
export function Fascia() {
  return (
    <header className="fascia">
      <div className="fascia__board">
        <a className="fascia__painted fascia__painted--left" href={telHref}>
          {salon.phone.display}
        </a>
        <div className="fascia__sign">
          <img className="fascia__mark" src={markUrl} alt="" width={200} height={200} />
          <h1 className="wordmark">
            <span className="wordmark__name">Sam Zenaldeen</span>
            <span className="wordmark__trade">Gentlemen’s Grooming</span>
          </h1>
        </div>
        <span className="fascia__painted fascia__painted--right">{salon.web}</span>
      </div>
    </header>
  )
}

export function Shopfront() {
  const navigate = useNavigate()
  const cut = serviceById('wash-cut-finish')!
  const teen = serviceById('teen-wash-cut-finish')!
  const clipper = serviceById('clipper-one-grade')!
  const express = serviceById('express-shave')!

  return (
    <section className="shopfront" aria-label="Open now, prices and booking">
      <div className="shopfront__window shopfront__window--left">
        <picture>
          <source media="(min-width: 900px)" srcSet={interior1600} />
          <img
            src={interior960}
            alt="Inside the salon: walnut-framed mirrors and white basins along one wall, red leather barber chairs, and Sam by the counter beside the red buttoned bench"
            width={960}
            height={409}
          />
        </picture>
      </div>

      <motion.div
        className="door"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="door__glass">
          <StatusLamp />
          <div className="door__price">
            <p className="door__label">{cut.name}</p>
            <p className="door__amount">£{cut.price}</p>
            <p className="door__others">
              Teen £{teen.price} · Clipper all over £{clipper.price} · Hot towel shave from £{express.price}
            </p>
          </div>
          <div className="door__actions">
            <button className="btn btn--leather btn--block" onClick={() => navigate('/book')}>
              Request a time
            </button>
            <div className="door__row">
              <a className="btn btn--line" href={telHref}>
                <Phone size={18} /> Call
              </a>
              <a className="btn btn--line" href={waHref()} target="_blank" rel="noopener">
                <Chat size={18} /> WhatsApp
              </a>
            </div>
          </div>
          <a className="door__rating" href={salon.links.reviews} target="_blank" rel="noopener">
            <span className="stars" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} />
              ))}
            </span>
            <span>
              {reviews.rating} on Google · {reviews.count} reviews
            </span>
          </a>
        </div>
        <div className="door__panel" aria-hidden />
      </motion.div>

      {/* As on the street: mirrors in the left window, the red bench and flowers in the right */}
      <div className="shopfront__window shopfront__window--right" aria-hidden>
        <img src={interior1600} alt="" width={1600} height={681} loading="lazy" />
      </div>
    </section>
  )
}
