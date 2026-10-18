import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { VisitProvider } from './lib/VisitContext'
import { Home } from './pages/Home'

const Book = lazy(() => import('./pages/Book').then((m) => ({ default: m.Book })))

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <VisitProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/book"
                element={
                  <Suspense fallback={<main className="book" />}>
                    <Book />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </VisitProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
