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
import { fotoPreviewStyles } from "./fotopreview-styles";
let WcFotoPreview = class WcFotoPreview extends LitElement {
    constructor() {
        super(...arguments);
        this.date = new Date();
        this.month = 'Juli';
        this.showStory = false;
    }
    static get styles() {
        return [fotoPreviewStyles];
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
            console.log(this.fotos);
        });
    }
    ;
    renderFotostory() {
        return new WcFotostory(this.fotostory);
    }
    ;
    renderFotos(daySelected, monthSelected) {
        if (this.month === 'Juni' && daySelected < 8)
            return;
        if (this.month === 'Juli' && daySelected > 6)
            return;
        const filter = this.fotos.filter((story) => new Date(story.date).getDate() === daySelected && new Date(story.date).getMonth() + 1 === monthSelected);
        this.fotostory = filter[0];
        this.showStory = true;
    }
    ;
    renderJuneCalendar() {
        const array = [];
        for (let i = 1; i <= 30; i++) {
            array.push(i);
        }
        return html `
      <div class="date-box disabled"></div>
      ${array.map((x, idx) => html `
      <div class="date-box" @click=${() => this.renderFotos(idx + 1, 6)} style="cursor: ${idx < 7 ? 'default' : 'cursor'}">
        <span class="date-text ${this.date.getDate() === idx + 1 && this.date.getMonth() === 5 ? 'today' : ''}">${idx + 1}</span>
      </div>`)}
      <div class="date-box disabled"></div><div class="date-box disabled"></div>
      <div class="date-box disabled"></div><div class="date-box disabled"></div>
    `;
    }
    ;
    renderJulyCalendar() {
        const array = [];
        for (let i = 1; i <= 31; i++) {
            array.push(i);
        }
        return html `
      <div class="date-box disabled"></div>
      <div class="date-box disabled"></div>
      <div class="date-box disabled"></div>
      ${array.map((x, idx) => html `
      <div class="date-box" @click=${() => this.renderFotos(idx + 1, 7)} style="cursor: ${idx > 5 ? 'default' : 'cursor'}">
        <span class="date-text ${this.date.getDate() === idx + 1 && this.date.getMonth() === 6 ? 'today' : ''}">${idx + 1}</span>
      </div>`)}
      <div class="date-box disabled"></div>
    `;
    }
    render() {
        return html `
      <div class="calendar-container">
        <!-- <div class="header">
          <wc-icon primaryColor="aqua" icon="camera-retro-duotone" style="height: 35px; width: 35px; margin-right: 15px;"></wc-icon>
          <h1 class="title"> Sonnige Grüße von der Insel</h1>
          <wc-icon primaryColor="aqua" icon="camera-retro-duotone" style="height: 35px; width: 35px; margin-left: 15px;"></wc-icon>
        </div> -->
        <div class="foto-story-container ${this.showStory ? '' : 'hidden'}">
          ${this.renderFotostory()}
          <div class="back-to-calendar" @click=${() => this.showStory = false}>
          <wc-icon primaryColor="gray" icon="angle-left" style="width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
            Zurück zum Kalender
          </div>
        </div>
        <div class="foto-calendar ${this.showStory ? 'hidden' : ''}">
          <img src=${this.month === 'Juni' ? "https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/fuerteventura_1.jpeg" : "https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/fuerteventura_2.jpeg"} alt="fuerte">
          <div class="calendar-month">
            <wc-icon primaryColor=${this.month === 'Juli' ? "warning" : "ocher"} icon="angle-left" style=${this.month === 'Juli' && 'cursor: pointer'} @click=${() => this.month = 'Juni'}></wc-icon>
            ${this.month} 2021
            <wc-icon primaryColor=${this.month === 'Juni' ? "warning" : "ocher"} icon="angle-right" style=${this.month === 'Juni' && 'cursor: pointer'} @click=${() => this.month = 'Juli'}></wc-icon>
          </div>
          <div class="table-header">
            <div class="calendar-day">Mo</div>
            <div class="calendar-day">Di</div>
            <div class="calendar-day">Mi</div>
            <div class="calendar-day">Do</div>
            <div class="calendar-day">Fr</div>
            <div class="calendar-day">Sa</div>
            <div class="calendar-day">So</div>
          </div>

          <div class="month june ${this.month === 'Juni' ? '' : 'hidden'}">
            ${this.renderJuneCalendar()}
          </div>
          <div class="month july ${this.month === 'Juli' ? '' : 'hidden'}">
            ${this.renderJulyCalendar()}
          </div>
        </div> 
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: Array })
], WcFotoPreview.prototype, "fotos", void 0);
__decorate([
    property({ type: Object })
], WcFotoPreview.prototype, "fotostory", void 0);
__decorate([
    property({ type: Object })
], WcFotoPreview.prototype, "date", void 0);
__decorate([
    property({ type: String })
], WcFotoPreview.prototype, "month", void 0);
__decorate([
    property({ type: Boolean })
], WcFotoPreview.prototype, "showStory", void 0);
WcFotoPreview = __decorate([
    customElement("wc-foto-preview")
], WcFotoPreview);
export { WcFotoPreview };
;
//# sourceMappingURL=WcFotoPreview.js.map