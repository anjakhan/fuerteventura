import { LitElement, html, TemplateResult } from "lit";
import { customElement, query } from "lit/decorators.js";
import { createToDoMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";

@customElement("wc-sightseeing-page")
export class WcSightseeingPage extends LitElement {
  static get styles() {
    return [mapStyles];
  };

  @query('#mapid') mapid: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
  };

  renderMap() {
    const mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'mapid');
    mapContainer.style.height = '100vh';
    mapContainer.style.width = '100vw';
    this.shadowRoot?.append(mapContainer);

    createToDoMap(mapContainer);
  };

  render(): TemplateResult {
    return html`
      ${this.renderMap()}
    `;
  };
};