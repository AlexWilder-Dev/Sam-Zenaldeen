import { statusAt } from '../lib/time'
import { useLondonNow } from '../lib/useLondonNow'

/** Open or closed, by the clock on Sheen Lane */
export function Live({ detail = false }: { detail?: boolean }) {
  const s = statusAt(useLondonNow())
  return (
    <p className={`live${s.open ? ' is-open' : ''}`} role="status">
      <span className="live__dot" aria-hidden />
      <span>
        <strong>{s.headline}</strong>
        {(detail || s.closingSoon) && <span className="live__detail">{s.detail}</span>}
      </span>
    </p>
  )
}
