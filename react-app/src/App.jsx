import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Events from './pages/Events'
import Colophon from './pages/Colophon'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-cream">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/colophon" element={<Colophon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
