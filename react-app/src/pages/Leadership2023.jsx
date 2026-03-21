import { Link } from 'react-router-dom'

export default function Leadership2023() {
  return (
    <div className="pt-20 animate-on-load">
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="label-mono mb-4">Those Who Came Before</p>
        <h1 className="section-heading mb-6">Previous Leadership</h1>
        <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
        <h2 className="font-heading text-green font-light text-3xl mb-8">Team 2023</h2>
        <p className="font-body text-ink/50 leading-relaxed max-w-md mx-auto"
           style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          Coming soon.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8 text-center">
        <Link
          to="/about/2024"
          className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
        >
          &larr; Team 2024
        </Link>
      </section>
    </div>
  )
}
