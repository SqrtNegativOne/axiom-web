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
            <p className="label-mono mb-6">Built with</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-gold/20">
              {[
                { index: '01', tool: 'React 18', tag: 'UI', desc: 'Component library with BrowserRouter for clean URL routing.' },
                { index: '02', tool: 'Vite', tag: 'Tooling', desc: 'Development server and production bundler with hot module replacement.' },
                { index: '03', tool: 'Tailwind CSS', tag: 'Styling', desc: 'Utility-first CSS framework driven by custom design tokens.' },
                { index: '04', tool: 'Eleventy', tag: 'Content', desc: 'Static site generator powering the newsletter layer.' },
                { index: '05', tool: 'markdown-it', tag: 'Content', desc: 'Markdown renderer with footnote plugin for newsletter posts.' },
                { index: '06', tool: 'Vercel', tag: 'Deploy', desc: 'Edge hosting with automatic deploys from the main branch.' },
              ].map(({ index, tool, tag, desc }) => (
                <div key={tool} className="border-b border-r border-gold/20 p-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gold/50">{index}</span>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-terracotta/60">{tag}</span>
                  </div>
                  <p className="font-mono text-sm text-green">{tool}</p>
                  <p className="text-xs text-ink/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
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
            <p className="text-sm text-ink/70 mb-5">
              Deployed on <strong className="text-ink font-medium">Vercel</strong> from the{' '}
              <code className="font-mono text-xs bg-cream-dark px-1.5 py-0.5 rounded">main</code> branch.
              The site ships as a single static directory merging two independent build systems —
              React/Vite for the main site and Eleventy for the newsletter — via a Node.js postbuild script.
            </p>
            <a
              href="https://github.com/SqrtNegativOne/axiom-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-mono text-xs text-green border border-gold/30 px-4 py-2.5 hover:bg-cream-dark hover:border-gold/60 transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 opacity-70">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              github.com/SqrtNegativOne/axiom-web
            </a>
          </section>


        </div>
      </div>
    </div>
  )
}
