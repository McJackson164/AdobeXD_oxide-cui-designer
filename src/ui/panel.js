const operations = require("../operations");

/**
 * @type {HTMLElement} panel
 */
let panel;

function create() {
    const html = `
    <style>
        p {
            font-weight: bold;
        }

        section {
            margin: 0 auto 20px;
            border: 1.5px solid #BBBBBB;
            padding: 5px;
            border-radius: 5px;
            background-color: #DDDDDD;
            width: 100%;
        }

        button {
            display: block;
            width: 100%;
            margin: 0 auto 2px;
        }

        #exportSection {
            position: absolute;
            bottom: 50px;
        }
    </style>

    <section id="generalSection">
        <p>General:</p>
        <button uxp-variant="action" id="btnCreateOverlay">New Overlay</button>
    </section>

    <section id="createSection">
        <p>Create:</p>
        <button uxp-variant="action" id="btnCreatePanel">Create Panel</button>
        <button uxp-variant="action" id="btnCreateImage">Create Image</button>
        <button uxp-variant="action" id="btnCreateInput">Create Input</button>
        <button uxp-variant="action" id="btnCreateText">Create Text</button>
        <button uxp-variant="action" id="btnCreateButton">Create Button</button>
    </section>

    <section id="exportSection">
        <p>Export</p>
        <button uxp-variant="cta" id="btnExport">Export</button>
    </section>
    `;

    panel = document.createElement("div");
    panel.innerHTML = html;
    panel.querySelector("#btnCreateOverlay")?.addEventListener("click", operations.createOverlay);
    panel.querySelector("#btnCreatePanel")?.addEventListener("click", operations.createPanel);
    panel.querySelector("#btnCreateImage")?.addEventListener("click", operations.createImage);
    panel.querySelector("#btnCreateInput")?.addEventListener("click", operations.createInput);
    panel.querySelector("#btnCreateText")?.addEventListener("click", operations.createText);
    panel.querySelector("#btnCreateButton")?.addEventListener("click", operations.createButton);

    panel.querySelector("#btnExport")?.addEventListener("click", operations.showExportArtboardModal);

    return panel;
}

/**
 * @param {*} event
 */
function show(event) {
    if (!panel) event.node.appendChild(create());
}

module.exports = {
    show
}