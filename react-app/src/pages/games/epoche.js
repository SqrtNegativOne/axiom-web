export const EPOCHE = [
    {
        statement: '"Bachelors are unmarried men."',
        axes: {
            'Analytic / Synthetic': 'Analytic',
            'A priori / A posteriori': 'A priori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Descriptive',
        },
        note: 'The predicate is contained in the subject — no empirical investigation required. Quine challenged whether this distinction is tenable in "Two Dogmas of Empiricism," but this remains the textbook case of an analytic truth.',
    },
    {
        statement: '"The sun will rise tomorrow."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A posteriori',
            'Necessary / Contingent': 'Contingent',
            'Descriptive / Normative': 'Descriptive',
        },
        note: "Hume's problem of induction: no logical necessity compels the sun to rise. The proposition extends beyond what is contained in the subject and is justified only through experience of past regularity.",
    },
    {
        statement: '"You ought not torture innocents for entertainment."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A priori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Normative',
        },
        note: 'Moral rationalists (Kant, Ross) hold this is known a priori and necessarily true. Expressivists (Ayer, Blackburn) deny it has truth-value at all. The classification here reflects the Kantian position — itself deeply contested.',
    },
    {
        statement: '"7 + 5 = 12."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A priori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Descriptive',
        },
        note: "Kant's paradigm case of a synthetic a priori judgment. The concept 12 is not contained in 7 or 5 alone — arithmetic requires the pure intuition of time (counting) to be grasped. Frege disagreed, attempting to reduce arithmetic to logic alone and thus make it analytic. The debate about whether mathematics is analytic or synthetic a priori remains live.",
    },
    {
        statement: '"Water is H₂O."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A posteriori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Descriptive',
        },
        note: "Kripke's celebrated necessary a posteriori. Before chemistry, this identity was unknown — discovered empirically. Yet once discovered, it holds necessarily: in no possible world is water something other than H₂O. This discovery disproved the traditional equation of necessity with aprioricity and of contingency with the empirical.",
    },
    {
        statement: '"Caesar crossed the Rubicon."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A posteriori',
            'Necessary / Contingent': 'Contingent',
            'Descriptive / Normative': 'Descriptive',
        },
        note: "The textbook contingent empirical claim. Nothing in the concepts of Caesar or the Rubicon guarantees the crossing — it required an act of will, a historical moment, an army. Leibniz controversially held that Caesar's concept includes the predicate of crossing, making it necessary. Kant rejected this: it conflates logical necessity with mere analytic containment.",
    },
    {
        statement:
            '"Nothing can be both red and green all over at the same time."',
        axes: {
            'Analytic / Synthetic': 'Analytic',
            'A priori / A posteriori': 'A priori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Descriptive',
        },
        note: "Wittgenstein's colour exclusion problem. In the Tractatus he held this was synthetic a priori — a structural fact about colour space not derivable from logic alone, which troubled his picture theory. He later abandoned this. The dominant position classifies it as analytic: the grammar of colour terms rules out simultaneous total redness and greenness by meaning alone.",
    },
    {
        statement: '"Pain is intrinsically bad."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A priori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Normative',
        },
        note: "The moral intuitionist position (Moore, Ross): some normative truths are knowable a priori through rational intuition — not derived from definitions, yet not discovered through empirical investigation. Expressivists deny it has any truth-value. Naturalists claim it is synthetic a posteriori: 'bad' picks out a natural property knowable by observation.",
    },
    {
        statement:
            '"Act only according to that maxim by which you can at the same time will that it should become a universal law."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A priori',
            'Necessary / Contingent': 'Necessary',
            'Descriptive / Normative': 'Normative',
        },
        note: "Kant's categorical imperative. Synthetic because universalisability as the criterion of rightness is not contained in the concept of moral obligation. A priori because it is grounded in pure practical reason, not experience. Necessary because for Kant a moral law admits no exceptions — it holds unconditionally across all rational agents.",
    },
    {
        statement: '"Democratic governments tend to outlast autocratic ones."',
        axes: {
            'Analytic / Synthetic': 'Synthetic',
            'A priori / A posteriori': 'A posteriori',
            'Necessary / Contingent': 'Contingent',
            'Descriptive / Normative': 'Descriptive',
        },
        note: 'A synthetic empirical generalisation from comparative politics, not a conceptual truth. Its justification rests on the historical record — verifiable data on regime longevity. Contingent because the causal mechanisms could in principle fail; it is an inductive claim about tendencies, not a statement of logical necessity.',
    },
]
