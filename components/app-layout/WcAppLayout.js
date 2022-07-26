var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { currentUser, logoutFunc } from "../../adminIndex";
import "../icons/WcIcon";
let WcAppLayout = class WcAppLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.currentUser = {
            id: '',
            displayName: '',
            eMailAddress: '',
            phone: '',
            isEmailAddressVerified: false,
            lastLogin: new Date(),
            code: '',
            isActivated: false
        };
        this.debug = window.location.hostname === 'localhost' || window.location.href.indexOf('debug=1') > 0;
    }
    static get styles() {
        return [css `
      .account-layout {
        display: grid;
        grid-template-rows: 80px 1fr;
        background-color: rgba(208, 4, 155, 0.04);
        height: 100%;
        width: 100%;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #555;
        background-color: var(--printess-navbar-blue);
        color: white;
        font-family: var(--printess-font);
      }
      .selection-wrapper {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
      button {
        cursor: pointer;
      }
      .btn {
        width: 500px;
        height: 500px;
        background: var(--printess-lightpink);
        border: 1px solid #555;
        border-radius: 4px;
      }
    `];
    }
    connectedCallback() {
        super.connectedCallback();
        this.currentUser = currentUser;
    }
    render() {
        return html `
      <div class="account-layout">
        <header>
          <div>User: ${this.currentUser.phone || this.currentUser.eMailAddress}</div>
          <button @click=${logoutFunc}>Logout</button>
        </header>

        <div class="selection-wrapper">
          <button class="btn go-to-account">
            GO TO ACCOUNT PORTAL
          </button>

          <button class="btn go-to-editor">
            GO TO EDITOR
          </button>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], WcAppLayout.prototype, "currentUser", void 0);
WcAppLayout = __decorate([
    customElement("wc-app-layout")
], WcAppLayout);
export { WcAppLayout };
//# sourceMappingURL=WcAppLayout.js.map