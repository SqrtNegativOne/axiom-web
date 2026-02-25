import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ClickSpark from './components/ClickSpark'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Events from './pages/Events'

export default function App() {
  return (
    <HashRouter>
      <ClickSpark sparkColor="#C9A44C" sparkCount={6} sparkRadius={18} duration={500}>
        <div className="min-h-screen flex flex-col bg-cream">
          <NavBar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </HashRouter>
  )
}
