import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Tariff } from '../components/Tariff'
import { ShaveMirror } from '../components/ShaveMirror'
import { Packages } from '../components/Packages'
import { SamStory } from '../components/SamStory'
import { Reviews } from '../components/Reviews'
import { FindUs } from '../components/FindUs'
import { Footer } from '../components/Footer'
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
      <Header />
      <main>
        <Hero />
        <Tariff />
        <ShaveMirror />
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
