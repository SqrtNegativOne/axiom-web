export const HERMENEUTIC = [
  {
    answer: 'logos',
    clues: [
      'The ancient Greeks used <b>████</b> to refer simultaneously to word, reason, and the rational structure underlying reality itself.',
      'Heraclitus held that <b>████</b> governs all things — the unity beneath apparent conflict — yet most people remain ignorant of it throughout their lives.',
      'In Stoic philosophy, <b>████</b> became the immanent rational principle pervading the cosmos; human reason was a fragment of this universal principle.',
      'The Gospel of John opens "In the beginning was <b>████</b>," importing the Greek concept into theology, where it names the divine principle that takes on flesh.',
      "Heidegger argued that the original Greek sense of <b>████</b> — a gathering that lets things be seen — was obscured when rendered as \"reason\" or \"word,\" and that recovering it is essential to understanding Western metaphysics.",
    ],
  },
  {
    answer: 'aporia',
    clues: [
      'Socratic dialogues frequently end in <b>████</b>: the interlocutor discovers that a concept they believed they understood is, upon examination, incoherent or undefinable.',
      '<b>████</b> names not merely confusion but a productive impasse — the path of inquiry is blocked, and this blockage is itself philosophically significant.',
      'Aristotle distinguished between <b>████</b> arising from external obstacles and <b>████</b> arising from the structure of the problem itself; the latter is philosophically more valuable.',
      'Derrida used <b>████</b> to mark the undecidable moments in texts where a binary opposition collapses into its own impossibility.',
      'For Plato, <b>████</b> is the beginning of wisdom: only when the pretense of knowledge is exposed can genuine inquiry begin. It is paradoxically the most productive form of intellectual failure.',
    ],
  },
  {
    answer: 'dialectic',
    clues: [
      "In Hegel's system, <b>████</b> describes the movement by which a position generates its own negation, and both are preserved and surpassed in a higher unity.",
      "Plato used <b>████</b> as dialogical ascent toward the Forms; Kant diagnosed <b>████</b> as the inevitable illusion produced when reason overreaches possible experience.",
      "Marx retained the triadic structure of Hegel's <b>████</b> while grounding it in material contradictions and historical forces rather than the self-movement of Geist.",
      'For Adorno, <b>████</b> must remain permanently negative: no synthesis can reconcile genuine contradictions without falsifying them — claiming resolution is itself ideology.',
      'Whether as method, ontological structure, or critique, all versions of <b>████</b> share one feature: negation is not failure but the motor of thought itself.',
    ],
  },
]

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
]

export const FALLACY = [
  {
    argument:
      'Every philosopher I have studied believes in some form of metaphysics. Metaphysics must therefore be a legitimate field of inquiry.',
    answer: 'Hasty generalisation',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      'A broad conclusion drawn from an unrepresentative sample. The philosophers one personally reads do not constitute a valid survey of the field.',
  },
  {
    argument:
      "You cannot trust Nietzsche's moral philosophy — he died insane from syphilis.",
    answer: 'Ad hominem (abusive)',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "The arguer attacks the person rather than the argument. Nietzsche's mental collapse is irrelevant to the logical validity of his philosophical positions.",
  },
  {
    argument:
      'Either God exists, or life has no meaning. Life clearly has meaning. Therefore God exists.',
    answer: 'False dilemma',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      'Presents two alternatives as exhaustive when they are not. Meaning could be constructed, emergent, or relational without requiring a deity.',
  },
  {
    argument:
      'If we permit voluntary euthanasia for the terminally ill, society will soon be euthanising anyone it finds inconvenient.',
    answer: 'Slippery slope',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      'Asserts a chain of consequences without establishing that each step follows. The argument assumes inevitable escalation without any causal mechanism.',
  },
  {
    argument:
      "Locke argued that property rights are natural. But Locke owned slaves — so property rights are merely ideological cover for exploitation.",
    answer: 'Tu quoque',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Deflects an argument by pointing to the arguer's inconsistency. That Locke violated his own principles does not logically invalidate those principles.",
  },
]

export const FALLACY_OPTS = [
  { name: 'Ad hominem (abusive)', family: 'Informal', cls: 'Relevance' },
  { name: 'Tu quoque', family: 'Informal', cls: 'Relevance' },
  { name: 'Appeal to authority', family: 'Informal', cls: 'Relevance' },
  { name: 'Straw man', family: 'Informal', cls: 'Relevance' },
  { name: 'False dilemma', family: 'Informal', cls: 'Presumption' },
  { name: 'Slippery slope', family: 'Informal', cls: 'Presumption' },
  { name: 'Hasty generalisation', family: 'Informal', cls: 'Presumption' },
  { name: 'Circular reasoning', family: 'Informal', cls: 'Presumption' },
  { name: 'Equivocation', family: 'Informal', cls: 'Ambiguity' },
  { name: 'Affirming the consequent', family: 'Formal', cls: 'Formal' },
  { name: 'Post hoc ergo propter hoc', family: 'Informal', cls: 'Presumption' },
  { name: 'Appeal to tradition', family: 'Informal', cls: 'Relevance' },
]

export const DIALECTIC = [
  {
    context: 'Berkeley → Materialism → Transcendental Idealism',
    thesis:
      '"To exist is to be perceived. Material objects have no existence independent of a mind that apprehends them. The so-called external world is a construction of ideas." — Berkeley',
    antitheses: [
      {
        text: 'Reality exists independently of any mind. Objects persist whether perceived or not. The claim that matter is ideal confuses the order of knowledge with the order of being.',
        correct: true,
      },
      {
        text: 'The self alone can be known with certainty. The external world, including other minds, cannot be verified.',
        correct: false,
      },
      {
        text: 'Reality is fundamentally numerical and mathematical, accessible only to pure reason.',
        correct: false,
      },
      {
        text: 'Reality is will — a blind striving force of which perception is only a representation.',
        correct: false,
      },
    ],
    syntheses: [
      {
        text: "Kant's transcendental idealism: the structure of experience is mind-dependent (space, time, the categories), but something — the thing-in-itself — exists independently, even if it cannot be known directly.",
        correct: true,
      },
      {
        text: "Hume's bundle theory: the self is just a bundle of perceptions with no underlying substance — neither mental nor material substance truly exists.",
        correct: false,
      },
      {
        text: "Spinoza's neutral monism: mind and matter are two attributes of a single infinite substance, neither reducible to the other.",
        correct: false,
      },
      {
        text: 'Pragmatism: the mind/matter debate is meaningless unless it produces practical consequences. Truth is what works.',
        correct: false,
      },
    ],
  },
  {
    context: 'Utilitarianism → Kantian Deontology → Virtue Ethics',
    thesis:
      '"An action is right if and only if it produces the greatest happiness for the greatest number. Moral worth is determined entirely by consequences." — Bentham/Mill',
    antitheses: [
      {
        text: 'Consequences are morally irrelevant. What matters is whether an action conforms to universal duty. An act done for good outcomes but violating a rational principle has no moral worth.',
        correct: true,
      },
      {
        text: 'Morality is whatever a society collectively agrees upon. There are no universal moral truths, only social conventions.',
        correct: false,
      },
      {
        text: 'Moral claims are neither true nor false — they express only emotional attitudes. The question of right action is a pseudo-question.',
        correct: false,
      },
      {
        text: 'The right action is whatever God commands. Morality is grounded in divine authority, not reason or welfare.',
        correct: false,
      },
    ],
    syntheses: [
      {
        text: 'Virtue ethics: neither consequences nor rules are primary. What matters is character — the cultivation of practical wisdom (phronesis) that discerns what is genuinely called for in each situation.',
        correct: true,
      },
      {
        text: 'Contractualism: an action is wrong if its governing principle could not be justified to others on terms they could not reasonably reject.',
        correct: false,
      },
      {
        text: 'Moral particularism: no general principles apply universally — each situation must be evaluated entirely on its own morally relevant features.',
        correct: false,
      },
      {
        text: 'Moral realism: there are objective moral facts, discoverable empirically, that ground both duty and welfare.',
        correct: false,
      },
    ],
  },
  {
    context: "Heraclitus → Parmenides → Aristotle's Hylomorphism",
    thesis:
      '"Everything flows; nothing is fixed. The same river cannot be stepped in twice. Stability is appearance; flux is the underlying reality." — Heraclitus',
    antitheses: [
      {
        text: "Change is impossible. What is, is; what is not, cannot be. Being is one, eternal, motionless. All apparent change is illusion generated by unreliable sense perception.",
        correct: true,
      },
      {
        text: 'Nothing truly changes because time is circular. All events recur eternally in identical cycles — what appears as change is repetition.',
        correct: false,
      },
      {
        text: 'True reality is mathematical. Number and harmonic ratios constitute the stable structure beneath apparent flux.',
        correct: false,
      },
      {
        text: 'Atoms are the unchanging fundamental units. All apparent transformation is rearrangement, not genuine becoming.',
        correct: false,
      },
    ],
    syntheses: [
      {
        text: "Aristotle's hylomorphism: substances persist through change because form imposes stability on matter. Change is real but structured — potentiality actualising toward determinate ends. Neither pure flux nor pure stasis.",
        correct: true,
      },
      {
        text: "Plato's theory of Forms: the changing sensible world is mere appearance; the eternal, unchanging Forms are genuine reality.",
        correct: false,
      },
      {
        text: 'Stoic logos: flux is real, but the rational principle governing it is eternal and unchanging.',
        correct: false,
      },
      {
        text: "Whitehead's process philosophy: reality consists of events rather than substances. Events perish — genuine becoming without static substance.",
        correct: false,
      },
    ],
  },
]
