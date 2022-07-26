import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dialogStyles } from './dialog-styles';
import { WcBackdrop } from "../backdrop/WcBackdrop";

@customElement("wc-dialog-image")
export class WcDialogImage extends LitElement {
  static get styles() {
    return [dialogStyles];
  };

  @property({ attribute: false, type: Number }) idx: number;
  @property({ attribute: false, type: Array }) images: Array<string>;
  backdrop: WcBackdrop;

  constructor(idx: number, images: Array<string>) {
    super();
    this.backdrop = new WcBackdrop();
    this.idx = idx;
    this.images = images;
  };

  showDialog(): void {
    document.body.appendChild(this.backdrop);
    document.body.appendChild(this);
  };

  private closeDialog() {
    document.body.removeChild(this.backdrop);
    document.body.removeChild(this);
  };

  render(): TemplateResult {
    return html`
      <div class="modal">
      
        <div class="modal-wrapper">
          <wc-icon class="close-button" primaryColor="island" icon="close" @click=${(): void => this.closeDialog()}></wc-icon>
          <wc-icon class="prev" primaryColor="island" icon="chevron-left" @click=${() => this.idx > 0 && this.idx--}></wc-icon>
          <img src=${this.images[this.idx]} alt="fuerte">
          <wc-icon class="next" primaryColor="island" icon="chevron-right" @click=${() => this.idx < this.images.length - 1 && this.idx++}></wc-icon>
        </div>

      </div>
    `;
  };
};