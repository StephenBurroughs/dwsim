"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = exports.getFileTypeIconPropsCustom = void 0;
var file_type_icons_1 = require("@uifabric/file-type-icons");
var file_type_icon_data_1 = require("./file-type-icon.data");
var getFileTypeIconPropsCustom = function (options) {
    var _a;
    var IconUrl = getIconImageUrl((_a = options.extension) !== null && _a !== void 0 ? _a : "").default;
    console.log("IconURl", IconUrl);
    if (IconUrl && IconUrl !== null && IconUrl !== "") {
        return __assign({ IconUrl: IconUrl }, options);
    }
    else {
        return file_type_icons_1.getFileTypeIconProps(options);
    }
};
exports.getFileTypeIconPropsCustom = getFileTypeIconPropsCustom;
function getIconImageUrl(extension) {
    if (extension && extension != "") {
        for (var iconName in file_type_icon_data_1.CustomFileTypeToIconMap) {
            var extensions = file_type_icon_data_1.CustomFileTypeToIconMap[iconName].extensions;
            if (extensions) {
                for (var i = 0; i < extensions.length; i++) {
                    if (extensions[i].toLowerCase() == extension.toLowerCase()) {
                        return file_type_icon_data_1.CustomFileTypeToIconMap[iconName].imageUrl;
                    }
                }
            }
        }
    }
    return "";
}
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
//# sourceMappingURL=file-type-icon.helpers.js.map