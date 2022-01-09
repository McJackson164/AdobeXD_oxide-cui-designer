const { CUIChildElement } = require("./CUIElements");

const scenegraph = require("scenegraph");

class CUIPanel extends CUIChildElement {
    /**
     * @param {String} name
     * @param {String} parent
     * @param {scenegraph.Color} color
     * @param {Number} xAnchorMin
     * @param {Number} xAnchorMax
     * @param {Number} yAnchorMin
     * @param {Number} yAnchorMax
     * @param {Boolean} cursor
     * @param {Number} fade
     */
    constructor(name, parent, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, cursor = false, fade = 1.0) {
        super(name, parent, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, cursor, fade);

    }
}

module.exports = {
    CUIPanel
}