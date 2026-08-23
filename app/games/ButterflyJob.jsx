"use client";
import { useEffect, useMemo, useState } from 'react'
const SCENARIOS = [
    {
        yr: 1907,
        loc: 'Stumpergasse 31, Vienna, Austria-Hungary',
        role: 'You are a laundress who collects and returns washing for the pension residents.',
        ctx: "One of your regular customers — a young man the other tenants call Adi — is in a state this morning. He has an art portfolio submission today at the Academy on Schillerplatz. His leather portfolio case got soaked three days ago while he was painting outdoors in the rain. You've been drying it in your back room. It's mostly dry now but still stiff along the hinges.",
        q: "He's at the door early, looking anxious. Do you hand over the case?",
        ch: [
            {
                t: `"Here you are — it'll do fine."`,
                s: 'He needs it this morning',
                ct: 'The rejection',
                chain: [
                    'He takes the case and goes straight to the examination hall on Schillerplatz.',
                    'The committee reviews his portfolio. His architectural sketches are noted as capable. His figure studies are considered too stiff. The vote is three against, two in favour.',
                    'He receives the rejection letter that evening at his lodgings. He reads it twice and sets it down on the table.',
                    "Over the following years he drifts between men's shelters, reads political pamphlets, attends open-air rallies. He discovers he can hold a crowd still when he speaks.",
                    'By 1919 he has found his vocation. It is not painting.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
            {
                t: `"Come back this afternoon — another hour and it'll be properly dry."`,
                s: "You don't want to ruin his drawings",
                ct: 'The admission',
                chain: [
                    'Frustrated, he spends the morning in his room practising figure drawings — he has nothing else to do while he waits.',
                    "He comes back for the case at two o'clock. The submission deadline has passed.",
                    'He reapplies the following year, October 1908, with noticeably improved figure work.',
                    'A different examining committee is convened. A professor who was absent in 1907 casts the deciding vote in favour.',
                    'He studies fine art. He moves to Munich in 1913 and works as a commercial illustrator. He enlists in 1914 like millions of others. He survives the war and returns to his drawings.',
                    'In 1919, a small political party in a Munich beer hall is looking for someone with a gift for speaking to crowds. They find someone else.',
                ],
                dv: 82,
                tg: 'Massively divergent',
                tc: 'hi',
            },
        ],
    },
    {
        yr: 1914,
        loc: "Schiller's Delicatessen, Franz Josef Street, Sarajevo, Bosnia",
        role: 'You are a customer picking up a Sunday morning order.',
        ctx: "It's just after ten in the morning and the shop is busy. A young man in a dark jacket has been standing in the doorway for the past quarter-hour, half inside and half outside, nursing what appears to be cold coffee. He's blocking the entrance — you have to squeeze past him to leave. An open motorcade passed this street about an hour ago heading for the town hall. You heard some commotion further down the route earlier, but it passed.",
        q: "You're trying to get out with your arms full. Do you ask him to step aside?",
        ch: [
            {
                t: '"Excuse me — could you move a little?"',
                s: 'You need to get past',
                ct: 'The missed shot',
                chain: [
                    'He shuffles apologetically a few steps down the street.',
                    "He is now standing in front of the butcher's next door — not the delicatessen doorway.",
                    'Eleven minutes later, an open motorcar comes back down Franz Josef Street. The motorcade took a wrong turn; the driver has stalled the engine trying to reverse.',
                    'The car stops about twenty feet from where the young man now stands. The crowd is thick. He cannot reach it.',
                    'The driver corrects the car and it moves on. The Archduke continues toward the hospital.',
                    'The assassination attempt — the second of the morning — does not happen. The alliance system does not activate this summer.',
                    'The war may come by other means; the pressures that built it are still there. But not today, and not from this doorway.',
                ],
                dv: 72,
                tg: 'Heavily divergent',
                tc: 'hi',
            },
            {
                t: 'You squeeze around him without saying anything.',
                s: 'Not worth the bother',
                ct: 'The wrong turn',
                chain: [
                    "He stays exactly where he is, in the doorway of Schiller's.",
                    "Eleven minutes later, the Archduke's motorcade returns down Franz Josef Street after taking the wrong turn.",
                    'The lead driver, confused by new instructions shouted from behind, stalls the engine directly in front of the delicatessen.',
                    "The young man is less than two metres from the open car. He has been waiting since before nine o'clock.",
                    'He steps forward. Two shots are fired.',
                    'The alliance system begins to move. By August, every major power in Europe is at war.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
        ],
    },
    {
        yr: 1928,
        loc: "St Mary's Hospital, Praed Street, Paddington, London",
        role: 'You are a junior lab assistant in the mycology department on the ground floor.',
        ctx: "August, and the building is mostly empty — your supervisor, Dr La Touche, and the bacteriologist upstairs — everyone calls him Alec — are both on holiday for the month. The stairwell door connecting your floor to the shared corridor has been propped open all summer; your supervisor never closes it. Today there is a sharp smell coming off Praed Street and you've been meaning to do something about it. Your lab's open mould cultures are sitting out on the bench as usual.",
        q: 'Do you close the stairwell door?',
        ch: [
            {
                t: 'Close it — the smell is unbearable today.',
                s: 'Takes two seconds',
                ct: 'The sealed stairwell',
                chain: [
                    "The door closes. The mould cultures on La Touche's bench continue releasing spores, as they have all summer.",
                    'The spores have nowhere to go. They settle on the ground floor.',
                    "Upstairs, the bacteriologist's uncovered petri dishes — left on his bench before his holiday — remain uncontaminated.",
                    'When Alec returns from holiday in early September, he finds his cultures exactly as he left them. Unremarkable. He cleans up and starts a new series.',
                    'The observation is never made. The discovery waits for someone else, somewhere else, to be lucky enough and curious enough at the same moment.',
                ],
                dv: 63,
                tg: 'Significantly divergent',
                tc: 'hi',
            },
            {
                t: 'Leave it — not really your floor, not really your door.',
                s: 'You have enough to do',
                ct: 'The open door',
                chain: [
                    "The stairwell stays open throughout August. Spores from La Touche's mould cultures drift upward through the shared corridor.",
                    "One settles on an uncovered petri dish on Alec's bench, two floors up. The cool August temperatures allow it to grow before the bacteria do.",
                    'When Alec returns to the lab in September, one dish has a clear ring of dead bacteria around the mould colony.',
                    `"That's funny," he says to his assistant, and does not throw the dish away.`,
                    'He identifies the mould as a Penicillium species. He publishes his findings the following spring. His paper is largely ignored for a decade.',
                    'In 1939, two researchers at Oxford read the paper and decide it deserves a second look.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
        ],
    },
    {
        yr: 1933,
        loc: 'Southampton Row, Bloomsbury, London',
        role: 'You run a newspaper pitch outside the hotel most mornings.',
        ctx: "Tuesday, September 12th. A dull, grey morning, a trace of last night's rain on the pavement. A compact, irritable-looking man — Hungarian, you'd say from his accent — comes through the hotel's revolving doors just after nine, heading somewhere with the air of a person who has no particular destination. He asks if you have The Times. You've got one copy left on the cart, held back for a regular who hasn't shown up yet.",
        q: 'Do you sell him the last copy?',
        ch: [
            {
                t: '"Here you go — tuppence."',
                s: 'The regular will find one elsewhere',
                ct: 'The red light at Russell Square',
                chain: [
                    'He takes the paper and walks north along Southampton Row, reading as he goes.',
                    "He stops under a streetlamp to finish a column near the front. Lord Rutherford, in a speech at the British Association, has dismissed the idea of extracting practical energy from atoms as 'moonshine'.",
                    'He crumples the front page. He finds this deeply irritating.',
                    'He crosses Montague Place still muttering. At the corner of Southampton Row and Russell Square, the light is red.',
                    'He stands there stewing, and his mind wanders into the physics of it. What if a single neutron could dislodge two more from a nucleus? What if those two dislodged four more? What if the mass were large enough?',
                    'The light changes. He steps off the kerb.',
                    'He files for a British patent the following March and has it classified secret. Six years later, two groups at Columbia University confirm the chain reaction experimentally.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
            {
                t: '"Sorry — that one\'s spoken for. Try the newsagent on Holborn."',
                s: 'You point up the street',
                ct: 'A pleasant walk',
                chain: [
                    'He shrugs and walks off without a paper, taking a back route through the Bloomsbury squares.',
                    "He thinks about a refrigerator problem he's been stuck on. It's a dull morning but not unpleasant.",
                    "He gets coffee at a Lyons corner house on High Holborn and reads a discarded copy of yesterday's Evening Standard. Nothing in it particularly interests him.",
                    'He returns to the hotel before noon, orders a large lunch, and reads. The spark does not come.',
                    'The insight arrives eventually — in a different city, five months later, prompted by a different article.',
                    'The patent application is filed in the spring of 1934. The delay is small, but the theoretical groundwork for the project in Chicago in December 1942 has a different shape.',
                ],
                dv: 30,
                tg: 'Somewhat divergent',
                tc: 'lo',
            },
        ],
    },
    {
        yr: 1955,
        loc: 'Court Square, Montgomery, Alabama',
        role: 'You sell evening papers from a pitch near the Empire Theatre bus stop.',
        ctx: "Thursday, December 1st, coming on six o'clock. You know most of the regulars on this corner. Rosa, who works as a seamstress at the department store up the street, usually picks up a paper on her way to the bus. She's walking toward the stop right now. You happen to know — because she mentioned it once, two or three years ago — that she made herself a promise never to ride a bus driven by a particular driver after an incident in 1943. You can read the route sign from here. It's his bus.",
        q: 'Do you call out to her?',
        ch: [
            {
                t: `"Rosa — that's the 2857, isn't it? Blake's bus."`,
                s: "She'd want to know",
                ct: 'The next bus',
                chain: [
                    'She stops. She looks at the route number. She recognises it.',
                    'She stays on the kerb. The next bus on the route arrives four minutes later. She boards and rides home without incident.',
                    'She has dinner. She goes to bed early.',
                    'The NAACP has been waiting nine months for the right test case. They continue waiting.',
                    'The case they eventually bring is in different circumstances, with thinner press coverage and a less unified community response.',
                    'A boycott begins, but later, and with less momentum. The 26-year-old minister at Dexter Avenue Baptist Church waits another year to be asked to lead anything.',
                ],
                dv: 38,
                tg: 'Notably divergent',
                tc: 'lo',
            },
            {
                t: 'You keep your eyes on your stack of papers.',
                s: 'Not really your business',
                ct: 'The arrest',
                chain: [
                    'She boards without noticing the route number.',
                    'She takes the first available seat in the coloured section, first row.',
                    'The bus fills. At the third stop the driver walks back. He addresses the row.',
                    'Three passengers stand. She does not.',
                    '"You may do that," she replies when he says he will have her arrested.',
                    'Two police officers arrive at 6:06 in the evening.',
                    'By the following morning, 52,000 leaflets are being passed hand to hand across the city.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
        ],
    },
    {
        yr: 1962,
        loc: 'Soviet submarine B-59, North Atlantic, 90 metres',
        role: "You are a machinist's mate. The boat has been submerged for four days.",
        ctx: "October 27th. American destroyers have been depth-charging you for eleven hours. The air conditioning compressors failed yesterday — a bearing seized. The temperature inside the boat is above 45 degrees. The CO₂ is climbing. Men are making errors. An hour ago you found the replacement bearing in the aft spares locker. You could have the compressor running again in four hours — but the chief engineer said to wait for his authorisation, and he's been inside the officers' briefing since morning with the Flotilla Commander and the captain.",
        q: 'Do you start the repair without orders?',
        ch: [
            {
                t: "You start the repair. The crew can't function like this much longer.",
                s: 'Ask forgiveness, not permission',
                ct: 'The clear air',
                chain: [
                    'Four hours later, the first compressor kicks on. Cold air begins moving through the forward section.',
                    "In the officers' mess, the Flotilla Commander — a heavy, deliberate man who has barely spoken in two days — straightens up from the chart table and asks for tea.",
                    'When the captain calls a meeting to discuss the torpedo authorisation, the Flotilla Commander sits across from him and speaks for four minutes. His reasoning is clear and unhurried.',
                    'He will not countersign. The launch requires all three senior officers. Without his signature, the procedure cannot proceed.',
                    'At 20:11, the submarine surfaces. Signal flags are raised. An American destroyer acknowledges from 500 metres.',
                    'The crisis passes. No one on the surface ever learns how close it came.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
            {
                t: "You wait. You don't want trouble for going around the chain of command.",
                s: 'The chief engineer said to wait',
                ct: 'The launch',
                chain: [
                    'The temperature continues to climb. By late afternoon, most of the crew are operating at a significantly impaired capacity.',
                    "At 16:59, in the officers' mess, the captain calls for a final vote on the torpedo authorisation. The political officer has already signed.",
                    'The Flotilla Commander starts to object. He has been awake for forty hours in 45-degree heat. He loses the thread halfway through his argument. He asks the captain to repeat something. The captain does not repeat it.',
                    'The pen is placed in front of the Flotilla Commander.',
                    'He looks at it for a long time.',
                    'He picks it up.',
                    'The torpedo is in the water at 17:04.',
                ],
                dv: 100,
                tg: 'Catastrophic',
                tc: 'hi',
            },
        ],
    },
    {
        yr: 1979,
        loc: 'Xerox PARC, Coyote Hill Road, Palo Alto, California',
        role: 'You are a security guard on duty in the second-floor corridor.',
        ctx: "A delegation from a computer company in Cupertino has been touring the facility. Their leader — a young man in his mid-twenties with dark, unblinking eyes who hasn't stopped asking questions — has broken off from the group. You've found him standing in the open doorway of Demo Room C, watching a researcher walk through a live session on the Alto workstation: the mouse, the graphical windows, the text editing. He is not supposed to be in this wing.",
        q: 'Do you redirect him back to the tour group?',
        ch: [
            {
                t: '"Sir, I need to ask you to come with me."',
                s: 'You steer him back toward the lobby',
                ct: 'The partial glimpse',
                chain: [
                    "He's seen roughly twenty seconds of the demonstration through the open doorway — the screen, but not the mouse interaction.",
                    "On the flight home he keeps asking his chief designer what he thought they'd seen. The designer is non-committal.",
                    'The machine that ships from Cupertino in 1983 is close to the right idea, but something is not quite understood. The interface feels approximated rather than inhabited.',
                    'A different company — which had a longer and more detailed demonstration of the same workstation — ships a cleaner implementation six months earlier.',
                    'The personal computer revolution still arrives. It comes from a slightly different direction, with a different face on it.',
                ],
                dv: 44,
                tg: 'Significantly divergent',
                tc: 'hi',
            },
            {
                t: "You look the other way. It's nearly end of shift.",
                s: 'He seems harmless enough',
                ct: 'The eleven minutes',
                chain: [
                    'He stays in the doorway for eleven minutes while the researcher walks through the full session.',
                    'He sees the mouse move a cursor across the screen. He sees pull-down menus appear and disappear. He sees text edited live. He sees windows opened side by side.',
                    `He keeps saying, quietly: "Why aren't you doing anything with this?"`,
                    'In the car on the way back to Cupertino he is almost incoherent. His colleagues have rarely seen him like this.',
                    'The machine that ships from Cupertino four years later is built around one idea: that the computer should work the way thinking already works.',
                    'It changes what personal computers look like for the next four decades.',
                ],
                dv: 0,
                tg: 'History intact',
                tc: 'ok',
            },
        ],
    },
]

const VERDICTS = [
    {
        max: 25,
        v: 'Faithful Keeper',
        d: "You changed almost nothing. History proceeded as recorded — the same wars, the same breakthroughs, the same figures on the stamps and the statues. Whether that's wisdom, caution, or just chance is difficult to say from the outside.",
    },
    {
        max: 90,
        v: 'Quiet Meddler',
        d: 'You loosened a few threads, but the weave held. Most of what was going to happen still happened. The changes you introduced are small enough that their effects are still radiating outward — no one in that timeline yet knows anything is different.',
    },
    {
        max: 200,
        v: 'Unintended Architect',
        d: "Several load-bearing events have been displaced. The century you've left behind is recognisable but not identical — different technologies, different turning points, a different set of people remembered. Whether the substitution is an improvement is not obvious from where you're standing.",
    },
    {
        max: 310,
        v: 'Committed Revisionist',
        d: "You made significant interventions. At least one thing that was going to happen no longer will. At least one thing that didn't happen now may. The downstream effects are still unfolding. You hope you understood what you were doing.",
    },
    {
        max: 9999,
        v: 'Full Unravelling',
        d: "The timeline you entered no longer exists in any recognisable form. What you've left behind is structurally different from the world you came from. There is no way to verify whether the substitution is better. There is no way to go back and check.",
    },
]

const styles = `
:root {
  --bg: #0c0c09;
  --surface: #141410;
  --surface2: #1c1c17;
  --border: #262620;
  --border2: #32322a;
  --text: #e0dbc8;
  --text2: #8a8574;
  --text3: #504e42;
  --gold: #c49535;
  --gold-dim: #6b5018;
  --gold-bg: #191408;
  --red: #8a2525;
  --red-bg: #170a0a;
  --red-text: #c07070;
  --green: #3a6840;
  --green-bg: #0a150c;
  --green-text: #70b07a;
  --amber-text: #d4a850;
  --ff-serif: 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif;
  --ff-mono: 'Courier New', Courier, monospace;
  --ff-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --r: 8px;
  --rl: 14px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.butterfly-shell {
  background: var(--bg);
  color: var(--text);
  font-family: var(--ff-serif);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.25rem 4rem;
  line-height: 1.7;
  background-image: radial-gradient(ellipse 900px 600px at 50% -100px, rgba(140,100,20,0.07) 0%, transparent 70%);
}

.butterfly-game { max-width: 680px; width: 100%; }
.intro { padding: 3rem 0 2rem; }
.intro-eyebrow { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.2em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 1.25rem; }
.intro-title { font-size: clamp(32px, 6vw, 48px); font-weight: normal; color: var(--text); letter-spacing: -0.01em; line-height: 1.1; margin-bottom: 0.75rem; }
.intro-title em { font-style: italic; color: var(--gold); }
.intro-rule { width: 48px; height: 1px; background: var(--gold-dim); margin: 1.5rem 0; }
.intro-body { font-size: 15px; color: var(--text2); line-height: 1.9; max-width: 520px; margin-bottom: 2.5rem; }
.intro-body p + p { margin-top: 1.1rem; }
.intro-body strong { color: var(--text); font-weight: normal; font-style: italic; }
.start-btn { background: transparent; border: 1px solid var(--gold-dim); border-radius: var(--r); padding: 11px 32px; font-family: var(--ff-serif); font-size: 15px; color: var(--gold); cursor: pointer; letter-spacing: 0.04em; transition: background 0.18s, border-color 0.18s, color 0.18s; }
.start-btn:hover { background: var(--gold-bg); border-color: var(--gold); color: var(--amber-text); }
.progress { display: flex; align-items: center; gap: 5px; margin-bottom: 2.75rem; }
.pdot { width: 7px; height: 7px; border-radius: 50%; background: var(--border2); flex-shrink: 0; transition: background 0.4s; }
.pdot.done { background: var(--gold-dim); }
.pdot.now { background: var(--gold); box-shadow: 0 0 0 3px rgba(196,149,53,0.18); }
.pline { flex: 1; height: 1px; background: var(--border); }
.pcnt { font-family: var(--ff-mono); font-size: 10px; color: var(--text3); margin-left: 6px; white-space: nowrap; }
.yr-badge { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--gold); background: var(--gold-bg); border: 1px solid var(--gold-dim); padding: 3px 10px; border-radius: var(--r); display: inline-block; margin-bottom: 5px; }
.loc { font-family: var(--ff-sans); font-size: 11px; color: var(--text3); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2rem; }
.role-label { font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.14em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 5px; }
.role-text { font-size: 16px; color: var(--text); line-height: 1.55; margin-bottom: 1.25rem; }
.ctx-block { font-size: 15px; color: var(--text2); line-height: 1.85; border-left: 2px solid var(--gold-dim); padding-left: 1.25rem; margin-bottom: 1.5rem; }
.question { font-size: 16px; font-style: italic; color: var(--text); margin-bottom: 1.5rem; line-height: 1.6; }
.choices { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 0.5rem; }
.ch { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--rl); padding: 1rem 1.25rem; cursor: pointer; text-align: left; color: var(--text); font-family: var(--ff-serif); transition: border-color 0.15s, background 0.15s, transform 0.1s; width: 100%; }
.ch:not(:disabled):hover { border-color: var(--gold-dim); background: var(--gold-bg); transform: translateY(-2px); }
.ch:active:not(:disabled) { transform: translateY(0); }
.ch:disabled { cursor: default; transform: none; }
.ch-t { font-size: 14px; font-weight: normal; font-style: italic; color: var(--text); margin-bottom: 4px; line-height: 1.4; }
.ch-s { font-family: var(--ff-sans); font-size: 12px; color: var(--text3); }
.ch.chosen { border-color: var(--gold); background: var(--gold-bg); }
.ch.chosen .ch-t { color: var(--amber-text); }
.con-box { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--rl); padding: 1.5rem; margin-bottom: 1.25rem; }
.con-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); }
.con-title { font-size: 18px; font-style: italic; color: var(--text); line-height: 1.3; }
.tag { font-family: var(--ff-sans); font-size: 10px; padding: 3px 8px; border-radius: var(--r); font-weight: 600; white-space: nowrap; flex-shrink: 0; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; }
.tag-ok { background: var(--green-bg); color: var(--green-text); border: 1px solid var(--green); }
.tag-lo { background: var(--gold-bg); color: var(--amber-text); border: 1px solid var(--gold-dim); }
.tag-hi { background: var(--red-bg); color: var(--red-text); border: 1px solid var(--red); }
.chain { margin-bottom: 1.25rem; }
.chain-step { display: flex; gap: 10px; align-items: baseline; padding: 0.55rem 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text2); line-height: 1.7; }
.chain-step:last-child { border-bottom: none; color: var(--text); font-style: italic; }
.chain-arrow { font-family: var(--ff-mono); font-size: 11px; color: var(--gold-dim); flex-shrink: 0; margin-top: 0.15rem; }
.dbar-wrap { padding-top: 1.25rem; border-top: 1px solid var(--border); }
.dbar-label { font-family: var(--ff-sans); font-size: 11px; color: var(--text3); display: flex; justify-content: space-between; margin-bottom: 6px; }
.dbar-track { height: 3px; background: var(--border2); border-radius: 2px; overflow: hidden; }
.dbar-fill { height: 100%; border-radius: 2px; width: 0%; transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes bfFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
.con-box { animation: bfFadeUp 0.35s ease both; }
.chain-step:nth-child(1) { animation: bfFadeUp 0.28s 0.05s ease both; }
.chain-step:nth-child(2) { animation: bfFadeUp 0.28s 0.13s ease both; }
.chain-step:nth-child(3) { animation: bfFadeUp 0.28s 0.21s ease both; }
.chain-step:nth-child(4) { animation: bfFadeUp 0.28s 0.29s ease both; }
.chain-step:nth-child(5) { animation: bfFadeUp 0.28s 0.37s ease both; }
.chain-step:nth-child(6) { animation: bfFadeUp 0.28s 0.45s ease both; }
.chain-step:nth-child(7) { animation: bfFadeUp 0.28s 0.53s ease both; }
.next-btn { width: 100%; background: transparent; border: 1px solid var(--border2); border-radius: var(--r); padding: 11px; font-family: var(--ff-serif); font-size: 14px; font-style: italic; color: var(--text3); cursor: pointer; transition: border-color 0.15s, color 0.15s, background 0.15s; }
.next-btn:hover { border-color: var(--gold-dim); color: var(--text2); background: var(--surface2); }
.end-page { padding: 2.5rem 0; }
.end-eyebrow { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.2em; color: var(--text3); text-transform: uppercase; margin-bottom: 0.75rem; }
.end-title { font-size: 28px; font-weight: normal; color: var(--text); margin-bottom: 0.4rem; }
.end-sub { font-family: var(--ff-sans); font-size: 12px; color: var(--text3); font-style: italic; margin-bottom: 2.5rem; }
.end-card { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--rl); padding: 1.75rem; margin-bottom: 1.5rem; }
.end-verdict { font-size: 22px; font-style: italic; color: var(--gold); margin-bottom: 1rem; }
.end-desc { font-size: 15px; color: var(--text2); line-height: 1.85; margin-bottom: 1.75rem; padding-bottom: 1.75rem; border-bottom: 1px solid var(--border); }
.log-row { display: grid; grid-template-columns: 44px 1fr auto; gap: 10px; align-items: baseline; padding: 0.6rem 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.log-row:last-child { border-bottom: none; }
.log-yr { font-family: var(--ff-mono); font-size: 10px; color: var(--gold-dim); }
.log-ch { color: var(--text2); font-style: italic; line-height: 1.4; }
.log-dv { font-family: var(--ff-mono); font-size: 10px; white-space: nowrap; flex-shrink: 0; }
.dv-ok { color: var(--green-text); }
.dv-lo { color: var(--amber-text); }
.dv-hi { color: var(--red-text); }
.replay-btn { background: transparent; border: 1px solid var(--gold-dim); border-radius: var(--r); padding: 11px 28px; font-family: var(--ff-serif); font-size: 14px; color: var(--gold); cursor: pointer; transition: background 0.18s; }
.replay-btn:hover { background: var(--gold-bg); }
@media (max-width: 480px) {
  .choices { grid-template-columns: 1fr; }
  .log-row { grid-template-columns: 40px 1fr; }
  .log-dv { display: none; }
}
`

export default function GameButterflyJob() {
    const [screen, setScreen] = useState('intro')
    const [cur, setCur] = useState(0)
    const [total, setTotal] = useState(0)
    const [phase, setPhase] = useState('decide')
    const [picked, setPicked] = useState(null)
    const [log, setLog] = useState([])
    const [barWidth, setBarWidth] = useState(0)

    const scenario = SCENARIOS[cur]
    const pickedChoice = picked === null ? null : scenario.ch[picked]

    useEffect(() => {
        if (phase !== 'consequence' || !pickedChoice) return
        setTimeout(() => setBarWidth(0), 0)
        const f1 = requestAnimationFrame(() => {
            requestAnimationFrame(() => setBarWidth(pickedChoice.dv))
        })
        return () => cancelAnimationFrame(f1)
    }, [phase, pickedChoice])

    const verdict = useMemo(
        () =>
            VERDICTS.find((x) => total <= x.max) ??
            VERDICTS[VERDICTS.length - 1],
        [total],
    )

    function startGame() {
        setScreen('game')
        setCur(0)
        setTotal(0)
        setPhase('decide')
        setPicked(null)
        setLog([])
    }

    function choose(idx) {
        if (phase !== 'decide') return
        const choice = scenario.ch[idx]
        setPicked(idx)
        setTotal((v) => v + choice.dv)
        setLog((arr) => [
            ...arr,
            { yr: scenario.yr, choice: choice.t, dv: choice.dv },
        ])
        setPhase('consequence')
    }

    function advance() {
        if (cur >= SCENARIOS.length - 1) {
            setScreen('end')
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        setCur((v) => v + 1)
        setPhase('decide')
        setPicked(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function replay() {
        setScreen('intro')
        setCur(0)
        setTotal(0)
        setPhase('decide')
        setPicked(null)
        setLog([])
        setBarWidth(0)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const barColor =
        pickedChoice?.dv === 0
            ? '#3a6840'
            : pickedChoice?.dv >= 80
              ? '#8a2525'
              : '#6b5018'

    return (
        <>
            <style>{styles}</style>
            <div className="butterfly-shell">
                <div className="butterfly-game">
                    {screen === 'intro' && (
                        <div className="intro">
                            <div className="intro-eyebrow">1907 — 1979</div>
                            <h1 className="intro-title">
                                The <em>Butterfly</em> Job
                            </h1>
                            <div className="intro-rule" />
                            <div className="intro-body">
                                <p>
                                    You have been dropped into seven moments
                                    across the twentieth century. Each time, you
                                    are a minor figure — a laundress, a
                                    newspaper seller, a guard on a corridor. You
                                    are not the subject of the history.
                                </p>
                                <p>
                                    You will make a small decision. The kind
                                    that barely registers at the time. You will
                                    not know, until after you&apos;ve made it,{' '}
                                    <strong>what was riding on it.</strong>
                                </p>
                                <p>
                                    Seven decisions. Some will leave the
                                    timeline as you found it. Some won&apos;t.
                                    At the end, a report.
                                </p>
                            </div>
                            <button className="start-btn" onClick={startGame}>
                                Begin — 1907
                            </button>
                        </div>
                    )}

                    {screen === 'game' && (
                        <>
                            <div className="progress">
                                {SCENARIOS.map((_, i) => (
                                    <div
                                        key={i}
                                        style={{ display: 'contents' }}
                                    >
                                        {i > 0 && <div className="pline" />}
                                        <div
                                            className={`pdot ${i < cur ? 'done' : i === cur ? 'now' : ''}`}
                                        />
                                    </div>
                                ))}
                                <div className="pline" />
                                <span className="pcnt">
                                    {cur + 1} / {SCENARIOS.length}
                                </span>
                            </div>

                            <div className="yr-badge">{scenario.yr}</div>
                            <div className="loc">{scenario.loc}</div>

                            {phase === 'decide' && (
                                <>
                                    <div className="role-label">Your role</div>
                                    <div className="role-text">
                                        {scenario.role}
                                    </div>
                                    <div className="ctx-block">
                                        {scenario.ctx}
                                    </div>
                                    <p className="question">{scenario.q}</p>
                                    <div className="choices">
                                        {scenario.ch.map((c, i) => (
                                            <button
                                                className="ch"
                                                onClick={() => choose(i)}
                                                key={i}
                                            >
                                                <div className="ch-t">
                                                    {c.t}
                                                </div>
                                                <div className="ch-s">
                                                    {c.s}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            {phase === 'consequence' && pickedChoice && (
                                <>
                                    <div
                                        className="choices"
                                        style={{ marginBottom: '1.25rem' }}
                                    >
                                        {scenario.ch.map((c, i) => (
                                            <button
                                                key={i}
                                                className={`ch ${picked === i ? 'chosen' : ''}`}
                                                disabled
                                            >
                                                <div className="ch-t">
                                                    {c.t}
                                                </div>
                                                <div className="ch-s">
                                                    {c.s}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="con-box">
                                        <div className="con-top">
                                            <div className="con-title">
                                                {pickedChoice.ct}
                                            </div>
                                            <span
                                                className={`tag tag-${pickedChoice.tc}`}
                                            >
                                                {pickedChoice.tg}
                                            </span>
                                        </div>
                                        <div className="chain">
                                            {pickedChoice.chain.map(
                                                (step, i) => (
                                                    <div
                                                        className="chain-step"
                                                        key={i}
                                                    >
                                                        <span className="chain-arrow">
                                                            ▸
                                                        </span>
                                                        <span>{step}</span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        <div className="dbar-wrap">
                                            <div className="dbar-label">
                                                <span>
                                                    Divergence from recorded
                                                    history
                                                </span>
                                                <span>{pickedChoice.dv}%</span>
                                            </div>
                                            <div className="dbar-track">
                                                <div
                                                    className="dbar-fill"
                                                    style={{
                                                        background: barColor,
                                                        width: `${barWidth}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="next-btn"
                                        onClick={advance}
                                    >
                                        {cur < SCENARIOS.length - 1
                                            ? 'Continue through time →'
                                            : 'See the final report →'}
                                    </button>
                                </>
                            )}
                        </>
                    )}

                    {screen === 'end' && (
                        <div className="end-page">
                            <div className="end-eyebrow">Timeline Report</div>
                            <h2 className="end-title">{verdict.v}</h2>
                            <p className="end-sub">
                                Total divergence: {total} points across{' '}
                                {SCENARIOS.length} decisions
                            </p>
                            <div className="end-card">
                                <div className="end-verdict">{verdict.v}</div>
                                <div className="end-desc">{verdict.d}</div>
                                <div>
                                    {log.map((entry, i) => {
                                        const dvClass =
                                            entry.dv === 0
                                                ? 'dv-ok'
                                                : entry.dv >= 70
                                                  ? 'dv-hi'
                                                  : 'dv-lo'
                                        const dvLabel =
                                            entry.dv === 0
                                                ? 'intact'
                                                : `+${entry.dv}%`
                                        return (
                                            <div className="log-row" key={i}>
                                                <span className="log-yr">
                                                    {entry.yr}
                                                </span>
                                                <span className="log-ch">
                                                    {entry.choice}
                                                </span>
                                                <span
                                                    className={`log-dv ${dvClass}`}
                                                >
                                                    {dvLabel}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button className="replay-btn" onClick={replay}>
                                Travel again ↺
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


