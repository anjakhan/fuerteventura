var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { createToDoMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";
let WcSightseeingPage = class WcSightseeingPage extends LitElement {
    static get styles() {
        return [mapStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    renderMap() {
        var _a;
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100vh';
        mapContainer.style.width = '100vw';
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(mapContainer);
        createToDoMap(mapContainer);
    }
    ;
    render() {
        return html `
        ${this.renderMap()}
    `;
    }
    ;
};
__decorate([
    query('#mapid')
], WcSightseeingPage.prototype, "mapid", void 0);
WcSightseeingPage = __decorate([
    customElement("wc-sightseeing-page")
], WcSightseeingPage);
export { WcSightseeingPage };
;
//# sourceMappingURL=WcSightseeingPage.js.map