"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
var getFileExtension = function (filename) {
    var filenameArray = filename.split('.');
    if (filenameArray && filenameArray.length > 1) {
        return filenameArray.pop();
    }
    else {
        return undefined;
    }
};
exports.getFileExtension = getFileExtension;
//# sourceMappingURL=get-file-extension.js.map