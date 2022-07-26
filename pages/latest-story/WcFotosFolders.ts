import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTravelDocs } from "../../code/firebase";
import { FotoUploadDto } from "../../code/nobs/UploadNobs";
import { WcFotostory } from "../../components/fotostory/WcFotostory";
import { config } from "../../config";
import { fotosFoldersStyles } from "./fotos-folders-styles";

@customElement("wc-fotos-folders")
export class WcFotosFolders extends LitElement {
  static get styles() {
    return [fotosFoldersStyles];
  };

  @property({ type: Array }) fotos: Array<FotoUploadDto>;
  @property({ type: Object }) fotostory: FotoUploadDto;
  @property({ type: Boolean }) showFotostory: Boolean = false;

  connectedCallback() {
    super.connectedCallback();

    this.loadFotos();
  };

  async loadFotos() {
    const fotos: Array<FotoUploadDto> = [];
    try {
      await getTravelDocs()
        .then((data: any) => {
          data.forEach((doc: any) => fotos.push(doc));
        })
        .catch((error: string) => console.log('no traveldocs found', error));
    } catch (error) {
      console.log(error);
    }
    this.fotos = fotos;
  };

  renderFotostory(fotostory: FotoUploadDto) {
    this.fotostory = fotostory;
    this.showFotostory = true;
  };

  render(): TemplateResult {
    return html`
      ${this.showFotostory ? html`
        <p style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding-top: 30px; color: #555">
          <wc-icon @click=${() => this.showFotostory = false} primaryColor="gray" icon="angle-left" style="cursor: pointer; width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
          ${this.fotostory.date}
        </p>
        ${new WcFotostory(this.fotostory)}
        <div class="back-to-fotos" @click=${() => this.showFotostory = false}>
          <wc-icon primaryColor="gray" icon="angle-left" style="width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
          Zurück zu Fotos
        </div>
        ` : html`
        <div class="folder-container">
        ${this.fotos.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(f => html`
          <div class="folder" @click=${() => this.renderFotostory(f)}>
            <img src="https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/${f.foldername}/${f.image}" alt="folder">
            <div class="subtitle">${config.isMobile ? f.date : f.foldername}</div>
          </div>
        `)}
      </div>`}
    `;
  };
};