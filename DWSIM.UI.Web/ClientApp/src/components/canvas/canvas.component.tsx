import * as React from 'react'
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useState } from 'react';
import * as History from "history";
import { msGraphClient } from "../../shared/ms-graph/ms-graph-factory"

export interface IFlowsheetProps {
    siteId: string;
    onSelectionChanged(): void;
}
export interface IFlowsheetState {

}

class flowsheet extends React.Component<IFlowsheetProps, IFlowsheetState> {


    /**
     *
     */
    constructor(props: IFlowsheetProps) {
        super(props);
        this.state = {};
    }
    componentDidUpdate(prevProps: IFlowsheetProps, prevState: IFlowsheetState) {
        //redraw flowsheet to account for new data

    }


    render() {
        return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >

        </div>
    }
}