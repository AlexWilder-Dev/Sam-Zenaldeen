import { salon } from '../data/salon'

export const telHref = `tel:${salon.phone.tel}`
export const mailHref = `mailto:${salon.email}`

export const waHref = (text?: string) =>
  `https://wa.me/${salon.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const smooth = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: smooth() ? 'smooth' : 'auto' })
}

export function scrollToTop(instant = false) {
  window.scrollTo({ top: 0, behavior: instant || !smooth() ? 'auto' : 'smooth' })
}
