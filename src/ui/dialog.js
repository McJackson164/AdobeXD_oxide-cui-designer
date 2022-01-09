const application = require("application");
const fs = require("uxp").storage;
const { ExportSettings } = require("../models/exportSettings");

function createExportArtboardModal() {
    let dialog;

    const html = `
    <style>
        #exportDialog form {
            width: 360px;
        }
        .h1 {
            align-items: center;
            justify-content: space-between;
            display: flex;
            flex-direction: row;
        }
        .icon {
            border-radius: 4px;
            width: 24px;
            height: 24px;
            overflow: hidden;
        }
        #btnCancel {
            margin: 0 5px 0 0;
        }
        #exportArtboard {
            margin: 0 0 0 5px;
        }
        #selectedDirectory {
            width: 100%;
            border-radius: 15px;
            margin: 5px 0;
        }
        .input-wrapper {
            width: 100%;
        }
        .input-wrapper label {
            line-height: 32.5px;
        }
        #message {
            position: absolute;
            background-color: red;
            width: 100%;
            height: 25px;
            left: 0;
            bottom: 0;
            color: white;
            line-height: 25px;
            text-align: center;
            display: none;
        }
    </style>
    <form method="dialog">
        <h1 class="h1">
            <span>Export Artboard</span>
            <img class="icon" src="./assets/icon.png" />
        </h1>
        <hr />
        <p>Please select the output directory, the file name and further configuration is optional.</p>
        <label>
            <span>General:</span>
            <input type="text" id="fileName" placeholder="Filename..." />
            <span>Options:</span>
            <div class="input-wrapper">
                <input type="checkbox" id="copyToClipboard"/>
                <label for="copyToClipboard">Copy output to clipboard</label>
            </div>
            <div class="input-wrapper">
                <input type="checkbox" id="" disabled/>
                <label for="">[NYI]</label>
            </div>
            <div class="input-wrapper">
                <input type="checkbox" id="" disabled/>
                <label for="">[NYI]</label>
            </div>
        </label>
        <footer>
            <button uxp-variant="primary" id="btnCancel">Cancel</button>
            <button type="submit" uxp-variant="cta" id="exportArtboard">Export</button>
        </footer>
        <div id="message"></div>
    </form>
    `;

    dialog = document.createElement("dialog");
    dialog.id = "exportDialog";
    dialog.innerHTML = html;

    const operations = require("../operations");
    dialog.querySelector("#exportArtboard")?.addEventListener("click", (event) => {
        const fileName = dialog.querySelector("#fileName").value;
        if (!validateInputs(fileName)) {
            showMessage("Invalid filename!");
            event.preventDefault();
            return;
        }
        application.editDocument((selection, root) => {
            if (selection.items.length == 0) {
                showMessage("Please select an artboard!");
                event.preventDefault();
                return;
            };
            if (selection.focusedArtboard?.children) {
                fs.localFileSystem.getFolder().then(folder => {
                    const settings = new ExportSettings(folder, fileName);
                    if (!operations.exportArtboard(selection, settings)) {
                        showMessage("Error occured while converting!");
                        event.preventDefault();
                        return;
                    }
                });
            }
        });
    });

    /**
     * @param {String} text 
     */
    function showMessage(text) {
        const message = dialog.querySelector("#message");
        message.innerHTML = text;
        message.style.display = "block";
    }

    return dialog;
}

/**
 * @param {String} fileName 
 * @returns {boolean}
 */
function validateInputs(fileName) {
    // TODO: implement further
    return fileName.length > 0;
}

module.exports = {
    createExportArtboardModal
}