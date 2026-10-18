import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** A brass ring that trails the pointer and swells over anything you can press (mouse only) */
export function Cursor() {
  const [enabled] = useState(
    () => window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 })
  const [mode, setMode] = useState<'idle' | 'hover' | 'label'>('idle')
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const read = (t: Element | null) => {
      const labelled = t?.closest<HTMLElement>('[data-cursor]')
      if (labelled) {
        setMode('label')
        setLabel(labelled.dataset.cursor ?? '')
      } else if (t?.closest('a, button, [role="radio"], input, textarea, label')) setMode('hover')
      else setMode('idle')
    }
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      read(e.target as Element | null)
    }
    // The page moves under a still pointer when scrolling
    const scroll = () => read(document.elementFromPoint(x.get(), y.get()))
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const size = mode === 'label' ? 84 : mode === 'hover' ? 54 : 30
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden />
      <motion.div
        className={`cursor-ring cursor-ring--${mode}`}
        style={{ x: rx, y: ry }}
        animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        aria-hidden
      >
        {mode === 'label' && <span>{label}</span>}
      </motion.div>
    </>
  )
}
