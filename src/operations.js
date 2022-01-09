const application = require("application");
const fs = require("uxp").storage;
const scenegraph = require("scenegraph");
const commands = require("commands");

const converter = require("./converter");
const dialog = require("./ui/dialog");
const { ExportSettings } = require("./models/exportSettings");


function createOverlay() {
    application.editDocument(async (selection, root) => {
        const artboard = new scenegraph.Artboard();
        artboard.resize(1920, 1080);
        artboard.name = "New Overlay";
        artboard.fill = new scenegraph.Color("#ffffffff");

        let imageFile = await fs.localFileSystem.getFileForOpening({ types: fs.fileTypes.images, allowMultiple: false });

        const background = new scenegraph.Rectangle();
        background.name = "Background";
        background.resize(1920, 1080);
        background.fill = new scenegraph.ImageFill(imageFile);
        background.locked = true;

        root.addChild(artboard);
        artboard.addChild(background);
    });
}

function createPanel() {
    application.editDocument((selection, root) => {
        if (selection.items.length === 0) {
            return;
        }
        const group = createGroup(selection, "Panel Group");
        group.pluginData = {
            type: "panel"
        };

        const panel = new scenegraph.Rectangle();
        panel.name = "Panel";
        panel.resize(1920 / 2, 1080 / 2);
        panel.fill = new scenegraph.Color("#000000", 0.8);
        group.addChild(panel);
    });
}

// TODO: implement
async function createImage() {
    let imageFile = await fs.localFileSystem.getFileForOpening({ types: fs.fileTypes.images });
}

function createInput() {
    application.editDocument((selection, root) => {
        const group = createGroup(selection, "Input Group");
        group.pluginData = {
            type: "input"
        };

        const input = new scenegraph.Rectangle();
        input.name = "Input";
        input.resize(150, 50);
        group.addChild(input);

        const text = new scenegraph.Text();
        text.text = "Input..."
        text.fill = new scenegraph.Color("#ffffff");
        text.fontSize = 24;
        text.textAlign = scenegraph.Text.ALIGN_LEFT;
        text.placeInParentCoordinates(text.localCenterPoint, input.localCenterPoint);
        group.addChild(text);
    });
}

function createText() {
    application.editDocument((selection, root) => {
        const group = createGroup(selection, "Text Group");
        group.pluginData = {
            type: "text"
        };

        const text = new scenegraph.Text();
        text.text = "Lorem Ipsum"
        text.fill = new scenegraph.Color("#ffffff");
        text.resize(150, 30);
        text.fontSize = 24;
        text.placeInParentCoordinates(text.localCenterPoint, root.localCenterPoint);
        group.addChild(text);
    });
}

function createButton() {
    application.editDocument((selection, root) => {
        const group = createGroup(selection, "Button Group");
        group.pluginData = {
            type: "button"
        };

        const button = new scenegraph.Rectangle();
        button.name = "Button";
        button.resize(150, 50);
        button.fill = new scenegraph.Color("#000000", 0.8);
        group.addChild(button);

        const text = new scenegraph.Text();
        text.text = "Button"
        text.fill = new scenegraph.Color("#ffffff");
        text.textAlign = scenegraph.Text.ALIGN_CENTER;
        text.resize(150, 50);
        text.fontSize = 24;
        text.placeInParentCoordinates(text.localCenterPoint, button.localCenterPoint);
        group.addChild(text);
    });
}

/**
 * @param {XDSelection} selection
 * @param {String} groupName
 * @returns {scenegraph.SceneNode}
 */
function createGroup(selection, groupName) {
    const initialSelection = selection.items[0];
    const tempNode = new scenegraph.Rectangle();
    initialSelection.addChild(tempNode);
    selection.items = [tempNode];
    commands.group();
    const group = selection.items[0];
    group.children.at(0)?.removeFromParent();
    group.name = groupName;
    group.removeFromParent();
    initialSelection.addChild(group);
    return group;
}

function showExportArtboardModal() {
    const _dialog = dialog.createExportArtboardModal();
    document.appendChild(_dialog);
    _dialog.showModal();
}

/**
 * @param {XDSelection} selection 
 * @param {ExportSettings} exportSettings 
 * @returns {boolean}
 */
function exportArtboard(selection, exportSettings) {
    const result = converter.convert(selection.focusedArtboard?.children, exportSettings);
    if (!result) {
        return false;
    }
    exportSettings.directory.createFile(exportSettings.fileName + ".cs", { overwrite: true }).then((file) => {
        file.write(result);
    });
    return true;
}

module.exports = {
    createOverlay,
    createPanel,
    createImage,
    createInput,
    createText,
    createButton,
    createGroup,
    showExportArtboardModal,
    exportArtboard
}