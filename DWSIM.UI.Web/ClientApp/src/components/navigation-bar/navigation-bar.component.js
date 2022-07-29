"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var react_1 = require("@fluentui/react");
var ms_graph_factory_1 = require("../../shared/ms-graph/ms-graph-factory");
var NavigationBar = /** @class */ (function (_super) {
    __extends(NavigationBar, _super);
    /**
     *
     */
    function NavigationBar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    NavigationBar.prototype.componentDidUpdate = function (prevProps, prevState) {
        //navigate down the folder structure
    };
    // addSelectedFolder(folder: ISelectedFolder) {
    //     console.log("addSelectedFolder",folder);
    //     this.setState(s => ({ folders: [...s.folders, folder] }));
    // }
    NavigationBar.prototype.getBreadcrumbItems = function () {
        var _this = this;
        console.log("getBreadcrumbItems", this.props);
        var items = [];
        var dashboardItem = {
            text: "Dashboard", key: "0", onClick: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._onBreadcrumbItemClicked.call(this, 0)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }, isCurrentItem: false
        };
        var baseUrl = this.props.baseFolder.webUrl;
        var splited = this.props.selectedFolder.webUrl.split(baseUrl).filter(function (x) { return x; });
        var subdirectoryUrl = splited === null || splited === void 0 ? void 0 : splited[0];
        if (subdirectoryUrl) {
            items.push(dashboardItem);
            var directories_1 = subdirectoryUrl.split("/").filter(function (x) { return x; });
            console.log("directories", directories_1);
            directories_1.forEach(function (directory, index) {
                var dirItem = {
                    text: decodeURIComponent(directory),
                    key: (index + 1).toString(),
                    onClick: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this._onBreadcrumbItemClicked.call(this, index + 1)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    isCurrentItem: (index + 1) == directories_1.length
                };
                items.push(dirItem);
            });
        }
        else {
            dashboardItem.isCurrentItem = true;
            items.push(dashboardItem);
        }
        return items;
    };
    NavigationBar.prototype._onBreadcrumbItemClicked = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedFolder, baseFolder, baseUrl, splited, subdirectoryUrl, directories, selectedFolderPath, selectedFolder_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("_onBreadcrumbItemClicked index", index);
                        _a = this.props, selectedFolder = _a.selectedFolder, baseFolder = _a.baseFolder;
                        if (!(index == 0)) return [3 /*break*/, 1];
                        this.props.onSelectedFolderChanged(baseFolder);
                        return [3 /*break*/, 3];
                    case 1:
                        baseUrl = this.props.baseFolder.webUrl;
                        splited = this.props.selectedFolder.webUrl.split(baseUrl).filter(function (x) { return x; });
                        subdirectoryUrl = splited === null || splited === void 0 ? void 0 : splited[0];
                        directories = subdirectoryUrl.split('/').filter(function (x) { return x; });
                        directories = directories.slice(0, index);
                        console.log("_onBreadcrumbItemClicked directories sliced", directories);
                        selectedFolderPath = this.props.baseFolder.webUrl + "/" + directories.join("/");
                        console.log("_onBreadcrumbItemClicked selectedFolderPath", selectedFolderPath);
                        return [4 /*yield*/, this.getSelectedFolder(selectedFolderPath)];
                    case 2:
                        selectedFolder_1 = _b.sent();
                        this.props.onSelectedFolderChanged(selectedFolder_1);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NavigationBar.prototype.onNavigateUpClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedFolder, baseFolder, baseUrl, splited, subdirectoryUrl, directories, selectedFolderPath, selectedFolder_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, selectedFolder = _a.selectedFolder, baseFolder = _a.baseFolder;
                        baseUrl = baseFolder.webUrl;
                        splited = selectedFolder.webUrl.split(baseUrl).filter(function (x) { return x; });
                        subdirectoryUrl = splited === null || splited === void 0 ? void 0 : splited[0];
                        directories = subdirectoryUrl.split('/').filter(function (x) { return x; });
                        directories = directories.slice(0, -1);
                        if (!(directories && directories.length != 0)) return [3 /*break*/, 2];
                        selectedFolderPath = this.props.baseFolder.webUrl + "/" + directories.join("/");
                        return [4 /*yield*/, this.getSelectedFolder(selectedFolderPath)];
                    case 1:
                        selectedFolder_2 = _b.sent();
                        this.props.onSelectedFolderChanged(selectedFolder_2);
                        return [3 /*break*/, 3];
                    case 2:
                        this.props.onSelectedFolderChanged(baseFolder);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NavigationBar.prototype.getSelectedFolder = function (selectedFolderPath) {
        return __awaiter(this, void 0, void 0, function () {
            var folderPath, apiPath, folderInfo, selectedFolder, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (selectedFolderPath === this.props.baseFolder.webUrl) {
                            return [2 /*return*/, __assign({}, this.props.baseFolder)];
                        }
                        console.log("CurrentFolder path:", selectedFolderPath);
                        folderPath = selectedFolderPath.split('/').slice(1).reduce(function (prev, curr) { return prev + "/" + curr; }, "");
                        console.log("getSelectedFolder path:", folderPath);
                        apiPath = "/sites/" + this.props.siteId + "/lists/" + this.props.flowsheetsListId + "/drive";
                        if (folderPath && folderPath !== "" && folderPath !== "/") {
                            apiPath = "/sites/" + this.props.siteId + "/lists/" + this.props.flowsheetsListId + "/drive/root:" + folderPath;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_graph_factory_1.msGraphClient.api(apiPath).get()];
                    case 2:
                        folderInfo = _a.sent();
                        selectedFolder = {
                            driveId: folderInfo.id,
                            displayName: folderInfo.name,
                            webUrl: selectedFolderPath
                        };
                        return [2 /*return*/, selectedFolder];
                    case 3:
                        error_1 = _a.sent();
                        console.log("An error occurred while loading selected Folder with path", selectedFolderPath);
                        return [2 /*return*/, this.props.baseFolder];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NavigationBar.prototype.render = function () {
        var items = this.getBreadcrumbItems();
        //     return  <Breadcrumb           
        //     items={items}
        //     maxDisplayedItems={3}
        // />
        var lastItem = items.findIndex(function (x) { return x.isCurrentItem; });
        var showIcon = lastItem !== 0;
        return React.createElement("div", { style: { display: "flex", alignItems: "center" } },
            showIcon && React.createElement(react_1.IconButton, { iconProps: { iconName: 'Up' }, styles: { root: { margin: "11px 0px 1px" } }, onClick: this.onNavigateUpClick.bind(this) }),
            React.createElement("div", { style: { minWidth: "100%" } },
                React.createElement(react_1.Breadcrumb, { items: items, maxDisplayedItems: 3 })));
    };
    return NavigationBar;
}(React.Component));
exports.default = NavigationBar;
//# sourceMappingURL=navigation-bar.component.js.map