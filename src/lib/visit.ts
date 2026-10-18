import { services, serviceById, type Service } from '../data/salon'

export const gbp = (n: number) => `£${Number.isInteger(n) ? n : n.toFixed(2)}`

/** What the services a package covers would cost at list prices */
export function listPriceOf(pkg: Service) {
  return (pkg.covers ?? []).reduce((sum, c) => sum + (serviceById(c.id)?.price ?? 0) * c.count, 0)
}

export const savingOf = (pkg: Service) => listPriceOf(pkg) - pkg.price

export function totalOf(ids: string[]) {
  const items = ids.map(serviceById).filter(Boolean) as Service[]
  return {
    items,
    total: items.reduce((sum, s) => sum + s.price, 0),
    hasFrom: items.some((s) => s.from),
  }
}

export interface Offer {
  kind: 'combine' | 'bundle'
  pkg: Service
  /** Selected ids this offer would replace */
  replaces: string[]
  listPrice: number
  saving: number
}

/**
 * Looks for a published package, Father & Son, or five-visit bundle that
 * matches what's been chosen. Savings are list prices minus the package price.
 */
export function findOffer(ids: string[]): Offer | null {
  const chosen = new Set(ids)
  const combos: Offer[] = []
  const bundles: Offer[] = []

  for (const pkg of services) {
    if (!pkg.covers || chosen.has(pkg.id)) continue
    const isBundle = pkg.covers.length === 1 && pkg.covers[0].count > 1
    const coveredIds = pkg.covers.map((c) => c.id)
    if (!coveredIds.every((id) => chosen.has(id))) continue
    const offer: Offer = {
      kind: isBundle ? 'bundle' : 'combine',
      pkg,
      replaces: coveredIds,
      listPrice: listPriceOf(pkg),
      saving: savingOf(pkg),
    }
    if (offer.saving <= 0) continue
    ;(isBundle ? bundles : combos).push(offer)
  }

  const best = (list: Offer[]) => list.sort((a, b) => b.saving - a.saving)[0] ?? null
  return best(combos) ?? best(bundles)
}

export function applyOffer(ids: string[], offer: Offer) {
  return [...ids.filter((id) => !offer.replaces.includes(id)), offer.pkg.id]
}

export function offerLine(o: Offer) {
  if (o.pkg.id === 'father-and-son')
    return `Booking for you and your son (under 18)? Father & Son is ${gbp(o.pkg.price)}, not ${gbp(o.listPrice)}.`
  if (o.kind === 'bundle')
    return `Coming back regularly? ${o.pkg.name} is ${gbp(o.pkg.price)}, not ${gbp(o.listPrice)} for five single visits.`
  return `That’s the ${o.pkg.name} package: ${gbp(o.pkg.price)}, not ${gbp(o.listPrice)}.`
}
