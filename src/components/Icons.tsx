import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 24, rest: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...rest,
})

/* Service marks, redrawn as line work from the salon's own icon set */

export const Razor = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 48 48" {...base(size, rest)}>
    <path d="M9 7.5 31.5 30l2.7-1.3c.9-.4 1.9.4 1.6 1.4l-.3.8" />
    <path d="M9 7.5c-.9 2.6 0 5.1 1.9 7l17 17 2.6-1.5" />
    <path d="m31.8 31.2 7.4 7.4a2.2 2.2 0 0 1-3.1 3.1l-7.4-7.4" />
    <circle cx="31.4" cy="31.6" r="1" />
  </svg>
)

export const Scissors = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 48 48" {...base(size, rest)}>
    <circle cx="15" cy="36" r="5" />
    <circle cx="33" cy="36" r="5" />
    <path d="M18.4 32.4 36 6" />
    <path d="M29.6 32.4 12 6" />
    <circle cx="24" cy="24.3" r=".8" />
  </svg>
)

export const Comb = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 48 48" {...base(size, rest)}>
    <rect x="7" y="18" width="34" height="6" rx="1.5" />
    <path d="M10 24v8M13.5 24v8M17 24v8M20.5 24v8M24 24v8M27.5 24v8M31 24v8M34.5 24v8M38 24v5" />
  </svg>
)

export const Thread = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 48 48" {...base(size, rest)}>
    <path d="M6 30c6-10 12-10 18 0s12 10 18 0" />
    <path d="M6 18c6 10 12 10 18 0s12-10 18 0" />
  </svg>
)

/** The packages mark: their crossed lines, with the comb beneath */
export const Crossed = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 48 48" {...base(size, rest)}>
    <path d="M10 8 38 36M38 8 10 36" />
    <rect x="15" y="39" width="18" height="3" rx=".8" />
  </svg>
)

/* Interface icons */

export const Phone = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M6.6 3.5h-2a1.6 1.6 0 0 0-1.6 1.8 16.8 16.8 0 0 0 15.7 15.7 1.6 1.6 0 0 0 1.8-1.6v-2a1.4 1.4 0 0 0-1-1.4l-2.8-.9a1.4 1.4 0 0 0-1.5.4l-1.1 1.3a12 12 0 0 1-5.5-5.5l1.3-1.1a1.4 1.4 0 0 0 .4-1.5l-.9-2.8a1.4 1.4 0 0 0-1.4-1Z" />
  </svg>
)

export const Chat = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M4.2 19.8 5.3 16A8.2 8.2 0 1 1 8.4 19l-4.2.8Z" />
    <path d="M9.2 9.3c.3 2.6 2.1 4.6 4.9 5.4l1-1.2-1.6-1-1 .7c-.9-.5-1.7-1.3-2.1-2.2l.7-.9-1-1.6-.9.8Z" />
  </svg>
)

export const Mail = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
)

export const Pin = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
)

export const Plus = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M12 6v12M6 12h12" />
  </svg>
)

export const Check = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="m6 12.5 4 4 8-9" />
  </svg>
)

export const Close = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="m7 7 10 10M17 7 7 17" />
  </svg>
)

export const Arrow = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowLeft = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const Star = ({ size = 14, ...rest }: P) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden fill="currentColor" {...rest}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
)

export const Menu = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)

export const Wheelchair = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <circle cx="11" cy="4.5" r="1.6" />
    <path d="M11 7.5v6h5l2.5 5" />
    <path d="M11 10.5h5" />
    <path d="M8.5 11.2a5 5 0 1 0 6.8 6.3" />
  </svg>
)
