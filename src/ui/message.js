const MessageType = Object.freeze({
    INFO: "Info",
    WARNING: "Warning",
    ERROR: "Error"
});

/**
 * 
 * @param {String} message 
 * @param {String} type 
 */
function getMessageModal(message, type = MessageType.INFO) {
    let messageModal;
    const html = `
    <style>
        #messageModal form {
            width: 560px;
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
    </style>
    <form method="dialog">
        <h1 class="h1">
            <span id="header">Export Artboard</span>
            <img class="icon" src="./assets/icon.png" />
        </h1>
        <hr />
        <p id="messageText"></p>
        <footer>
            <button type="submit" uxp-variant="cta">Dismiss</button>
        </footer>
    </form>
    `;
    
    messageModal = document.createElement("dialog");
    messageModal.id = "messageModal";
    messageModal.innerHTML = html;
    messageModal.querySelector("#header").innerHTML = type;
    messageModal.querySelector("#messageText").innerHTML = message;
    
    return messageModal;
}

/**
 * @param {String} text 
 */
function showInfo(text) {
    const modal = getMessageModal(text);
    document.appendChild(modal);
    modal.showModal();
}

/**
 * @param {String} text 
 */
function showWarning(text) {
    const modal = getMessageModal(text, MessageType.WARNING);
    document.appendChild(modal);
    modal.showModal();
}

/**
 * @param {String} text 
 */
function showError(text) {
    const modal = getMessageModal(text, MessageType.ERROR);
    document.appendChild(modal);
    modal.showModal();
}

module.exports = {
    showInfo,
    showWarning,
    showError
}