import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, query } from "lit/decorators.js";

@customElement("wc-map-component")
export class WcMapComponent extends LitElement {
  @query('#mapid') mapid: HTMLDivElement;

  static get styles() {
    return [css`
      .container { height: 100%; width: 100% }
    `];
  };

  render(): TemplateResult {
    return html`
      <div class="container" id="mapid"></div>
    `;
  };
};