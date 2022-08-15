import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
    DetailsListLayoutMode, SelectionMode, ShimmeredDetailsList, Selection, mergeStyleSets,
    IColumn, CheckboxVisibility, ISelectionOptions, ConstrainMode, IDetailsListStyles,
    IRenderFunction, IDetailsHeaderProps, IStyle, StickyPositionType, Sticky,
    ScrollablePane, TextField, PrimaryButton, Dropdown, DefaultButton, Button,
} from "@fluentui/react";
import moment from "moment";
import { IDocument, ISelectedFolder, ResponseItemType } from "../../interfaces/documents/document.interfaces";
import { getFlowsheetListItemsAsync } from "../../api/documents.api";
import { FileTypeIcon, IFileTypeIconProps } from "../file-type-icon/file-type-icon.component";
import { getFileTypeIconPropsCustom } from "../file-type-icon/file-type-icon.helpers";

interface IFilePickerProps extends RouteComponentProps<IFilePickerRouteProps> {
    siteId: string;
    flowsheetsListId: string;
    defaultFileType?: string;
    filterFileTypes?: string[];
    onSelectedFileChanged?(selectedDocument: IDocument): void;


}
interface IFilePickerRouteProps {
    extension?: string;
}

interface IFilePickerState {
    files: IDocument[];
    folders: IDocument[];
    selectedFolder: ISelectedFolder;
    isDataLoaded: boolean;
    selectedFileType?: string;
    filterFileTypes: string[];
    showCreateFolderModal: boolean;
}

const gridStyles: Partial<IDetailsListStyles> = {
    root: {
        selectors: {
            '.ms-DetailsRow': {
                minWidth: "calc(100vw - 50px) !important"
            } as IStyle
        },
    }
};
const inputUploadFile = {
    display: 'none',
};
const classNames = mergeStyleSets({
    header: {
        margin: 0,
        height: "50px"
    },
    row: {
        flex: '0 0 auto',
    },
    wrapper: {
        height: '40vh',
        position: 'relative',
        backgroundColor: 'white',
    },
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        display: "flex !important",
        alignItems: "center",
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '20px',
        maxWidth: '20px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
    },
    commandbarInfoIcon: {
        border: "none"
    },
    remarkCell: {
        whiteSpace: "pre-line !important",
        selectors: {
            'span': {
                overflow: "hidden !important",
                textOverflow: "ellipsis !important",
                display: "-webkit-box !important",
                ...({ '-webkit-line-clamp': '2 !important' } as any),
                ...({ '-webkit-box-orient': 'vertical !important' } as any)
            }
        }
    },
    dateModifiedColumn: {
        textAlign: "center",
        justifyContent: "center",
        selectors: {
            '.ms-DetailsHeader-cellTitle': {
                justifyContent: "center",
                paddingRight: "32px"
            }
        }
    },
    column: {
        display: "flex !important",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        selectors: {
            '.ms-DetailsHeader-cellTitle': {
                justifyContent: "center"
            }
        }

    },
    sharedColumn: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        selectors: {
            '.ms-DetailsHeader-cellTitle': {
                justifyContent: "center"
            }
        }
    },
    breadcrumbsticky: {
        height: "100px"
    },
    tableStyle: {
        selectors: {
            '.ms-DetailsRow-cell': {
                ...({ 'display': 'flex !important' } as any),
                alignItems: "center"
            }
        }
    }
});

class FilePicker extends React.Component<IFilePickerProps, IFilePickerState>{



    private getFileFromInput(file: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader()
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsBinaryString(file);
        });
    }

    private manageUploadedFile(binary: String, file: File) {
        //this is where we handle flowsheet data parsing, call iFlowsheet interface.
    }

    private handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        //Array.from(event.target.files).forEach(file => {
        //    this.getFileFromInput(file)
        //        .then((binary) => {
        //            this.manageUploadedFile(binary, file);
        //        }).catch(function (reason) {
        //            console.log('Error during upload ${reason}');
        //            event.target.value = '';
        //        });
        //});
    }
    //componentDidMount() {
    //    this.getFilesAndFolders();
    //}



    render() {

        return <div style={{ display: "flex", marginBottom: "5px", marginTop: "5px" }}>
            <div style={{ flexBasis: "80%" }} >
                <input accept="" style={inputUploadFile} id="file" multiple={false} type="file" onChange={this.handleFileChange} />
                <label htmlFor="file">
                    <DefaultButton text="Upload" styles={{ root: { marginLeft: "10px" } }} onClick={e => e.stopPropagation()} />
                    </label>
            </div>

        </div>;

    }
}


export default FilePicker;