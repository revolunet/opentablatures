import fs from 'fs';
import path from 'path';
import glob from 'glob';
import parseMarkdown from './parseMarkdown';

let inPath = path.join(__dirname, '..', 'tabs');
let outPath = path.join(__dirname, '..', 'output');

const getFileName = fullPath => path.basename(fullPath, path.extname(fullPath));

import getTemplate from './template';


glob(`${inPath}/*.md`, function (er, files) {

    let instrument = 'ukulele';

    let tabs = files.map(filePath => {
        let tab = parseMarkdown(fs.readFileSync(filePath, 'utf8'), instrument);
        return Object.assign({}, tab, {
            outFileName: `${getFileName(filePath)}-${instrument}`,
        });
    });

    tabs.forEach(tab => {

        // create the html page for this tab

        let chords = `<div class="chords">${tab.chords.map(chord => {
            return `<div class="chord chord--${instrument}">
                        <div class="chord__title">${chord.chord}</div>
                        <pre class="chord__tab">${chord.ascii}</pre>
                    </div>`;
        }).join('\n')}</div>`;

        let data = {
            menuItems: tabs,
            title: tab.attributes.title,
            subtitle: tab.attributes.author,
            video: tab.attributes.video,
            css: '../style.css',
            js: '../ui.js',
            intro: chords,
            content: `<pre class='lyrics'>${ tab.body }</pre>`
        }

        let tabHtml = getTemplate(data);

        fs.writeFileSync(path.join(outPath, `${tab.outFileName}.html`), tabHtml);

        return tab
    });


    // build the index page
    
    let data = {
        menuItems: tabs,
        css: './style.css',
        js: './ui.js',
        title: 'Ukulele tabs',
        subtitle: 'Github-based curated tablatures'
    }

    let indexHtml = getTemplate(data);

    fs.writeFile(path.join(__dirname, '..', 'index.html'), indexHtml);

});

