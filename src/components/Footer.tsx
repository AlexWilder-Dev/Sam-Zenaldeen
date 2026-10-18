import { salon } from '../data/salon'
import { mailHref, telHref, waHref } from '../lib/contact'
import markUrl from '../assets/img/sz-mark.png'

export function Footer() {
  const a = salon.address
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__name">
          <img src={markUrl} alt="" width={44} height={44} loading="lazy" />
          <span>
            Sam Zenaldeen
            <em>Gentlemen’s Grooming</em>
          </span>
        </p>
        <address className="footer__address">
          {a.street}
          <br />
          {a.area}, {a.city} {a.postcode}
        </address>
        <ul className="footer__links">
          <li>
            <a href={telHref}>{salon.phone.display}</a>
          </li>
          <li>
            <a href={waHref()} target="_blank" rel="noopener">
              WhatsApp {salon.whatsapp.display}
            </a>
          </li>
          <li>
            <a href={mailHref}>{salon.email}</a>
          </li>
        </ul>
      </div>
      <div className="footer__base">
        <span>
          © {new Date().getFullYear()} {salon.fullName}
        </span>
        <span>Site by AlexWilder-Dev</span>
      </div>
    </footer>
  )
}
