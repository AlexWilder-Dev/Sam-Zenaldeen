import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { categories, salon, serviceById, services } from '../data/salon'
import { useVisit } from '../lib/VisitContext'
import { gbp } from '../lib/visit'
import { formatRange, formatTime, longDate, slotsFor, upcomingDays, type DayOption } from '../lib/time'
import { useLondonNow } from '../lib/useLondonNow'
import { telHref, waHref } from '../lib/contact'
import { ServiceRow } from '../components/ServiceRow'
import { OfferCard } from '../components/VisitTray'
import { StatusLamp } from '../components/StatusLamp'
import { ArrowLeft, Chat, Check, Close, Phone } from '../components/Icons'
import markUrl from '../assets/img/sz-mark.png'

function requestText(opts: { ids: string[]; total: number; hasFrom: boolean; day?: DayOption; time?: number; name?: string; phone?: string }) {
  const lines = ['Hello Sam, I’d like to book:']
  for (const id of opts.ids) {
    const s = serviceById(id)
    if (s) lines.push(`• ${s.name} (${s.from ? 'from ' : ''}${gbp(s.price)})`)
  }
  if (opts.ids.length) lines.push(`Total: ${opts.hasFrom ? 'from ' : ''}${gbp(opts.total)}`)
  if (opts.day && opts.time !== undefined) lines.push(`Preferred time: ${longDate(opts.day)}, ${formatTime(opts.time)}`)
  else if (opts.day) lines.push(`Preferred day: ${longDate(opts.day)}`)
  if (opts.name) lines.push(`Name: ${opts.name}`)
  if (opts.phone) lines.push(`Mobile: ${opts.phone}`)
  return lines.join('\n')
}

const reveal = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] as const },
}

export function Book() {
  const navigate = useNavigate()
  const now = useLondonNow()
  const { ids, total, hasFrom, offer, take, remove, clear } = useVisit()
  const days = useMemo(() => upcomingDays(now, 14), [now.ymd])
  const [dayYmd, setDayYmd] = useState<string>()
  const [time, setTime] = useState<number>()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [picking, setPicking] = useState(ids.length === 0)
  const [sent, setSent] = useState<null | { ids: string[]; total: number; hasFrom: boolean; day: DayOption; time: number; name: string; phone: string }>(null)
  const [tried, setTried] = useState(false)
  const timesRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => window.scrollTo(0, 0), [])

  const day = days.find((d) => d.ymd === dayYmd)
  const slots = day ? slotsFor(day, now) : []
  const phoneOk = phone.replace(/\D/g, '').length >= 10
  const ready = ids.length > 0 && day && time !== undefined && name.trim() && phoneOk

  const pickDay = (d: DayOption) => {
    setDayYmd(d.ymd)
    setTime(undefined)
    requestAnimationFrame(() => timesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }
  const pickTime = (t: number) => {
    setTime(t)
    requestAnimationFrame(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (!ready || !day || time === undefined) return
    setSent({ ids, total, hasFrom, day, time, name: name.trim(), phone })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => navigate('/', { state: { scrollTo: 'prices' } })
  const waNow = waHref(requestText({ ids, total, hasFrom, day, time, name: name.trim(), phone }))

  if (sent) {
    const wa = waHref(requestText(sent))
    return (
      <main className="book book--done">
        <motion.div className="confirm" {...reveal}>
          <div className="confirm__seal" aria-hidden>
            <img src={markUrl} alt="" width={72} height={72} />
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25, type: 'spring', stiffness: 400, damping: 20 }}>
              <Check size={22} />
            </motion.span>
          </div>
          <p className="eyebrow eyebrow--gold">Request ready</p>
          <h1 className="title title--light">
            {longDate(sent.day)}, {formatTime(sent.time)}
          </h1>
          <ul className="confirm__list">
            {sent.ids.map((id) => {
              const s = serviceById(id)!
              return (
                <li key={id}>
                  <span>{s.name}</span>
                  <span>
                    {s.from && 'from '}
                    {gbp(s.price)}
                  </span>
                </li>
              )
            })}
            <li className="confirm__total">
              <span>Total</span>
              <span>
                {sent.hasFrom && 'from '}
                {gbp(sent.total)}
              </span>
            </li>
          </ul>
          <p className="confirm__who">
            For {sent.name} · {sent.phone}
          </p>
          <p className="demo-note">Demo: this page doesn’t send anything yet. To book for real, send it on WhatsApp or call.</p>
          <div className="confirm__actions">
            <a className="btn btn--leather btn--block" href={wa} target="_blank" rel="noopener">
              <Chat size={18} /> Send it to Sam on WhatsApp
            </a>
            <a className="btn btn--line btn--block" href={telHref}>
              <Phone size={18} /> Call {salon.phone.display}
            </a>
            <button
              type="button"
              className="link-gold"
              onClick={() => {
                clear()
                navigate('/')
              }}
            >
              Back to the site
            </button>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="book">
      <header className="book__top">
        <button type="button" className="book__back" onClick={back}>
          <ArrowLeft size={20} /> Prices
        </button>
        <img src={markUrl} alt="Sam Zenaldeen" width={40} height={40} />
      </header>

      <div className="book__intro">
        <p className="eyebrow eyebrow--gold">Request a time</p>
        <h1 className="title title--light">Your chair at 119 Sheen Lane</h1>
        <StatusLamp />
      </div>

      <form className="book__form" onSubmit={submit} noValidate>
        <section className="step" aria-labelledby="step-visit">
          <h2 id="step-visit" className="step__title">
            <span>1</span> Your visit
          </h2>
          {ids.length > 0 && (
            <ul className="chosen">
              {ids.map((id) => {
                const s = serviceById(id)!
                return (
                  <li key={id}>
                    <span>{s.name}</span>
                    <span className="chosen__price">
                      {s.from && 'from '}
                      {gbp(s.price)}
                    </span>
                    <button type="button" onClick={() => remove(id)} aria-label={`Remove ${s.name}`}>
                      <Close size={16} />
                    </button>
                  </li>
                )
              })}
              <li className="chosen__total">
                <span>Total</span>
                <span>
                  {hasFrom && 'from '}
                  {gbp(total)}
                </span>
              </li>
            </ul>
          )}
          <AnimatePresence>{offer && <OfferCard key={offer.pkg.id} offer={offer} onTake={() => take(offer)} />}</AnimatePresence>
          {tried && ids.length === 0 && <p className="field__error">Choose at least one service.</p>}
          <button type="button" className="link-gold" aria-expanded={picking} onClick={() => setPicking((p) => !p)}>
            {picking ? 'Done choosing' : ids.length ? 'Add or change services' : 'Choose services'}
          </button>
          <AnimatePresence initial={false}>
            {picking && (
              <motion.div className="picker" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {categories.map((c) => (
                  <div key={c.id} className="picker__group">
                    <h3>{c.title}</h3>
                    <ul className="rows rows--dark">
                      {services
                        .filter((s) => s.category === c.id)
                        .map((s) => (
                          <ServiceRow key={s.id} s={s} />
                        ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="step" aria-labelledby="step-day">
          <h2 id="step-day" className="step__title">
            <span>2</span> Day
          </h2>
          <div className="days" role="radiogroup" aria-labelledby="step-day">
            {days.map((d) => {
              const none = slotsFor(d, now).length === 0
              return (
                <button
                  key={d.ymd}
                  type="button"
                  role="radio"
                  aria-checked={d.ymd === dayYmd}
                  disabled={none}
                  className={`day${d.ymd === dayYmd ? ' is-on' : ''}`}
                  onClick={() => pickDay(d)}
                >
                  <span className="day__name">{d.label === 'Today' ? 'Today' : d.short}</span>
                  <span className="day__num">{d.dateNum}</span>
                  <span className="day__month">{d.month}</span>
                  <span className="day__hours">{none ? 'No times left' : formatRange(d.open, d.close)}</span>
                </button>
              )
            })}
          </div>
          {tried && !day && <p className="field__error">Pick a day.</p>}
        </section>

        <AnimatePresence>
          {day && (
            <motion.section className="step" aria-labelledby="step-time" ref={timesRef} {...reveal}>
              <h2 id="step-time" className="step__title">
                <span>3</span> Preferred start time
              </h2>
              <p className="step__hint">
                {longDate(day)}: open {formatRange(day.open, day.close)}
              </p>
              <div className="times" role="radiogroup" aria-labelledby="step-time">
                {slots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={t === time}
                    className={`time${t === time ? ' is-on' : ''}`}
                    onClick={() => pickTime(t)}
                  >
                    {formatTime(t)}
                  </button>
                ))}
              </div>
              {tried && time === undefined && <p className="field__error">Pick a time.</p>}
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {day && time !== undefined && (
            <motion.section className="step" aria-labelledby="step-you" ref={detailsRef} {...reveal}>
              <h2 id="step-you" className="step__title">
                <span>4</span> Your details
              </h2>
              <label className="field">
                <span>Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                {tried && !name.trim() && <em className="field__error">Your name, please.</em>}
              </label>
              <label className="field">
                <span>Mobile</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" required />
                {tried && !phoneOk && <em className="field__error">A number the salon can text to confirm.</em>}
              </label>
              <label className="field">
                <span>
                  Email <small>(optional)</small>
                </span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
              </label>
              <label className="field">
                <span>
                  Anything Sam should know? <small>(optional)</small>
                </span>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
              </label>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="book__submit">
          <button type="submit" className="btn btn--leather btn--block" aria-disabled={!ready}>
            Send request
          </button>
          <p className="book__or">
            or{' '}
            <a href={waNow} target="_blank" rel="noopener">
              WhatsApp Sam
            </a>{' '}
            · <a href={telHref}>call {salon.phone.display}</a>
          </p>
        </div>
      </form>
    </main>
  )
}
