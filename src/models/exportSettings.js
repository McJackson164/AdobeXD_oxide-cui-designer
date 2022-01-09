const { storage } = require("uxp");

class ExportSettings {
    /**
     * @param {storage.Folder} directory 
     * @param {String} fileName 
     */
    constructor(directory, fileName = "", copyToClipboard = false) {
        this.directory = directory;
        this.fileName = fileName;
        this.copyToClipboard = copyToClipboard;
    }

    setFunctionName(functionName = "ShowCUI") {
        this.functionName = functionName;
    }
}

module.exports = {
    ExportSettings
}