const scenegraph = require("scenegraph");

const { CUIImage } = require("./models/cuiImage");
const { CUIElement, CUIRootElement } = require("./models/CUIElements");
const { CUIInput } = require("./models/cuiInput");
const { CUIText } = require("./models/cuiText");
const { CUIPanel } = require("./models/cuiPanel");
const { CUIButton } = require("./models/cuiButton");
const { TextAlignment } = require("./models/textAlignment");

/**
 * @param {scenegraph.SceneNode} node
 * @param {String} parent
 * 
 * @returns {CUIElement|undefined}
 */
function build(node, parent) {
    // TODO: refactor
    const bounds = pixelToRelative(node);
    var xAnchorMin = bounds.x;
    var xAnchorMax = bounds.x + bounds.width;
    var yAnchorMax = 1 - bounds.y;
    var yAnchorMin = 1 - (bounds.y + bounds.height);
    if (node.pluginData && node.pluginData.type) {
        switch (node.pluginData.type) {
            case "panel":
                if (parent.length > 0) {
                    var parentBounds = pixelToRelative(node, node.parent);
                    xAnchorMin = parentBounds.x.toFixed(4);
                    xAnchorMax = (parentBounds.x + parentBounds.width).toFixed(4);
                    yAnchorMax = (1 - parentBounds.y).toFixed(4);
                    yAnchorMin = (1 - (parentBounds.y + parentBounds.height)).toFixed(4);
                    return new CUIPanel(node.guid, parent, node.children.at(0).fill, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax);
                }
                return new CUIRootElement(node.guid, node.children.at(0).fill, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax);
            case "input":
                var parentBounds = pixelToRelative(node, node.parent);
                xAnchorMin = parentBounds.x.toFixed(4);
                xAnchorMax = (parentBounds.x + parentBounds.width).toFixed(4);
                yAnchorMax = (1 - parentBounds.y).toFixed(4);
                yAnchorMin = (1 - (parentBounds.y + parentBounds.height)).toFixed(4);
                return new CUIInput(node.guid, parent, node.children.at(1).fill, node.children.at(1).text, node.children.at(1).fontSize, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, xdAlignment2RustAlignment(node.children.at(1).textAlign));
            case "image":
                break;
            case "text":
                var fontSize = Math.floor(node.children.at(0).fontSize * 0.66);
                var parentBounds = pixelToRelative(node, node.parent);
                xAnchorMin = parentBounds.x;
                xAnchorMax = parentBounds.x + parentBounds.width;
                yAnchorMax = 1 - parentBounds.y;
                yAnchorMin = 1 - (parentBounds.y + parentBounds.height);
                return new CUIText(node.guid, parent, node.children.at(0).fill, node.children.at(0).text, fontSize, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, xdAlignment2RustAlignment(node.children.at(0).textAlign));
            case "button":
                var parentBounds = pixelToRelative(node, node.parent);
                xAnchorMin = parentBounds.x;
                xAnchorMax = parentBounds.x + parentBounds.width;
                yAnchorMax = 1 - parentBounds.y;
                yAnchorMin = 1 - (parentBounds.y + parentBounds.height);
                return new CUIButton(node.guid, parent, node.children.at(0).fill, node.children.at(1).text, node.children.at(1).fontSize, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, xdAlignment2RustAlignment(node.children.at(1).textAlign));
            default:
                break;
        }
    }
    return undefined;
}

/**
 * @param {scenegraph.SceneNode} node
 * @param {scenegraph.SceneNode} parent
 * 
 * @returns {scenegraph.Bounds}
 */
function pixelToRelative(node, parent) {
    // TODO: use artboard dimensions to calculate the factor if parent is undefined
    const wFactor = parent != undefined ? 1 / parent.boundsInParent.width : 1 / 1920;
    const hFactor = parent != undefined ? 1 / parent.boundsInParent.height : 1 / 1080;
    return {
        x: wFactor * node.boundsInParent.x,
        y: hFactor * node.boundsInParent.y,
        width: wFactor * node.boundsInParent.width,
        height: hFactor * node.boundsInParent.height
    };
}

/**
 * @param {String} xdTextAlignment
 * 
 * @returns {String}
 */
function xdAlignment2RustAlignment(xdTextAlignment) {
    if (xdTextAlignment == scenegraph.Text.ALIGN_LEFT) return TextAlignment.LEFT;
    if (xdTextAlignment == scenegraph.Text.ALIGN_RIGHT) return TextAlignment.RIGHT;
    return TextAlignment.CENTER;
}

module.exports = {
    build
}