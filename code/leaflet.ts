import { config } from '../config';
import { FotoUploadDto } from './nobs/UploadNobs';

export const L = (<any>window).L;

const travelledPlaces: Array<{ name: string, location: Array<number>, date: string }> = [{
  name: "Camino Costa Ballena",
  location: [28.421440804718152, -13.853181596486714],
  date: "2021-06-08"
}, {
  name: "Ventura Shopping Center",
  location: [28.05377973446309, -14.323536843021353],
  date: "2021-06-09"
}, {
  name: "La Guirra Beach",
  location: [28.384905315405938, -13.863943972471807],
  date: "2021-06-11"
}, {
  name: "Punta del Bajo",
  location: [28.392091960114943, -13.853954683945577],
  date: "2021-06-11"
}, {
  name: "Cuevas de Ajuy",
  location: [28.403508295007967, -14.15554652495963],
  date: "2021-06-12"
}, {
  name: "Barranco de las Peñitas",
  location: [28.388711737434996, -14.10026879269423],
  date: "2021-06-12"
}, {
  name: "Gran Tarajal",
  location: [28.211533376782686, -14.021162616671948],
  date: "2021-06-15"
}, {
  name: "Aeródromo Abandonado",
  location: [28.08815093604716, -14.491244940249455],
  date: "2021-06-18"
}, {
  name: "Faro de Punta Jandía",
  location: [28.065974396783957, -14.507462812109857],
  date: "2021-06-18"
}, {
  name: "El Puertito",
  location: [28.07315393494029, -14.50021239147925],
  date: "2021-06-18"
}, {
  name: "Casa Winter",
  location: [28.102345138975522, -14.37578766980999],
  date: "2021-06-18"
}, {
  name: "Playa de Cofete",
  location: [28.11044360840116, -14.387941738698748],
  date: "2021-06-18"
}, {
  name: "Playa de Tebeto",
  location: [28.59043711382251, -14.034491306410063],
  date: "2021-06-19"
}, {
  name: "Museo del Queso Majorero & Windmill at Cactus Garden",
  location: [28.431295609244707, -14.012616205774854],
  date: "2021-06-19"
}, {
  name: "Centro de Interpretacion de los Molinos",
  location: [28.352985591513775, -14.03526101434743],
  date: "2021-06-19"
}, {
  name: "El Cotillo",
  location: [28.679841817744123, -14.01047660295504],
  date: "2021-06-27"
}, {
  name: "Faro del Tostón",
  location: [28.715918564960514, -14.013894141895339],
  date: "2021-06-27"
}, {
  name: "Majanicho (Popcornstrand)",
  location: [28.738853756396498, -13.937284246969872],
  date: "2021-06-27"
}, {
  name: "Faro de La Entallada",
  location: [28.230186008337327, -13.948505129072634],
  date: "2021-06-29"
}, {
  name: "Playa de los Molinos",
  location: [28.543041483673917, -14.06324981603934],
  date: "2021-07-02"
}, {
  name: "The Crunch",
  location: [28.159049607129603, -14.228790129156828],
  date: "2021-07-04"
}];

export const createMap = (mapid: HTMLDivElement, fotostory: Array<FotoUploadDto>) => {
  const zoom = config.isMobile ? 9 : 10;
  const map = L.map(mapid).setView([28.378412972969333, -14.115175194361001], zoom);

  const date: number = new Date().getDate();
  const month: number = new Date().getMonth() + 1;

  L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  }).addTo(map);

  //L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
  fotostory && fotostory.map((story: FotoUploadDto) => {
    const marker = L.marker([parseFloat(story.location[0]), parseFloat(story.location[1])]).addTo(map).bindPopup(`<b>${story.popup}</b><br>${story.date}`);
    new Date(story.date).getDate() === date - 1 && new Date(story.date).getMonth() + 1 === month && marker.openPopup();
  });

  travelledPlaces.map(p => {
    L.marker(p.location).addTo(map).bindPopup(`<b>${p.name}</b><br>${p.date}`)
  });
  // L.marker([28.49820981705814, -13.857695606907182]).addTo(map).bindPopup("<b>Puerto del Rosario</b><br>2021-06-13");
};

const seenSightseeings: Array<{ name: string, location: Array<number> }> = [{
  name: "Playa de Cofete",
  location: [28.11379522157828, -14.379502833804084]
}, {
  name: "Casa Winter",
  location: [28.101984775647256, -14.374352992864585]
}, {
  name: "Alter Flughafen",
  location: [28.088355722481484, -14.490396075367913]
}, {
  name: "Faro Punta Pesebre",
  location: [28.10895006773368, -14.49108272082651]
}, {
  name: "Playa El Puertito / Calle Piragua",
  location: [28.072240170400036, -14.501630074702538]
}, {
  name: "Leuchtturm Punta Jandia",
  location: [28.065916895878154, -14.507115275995393]
}, {
  name: "Playa de Tebeto",
  location: [28.59043711382251, -14.034491306410063]
}, {
  name: "Museo del Queso Majorero & Windmill at Cactus Garden",
  location: [28.431295609244707, -14.012616205774854]
}, {
  name: "Centro de Interpretacion de los Molinos",
  location: [28.352985591513775, -14.03526101434743]
}, {
  name: "Molino de viento histórico",
  location: [28.42140752547901, -13.989244030916215]
}, {
  name: "Barranco Encantado",
  location: [28.62997718488728, -14.004527277154441]
}, {
  name: "Playa de Esquinzo",
  location: [28.635045753245446, -14.02650183365281]
}, {
  name: "Playa de los Verilitos und Playa de Viejo (Corralejo)",
  location: [28.735037873613198, -13.86696250741795]
}, {
  name: "Corralejo City, Promenade, Glockenturm, Strandfiguren, Centro Commercial Shopping Center",
  location: [28.728652508179927, -13.864722454465213]
}, {
  name: "Playa de Sotavento de Jandía (Risco del Paso)",
  location: [28.111445623239355, -14.263561462164526]
}, {
  name: "Playa de Esquinzo (Süd) - Butihondom",
  location: [28.06896669729653, -14.305984029258461]
}, {
  name: "Sugarhouse Oceania Fuerteventura",
  location: [28.079850172259125, -14.295569603694068]
}, {
  name: "La Lajita & Oasis Park",
  location: [28.18751635455114, -14.156881222877573]
}, {
  name: "El Cotillo Beach",
  location: [28.690498290344827, -14.012006573483601]
}, {
  name: "Faro del Tostón",
  location: [28.715918564960514, -14.013894141895339]
}, {
  name: "Majanicho (Popcornstrand)",
  location: [28.743867423297875, -13.940907127283767]
}, {
  name: "Volcan Calderon Hondo",
  location: [28.703214296392897, -13.914806335677875]
}, {
  name: "Mirador Atlántico",
  location: [28.16713752105845, -14.207592644441318]
}, {
  name: "Faro de La Entallada",
  location: [28.230186008337327, -13.948505129072634]
}, {
  name: "Playa & Faro de Morro Jable",
  location: [28.045649107870403, -14.33409757065514]
}, {
  name: "Playa de los Molinos",
  location: [28.543041483673917, -14.06324981603934]
}, {
  name: "Salt Museum Salinas del Carmen",
  location: [28.36751277996282, -13.870040205775991]
}, {
  name: "Isla de Lobos",
  location: [28.751735636622836, -13.821098187940857]
}, {
  name: "La Pared Beach - Playa del Viejo Rey (andere Seite)",
  location: [28.214773147724674, -14.222053986142976]
}];

if (seenSightseeings) { };

const sightseeings: Array<{ name: string, location: Array<number> }> = [{
  name: "Playa de La Señora",
  location: [28.05506304878142, -14.385447896561574]
}, {
  name: "Puerto Morro Jable",
  location: [28.04925525097606, -14.358251774389876]
}, {
  name: "Pozo Negro von Klippen aus",
  location: [28.32364665275606, -13.8956818333923]
}, {
  name: "Playa de Garcey",
  location: [28.34465358106306, -14.178945913729404]
}, {
  name: "Playa de la Solapa",
  location: [28.364255577905794, -14.165528766748274]
}, {
  name: "Playa de los Mozos",
  location: [28.494250744508356, -14.089520973244307]
}, {
  name: "Playa de Jarubio",
  location: [28.571466079367408, -14.047987991584325]
}, {
  name: "Piedra Playa",
  location: [28.665503322445627, -14.012452738522926]
}, {
  name: "Playa & Cueva de Playa en Tarajalejo & Tuineje mirador terraza",
  location: [28.19059836096522, -14.111664362247657]
}, {
  name: "Montaña de Tindaya",
  location: [28.583962147073578, -13.96742533840112]
}];


export const createToDoMap = (mapid: HTMLDivElement) => {
  const zoom = config.isMobile ? 9 : 10;
  const map = L.map(mapid).setView([28.378412972969333, -14.115175194361001], zoom);

  L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  }).addTo(map);

  //L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
  sightseeings.map((s: { name: string, location: Array<number> }) => {
    L.marker(s.location).addTo(map).bindPopup(`<b>${s.name}</b><br>${s.location}`);
  });
};