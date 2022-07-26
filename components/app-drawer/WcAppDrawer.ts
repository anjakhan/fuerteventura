import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../icons/WcIcon";

import { drawerStyles } from './drawer-styles';
import { config } from "../../config";
import { appUser } from "../../adminIndex";
import { iconName } from "../icons/WcIcon";

type callbackType = (selectedDrawer: string) => void;

@customElement("wc-app-drawer")
export class WcAppDrawer extends LitElement {
  static get styles() {
    return [drawerStyles];
  };

  @property({ type: String }) selectedDrawer: string = '';
  private drawerOpen: boolean = false;
  callback: callbackType | undefined;

  drawers: Array<{ name: string, title: string, icon: iconName }> = [{
    name: 'latest-story',
    title: 'Fotos',
    icon: 'camera-retro-duotone'
  }, {
    name: 'foto-preview',
    title: 'Kalender',
    icon: 'calendar-alt'
  }, {
    name: 'map',
    title: 'Karte',
    icon: 'map-duotone'
  }, {
    name: 'trip-details',
    title: 'Reisedaten',
    icon: 'plane-duotone'
  }];

  constructor(selectedDrawer: string) {
    super();

    this.selectedDrawer = selectedDrawer;
  };

  connectedCallback() {
    super.connectedCallback();
  };

  getDrawerSelection(callback: callbackType): void {
    this.callback = callback;
  };

  openDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
    this.requestUpdate();
  };

  setDrawerSelection(name: string): void {
    this.selectedDrawer = name;
    if (this.callback) {
      this.callback(this.selectedDrawer);
    };
  };

  render(): TemplateResult {
    return html`
      ${config.isMobile ? html`<wc-icon @click=${this.openDrawer} class="menu-icon" primaryColor="toolbar" icon=${this.drawerOpen ? 'close' : 'bars-light'}></wc-icon>` : ''} 
      <aside class="drawer ${!this.drawerOpen && config.isMobile ? 'hidden' : ''}">
        ${appUser === 'admin' ? html`<div class="tab ${this.selectedDrawer === 'upload' ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${(): void => this.setDrawerSelection('upload')}>Foto Upload</div>` : ''}
        
        ${appUser === 'admin' ? html`<div class="tab ${this.selectedDrawer === 'sightseeing' ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${(): void => this.setDrawerSelection('sightseeing')}>Sightseeing</div>` : ''}

        ${this.drawers.map(d => html`<div class="tab ${this.selectedDrawer === d.name ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${(): void => this.setDrawerSelection(d.name)}><wc-icon primaryColor=${this.selectedDrawer === d.name ? "green" : "toolbar"} icon=${d.icon}></wc-icon>${d.title}</div>`)}
      </aside>
    `;
  };
};
