"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvergedStatus = exports.SpecControlStatus = exports.SimulationType = exports.ResponseItemType = void 0;
var ResponseItemType;
(function (ResponseItemType) {
    ResponseItemType["Folder"] = "folder";
    ResponseItemType["File"] = "file";
})(ResponseItemType = exports.ResponseItemType || (exports.ResponseItemType = {}));
var SimulationType;
(function (SimulationType) {
    SimulationType["SteadyState"] = "steady-state";
    SimulationType["Dynamic"] = "dynamic";
})(SimulationType = exports.SimulationType || (exports.SimulationType = {}));
var SpecControlStatus;
(function (SpecControlStatus) {
    SpecControlStatus["Valid"] = "valid";
    SpecControlStatus["NotValid"] = "not-valid";
    SpecControlStatus["NotTested"] = "not-tested";
})(SpecControlStatus = exports.SpecControlStatus || (exports.SpecControlStatus = {}));
var ConvergedStatus;
(function (ConvergedStatus) {
    ConvergedStatus["Converged"] = "converged";
    ConvergedStatus["NotConverged"] = "not-converged";
    ConvergedStatus["NotTested"] = "not-tested";
})(ConvergedStatus = exports.ConvergedStatus || (exports.ConvergedStatus = {}));
//# sourceMappingURL=document.interfaces.js.map