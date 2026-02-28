export default function Colophon() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="w-[82%] max-w-3xl mx-auto py-24">

        {/* Header */}
        <div className="mb-14">
          <p className="label-mono mb-4">Colophon</p>
          <h1 className="font-heading font-light text-green mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            How this site was made
          </h1>
          <div className="border-t border-gold/30" />
        </div>

        <div className="space-y-14 font-body text-ink/80 leading-relaxed">

          {/* Typography */}
          <section>
            <p className="label-mono mb-4">Typography</p>
            <div className="space-y-4 text-sm">
              <div className="flex gap-6 items-baseline">
                <span className="font-heading text-2xl font-light text-green w-48 shrink-0">Cormorant Garamond</span>
                <span className="text-ink/60">Headings and display text — a revival of the 16th-century Garamond typeface, chosen for its scholarly warmth.</span>
              </div>
              <div className="border-t border-gold/20" />
              <div className="flex gap-6 items-baseline">
                <span className="font-body text-base w-48 shrink-0">DM Sans</span>
                <span className="text-ink/60">Body copy and UI labels — a low-contrast geometric grotesque designed for screen legibility.</span>
              </div>
              <div className="border-t border-gold/20" />
              <div className="flex gap-6 items-baseline">
                <span className="font-mono text-sm w-48 shrink-0">IBM Plex Mono</span>
                <span className="text-ink/60">Metadata, dates, eyebrow labels — IBM's humanist monospace with a technical character.</span>
              </div>
            </div>
            <p className="text-xs text-ink/40 mt-4">All fonts served via Google Fonts.</p>
          </section>

          <div className="border-t border-gold/20" />

          {/* Tools */}
          <section>
            <p className="label-mono mb-4">Built with</p>
            <ul className="space-y-3 text-sm">
              {[
                ['React 18', 'UI component library with BrowserRouter for clean URL routing'],
                ['Vite', 'Development server and production bundler'],
                ['Tailwind CSS', 'Utility-first CSS with custom design tokens'],
                ['Eleventy', 'Static site generator for the newsletter'],
  
                ['markdown-it', 'Markdown renderer with footnote support for newsletter posts'],
              ].map(([tool, desc]) => (
                <li key={tool} className="flex gap-4">
                  <span className="font-mono text-xs text-gold w-32 shrink-0 mt-0.5">{tool}</span>
                  <span className="text-ink/60">{desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-gold/20" />

          {/* Palette */}
          <section>
            <p className="label-mono mb-4">Colour palette</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Cream', hex: '#F8F4EC', bg: 'bg-[#F8F4EC]', border: true },
                { name: 'Cream Dark', hex: '#EDE9DF', bg: 'bg-[#EDE9DF]', border: true },
                { name: 'Green', hex: '#2C4A3E', bg: 'bg-[#2C4A3E]', border: false },
                { name: 'Terracotta', hex: '#C4704F', bg: 'bg-[#C4704F]', border: false },
                { name: 'Gold', hex: '#C9A44C', bg: 'bg-[#C9A44C]', border: false },
                { name: 'Ink', hex: '#1A1A18', bg: 'bg-[#1A1A18]', border: false },
              ].map(({ name, hex, bg, border }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-sm shrink-0 ${bg} ${border ? 'border border-gold/30' : ''}`} />
                  <div>
                    <p className="font-mono text-xs text-ink/80">{name}</p>
                    <p className="font-mono text-xs text-ink/40">{hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gold/20" />

          {/* Hosting */}
          <section>
            <p className="label-mono mb-4">Hosting &amp; deployment</p>
            <p className="text-sm text-ink/70">
              Deployed on <strong className="text-ink font-medium">Vercel</strong> from the{' '}
              <code className="font-mono text-xs bg-cream-dark px-1.5 py-0.5 rounded">main</code> branch.
              The site ships as a single static directory merging two independent build systems —
              React/Vite for the main site and Eleventy for the newsletter — via a Node.js postbuild script.
            </p>
          </section>


        </div>
      </div>
    </div>
  )
}
