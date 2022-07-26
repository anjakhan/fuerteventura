import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { currentUser, logoutFunc, User } from "../../adminIndex";

import "../icons/WcIcon";

@customElement("wc-app-layout")
export class WcAppLayout extends LitElement {

  static get styles() {
    return [css`
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

  @property({ type: Object }) currentUser: User = {
    id: '',
    displayName: '',
    eMailAddress: '',
    phone: '',
    isEmailAddressVerified: false,
    lastLogin: new Date(),
    code: '',
    isActivated: false
  };

  debug = window.location.hostname === 'localhost' || window.location.href.indexOf('debug=1') > 0

  connectedCallback(): void {
    super.connectedCallback();

    this.currentUser = currentUser;
  }

  render(): TemplateResult {
    return html`
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
}
