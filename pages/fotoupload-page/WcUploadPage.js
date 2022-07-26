var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { uploadStyles } from './upload-styles';
import '../../components/upload-form/WcUploadForm';
let WcUploadPage = class WcUploadPage extends LitElement {
    static get styles() {
        return [uploadStyles];
    }
    ;
    render() {
        return html `
      <div class="upload-page">
        <h1 class="title">Upload Foto Story</h1>
        <wc-upload-form></wc-upload-form>
      </div>
    `;
    }
    ;
};
WcUploadPage = __decorate([
    customElement("wc-upload-page")
], WcUploadPage);
export { WcUploadPage };
;
//# sourceMappingURL=WcUploadPage.js.map