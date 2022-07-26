var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
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
const validFileType = (file) => fileTypes.includes(file.type);
let WcUploadFotos = class WcUploadFotos extends LitElement {
    constructor(foldername, date) {
        super();
        this.foldername = foldername;
        this.date = date;
    }
    static get styles() {
        return [fotoUploadStyles];
    }
    ;
    ;
    updateImageDisplay(e) {
        console.log(e.target.files);
        const curFiles = e.target.files;
        if (curFiles) {
            for (const file of curFiles) {
                if (validFileType(file)) {
                    const image = document.createElement('img');
                    const foldername = this.date + '_' + this.foldername;
                    image.src = URL.createObjectURL(file);
                    image.alt = file.name;
                    uploadImage(file, foldername);
                }
                ;
            }
            ;
            alert('files uploaded');
        }
        ;
    }
    ;
    render() {
        return html `
      <div class="foto-upload-container">
        <div class="file-loader">
          <label htmlFor='myfile'>UPLOAD FOTOS</label>
          <input type='file' name='myfile' id='myfile' accept=".jpg, .jpeg, .png, .tiff, .bmp" className='file-input' @change=${(e) => this.updateImageDisplay(e)} multiple />
        </div>
        <div className="preview">
        </div>        
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: String })
], WcUploadFotos.prototype, "foldername", void 0);
__decorate([
    property({ type: String })
], WcUploadFotos.prototype, "date", void 0);
__decorate([
    query('.preview')
], WcUploadFotos.prototype, "preview", void 0);
__decorate([
    query('.file-input')
], WcUploadFotos.prototype, "fileInput", void 0);
WcUploadFotos = __decorate([
    customElement("wc-upload-fotos")
], WcUploadFotos);
export { WcUploadFotos };
;
//# sourceMappingURL=WcUploadFotos.js.map