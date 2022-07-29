import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IDocument, ISelectedFolder, ResponseItemType } from "../interfaces/documents/document.interfaces";
import { getFlowsheetListItemsAsync, OpenDwsimFile, SaveDwsimFile } from "../api/documents.api";
import { DetailsListLayoutMode, SelectionMode, ShimmeredDetailsList, Selection, mergeStyleSets, IColumn, CheckboxVisibility, TextField, PrimaryButton, Dropdown, DefaultButton, ISelectionOptions, ConstrainMode, IDetailsListStyles, IRenderFunction, IDetailsHeaderProps, TooltipHost, IDetailsColumnRenderTooltipProps, IDetailsFooterProps, DetailsRow, IStyle, StickyPositionType, Sticky, ScrollablePane, IScrollablePaneStyles, IDropdownOption } from "@fluentui/react";
import moment from "moment";
import { FileTypeIcon, IFileTypeIconProps } from "../components/file-type-icon/file-type-icon.component";
import { getFileTypeIconPropsCustom } from "../components/file-type-icon/file-type-icon.helpers";
/*import CreateFolderModal from "../components/create-folder-modal/create-folder-modal.component";*/
import { withInitializeDashboard } from "../components/with-initialize-dashboard.hoc";
import { msGraphClient } from "../shared/ms-graph/ms-graph-factory";
import { ReactFileReader } from "react-file-reader";

interface IFileReaderProps {
    filename: string;
    selectedFileType: string;
}

interface IFileReaderState {
    filename?: string;
    file: IDocument[];
    isDataLoaded: boolean;
    selectedFileType?: string;
    filterFileTypes: string[];
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

class OpenFilePage extends React.Component<IFileReaderProps, IFileReaderState> {


    constructor(props: IFileReaderProps) {
        super(props);
        this.state = {
            isDataLoaded: false,
            file: [],
            filename: '',
            selectedFileType: "dwxmz",
            filterFileTypes: ["dwxml", "dwxmz", "xml", "dwcsd", "dwcsd2", "dwrsd", "dwrsd2", "dwruf"]
        };
    }
    componentDidMount() {
    }
    private getFileFromInput(file: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsBinaryString(file);
        });
    }

    private manageUploadedFile(binary: String, file: File) {
        console.log('file size is ${binary.length}');
        console.log('file name is ${file.name}');
    }

    private openFiles(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        Array.from(event.target.files).forEach(file => {
            this.getFileFromInput(file)
                .then((binary)=> {
                    this.manageUploadedFile(binary, file);
            }).catch(function (reason) {
                console.log("error during upload ${reason}");
                event.target.value = '';
            });
    });
}
    var reader = new FileReader();
    reader.onloadend = function (e) {
        var files = e.target.result
        console.log(files);
    }
    reader.readAsText(file)
}

    render() {
        const { filename, selectedFileType, filterFileTypes} = this.state;




        const dropdownControlledExampleOptions = getDropDownOptions(filterFileTypes);


        return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
            <div style={{ marginLeft: "30px" }}>
                <div style={{ display: "flex", marginBottom: "5px", marginTop: "5px" }}>
                    <div style={{ flexBasis: "80%" }} >
                        <TextField placeholder="Filename" value={filename} onChange={(ev, newValue) => this.setState({ filename: newValue })} />
                    </div>
                    <div style={{ flexBasis: "20%" }}>
                        <input accept="" id="file" multiple={false} type="file" onChange={this.openFiles} />
                        <DefaultButton text="Upload File" styles={{ root: { marginLeft: "10px" } }} onClick={e => e.stopPropagation()} />
                    </div>

                </div>
                <div style={{ display: "flex", marginBottom: "5px", marginTop: "5px" }} >
                    <div style={{ flexBasis: "80%" }}>
                        <Dropdown
                            selectedKey={selectedFileType}
                            placeholder="Select an option"
                            options={dropdownControlledExampleOptions}
                            onChange={(e, option) => { this.setState({ selectedFileType: option?.key.toString() }); }}

                        />
                    </div>
                    <div style={{ flexBasis: "20%" }}>
                        <PrimaryButton text="Save" styles={{ root: { marginLeft: "10px" } }} onClick={() => this.setState({ isDataLoaded: false })} />
                    </div>
                </div>
            </div>

        </div>;



    }
}

function getDropDownOptions(fileExtensions: string[]): IDropdownOption[] {

    let options: IDropdownOption[] = [];

    fileExtensions.forEach(extension => {
        const option = getFileTypeDropdownOption(extension);
        if (option) {
            options.push(option);
        }
    });

    return options;

}

function getFileTypeDropdownOption(extension?: string): IDropdownOption | undefined {


    switch (extension) {
        //dwsim default
        case 'dwxmz': return { key: 'dwxmz', text: 'Compressed XML Simulation File (*.dwxmz)' };
        case 'dwxml': return { key: 'dwxml', text: 'XML Simulation File (*.dwxml)' };
        case 'xml': return { key: 'xml', text: 'Mobile XML Simulation File (*.xml)' };
        case 'dwcsd': return { key: 'dwcsd', text: 'Compound Creator Study (*.dwcsd)' };
        case 'dwcsd2': return { key: 'dwcsd2', text: 'Compound Creator Study (*.dwcsd2)' };
        case 'dwrsd': return { key: 'dwrsd', text: 'Data Regression Study (*.dwrsd)' };
        case 'dwrsd2': return { key: 'dwrsd2', text: 'Data Regression Study (*.dwrsd2)' };
        case 'dwruf': return { key: 'dwruf', text: 'UNIFAC Regression Study File (*.dwruf)' };
        case 'dwund': return { key: 'dwund', text: '"DWSIM System of Units File (*.dwund)' };
        case 'dwrxm': return { key: 'dwrxm', text: '"DWSIM Reactions File (*.dwrxm)' };
        case 'dwrxs': return { key: 'dwrxs', text: '"DWSIM Reactions File (*.dwrxs)' };
        //end of dwsim default
        case 'xlsx': return { key: 'xlsx', text: 'Excel Workbook (*.xlsx)' };
        case 'odt': return { key: 'odt', text: 'OpenOffice Writer Document (*.odt)' };
        case 'pdf': return { key: 'pdf', text: 'PDF Files (*.pdf)' };
        case 'ods': return { key: 'ods', text: 'OpenOffice Calc SpreadSheet (*.ods)' };
        case 'json': return { key: 'json', text: 'JSON file (*.json)' };
        case 'bmp': return { key: 'bmp', text: 'BMP file (*.bmp)' };
        case 'jpg': return { key: 'jpg', text: 'JPG file (*.jpg)' };
        case 'png': return { key: 'json', text: 'PNG file (*.png)' };
        case 'gif': return { key: 'gif', text: 'GIF file (*.gif)' };
        case 'mov': return { key: 'mov', text: 'MOV file (*.mov)' };
        case 'mp4': return { key: 'mp4', text: 'MP4 file (*.mp4)' };
        case 'mp3': return { key: 'mp3', text: 'MP3 file (*.mp3)' };
        case 'txt': return { key: 'txt', text: 'Text file (*.txt)' };
        case 'py': return { key: 'py', text: 'Python file (*.py)' };
        case 'html': return { key: 'html', text: 'HTML file (*.html)' };
        default:
            return undefined;
    }

}


export default withInitializeDashboard(OpenFilePage);