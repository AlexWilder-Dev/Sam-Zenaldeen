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

export const Menu = ({ size, ...rest }: P) => (
  <svg viewBox="0 0 24 24" {...base(size, rest)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
