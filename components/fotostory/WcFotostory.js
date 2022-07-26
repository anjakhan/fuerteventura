var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "../../config";
import { WcDialogImage } from "../dialogs/WcDialogImages";
import { fotostoryStyles } from "./fotostoryStyles";
let WcFotostory = class WcFotostory extends LitElement {
    constructor(fotostory) {
        super();
        this.fotostory = fotostory;
    }
    static get styles() {
        return [fotostoryStyles];
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.fotostory && this.getPics(this.fotostory.foldername);
    }
    ;
    getPics(foldername) {
        let urlList = [];
        fetch(`https://api.github.com/repos/anjakhan/fuerteventura/contents/assets/${foldername}`)
            .then(response => response.json())
            .then(data => {
            data.forEach((foto) => urlList.push(foto.download_url));
        })
            .catch(error => console.error(error));
        setTimeout(() => this.images = urlList, 2000);
    }
    ;
    renderImage(idx) {
        const td = new WcDialogImage(idx, this.images);
        td.showDialog();
    }
    ;
    render() {
        return html `
    ${this.fotostory ? html `
      <div class="fotostory-container">
        <!-- <p>${this.fotostory.date}</p> -->
        <h1 class="title">${this.fotostory.headline}</h1>
        ${this.fotostory.story.map((story) => html `<p style="text-align: justify;">${story}</p>`)}
        <div class="image-container">
          ${this.images && this.images.length > 0 ? this.images.sort((a, b) => a < b ? -1 : 1).map((img, idx) => html `<img @click=${() => !config.isMobile && this.renderImage(idx)} src=${img} alt="fuerte">`) : html `<lottie-player class="lottie" src="https://assets9.lottiefiles.com/packages/lf20_mg67wxfu.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>`}
        </div>
        
        
      </div>
    ` : html `
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 50px;">
        <lottie-player class="lottie" src="https://assets1.lottiefiles.com/packages/lf20_ORPnX5.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
      </div>`}      
    `;
    }
    ;
};
__decorate([
    property({ type: Object })
], WcFotostory.prototype, "fotostory", void 0);
__decorate([
    property({ type: Array })
], WcFotostory.prototype, "images", void 0);
WcFotostory = __decorate([
    customElement("wc-fotostory")
], WcFotostory);
export { WcFotostory };
;
//# sourceMappingURL=WcFotostory.js.map