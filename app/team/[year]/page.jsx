import TeamPortraitCard from '../../../components/TeamPortraitCard'
import team2024 from '../../../data/team-2024'
import team2025 from '../../../data/team-2025'
import Link from 'next/link'

const teams = {
    '2024': team2024,
    '2025': team2025,
}

export function generateStaticParams() {
    return Object.keys(teams).map(year => ({ year }))
}

export async function generateMetadata({ params }) {
    const { year } = await params
    return {
        title: `Team ${year} | Axiom`,
        description: `The ${year} executive committee and members of Axiom, the philosophy society at NSUT.`
    }
}

export default async function TeamByYear({ params }) {
    const { year } = await params
    const teamData = teams[year]

    const nextYear = (parseInt(year) + 1).toString()
    const prevYear = (parseInt(year) - 1).toString()

    if (!teamData) {
        return (
            <div className="pt-20 animate-on-load min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-mono text-gold mb-4 text-xl">404: TEAM NOT FOUND</h2>
                    <Link href="/team" className="text-terracotta hover:text-green underline underline-offset-4 transition-colors">
                        Return to current team
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-20 animate-on-load">
            <section className="max-w-6xl mx-auto px-6 py-16">
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
                {teams[nextYear] && (
                <Link
                    href={`/team/${nextYear}`}
                    className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                >
                    &larr; Team {nextYear}
                </Link>
                )}
                
                {teams[prevYear] && (
                <Link
                    href={`/team/${prevYear}`}
                    className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                >
                    Team {prevYear} &rarr;
                </Link>
                )}
            </section>
        </div>
    )
}
