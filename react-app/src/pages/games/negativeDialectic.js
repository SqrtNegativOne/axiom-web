export const NEGATIVE_DIALECTIC = [
    {
        context: 'High Art → Folk Traditions → Mass Culture',
        thesis: 'High Art: Complex, challenging, and boundary-pushing, but structurally elitist and largely inaccessible to the working masses.',
        antithesisOptions: [
            { text: 'Folk Culture: Accessible, communal, and created by the people, but highly localized and lacking formal sophistication.', correct: true },
            { text: 'Academic Censorship: A top-down ban on all artistic expression to enforce strict rationalism.', correct: false },
            { text: 'Scientific Positivism: The belief that art should be replaced entirely by empirical science.', correct: false },
            { text: 'Aristocratic Patronage: The complete privatization of art by wealthy individuals.', correct: false }
        ],
        falseSynthesis: 'The advent of mass media and the Culture Industry has democratized art. By blending the sophistication of high culture with the mass accessibility of folk traditions, the system provides universal entertainment. The contradiction between the elite and the masses is resolved: culture is now freely available to all, satisfying the individual\'s need for leisure while harmoniously integrating them into modern society.',
        residualOptions: [
            { 
                text: 'The eradication of genuine spontaneity. The individual is not harmonized, but standardized; even acts of rebellion are pre-packaged commodities, leaving total conformity disguised as free choice.', 
                correct: true 
            },
            { 
                text: 'The masses are successfully elevated to the intellectual level of the former aristocracy, creating a unified society of philosopher-citizens.', 
                correct: false,
                explanation: 'This takes the system\'s idealistic promise at face value. The Culture Industry does not aim to educate or elevate; its economic function is to pacify and distract.'
            },
            { 
                text: 'High art retreats entirely into isolated academic institutions, abandoning the public sphere to pure, unmediated chaos.', 
                correct: false,
                explanation: 'High art does not successfully escape. The Culture Industry absorbs high art too—turning avant-garde works into luxury commodities and classical music into background noise for commercials.'
            },
            { 
                text: 'A complete, violent reversion to local folk traditions by the masses in direct protest of technological reproduction.', 
                correct: false,
                explanation: 'Genuine folk culture is largely eradicated by the Culture Industry, replaced instead by manufactured nostalgia and packaged "authenticity."'
            }
        ]
    },
    {
        context: 'Private Individuality → Public Community → The Networked Profile',
        thesis: 'Private Individuality: The deeply human desire to cultivate a unique, subjective inner life and personal autonomy.',
        antithesisOptions: [
            { text: 'Public Community: The fundamental human need for social belonging, external recognition, and integration into the collective.', correct: true },
            { text: 'State Surveillance: The government\'s need to monitor all private correspondence.', correct: false },
            { text: 'Religious Asceticism: The rejection of all social ties in favor of isolated monasticism.', correct: false },
            { text: 'Corporate Monopoly: The consolidation of all physical marketplaces into a single entity.', correct: false }
        ],
        falseSynthesis: 'The digital social profile perfectly resolves the ancient tension between private identity and public community. Through frictionless self-expression online, the individual becomes perfectly visible and connected to the universal network. We are now globally united in a digital town square, while remaining entirely, uniquely ourselves.',
        residualOptions: [
            { 
                text: 'The qualitative, incalculable depths of human experience. The supposedly "unique" individual is flattened into predictable, monetizable data points, while genuine connection is replaced by fragmented echo chambers.', 
                correct: true 
            },
            { 
                text: 'The complete dissolution of the physical world, as individuals upload their consciousness entirely into virtual reality environments.', 
                correct: false,
                explanation: 'This is a sci-fi exaggeration. The "residual" is the physical, material reality of our bodies and labor in the present that the digital world relies upon but ignores.'
            },
            { 
                text: 'A utopian global consensus where cultural misunderstandings are permanently eradicated by algorithmic translation.', 
                correct: false,
                explanation: 'This repeats the false promise of the Synthesis. In reality, algorithms optimize for engagement, which actively rewards and amplifies misunderstanding and outrage.'
            },
            { 
                text: 'The state seizes total control of all personal data, resulting in a conscious, top-down Orwellian dictatorship.', 
                correct: false,
                explanation: 'While surveillance exists, the primary mode of domination here is soft and decentralized. The system controls behavior through convenience, peer pressure, and market logic.'
            }
        ]
    },
    {
        context: 'Individual Freedom → Social Equality → The "End of History"',
        thesis: 'Individual Freedom: The drive for personal liberty, free enterprise, and the right to accumulate private property without restriction.',
        antithesisOptions: [
            { text: 'Social Equality: The demand for collective welfare, the eradication of class privilege, and the equitable distribution of resources.', correct: true },
            { text: 'Feudal Hierarchy: A rigid caste system based on divine right and inherited land.', correct: false },
            { text: 'Anarcho-Primitivism: The desire to dismantle all complex societal structures and return to hunter-gatherer lifestyles.', correct: false },
            { text: 'Technocratic Rule: The belief that society should be governed solely by engineers and scientists.', correct: false }
        ],
        falseSynthesis: 'Liberal democratic capitalism represents the final ideological evolution of humanity. It synthesizes the contradiction perfectly: free markets guarantee individual liberty and generate unprecedented wealth, while democratic institutions and human rights frameworks ensure that this prosperity eventually lifts all citizens, creating a just, equal, and post-historical global society.',
        residualOptions: [
            { 
                text: 'Systemic inequality and ecological limits. The synthesis masks the fact that its prosperity relies on outsourced exploitation and treats the planet as an infinite resource, leaving a massive, destructive remainder.', 
                correct: true 
            },
            { 
                text: 'A perfectly frictionless global market where all nation-states willingly dissolve themselves into a single world government.', 
                correct: false,
                explanation: 'This ignores the persistence of nationalism and state violence, which are often utilized to secure the very markets this synthesis relies upon.'
            },
            { 
                text: 'Everyone becomes a perfectly rational economic actor, permanently eradicating all irrational human desires and conflicts.', 
                correct: false,
                explanation: 'This is the utopian assumption of neoclassical economics, ignoring the irrational, emotional, and cultural realities that drive human behavior.'
            },
            { 
                text: 'Complete technological automation instantly frees all humans from labor, allowing everyone to live as aristocrats.', 
                correct: false,
                explanation: 'This ignores how automation under this synthesis often leads to precarious gig labor and wealth concentration rather than universal leisure.'
            }
        ]
    }
]
