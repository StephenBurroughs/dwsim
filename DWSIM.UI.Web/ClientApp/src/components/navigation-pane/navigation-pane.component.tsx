import * as React from 'react'
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useState } from 'react';
import * as History from "history";
import { ISelectedFolder } from "../../interfaces/documents/document.interfaces";
import { Breadcrumb, IBreadcrumbItem, Icon, IconButton } from '@fluentui/react';
import { msGraphClient } from "../../shared/ms-graph/ms-graph-factory"

export interface INavigationBarRouteProps {

}

export interface INavigationBarProps {
    siteId: string;
    onSelectionChanged(selectedFolder: ISelectedFolder): void;
}
export interface INavigationBarState {

}


export interface IBreadcrumbItemWrapper {
    breadcrumb: IBreadcrumbItem;
    path: string;
}

class NavigationBar extends React.Component<INavigationBarProps, INavigationBarState> {


    /**
     *
     */
    constructor(props: INavigationBarProps) {
        super(props);
        this.state = {};
    }
    componentDidUpdate(prevProps: INavigationBarProps, prevState: INavigationBarState) {
        //navigate down the folder structure

    }




    // addSelectedFolder(folder: ISelectedFolder) {
    //     console.log("addSelectedFolder",folder);
    //     this.setState(s => ({ folders: [...s.folders, folder] }));
    // }

    getBreadcrumbItems() {
        console.log("getBreadcrumbItems", this.props);
        const items: IBreadcrumbItem[] = [
        ];

        return items;
    }

    async _onBreadcrumbItemClicked(index: number) {
        console.log("_onBreadcrumbItemClicked index", index);
        const {  } = this.props;

    }

    render() {
        const items = this.getBreadcrumbItems();

        //     return  <Breadcrumb           
        //     items={items}
        //     maxDisplayedItems={3}
        // />
        const lastItem = items.findIndex(x => x.isCurrentItem);
        const showIcon = lastItem !== 0;

        return <div style={{ display: "flex", alignItems: "center" }}>
            {showIcon && <IconButton iconProps={{ iconName: 'Up' }} styles={{ root: { margin: "11px 0px 1px" } }} onClick={} />}

            <div style={{ minWidth: "100%" }}>
                <Breadcrumb
                    items={items}
                    maxDisplayedItems={3}
                />
            </div>
        </div>
    }
}







export default NavigationBar