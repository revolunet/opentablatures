import fs from 'fs';
import fm from 'front-matter';

import chords from './chords';


export default function renderTab(path, instrument='guitar') {

    var data = fs.readFileSync(path, 'utf8');

    var content = fm(data);

    var asciiChords = content.attributes.chords.split(' ').map(chord => `<pre class="chord chord--${instrument}"><div class="chord__title">${ chord }</div>${ chords.getAscii(chord, instrument) }</pre>`).join('\n\n');

    var html = `
<meta charset="UTF-8">
<style>
pre.chord {
    width: 120px;
    text-align: center;
    display: inline-block;
    font-size:12px;
}
pre.chord--guitar {
    width: 150px;
}
pre.chord .chord__title {
    font-size:20px;
    font-weight:bold;
}
pre.lyrics {
    font-family: verdana;
    font-size: 12px;
}
</style>
<title>${ content.attributes.title }</title>
<h1>${ content.attributes.title }</h1>
<h3>${ content.attributes.author }</h3>
${ asciiChords }
<pre class='lyrics'>
${ content.body }
</pre>`;

    return html;

}
