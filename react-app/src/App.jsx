import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Colophon from './pages/Colophon'
import NotFound from './pages/NotFound'
import About from './pages/about/About'
import Alumni from './pages/about/Alumni'
import Leadership2023 from './pages/about/Leadership2023'
import Events from './pages/events/Events'
import EventsByYear from './pages/events/EventsByYear'
import Games from './pages/games/Games'
import GameHermeneutic from './pages/games/Hermeneutic'
import GameEpoche from './pages/games/Epoche'
import GameFallacy from './pages/games/Fallacy'
import GameDialectic from './pages/games/Dialectic'
import GameSorites from './pages/games/Sorites'
import GameRepugnant from './pages/games/Repugnant'
import GamePhilosophle from './pages/games/Philosophle'
import GameButterflyJob from './pages/games/ButterflyJob'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-cream dark:bg-[#0E1A14]">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:year" element={<EventsByYear />} />
            <Route path="/colophon" element={<Colophon />} />
            <Route path="/about/2024" element={<Alumni />} />
            <Route path="/about/2023" element={<Leadership2023 />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/hermeneutic" element={<GameHermeneutic />} />
            <Route path="/games/epoche" element={<GameEpoche />} />
            <Route path="/games/fallacy" element={<GameFallacy />} />
            <Route path="/games/dialectic" element={<GameDialectic />} />
            <Route path="/games/sorites" element={<GameSorites />} />
            <Route path="/games/repugnant" element={<GameRepugnant />} />
            <Route path="/games/philosophle" element={<GamePhilosophle />} />
            <Route path="/games/butterfly-job" element={<GameButterflyJob />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
