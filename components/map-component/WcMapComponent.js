var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
let WcMapComponent = class WcMapComponent extends LitElement {
    static get styles() {
        return [css `
      .container { height: 100%; width: 100% }
    `];
    }
    ;
    render() {
        return html `
      <div class="container" id="mapid"></div>
    `;
    }
    ;
};
__decorate([
    query('#mapid')
], WcMapComponent.prototype, "mapid", void 0);
WcMapComponent = __decorate([
    customElement("wc-map-component")
], WcMapComponent);
export { WcMapComponent };
;
//# sourceMappingURL=WcMapComponent.js.map