
const getTemplate = data => {

    let menuItems = data.menuItems.map(item => {
        return `<li class="menu-item-divided pure-menu-item">
            <a class="pure-menu-link" href="./output/${item.outFileName}.html">
            <strong>${item.attributes.author}</strong>
            <br/>
            <div class="">${item.attributes.title}</div>
            </a>
        </li>`;
    }).join('\n');

    let videoHtml = data.video && ' - <a target="_blank" href="' + data.video + '">video</a>' || '';

    var content = data.content || `
        <h2 class="content-subhead">Welcome :)</h2>
        <p>
            You can easily add a tablature by <a href="http://github.com/revolunet/opentablatures/blob/master/README.md">following the instructions</a>
        </p>`;


    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <base href="/"/>
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Raleway:200">
    <link rel="stylesheet" href="${data.css}">
    <title>Juju ukulele beginner tablatures</title>
    <body>

        <div id="layout">

            <!-- Menu toggle -->
            <a href="#menu" id="menuLink" class="menu-link">
                <!-- Hamburger icon -->
                <span></span>
            </a>

            <div id="menu">
                <div class="pure-menu">
                    <a class="pure-menu-heading" href="#">Ukulele tabs</a>
                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><a href="./index.html" class="pure-menu-link">Home</a></li>
                        ${menuItems}
                    </ul>

                    <div class="pure-menu-footer">
                        Github-based curated tablatures
                        <br><br>
                        <a href="http://github.com/revolunet/opentablatures">github.com/revolunet/opentablatures</a>
                    </div>
                </div>
            </div>

            <div id="main">

                <div class="header">
                    <h1>${data.title}</h1>
                    <h2>${data.subtitle}${videoHtml}</h2>
                </div>

                ${data.intro || ''}

                <div class="content">
                    ${content}
                </div>

            </div>
        </div>

    </body>
    <script src='${data.js}'></script>
</html>`
}


export default getTemplate;
