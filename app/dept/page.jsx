import Link from 'next/link'
import SpotlightCard from '../../components/SpotlightCard'
import MaterialIcon from '../../components/MaterialIcon'
import { DEPARTMENTS } from '../../data/departments'

export const metadata = {
    title: 'Departments | Axiom',
    description:
        'The podcast, design, filmmaking, and content arms of Axiom — the philosophy society at NSUT.',
}

export default function DepartmentsIndex() {
    return (
        <div className="pt-20 max-w-6xl mx-auto px-6 py-16 animate-on-load">
            <p className="label-mono mb-4">— Departments</p>
            <h1 className="section-heading mb-4">What we make</h1>
            <div className="h-px w-16 bg-gold/50 mb-6" />
            <p
                className="font-body text-ink/70 leading-relaxed max-w-2xl mb-14"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
            >
                Axiom is more than discussions. Four departments turn the
                society&apos;s thinking into things you can watch, hear, read,
                and look at.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEPARTMENTS.map((dept) => (
                    <SpotlightCard
                        key={dept.slug}
                        className="p-8 group transition-shadow duration-300 hover:shadow-lg"
                    >
                        <Link href={`/dept/${dept.slug}`} className="block">
                            <MaterialIcon
                                name={dept.icon}
                                className="text-4xl text-gold/60 group-hover:text-gold transition-colors duration-200"
                            />
                            <h2 className="font-heading text-2xl text-green mt-5 mb-2">
                                {dept.name}
                            </h2>
                            <p className="font-body text-base text-ink/60 leading-relaxed mb-6">
                                {dept.blurb}
                            </p>
                            <span className="font-mono text-xs text-terracotta group-hover:text-green transition-colors duration-200 tracking-wider">
                                explore →
                            </span>
                        </Link>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </SpotlightCard>
                ))}
            </div>

            <div className="mt-14 border-t border-gold/20 pt-8">
                <p className="font-body text-ink/60">
                    Want to be part of one of these?{' '}
                    <Link
                        href="/join"
                        className="text-terracotta hover:text-green transition-colors"
                    >
                        Join the society →
                    </Link>
                </p>
            </div>
        </div>
    )
}
