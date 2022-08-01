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
exports.FileTypeIcon = void 0;
var React = require("react");
var Icon_1 = require("@fluentui/react/lib/Icon");
var FileTypeIcon = function (props) {
    if (!props.IconUrl) {
        return React.createElement(Icon_1.Icon, __assign({}, props, { onClick: props.onClick }));
    }
    else {
        return React.createElement("img", __assign({ src: props.IconUrl, className: props.className }, props));
    }
};
exports.FileTypeIcon = FileTypeIcon;
//# sourceMappingURL=file-type-icon.component.js.map