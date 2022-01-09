const { Color } = require("scenegraph");
const { CUIImage } = require("./models/cuiImage");
const { CUIElement, CUIRootElement } = require("./models/CUIElements");
const { CUIInput } = require("./models/cuiInput");
const { CUIText } = require("./models/cuiText");
const { CUIPanel } = require("./models/cuiPanel");
const { CUIButton } = require("./models/cuiButton");

/**
 * TODO:
 * - Add text orientation
 */

const ABSOLUTE_COLOR_FACTOR = 1 / 255;

/**
 * @param {CUIRootElement} cuiRootElement
 */
function root(cuiRootElement) {
    const colorString = colorToString(cuiRootElement.color ?? new Color("#ffaaee"));
    const minAnchor = cuiRootElement.xAnchorMin + " " + cuiRootElement.yAnchorMin;
    const maxAnchor = cuiRootElement.xAnchorMax + " " + cuiRootElement.yAnchorMax;

    return format(`
    CuiElementContainer root = new CuiElementContainer()
    {
        {
            new CuiPanel
            {
                Image = { Color = "{0}", Material = "assets/content/ui/uibackgroundblur.mat", FadeIn = {1}f},
                RectTransform = { AnchorMin = "{2}", AnchorMax = "{3}" },
                CursorEnabled = {4}
            },
            new CuiElement().Parent = "Overlay",
            "{5}"
        }
    };
    `, [colorString, cuiRootElement.fade.toFixed(3), minAnchor, maxAnchor, cuiRootElement.cursor ? "true" : "false", cuiRootElement.name]);
}

/**
 * @param {CUIPanel} cuiPanel
 */
function panel(cuiPanel) {
    const colorString = colorToString(cuiPanel.color);
    const minAnchor = cuiPanel.xAnchorMin + " " + cuiPanel.yAnchorMin;
    const maxAnchor = cuiPanel.xAnchorMax + " " + cuiPanel.yAnchorMax;

    return format(`
    root.Add(new CuiPanel
        {
            Image = { Color = "{0}", Material = "assets/content/ui/uibackgroundblur-ingamemenu.mat", FadeIn = {1}f },
            RectTransform = { AnchorMin = "{2}", AnchorMax = "{3}" },
            CursorEnabled = {4}
        },
        "{5}",
        "{6}");
    `, [colorString, cuiPanel.fade.toFixed(3), minAnchor, maxAnchor, cuiPanel.cursor ? "true" : "false", cuiPanel.parent, cuiPanel.name]);
}

/**
 * @param {CUIButton} cuiButton
 */
function button(cuiButton) {
    const colorString = colorToString(cuiButton.color ?? new Color("#ffaaee"));
    const textColorString = colorToString(cuiButton.textColor);
    const minAnchor = cuiButton.xAnchorMin + " " + cuiButton.yAnchorMin;
    const maxAnchor = cuiButton.xAnchorMax + " " + cuiButton.yAnchorMax;

    return format(`
    root.Add(new CuiButton
        {
            Button = { Close = "{0}", Command = "{1}", Color = "{2}", FadeIn = {3}f },
            RectTransform = { AnchorMin = "{4}", AnchorMax = "{5}" },
            Text = { Text = "{6}", FontSize = {7}, Align = {8}, Color = "{9}", FadeIn = {3}f }
        },
        "{10}",
        "{11}");
    `, ["", cuiButton.command, colorString, cuiButton.fade.toFixed(3), minAnchor, maxAnchor, cuiButton.text, cuiButton.fontSize.toString(), cuiButton.textAlignment,textColorString, cuiButton.parent, cuiButton.name]);
}

/**
 * @param {CUIInput} cuiInput
 */
function input(cuiInput) {
    const colorString = colorToString(cuiInput.color ?? new Color("#ffaaee"));
    const minAnchor = cuiInput.xAnchorMin + " " + cuiInput.yAnchorMin;
    const maxAnchor = cuiInput.xAnchorMax + " " + cuiInput.yAnchorMax;

    return format(`
    root.Add(new CuiElement
        {
            Parent = "{0}",
            Name = "{1}",

            Components =
            {
                new CuiInputFieldComponent
                {

                    Text = "{2}",
                    CharsLimit = 16,
                    Color = "{3}",
                    IsPassword = false,
                    Command = {4},
                    Font = "robotocondensed-bold.ttf",
                    FontSize = {5},
                    Align = {6}
                },

                new CuiRectTransformComponent
                {
                    AnchorMin = "{7}",
                    AnchorMax = "{8}"
                }

            },
        });
    `, [cuiInput.parent, cuiInput.name, cuiInput.text, colorString, cuiInput.command, cuiInput.fontSize.toString(), cuiInput.textAlignment, minAnchor, maxAnchor]);
}


/**
 * @param {CUIText} cuiText
 */
function text(cuiText) {
    const colorString = colorToString(cuiText.color ?? new Color("#ffaaee"));
    const minAnchor = cuiText.xAnchorMin + " " + cuiText.yAnchorMin;
    const maxAnchor = cuiText.xAnchorMax + " " + cuiText.yAnchorMax;

    return format(`
    root.Add(new CuiElement
        {
            Parent = "{0}",
            Name = "{1}",
            Components =
            {
                new CuiTextComponent
                {
                    Text = "{2}",
                    FontSize = {3},
                    Font = "robotocondensed-bold.ttf",
                    Align = {4},
                    Color = "{5}",
                    FadeIn = {6}f,
                },

                new CuiRectTransformComponent
                {
                     AnchorMin = "{7}",
                     AnchorMax = "{8}"
                }
            },
        });
    `, [cuiText.parent, cuiText.name, cuiText.text, cuiText.fontSize.toString(), cuiText.textAlignment, colorString, cuiText.fade.toFixed(3), minAnchor, maxAnchor]);
}

/**
 * @param {CUIImage} cuiImage
 */
function image(cuiImage) {
    const colorString = colorToString(cuiImage.color ?? new Color("#ffaaee"));
    const minAnchor = cuiImage.xAnchorMin + " " + cuiImage.yAnchorMin;
    const maxAnchor = cuiImage.xAnchorMax + " " + cuiImage.yAnchorMax;
    // TODO: implement
    return format(``, []);
}

/**
 * 
 * @param {String} template 
 * @param {String[]} inputs 
 * 
 * @returns {String}
 */
function format(template, inputs) {
    return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof inputs[number] != 'undefined'
            ? inputs[number]
            : match
            ;
    }).replace(/\\n/g, "").replace(/\\t/g, "").replace(/\n/g, "").replace(/\t/g, "").replace(/  /g, "");
}

/**
 * 
 * @param {Color} color 
 * @returns {String}
 */
function colorToString(color) {
    return (ABSOLUTE_COLOR_FACTOR * color.r) + " " + (ABSOLUTE_COLOR_FACTOR * color.g) + " " + (ABSOLUTE_COLOR_FACTOR * color.b) + " " + (ABSOLUTE_COLOR_FACTOR * color.a);
}

module.exports = {
    root,
    panel,
    text,
    button,
    input,
    image
}