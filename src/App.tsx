import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { VisitProvider } from './lib/VisitContext'
import { Home } from './pages/Home'
import { Book } from './pages/Book'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <VisitProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Book />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </VisitProvider>
    </MotionConfig>
  )
}
