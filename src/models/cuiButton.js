const { CUITextElement } = require("./cuiElements");

const scenegraph = require("scenegraph");
const { TextAlignment } = require("./textAlignment");

class CUIButton extends CUITextElement {
    /**
     * @param {String} name
     * @param {String} parent
     * @param {scenegraph.Color} color
     * @param {String} text
     * @param {Number} fontSize
     * @param {Number} xAnchorMin
     * @param {Number} xAnchorMax
     * @param {Number} yAnchorMin
     * @param {Number} yAnchorMax
     * @param {String} command
     * @param {scenegraph.Color} textColor;
     * @param {Boolean} cursor
     * @param {Number} fade
     */
    constructor(name, parent, color, text, fontSize, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, textAlignment = TextAlignment.CENTER, command = "", textColor = new scenegraph.Color({ r: 200, g: 200, b: 200 }), cursor = false, fade = 1.0) {
        super(name, parent, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, text, textAlignment, fontSize, cursor, fade);
        this.command = command;
        this.textColor = textColor;
    }
}

module.exports = {
    CUIButton
}