import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Nobs } from "../../classes/helpers/Nobs";
import { createTravelDocument } from "../../code/firebase";
import { UploadNobs } from "../../code/nobs/UploadNobs";
import { WcUploadFotos } from "../upload-fotos/WcUploadFotos";
import { formStyles } from "./form-styles";

@customElement("wc-upload-form")
export class WcUploadForm extends LitElement {
  static get styles() {
    return [formStyles];
  };

  @property({ type: Object }) state: UploadNobs;

  setState(nobs: Nobs): void {
    this.state = new UploadNobs(nobs, this.state);
  };

  connectedCallback() {
    super.connectedCallback();
    const nobs = new Nobs();
    nobs.setProperty(this.state, 'id', '');
    this.setState(nobs);

  };

  async handleSubmit(e: any) {
    e.preventDefault();

    try {
      await createTravelDocument(this.state);

    } catch (error) {
      console.log(error);
    }
  };

  handleChange(e: { target: HTMLInputElement }): void {
    const nobs = new Nobs();
    const name = e.target.name;
    const value = e.target.value;

    nobs.setProperty(this.state, name, value);
    this.setState(nobs);
  };

  handleStory(e: { target: HTMLInputElement }): void {
    const nobs = new Nobs();
    const name = e.target.name;
    const value = e.target.value.split('_b');

    nobs.setProperty(this.state, name, value);
    this.setState(nobs);
  };

  handleLocation(e: { target: HTMLInputElement }): void {
    const nobs = new Nobs();
    const name = e.target.name;
    const value = e.target.value.split(',');

    nobs.setProperty(this.state, name, value);
    this.setState(nobs);
  };

  renderFileLoader(): LitElement {
    const foldername = this.state ? this.state.foldername : '';
    const date = this.state ? this.state.date : '';
    return new WcUploadFotos(foldername, date);
  };

  render(): TemplateResult {
    return html`
      <div class="upload-form">
        <form @submit=${this.handleSubmit}>
          <input name="headline" type="text" placeholder="headline" @change=${this.handleChange} required>
          <textarea name="story" placeholder="story about the day ..." @change=${this.handleStory}></textarea>
          <input name="date" type="date" @change=${this.handleChange} required>
          <input name="location" type="text" placeholder="location" @change=${this.handleLocation} required>
          <input name="popup" type="text" placeholder="popup" @change=${this.handleChange} required>
          <input name="image" type="text" placeholder="image" @change=${this.handleChange} required>
          <input name="foldername" type="text" placeholder="folder name" @change=${this.handleChange} required>

          <!-- ${this.renderFileLoader()} -->

          <button type="submit">ADD FOTO STORY</button>
        </form>
      </div>
    `;
  };
};
