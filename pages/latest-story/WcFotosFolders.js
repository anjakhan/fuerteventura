var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTravelDocs } from "../../code/firebase";
import { WcFotostory } from "../../components/fotostory/WcFotostory";
import { config } from "../../config";
import { fotosFoldersStyles } from "./fotos-folders-styles";
let WcFotosFolders = class WcFotosFolders extends LitElement {
    constructor() {
        super(...arguments);
        this.showFotostory = false;
    }
    static get styles() {
        return [fotosFoldersStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.loadFotos();
    }
    ;
    loadFotos() {
        return __awaiter(this, void 0, void 0, function* () {
            const fotos = [];
            try {
                yield getTravelDocs()
                    .then((data) => {
                    data.forEach((doc) => fotos.push(doc));
                })
                    .catch((error) => console.log('no traveldocs found', error));
            }
            catch (error) {
                console.log(error);
            }
            this.fotos = fotos;
        });
    }
    ;
    renderFotostory(fotostory) {
        this.fotostory = fotostory;
        this.showFotostory = true;
    }
    ;
    render() {
        return html `
      ${this.showFotostory ? html `
        <p style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding-top: 30px; color: #555">
          <wc-icon @click=${() => this.showFotostory = false} primaryColor="gray" icon="angle-left" style="cursor: pointer; width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
          ${this.fotostory.date}
        </p>
        ${new WcFotostory(this.fotostory)}
        <div class="back-to-fotos" @click=${() => this.showFotostory = false}>
          <wc-icon primaryColor="gray" icon="angle-left" style="width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
          Zurück zu Fotos
        </div>
        ` : html `
        <div class="folder-container">
        ${this.fotos.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(f => html `
          <div class="folder" @click=${() => this.renderFotostory(f)}>
            <img src="https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/${f.foldername}/${f.image}" alt="folder">
            <div class="subtitle">${config.isMobile ? f.date : f.foldername}</div>
          </div>
        `)}
      </div>`}
    `;
    }
    ;
};
__decorate([
    property({ type: Array })
], WcFotosFolders.prototype, "fotos", void 0);
__decorate([
    property({ type: Object })
], WcFotosFolders.prototype, "fotostory", void 0);
__decorate([
    property({ type: Boolean })
], WcFotosFolders.prototype, "showFotostory", void 0);
WcFotosFolders = __decorate([
    customElement("wc-fotos-folders")
], WcFotosFolders);
export { WcFotosFolders };
;
//# sourceMappingURL=WcFotosFolders.js.map