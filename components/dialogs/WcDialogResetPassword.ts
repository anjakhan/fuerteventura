import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dialogStyles } from './dialog-styles';
import { WcBackdrop } from "../backdrop/WcBackdrop";
import { sendPasswordResetMail } from "../../code/firebase";


@customElement("wc-dialog-reset-password")
export class WcDialogResetPassword extends LitElement {
  static get styles() {
    return [dialogStyles, css`
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

  @property({ type: String }) email: string = "";
  @property({ type: String }) errorMsg: string = "";

  backdrop: WcBackdrop;

  connectedCallback(): void {
    super.connectedCallback();
  }

  constructor() {
    super();
    this.backdrop = new WcBackdrop();
  }

  showDialog(): void {
    document.body.appendChild(this.backdrop);
    document.body.appendChild(this);
  }

  private closeDialog() {
    document.body.removeChild(this.backdrop);
    document.body.removeChild(this);
  }

  sendResetEmail(): void {
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

  render(): TemplateResult {
    return html`
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Forgot your password?</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${(): void => this.closeDialog()}></wc-icon>
          </div>

          <div class="modal-content">
            <p>No worry! Enter your email address and we will send you a link to reset your password.</p>
            <span class="error-msg" style="display: ${this.errorMsg ? 'block' : 'none'}"> ${this.errorMsg}</span>
            <input type="email" placeholder="Email address*" @change=${(e: { target: HTMLInputElement }) => this.email = e.target.value}>
            <button class="submit" @click=${this.sendResetEmail}>Send Reset Link</button>
          </div>
        </div>
      </div>
    `;
  }
}