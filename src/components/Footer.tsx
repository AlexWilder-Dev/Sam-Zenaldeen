import { salon } from '../data/salon'
import { mailHref, telHref, waHref } from '../lib/contact'
import logoUrl from '../assets/img/sz-logo.png'

export function Footer() {
  const a = salon.address
  return (
    <footer className="footer">
      <div className="wrap footer__layout">
        <img className="footer__logo" src={logoUrl} alt="Sam Zenaldeen Gentlemen’s Grooming" width={200} height={167} loading="lazy" />
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
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} {salon.fullName}</span>
        <span>Site by AlexWilder-Dev</span>
      </div>
    </footer>
  )
}
