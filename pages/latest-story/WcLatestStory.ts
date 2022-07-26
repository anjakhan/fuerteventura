import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTravelDocs } from "../../code/firebase";
import { FotoUploadDto } from "../../code/nobs/UploadNobs";
import { WcFotostory } from "../../components/fotostory/WcFotostory";

@customElement("wc-latest-story")
export class WcLatestStory extends LitElement {
  static get styles() {
    return [];
  };

  @property({ type: Array }) fotos: Array<FotoUploadDto>;
  @property({ type: Object }) fotostory: FotoUploadDto;
  date: number = new Date(new Date().setDate(new Date().getDate() - 1)).getDate();
  month: number = new Date().getDate() === 1 ? new Date().getMonth() : new Date().getMonth() + 1;

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
    this.getLatestFotos();
  };

  getLatestFotos(): void {
    const filter = this.fotos.filter((story: FotoUploadDto) => new Date(story.date).getDate() === this.date && new Date(story.date).getMonth() + 1 === this.month);
    this.fotostory = filter[0];
  };

  renderFotostory() {
    return new WcFotostory(this.fotostory);
  };

  render(): TemplateResult {
    return html`
      <div>
        ${this.renderFotostory()}
      </div>
    `;
  };
};