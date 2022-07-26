var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
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
let WcAppLayout = class WcAppLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.selectedDrawer = 'latest-story';
    }
    static get styles() {
        return [layoutStyles, navbarStyles];
    }
    ;
    render() {
        return html `
        <div class="account-layout">
            <header>
                <wc-icon primaryColor="island" icon="island" class="island"></wc-icon><h3>Fuerteventura</h3><div style="min-width: 60px;"></div>
                <div class="user-icon" style="position: fixed; right: 40px; top; 0px; z-index: 99;">
                    <wc-icon @mousedown=${(e) => this.userClick(e)} primaryColor="island" icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
                </div>
            </header>

            <div class="drawer">${this.renderDrawer()}</div>  
            
            <div id="user-content">
                ${this.getUserContent()}
            </div>
        </div>
        `;
    }
    ;
    renderDrawer() {
        const td = new WcAppDrawer(this.selectedDrawer);
        td.getDrawerSelection(selectedDrawer => {
            this.selectedDrawer = selectedDrawer;
        });
        return td;
    }
    ;
    getUserContent() {
        switch (this.selectedDrawer) {
            case ('latest-story'): return new WcFotosFolders();
            case ('trip-details'): return new WcTraveldetailsPage();
            case ('foto-preview'): return new WcFotoPreview();
            case ('upload'): return new WcUploadPage();
            case ('map'): return new WcFuerteMapPage();
            case ('sightseeing'): return new WcSightseeingPage();
            default: ('welcome');
        }
        ;
    }
    ;
    userClick(e) {
        showCtxMenu(e, [
            {
                caption: "Log out",
                callback: () => {
                    this.logoutUser();
                }
            },
        ]);
    }
    ;
    logoutUser() {
        logoutFunc();
    }
    ;
};
__decorate([
    property({ type: String })
], WcAppLayout.prototype, "selectedDrawer", void 0);
WcAppLayout = __decorate([
    customElement("wc-app-layout")
], WcAppLayout);
export { WcAppLayout };
;
//# sourceMappingURL=WcAppLayout.js.map