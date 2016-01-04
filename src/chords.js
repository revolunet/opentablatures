

const SIGNS = {
    finger: '●',
    open: '○',
    mute: 'x'
}

let CHORDS = {
    ukulele: require('./chords-ukulele'),
    guitar: require('./chords-guitar')
};

let TEMPLATES = {
    ukulele: `
x  x  x  x
╒══╤══╤══╕
|  |  |  |
├──┼──┼──┤
|  |  |  |
├──┼──┼──┤
|  |  |  |
├──┼──┼──┤
|  |  |  |
└──┴──┴──┘
G  C  A  E
`.trim(),

    guitar: `
x  x  x  x  x  x
╒══╤══╤══╤══╤══╕
|  |  |  |  |  |
├──┼──┼──┼──┼──┤
|  |  |  |  |  |
├──┼──┼──┼──┼──┤
|  |  |  |  |  |
├──┼──┼──┼──┼──┤
|  |  |  |  |  |
└──┴──┴──┴──┴──┘
E  A  D  G  B  E
`.trim()
}


function getChordByName(name, instrument='guitar') {
    return CHORDS[instrument].filter(chord => chord.key === name)[0];
}

const replaceCharAtIndex = (str, index, newValue) => str.substr(0, index) + newValue + str.substr(index + 1);

function getChordAscii(chordName, instrument='guitar') {
    let chord = getChordByName(chordName, instrument);
    let ascii = TEMPLATES[instrument];
    if (chord) {
        let fretOffset = (instrument === 'guitar') ? 34 : 22;
        //return chords.map(chord => {
        chord.positions.forEach((position, chordIndex) => {

            // open strings
            ascii = replaceCharAtIndex(ascii, chordIndex * 3, position === 0 ? SIGNS.open : ' ');

            if (position === 'x') {
                ascii = replaceCharAtIndex(ascii, chordIndex * 3, SIGNS.mute);
            } else if (position > 0) {
                ascii = replaceCharAtIndex(ascii, (position * fretOffset) + (chordIndex * 3), SIGNS.finger);
            }

        });
    }

    return ascii;
}

export default {
    get: getChordByName,
    getAscii: getChordAscii
};

