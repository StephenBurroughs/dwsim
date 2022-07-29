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
exports.withInitializeDashboard = exports.user_token = void 0;
var React = require("react");
exports.user_token = window.localStorage.getItem("s365_local_user_token");
var DashboardServiceUrl = process.env.REACT_APP_DASHBOARD_SERVICE_URL;
function withInitializeDashboard(WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        /**
         *
         */
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                isLoaded: false,
                isDashboardInitialized: true,
                isLoggedIn: true,
                isError: false,
                siteId: "",
                flowsheetsDriveId: "",
                flowsheetsListId: ""
            };
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //const token = await this.getUserToken();
                    //if (token) {
                    //    this.setState({ isLoggedIn: true, isLoaded: true });
                    //    await this.getBaseFolder(token);
                    //} else {
                    this.setState({ isLoggedIn: true, isLoaded: true });
                    return [2 /*return*/];
                });
            });
        };
        class_1.prototype.getUserToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    token = "hello";
                    //if (chrome.webview?.hostObjects?.authService) {
                    //    this.setState({ isLoaded: false });
                    //    const authService = chrome.webview.hostObjects.authService;
                    //    try {
                    //        token = await authService.getUserToken();
                    //    } catch (error) {
                    //        token = "";
                    //    }
                    //}
                    console.log("App.tsx token", token, !!token);
                    return [2 /*return*/, token];
                });
            });
        };
        class_1.prototype.getBaseFolder = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    try {
                        if (!!token && token.length > 0) {
                            this.setState({ isLoaded: false });
                            data = {
                                userAccessToken: token,
                                siteId: "not required",
                                flowsheetsListId: "not required",
                                tagsListId: "not required"
                            };
                            //    const resp = await fetch(`${DashboardServiceUrl}/api/dashboard/initialize`, {
                            //        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            //        mode: 'cors', // no-cors, *cors, same-origin
                            //        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            //        // credentials: 'same-origin', // include, *same-origin, omit
                            //        headers: {
                            //            'Content-Type': 'application/json'
                            //            // 'Content-Type': 'application/x-www-form-urlencoded',
                            //        },
                            //        // redirect: 'follow', // manual, *follow, error
                            //        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                            //        body: JSON.stringify(data) // body data type must match "Content-Type" header
                            //    });
                            //    const folder = await resp.json();
                            //    console.log("Initialize resp", folder);
                            //    if (!folder || !folder.flowsheets.folderDriveId) {
                            //        throw "An error occurred while initializing Simulate 365 Dashboard.";
                            //    }
                            //    const baseFolder = {
                            //        // webUrl: folder.flowsheets.parentName + "/" + folder.flowsheets.folderName,
                            //        webUrl: "/" + folder.flowsheets.folderName,
                            //        id: folder.flowsheets.folderListId,
                            //        driveId: folder.flowsheets.folderDriveId,
                            //        displayName: "Dashboard"
                            //    } as ISelectedFolder;
                            //    this.setState({
                            //        isDashboardInitialized: true,
                            //        baseFolder: baseFolder,
                            //        siteId: folder.siteId,
                            //        flowsheetsDriveId: folder.flowsheetsDriveId,
                            //        flowsheetsListId: folder.flowsheetsListId
                            //    });
                            //} else {
                            //    this.setState({ isLoaded: true });
                        }
                    }
                    catch (error) {
                        this.setState({ isError: true });
                        console.log("An error occurred while initializing dashboard.", error);
                        //  toast.error("An error occurred while initializing dashboard.");
                    }
                    finally {
                        this.setState({ isLoaded: true });
                    }
                    return [2 /*return*/];
                });
            });
        };
        class_1.prototype.render = function () {
            var _a = this.state, isLoaded = _a.isLoaded, isError = _a.isError, isLoggedIn = _a.isLoggedIn, isDashboardInitialized = _a.isDashboardInitialized;
            //if (isError) {
            //    return (<div style={{
            //        display: "flex",
            //        flexDirection: "column",
            //        alignItems: "center",
            //        justifyContent: "center",
            //        height: "100%"
            //    }}>
            //        <span className="text-danger">An error occurred while initializing Simulate 365 Dashboard.</span>
            //    </div>)
            //}
            //if (!isLoggedIn) {
            //    return (<div style={{
            //        display: "flex",
            //        flexDirection: "column",
            //        alignItems: "center",
            //        justifyContent: "center",
            //        height: "100%"
            //    }}>
            //        <div className="text-danger" style={{textAlign:"center"}}>
            //           To open, save or upload files to the program, log in with <b>Simulate 365 account</b>.<br/>
            //           The login connects the program to <b>dashboard.simulate365.com</b>, your personal file management system.<br/>
            //            You will be able to access and manage DASHBOARD files directly in your simulator.<br/>
            //           To benefit from this feature, first <b>sync files and flowsheets</b> on your local machine with DASHBOARD.  </div>
            //    </div>)
            //}
            //if (!isLoaded) {
            //    return (<div style={{
            //        display: "flex",
            //        flexDirection: "column",
            //        alignItems: "center",
            //        justifyContent: "center",
            //        height: "100%"
            //    }}>
            //        <Spinner
            //            className="main-spinner"
            //            styles={{ circle: { width: "100px", height: "100px" } }}
            //            label="Loading Dashboard..."
            //            labelPosition="bottom" />
            //    </div>);
            //}
            if (isDashboardInitialized) {
                return React.createElement(WrappedComponent, __assign({}, this.props, this.state));
            }
            return null;
        };
        return class_1;
    }(React.Component));
}
exports.withInitializeDashboard = withInitializeDashboard;
//# sourceMappingURL=with-initialize-dashboard.hoc.js.map