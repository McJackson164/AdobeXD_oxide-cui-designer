const scenegraph = require("scenegraph");
const { TextAlignment } = require("./textAlignment");

class CUIElement {
    /**
     * @param {String} name
     * @param {scenegraph.Color} color
     * @param {Number} xAnchorMin
     * @param {Number} xAnchorMax
     * @param {Number} yAnchorMin
     * @param {Number} yAnchorMax
     * @param {Boolean} cursor
     * @param {Number} fade
     */
    constructor(name, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, cursor = false, fade = 1.0) {
        this.name = name;
        this.color = color;
        this.xAnchorMin = xAnchorMin;
        this.xAnchorMax = xAnchorMax;
        this.yAnchorMin = yAnchorMin;
        this.yAnchorMax = yAnchorMax;
        this.cursor = cursor;
        this.fade = fade;
    }
}

class CUIRootElement extends CUIElement {

}

class CUIChildElement extends CUIElement {
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
        super(name, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, cursor, fade);

        this.parent = parent;
    }
}

class CUITextElement extends CUIChildElement {
    /**
     * @param {String} name
     * @param {String} parent
     * @param {scenegraph.Color} color
     * @param {Number} xAnchorMin
     * @param {Number} xAnchorMax
     * @param {Number} yAnchorMin
     * @param {Number} yAnchorMax
     * @param {String} text
     * @param {String} textAlignment
     * @param {Boolean} cursor
     * @param {Number} fade
     */
    constructor(name, parent, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, text, textAlignment = TextAlignment.CENTER, fontSize = 18, cursor = false, fade = 1.0) {
        super(name, parent, color, xAnchorMin, xAnchorMax, yAnchorMin, yAnchorMax, cursor, fade);
        this.text = text;
        this.textAlignment = textAlignment;
        this.fontSize = fontSize;
    }
}

module.exports = {
    CUIElement, CUIRootElement, CUIChildElement, CUITextElement
}