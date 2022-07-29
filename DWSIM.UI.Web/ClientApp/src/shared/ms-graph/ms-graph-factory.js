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
exports.msGraphClient = void 0;
var microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
var with_initialize_dashboard_hoc_1 = require("../../components/with-initialize-dashboard.hoc");
// Some callback function
var authProvider = function (callback) { return __awaiter(void 0, void 0, void 0, function () {
    var authService, token, error_1, errorModel, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Your logic for getting and refreshing accessToken
                console.log("GetToken called", chrome.webview);
                if (!chrome.webview) return [3 /*break*/, 5];
                authService = chrome.webview.hostObjects.authService;
                if (!authService) {
                    callback("Auth Service not Found.", null);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authService.getUserToken()];
            case 2:
                token = _a.sent();
                callback(null, token);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("An error occurred while getting token.", error_1);
                errorModel = { message: "An error occurred while getting token.", error: error_1 };
                callback(errorModel, null);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                console.log("Auth Service not found, using hardcoded token");
                token = with_initialize_dashboard_hoc_1.user_token;
                callback(null, token);
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var options = {
    authProvider: authProvider,
};
exports.msGraphClient = microsoft_graph_client_1.Client.init(options);
//# sourceMappingURL=ms-graph-factory.js.map