var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dialogStyles } from './dialog-styles';
import { WcBackdrop } from "../backdrop/WcBackdrop";
import { sendPasswordResetMail } from "../../code/firebase";
let WcDialogResetPassword = class WcDialogResetPassword extends LitElement {
    constructor() {
        super();
        this.email = "";
        this.errorMsg = "";
        this.backdrop = new WcBackdrop();
    }
    static get styles() {
        return [dialogStyles, css `
      .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
      }

      .modal-header {
        margin-top: 0px;
      }
      
      .error-msg {
        color: #d20064;
        font-size: 12px;
        font-family: var(--printess-text-font);
      }

      input, input:hover {
        border: 1px solid #ccc;
      }
    `];
    }
    connectedCallback() {
        super.connectedCallback();
    }
    showDialog() {
        document.body.appendChild(this.backdrop);
        document.body.appendChild(this);
    }
    closeDialog() {
        document.body.removeChild(this.backdrop);
        document.body.removeChild(this);
    }
    sendResetEmail() {
        if (!this.email) {
            this.errorMsg = 'Please enter an email address!';
            return;
        }
        if (this.email.indexOf('@') === -1) {
            this.errorMsg = 'Please enter a valid email address!';
            return;
        }
        sendPasswordResetMail(this.email);
        this.closeDialog();
    }
    render() {
        return html `
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Forgot your password?</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${() => this.closeDialog()}></wc-icon>
          </div>

          <div class="modal-content">
            <p>No worry! Enter your email address and we will send you a link to reset your password.</p>
            <span class="error-msg" style="display: ${this.errorMsg ? 'block' : 'none'}"> ${this.errorMsg}</span>
            <input type="email" placeholder="Email address*" @change=${(e) => this.email = e.target.value}>
            <button class="submit" @click=${this.sendResetEmail}>Send Reset Link</button>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], WcDialogResetPassword.prototype, "email", void 0);
__decorate([
    property({ type: String })
], WcDialogResetPassword.prototype, "errorMsg", void 0);
WcDialogResetPassword = __decorate([
    customElement("wc-dialog-reset-password")
], WcDialogResetPassword);
export { WcDialogResetPassword };
//# sourceMappingURL=WcDialogResetPassword.js.map