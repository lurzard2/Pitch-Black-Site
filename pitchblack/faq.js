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
        'PB feels like a fever dream, is it?',
        'That\'s funny. I\'d call it more like a bad therapy session. This isn\'t really definitive of what PB\'s about though. It\'s more than the vibes on the surface.'
    ],
    [
        'Is PB Canon?',
        'I don\'t care what that means.'
    ],
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