import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Entrance } from '../components/Entrance'
import { Manifesto } from '../components/Manifesto'
import { Tariff } from '../components/Tariff'
import { SteamMirror } from '../components/SteamMirror'
import { Packages } from '../components/Packages'
import { SamStory } from '../components/SamStory'
import { Reviews } from '../components/Reviews'
import { FindUs } from '../components/FindUs'
import { Footer } from '../components/Footer'
import { StickyBar } from '../components/StickyBar'
import { VisitTray } from '../components/VisitTray'
import { Intro } from '../components/Intro'
import { Cursor } from '../components/Cursor'
import { scrollToId } from '../lib/contact'

export function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) requestAnimationFrame(() => scrollToId(target))
  }, [location.state])

  return (
    <>
      <Intro />
      <Cursor />
      <StickyBar />
      <main>
        <Entrance />
        <Manifesto />
        <Tariff />
        <SteamMirror />
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
