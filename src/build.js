import fs from 'fs';
import path from 'path';
import glob from 'glob';

import parseMarkdown from './parseMarkdown';

let inPath = path.join(__dirname, '..', 'tabs');
let outPath = path.join(__dirname, '..', 'output');

const getFileName = fullPath => path.basename(fullPath, path.extname(fullPath));


glob(`${inPath}/*.md`, function (er, files) {

    var tabs = files.map(filePath => {
        // output to a dedicated .html
        let tab = parseMarkdown(fs.readFileSync(filePath, 'utf8'), 'ukulele');
        tab.outFileName = `${getFileName(filePath)}-ukulele`;
        fs.writeFileSync(path.join(outPath, `${tab.outFileName}.html`), tab.html);
        return tab
    }).map(tab => {
        // line for index page
        return `<li><a href="./output/${tab.outFileName}.html">${tab.attributes.title} ${tab.attributes.author}</a></li>`;
    });

    // build the index
    let indexHtml = `
    <html>
    <meta charset="utf-8">
    <style>
        li {
            margin: 20px 0;
        }
    </style>
    <title>Juju ukulele tablatures</title>
    <h1>Some ukulele tablatures</h1>
    <h5>Open source at <a href="http://github.com/revolunet/ukulele-tabs">github.com/revolunet/ukulele-tabs</a></h5>
    ${tabs.join('\n\n')}
    </html>`;

    fs.writeFile(path.join(__dirname, '..', 'index.html'), indexHtml);

});

