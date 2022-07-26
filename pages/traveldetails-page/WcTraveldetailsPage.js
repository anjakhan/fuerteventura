var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { traveldetailsStyles } from "./traveldetails-styles";
let WcTraveldetailsPage = class WcTraveldetailsPage extends LitElement {
    static get styles() {
        return [traveldetailsStyles];
    }
    ;
    render() {
        return html `
      <div class="travel-details-container">
        <h1 class="title">Reisedaten</h1>
        <div class="flight">
          <h3 class="flex">Berlin (Brandenburg) <wc-icon primaryColor="gray" icon="plane-duotone"></wc-icon> Fuerteventura</h3>
          <p class="flex"><wc-icon primaryColor="gray" icon="calendar-alt"></wc-icon>08.06.2021</p>
          <p class="flex"><wc-icon primaryColor="gray" icon="clock-light"></wc-icon>06:50 - 10:55 (11:55 DE)</p>
        </div>
        <div class="flight">
          <h3 class="flex">Fuerteventura <wc-icon primaryColor="gray" icon="plane-duotone"></wc-icon> Berlin (Brandenburg)</h3>
          <p class="flex"><wc-icon primaryColor="gray" icon="calendar-alt"></wc-icon>06.07.2021</p>
          <p class="flex"><wc-icon primaryColor="gray" icon="clock-light"></wc-icon>11:30 (12:30 DE) - 17:15</p>
        </div>
        <div class="apartment">
          <img src="https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/CallePuntaPesebre.png" alt="apartment">
          <div class="apartment-info">
            <h3 class="flex">Casa Luciano</h3>
            <p class="flex">Calle Punta Pesebre, 8, Jardin del Sol</p>
            <p class="flex">Fase 1, Casa 13, Costa Calma,</p>
            <p class="flex">Canarias 35627, Spain</p>          
          </div>
        </div>
      </div>
    `;
    }
    ;
};
WcTraveldetailsPage = __decorate([
    customElement("wc-traveldetails-page")
], WcTraveldetailsPage);
export { WcTraveldetailsPage };
;
//# sourceMappingURL=WcTraveldetailsPage.js.map