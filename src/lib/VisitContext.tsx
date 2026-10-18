import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { applyOffer, findOffer, totalOf, type Offer } from './visit'

const KEY = 'sz-visit'

interface VisitState {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  set: (ids: string[]) => void
  take: (offer: Offer) => void
  clear: () => void
  total: number
  hasFrom: boolean
  offer: Offer | null
}

const Ctx = createContext<VisitState | null>(null)

function load(): string[] {
  try {
    const raw = sessionStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function VisitProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(load)

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* private mode: the visit just isn't remembered */
    }
  }, [ids])

  const toggle = useCallback(
    (id: string) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    [],
  )
  const remove = useCallback((id: string) => setIds((cur) => cur.filter((x) => x !== id)), [])
  const take = useCallback((offer: Offer) => setIds((cur) => applyOffer(cur, offer)), [])
  const clear = useCallback(() => setIds([]), [])

  const value = useMemo<VisitState>(() => {
    const { total, hasFrom } = totalOf(ids)
    return {
      ids,
      has: (id) => ids.includes(id),
      toggle,
      remove,
      set: setIds,
      take,
      clear,
      total,
      hasFrom,
      offer: findOffer(ids),
    }
  }, [ids, toggle, remove, take, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useVisit() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useVisit outside VisitProvider')
  return v
}
