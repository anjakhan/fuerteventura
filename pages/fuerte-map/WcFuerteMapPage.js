var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { getTravelDocs } from "../../code/firebase";
import { createMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";
let WcFuerteMapPage = class WcFuerteMapPage extends LitElement {
    static get styles() {
        return [mapStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.loadFotos();
    }
    ;
    loadFotos() {
        return __awaiter(this, void 0, void 0, function* () {
            const fotos = [];
            try {
                yield getTravelDocs()
                    .then((data) => {
                    data.forEach((doc) => fotos.push(doc));
                })
                    .catch((error) => console.log('no traveldocs found', error));
            }
            catch (error) {
                console.log(error);
            }
            this.fotos = fotos;
            console.log(this.fotos);
        });
    }
    ;
    renderMap() {
        var _a;
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100vh';
        mapContainer.style.width = '100vw';
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(mapContainer);
        createMap(mapContainer, this.fotos);
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
    property({ type: Array })
], WcFuerteMapPage.prototype, "fotos", void 0);
__decorate([
    query('#mapid')
], WcFuerteMapPage.prototype, "mapid", void 0);
WcFuerteMapPage = __decorate([
    customElement("wc-fuerte-map-page")
], WcFuerteMapPage);
export { WcFuerteMapPage };
;
//# sourceMappingURL=WcFuerteMapPage.js.map