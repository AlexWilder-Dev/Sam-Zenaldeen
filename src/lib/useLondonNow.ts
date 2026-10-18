import { useEffect, useState } from 'react'
import { londonNow, type LondonNow } from './time'

/** London wall-clock time, refreshed every 30 seconds */
export function useLondonNow(): LondonNow {
  const [now, setNow] = useState(() => londonNow())
  useEffect(() => {
    const t = window.setInterval(() => setNow(londonNow()), 30_000)
    return () => window.clearInterval(t)
  }, [])
  return now
}
