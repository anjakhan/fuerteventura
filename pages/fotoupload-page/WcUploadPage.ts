import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { uploadStyles } from './upload-styles';
import '../../components/upload-form/WcUploadForm';

@customElement("wc-upload-page")
export class WcUploadPage extends LitElement {
  static get styles() {
    return [uploadStyles];
  };

  render(): TemplateResult {
    return html`
      <div class="upload-page">
        <h1 class="title">Upload Foto Story</h1>
        <wc-upload-form></wc-upload-form>
      </div>
    `;
  };
};
