"use client";
import { useState, useEffect } from 'react'
import Dither from './Dither'

const PROMPTS = [
    '> What do you know?',
    '> What ought you do?',
    '> What can be known?',
    '> What is the good life?',
    '> Does free will exist?',
    '> What is consciousness?',
    '> Is a hotdog a sandwich?',
    '> Why is there something rather than nothing?',
]

function TypewriterPrompt() {
    const [idx, setIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [phase, setPhase] = useState('typing') // 'typing' | 'lingering' | 'erasing'

    useEffect(() => {
        const full = PROMPTS[idx]

        if (phase === 'typing') {
            if (displayed.length < full.length) {
                const t = setTimeout(
                    () => setDisplayed(full.slice(0, displayed.length + 1)),
                    22,
                )
                return () => clearTimeout(t)
            } else {
                const t = setTimeout(() => setPhase('lingering'), 2500)
                return () => clearTimeout(t)
            }
        }

        if (phase === 'lingering') {
            const t = setTimeout(() => setPhase('erasing'), 0)
            return () => clearTimeout(t)
        }

        if (phase === 'erasing') {
            if (displayed.length > 0) {
                const t = setTimeout(
                    () => setDisplayed(displayed.slice(0, -1)),
                    14,
                )
                return () => clearTimeout(t)
            } else {
                setIdx((i) => (i + 1) % PROMPTS.length)
                setPhase('typing')
            }
        }
    }, [displayed, phase, idx])

    return (
        <span className="font-mono text-gold/80 text-sm md:text-base tracking-wider">
            {displayed}
            <span
                className="animate-blink inline-block bg-gold/80 align-text-bottom ml-0.5"
                style={{ width: '0.5em', height: '1.1em' }}
                aria-hidden="true"
            />
        </span>
    )
}

export default function Hero() {
    return (
        <section
            className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            {/* Reactbits WebGL dither background */}
            <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <Dither
                    waveColor={[0.23, 0.43, 0.33]}
                    disableAnimation={false}
                    enableMouseInteraction
                    mouseRadius={0.1}
                    colorNum={4}
                    pixelSize={2}
                    waveAmplitude={0.3}
                    waveFrequency={3}
                    waveSpeed={0.015}
                />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 grid-overlay pointer-events-none"
                style={{ zIndex: 1 }}
            />

            {/* Content */}
            <div
                className="relative flex flex-col items-center"
                style={{ zIndex: 2 }}
            >
                {/* Image + AXIOM overlay centred in frame */}
                <div
                    className="relative"
                    style={{
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                    }}
                >
                    {/* transparent PNG, no overflow-hidden */}
                    <div
                        className="relative"
                        style={{
                            width: 'clamp(340px, 54vw, 580px)',
                            height: 'clamp(340px, 54vw, 580px)',
                            willChange: 'transform',
                            transform: 'translateZ(0)',
                        }}
                    >
                        <img
                            src="/data/icarus.png"
                            alt="Fall of Icarus"
                            className="w-full h-full object-contain"
                            style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                            }}
                        />

                        {/* Text overlay — centred in frame, column layout */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
                            <div style={{ marginBottom: '0.15em' }}>
                                <span
                                    className="font-mono text-cream"
                                    style={{
                                        fontSize: '0.5rem',
                                        letterSpacing: '0.3em',
                                        backgroundColor: 'rgba(26,26,24,0.72)',
                                        padding: '0.35em 0.8em',
                                        display: 'inline-block',
                                        willChange: 'transform',
                                        transform: 'translateZ(0)',
                                    }}
                                >
                                    EST. 2017
                                </span>
                            </div>

                            <h1 className="axiom-wordmark">
                                <span className="axiom-wordmark-text">
                                    AXIOM
                                </span>
                            </h1>

                            <p
                                className="font-heading italic font-light text-cream/70 tracking-[0.12em]"
                                style={{
                                    fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
                                    marginTop: '0.1em',
                                    willChange: 'transform',
                                    transform: 'translateZ(0)',
                                }}
                            >
                                the philosophy society
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-7 mt-2">
                    <TypewriterPrompt />
                </div>
            </div>
        </section>
    )
}

