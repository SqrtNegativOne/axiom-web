export const FALLACIES = [
    // Appeals
    {
        id: 'appeal_auth',
        name: 'Appeal to Authority',
        desc: 'Citing an authority — especially outside their domain — as definitive proof',
    },
    {
        id: 'appeal_pop',
        name: 'Appeal to Popularity',
        desc: 'Claiming something is true because many people believe it (ad populum)',
    },
    {
        id: 'appeal_emotion',
        name: 'Appeal to Emotion',
        desc: 'Substituting emotional manipulation for logical argument',
    },
    {
        id: 'appeal_fear',
        name: 'Appeal to Fear',
        desc: 'Using fear or dire warnings to compel agreement rather than reason',
    },
    {
        id: 'appeal_pity',
        name: 'Appeal to Pity',
        desc: 'Invoking sympathy or guilt to win assent rather than logic (ad misericordiam)',
    },
    {
        id: 'appeal_nature',
        name: 'Appeal to Nature',
        desc: 'Assuming something is good because it is natural, or bad because it is unnatural',
    },
    {
        id: 'appeal_tradition',
        name: 'Appeal to Tradition',
        desc: 'Arguing something is correct simply because it has long been done that way',
    },
    {
        id: 'appeal_novelty',
        name: 'Appeal to Novelty',
        desc: 'Assuming something is better merely because it is newer',
    },
    {
        id: 'appeal_ignorance',
        name: 'Appeal to Ignorance',
        desc: "Claiming something is true because it hasn't been proven false, or vice versa",
    },
    {
        id: 'appeal_ridicule',
        name: 'Appeal to Ridicule',
        desc: 'Presenting an argument as laughable rather than addressing it on its merits',
    },
    {
        id: 'appeal_consequences',
        name: 'Appeal to Consequences',
        desc: 'Arguing a claim is false because its truth would have bad consequences, or true because desirable',
    },
    {
        id: 'appeal_force',
        name: 'Appeal to Force',
        desc: 'Using threat of harm or coercion to compel agreement',
    },
    {
        id: 'appeal_flattery',
        name: 'Appeal to Flattery',
        desc: 'Using excessive praise to gain agreement rather than argument',
    },
    // Character attacks & red herrings
    {
        id: 'ad_hominem',
        name: 'Ad Hominem',
        desc: 'Attacking the person making the argument instead of the argument itself',
    },
    {
        id: 'tu_quoque',
        name: 'Tu Quoque',
        desc: "Deflecting criticism by accusing the critic of the same fault ('you too')",
    },
    {
        id: 'genetic',
        name: 'Genetic Fallacy',
        desc: 'Judging an argument solely by its origin or source rather than its content',
    },
    {
        id: 'red_herring',
        name: 'Red Herring',
        desc: 'Introducing irrelevant information to distract from the actual issue',
    },
    {
        id: 'straw_man',
        name: 'Straw Man',
        desc: "Misrepresenting someone's argument to make it easier to attack",
    },
    {
        id: 'poisoning_well',
        name: 'Poisoning the Well',
        desc: 'Presenting adverse information about someone before they speak to preemptively discredit them',
    },
    {
        id: 'whataboutism',
        name: 'Whataboutism',
        desc: 'Deflecting a charge by pointing to a comparable but unaddressed situation elsewhere',
    },
    // Causation & evidence
    {
        id: 'post_hoc',
        name: 'Post Hoc (False Cause)',
        desc: 'Assuming A caused B merely because A preceded B (post hoc ergo propter hoc)',
    },
    {
        id: 'correlation_cause',
        name: 'Correlation Implies Causation',
        desc: 'Treating a statistical correlation as evidence of a causal relationship',
    },
    {
        id: 'texas_sharp',
        name: 'Texas Sharpshooter',
        desc: 'Picking clusters in data after the fact to match a pre-desired conclusion',
    },
    {
        id: 'cherry_pick',
        name: 'Cherry Picking',
        desc: 'Selecting only evidence that supports a conclusion while ignoring contradictory data',
    },
    {
        id: 'survivorship',
        name: 'Survivorship Bias',
        desc: 'Drawing conclusions from visible successes while ignoring unobserved failures',
    },
    {
        id: 'gamblers',
        name: "Gambler's Fallacy",
        desc: 'Believing past random outcomes affect the probability of independent future ones',
    },
    // Generalisation
    {
        id: 'hasty_gen',
        name: 'Hasty Generalization',
        desc: 'Reaching a broad conclusion from too small or unrepresentative a sample',
    },
    {
        id: 'anecdotal',
        name: 'Anecdotal Evidence',
        desc: 'Using a personal story or isolated case as though it defeats or replaces broader evidence',
    },
    {
        id: 'false_analogy',
        name: 'False Analogy',
        desc: 'Claiming two situations are alike in a relevant way when they differ in important respects',
    },
    // Structure & framing
    {
        id: 'false_dichotomy',
        name: 'False Dichotomy',
        desc: 'Presenting only two options as if no others exist (false dilemma / either-or fallacy)',
    },
    {
        id: 'circular',
        name: 'Circular Reasoning',
        desc: 'The conclusion is smuggled in as a premise; the argument goes in a loop (begging the question)',
    },
    {
        id: 'slippery_slope',
        name: 'Slippery Slope',
        desc: 'Asserting that one step will inevitably lead to extreme consequences without justifying each link',
    },
    {
        id: 'false_equiv',
        name: 'False Equivalence',
        desc: 'Treating two fundamentally different things as though they are the same',
    },
    {
        id: 'loaded_q',
        name: 'Loaded Question',
        desc: 'Asking a question with an unproven assumption built into it',
    },
    {
        id: 'equivocation',
        name: 'Equivocation',
        desc: "Exploiting a word's multiple meanings by switching senses within one argument",
    },
    {
        id: 'composition',
        name: 'Fallacy of Composition',
        desc: 'Assuming what is true of the parts must be true of the whole',
    },
    {
        id: 'division',
        name: 'Fallacy of Division',
        desc: 'Assuming what is true of the whole must be true of each part',
    },
    {
        id: 'middle_ground',
        name: 'Middle Ground / False Compromise',
        desc: 'Assuming the truth must lie between two extremes regardless of their merits',
    },
    {
        id: 'no_true_scotsman',
        name: 'No True Scotsman',
        desc: 'Dismissing a counterexample by redefining terms to exclude it',
    },
    {
        id: 'motte_bailey',
        name: 'Motte-and-Bailey',
        desc: 'Defending a bold claim by retreating to a weaker version when challenged',
    },
    {
        id: 'nirvana',
        name: 'Nirvana / Perfect Solution',
        desc: 'Rejecting a practical solution because it is not perfect, even when no perfect solution exists',
    },
    {
        id: 'moving_goalposts',
        name: 'Moving the Goalposts',
        desc: 'Changing the standard of proof required after evidence has been provided',
    },
    {
        id: 'special_pleading',
        name: 'Special Pleading',
        desc: 'Applying standards to others while exempting oneself without justification',
    },
    {
        id: 'burden_proof',
        name: 'Shifting the Burden of Proof',
        desc: "Demanding opponents disprove a claim rather than proving one's own",
    },
    {
        id: 'sunk_cost',
        name: 'Sunk Cost Fallacy',
        desc: 'Continuing a course of action because of past investment rather than future value',
    },
    {
        id: 'wishful_thinking',
        name: 'Wishful Thinking',
        desc: 'Believing something is true because one strongly wants it to be',
    },
    {
        id: 'thought_terminating',
        name: 'Thought-Terminating Cliché',
        desc: 'Using a stock phrase or platitude to shut down further critical thinking',
    },
    {
        id: 'galileo_gambit',
        name: 'Galileo Gambit',
        desc: "Claiming that mainstream opposition proves one's idea must be revolutionary and correct",
    },
    // Formal
    {
        id: 'affirm_consequent',
        name: 'Affirming the Consequent',
        desc: 'If P→Q and Q is true, concluding P is true — an invalid logical form',
    },
    {
        id: 'deny_antecedent',
        name: 'Denying the Antecedent',
        desc: 'If P→Q and P is false, concluding Q is false — an invalid logical form',
    },
    {
        id: 'undist_middle',
        name: 'Undistributed Middle',
        desc: "Both A and B share a property, therefore A is B — the shared property doesn't establish identity",
    },
]

export function parseCaseMarkdown(text) {
    const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
    const meta = {}
    if (fmMatch) {
        fmMatch[1].split(/\r?\n/).forEach((line) => {
            const colon = line.indexOf(':')
            if (colon === -1) return
            meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim()
        })
        text = text.slice(fmMatch[0].length)
    }

    const sentences = []
    const fallacies = []
    let pendingSis = []

    for (const raw of text.split(/\r?\n/)) {
        const line = raw.trim()
        if (!line) continue

        const hlMatch = line.match(/^\{==([\s\S]*?)==\}(.*)$/)
        if (hlMatch) {
            const sentenceText = hlMatch[1]
            const remainder = hlMatch[2].trim()
            const si = sentences.length
            sentences.push(sentenceText)
            pendingSis.push(si)

            const cmMatch = remainder.match(/^\{>>([\s\S]*?)<<\}$/)
            if (cmMatch) {
                const sep = cmMatch[1].indexOf('|')
                const fid = cmMatch[1].slice(0, sep).trim()
                const expl = cmMatch[1].slice(sep + 1).trim()
                fallacies.push({ sis: [...pendingSis], fid, expl })
                pendingSis = []
            }
        } else {
            if (pendingSis.length > 0) pendingSis = []
            sentences.push(line)
        }
    }

    return {
        id: meta.id || 'unknown',
        label: meta.label || 'Case File',
        title: meta.title || 'Untitled',
        context: meta.context || '',
        sentences,
        fallacies,
    }
}
