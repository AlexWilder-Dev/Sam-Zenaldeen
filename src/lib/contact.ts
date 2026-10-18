import { salon } from '../data/salon'

export const telHref = `tel:${salon.phone.tel}`
export const mailHref = `mailto:${salon.email}`

export const waHref = (text?: string) =>
  `https://wa.me/${salon.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
