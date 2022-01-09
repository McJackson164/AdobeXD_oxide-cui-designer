const scenegraph = require("scenegraph");

const panel = require("./src/ui/panel");

module.exports = {
    panels: {
        createElement: {
            show: panel.show,
        }
    }
};
