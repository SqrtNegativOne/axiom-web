export const FALLACY = [
  {
    argument:
      "Every time I've opened up emotionally to a friend, I've ended up feeling worse — they got uncomfortable, didn't know what to say, or shared what I'd told them. Being vulnerable with people only makes things harder.",
    answer: 'Hasty generalisation',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "A handful of painful experiences feels definitive from the inside — especially when they hurt. But a conclusion about all people drawn from a few cases is exactly what a hasty generalisation is. The sample is small and emotionally loaded, which makes it feel more solid than it is. The pattern may be real; the universal conclusion isn't warranted.",
  },
  {
    argument:
      "The nutritionist advising on this company's wellness programme has visibly gained weight over the past year. I don't think we should be taking her recommendations seriously.",
    answer: 'Ad hominem (abusive)',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "This feels like reasonable scepticism — if someone can't follow their own advice, why should you? But the validity of nutritional science doesn't depend on the practitioner's body. A cardiologist with high blood pressure can still give accurate advice about reducing cholesterol. Attacking the person's circumstances instead of the content of their argument is ad hominem, however intuitively compelling the attack feels.",
  },
  {
    argument:
      "You either get into a top university or you end up stuck in a mediocre career for the rest of your life. I can't afford to let my kid just drift.",
    answer: 'False dilemma',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "The fear feels completely rational — it looks like a binary fork in the road. But the space between 'top university' and 'mediocre career' contains most of the territory of human working life. The false dilemma works by erasing the middle: vocational routes, late bloomers, second degrees, careers that don't require university at all. Reducing a vast possibility space to two options forces a conclusion that the evidence doesn't support.",
  },
  {
    argument:
      "If I skip the gym just this once, I know what happens. It becomes twice, then a standing excuse, then a former habit — and six months from now I'll have completely abandoned my health.",
    answer: 'Slippery slope',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "This reasoning is seductive precisely because it's sometimes true — habits do erode. But the argument asserts a necessary causal chain where each step automatically triggers the next, without evidence that the slide is inevitable. Missing one workout needn't become missing all of them. The fallacy is treating a possible outcome as a certain one, and using that certainty to foreclose the initial, modest choice.",
  },
  {
    argument:
      "You've been telling me to cut down on screen time for months. But you're on your phone constantly — at dinner, before bed, first thing in the morning. Why should I take that advice from you?",
    answer: 'Tu quoque',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Whether the advice is good depends on the advice, not on whether the person giving it follows it. A doctor who smokes can still correctly advise you not to. Tu quoque deflects the argument onto the person without ever engaging whether the claim itself is true.",
  },
  {
    argument:
      "A Nobel laureate in physics recently stated publicly that the health risks of mobile phone radiation are being dramatically underplayed. He's won the most prestigious scientific prize in existence. His views on this deserve serious consideration.",
    answer: 'Appeal to authority',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Expertise is domain-specific. A Nobel Prize in physics is an extraordinary credential in physics; it confers no particular authority on epidemiology or biomedical research. The appeal to authority fallacy doesn't mean experts are wrong — it means that prestige in one field doesn't settle questions in a different one. The scientific consensus on phone radiation comes from researchers who specialise in exactly that question.",
  },
  {
    argument:
      "The senator proposed a 5% reduction in the defence budget to redirect funding to veterans' mental health. Her opponents responded: 'She wants to gut our military and leave the country defenceless against its enemies.'",
    answer: 'Straw man',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "A 5% reallocation and 'gutting the military' are not the same position. The opponents replaced her specific, modest proposal with an exaggerated, indefensible version — easier to attack, impossible to defend. The straw man works by misrepresentation: argue against a position your opponent doesn't hold, win that argument, and imply you've defeated the real one.",
  },
  {
    argument:
      "I'm an excellent judge of character — I've never been seriously deceived by someone I trusted. And the reason I've never been deceived is that I read people very accurately.",
    answer: 'Circular reasoning',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "The conclusion and the premise are the same claim in different words: 'I'm a good judge because I'm accurate; I'm accurate because I'm a good judge.' No independent evidence is offered for either. Circular reasoning often feels like confident self-knowledge from the inside — but it uses the conclusion to justify itself. It's also worth noting that people who believe they've never been deceived may simply not have discovered it yet.",
  },
  {
    argument:
      "The school's mission statement says it promotes 'critical thinking' and encourages students to 'question received wisdom.' Surely that means we should feel free to challenge whatever our teachers say — including exam requirements.",
    answer: 'Equivocation',
    family: 'Informal',
    cls: 'Ambiguity',
    explanation:
      "'Critical thinking' in an educational context means evaluating ideas and arguments — not rejecting institutional authority. The argument exploits the word's elasticity: it slides from 'thinking critically about ideas' to 'not having to do what you're told.' Equivocation is hardest to spot when both meanings are perfectly reasonable in isolation — only the shift between them is the error.",
  },
  {
    argument:
      "I told him how I was really feeling for the first time — that I was struggling and needed more support. Two days later, he became distant and stopped initiating contact. Being honest about my emotions clearly pushed him away.",
    answer: 'Post hoc ergo propter hoc',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "Temporal sequence is not causation, but it feels exactly like it when you're the one who opened up and got hurt. His withdrawal could reflect his own stress, something unrelated happening in his life, or simple coincidence. The post hoc fallacy is especially painful in personal contexts because the alternative — that vulnerability didn't cause the outcome — offers no comfort and is harder to see from the inside.",
  },
  {
    argument:
      "We've been running annual performance reviews the same way for thirty years. If it were failing people, the organisation would have changed it long ago.",
    answer: 'Appeal to tradition',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Longevity is not evidence of optimality. Practices survive for many reasons — inertia, sunk cost, nobody being empowered to change them — that have nothing to do with their effectiveness. The argument makes persistence do the work that evidence should do. Plenty of things have been done the same way for decades while quietly failing the people they're meant to serve.",
  },
  {
    argument:
      "Millions of people have tried intermittent fasting and say it transformed their health. Are you seriously suggesting all of them are wrong? That many people can't be mistaken about something they've personally experienced.",
    answer: 'Appeal to popularity',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "The scale of popular belief is irrelevant to whether the belief is correct. Millions of people once held false beliefs about the solar system and disease. Personal testimony about felt effects is also notoriously unreliable — it doesn't control for placebo, expectation, coincidental timing, or confirmation bias. Something being widely believed and personally felt convincing is not the same as having been tested.",
  },
  {
    argument:
      "That meta-analysis claiming moderate alcohol consumption is cardioprotective? It was funded by the drinks industry. You can't trust conclusions from researchers with a financial stake in the outcome.",
    answer: 'Genetic fallacy',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Funding bias is a real concern in science, and scepticism about industry-funded research is healthy. But the genetic fallacy is dismissing a claim based on its source rather than evaluating its actual content. The data and methodology of a study must be scrutinised on their own terms. If the research is flawed, that should be demonstrable from the study itself — not assumed from who commissioned it.",
  },
  {
    argument:
      "When I said real fans never boo their own team, someone pointed out that dozens of supporters booed loudly after last week's match. My reply: those people aren't real fans. A genuine supporter backs the club unconditionally.",
    answer: 'No true Scotsman',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "The original claim — 'real fans don't boo' — is falsified by the counterexample. Rather than revising the claim, the speaker redefines 'real fan' to exclude anyone who boos, making the claim unfalsifiable by construction. This is the pattern: a universal claim encounters a counterexample; the response is to redefine the category so the counterexample no longer counts. The goalposts have moved, but the speaker acts as though they haven't.",
  },
  {
    argument:
      "I only buy supplements made from natural plant extracts — nothing synthetic, nothing cooked up in a chemical plant. I'd rather put something the earth made into my body.",
    answer: 'Appeal to nature',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Natural and safe are not synonyms. Arsenic, hemlock, and ricin are entirely natural; aspirin and penicillin are synthetic. The natural origin of a substance tells you nothing about its safety, efficacy, or bioavailability. The appeal to nature gains its force from a conflation: 'natural' sounds like 'wholesome' and 'gentle,' but these are associations, not properties that follow from natural origin.",
  },
  {
    argument:
      "If my partner were cheating on me, they'd be secretive about their phone. Lately they've been taking calls in another room and turning the screen away. So they must be cheating.",
    answer: 'Affirming the consequent',
    family: 'Formal',
    cls: 'Formal',
    explanation:
      "The argument form is: if P then Q; Q is true; therefore P. But phone secrecy (Q) can have many causes besides cheating (P) — a surprise being planned, a personal conversation they want privacy for, a new habit. The conditional only runs one way: cheating implies secrecy, but secrecy doesn't imply cheating. From the inside, it feels like detective work; structurally, it's a logical error.",
  },
  {
    argument:
      "Doctors say that regular exercise improves cardiovascular health. My father can't exercise — he has severe arthritis. So there's really no way to improve his heart health.",
    answer: 'Denying the antecedent',
    family: 'Formal',
    cls: 'Formal',
    explanation:
      "The argument form is: if P then Q; P is false; therefore Q is false. But the absence of one sufficient condition (exercise) doesn't eliminate the outcome (heart health improvement), because other routes exist — dietary changes, medication, stress reduction, weight management. The conditional tells you that exercise is one way to improve heart health, not the only way. Denying the antecedent treats a sufficient condition as a necessary one.",
  },
  // Multi-fallacy arguments — more than one error at work; the dominant fallacy is the answer
  {
    argument:
      "If we don't take a hard line on minor drug offences, we're effectively saying drug use is acceptable. And once we signal that, it normalises experimentation, which leads to harder drugs, which leads to addiction — and within a decade we'll have a generation too impaired to function.",
    answer: 'Slippery slope',
    family: 'Informal',
    cls: 'Presumption',
    explanation:
      "Two fallacies work together here. The opening is a false dilemma: 'not cracking down' is treated as equivalent to 'endorsing drug use,' erasing a wide middle ground of harm reduction, decriminalisation, and regulated tolerance. Built on that is a slippery slope: normalisation → experimentation → harder drugs → societal collapse, each step asserted as a necessary consequence without a causal mechanism. Evidence from harm-reduction jurisdictions consistently fails to produce the predicted slide.",
  },
  {
    argument:
      "Arranged marriages have been practised for thousands of years across dozens of cultures — billions of people can't be entirely wrong about this. There must be something genuinely right about a system that has persisted that long and that widely.",
    answer: 'Appeal to tradition',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Two fallacies reinforce each other. The first is appeal to tradition: longevity is taken as evidence of value, when practices persist through inertia, power structures, and lack of alternatives as readily as through merit. The second is appeal to popularity: the sheer number of people who have lived under the system is treated as a collective endorsement. Neither the age of a practice nor its prevalence tells us whether it is good — only its actual effects on the people it governs does.",
  },
  {
    argument:
      "My colleague is arguing we should cut mandatory overtime. She clearly doesn't care whether we hit our targets — and that kind of attitude is exactly why people who think like her tend to end up in middling careers.",
    answer: 'Straw man',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Two fallacies work together. First, a straw man: arguing to reduce overtime is recast as 'not caring about targets,' erasing the possibility that she thinks the team can meet targets without excessive hours — or that overwork actually reduces output. Second, an ad hominem: her presumed career trajectory is introduced to discredit the position rather than engage it. Real arguments rarely commit exactly one error; they typically bundle a misrepresentation of the position with an attack on the person making it.",
  },
  {
    argument:
      "This research on the benefits of mindfulness was led by a scientist who left mainstream academia to run a wellness retreat. Given that financial stake — combined with the fact that he clearly abandoned rigorous science — I wouldn't trust any of his conclusions.",
    answer: 'Genetic fallacy',
    family: 'Informal',
    cls: 'Relevance',
    explanation:
      "Two separate attacks on the source are layered here. The first is a genetic fallacy: the researcher's financial interest is used to dismiss the findings rather than evaluate the methodology, sample size, or replication record. The second is an ad hominem: his career change is taken as evidence of intellectual decline. Neither move engages the actual data. Funding conflicts are worth disclosing and examining — but they don't automatically invalidate results that can be scrutinised on their own terms.",
  },
]

export const FALLACY_OPTS = [
  { name: 'Ad hominem (abusive)', family: 'Informal', cls: 'Relevance', definition: 'Attacking the person making the argument rather than the argument itself.' },
  { name: 'Tu quoque', family: 'Informal', cls: 'Relevance', definition: 'Deflecting criticism by pointing out that the accuser does the same thing.' },
  { name: 'Appeal to authority', family: 'Informal', cls: 'Relevance', definition: 'Treating an expert\'s opinion as conclusive proof outside their domain of expertise.' },
  { name: 'Straw man', family: 'Informal', cls: 'Relevance', definition: 'Misrepresenting an opponent\'s argument into a weaker version, then refuting that instead.' },
  { name: 'Appeal to tradition', family: 'Informal', cls: 'Relevance', definition: 'Arguing something is right or good simply because it has always been done that way.' },
  { name: 'Appeal to popularity', family: 'Informal', cls: 'Relevance', definition: 'Claiming something is true or good because many people believe or do it.' },
  { name: 'Genetic fallacy', family: 'Informal', cls: 'Relevance', definition: 'Judging a claim based on its origin or source rather than its own merits.' },
  { name: 'Appeal to nature', family: 'Informal', cls: 'Relevance', definition: 'Arguing that something is good or right because it is natural, or bad because it is unnatural.' },
  { name: 'False dilemma', family: 'Informal', cls: 'Presumption', definition: 'Presenting only two options as if they are the only possibilities when others exist.' },
  { name: 'Slippery slope', family: 'Informal', cls: 'Presumption', definition: 'Claiming one event will inevitably trigger a chain of extreme consequences without justification.' },
  { name: 'Hasty generalisation', family: 'Informal', cls: 'Presumption', definition: 'Drawing a broad conclusion from an unrepresentative or insufficient sample.' },
  { name: 'Circular reasoning', family: 'Informal', cls: 'Presumption', definition: 'Using the conclusion as a hidden premise to support itself.' },
  { name: 'No true Scotsman', family: 'Informal', cls: 'Presumption', definition: 'Dismissing counterexamples by arbitrarily redefining the category to exclude them.' },
  { name: 'Post hoc ergo propter hoc', family: 'Informal', cls: 'Presumption', definition: 'Assuming that because B followed A, A must have caused B.' },
  { name: 'Equivocation', family: 'Informal', cls: 'Ambiguity', definition: 'Exploiting a word\'s multiple meanings to shift between senses mid-argument.' },
  { name: 'Affirming the consequent', family: 'Formal', cls: 'Formal', definition: 'Inferring the antecedent from the consequent: "If P then Q; Q; therefore P."' },
  { name: 'Denying the antecedent', family: 'Formal', cls: 'Formal', definition: 'Inferring the negation of the consequent from the negation of the antecedent: "If P then Q; not P; therefore not Q."' },
]
