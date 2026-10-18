import { hours } from '../data/salon'

const TZ = 'Europe/London'

export interface LondonNow {
  /** JS weekday, 0 = Sunday */
  day: number
  minutes: number
  /** YYYY-MM-DD in London */
  ymd: string
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function londonNow(date = new Date()): LondonNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return {
    day: WEEKDAYS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    ymd: `${get('year')}-${get('month')}-${get('day')}`,
  }
}

export const hoursFor = (day: number) => hours.find((h) => h.day === day)!

/** 480 -> "8am", 1110 -> "6:30pm" */
export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`
}

export const formatRange = (open: number, close: number) =>
  `${formatTime(open)}–${formatTime(close)}`

export interface Status {
  open: boolean
  /** Short line, e.g. "Open now, until 7pm" */
  headline: string
  /** Supporting line, e.g. "Closes in 25 minutes" */
  detail: string
  closingSoon: boolean
}

export function statusAt(now: LondonNow): Status {
  const today = hoursFor(now.day)
  if (now.minutes >= today.open && now.minutes < today.close) {
    const left = today.close - now.minutes
    const closingSoon = left <= 45
    return {
      open: true,
      headline: `Open now, until ${formatTime(today.close)}`,
      detail: closingSoon
        ? `Closes in ${left} ${left === 1 ? 'minute' : 'minutes'}`
        : `Today ${formatRange(today.open, today.close)}`,
      closingSoon,
    }
  }
  if (now.minutes < today.open) {
    return {
      open: false,
      headline: `Closed, opens ${formatTime(today.open)} today`,
      detail: `Today ${formatRange(today.open, today.close)}`,
      closingSoon: false,
    }
  }
  const next = hoursFor((now.day + 1) % 7)
  return {
    open: false,
    headline: `Closed, opens ${formatTime(next.open)} tomorrow`,
    detail: `${next.name} ${formatRange(next.open, next.close)}`,
    closingSoon: false,
  }
}

export interface DayOption {
  ymd: string
  day: number
  label: string
  short: string
  dateNum: number
  month: string
  open: number
  close: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** The next `count` days starting today (London) */
export function upcomingDays(now: LondonNow, count = 14): DayOption[] {
  const [y, m, d] = now.ymd.split('-').map(Number)
  const out: DayOption[] = []
  for (let i = 0; i < count; i++) {
    const dt = new Date(Date.UTC(y, m - 1, d + i))
    const day = dt.getUTCDay()
    const h = hoursFor(day)
    out.push({
      ymd: dt.toISOString().slice(0, 10),
      day,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : h.name,
      short: h.name.slice(0, 3),
      dateNum: dt.getUTCDate(),
      month: MONTHS[dt.getUTCMonth()],
      open: h.open,
      close: h.close,
    })
  }
  return out
}

/**
 * Preferred start times on the half hour, from opening to half an hour before
 * closing. Today's list drops anything less than 30 minutes away.
 */
export function slotsFor(day: DayOption, now: LondonNow): number[] {
  const slots: number[] = []
  for (let t = day.open; t <= day.close - 30; t += 30) {
    if (day.ymd === now.ymd && t < now.minutes + 30) continue
    slots.push(t)
  }
  return slots
}

export function longDate(day: DayOption) {
  return `${hoursFor(day.day).name} ${day.dateNum} ${day.month}`
}
