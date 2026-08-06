import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Colophon from './pages/Colophon'
import NotFound from './pages/NotFound'
import Team from './pages/team/Team'
import TeamByYear from './pages/team/TeamByYear'
import Events from './pages/events/Events'
import EventsByYear from './pages/events/EventsByYear'
import Games from './pages/games/Games'
import GameHermeneutic from './pages/games/Hermeneutic.jsx'
import GameEpoche from './pages/games/Epoche.jsx'
import GameFallacy from './pages/games/Fallacy.jsx'
import GameDialectic from './pages/games/Dialectic.jsx'
import GameNegativeDialectic from './pages/games/NegativeDialectic.jsx'
import GameSorites from './pages/games/Sorites.jsx'
import GameRepugnant from './pages/games/Repugnant.jsx'
import GamePhilosophle from './pages/games/Philosophle.jsx'
import GameButterflyJob from './pages/games/ButterflyJob.jsx'
import GameFallacyDetective from './pages/games/FallacyDetective.jsx'
import GamePhilosopherMatch from './pages/games/PhilosopherMatch.jsx'
import GameConceptMap from './pages/games/ConceptMap.jsx'
import GameArgumentReconstruction from './pages/games/ArgumentReconstruction.jsx'
import GameParadigmShift from './pages/games/ParadigmShift.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

export default function App() {
    return (
        <>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-cream dark:bg-[#0E1A14]">
                <NavBar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/events" element={<Events />} />
                        <Route
                            path="/events/:year"
                            element={<EventsByYear />}
                        />
                        <Route path="/colophon" element={<Colophon />} />
                        <Route
                            path="/team/:year"
                            element={<TeamByYear />}
                        />
                        <Route path="/games" element={<Games />} />
                        <Route
                            path="/games/hermeneutic"
                            element={<GameHermeneutic />}
                        />
                        <Route path="/games/epoche" element={<GameEpoche />} />
                        <Route
                            path="/games/fallacy"
                            element={<GameFallacy />}
                        />
                        <Route
                            path="/games/dialectic"
                            element={<GameDialectic />}
                        />
                        <Route
                            path="/games/negative-dialectic"
                            element={<GameNegativeDialectic />}
                        />
                        <Route
                            path="/games/sorites"
                            element={<GameSorites />}
                        />
                        <Route
                            path="/games/repugnant"
                            element={<GameRepugnant />}
                        />
                        <Route
                            path="/games/philosophle"
                            element={<GamePhilosophle />}
                        />
                        <Route
                            path="/games/butterfly-job"
                            element={<GameButterflyJob />}
                        />
                        <Route
                            path="/games/fallacy-detective"
                            element={<GameFallacyDetective />}
                        />
                        <Route
                            path="/games/philosopher-match"
                            element={<GamePhilosopherMatch />}
                        />
                        <Route
                            path="/games/concept-map"
                            element={<GameConceptMap />}
                        />
                        <Route
                            path="/games/argument-reconstruction"
                            element={<GameArgumentReconstruction />}
                        />
                        <Route
                            path="/games/paradigm-shift"
                            element={<GameParadigmShift />}
                        />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    )
}
