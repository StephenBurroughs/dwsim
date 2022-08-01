"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@fluentui/react");
var React = require("react");
var LoginIntroPage = function () {
    var onRegisterClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var systemService;
        var _a, _b;
        return __generator(this, function (_c) {
            try {
                systemService = (_b = (_a = chrome === null || chrome === void 0 ? void 0 : chrome.webview) === null || _a === void 0 ? void 0 : _a.hostObjects) === null || _b === void 0 ? void 0 : _b.systemService;
                systemService.openUrlInLocalBrowser("https://simulate365.com/registration-dwsim-pro/");
            }
            catch (error) {
                console.log("An error occurred while navigating to register page.", error);
            }
            return [2 /*return*/];
        });
    }); };
    var onLoginClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var authService, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    if (!((_b = (_a = chrome === null || chrome === void 0 ? void 0 : chrome.webview) === null || _a === void 0 ? void 0 : _a.hostObjects) === null || _b === void 0 ? void 0 : _b.authService)) return [3 /*break*/, 2];
                    authService = chrome.webview.hostObjects.authService;
                    return [4 /*yield*/, authService.navigateToLoginPage()];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    alert("auth Service not initialized.");
                    _c.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    console.log("An error occurred while navigating to login page.", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var OpenAnchorInSystemBrowser = function (e) {
        var _a, _b;
        e.preventDefault();
        var nativeEvent = e.nativeEvent;
        for (var _i = 0, _c = e.nativeEvent.path; _i < _c.length; _i++) {
            var element = _c[_i];
            if (element.tagName == 'A') {
                var systemService = (_b = (_a = chrome === null || chrome === void 0 ? void 0 : chrome.webview) === null || _a === void 0 ? void 0 : _a.hostObjects) === null || _b === void 0 ? void 0 : _b.systemService;
                if (!systemService) {
                    alert("SystemService not available.");
                }
                else {
                    var url = element.href;
                    systemService.openUrlInLocalBrowser(url);
                }
                return false; // Element found, stop execution
            }
        }
        alert("OpenAnchorInSystemBrowser() supports only 'a' element. 'a' element not found in invocation path.");
        return false;
    };
    return React.createElement("div", { style: { height: "100%", display: "flex", flexDirection: "column", justifyContent: 'center', padding: "0px 20px" } },
        React.createElement("div", { style: { marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' } },
            React.createElement("a", { href: "https://simulate365.com", onClick: OpenAnchorInSystemBrowser },
                React.createElement("img", { src: "/s365-full-logo.png", style: { width: '250px' } }))),
        React.createElement("p", null,
            "Access ",
            React.createElement("b", null, "Simulate 365 DASHBOARD"),
            ", the \"all in one place\" simulation platform and use it free for:",
            React.createElement("ul", null,
                React.createElement("li", null, "Intelligent file management"),
                React.createElement("li", null, "Syncing simulation files from DASHBOARD to DWSIM"),
                React.createElement("li", null, "Easier team collaboration"))),
        React.createElement("div", { style: { marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' } },
            React.createElement(react_1.PrimaryButton, { text: "Register", onClick: function () { return onRegisterClick(); }, style: { marginRight: "10px" } }),
            React.createElement(react_1.DefaultButton, { text: "Login", onClick: function () { return onLoginClick(); } })),
        React.createElement("p", null,
            "Discover ",
            React.createElement("b", null, "DWSIM Pro"),
            " and other Simulate 365 tools:",
            React.createElement("ul", null,
                React.createElement("li", null, "PPBDesigner for Population Balance Modeling"),
                React.createElement("li", null, "Multivariate Senstivity Study (MSS)"),
                React.createElement("li", null, "Design of Experiments (DoE)"),
                React.createElement("li", null, "Take-Home Exercises/Exams (THEE)"),
                React.createElement("li", null, "And more!"))));
};
exports.default = LoginIntroPage;
//# sourceMappingURL=login-intro.component.js.map