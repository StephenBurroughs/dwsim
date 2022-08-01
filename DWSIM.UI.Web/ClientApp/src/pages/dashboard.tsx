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

interface IDashboardProps {
    filename: string;
    selectedFileType: string;
}

interface IDashboardState {
    filename?: string;
    file: IDocument[];
    isDataLoaded: boolean;
    isDashboardInitialized: boolean;
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
export function Dashboard(WrappedComponent: any) {
    return class extends React.Component<IDashboardProps, IDashboardState> {


        constructor(props: IDashboardProps) {
            super(props);
            this.state = {
                isDashboardInitialized: true,
                isDataLoaded: false,
                file: [],
                filename: '',
                selectedFileType: "dwxmz",
                filterFileTypes: ["dwxml", "dwxmz", "xml", "dwcsd", "dwcsd2", "dwrsd", "dwrsd2", "dwruf"]
            };
        }
        componentDidMount() {
        }

        render() {
            const { filename, selectedFileType, isDashboardInitialized } = this.state;
            if (isDashboardInitialized) {
                return <WrappedComponent {...this.props} {...this.state} />;
            }
            return null;



        }
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