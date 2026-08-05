import SEO from '../../components/SEO'

export default function Leadership2023() {
    return (
        <div className="pt-20 animate-on-load">
            <SEO
                title="Previous Leadership — 2023"
                path="/team/2023"
                description="The 2023 executive committee and members of Axiom, the philosophy society at NSUT."
                noindex={true}
            />
            <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                <p className="label-mono mb-4">Those Who Came Before</p>
                <h1 className="section-heading mb-6">Previous Leadership</h1>
                <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
                <h2 className="font-heading text-green font-light text-3xl mb-8">
                    Team 2023
                </h2>
                <p className="font-mono text-gold/70 tracking-widest text-sm">
                    NO DATA AVAILABLE
                </p>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-8 text-center">
                <a
                    href="/team/2024"
                    className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                >
                    &larr; Team 2024
                </a>
            </section>
        </div>
    )
}
