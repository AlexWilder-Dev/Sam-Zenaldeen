import { statusAt } from '../lib/time'
import { useLondonNow } from '../lib/useLondonNow'

/** A brass mirror lamp, lit while the salon is open */
export function StatusLamp({ compact = false }: { compact?: boolean }) {
  const now = useLondonNow()
  const s = statusAt(now)
  return (
    <div className={`status${s.open ? ' is-open' : ''}${compact ? ' status--compact' : ''}`} role="status">
      <span className="status__lamp" aria-hidden>
        <svg viewBox="0 0 20 24" width="16" height="20">
          <path d="M10 1v5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 12a6 6 0 0 1 12 0Z" fill="currentColor" />
          <circle className="status__bulb" cx="10" cy="14" r="3.2" />
        </svg>
      </span>
      <span className="status__text">
        <strong>{s.headline}</strong>
        {!compact && <span>{s.detail}</span>}
      </span>
    </div>
  )
}
