import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { welcomePageStyles } from './welcome-page-styles';


@customElement("wc-welcome-page")
export class WcWelcomePage extends LitElement {
  static get styles() {
    return [welcomePageStyles];
  };

  render(): TemplateResult {
    return html`
      <div class="welcome-page">
        <h1 class="title">Urlaub auf den Kanaren</h1>
      </div>
    `;
  };
};

//<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_ORPnX5.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>