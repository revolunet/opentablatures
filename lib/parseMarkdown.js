import fs from 'fs';
import fm from 'front-matter';

import chords from './chords';


export default function parseMarkdown(text, instrument='guitar') {

    let content = fm(text);

    let parsedChords = content.attributes && content.attributes.chords && content.attributes.chords.split(' ') || [];
    parsedChords.sort();
    parsedChords = parsedChords.map(chord => ({
        chord: chord,
        ascii: chords.getAscii(chord, instrument)
    }));

    return {
        chords: parsedChords,
        body: content.body,
        attributes: content.attributes
    };

}
