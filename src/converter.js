const scenegraph = require("scenegraph");

const templates = require("./templates");
const validator = require("./validator");
const builder = require("./cuiBuilder");
const { CUIImage } = require("./models/cuiImage");
const { CUIElement, CUIRootElement } = require("./models/CUIElements");
const { CUIInput } = require("./models/cuiInput");
const { CUIText } = require("./models/cuiText");
const { CUIPanel } = require("./models/cuiPanel");
const { CUIButton } = require("./models/cuiButton");
const { ExportSettings } = require("./models/exportSettings");
const message = require("./ui/message");

/**
 * @type {String}
 */
var artboardGUID;

/**
 * @param {SceneNodeList} nodes
 * @param {ExportSettings} config
 * 
 * @returns {String|undefined}
 */
function convert(nodes, config) {
    if (!validator.validate(nodes)) {
        message.showError("Invalid artboard! Please check out the cookbook in the README!");
        return;
    }

    // TODO: check if null|undefined. Artboard is required!
    artboardGUID = nodes.at(0)?.parent?.guid;

    const buildList = recursiveConvert(nodes);

    const transpiledList = transpile(buildList);

    const assembledDocument = assemble(transpiledList);
    console.log(assembledDocument);
    return assembledDocument;
}

/**
 * @param {CUIElement[]} elements
 * 
 * @returns {String[]}
 */
function transpile(elements) {
    /**
     * @type {String[]}
     */
    const transpiled = [];
    elements.forEach(element => {
        if (element instanceof CUIButton) {
            transpiled.push("// Button");
            transpiled.push(templates.button(element));
        } else if (element instanceof CUIPanel) {
            transpiled.push("// Panel");
            transpiled.push(templates.panel(element));
        } else if (element instanceof CUIText) {
            transpiled.push("// Text");
            transpiled.push(templates.text(element));
        } else if (element instanceof CUIInput) {
            transpiled.push("// Input");
            transpiled.push(templates.input(element));
        } else if (element instanceof CUIRootElement) {
            transpiled.push("// Root");
            transpiled.push(templates.root(element));
        } else if (element instanceof CUIImage) {
            transpiled.push("// Image");
            transpiled.push(templates.image(element));
        } else {
            // NOTE: should not be reachable because of the validator and will most likely get removed.
            transpiled.push("// FALLBACK: Panel");
            transpiled.push(templates.panel(element));
        }
    });

    return transpiled;
}

/**
 * @param {String[]} transpiledList
 * 
 * @returns {String}
 */
function assemble(transpiledList) {
    var assembledString = "";
    transpiledList.forEach(e => assembledString += e + "\n");
    // TODO: implement further
    return assembledString;
}


/**
 * @param {SceneNodeList|undefined} nodes
 * 
 * @returns {CUIElement[]}
 */
function recursiveConvert(nodes) {
    /**
     * @type {CUIElement[]}
     */
    var result = []

    nodes?.forEach(node => {
        if (node.guid == artboardGUID) {
            return;
        }
        const parent = node.parent != null && node.parent.guid != artboardGUID ? node.parent.guid : "";

        const built = builder.build(node, parent);
        if (built) {
            result.push(built);
        }
        if (node.children.length > 0)
            result = result.concat(recursiveConvert(node.children));
    });
    return result;
}

module.exports = {
    convert
}