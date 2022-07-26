import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FotoUploadDto } from "../../code/nobs/UploadNobs";
import { config } from "../../config";
import { WcDialogImage } from "../dialogs/WcDialogImages";
import { fotostoryStyles } from "./fotostoryStyles";

@customElement("wc-fotostory")
export class WcFotostory extends LitElement {
  static get styles() {
    return [fotostoryStyles];
  };

  @property({ type: Object }) fotostory: FotoUploadDto;
  @property({ type: Array }) images: Array<string>;

  constructor(fotostory: FotoUploadDto) {
    super();

    this.fotostory = fotostory;
  };

  connectedCallback() {
    super.connectedCallback();

    this.fotostory && this.getPics(this.fotostory.foldername);
  };

  getPics(foldername: string) {
    let urlList: Array<string> = [];
    fetch(`https://api.github.com/repos/anjakhan/fuerteventura/contents/assets/${foldername}`)
      .then(response => response.json())
      .then(data => {
        data.forEach((foto: { download_url: string }) => urlList.push(foto.download_url)) // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error))
    setTimeout(() => this.images = urlList, 2000);
  };

  renderImage(idx: number) {
    const td = new WcDialogImage(idx, this.images);
    td.showDialog();
  };

  render(): TemplateResult {
    return html`
    ${this.fotostory ? html`
      <div class="fotostory-container">
        <!-- <p>${this.fotostory.date}</p> -->
        <h1 class="title">${this.fotostory.headline}</h1>
        ${this.fotostory.story.map((story: string) => html`<p style="text-align: justify;">${story}</p>`)}
        <div class="image-container">
          ${this.images && this.images.length > 0 ? this.images.sort((a: any, b: any) => a < b ? -1 : 1).map((img: string, idx: number) => html`<img @click=${() => !config.isMobile && this.renderImage(idx)} src=${img} alt="fuerte">`) : html`<lottie-player class="lottie" src="https://assets9.lottiefiles.com/packages/lf20_mg67wxfu.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>`}
        </div>
        
        
      </div>
    ` : html`
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 50px;">
        <lottie-player class="lottie" src="https://assets1.lottiefiles.com/packages/lf20_ORPnX5.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
      </div>`}      
    `;
  };
};