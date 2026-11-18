const faq = {}

function SendToFAQ(section, ...qna) {
    // possible null
    if (!faq[section]) {
        faq[section] = []
    }

    // qna is a bundle of arrays or whatever, just iterate and parse it correctly
    for (let entry of qna) {
        faq[section].push({"q":entry[0], "a":entry[1]})
    }
}





















/*
HOW TO USE:

Call SendToFAQ and provide an array of qna responses for a given named section.

SendToFAQ('SECTION',
    [
    'QUESTION1',
    'ANSWER1'
    ],
    [
    'QUESTION2',
    'ANSWER2'
    ]
)

And the script will handle the rest for displaying the information properly on the page.

*/

// FAQ ----------------------------------------------------------------------

SendToFAQ('Content',
    [
        'How many campaigns?',
        '1. The Beacon. In the past there were 2, but it\'s just one now.'
    ],
    [
        'What are the Daemon regions in the mod?',
        'They are original concepts. Not tied to RWTW or the \"Daemon\" region in any way. The design choices of \"plain concrete with holes in it\" is inspired by a Starbound mod by the name of \"Vhos Avha\'las\" by "Aegonian"; Credit goes to them for the inspiration.'
    ],
    [
      'What is the gameplay loop?',
      'Die, restart, die. Hunter-coded torture nexus with hints of escapism here and there.'
    ],
    [
        'What is the ending?',
        '👀'
    ]
)

SendToFAQ('Development',
    [
      'Who are the lead developers of PB?',
      'The lead devs are "Lurvixen", "Ovidia", "Tronsx", and "Matvis". I "Lur" am considered a main organizer of PB.',
    ],
    [
        'Who is working on PB?',
        'A competent dev team. We don\'t have any official label (yet). We\'re a bunch of friends who like modding and everything involved with making games. Full credits for every developer on the project will be available when it is complete.'
    ],
    [
        'Has the dev team changed in the years PB has been in development?',
        'A lot. In the time of its development the project has become dependent on mutual leadership between friends. Originally it was a Co-lead project by me and "Millisec", who has since retired from modding. Now it\'s around 3-4 people with creative control besides me. We all share ideas, design, and progress for it and are very cooperative.'
    ],
    [
        'Who created PB?',
        'The original concept for a mod named "Pitch Black" with a slugcat called "The Beacon" and a nighttime world with a twist was by me, "Lurzard"/"Lurvixen".'
    ]
)

SendToFAQ('Timeline',
    [
        'When did PB start development?',
        '07 April 2023'
    ],
    [
        'When did the original Beta of PB release?',
        '15 September 2025. This is also referred to as "beta" era.'
    ],
    [
      'When was the original Beta of PB taken down?',
      '25 December 2025'
    ],
    [
        'When did playtesting start?',
        '16 January 2024'
    ],
    [
        'When was the rewrite of mod plans?',
        '08 February 2025. This is also referred to as "rewrite" era.'
    ],
    [
        'When is PB expected to release?',
        'IDK.'
    ],
)

SendToFAQ('Misc',
    [
        'Does this mod contain generative AI content?',
        'NO! NONE! NEVER WILL! FUCK THAT! FUUUUUUUUCK THAT! All of our art, code, music, every asset (by us) is made by real terminally online nerds that have an insane knack for attention to detail and making COOL. FREAKING. EPIC bullshit. with our BARE HANDS! Okay yay'
    ],
    [
        'Nighttime... in Rain World?',
        'I would love to go on and on about how by design maybe Rain World was never meant to be given a day-night cycle system. It is a flawed cosmology, it is vibesbased. Do not let that stop you from getting creative however. It didn\'t stop us.'
    ],
    [
        'Where is The Photomaniac?',
        'Our sweet chud son/daughter/thing is no longer with us, due to the vision for the mod going in a completely different direction than the original one with him in it. They simply did not survive that. But please don\'t forget her. The Beacon lives on in a new state for Pitch Black, while The Photomaniac will be revitalized.'
    ],
    [
        'Why only one campaign?',
        'Making a custom campaign is hard work, making 2 is more. Making 2 unique ways to play a unique world and story makes for a little shallow of an experience. We\'re not looking for the Survivor-Monk treatment for the story. We\'re aiming for a campaign to tell The Beacon\'s story in full and not really push further than that in terms of \"custom campaigns\". This is an extremely ambitious project.'
    ],
    [
        'PB feels like a fever dream... Is it?',
        'That\'s funny. I\'d call it more like a bad therapy session. This isn\'t really definitive of what PB\'s about though. It\'s more than the vibes on the surface.'
    ],
    [
        'Is PB Canon?',
        'I don\'t care what that means.'
    ],
    [
        'Can PB as a mod for Rain World be summarized?',
        'Hardly. But I can try to give a rundown. ' +
        'It is a collaborative project, which originally released as a beta, then recieved a massive rewrite. ' +
        'The mod adds The Beacon\'s campaign and all its contents: custom regions, custom mechanics, uniquely designed esoterics. It is a mod that questions and comments on what it means to play Rain World, to modify it, and cherish it. A blind playthrough without spoilers is preferred. ' +
        'The Beacon is a lost soul, trying to integrate with the world. It is an esoteric campaign about life and death, trial and error, and escapism. You are born into an unforgiving reality and must grapple with the cards you were dealt, or, you could throw out the deck and play a different game if you wanted. You will find yourself doomed since you start, but death is not the end, the end is never the end. Not for you. ' +
        'PB is different. It is Rain World as art, bringing a narrative experience to the table. Not bathed in void fluid, but dreams.'
    ],
    [
        'Is this FAQ done?',
        'Noup,, check for updates frequently!'
    ]
)

// END FAQ ------------------------------------------------------------------



















function createBookMark(name, level) {
    const header = document.createElement('h'+level)
    header.innerHTML = '<a href="#' + name + '">' + name + '</a>'
    document.getElementById('bookmarks').appendChild(header)

    if (level > 1) {
        return
    }
    const textSection = document.createElement('div')
    textSection.id = name
    const sectionHeader = document.createElement('h1')
    sectionHeader.innerHTML = name
    textSection.appendChild(sectionHeader)
    document.getElementById('text').appendChild(textSection)
}

function createFAQEntry(entry, question, answer) {
    const header = document.createElement('h2')
    header.id = question
    header.innerHTML = question
    document.getElementById(entry).appendChild(header)
    const text = document.createElement('p')
    text.innerHTML = answer
    document.getElementById(entry).appendChild(text)
}

for (let entry in faq) {

    createBookMark(entry, 1)

    for (let bundle of faq[entry]) {
        createFAQEntry(entry, bundle.q, bundle.a)
        createBookMark(bundle.q, 2)
    }
}