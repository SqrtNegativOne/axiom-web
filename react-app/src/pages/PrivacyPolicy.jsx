import SEO from '../components/SEO'

export default function PrivacyPolicy() {
  return (
    <div className="bg-cream dark:bg-[#0E1A14] min-h-screen">
      <SEO
        title="Privacy Policy"
        path="/privacy"
        description="Privacy policy for the Axiom website — what data we collect and how we use it."
        noindex={true}
      />
      <div className="w-[82%] max-w-3xl mx-auto py-24">

        {/* Header */}
        <div className="mb-14">
          <p className="label-mono mb-4">Legal</p>
          <h1 className="font-heading font-light text-green mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-ink/50 dark:text-ink/50 mb-4">
            Last updated: May 2025
          </p>
          <div className="border-t border-gold/30" />
        </div>

        <div className="space-y-14 font-body text-ink/80 dark:text-ink/80 leading-relaxed text-sm">

          <section className="space-y-4">
            <p>
              Axiom is the philosophy society at NSUT. This policy explains what information is collected when
              you visit this website and how it is used.
            </p>
            <p>
              We respect your privacy. We do not track you across sites, we do not sell or share any data with
              third parties, and we do not use advertising cookies.
            </p>
          </section>

          <div className="border-t border-gold/20" />

          {/* Analytics */}
          <section>
            <p className="label-mono mb-6">Analytics</p>
            <div className="space-y-4">
              <p>
                This site uses <a href="https://www.goatcounter.com" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">GoatCounter</a> — an open-source,
                cookieless analytics platform — to understand how many people visit each page.
              </p>

              <div className="border border-gold/20 divide-y divide-gold/20">
                {[
                  ['What is collected', 'Page URL, referrer URL, browser name and version, approximate screen size, and country derived from IP address. IP addresses are never stored.'],
                  ['Cookies', 'None. GoatCounter sets no cookies and uses no local storage.'],
                  ['Personal data', 'No personally identifiable information is collected or stored.'],
                  ['Opt-out', 'If you have JavaScript disabled or use a script-blocking browser extension, no analytics data is sent at all.'],
                ].map(([label, text]) => (
                  <div key={label} className="flex gap-6 px-4 py-3">
                    <span className="font-mono text-xs text-gold uppercase tracking-widest w-32 shrink-0 pt-0.5">{label}</span>
                    <span className="text-ink/70 dark:text-ink/70">{text}</span>
                  </div>
                ))}
                <div className="flex gap-6 px-4 py-3">
                  <span className="font-mono text-xs text-gold uppercase tracking-widest w-32 shrink-0 pt-0.5">Data location</span>
                  <span className="text-ink/70 dark:text-ink/70">
                    Analytics data is stored on GoatCounter's servers. See the{' '}
                    <a href="https://www.goatcounter.com/help/privacy" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">GoatCounter privacy policy</a>{' '}
                    for details.
                  </span>
                </div>
              </div>

              <p className="text-xs text-ink/40">
                GoatCounter is GDPR-friendly by design. Learn more at{' '}
                <a href="https://www.goatcounter.com/help/privacy" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">goatcounter.com/help/privacy</a>.
              </p>
            </div>
          </section>

          <div className="border-t border-gold/20" />

          {/* External links */}
          <section>
            <p className="label-mono mb-6">External links &amp; embeds</p>
            <div className="space-y-4">
              <p>
                This site links to third-party platforms (Instagram, LinkedIn, YouTube, etc.). Visiting those
                links is subject to each platform's own privacy policy. We have no control over and accept no
                responsibility for the content or privacy practices of external sites.
              </p>
              <p>
                Fonts are loaded from Google Fonts. Google may record font requests; see the{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Google Privacy Policy</a>.
              </p>
            </div>
          </section>

          <div className="border-t border-gold/20" />

          {/* Contact */}
          <section>
            <p className="label-mono mb-6">Contact</p>
            <p>
              If you have any questions about this policy, you can reach us via our{' '}
              <a href="https://www.instagram.com/axiomnsut" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Instagram</a>{' '}
              or{' '}
              <a href="https://www.linkedin.com/company/axiom-nsut" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">LinkedIn</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
