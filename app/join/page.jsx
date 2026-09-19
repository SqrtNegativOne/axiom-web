import Link from 'next/link'
import MaterialIcon from '../../components/MaterialIcon'
import socialsData from '@/data/socials.json'

const CYCLE = [
    {
        step: '04',
        title: 'The fourth years leave',
        body: 'After four years, the fourth years step out of the society — but they are always welcome to stay unofficially involved in anything they like. Axiom never really lets go of its people.',
    },
    {
        step: '03',
        title: 'The third years take core',
        body: 'The third years are sorted into core responsibilities — president, vice president, tech head, and the rest. They run the society for the year and carry its memory forward.',
    },
    {
        step: '02',
        title: 'The second years are filtered',
        body: 'Second years are filtered into the Executive Committee. A second year not on execomm by the odd semester is removed from the society. Before recruitment, there are no members and no first years in the society — only the people who have earned their place.',
    },
    {
        step: '01',
        title: 'The first years are recruited',
        body: 'Every odd semester we open our doors and recruit first years. Second years are welcome too — you can be recruited in this same cycle. This is where you come in.',
    },
]

const LOOK_FOR = [
    {
        icon: 'handshake',
        title: 'Well-mannered',
        body: 'You can disagree without being disagreeable, and you treat people with respect.',
    },
    {
        icon: 'psychology',
        title: 'Cognitively interesting',
        body: 'You think in a way that makes the room better. We cannot define it, but we know it when we see it.',
    },
    {
        icon: 'chair',
        title: 'Comfortable with hard questions',
        body: 'You can sit with something difficult, stay there for a while, and not reach for the easy exit.',
    },
]

const FAQS = [
    {
        q: 'Do I need to prepare anything?',
        a: 'No. Really. You do not need to prepare anything. This is not a technical society and there is no syllabus. We are more interested in how you think than what you have memorised.',
    },
    {
        q: 'What if I am not sure about an answer?',
        a: 'Then say so, or leave the question blank, or give a one-word answer. We would rather have an honest "I do not know" than a confident invention.',
    },
    {
        q: 'Can I use AI for the form?',
        a: 'No. Please do not. We will know, and we use anti-AI tools. We want to hear you — your voice, your weird tangents, your actual opinions.',
    },
    {
        q: 'How long is the interview?',
        a: 'Usually about thirty minutes. We ask random, philosophical questions and tailor them to whatever you are interested in. It is a conversation, not an exam.',
    },
    {
        q: 'I am in my second year. Can I join?',
        a: 'Yes. Second years can be recruited in the same odd-semester cycle as first years.',
    },
    {
        q: 'What if I get something factually wrong?',
        a: 'Many of our members have larped and given completely wrong answers to concrete questions and still been hired — because they showed that they cared. That is enough.',
    },
]

export const metadata = {
    title: 'Join | Axiom',
    description:
        'How to join Axiom, the philosophy society at NSUT — recruitment cycle, what we look for, the form, and the interview.',
}

export default function JoinPage() {
    return (
        <div className="pt-20 animate-on-load">
            {/* Header */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="label-mono mb-4">Recruitment</p>
                <h1
                    className="font-heading font-light text-green mb-6"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                    Join Axiom
                </h1>
                <div className="h-px w-16 bg-gold/50 mb-8" />
                <p
                    className="font-body text-ink/75 leading-relaxed max-w-2xl"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
                >
                    Every year we kick start our recruitment process in the odd
                    semesters. This page is not an open application — it is the
                    guide we wish every junior had. Here is exactly how it
                    works, and exactly what we are looking for, so you know what
                    to expect when the next cycle comes around.
                </p>
            </section>

            {/* The cycle */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <p className="label-mono mb-6">The cycle</p>
                <div className="border-t border-gold/20">
                    {CYCLE.map(({ step, title, body }) => (
                        <div
                            key={step}
                            className="border-b border-gold/20 py-7 flex gap-6"
                        >
                            <span className="font-mono text-2xl text-gold/40 shrink-0">
                                {step}
                            </span>
                            <div>
                                <h2 className="font-heading text-2xl text-green mb-2">
                                    {title}
                                </h2>
                                <p className="font-body text-ink/70 leading-relaxed max-w-2xl">
                                    {body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Who we look for */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <p className="label-mono mb-3">Who we look for</p>
                <h2 className="section-heading mb-8">
                    We are drawn to a certain kind of person.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {LOOK_FOR.map(({ icon, title, body }) => (
                        <div
                            key={title}
                            className="border border-gold/20 p-6"
                        >
                            <MaterialIcon
                                name={icon}
                                className="text-3xl text-terracotta"
                            />
                            <h3 className="font-heading text-xl text-green mt-4 mb-2">
                                {title}
                            </h3>
                            <p className="font-body text-sm text-ink/60 leading-relaxed">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* The form */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <div className="border border-gold/30 bg-cream-dark dark:bg-cream-dark p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-5">
                        <MaterialIcon
                            name="edit_document"
                            className="text-2xl text-gold"
                        />
                        <p className="label-mono">The form</p>
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-light text-green mb-4">
                        We release the Google Form on the day of orientation.
                    </h2>
                    <div className="space-y-4 font-body text-ink/75 leading-relaxed max-w-2xl">
                        <p>
                            Orientation usually happens in NSUT&apos;s Mini
                            Audi, and we release the Google Form that same day.
                            The link is shared on our Instagram and handed out at
                            the induction itself. It is the front door to
                            everything that follows.
                        </p>
                        <p>
                            Please fill it truthfully. We like people who give
                            us <em>hard</em> truths. Your answer can be as
                            pithy or as verbose as you like. Feel free to be
                            humble or to show off — whatever is actually you. We
                            especially want to see your shining personality.
                        </p>
                        <p>
                            If you are unsure of a question, just do not answer
                            it. Or give a one-word answer. What we do not want
                            is an answer that is not yours.
                        </p>
                        <p className="text-terracotta font-medium">
                            Please do not use AI. We will know, and we use
                            anti-AI tools.
                        </p>
                    </div>
                </div>
            </section>

            {/* The interview */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <p className="label-mono mb-3">The interview</p>
                <h2 className="section-heading mb-6">
                    Then we talk. Usually for about thirty minutes.
                </h2>
                <div className="space-y-4 font-body text-ink/75 leading-relaxed max-w-2xl">
                    <p>
                        We will ask you random bullshit. Philosophical
                        questions, mostly, and we will tailor them to your
                        interests. It is closer to a conversation than an exam.
                    </p>
                    <p className="font-heading text-2xl font-light text-green pt-2">
                        You do not need to prepare anything.
                    </p>
                    <p className="text-terracotta">
                        Let me emphasize that: you do not need to prepare
                        anything. Really!
                    </p>
                    <p>
                        This is not a tech society. Many of our members have
                        larped and given completely wrong answers to anything
                        concrete — and we still hired them, because they showed
                        that they <em>cared</em>, and that is enough.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <div className="border border-gold/30 bg-cream-dark dark:bg-cream-dark p-8 sm:p-12 text-center">
                    <MaterialIcon
                        name="diversity_3"
                        className="text-5xl text-gold/70"
                    />
                    <h2 className="font-heading text-3xl font-light text-green mt-5 mb-4">
                        This cycle is closed. Yours will come.
                    </h2>
                    <p className="font-body text-ink/60 max-w-xl mx-auto mb-8">
                        Recruitment runs once a year, in the odd semester, so the
                        form will not be back for a while. Nothing here is
                        urgent — keep this page in mind, follow us on Instagram
                        for the announcement, and come find us whenever you are
                        ready. We would rather meet you curious than
                        rehearsed.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={socialsData.instagram.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-green/40 text-green px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-green hover:text-cream"
                        >
                            Follow on Instagram →
                        </a>
                        <a
                            href={socialsData.whatsapp.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs tracking-[0.2em] uppercase text-terracotta hover:text-green transition-colors duration-300"
                        >
                            WhatsApp Community →
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <p className="label-mono mb-6">Questions</p>
                <div className="border-t border-gold/20">
                    {FAQS.map(({ q, a }) => (
                        <div key={q} className="border-b border-gold/20 py-6">
                            <h3 className="font-heading text-xl text-green mb-2">
                                {q}
                            </h3>
                            <p className="font-body text-ink/70 leading-relaxed max-w-2xl">
                                {a}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="font-body text-sm text-ink/50 mt-8">
                    Still curious? Explore our{' '}
                    <Link
                        href="/dept"
                        className="text-terracotta hover:text-green transition-colors"
                    >
                        departments
                    </Link>{' '}
                    and the{' '}
                    <Link
                        href="/newsletter/"
                        className="text-terracotta hover:text-green transition-colors"
                    >
                        newsletter
                    </Link>
                    .
                </p>
            </section>
        </div>
    )
}
