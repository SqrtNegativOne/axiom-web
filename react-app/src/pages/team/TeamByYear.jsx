import { useParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import TeamPortraitCard from '../../components/TeamPortraitCard'
import team2024 from '../../data/team-2024'
import team2025 from '../../data/team-2025'

const teams = {
    '2024': team2024,
    '2025': team2025,
}

export default function TeamByYear() {
    const { year } = useParams()
    const teamData = teams[year]

    const nextYear = parseInt(year) + 1
    const prevYear = parseInt(year) - 1

    // 2023 has no data, so it renders a custom fallback state
    if (year === '2023') {
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

    if (!teamData) {
        return (
            <div className="pt-20 animate-on-load min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-mono text-gold mb-4 text-xl">404: TEAM NOT FOUND</h2>
                    <a href="/team" className="text-terracotta hover:text-green underline underline-offset-4 transition-colors">
                        Return to current team
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-20 animate-on-load">
            <SEO
                title={`Previous Leadership — ${year}`}
                path={`/team/${year}`}
                description={`The ${year} executive committee and members of Axiom, the philosophy society at NSUT.`}
            />

            <section className="max-w-6xl mx-auto px-6 py-16">
                <p className="label-mono mb-3 text-center">
                    Previous Leadership
                </p>
                <h2 className="section-heading text-center mb-3">Team {year}</h2>
                <p className="font-body text-ink/60 text-center mb-14 max-w-xl mx-auto">
                    The team that steered Axiom through its previous chapter.
                </p>

                {teamData.map((group) => (
                    <div key={group.role} className="mb-14">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gold/20" />
                            <h3 className="label-mono px-4">{group.role}</h3>
                            <div className="h-px flex-1 bg-gold/20" />
                        </div>
                        <div
                            className={`grid gap-10 ${
                                group.members.length === 1
                                    ? 'grid-cols-1 place-items-center'
                                    : group.members.length === 2
                                      ? 'grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto'
                                      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                            }`}
                        >
                            {group.members.map((member) => (
                                <TeamPortraitCard
                                    key={member.name}
                                    {...member}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section className="max-w-4xl mx-auto px-6 py-8 flex justify-center gap-8">
                {year === '2025' ? (
                    <a
                        href="/team"
                        className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                    >
                        &larr; Back to current team
                    </a>
                ) : (
                    <a
                        href={`/team/${nextYear}`}
                        className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                    >
                        &larr; Team {nextYear}
                    </a>
                )}
                
                <a
                    href={`/team/${prevYear}`}
                    className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                >
                    Team {prevYear} &rarr;
                </a>
            </section>
        </div>
    )
}
