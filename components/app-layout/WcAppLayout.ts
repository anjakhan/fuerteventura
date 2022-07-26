import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import { logoutFunc } from '../../adminIndex';
import { showCtxMenu } from "../../shared/contextMenu";

import "../icons/WcIcon";

import { layoutStyles, navbarStyles } from './layout-styles';
import { WcAppDrawer } from "../app-drawer/WcAppDrawer";
import { WcUploadPage } from "../../pages/fotoupload-page/WcUploadPage";
import { WcFotoPreview } from "../../pages/fotopreview-page/WcFotoPreview";
import { WcTraveldetailsPage } from "../../pages/traveldetails-page/WcTraveldetailsPage";
import { WcFuerteMapPage } from "../../pages/fuerte-map/WcFuerteMapPage";
import { WcSightseeingPage } from "../../pages/sightseeing-page/WcSightseeingPage";
import { WcFotosFolders } from "../../pages/latest-story/WcFotosFolders";

@customElement("wc-app-layout")
export class WcAppLayout extends LitElement {
    @property({ type: String }) selectedDrawer: string = 'latest-story';

    static get styles() {
        return [layoutStyles, navbarStyles];
    };

    render(): TemplateResult {
        return html`
        <div class="account-layout">
            <header>
                <wc-icon primaryColor="island" icon="island" class="island"></wc-icon><h3>Fuerteventura</h3><div style="min-width: 60px;"></div>
                <div class="user-icon" style="position: fixed; right: 40px; top; 0px; z-index: 99;">
                    <wc-icon @mousedown=${(e: MouseEvent): void => this.userClick(e)} primaryColor="island" icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
                </div>
            </header>

            <div class="drawer">${this.renderDrawer()}</div>  
            
            <div id="user-content">
                ${this.getUserContent()}
            </div>
        </div>
        `;
    };

    renderDrawer(): LitElement {
        const td = new WcAppDrawer(this.selectedDrawer);
        td.getDrawerSelection(selectedDrawer => {
            this.selectedDrawer = selectedDrawer;
        });
        return td;
    };

    getUserContent(): LitElement | TemplateResult | void {
        switch (this.selectedDrawer) {
            case ('latest-story'): return new WcFotosFolders();
            case ('trip-details'): return new WcTraveldetailsPage();
            case ('foto-preview'): return new WcFotoPreview();
            case ('upload'): return new WcUploadPage();
            case ('map'): return new WcFuerteMapPage();
            case ('sightseeing'): return new WcSightseeingPage();
            default: ('welcome');
        };
    };

    userClick(e: MouseEvent): void {
        showCtxMenu(e, [
            {
                caption: "Log out",
                callback: () => {
                    this.logoutUser();
                }
            },
        ]);
    };

    logoutUser() {
        logoutFunc();
    };
};
