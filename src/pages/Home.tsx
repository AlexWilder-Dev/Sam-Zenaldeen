import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Fascia, Shopfront } from '../components/Shopfront'
import { Tariff } from '../components/Tariff'
import { ShaveStory } from '../components/ShaveStory'
import { Packages } from '../components/Packages'
import { SamStory } from '../components/SamStory'
import { Reviews } from '../components/Reviews'
import { FindUs } from '../components/FindUs'
import { Footer } from '../components/Footer'
import { StickyBar } from '../components/StickyBar'
import { VisitTray } from '../components/VisitTray'
import { scrollToId } from '../lib/contact'

export function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) requestAnimationFrame(() => scrollToId(target))
  }, [location.state])

  return (
    <>
      <StickyBar />
      <Fascia />
      <main>
        <Shopfront />
        <Tariff />
        <ShaveStory />
        <Packages />
        <SamStory />
        <Reviews />
        <FindUs />
      </main>
      <Footer />
      <VisitTray />
    </>
  )
}
