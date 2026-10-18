import { motion } from 'framer-motion'
import { hours, salon } from '../data/salon'
import { formatRange } from '../lib/time'
import { useLondonNow } from '../lib/useLondonNow'
import { mailHref, telHref, waHref } from '../lib/contact'
import { StatusLamp } from './StatusLamp'
import { Arrow, Chat, Mail, Phone, Wheelchair } from './Icons'
import shopfront from '../assets/img/shopfront-640.webp'

/* Sheen Lane, drawn to scale between Mortlake station and Upper Richmond Road West */
function LaneMap() {
  const { station, junction } = salon.nearby
  const top = 64
  const bottom = 360
  const perMetre = (bottom - top) / (station.metres + junction.metres)
  const shopY = top + station.metres * perMetre
  return (
    <svg className="lane" viewBox="0 0 300 400" role="img" aria-label={`Map: the salon is on Sheen Lane, about ${station.metres} metres south of Mortlake station and ${junction.metres} metres north of Upper Richmond Road West`}>
      <defs>
        <pattern id="ties" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M5 0v10" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      {/* railway */}
      <rect x="0" y={top - 7} width="300" height="14" fill="url(#ties)" opacity=".35" />
      <path d={`M0 ${top - 5}H300M0 ${top + 5}H300`} className="lane__rail" />
      <text x="16" y={top - 16} className="lane__label">Mortlake station</text>
      {/* Upper Richmond Road West */}
      <path d={`M0 ${bottom}H300`} className="lane__main" />
      <text x="16" y={bottom + 26} className="lane__label">Upper Richmond Road West</text>
      {/* Sheen Lane */}
      <path d={`M150 18V392`} className="lane__lane" />
      <text x="138" y="210" className="lane__label lane__label--vertical" transform="rotate(-90 138 210)">
        Sheen Lane
      </text>
      {/* distances */}
      <path d={`M128 ${top + 10}V${shopY - 12}M128 ${shopY + 12}V${bottom - 10}`} className="lane__measure" />
      <text x="120" y={(top + shopY) / 2 + 40} className="lane__dist" textAnchor="end">{station.metres} m</text>
      <text x="120" y={(shopY + bottom) / 2 + 4} className="lane__dist" textAnchor="end">{junction.metres} m</text>
      {/* the walk from the station, drawn in as the map comes into view */}
      <motion.path
        d={`M150 ${top + 8}V${shopY}H162`}
        className="lane__route"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1] }}
      />
      <motion.circle
        cx="150"
        r="6"
        className="lane__walker"
        initial={{ cy: top + 8, opacity: 0 }}
        whileInView={{ cy: shopY, opacity: [0, 1, 1, 0] }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1] }}
      />
      {/* the shop, east side of the lane */}
      <motion.g
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 2.1, type: 'spring', stiffness: 420, damping: 16 }}
        style={{ x: 162, y: shopY - 13 }}
      >
        <rect width="26" height="26" className="lane__shop" />
        <text x="13" y="18" textAnchor="middle" className="lane__sz">SZ</text>
      </motion.g>
      <text x="198" y={shopY - 2} className="lane__label lane__label--strong">No. 119</text>
      <text x="198" y={shopY + 14} className="lane__label">Sam Zenaldeen</text>
      {/* north */}
      <g transform="translate(270 110)" className="lane__north">
        <path d="M0 -14 6 6 0 2 -6 6Z" />
        <text y="22" textAnchor="middle">N</text>
      </g>
    </svg>
  )
}

export function FindUs() {
  const now = useLondonNow()
  const a = salon.address
  return (
    <section id="find" className="section section--wall find" aria-labelledby="find-title">
      <div className="wrap find__layout">
        <div className="find__hours">
          <p className="eyebrow">Find us</p>
          <h2 id="find-title" className="title">
            {a.street}
            <span className="title__sub">
              {a.area}, {a.city} {a.postcode}
            </span>
          </h2>
          <StatusLamp />
          <table className="hours">
            <caption className="visually-hidden">Opening hours</caption>
            <tbody>
              {hours.map((h) => (
                <tr key={h.day} className={h.day === now.day ? 'is-today' : undefined}>
                  <th scope="row">
                    {h.name}
                    {h.day === now.day && <span className="hours__today">Today</span>}
                  </th>
                  <td>{formatRange(h.open, h.close)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="contact-list">
            <li>
              <a href={telHref}>
                <Phone size={20} /> <span>Call</span> <strong>{salon.phone.display}</strong>
              </a>
            </li>
            <li>
              <a href={waHref()} target="_blank" rel="noopener">
                <Chat size={20} /> <span>WhatsApp</span> <strong>{salon.whatsapp.display}</strong>
              </a>
            </li>
            <li>
              <a href={mailHref}>
                <Mail size={20} /> <span>Email</span> <strong>{salon.email}</strong>
              </a>
            </li>
          </ul>
        </div>

        <div className="find__where">
          <figure className="frontframe">
            <img
              src={shopfront}
              alt="The shopfront at dusk: a dark green front with the gold SZ sign, the phone number and web address painted on the fascia, and the lit salon through two windows"
              width={640}
              height={854}
              loading="lazy"
            />
            <figcaption>Look for the green shopfront and the gold SZ sign.</figcaption>
          </figure>
          <div className="find__map">
            <LaneMap />
            <p>
              On Sheen Lane, between Upper Richmond Road West and Mortlake station: about {salon.nearby.station.metres} m
              from the station.
            </p>
            {salon.accessibleEntrance && (
              <p className="find__access">
                <Wheelchair size={20} /> Wheelchair-accessible entrance
              </p>
            )}
            <a className="btn btn--green" href={salon.links.directions} target="_blank" rel="noopener">
              Directions in Google Maps <Arrow size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
