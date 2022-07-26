import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { getTravelDocs } from "../../code/firebase";
import { createMap } from "../../code/leaflet";
import { FotoUploadDto } from "../../code/nobs/UploadNobs";
import { mapStyles } from "./map-styles";

@customElement("wc-fuerte-map-page")
export class WcFuerteMapPage extends LitElement {
  static get styles() {
    return [mapStyles];
  };

  @property({ type: Array }) fotos: Array<FotoUploadDto>;
  @query('#mapid') mapid: HTMLDivElement;

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
    console.log(this.fotos);
  };

  renderMap() {
    const mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'mapid');
    mapContainer.style.height = '100vh';
    mapContainer.style.width = '100vw';
    this.shadowRoot?.append(mapContainer);

    createMap(mapContainer, this.fotos);
  };

  render(): TemplateResult {
    return html`
        ${this.renderMap()}
    `;
  };
};