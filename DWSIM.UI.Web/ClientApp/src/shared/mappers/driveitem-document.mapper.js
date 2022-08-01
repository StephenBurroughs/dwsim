"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapDriveItemToDocument = void 0;
var document_interfaces_1 = require("../../interfaces/documents/document.interfaces");
var get_file_extension_1 = require("../utilities/get-file-extension");
function MapDriveItemToDocument(item) {
    var isFolder = item.folder ? true : false;
    var document = {};
    document.key = item.id;
    document.eTag = item.eTag;
    document.name = item.name;
    document.iconName = isFolder ? "FabricFolder" : undefined;
    document.extension = isFolder ? "folder" : get_file_extension_1.getFileExtension(item.name);
    document.remark = item.listItem.fields.Remark;
    document.dateModified = item.listItem.fields.Modified ? new Date(item.listItem.fields.Modified) : new Date(item.lastModifiedDateTime);
    //document.iconNameUrl = !isFolder ? require("../../assets/filetype-icons/cc7.png") : null;
    document.remark = item.listItem.fields.Remark;
    //document.versionId = item.UIVersion;
    document.versionNumber = item.listItem.fields._UIVersionString;
    document.simulationType = item.listItem.fields.Simulation_x0020_Type;
    document.specControlStatus = item.listItem.fields.SpecControl;
    document.convergedStatus = item.listItem.fields.Convergance;
    document.isExample = item.listItem.fields.ExampleFile ? item.listItem.fields.ExampleFile : false;
    document.hideFromDashboard = item.listItem.fields.HideFromDashboard ? item.listItem.fields.HideFromDashboard : false;
    document.isExam = item.listItem.fields.IsExam ? item.listItem.fields.IsExam : false;
    document.examId = item.listItem.fields.ExamId;
    document.createdFromFilterId = item.listItem.fields.CreatedFromFilterId;
    document.createdFromFilterVersionId = item.listItem.fields.CreatedFromFilterVersionId;
    document.fileType = isFolder ? document_interfaces_1.ResponseItemType.Folder : document_interfaces_1.ResponseItemType.File;
    document.listItemId = item.listItem.id;
    document.driveItemId = item.id;
    document.downloadURL = item["@microsoft.graph.downloadUrl"];
    document.tags = item.listItem.fields.Tags ? item.listItem.fields.Tags.map(function (value) {
        return { key: value.LookupId, name: value.LookupValue };
    }) : null;
    document.createdBy = (item.createdBy && item.createdBy.user) ? item.createdBy.user : undefined;
    document.parentPath = item.parentReference.path;
    document.shared = item.shared ? true : false;
    return document;
}
exports.MapDriveItemToDocument = MapDriveItemToDocument;
//# sourceMappingURL=driveitem-document.mapper.js.map