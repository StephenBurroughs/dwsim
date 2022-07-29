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
exports.CreateFolder = exports.SaveDwsimFile = exports.OpenDwsimFile = exports.getFlowsheetListItemsAsync = void 0;
var document_interfaces_1 = require("../interfaces/documents/document.interfaces");
var driveitem_document_mapper_1 = require("../shared/mappers/driveitem-document.mapper");
var ms_graph_factory_1 = require("../shared/ms-graph/ms-graph-factory");
var copy_sort_1 = require("../shared/utilities/copy-sort");
function getFlowsheetListItemsAsync(selectedFolder, siteId, flowsheetsListId, filterFileTypes) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedFolderPath, apidrivePath, driveItems, driveItemsResp, documents, files, folders, sortedFolders, sortedFiles, filesAndFolders, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    selectedFolderPath = selectedFolder.webUrl.split('/').slice(1).reduce(function (prev, curr) { return prev + "/" + curr; }, "");
                    apidrivePath = "/sites/" + siteId + "/lists/" + flowsheetsListId + "/drive/root:/" + selectedFolderPath + ":/children";
                    console.log("get drive items apiPath:", apidrivePath, ms_graph_factory_1.msGraphClient);
                    driveItems = [];
                    return [4 /*yield*/, ms_graph_factory_1.msGraphClient.api(apidrivePath).expand("listItem($expand=fields)").get()];
                case 1:
                    driveItemsResp = _a.sent();
                    driveItems.push.apply(driveItems, driveItemsResp.value);
                    _a.label = 2;
                case 2:
                    if (!driveItemsResp["@odata.nextLink"]) return [3 /*break*/, 4];
                    return [4 /*yield*/, ms_graph_factory_1.msGraphClient.api(driveItemsResp["@odata.nextLink"]).get()];
                case 3:
                    driveItemsResp = _a.sent();
                    driveItems.push.apply(driveItems, driveItemsResp.value);
                    return [3 /*break*/, 2];
                case 4:
                    console.log("Drive items:", driveItems);
                    documents = [];
                    documents = driveItems.map(function (driveItem) { return driveitem_document_mapper_1.MapDriveItemToDocument(driveItem); });
                    //remove hide from dashboard files
                    documents = documents.filter(function (document) { return document.hideFromDashboard === false; });
                    files = documents.filter(function (document) { return document.fileType === document_interfaces_1.ResponseItemType.File && !!document.extension
                        && filterFileTypes.findIndex(function (x) { return x == document.extension; }) > -1; });
                    folders = documents.filter(function (document) { return document.fileType === document_interfaces_1.ResponseItemType.Folder; });
                    sortedFolders = copy_sort_1._copyAndSort(folders, "name", false);
                    sortedFiles = copy_sort_1._copyAndSort(files, "name", false);
                    filesAndFolders = { files: sortedFiles, folders: sortedFolders };
                    console.log("getSharedFlowsheetsItems results:", filesAndFolders);
                    return [2 /*return*/, filesAndFolders];
                case 5:
                    error_1 = _a.sent();
                    console.log("Error while getting List items:", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getFlowsheetListItemsAsync = getFlowsheetListItemsAsync;
function OpenDwsimFile(driveItemId, driveId, filePath) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var filePickerService;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("filePath", filePath);
                    if (!((_b = (_a = chrome === null || chrome === void 0 ? void 0 : chrome.webview) === null || _a === void 0 ? void 0 : _a.hostObjects) === null || _b === void 0 ? void 0 : _b.filePickerService)) return [3 /*break*/, 2];
                    filePickerService = chrome.webview.hostObjects.filePickerService;
                    return [4 /*yield*/, filePickerService.openFile(driveItemId, driveId, filePath)];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2: throw "filePickerService not initialized.";
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.OpenDwsimFile = OpenDwsimFile;
function SaveDwsimFile(filename, flowsheetsDriveId, parentDriveId, filePath) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var filePickerService;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("filePath", filePath);
                    if (!((_b = (_a = chrome === null || chrome === void 0 ? void 0 : chrome.webview) === null || _a === void 0 ? void 0 : _a.hostObjects) === null || _b === void 0 ? void 0 : _b.filePickerService)) return [3 /*break*/, 2];
                    filePickerService = chrome.webview.hostObjects.filePickerService;
                    return [4 /*yield*/, filePickerService.SaveFile(filename, flowsheetsDriveId, parentDriveId, filePath)];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2: throw "filePickerService not initialized.";
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.SaveDwsimFile = SaveDwsimFile;
function CreateFolder(folderName, flowsheetsDriveId, parentDriveId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var filePickerService;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_b = (_a = chrome === null || chrome === void 0 ? void 0 : chrome.webview) === null || _a === void 0 ? void 0 : _a.hostObjects) === null || _b === void 0 ? void 0 : _b.filePickerService)) return [3 /*break*/, 2];
                    filePickerService = chrome.webview.hostObjects.filePickerService;
                    return [4 /*yield*/, filePickerService.CreateFolder(folderName, flowsheetsDriveId, parentDriveId)];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2: throw "filePickerService not initialized.";
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.CreateFolder = CreateFolder;
//# sourceMappingURL=documents.api.js.map