var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dialogStyles } from './dialog-styles';
import { WcBackdrop } from "../backdrop/WcBackdrop";
let WcDialogImage = class WcDialogImage extends LitElement {
    constructor(idx, images) {
        super();
        this.backdrop = new WcBackdrop();
        this.idx = idx;
        this.images = images;
    }
    static get styles() {
        return [dialogStyles];
    }
    ;
    ;
    showDialog() {
        document.body.appendChild(this.backdrop);
        document.body.appendChild(this);
    }
    ;
    closeDialog() {
        document.body.removeChild(this.backdrop);
        document.body.removeChild(this);
    }
    ;
    render() {
        return html `
      <div class="modal">
      
        <div class="modal-wrapper">
          <wc-icon class="close-button" primaryColor="island" icon="close" @click=${() => this.closeDialog()}></wc-icon>
          <wc-icon class="prev" primaryColor="island" icon="chevron-left" @click=${() => this.idx > 0 && this.idx--}></wc-icon>
          <img src=${this.images[this.idx]} alt="fuerte">
          <wc-icon class="next" primaryColor="island" icon="chevron-right" @click=${() => this.idx < this.images.length - 1 && this.idx++}></wc-icon>
        </div>

      </div>
    `;
    }
    ;
};
__decorate([
    property({ attribute: false, type: Number })
], WcDialogImage.prototype, "idx", void 0);
__decorate([
    property({ attribute: false, type: Array })
], WcDialogImage.prototype, "images", void 0);
WcDialogImage = __decorate([
    customElement("wc-dialog-image")
], WcDialogImage);
export { WcDialogImage };
;
//# sourceMappingURL=WcDialogImages.js.map