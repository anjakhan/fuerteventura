import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { uploadImage } from "../../code/firebase";
import { fotoUploadStyles } from "./foto-upload-styles";

const fileTypes = [
  "image/jpg",
  "image/bmp",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
];

const validFileType = (file: any) => fileTypes.includes(file.type);

@customElement("wc-upload-fotos")
export class WcUploadFotos extends LitElement {
  static get styles() {
    return [fotoUploadStyles];
  };

  @property({ type: String }) foldername: string;
  @property({ type: String }) date: Date | string;

  @query('.preview') preview: HTMLDivElement;
  @query('.file-input') fileInput: HTMLInputElement;

  constructor(foldername: string, date: Date | string) {
    super();
    this.foldername = foldername;
    this.date = date;
  };

  updateImageDisplay(e: any): void {
    console.log(e.target.files)
    const curFiles = e.target.files;

    if (curFiles) {
      for (const file of curFiles) {
        if (validFileType(file)) {
          const image = document.createElement('img');
          const foldername = this.date + '_' + this.foldername
          image.src = URL.createObjectURL(file);
          image.alt = file.name;
          uploadImage(file, foldername);
        };
      };
      alert('files uploaded');
    };
  };

  render(): TemplateResult {
    return html`
      <div class="foto-upload-container">
        <div class="file-loader">
          <label htmlFor='myfile'>UPLOAD FOTOS</label>
          <input type='file' name='myfile' id='myfile' accept=".jpg, .jpeg, .png, .tiff, .bmp" className='file-input' @change=${(e: MouseEvent): void => this.updateImageDisplay(e)} multiple />
        </div>
        <div className="preview">
        </div>        
      </div>
    `;
  };
};
