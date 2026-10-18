import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Smooth wheel scrolling on desktop; touch scrolling stays native */
export function startSmooth() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
  const raf = (t: number) => {
    lenis?.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

export const pauseScroll = () => lenis?.stop()
export const resumeScroll = () => lenis?.start()

export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

export function scrollToElement(el: HTMLElement, offset = -64) {
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 })
  else {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? 'auto' : 'smooth' })
  }
}
