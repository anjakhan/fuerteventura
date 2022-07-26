var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const firebase = window.firebase;
const config$1 = {
    apiKey: "AIzaSyBUbyQiqE7TSAS2J5iIVII1Z99tKdd0AuE",
    authDomain: "fuerteventura-d4e75.firebaseapp.com",
    projectId: "fuerteventura-d4e75",
    storageBucket: "fuerteventura-d4e75.appspot.com",
    messagingSenderId: "378393506142",
    appId: "1:378393506142:web:4d16e60264d0388a685fcf"
};
firebase.initializeApp(config$1);
const checkErrorCode = (errorCode) => {
    const errorContainer = document.getElementById("errorContainer");
    const errorWrapper = document.getElementById("errorWrapper");
    errorContainer ? errorContainer.style.display = "" : false;
    if (errorCode === "auth/email-already-in-use") {
        errorWrapper ? errorWrapper.innerHTML = "This email address is already in use. <br>Did you mean to sign in?" : "";
    }
    else if (errorCode === "auth/invalid-email") {
        errorWrapper ? errorWrapper.textContent = "Invalid e-mail address!" : "";
    }
    else if (errorCode === "auth/weak-password") {
        errorWrapper ? errorWrapper.textContent = "Your password is weaaaak!" : "";
    }
    else if (errorCode === "auth/wrong-password") {
        errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
    }
    else if (errorCode === "auth/user-not-found") {
        errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
    }
    else if (errorCode === "auth/too-many-requests") {
        errorWrapper ? errorWrapper.innerHTML = "Access to this account has been temporarily <br>disabled due to many failed login attempts." : "";
    }
};
function signinWithGoogle() {
    return __awaiter$5(this, void 0, void 0, function* () {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const userCredential = yield firebase.auth().signInWithPopup(provider);
            return userCredential;
        }
        catch (error) {
            const errorCode = error.code;
            checkErrorCode(errorCode);
            throw error;
        }
    });
}
function signinUser(email, password) {
    return __awaiter$5(this, void 0, void 0, function* () {
        try {
            const userCredential = yield firebase.auth().signInWithEmailAndPassword(email, password);
            return userCredential;
        }
        catch (error) {
            const errorCode = error.code;
            checkErrorCode(errorCode);
            throw error;
        }
    });
}
const createTravelDocument = (traveldoc) => {
    firestore.collection("fuerte").add({
        id: '',
        headline: traveldoc.headline,
        story: traveldoc.story,
        foldername: traveldoc.date + '_' + traveldoc.foldername,
        date: traveldoc.date,
        location: traveldoc.location,
        popup: traveldoc.popup,
        image: traveldoc.image
    })
        .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert('Fotostory created');
        firestore.collection('fuerte').doc(`${docRef.id}`).set({
            id: docRef.id
        }, { merge: true });
    })
        .catch((error) => {
        console.error("Error adding document: ", error);
    });
};
const getTravelDocs = () => {
    const docs = firestore.collection("fuerte").get()
        .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
    });
    return docs;
};
const uploadImage = (file, foldername) => {
    const storage = firebase.storage().ref(`${foldername}/${file.name}`);
    storage.put(file);
};
const firestore = firebase.firestore();

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2,i$4,s$4,e$3;const o$6=globalThis.trustedTypes,l$2=o$6?o$6.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$5=`lit$${(Math.random()+"").slice(9)}$`,h$2="?"+n$5,r$2=`<${h$2}>`,u=document,c=(t="")=>u.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$2=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c(),t),t,void 0,s);}return n.I(t),n},E=u.createTreeWalker(u,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m?u=f:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$2:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$5+a):s+n$5+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$2?l$2.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$5)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$5),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L$1:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$5),i=t.length-1;if(i>0){e.textContent=o$6?o$6.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c());}}}else if(8===e.nodeType)if(e.data===h$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$5,t+1));)d.push({type:7,index:l}),t+=n$5.length-1;}l++;}}static createElement(t,i){const s=u.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$2(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c()),this.k(c()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L$1 extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}null===(i$4=(t$2=globalThis).litHtmlPlatformSupport)||void 0===i$4||i$4.call(t$2,N,C),(null!==(s$4=(e$3=globalThis).litHtmlVersions)&&void 0!==s$4?s$4:e$3.litHtmlVersions=[]).push("2.0.0-rc.2");

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$2=Symbol();class n$4{constructor(t,n){if(n!==e$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t$1&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const s$3=t=>new n$4(t+"",e$2),o$5=new Map,r$1=(t,...s)=>{const r=s.reduce(((e,s,o)=>e+(t=>{if(t instanceof n$4)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[o+1]),t[0]);let i=o$5.get(r);return void 0===i&&o$5.set(r,i=new n$4(r,e$2)),i},i$3=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style");n.textContent=t.cssText,e.appendChild(n);}));},S=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return s$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2,e$1,h$1,r;const o$4={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$3=(t,i)=>i!==t&&(i==i||t==t),l$1={attribute:!0,type:String,converter:o$4,reflect:!1,hasChanged:n$3};class a$1 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$1}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i));}else void 0!==i&&s.push(S(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$3(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$1){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$4.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$4.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$3)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.shadowRootOptions={mode:"open"},null===(e$1=(s$2=globalThis).reactiveElementPlatformSupport)||void 0===e$1||e$1.call(s$2,{ReactiveElement:a$1}),(null!==(h$1=(r=globalThis).reactiveElementVersions)&&void 0!==h$1?h$1:r.reactiveElementVersions=[]).push("1.0.0-rc.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var i$2,l,o$3,s$1,n$2,a;(null!==(i$2=(a=globalThis).litElementVersions)&&void 0!==i$2?i$2:a.litElementVersions=[]).push("3.0.0-rc.1");class h extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h.finalized=!0,h._$litElement$=!0,null===(o$3=(l=globalThis).litElementHydrateSupport)||void 0===o$3||o$3.call(l,{LitElement:h}),null===(n$2=(s$1=globalThis).litElementPlatformSupport)||void 0===n$2||n$2.call(s$1,{LitElement:h});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$1(e,n)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$2=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o$1(o,r){return o$2({descriptor:t=>{const i={get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(o)},enumerable:!0,configurable:!0};if(r){const r="symbol"==typeof t?Symbol():"__"+t;i.get=function(){var t;return void 0===this[r]&&(this[r]=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(o)),this[r]};}return i}})}

function assertNever(x, msg = "") {
    const eMsg = msg || "Unexpected object: " + x;
    throw new Error(eMsg);
}
function createOverlayDiv() {
    const div = document.createElement("div");
    div.style.left = "0";
    div.style.top = "0";
    div.style.bottom = "0";
    div.style.right = "0";
    div.style.position = "absolute";
    div.style.backgroundColor = "transparent";
    div.style.cursor = "grab";
    return div;
}
function isMobile(mobileDeviceWidth = 896) {
    const mq = window.matchMedia(`(min-width:  ${mobileDeviceWidth + 1}px)`);
    return !mq.matches;
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=t=>(...i)=>({_$litDirective$:t,values:i});class s{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends s{constructor(i){if(super(i),this.vt=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A)return this.Vt=void 0,this.vt=r;if(r===w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=i(n);

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function getIcon(icon) {
    switch (icon) {
        case "docRef":
            return `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"   viewBox="50 50 412 412"   xml:space="preserve"><g>    <polygon points="272,160 352,160 352,240 384,240 384,128 272,128 	"/><polygon points="160,240 160,160 240,160 240,128 128,128 128,240 	"/>  <polygon points="240,352 160,352 160,272 128,272 128,384 240,384 	"/>    <polygon points="352,272 352,352 272,352 272,384 384,384 384,272 	"/></g></svg>`;
        case "image":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM112 232c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm207.029 23.029L224 270.059l-31.029-31.029c-9.373-9.373-24.569-9.373-33.941 0l-88 88A23.998 23.998 0 0 0 64 344v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88c-9.373-9.372-24.569-9.372-33.942 0zM416 352H96v-4.686l80-80 48 48 112-112 80 80V352z"/></svg>`;
        case "help":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M200.343 0C124.032 0 69.761 31.599 28.195 93.302c-14.213 21.099-9.458 49.674 10.825 65.054l42.034 31.872c20.709 15.703 50.346 12.165 66.679-8.51 21.473-27.181 28.371-31.96 46.132-31.96 10.218 0 25.289 6.999 25.289 18.242 0 25.731-109.3 20.744-109.3 122.251V304c0 16.007 7.883 30.199 19.963 38.924C109.139 360.547 96 386.766 96 416c0 52.935 43.065 96 96 96s96-43.065 96-96c0-29.234-13.139-55.453-33.817-73.076 12.08-8.726 19.963-22.917 19.963-38.924v-4.705c25.386-18.99 104.286-44.504 104.286-139.423C378.432 68.793 288.351 0 200.343 0zM192 480c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm50.146-186.406V304c0 8.837-7.163 16-16 16h-68.292c-8.836 0-16-7.163-16-16v-13.749c0-86.782 109.3-57.326 109.3-122.251 0-32-31.679-50.242-57.289-50.242-33.783 0-49.167 16.18-71.242 44.123-5.403 6.84-15.284 8.119-22.235 2.848l-42.034-31.872c-6.757-5.124-8.357-14.644-3.62-21.677C88.876 60.499 132.358 32 200.343 32c70.663 0 146.089 55.158 146.089 127.872 0 96.555-104.286 98.041-104.286 133.722z"></path></svg>`;
        case "bezier":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M576 176c35.35 0 64-28.65 64-64s-28.65-64-64-64c-29.79 0-54.6 20.44-61.74 48H400V64c0-17.67-14.33-32-32-32h-96c-17.67 0-32 14.33-32 32v32H125.74C118.6 68.44 93.79 48 64 48 28.65 48 0 76.65 0 112s28.65 64 64 64c29.79 0 54.6-20.44 61.74-48h112.81c-80.61 31.51-135.13 105.79-141.27 192H64c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32h-30.73c5.76-69.41 48.06-129.54 111.08-158.25.96 16.81 14.6 30.25 31.65 30.25h96c17.05 0 30.69-13.44 31.65-30.25 63.02 28.72 105.32 88.84 111.08 158.25H480c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32h-33.27c-6.13-86.21-60.66-160.49-141.27-192h112.81c7.13 27.56 31.94 48 61.73 48zM160 448H64v-96h96v96zM64 144c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zm304 16h-96V64h96v96zm208 288h-96v-96h96v96zm0-368c17.64 0 32 14.36 32 32s-14.36 32-32 32-32-14.36-32-32 14.36-32 32-32z"/></svg>`;
        case "pathText":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">	<path  d="M61.78,19.86l-3.6,5.15c-0.36,0.52-1.07,0.64-1.59,0.28l-1.87-1.31c-0.52-0.36-0.64-1.07-0.28-1.59l2.29-3.28		l-6.68-4.66L36.96,33.19l2.69,1.88c0.52,0.36,0.64,1.07,0.28,1.59l-1.31,1.87c-0.36,0.52-1.07,0.64-1.59,0.28l-9.13-6.38		c-0.52-0.36-0.64-1.07-0.28-1.59l1.31-1.87c0.36-0.52,1.07-0.64,1.59-0.28l2.69,1.88L46.3,11.84l-6.68-4.66l-2.29,3.28		c-0.36,0.52-1.07,0.64-1.59,0.28l-1.87-1.31c-0.52-0.36-0.64-1.07-0.28-1.59l3.6-5.15c0.72-1.03,2.15-1.29,3.18-0.56l20.85,14.56		C62.25,17.4,62.5,18.83,61.78,19.86z"/>	<path   d="M43.23,61.54c-0.9,0-1.75-0.54-2.11-1.42C39.48,56.1,35.49,48.5,27.18,42.8c-8.77-6.01-17.75-6.78-22.34-6.76		c-0.01,0-0.02,0-0.03,0c-1.24,0-2.26-1-2.27-2.25c-0.02-1.26,0.99-2.29,2.25-2.3c5.11-0.06,15.17,0.84,24.97,7.55		c9.3,6.37,13.76,14.87,15.59,19.37c0.47,1.16-0.09,2.49-1.25,2.96C43.81,61.49,43.52,61.54,43.23,61.54z"/> </svg>`;
        case "text":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M448 48v72a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8V64H240v384h72a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H136a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h72V64H32v56a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V48a16 16 0 0 1 16-16h416a16 16 0 0 1 16 16z"/></svg>`;
        case "magnet":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M372 32c-19.9 0-36 16.1-36 36v172c0 64-40 96-79.9 96-40 0-80.1-32-80.1-96V68c0-19.9-16.1-36-36-36H36.4C16.4 32 .2 48.3.4 68.4c.3 24.5.6 58.4.7 91.6H0v32h1.1C1 218.3.7 242 0 257.3 0 408 136.2 504 256.8 504 377.5 504 512 408 512 257.3V68c0-19.9-16.1-36-36-36H372zM36.5 68H140v92H37.1c-.1-33.4-.4-67.4-.6-92zM476 258.1c-.1 30.4-6.6 59.3-19.4 85.8-11.9 24.9-29 47.2-50.8 66.3-20.6 18.1-45.2 32.9-71.2 42.9-25.5 9.8-52.4 15-77.9 15-25.5 0-52.5-5.2-78.2-15-26.2-10-51-24.9-71.8-43-22-19.2-39.2-41.5-51.3-66.3-12.9-26.5-19.4-55.3-19.6-85.6.7-15.9 1-39.7 1.1-66.1H140v48c0 49.2 18.9 79.7 34.8 96.6 10.8 11.5 23.5 20.4 37.8 26.5 13.8 5.9 28.5 8.9 43.5 8.9s29.7-3 43.5-8.9c14.3-6.1 27-15 37.7-26.5 15.8-16.9 34.7-47.4 34.7-96.6v-48h102.9c.1 26.2.4 50.1 1.1 66zM372 160V68h103.5c-.3 24.6-.6 58.6-.6 92H372z"/></svg>`;
        case "pointer":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M154.149 488.438l-41.915-101.865-46.788 52.8C42.432 465.345 0 448.788 0 413.5V38.561c0-34.714 41.401-51.675 64.794-26.59L309.547 274.41c22.697 24.335 6.074 65.09-27.195 65.09h-65.71l42.809 104.037c8.149 19.807-1.035 42.511-20.474 50.61l-36 15.001c-19.036 7.928-40.808-1.217-48.828-20.71zm-31.84-161.482l61.435 149.307c1.182 2.877 4.117 4.518 6.926 3.347l35.999-15c3.114-1.298 4.604-5.455 3.188-8.896L168.872 307.5h113.479c5.009 0 7.62-7.16 3.793-11.266L41.392 33.795C37.785 29.932 32 32.879 32 38.561V413.5c0 5.775 5.935 8.67 9.497 4.65l80.812-91.194z"/></svg>`;
        case "collapseLeft":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M153.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L192.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L153 264.5c-4.6-4.7-4.6-12.3.1-17zm-128 17l117.8 116c4.7 4.7 12.3 4.7 17 0l7.1-7.1c4.7-4.7 4.7-12.3 0-17L64.7 256l102.2-100.4c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L25 247.5c-4.6 4.7-4.6 12.3.1 17z"/></svg>`;
        case "expandLeft":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z"/></svg>`;
        case "edit":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"/></svg>`;
        case "pen":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M493.25 56.26l-37.51-37.51C443.25 6.25 426.87 0 410.49 0s-32.76 6.25-45.26 18.74L12.85 371.12.15 485.34C-1.45 499.72 9.88 512 23.95 512c.89 0 1.78-.05 2.69-.15l114.14-12.61 352.48-352.48c24.99-24.99 24.99-65.51-.01-90.5zM126.09 468.68l-93.03 10.31 10.36-93.17 263.89-263.89 82.77 82.77-263.99 263.98zm344.54-344.54l-57.93 57.93-82.77-82.77 57.93-57.93c6.04-6.04 14.08-9.37 22.63-9.37 8.55 0 16.58 3.33 22.63 9.37l37.51 37.51c12.47 12.48 12.47 32.78 0 45.26z"/></svg>`;
        case "pencil-ruler":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.71 368.14L379.88 245.31l49.4-49.4 68.65-68.66c18.76-18.76 18.75-49.17 0-67.93l-45.25-45.25C443.3 4.69 431 0 418.71 0s-24.59 4.69-33.97 14.07l-68.65 68.64-49.4 49.4L143.87 9.29C137.68 3.1 129.56 0 121.44 0s-16.23 3.1-22.43 9.29L9.31 99c-12.38 12.39-12.39 32.47 0 44.86l122.8 122.8-113.01 113L.34 487.11c-2.72 15.63 11.22 26.9 24.59 24.56l107.44-18.84 112.94-112.96L368.14 502.7a31.621 31.621 0 0 0 22.42 9.29c8.12 0 16.24-3.1 22.43-9.29l89.72-89.7c12.39-12.39 12.39-32.47 0-44.86zM407.36 36.7c4.09-4.09 18.6-4.09 22.69 0l45.25 45.24c6.25 6.25 6.25 16.42 0 22.67l-46.03 46.03-67.94-67.94 46.03-46zM31.93 121.63l89.51-89.52L177.39 88l-39.03 39.03c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0l39.04-39.04 44.1 44.05-89.5 89.49L31.93 121.63zm84.96 341.43L34.5 477.51l14.37-82.37 289.83-289.8 67.94 67.94-289.75 289.78zm273.88 17.02l-122.86-122.8 89.47-89.48 44.12 44.07-39.15 39.16c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0l39.17-39.17 55.94 55.88-89.31 89.72z"></path></svg>`;
        case "plus-circle":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"/></svg>`;
        case "minus":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M140 274c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12H140zm364-18c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"/></svg>`;
        case "shapes":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 288H320c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32zm0 192H320V320h160v160zM128 256C57.31 256 0 313.31 0 384s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 224c-52.93 0-96-43.07-96-96 0-52.94 43.07-96 96-96 52.94 0 96 43.06 96 96 0 52.93-43.06 96-96 96zm378.98-278.86L400.07 18.29C392.95 6.1 380.47 0 368 0s-24.95 6.1-32.07 18.29L229.02 201.14c-14.26 24.38 3.56 54.86 32.07 54.86h213.82c28.51 0 46.33-30.48 32.07-54.86zm-27.6 20.39c-.94 1.64-2.45 2.47-4.47 2.47H261.09c-2.02 0-3.53-.83-4.47-2.47-1.21-2.12-.35-3.6.02-4.23L363.55 34.44c.95-1.62 2.44-2.44 4.45-2.44s3.5.82 4.45 2.44L479.36 217.3c.37.63 1.24 2.11.02 4.23z"/></svg>`;
        case "vector-shape":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M486.4 128c14.14 0 25.6-11.46 25.6-25.6V25.6C512 11.46 500.54 0 486.4 0h-76.8C395.46 0 384 11.46 384 25.6V48H128V25.6C128 11.46 116.54 0 102.4 0H25.6C11.46 0 0 11.46 0 25.6v76.8C0 116.54 11.46 128 25.6 128H48v256H25.6C11.46 384 0 395.46 0 409.6v76.8C0 500.54 11.46 512 25.6 512h76.8c14.14 0 25.6-11.46 25.6-25.6V464h256v22.4c0 14.14 11.46 25.6 25.6 25.6h76.8c14.14 0 25.6-11.46 25.6-25.6v-76.8c0-14.14-11.46-25.6-25.6-25.6H464V128h22.4zM416 32h64v64h-64V32zM32 96V32h64v64H32zm64 384H32v-64h64v64zm384-64v64h-64v-64h64zm-48-32h-22.4c-14.14 0-25.6 11.46-25.6 25.6V432H128v-22.4c0-14.14-11.46-25.6-25.6-25.6H80V128h22.4c14.14 0 25.6-11.46 25.6-25.6V80h256v22.4c0 14.14 11.46 25.6 25.6 25.6H432v256z"/></svg>`;
        case "address-card":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm32 384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V96c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v320zm-72-128H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM208 288c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C100.2 342.1 96 355 96 368.9V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-7 2.1-13.8 6-19.6 5.6-8.3 15.8-13.2 27.3-13.2 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 11.5 0 21.7 5 27.3 13.2 3.9 5.8 6 12.6 6 19.6V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-13.9-4.2-26.8-11.4-37.5-12.3-18-32.9-27.4-54-27.4z"/></svg>`;
        case "paperclip":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.106 512c-33.076 0-66.153-12.59-91.333-37.771-50.364-50.361-50.364-132.305-.002-182.665L319.842 29.498c39.331-39.331 103.328-39.331 142.66 0 39.331 39.332 39.331 103.327 0 142.657l-222.63 222.626c-28.297 28.301-74.347 28.303-102.65 0-28.3-28.301-28.3-74.349 0-102.649l170.301-170.298c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971l-170.3 170.297c-15.821 15.821-15.821 41.563.001 57.385 15.821 15.82 41.564 15.82 57.385 0l222.63-222.626c26.851-26.851 26.851-70.541 0-97.394-26.855-26.851-70.544-26.849-97.395 0L80.404 314.196c-37.882 37.882-37.882 99.519 0 137.401 37.884 37.881 99.523 37.882 137.404.001l217.743-217.739c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971L240.44 474.229C215.26 499.41 182.183 512 149.106 512z"/></svg>`;
        case "facing-pages":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M546.4,32c-2.7,0-5.5,0.4-8.3,1.2L302.5,96h0L64,35.3c-9-2.2-16.5-4.5-30.3-3S5.9,49,5.9,62v332.4c0,9.2,15.9,16.7,30.4,21.6l0,0l238.4,60.7c18,4.3,37.5,4.4,55.5,0.1L540.7,424c16.8-4.9,27.9-16.6,27.9-29.7V48C568.6,38.8,558.1,32,546.4,32z M41.6,382.4V62.5l238.7,61.8v319.9L41.6,382.4z M324.6,444.4V124.2l214.6-61.7l1.8,322.9L324.6,444.4L324.6,444.4z"/></svg>`;
        case "page":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16z"/></svg>`;
        case "cog":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"/></svg>`;
        case "perspective":
            return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M396.4,128c14.1,0,25.6-11.5,25.6-25.6V25.6C422,11.5,410.5,0,396.4,0h-76.8C305.5,0,294,11.5,294,25.6V48h-86V25.6 \tC208,11.5,196.5,0,182.4,0h-76.8C91.5,0,80,11.5,80,25.6v76.8c0,14.1,11.5,25.6,25.6,25.6H128L48,384H25.6C11.5,384,0,395.5,0,409.6 \tv76.8C0,500.5,11.5,512,25.6,512h76.8c14.1,0,25.6-11.5,25.6-25.6V464h256v22.4c0,14.1,11.5,25.6,25.6,25.6h76.8 \tc14.1,0,25.6-11.5,25.6-25.6v-76.8c0-14.1-11.5-25.6-25.6-25.6H464l-90-256H396.4z M326,32h64v64h-64V32z M112,96V32h64v64H112z \t M96,480H32v-64h64V480z M480,416v64h-64v-64H480z M432,384h-22.4c-14.1,0-25.6,11.5-25.6,25.6V432H128v-22.4 \tc0-14.1-11.5-25.6-25.6-25.6H80l80-256h22.4c14.1,0,25.6-11.5,25.6-25.6V80h86v22.4c0,14.1,11.5,25.6,25.6,25.6H342L432,384z"/> </svg> `;
        case "style":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M344 240H104c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0 96H104c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM418.1 0c-5.8 0-11.8 1.8-17.3 5.7L357.3 37 318.7 9.2c-8.4-6-18.2-9.1-28.1-9.1-9.8 0-19.6 3-28 9.1L224 37 185.4 9.2C177 3.2 167.1.1 157.3.1s-19.6 3-28 9.1L90.7 37 47.2 5.7C41.8 1.8 35.8 0 29.9 0 14.4.1 0 12.3 0 29.9v452.3C0 499.5 14.3 512 29.9 512c5.8 0 11.8-1.8 17.3-5.7L90.7 475l38.6 27.8c8.4 6 18.2 9.1 28.1 9.1 9.8 0 19.6-3 28-9.1L224 475l38.6 27.8c8.4 6 18.3 9.1 28.1 9.1s19.6-3 28-9.1l38.6-27.8 43.5 31.3c5.4 3.9 11.4 5.7 17.3 5.7 15.5 0 29.8-12.2 29.8-29.8V29.9C448 12.5 433.7 0 418.1 0zM416 477.8L376 449l-18.7-13.5-18.7 13.5-38.6 27.8c-2.8 2-6 3-9.3 3-3.4 0-6.6-1.1-9.4-3.1L242.7 449 224 435.5 205.3 449l-38.6 27.8c-2.8 2-6 3-9.4 3-3.4 0-6.6-1.1-9.4-3.1L109.3 449l-18.7-13.5L72 449l-40 29.4V34.2L72 63l18.7 13.5L109.4 63 148 35.2c2.8-2 6-3 9.3-3 3.4 0 6.6 1.1 9.4 3.1L205.3 63 224 76.5 242.7 63l38.6-27.8c2.8-2 6-3 9.4-3 3.4 0 6.6 1.1 9.4 3.1L338.7 63l18.7 13.5L376 63l40-28.8v443.6zM344 144H104c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8z"/></svg>`;
        case "story":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M288 52v24a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6h276a6 6 0 0 1 6 6zM6 210h436a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6zm0 256h436a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6zm276-164H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6z"/></svg>`;
        case "plus-square":
            return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 448 512"  xml:space="preserve"><path fill="#FFFFFF" d="M400,64c8.8,0,16,7.2,16,16v352c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V80c0-8.8,7.2-16,16-16H400"/><path d="M400,64c8.8,0,16,7.2,16,16v352c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V80c0-8.8,7.2-16,16-16H400 M400,32H48 C21.5,32,0,53.5,0,80v352c0,26.5,21.5,48,48,48h352c26.5,0,48-21.5,48-48V80C448,53.5,426.5,32,400,32z M340,238h-98v-98 c0-6.6-5.4-12-12-12h-12c-6.6,0-12,5.4-12,12v98h-98c-6.6,0-12,5.4-12,12v12c0,6.6,5.4,12,12,12h98v98c0,6.6,5.4,12,12,12h12 c6.6,0,12-5.4,12-12v-98h98c6.6,0,12-5.4,12-12v-12C352,243.4,346.6,238,340,238z"/></svg>`;
        case "text-flow":
            return `<svg   xmlns="http://www.w3.org/2000/svg"   x="0px" y="0px" viewBox="0 0 448 512" xml:space="preserve"><path d="M48,32h352c26.5,0,48,21.5,48,48v352c0,26.5-21.5,48-48,48H48c-26.5,0-48-21.5-48-48V80C0,53.5,21.5,32,48,32z"/><path fill="#FFFFFF" d="M67.4,312.9h149.9v91.6c0,13.8,16.8,20.8,26.5,11L391.6,267c6.1-6.1,6.1-15.8,0-21.8L243.8,96.5c-9.8-9.8-26.5-2.8-26.5,11v91.6H67.4c-8.5,0-15.5,7-15.5,15.5v82.7C51.9,305.9,58.9,312.9,67.4,312.9z"/></svg>`;
        case "exchange":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"></path></svg>`;
        case "text-align-justify-justify":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439 48H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm0 384H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`;
        case "text-align-justify-left":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M439,48H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8V56C447,51.6,443.4,48,439,48z M219,432H8 c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h211c4.4,0,8-3.6,8-8v-16C227,435.6,223.4,432,219,432z M439,304H7c-4.4,0-8,3.6-8,8v16 c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8v-16C447,307.6,443.4,304,439,304z M439,176H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432 c4.4,0,8-3.6,8-8v-16C447,179.6,443.4,176,439,176z"></path></svg>`;
        case "text-align-justify-right":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439,48H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8V56C447,51.6,443.4,48,439,48z M439,432H228 c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h211c4.4,0,8-3.6,8-8v-16C447,435.6,443.4,432,439,432z M439,304H7c-4.4,0-8,3.6-8,8v16 c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8v-16C447,307.6,443.4,304,439,304z M439,176H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432 c4.4,0,8-3.6,8-8v-16C447,179.6,443.4,176,439,176z"></path></svg>`;
        case "text-align-justify-center":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439,48H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8V56C447,51.6,443.4,48,439,48z M329,432H118 c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h211c4.4,0,8-3.6,8-8v-16C337,435.6,333.4,432,329,432z M439,304H7c-4.4,0-8,3.6-8,8v16 c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8v-16C447,307.6,443.4,304,439,304z M439,176H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432 c4.4,0,8-3.6,8-8v-16C447,179.6,443.4,176,439,176z"></path></svg>`;
        case "text-align-left":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M280 48H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm160 384H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM280 304H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm160-128H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`;
        case "text-align-right":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M440 48H168a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm0 384H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H168a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`;
        case "text-align-center":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M344 48H104a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm96 384H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm-96-128H104a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm96-128H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`;
        case "check":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>`;
        case "plus":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path></svg>`;
        case "arrow-left":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>`;
        case "mirror-x":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">       <line x1="249.883" y1="30" x2="249.884" y2="32.5" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>      <line x1="249.915" y1="90.5" x2="250.1" y2="438.5" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40" stroke-dasharray="4.833 58"/>      <line x1="250.116" y1="467.5" x2="250.117" y2="470" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>    <polygon points="317.688 394.553 479.598 395.132 317.101 104.868 317.688 394.553" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>    <polygon points="177.01 394.553 20.101 395.132 177.598 104.868 177.01 394.553" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>  </svg>`;
        case "arrow-up":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path   d="M4.465 263.536l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L207 92.113V468c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V92.113l178.494 178.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.05c-4.686-4.686-12.284-4.686-16.971 0L4.465 246.566c-4.687 4.686-4.687 12.284 0 16.97z"></path></svg>`;
        case "arrow-down":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"></path></svg>`;
        case "arrow-right":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>`;
        case "mirror-y":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">  <g>    <g>      <line x1="469.849" y1="249.967" x2="467.349" y2="249.965" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>      <line x1="409.349" y1="249.934" x2="61.349" y2="249.749" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40" stroke-dasharray="4.833 58"/>      <line x1="32.349" y1="249.734" x2="29.849" y2="249.732" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>    </g>    <polygon points="105.297 182.161 104.717 20.252 394.982 182.748 105.297 182.161" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>    <polygon points="105.297 322.839 104.717 479.748 394.982 322.252 105.297 322.839" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>  </g></svg>`;
        case "arrows-h":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z"></path></svg>`;
        case "arrows-v":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path  d="M181.415 399.959c-4.686-4.686-12.284-4.686-16.971 0L113 451.887V60.113l51.444 51.928c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-84-84.485c-4.686-4.686-12.284-4.686-16.971 0L3.515 88c-4.686 4.686-4.686 12.284 0 16.97l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L79 60.113v391.773l-51.444-51.928c-4.686-4.686-12.284-4.686-16.971 0l-7.07 7.071c-4.686 4.686-4.686 12.284 0 16.97l84 84.485c4.686 4.687 12.284 4.687 16.971 0l84-84.485c4.686-4.686 4.686-12.284 0-16.97l-7.071-7.07z"></path></svg>`;
        case "arrows":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path   d="M337.782 434.704l-73.297 73.782c-4.686 4.686-12.284 4.686-16.971 0l-73.296-73.782c-4.686-4.686-4.686-12.284 0-16.97l7.07-7.07c4.686-4.686 12.284-4.686 16.971 0L239 451.887h1V272H60.113v1l41.224 40.741c4.686 4.686 4.686 12.284 0 16.971l-7.071 7.07c-4.686 4.686-12.284 4.686-16.97 0L3.515 264.485c-4.686-4.686-4.686-12.284 0-16.971l73.782-73.297c4.686-4.686 12.284-4.686 16.971 0l7.071 7.071c4.686 4.686 4.686 12.284 0 16.971L60.113 239v1H240V60.113h-1l-40.741 41.224c-4.686 4.686-12.284 4.686-16.971 0l-7.07-7.071c-4.686-4.686-4.687-12.284 0-16.97l73.297-73.782c4.686-4.686 12.284-4.686 16.971 0l73.297 73.782c4.686 4.686 4.686 12.284 0 16.971l-7.071 7.071c-4.686 4.686-12.284 4.686-16.971 0L273 60.113h-1V240h179.887v-1l-41.224-40.741c-4.686-4.686-4.686-12.284 0-16.971l7.071-7.07c4.686-4.686 12.284-4.686 16.97 0l73.782 73.297c4.687 4.686 4.686 12.284 0 16.971l-73.782 73.297c-4.686 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.686-4.686-4.686-12.284 0-16.971L451.887 273v-1H272v179.887h1l40.741-41.224c4.686-4.686 12.284-4.686 16.971 0l7.07 7.071c4.686 4.685 4.686 12.283 0 16.97z"></path></svg>`;
        case "arrows-circle":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.54 139.54"><path d="M139.54,69.77A69.77,69.77,0,1,1,69.77,0,69.77,69.77,0,0,1,139.54,69.77ZM87.46,41.53,69.78,9.2,52.1,41.53ZM99.23,88l32.32-17.68L99.23,52.6ZM40.47,52.6,8.15,70.27,40.47,88ZM53,99.65,70.68,132,88.36,99.65Z"/></svg>`;
        case "text-size":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M624 32H272a16 16 0 0 0-16 16v72a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h144v384h-72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-72V64h144v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V48a16 16 0 0 0-16-16zM304 224H16a16 16 0 0 0-16 16v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8v-40h112v192H88a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-56V256h112v40a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8v-56a16 16 0 0 0-16-16z"></path></svg>`;
        case "text-width":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M362.31 292.69a16.12 16.12 0 0 0-11.48-4.69c-8 0-15.83 5.69-15.83 16v64H111v-64a16 16 0 0 0-16.12-16 15.63 15.63 0 0 0-11.19 4.71l-80 80a16 16 0 0 0 0 22.63l80 80A16.16 16.16 0 0 0 95.17 480c8 0 15.83-5.69 15.83-16v-64h224v64a16 16 0 0 0 16.13 16 15.64 15.64 0 0 0 11.18-4.7l80-80a16 16 0 0 0 0-22.63zM79 368v57.37L37.63 384 79 342.64zm288 57.36v-82.73L408.37 384zM431 32H15A16 16 0 0 0-1 48v72a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h176v192h-40a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-40V64h176v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V48a16 16 0 0 0-16-16z"></path></svg>`;
        case "line-width":
            return `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 640 512" ><path d="M506.63,354h-368c-4.42,0-8,3.58-8,8v16c0,4.42,3.58,8,8,8h368c4.42,0,8-3.58,8-8v-16C514.63,357.58,511.04,354,506.63,354z M506.63,442h-368c-4.42,0-8,3.58-8,8v16c0,4.42,3.58,8,8,8h368c4.42,0,8-3.58,8-8v-16C514.63,445.58,511.04,442,506.63,442z M506.63,266h-368c-4.42,0-8,3.58-8,8v16c0,4.42,3.58,8,8,8h368c4.42,0,8-3.58,8-8v-16C514.63,269.58,511.04,266,506.63,266z"/><path d="M208,32.01c0-14.31-17.31-21.33-27.31-11.31l-80,80c-6.25,6.25-6.25,16.38,0,22.63c0,0,0,0,0,0l80,80 c9.31,9.32,27.31,4.32,27.31-11.32v-64h224v64c0,14.29,17.31,21.31,27.31,11.29l80-80c6.25-6.25,6.25-16.38,0-22.63c0,0,0,0,0,0 l-80-80C450,11.36,432,16.36,432,32.01v64H208V32.01z"/>	<polygon points="464,70.63 505.37,112.01 464,153.36 	"/>	<polygon points="176,128.01 176,153.38 134.63,112.01 176,70.65 	"/></svg>`;
        case "line-height":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path   d="M175 144c14.31 0 21.33-17.31 11.31-27.31l-80-80a16 16 0 0 0-22.63 0l-80 80C-5.64 126-.64 144 15 144h64v224H15C.71 368-6.31 385.31 3.71 395.31l80 80a16 16 0 0 0 22.63 0l80-80C195.65 386 190.65 368 175 368h-64V144zm-38.62 256L95 441.37 53.65 400h82.73zM79 112H53.63L95 70.63 136.36 112H79zm552 128H263a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 128H263a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-256H263a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`;
        case "palette":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 264c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm32-112c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM256 0c-16.9 0-34.2 1.6-51.7 5C104.9 24.4 24.8 104.3 5.2 203.4-29.4 378.5 116.4 512 239.5 512c8.3 0 16.5-.6 24.6-1.9 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.6 113.9 397.1 0 256 0zm191.1 288h-79.7c-35.3 0-67.4 17.9-85.7 47.8-18.2 29.7-19.6 66-3.7 97.2 4.9 9.6 4.8 21.6-.1 31.3-2.4 4.6-7.9 12.6-18.7 14.3-6.3 1-12.9 1.5-19.7 1.5-54.6 0-114.1-31.3-155.5-81.6-44-53.6-60.9-120.6-47.4-188.7 17.1-86.6 87-156.2 173.9-173.2 15.2-3 30.5-4.5 45.5-4.5 123.1 0 223.6 99.9 224 222.6 0 18.3-14.8 33.3-32.9 33.3zM368 136c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM240 88c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24z"></path></svg>`;
        case "brush":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M352 0H32C14.33 0 0 14.33 0 32v288c0 35.35 28.66 64 64 64h64v64c0 35.35 28.66 64 64 64s64-28.65 64-64v-64h64c35.34 0 64-28.65 64-64V32c0-17.67-14.33-32-32-32zm0 320c0 17.64-14.36 32-32 32h-96v96c0 17.64-14.36 32-32 32s-32-14.36-32-32v-96H64c-17.64 0-32-14.36-32-32v-32h320v32zm0-64H32V32h320v224z"></path></svg>`;
        case "undo":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M20 8h10c6.627 0 12 5.373 12 12v110.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H180c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V20c0-6.627 5.373-12 12-12z"></path></svg>`;
        case "redo":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M492 8h-10c-6.627 0-12 5.373-12 12v110.625C426.804 57.047 346.761 7.715 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.166 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-7.069-7.069c-4.503-4.503-11.749-4.714-16.482-.454C361.218 449.238 311.065 470 256 470c-117.744 0-214-95.331-214-214 0-117.744 95.331-214 214-214 82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z"></path></svg>`;
        case "copy":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z"></path></svg>`;
        case "cut":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M249.52 256L446.83 58.83a3.996 3.996 0 0 0 0-5.65c-12.5-12.5-32.76-12.5-45.25 0L224.06 230.56l-48.64-48.61C185.88 166.57 192 148 192 128c0-53.02-42.98-96-96-96S0 74.98 0 128s42.98 96 96 96c20.01 0 38.58-6.12 53.96-16.6l48.63 48.6-48.63 48.6C134.58 294.12 116.01 288 96 288c-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96c0-20-6.12-38.57-16.58-53.95l48.64-48.61 177.52 177.38c12.5 12.5 32.76 12.5 45.25 0a3.996 3.996 0 0 0 0-5.65L249.52 256zM96 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm0 256c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"></path></svg>`;
        case "paste":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M433.941 193.941l-51.882-51.882A48 48 0 0 0 348.118 128H320V80c0-26.51-21.49-48-48-48h-66.752C198.643 13.377 180.858 0 160 0s-38.643 13.377-45.248 32H48C21.49 32 0 53.49 0 80v288c0 26.51 21.49 48 48 48h80v48c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V227.882a48 48 0 0 0-14.059-33.941zm-22.627 22.627a15.888 15.888 0 0 1 4.195 7.432H352v-63.509a15.88 15.88 0 0 1 7.431 4.195l51.883 51.882zM160 30c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18zM48 384c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h66.752c6.605 18.623 24.389 32 45.248 32s38.643-13.377 45.248-32H272c8.822 0 16 7.178 16 16v48H176c-26.51 0-48 21.49-48 48v208H48zm352 96H176c-8.822 0-16-7.178-16-16V176c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v208c0 8.822-7.178 16-16 16z"></path></svg>`;
        case "object-ungroup":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M564 224c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v20h-96v-32h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v20H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h20v160H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-20h96v32h-20c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-20h224v20c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-20V224h20zm-180 96v32h-32v-32h32zM352 64h32v32h-32V64zM32 64h32v32H32V64zm32 288H32v-32h32v32zm20-64H64V128h20c6.627 0 12-5.373 12-12V96h224v20c0 6.627 5.373 12 12 12h20v160h-20c-6.627 0-12 5.373-12 12v20H96v-20c0-6.627-5.373-12-12-12zm140 160h-32v-32h32v32zm256-52v20H256v-20c0-6.627-5.373-12-12-12h-20v-32h96v20c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-20v-96h96v20c0 6.627 5.373 12 12 12h20v160h-20c-6.627 0-12 5.373-12 12zm64 52h-32v-32h32v32zm-32-256v-32h32v32h-32z"></path></svg>`;
        case "trash":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></path></svg>`;
        case "remove-format":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M192 64h176l-44.56 133.68 25.35 20L400 64h176v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V48a16 16 0 0 0-16-16H176a16 16 0 0 0-16 16v21l32 25.19zm152 384h-72l44.55-133.64-25.35-20L240 448h-72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm293 37.31L23 1.8A7.86 7.86 0 0 0 11.79 3l-10 12.5A7.92 7.92 0 0 0 3 26.71l614 483.52a7.91 7.91 0 0 0 11.18-1.23l10-12.5a7.83 7.83 0 0 0-1.18-11.18z"></path></svg>`;
        case "clipboard":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg>`;
        case "undo-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>`;
        case "redo-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"></path></svg>`;
        case "copy-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>`;
        case "trash-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>`;
        case "search-plus":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>`;
        case "search-minus":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M304 192v32c0 6.6-5.4 12-12 12H124c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>`;
        case "search-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg>`;
        case "save":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>`;
        case "cloud-upload-alt":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path></svg>`;
        case "folder-open-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"></path></svg>`;
        case "tint":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path  d="M205.22 22.09C201.21 7.53 188.61 0 175.97 0c-12.35 0-24.74 7.2-29.19 22.09C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 480c-79.4 0-144-65.54-144-146.09 0-48.36 23-81.32 54.84-126.94 29.18-41.81 65.34-93.63 89.18-170.91 23.83 77.52 60.06 129.31 89.3 171.08C297.06 252.52 320 285.3 320 333.91 320 414.46 255.4 480 176 480zm0-64c-44.12 0-80-35.89-80-80 0-8.84-7.16-16-16-16s-16 7.16-16 16c0 61.75 50.25 112 112 112 8.84 0 16-7.16 16-16s-7.16-16-16-16z"></path></svg>`;
        case "warp-arc":
            return `<svg   xmlns="http://www.w3.org/2000/svg"  	 viewBox="0 0 500 500">	<path  d="M499.63,193.5c0.11-0.55,0.19-1.09,0.25-1.64c0.07-0.6,0.11-1.18,0.12-1.78c0-0.54-0.03-1.07-0.07-1.6		c-0.05-0.59-0.11-1.17-0.22-1.74c-0.1-0.55-0.24-1.08-0.39-1.62c-0.16-0.55-0.32-1.09-0.53-1.62c-0.2-0.52-0.44-1.03-0.7-1.54		c-0.27-0.52-0.55-1.03-0.86-1.53c-0.29-0.45-0.6-0.88-0.94-1.31c-0.4-0.51-0.82-1-1.27-1.47c-0.18-0.19-0.31-0.4-0.5-0.58		C477.8,161.3,387.48,82.52,250.17,81.35c-123.44-0.96-206.3,59.51-244.62,95.7l0.05,0.05c-5.33,5.02-7.22,13-4.05,20.05		l95.09,211.08c2.95,6.54,9.38,10.41,16.11,10.41c1.91,0,3.82-0.41,5.69-1.06c0.5-0.14,0.99-0.3,1.48-0.48		c0.02-0.01,0.05-0.01,0.07-0.02c0.02-0.01,0.03-0.02,0.05-0.03c1.85-0.71,3.63-1.67,5.22-3.03		c18.75-16.07,59.09-42.87,119.53-42.87c0.52,0,1.06,0,1.59,0.01c68.59,0.54,113.14,35.8,121.38,42.87		c3.33,2.86,7.42,4.25,11.49,4.25c4.97,0,9.92-2.09,13.41-6.16c0.1-0.11,0.16-0.24,0.25-0.36c1.33-1.34,2.52-2.86,3.4-4.65		l101.98-209.48c0.12-0.25,0.17-0.51,0.28-0.76c0.25-0.57,0.46-1.14,0.64-1.73C499.36,194.59,499.51,194.05,499.63,193.5z		 M427.08,263.19c-20.18-12.43-77.33-42.87-159.73-47.76l-0.21-98.02c98.24,6.05,167.02,54.67,193.5,76.84L427.08,263.19z		 M373.06,374.17c-20.68-13.58-57.18-32.34-105.43-37.1l-0.19-86.22c78.64,5.12,130.51,35.41,144.1,44.27L373.06,374.17z		 M119.86,373.82L84,294.23c25.41-16.52,75.22-41.27,148.11-43.9l0.19,85.87C181.86,338.86,144.12,357.24,119.86,373.82z		 M232.04,215.02c-77.69,2.57-132.59,28.04-162.68,46.69L39.03,194.4c35.34-30.74,100.27-73.02,192.79-77.29L232.04,215.02z"/></svg>`;
        case "warp-flag":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 427.46"><path d="M433,52.28C294.33-147,155.67,301.81,17,105.6,8.16,93.17,1,87.15,1,96q-.49,118.6-1,237.2c0,8.8,7.16,29.31,16,41.95,138.67,199.31,277.33-249.53,416-53.32,8.84,12.43,16,18.45,16,9.57q.5-118.6,1-237.2C449,85.44,441.84,64.92,433,52.28ZM33,157.45c58.67,62.83,117.33,19.1,176-33.25q-.5,44.45-1,88.89c-58.67,52.25-117.33,95.32-176,31.28Q32.49,200.92,33,157.45ZM32,363.37v-87c58.67,64,117.33,21,176-31.28v87C149.33,384.34,90.67,427.41,32,363.37ZM416,270c-58.67-62.83-117.33-19.1-176,33.25v-87c58.67-52.35,117.33-96.08,176-33.25Zm0-119c-58.67-62.83-117.33-19.1-176,33.25q.5-44.44,1-88.89C299.67,43.12,358.33.05,417,64.09Q416.51,107.55,416,151Z"/></svg>`;
        case "warp-bulge":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 546.15"><path d="M438.38,118.66C341.05-39.17,109.3-39.55,11.32,117.53,5.06,127.76.63,143.83.63,152.5Q.31,273.61,0,392.57c0,8.59,4.4,24.63,10.62,34.91C108,585.32,339.7,585.7,437.68,428.62c6.25-10.23,10.68-26.3,10.69-35q.31-121.11.63-240.08C449,145,444.6,128.94,438.38,118.66ZM23.21,141C68.84,94.1,136.58,68.78,206.1,65q-.58,88.5-1.18,176.93c-69.5.61-137.1,4.43-182.49,11.49Q22.82,197.52,23.21,141ZM22.43,404.4V294c45.39,7.51,113,11.58,182.49,12.23V481.09C135.42,477.05,67.82,451.49,22.43,404.4Zm403.36.8c-45.63,46.84-113.37,72.16-182.89,76V306.25c69.52-.61,137.26-4.64,182.89-12.11Zm0-151.91c-45.63-7-113.37-10.81-182.89-11.38q.58-88.46,1.18-176.85c69.5,4,137.1,29.6,182.49,76.69Q426.18,197.18,425.79,253.29Z"/></svg>`;
        case "warp-arc-lower":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 408.57"><path d="M433,0H17A16.17,16.17,0,0,0,1,16.07Q.32,136.07,0,255c.05,8.7,4.44,24.75,10.62,34.91C108,447.75,339.7,448.13,437.68,291.05c6.22-10.12,10.64-26.15,10.67-34.9Q448.52,135.54,449,16A16.11,16.11,0,0,0,433,0ZM31.84,36.42A1533.22,1533.22,0,0,0,208.66,48.17q-1,66.22-2,132.42c-63.47-2.34-126.09-17.16-178.88-44.46Q29.77,86.45,31.84,36.42Zm-8.28,234.7q1.53-49.34,3.07-98.69c51.22,34.58,114.9,53.35,179.64,56.32l-1,130.92C137.06,355,70.51,325.5,23.56,271.12Zm401.08.93c-47.18,54.09-113.84,83.32-182.09,87.7l-.93-130.95C306.38,226,370.13,207.42,421.49,173Zm-4.3-135.46c-52.9,27.16-115.58,41.84-179.06,44q.08-66.25.08-132.47A1533.93,1533.93,0,0,0,418.13,36.3Q419.19,86.28,420.34,136.59Z"/></svg>`;
        case "warp-arc-upper":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 408.57"><path d="M438.38,118.66C341.05-39.17,109.3-39.55,11.32,117.53,5.1,127.64.68,143.68.65,152.42Q.49,273,0,392.57a16.1,16.1,0,0,0,16,16H432a16.16,16.16,0,0,0,16-16.07q.66-120,1-238.93C449,144.87,444.56,128.83,438.38,118.66Zm-414,17.87C71.54,82.44,138.2,53.2,206.45,48.82q-.12,66.27-.17,132.51c-64.7,2.95-128.35,21.6-179.61,55.95Q25.55,187.08,24.36,136.53Zm6.51,235.74q-1.53-49.35-3.07-98.69c52.83-27.07,115.42-41.77,178.85-44.09l1,130.93A1531.72,1531.72,0,0,0,30.87,372.27Zm386.29-.12a1533.24,1533.24,0,0,0-176.82-11.74l.93-131c63.44,2.18,126.09,16.74,179,43.67Q418.73,322.64,417.16,372.15Zm4.3-135.46c-51.41-34.17-115.13-52.64-179.85-55.41q1-66.19,2.11-132.38c68.22,4.66,134.77,34.18,181.72,88.55Q423.49,186.9,421.46,236.69Z"/></svg>`;
        case "warp-pit-upper":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 261.48"><path d="M437,6.82c-107.81,136.38-316,136.71-424.26,1C5.88-.94.76-1.44.74,7.48Q.48,126,0,245.48a15.84,15.84,0,0,0,16,16H432a15.83,15.83,0,0,0,16-15.93q.62-119.07,1-239.07C449-2.47,443.87-2,437,6.82ZM26.55,51c50.09,46.73,114.73,72,180.54,75.77q-.21,24.76-.37,49.55C143.54,173.81,81.16,157.7,28,128Q27.32,89.38,26.55,51ZM31.16,233.2q-1.15-38.44-2.3-76.9C83.18,179.69,144.77,192.39,207,194.4q.38,24.53.74,49C148.11,242.9,88.65,239.49,31.16,233.2Zm385.7.11c-57.51,6.25-117,9.64-176.6,10.14l.69-49c62.23-1.88,123.87-14.46,178.26-37.73Q418,195,416.86,233.31Zm3.21-104.79C366.83,158.05,304.39,174,241.2,176.4q.9-24.81,1.83-49.65c65.8-4,130.35-29.53,180.27-76.51Q421.71,89.53,420.07,128.52Z"/></svg>`;
        case "warp-pit-lower":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 261.48"><path d="M433,0H17A15.84,15.84,0,0,0,1,15.94Q.37,135,0,255c0,8.95,5.13,8.44,12-.34,107.81-136.37,316-136.7,424.26-1,6.88,8.74,12,9.24,12,.33q.25-118.55.74-238A15.84,15.84,0,0,0,433,0ZM32.14,28.18c57.52-6.26,117-9.64,176.6-10.15q-.86,24.8-1.76,49.62c-62.25,2-123.87,14.83-178.14,38.42Q30.46,67,32.14,28.18ZM25.7,211.25q1.14-38.46,2.29-76.9c53.11-29.88,115.52-46.1,178.72-48.66q-.37,24.53-.74,49.05C140.17,138.76,75.62,164.27,25.7,211.25Zm396.75-.8c-50.09-46.74-114.73-72-180.54-75.78q-.34-24.51-.7-49c63.22,2.4,125.68,18.47,178.89,48.19Q421.27,172.15,422.45,210.45Zm-3.21-104.79c-54.36-23.46-116-36.14-178.28-38q.18-24.78.31-49.58c59.62.54,119.08,3.95,176.57,10.24Q418.52,67.13,419.24,105.66Z"/></svg>`;
        case "warp-fish":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 427.46"><path d="M433,104.18C294.33,303.49,155.67-145.35,17,50.86,8.16,63.62,1,84.09,1,92.64Q.51,214.52,0,333.23c0,8.44,7.16,29,16,41.95,138.67,199.31,277.33-249.53,416-53.32,8.84,12.76,16,18.9,16,9.78q.5-117.12,1-237.41C449,85,441.84,91.22,433,104.18Zm-400-30c58.67-48,117.33-14.59,176,25.4q-.5,48.19-1,97c-58.67-6-117.33-10.9-176-3.58Q32.49,133.91,33,74.16ZM32,352.48V235.85c58.67,7.8,117.33,2.55,176-3.81v96.54C149.33,368.49,90.67,401.39,32,352.48Zm384-71.32c-58.67-48-117.33-14.59-176,25.4v-78c58.67-6.37,117.33-11.7,176-4.05Zm0-77.53c-58.67,7.19-117.33,2.19-176-3.8q.5-39.42,1-78.25c58.67,39.91,117.33,72.81,176,23.9Q416.51,174.91,416,203.63Z"/></svg>`;
        case "warp-squeeze":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 254.41"><path d="M435.46,4.49c-119.78,106.69-301,106.94-421,.76C6.75-1.66.83-.52.83,8.43Q.41,126.84,0,246.7c0,9,5.9,10.17,13.54,3.22,119.78-106.69,301-106.94,421.05-.77,7.66,6.92,13.58,5.78,13.58-3.17q.42-118.41.83-238.28C449-1.3,443.1-2.46,435.46,4.49ZM28.53,43.05C81.24,74.72,144.05,91.83,207.68,94.4q-.54,13.92-1.09,27.88c-63.62-.4-126.36-3-179-7.76Q28.08,78.55,28.53,43.05Zm-.9,168.85V140.71c52.6-5.08,115.34-7.83,179-8.27v27.62C143,162.79,80.23,180.07,27.63,211.9Zm392.84-.54C367.76,179.69,305,162.58,241.32,160V132.43c63.63.41,126.44,3.14,179.15,8.19Zm0-96.76c-52.71,4.74-115.52,7.31-179.15,7.69q.54-14,1.09-27.94c63.62-2.73,126.36-20,179-51.84Q420.92,78.78,420.47,114.6Z"/></svg>`;
        case "settings":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352zM200 160h-40v-32c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v32H88c-13.2 0-24 10.8-24 24v48c0 13.2 10.8 24 24 24h40v116c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V256h40c13.2 0 24-10.8 24-24v-48c0-13.2-10.8-24-24-24zm-8 64H96v-32h96v32zm168 32h-40V128c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v128h-40c-13.2 0-24 10.8-24 24v48c0 13.2 10.8 24 24 24h40v20c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12v-20h40c13.2 0 24-10.8 24-24v-48c0-13.2-10.8-24-24-24zm-8 64h-96v-32h96v32z"></path></svg>`;
        case "slash":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M637 485.3L23 1.8C19.6-1 14.5-.5 11.8 3l-10 12.5C-1 19-.4 24 3 26.7l614 483.5c3.5 2.8 8.5 2.2 11.2-1.2l10-12.5c2.8-3.5 2.3-8.5-1.2-11.2z"></path></svg>`;
        case "empty":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"></svg>`;
        case "warp-mug":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M480 64H64a32 32 0 0 0-32 32v256a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96v-96h64a96 96 0 0 0 0-192zm-96 288a64.07 64.07 0 0 1-64 64H128a64.07 64.07 0 0 1-64-64V96h320zm96-128h-64V96h64a64 64 0 0 1 0 128z"></path></svg>`;
        case "close-square":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352zm-97.2-245.3L249.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L224 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"></path></svg>`;
        case "close":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path  d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>`;
        case "square":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z"></path></svg>`;
        case "mesh":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.725 198.725"  ><path d="M194.828,0H3.897C1.745,0,0,1.745,0,3.897v190.931c0,2.154,1.745,3.897,3.897,3.897h190.931
c2.152,0,3.897-1.743,3.897-3.897V3.897C198.724,1.745,196.979,0,194.828,0z M135.336,7.793 c-1.794,7.887-5.085,24.174-6.073,41.085c-5.646-1.308-11.613-2.843-17.707-4.412c-16.791-4.322-34.076-8.731-48.241-9.287
c3.851-12.645,8.947-23.169,11.117-27.386H135.336z M140.168,115.415c-8.484,1.236-14.626,4.939-20.562,8.586 c-8.348,5.126-16.984,10.43-33.881,10.43c-2.384,0-4.852-0.069-7.364-0.185c-2.669-15.64-8.165-33.341-16.343-52.032
c-5.081-11.614-3.973-26.095-0.807-39.32c13.572,0.173,31.259,4.706,48.402,9.118c6.676,1.719,13.188,3.386,19.369,4.787 c-0.104,10.231,0.852,20.238,3.727,28.288C136.221,94.92,138.646,105.339,140.168,115.415z M7.793,7.793h57.904
c-2.904,5.97-7.32,15.966-10.605,27.516C35.965,37.001,17.199,47.237,7.793,53.121V7.793z M7.793,62.433 c5.587-3.795,25.301-16.304,45.27-19.007c-3.023,13.934-3.764,29.158,1.815,41.912c7.629,17.44,12.812,33.863,15.476,48.384
c-26.972-2.26-56.834-9.239-62.561-10.618C7.793,123.104,7.793,62.433,7.793,62.433z M72.105,161.319 c-1.425,14.256-6.164,25.315-8.246,29.612H7.793v-59.814c9.096,2.155,37.708,8.563,63.77,10.525
C72.441,148.805,72.691,155.46,72.105,161.319z M72.436,190.931c2.574-5.996,6.162-16.211,7.425-28.836\tc0.6-6.013,0.396-12.767-0.413-19.996c2.131,0.081,4.228,0.125,6.277,0.125c19.101,0,29.119-6.153,37.961-11.583
c5.622-3.453,10.651-6.485,17.484-7.505c1.621,15.093,1.182,28.805-0.8,37.726c-2.739,12.323-0.178,23.604,1.981,30.069H72.436z M190.93,190.932h-40.296v-0.001c-1.803-4.587-5.412-15.983-2.659-28.379c2.102-9.457,2.599-23.901,0.949-39.754
c17.307,0.457,35.295,4.937,42.006,6.781V190.932z M190.93,121.497c-8.373-2.215-25.866-6.237-42.98-6.513 c-1.577-10.817-4.146-22.005-7.901-32.519c-2.405-6.734-3.285-15.201-3.281-24.043c6.291,1.197,12.11,1.975,17.145,1.975
c16.583,0,30.355-0.984,37.017-1.562V121.497z M190.931,51.013c-6.188,0.551-20.108,1.591-37.017,1.591\tc-4.817,0-10.594-0.821-16.929-2.074c0.958-18.006,4.769-35.902,6.36-42.737h47.586V51.013z"/></svg>
`;
        case "crop":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M160 16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v80H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h80v224c0 17.67 14.33 32 32 32h192v-64H160V16zm336 336h-80V128c0-17.67-14.33-32-32-32H192v64h160v336c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-80h80c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>`;
        case "fill-image":
            return `<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 500 500"  >	<rect x="1" y="181.66" width="36" height="32.33"/>	<rect x="1" y="234.32" width="36" height="32.33"/>	<rect x="1" y="286.98" width="36" height="32.33"/>	<path d="M464.23,359.08h-25.8l-88.08-195.22c-1.87-4.15-5.42-7.37-9.8-8.63c-0.11-0.03-0.22-0.06-0.33-0.09		c-10.21-2.76-20.98,1.95-26.48,10.98l-95.27,156.41l-39.93-58.07c-1.84-2.68-4.36-4.86-7.38-6.07c-0.37-0.15-0.74-0.28-1.12-0.41		c-10.57-3.57-22.18,1.18-27.92,10.74l-54.44,90.61H37v-22H1v59h89v-0.29h320.23v0.03h90v-59h-36V359.08z"/>	<path d="M37,141.33h27.48c4.94,28.88,30.08,50.86,60.36,50.86c30.8,0,56.29-22.74,60.6-52.34h21.31v-36h-26.5		c0-0.01-0.01-0.03-0.01-0.03L69.07,104.3c0,0-0.01,0.02-0.01,0.03H1v59h36V141.33z"/>	<polygon points="410.23,104.33 410.23,141.33 464.23,141.08 464.23,163.08 500.23,163.08 500.23,104.08 	"/>	<rect x="464" y="234.16" width="36" height="32.33"/>	<rect x="464" y="181.5" width="36" height="32.33"/>	<rect x="464" y="286.82" width="36" height="32.33"/>	<rect x="350.91" y="103.85" width="28.83" height="36"/>	<rect x="293.25" y="103.85" width="28.83" height="36"/>	<rect x="235.58" y="103.85" width="28.83" height="36"/></svg>`;
        case "fit-image":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"  xml:space="preserve">	<path  d="M360.19,104H139.15c-20.2,0-36.58,16.38-36.58,36.58v219.49c0,20.2,16.38,36.58,36.58,36.58h221.04		c20.2,0,36.58-16.38,36.58-36.58V140.58C396.77,120.38,380.39,104,360.19,104z M355.62,360.07h-211.9c-2.53,0-4.57-2.05-4.57-4.57		V145.15c0-2.53,2.05-4.57,4.57-4.57h211.9c2.53,0,4.57,2.05,4.57,4.57V355.5C360.19,358.03,358.14,360.07,355.62,360.07z		 M199.42,178.07c-12.8,0-23.18,10.38-23.18,23.18s10.38,23.18,23.18,23.18c12.8,0,23.18-10.38,23.18-23.18		S212.22,178.07,199.42,178.07z M174.73,323.49h148.88v-4.97l-38.7-89.7c-3.57-3.57-9.36-3.57-12.93,0l-34.08,58.09l-20.12-30.12		c-3.57-3.57-9.36-3.57-12.93,0l-30.11,63.12V323.49z"/>	<path  d="M36,319.31H0v-32.33h36V319.31z M36,266.65H0v-32.33h36V266.65z M36,213.99H0v-32.33h36V213.99z"/>	<polygon  points="464.23,337.08 500.23,337.08 500.23,396.08 410.23,396.08 420.23,359.08 464.23,359.08 	"/>	<polygon  points="36,163.33 0,163.33 0,104.33 89,104.33 79,141.33 36,141.33 	"/>	<polygon  points="36,337.33 0,337.33 0,396.33 89,396.33 79,359.33 36,359.33 	"/>	<polygon  points="464.23,163.08 500.23,163.08 500.23,104.08 410.23,104.33 420.23,141.33 464.23,141.08 	"/>	<path  d="M500,319.15h-36v-32.33h36V319.15z M500,266.49h-36v-32.33h36V266.49z M500,213.83h-36V181.5h36V213.83z"/></svg>`;
        case "vertical-align-bottom-baseline":
            return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
               x="0px" y="0px" viewBox="0 0 512 512"   >
           <path d="M177.9,463.9l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3
                  c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25C75,258,100.8,250.7,128,250.7c65.9,0,82,43.5,82,85.3v78
                  c0,18.1,0.9,35.8,3.6,50H177.9z M172.1,357.5c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9
                  c1.3-3.9,2.2-8.2,2.2-12.1V357.5z"/>
                  <path d="M459,255.4c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2
                  l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H418c-12,19.4-35.2,34.9-68.6,34.9
                  c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H459z M418.4,337.7
                  c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75
                  c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V337.7z"/>
          <rect x="33" y="481.6" width="209.8" height="28.8"/>
          </svg>`;
        case "vertical-align-bottom":
            return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" c
               c viewBox="0 0 512 512">
               <path d="M177.9,423.3l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3
                   c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25c17.8-11.2,43.7-18.5,70.8-18.5c65.9,0,82,43.5,82,85.3v78
                   c0,18.1,0.9,35.8,3.6,50H177.9z M172.1,316.9c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9
                   c1.3-3.9,2.2-8.2,2.2-12.1V316.9z"/>
               <path d="M459,214.9c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2
                   l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H418c-12,19.4-35.2,34.9-68.6,34.9
                   c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H459z M418.4,297.1
                   c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75
                   c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V297.1z"/>
           </svg>`;
        case "vertical-align-center":
            return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  
               viewBox="0 0 512 512"  >
             <path d="M183.9,317.1l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3
                 c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25c17.8-11.2,43.7-18.5,70.8-18.5c65.9,0,82,43.5,82,85.3v78
                 c0,18.1,0.9,35.8,3.6,50H183.9z M178.1,210.7c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9
                 c1.3-3.9,2.2-8.2,2.2-12.1V210.7z"/>
             <path d="M465,108.7c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2
                 l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H424c-12,19.4-35.2,34.9-68.6,34.9
                 c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H465z M424.4,190.9
                 c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75
                 c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V190.9z"/>
         </svg>`;
        case "vertical-align-center-baseline":
            return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 512 512" >
           
              <path d="M173.9,284.1l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3
                  c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25C71,78.2,96.8,70.9,124,70.9c65.9,0,82,43.5,82,85.3v78
                  c0,18.1,0.9,35.8,3.6,50H173.9z M168.1,177.7c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9
                  c1.3-3.9,2.2-8.2,2.2-12.1V177.7z"/>
              <path d="M455,75.7c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2
                  l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H414c-12,19.4-35.2,34.9-68.6,34.9
                  c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H455z M414.4,157.9
                  c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75
                  c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V157.9z"/>
           
          <rect x="35.5" y="295.3" width="209.8" height="28.8"/>
          </svg>
          `;
        case "vertical-align-top":
            return `<svg version="1.1"   xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 512 512"  ><path d="M177.5,216.5l-3.1-26.3H173c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3
                     c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25c17.8-11.2,43.7-18.5,70.8-18.5c65.9,0,82,43.5,82,85.3v78
                     c0,18.1,0.9,35.8,3.6,50H177.5z M171.7,110.1c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9
                     c1.3-3.9,2.2-8.2,2.2-12.1V110.1z"/>
                 <path d="M458.6,8c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2
                     l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3h-0.9c-12,19.4-35.2,34.9-68.6,34.9
                     c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9L424.3,8H458.6z M418,90.2
                     c0-6.5-0.4-12.1-2.2-17.2C408.7,51,389.5,33,361,33c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75
                     c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V90.2z"/>
              
             </svg>
             `;
        case "warning":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`;
        case "effects":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm0-96c8.84 0 16 7.16 16 16s-7.16 16-16 16-16-7.16-16-16 7.16-16 16-16zm352 224l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm0 96c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm70.63-306.04L434.04 9.37C427.79 3.12 419.6 0 411.41 0s-16.38 3.12-22.63 9.37L9.37 388.79c-12.5 12.5-12.5 32.76 0 45.25l68.59 68.59c6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37l379.41-379.41c12.49-12.5 12.49-32.76 0-45.26zM100.59 480L32 411.41l258.38-258.4 68.6 68.6L100.59 480zm281.02-281.02l-68.6-68.6L411.38 32h.03L480 100.59l-98.39 98.39z"></path></svg>`;
        case "robot":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M192,416h64V384H192ZM576,224H544V192a95.99975,95.99975,0,0,0-96-96H336V16a16,16,0,0,0-32,0V96H192a95.99975,95.99975,0,0,0-96,96v32H64a31.99908,31.99908,0,0,0-32,32V384a32.00033,32.00033,0,0,0,32,32H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a32.00033,32.00033,0,0,0,32-32V256A31.99908,31.99908,0,0,0,576,224ZM96,384H64V256H96Zm416,32a64.18916,64.18916,0,0,1-64,64H192a64.18916,64.18916,0,0,1-64-64V192a63.99942,63.99942,0,0,1,64-64H448a63.99942,63.99942,0,0,1,64,64Zm64-32H544V256h32ZM416,192a64,64,0,1,0,64,64A64.07333,64.07333,0,0,0,416,192Zm0,96a32,32,0,1,1,32-32A31.97162,31.97162,0,0,1,416,288ZM384,416h64V384H384Zm-96,0h64V384H288ZM224,192a64,64,0,1,0,64,64A64.07333,64.07333,0,0,0,224,192Zm0,96a32,32,0,1,1,32-32A31.97162,31.97162,0,0,1,224,288Z"></path></svg>`;
        case "microchip":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M368 0H144c-26.51 0-48 21.49-48 48v416c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zm16 464c0 8.822-7.178 16-16 16H144c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h224c8.822 0 16 7.178 16 16v416zm128-358v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42V88h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zM30 376h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6z"></path></svg>`;
        case "record":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path   d="M160 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S64 42.98 64 96v160c0 53.02 42.98 96 96 96zM96 96c0-35.29 28.71-64 64-64s64 28.71 64 64v160c0 35.29-28.71 64-64 64s-64-28.71-64-64V96zm216 96h-16c-4.42 0-8 3.58-8 8v56c0 73.46-62.2 132.68-136.73 127.71C83.3 379.18 32 319.61 32 251.49V200c0-4.42-3.58-8-8-8H8c-4.42 0-8 3.58-8 8v50.34c0 83.39 61.65 156.12 144 164.43V480H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h176c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8h-72v-65.01C256.71 406.9 320 338.8 320 256v-56c0-4.42-3.58-8-8-8z"></path></svg>`;
        case "play":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"></path></svg>`;
        case "running":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M396 216h-14.53l-9.04-27.12c-8.11-24.31-24.18-44-44.5-58.04C347 117.91 360 96.73 360 72c0-39.7-32.3-72-72-72s-72 32.3-72 72c0 8.34 1.56 16.28 4.2 23.72-8.62-1.98-17.37-3.22-26.13-3.22-20.55 0-40.8 5.53-58.64 16l-46.19 24.07C64.7 147.31 56.7 179.3 71.4 203.88c9.39 15.62 26.48 25.27 44.63 25.27 8.98 0 17.82-2.33 25.65-6.76l18.95-9.85L101.75 344H52c-28.67 0-52 23.33-52 52s23.33 52 52 52h62.91c33.65 0 63.95-19.99 77.2-50.92l19.32-39.74 43.7 19.63-19.64 68.74c-7.87 27.58 8.15 56.42 35.71 64.29 4.8 1.34 9.55 2 14.31 2 23.07 0 43.62-15.5 49.98-37.69l24.4-85.4c7.11-24.86 2.02-50.92-12.01-71.12 6.2 1.45 12.63 2.21 19.2 2.21H396c28.67 0 52-23.33 52-52s-23.33-52-52-52zM288 32c22.09 0 40 17.91 40 40s-17.91 40-40 40-40-17.91-40-40 17.91-40 40-40zM162.69 384.48A51.915 51.915 0 0 1 114.91 416H52c-11.05 0-20-8.95-20-20s8.95-20 20-20h62.91c4.8 0 9.12-2.86 11.03-7.28l26.72-56.88c6.9 12.72 17.07 23.57 29.98 31.43l-19.95 41.21zM396 288h-28.94a51.94 51.94 0 0 1-49.33-35.55l-13.59-40.8c-2.83-8.46-8.21-15.43-15-20.67l-41.47 103.69 52.78 23.72c23.41 10.55 35.72 37.09 28.67 61.73l-24.39 85.38c-2.52 8.78-10.52 14.5-19.22 14.5-1.83 0-3.67-.25-5.52-.77-10.61-3.03-16.77-14.11-13.73-24.73l24.39-85.38c1.64-5.69-1.22-11.81-6.62-14.25 0 0-85.82-39.04-88.71-41.16-17.8-13.09-25.42-36.48-18.51-57.88l37.75-87.57s-16.9-3.77-20.5-3.77c-7.88 0-15.59 2.14-22.5 6.31l-45.25 23.52a20.137 20.137 0 0 1-10.29 2.84c-6.8 0-13.41-3.46-17.16-9.7-5.67-9.48-2.61-21.77 6.86-27.45l45.26-23.52c13.24-7.93 28.06-11.99 43.1-11.99 6.83 0 13.72.84 20.51 2.53l68.19 17.05c28 6.98 50.17 27.52 59.31 54.92l13.59 40.8c1.64 4.91 6.22 8.2 11.39 8.2H396c11.05 0 20 8.95 20 20s-8.95 20-20 20z"></path></svg>`;
        case "rotator":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>`;
        case "lock-closed":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M224 420c-11 0-20-9-20-20v-64c0-11 9-20 20-20s20 9 20 20v64c0 11-9 20-20 20zm224-148v192c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48h16v-64C64 71.6 136-.3 224.5 0 312.9.3 384 73.1 384 161.5V224h16c26.5 0 48 21.5 48 48zM96 224h256v-64c0-70.6-57.4-128-128-128S96 89.4 96 160v64zm320 240V272c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16z"></path></svg>`;
        case "lock-open":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M480.5 0C392-.3 320 71.6 320 160v64H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-62.6c0-70.7 56.7-129 127.3-129.4C550.2 31.6 608 89.2 608 160v84c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12v-82.5C640 73.1 568.9.3 480.5 0zM400 256c8.8 0 16 7.2 16 16v192c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352z"></path></svg>`;
        case "user-lock-closed":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M48 480a16 16 0 0 1-16-16v-41.6A102.47 102.47 0 0 1 134.4 320c19.6 0 39.1 16 89.6 16s70-16 89.6-16c2.7 0 5.3.6 7.9.8a79.45 79.45 0 0 1 13.1-30.7 132.34 132.34 0 0 0-21.1-2.1c-28.7 0-42.5 16-89.6 16s-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464a48 48 0 0 0 48 48h288.4a78.34 78.34 0 0 1-14.8-32zm176-224A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm0-224a96 96 0 1 1-96 96 96.15 96.15 0 0 1 96-96zm272 336a32 32 0 1 0 32 32 32 32 0 0 0-32-32zm96-80h-16v-48a80 80 0 0 0-160 0v48h-16a48 48 0 0 0-48 48v128a48 48 0 0 0 48 48h192a48 48 0 0 0 48-48V336a48 48 0 0 0-48-48zm-144-48a48 48 0 0 1 96 0v48h-96zm160 224a16 16 0 0 1-16 16H400a16 16 0 0 1-16-16V336a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"></path></svg>`;
        case "user-crown-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M352 0l-64 32-64-32-64 32L96 0v96h256V0zm-38.4 304h-16.71c-22.24 10.18-46.88 16-72.89 16s-50.65-5.82-72.89-16H134.4C60.17 304 0 364.17 0 438.4V464c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-25.6c0-74.23-60.17-134.4-134.4-134.4zM224 272c70.69 0 128-57.31 128-128v-16H96v16c0 70.69 57.31 128 128 128z"></path></svg>`;
        case "user-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>`;
        case "user-lock-opened":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M592,288H448V208.79c0-26.32,20.86-48.34,47.18-48.78A48,48,0,0,1,544,208v8a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8v-7c0-43.28-34-79.51-77.26-80.95A80,80,0,0,0,416,208v80H400a48,48,0,0,0-48,48V464a48,48,0,0,0,48,48H592a48,48,0,0,0,48-48V336A48,48,0,0,0,592,288Zm16,176a16,16,0,0,1-16,16H400a16,16,0,0,1-16-16V336a16,16,0,0,1,16-16H592a16,16,0,0,1,16,16ZM224,256A128,128,0,1,0,96,128,128,128,0,0,0,224,256Zm0-224a96,96,0,1,1-96,96A96,96,0,0,1,224,32ZM496,368a32,32,0,1,0,32,32A32,32,0,0,0,496,368ZM48,480a16,16,0,0,1-16-16V422.4A102.47,102.47,0,0,1,134.4,320c19.6,0,39.1,16,89.6,16s70-16,89.6-16c2.7,0,5.3.6,7.9.8a79.38,79.38,0,0,1,13.1-30.7,132.22,132.22,0,0,0-21.1-2.1c-28.7,0-42.5,16-89.6,16s-60.8-16-89.6-16C60.2,288,0,348.2,0,422.4V464a48,48,0,0,0,48,48H336.4a78.37,78.37,0,0,1-14.8-32Z"></path></svg>`;
        case "link":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M301.148 394.702l-79.2 79.19c-50.778 50.799-133.037 50.824-183.84 0-50.799-50.778-50.824-133.037 0-183.84l79.19-79.2a132.833 132.833 0 0 1 3.532-3.403c7.55-7.005 19.795-2.004 20.208 8.286.193 4.807.598 9.607 1.216 14.384.481 3.717-.746 7.447-3.397 10.096-16.48 16.469-75.142 75.128-75.3 75.286-36.738 36.759-36.731 96.188 0 132.94 36.759 36.738 96.188 36.731 132.94 0l79.2-79.2.36-.36c36.301-36.672 36.14-96.07-.37-132.58-8.214-8.214-17.577-14.58-27.585-19.109-4.566-2.066-7.426-6.667-7.134-11.67a62.197 62.197 0 0 1 2.826-15.259c2.103-6.601 9.531-9.961 15.919-7.28 15.073 6.324 29.187 15.62 41.435 27.868 50.688 50.689 50.679 133.17 0 183.851zm-90.296-93.554c12.248 12.248 26.362 21.544 41.435 27.868 6.388 2.68 13.816-.68 15.919-7.28a62.197 62.197 0 0 0 2.826-15.259c.292-5.003-2.569-9.604-7.134-11.67-10.008-4.528-19.371-10.894-27.585-19.109-36.51-36.51-36.671-95.908-.37-132.58l.36-.36 79.2-79.2c36.752-36.731 96.181-36.738 132.94 0 36.731 36.752 36.738 96.181 0 132.94-.157.157-58.819 58.817-75.3 75.286-2.651 2.65-3.878 6.379-3.397 10.096a163.156 163.156 0 0 1 1.216 14.384c.413 10.291 12.659 15.291 20.208 8.286a131.324 131.324 0 0 0 3.532-3.403l79.19-79.2c50.824-50.803 50.799-133.062 0-183.84-50.802-50.824-133.062-50.799-183.84 0l-79.2 79.19c-50.679 50.682-50.688 133.163 0 183.851z"></path></svg>`;
        case "stroke-cap-round":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M64,29.58V0H32C14.33,0,0,14.33,0,32v0c0,17.67,14.33,32,32,32h32V34.51H39.27v4.87H24.59V24.7h14.68v4.88H64z"/></svg>`;
        case "stroke-cap-projecting":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >	<polygon  points="64,29.58 64,0 0,0 0,64 64,64 64,34.51 39.27,34.51 39.27,39.38 24.59,39.38 24.59,24.7 39.27,24.7 39.27,29.58 	"/></svg>`;
        case "stroke-cap-butt":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="39.27,29.54 63.92,29.54 64,29.54 64,0 31.96,0 31.96,21.66 21.51,21.66 21.51,42.34 31.96,42.34 31.96,64 64,64 64,34.47 63.92,34.47 39.27,34.47 39.19,34.47 39.19,39.34 31.96,39.34 24.51,39.34 24.51,24.66 31.96,24.66 39.19,24.66 39.19,29.54 	"/></svg>`;
        case "stroke-align-center":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="0,64 64,64 64,45.54 30.34,45.54 30.34,50.41 15.66,50.41 15.66,35.73 20.54,35.73 20.54,0 0,0 "/><polygon  points="30.34,35.73 30.34,40.61 64,40.61 64,23.23 42.77,23.23 42.77,0 25.47,0 25.47,35.73 "/></svg>`;
        case "stroke-align-inside":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="17.54,32.73 15.66,32.73 12.66,32.73 12.66,53.41 33.34,53.41 33.34,48.54 64,48.54 64,45.54 30.34,45.54 30.34,50.41 15.66,50.41 15.66,35.73 20.54,35.73 20.54,0 17.54,0 	"/><polygon points="30.34,35.73 30.34,40.61 64,40.61 64,16.23 48.77,16.23 48.77,0 25.47,0 25.47,35.73 	"/></svg>`;
        case "stroke-align-outside":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >	<polygon points="0,64 64,64 64,45.54 30.34,45.54 30.34,50.41 15.66,50.41 15.66,35.73 20.54,35.73 20.54,0 0,0 "/>	<polygon points="64,37.61 33.34,37.61 33.34,35.73 33.34,32.73 30.34,32.73 28.47,32.73 28.47,0 25.47,0 25.47,35.73 30.34,35.73 30.34,40.61 64,40.61"/></svg>`;
        case "stroke-join-miter":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve"><polygon  points="0,0 0,64 29.46,64 29.46,39.34 24.59,39.34 24.59,39.34 24.59,24.66 39.27,24.66 39.27,24.66 39.27,29.54 64,29.54 64,0 "/><polygon points="39.27,39.34 39.27,39.34 39.27,39.34 34.39,39.34 34.39,64 48.77,64 48.77,48.77 64,48.77 64,34.47 39.27,34.47"/></svg>`;
        case "stroke-join-round":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" ><path  d="M0,36.75V64h29.46V39.34h-4.87v0V24.66h14.68h0v4.88H64V0H36.75C17.56,0,0,17.56,0,36.75z"/><polygon points="39.27,39.34 39.27,39.34 39.27,39.34 34.39,39.34 34.39,64 48.77,64 48.77,48.77 64,48.77 64,34.47 39.27,34.47 "/>`;
        case "stroke-join-bevel":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon class="st0" points="0,32 0,64 29.46,64 29.46,39.34 24.59,39.34 24.59,39.34 24.59,24.66 39.27,24.66 39.27,24.66 39.27,29.54 64,29.54 64,0 32,0 "/><polygon class="st0" points="39.27,39.34 39.27,39.34 39.27,39.34 34.39,39.34 34.39,64 48.77,64 48.77,48.77 64,48.77 64,34.47 39.27,34.47 "/></svg>`;
        case "ruler":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M635.7 165.8L556.1 27.9C550.2 17.7 539.5 12 528.5 12c-5.4 0-10.9 1.4-15.9 4.3L15.9 302.8C.7 311.5-4.5 331 4.3 346.2L83.9 484c5.9 10.2 16.6 15.9 27.6 15.9 5.4 0 10.9-1.4 15.9-4.3L624 209.1c15.3-8.6 20.5-28.1 11.7-43.3zM111.5 468.2L31.9 330.3l69-39.8 43.8 75.8c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-43.8-75.8 55.2-31.8 27.9 48.2c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-27.9-48.2 55.2-31.8 43.8 75.8c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9L294 179.1l55.2-31.8 27.9 48.2c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-27.9-48.2L432 99.5l43.8 75.8c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-43.8-75.8 69-39.8 79.6 137.8-496.7 286.7z"></path></svg>`;
        case "no-wrap":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >	<rect y="57.5"  width="64" height="5"/>	<rect x="18.32" y="34.5" class="st0" width="27.36" height="9"/>	<rect x="18.32" y="48.5" class="st0" width="27.36" height="3.42"/>	<rect x="47.68" y="43.5" class="st0" width="16.32" height="5"/>	<rect y="43.5"  width="16.32" height="5"/>	<rect x="18.32" y="20.5" class="st0" width="27.36" height="9"/>	<rect x="47.68" y="29.5" class="st0" width="16.32" height="5"/>	<rect y="29.5"  width="16.32" height="5"/>	<rect x="18.32" y="12.15" class="st0" width="27.36" height="3.35"/>	<rect y="15.5"  width="16.32" height="5"/><rect x="47.68" y="15.5"  width="16.32" height="5"/><rect y="1.5" width="64" height="5"/><rect x="12.32" y="11.15" width="39.36" height="41.77"/></svg>`;
        case "wrap-both-sides":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"> <rect y="57.5" class="st0" width="64" height="5"/><path class="st0" d="M14.47,43.5H0v5h17.26C16.17,46.99,15.23,45.31,14.47,43.5z"/><path class="st0" d="M49.53,43.5c-0.76,1.81-1.7,3.49-2.79,5H64v-5H49.53z"/>	<path class="st0" d="M12.21,32.08c0-0.87,0.04-1.73,0.11-2.58H0v5h12.31C12.24,33.7,12.21,32.89,12.21,32.08z"/><path class="st0" d="M51.68,29.5c0.07,0.85,0.11,1.71,0.11,2.58c0,0.82-0.03,1.63-0.1,2.42H64v-5H51.68z"/>	<path class="st0" d="M17.36,15.5H0v5h14.53C15.31,18.69,16.26,17.01,17.36,15.5z"/>	<path class="st0" d="M46.64,15.5c1.1,1.51,2.05,3.19,2.83,5H64v-5H46.64z"/><rect y="1.5" class="st0" width="64" height="5"/>	<ellipse class="st0" cx="32" cy="32.07" rx="12.54" ry="15.18"/></svg>`;
        case "printess-wand":
            return `<svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64">	<path   d="M58.08,21.21l-7.11-7.55l2.19-10.13c0.16-0.74-0.12-1.52-0.71-1.99s-1.41-0.57-2.1-0.24l-9.38,4.42L32.01,0.5		c-0.66-0.38-1.48-0.36-2.11,0.06c-0.63,0.42-0.98,1.17-0.88,1.92l1.31,10.29l-7.73,6.91c-0.57,0.51-0.8,1.29-0.59,2.03		c0.2,0.73,0.81,1.29,1.55,1.43l7.4,1.4L5.41,55.96c-0.87,1.07-0.71,2.65,0.36,3.52c0.46,0.38,1.02,0.56,1.58,0.56		c0.73,0,1.45-0.32,1.94-0.92l25.6-31.48l3.05,6.92c0.31,0.7,0.98,1.16,1.74,1.19c0.03,0,0.06,0,0.09,0c0.73,0,1.4-0.4,1.75-1.04		l4.98-9.09l10.32-1.05c0.76-0.08,1.41-0.58,1.67-1.29C58.76,22.56,58.6,21.76,58.08,21.21z M45.06,21.74		c-0.66,0.07-1.24,0.45-1.55,1.03l-3.54,6.46l-2.97-6.74c-0.27-0.6-0.81-1.04-1.46-1.16l-7.24-1.37l5.49-4.91		c0.49-0.44,0.73-1.09,0.65-1.74L33.5,6l6.37,3.71c0.57,0.33,1.27,0.36,1.86,0.08l6.66-3.14l-1.56,7.2		c-0.14,0.64,0.05,1.31,0.5,1.79L52.39,21L45.06,21.74z"/>	<polygon   points="12.92,5.15 10.56,9.47 6.25,11.83 10.56,14.19 12.92,18.5 15.28,14.19 19.6,11.83 15.28,9.47 		12.92,5.15 	"/>	<path  d="M49.4,40.73c1.38,0,2.77,1,2.77,2.63c0,1.81-1.7,2.63-2.63,2.63s-2.63-0.9-2.63-2.63		c0-2.29,2.02-2.63,2.63-2.63 M49.54,34.48l-3.14,5.74l-5.74,3.14l5.74,3.14l3.14,5.74l3.14-5.74l5.74-3.14l-5.74-3.14L49.54,34.48		L49.54,34.48z"/></svg>`;
        case "shopping-cart":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192z"></path></svg>`;
        case "shopping-cart-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>`;
        case "shopping-cart-add":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192zm-106.641-75.515l-51.029 51.029c-4.686 4.686-12.284 4.686-16.971 0l-51.029-51.029c-7.56-7.56-2.206-20.485 8.485-20.485H320v-52c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12v52h35.029c10.691 0 16.045 12.926 8.486 20.485z"></path></svg>`;
        case "folder-plus":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464,128H272L217.37,73.37A32,32,0,0,0,194.74,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128Zm16,272a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V112A16,16,0,0,1,48,96H194.74l54.63,54.63A32,32,0,0,0,272,160H464a16,16,0,0,1,16,16ZM339.5,272h-68V204a12,12,0,0,0-12-12h-8a12,12,0,0,0-12,12v68h-68a12,12,0,0,0-12,12v8a12,12,0,0,0,12,12h68v68a12,12,0,0,0,12,12h8a12,12,0,0,0,12-12V304h68a12,12,0,0,0,12-12v-8A12,12,0,0,0,339.5,272Z"></path></svg>`;
        case "eye-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>`;
        case "eye-solid-slash":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>`;
        case "lock-closed-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>`;
        case "print-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>`;
        case "carret-down-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`;
        case "carret-right-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path  d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>`;
        case "font":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M424 448h-36.6L247.13 42.77A16 16 0 0 0 232 32h-16a16 16 0 0 0-15.12 10.77L60.6 448H24a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H94.48l44.3-128h170.44l44.31 128H312a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM149.86 288L224 73.8 298.14 288z"></path></svg>`;
        case "check-square":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 32c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352m-34.301 98.293l-8.451-8.52c-4.667-4.705-12.265-4.736-16.97-.068l-163.441 162.13-68.976-69.533c-4.667-4.705-12.265-4.736-16.97-.068l-8.52 8.451c-4.705 4.667-4.736 12.265-.068 16.97l85.878 86.572c4.667 4.705 12.265 4.736 16.97.068l180.48-179.032c4.704-4.667 4.735-12.265.068-16.97z"></path></svg>`;
        case "user-circle":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"></path></svg>`;
        case "send-back":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M175 64H79a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm-16 96H95V96h64zm288-16v80h32v-80a48 48 0 0 0-48-48H287v32h144a16 16 0 0 1 16 16zm112 176h-96a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16zm-16 96h-64v-64h64zm48-160H431a48 48 0 0 0-48 48v160a48 48 0 0 0 48 48h160a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48zm16 208a16 16 0 0 1-16 16H431a16 16 0 0 1-16-16V304a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16zm-416-96v-80h-32v80a48 48 0 0 0 48 48h144v-32H207a16 16 0 0 1-16-16zm64-160V48a48 48 0 0 0-48-48H47A48 48 0 0 0-1 48v160a48 48 0 0 0 48 48h160a48 48 0 0 0 48-48zm-224 0V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v160a16 16 0 0 1-16 16H47a16 16 0 0 1-16-16z"></path></svg>`;
        case "send-backward":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M464,160H208a48,48,0,0,0-48,48V464a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V208A48,48,0,0,0,464,160Zm16,304a16,16,0,0,1-16,16H208a16,16,0,0,1-16-16V208a16,16,0,0,1,16-16H464a16,16,0,0,1,16,16ZM32,304V48A16,16,0,0,1,48,32H304a16,16,0,0,1,16,16v80h32V48A48,48,0,0,0,304,0H48A48,48,0,0,0,0,48V304a48,48,0,0,0,48,48h80V320H48A16,16,0,0,1,32,304Zm400-80H240a16,16,0,0,0-16,16V432a16,16,0,0,0,16,16H432a16,16,0,0,0,16-16V240A16,16,0,0,0,432,224ZM416,416H256V256H416Z"></path></svg>`;
        case "bring-front":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M32 208V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v16h32V48a48 48 0 0 0-48-48H48A48 48 0 0 0 0 48v160a48 48 0 0 0 48 48h80v-32H48a16 16 0 0 1-16-16zm448 160V144a48 48 0 0 0-48-48H208a48 48 0 0 0-48 48v224a48 48 0 0 0 48 48h224a48 48 0 0 0 48-48zm-288 0V144a16 16 0 0 1 16-16h224a16 16 0 0 1 16 16v224a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16zm400-112h-80v32h80a16 16 0 0 1 16 16v160a16 16 0 0 1-16 16H432a16 16 0 0 1-16-16v-16h-32v16a48 48 0 0 0 48 48h160a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48zM464 448h96a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16h-48v32h32v64h-48.41a79.76 79.76 0 0 1-41.25 28.43A15.66 15.66 0 0 0 464 448zM176 64H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h48v-32H96V96h48.41a79.76 79.76 0 0 1 41.25-28.43A15.66 15.66 0 0 0 176 64z"></path></svg>`;
        case "bring-forward":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 304V48a48 48 0 0 0-48-48H48A48 48 0 0 0 0 48v256a48 48 0 0 0 48 48h256a48 48 0 0 0 48-48zM48 48h256v256H48zm416 112h-80v48h80v256H208v-80h-48v80a48 48 0 0 0 48 48h256a48 48 0 0 0 48-48V208a48 48 0 0 0-48-48zM240 416a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V256a16 16 0 0 0-16-16h-32v144H240z"></path></svg>`;
        case "distort":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path   d="M483.55,227.55H462c-50.68,0-76.07-61.27-40.23-97.11L437,115.19A28.44,28.44,0,0,0,396.8,75L381.56,90.22A55.74,55.74,0,0,1,341.74,107c-29.24,0-57.29-22.7-57.29-57V28.44a28.45,28.45,0,0,0-56.9,0V50c0,34.29-28.05,57-57.29,57a55.7,55.7,0,0,1-39.82-16.77L115.2,75A28.44,28.44,0,0,0,75,115.19l15.25,15.25c35.84,35.84,10.45,97.11-40.23,97.11H28.45a28.45,28.45,0,1,0,0,56.89H50c50.68,0,76.07,61.28,40.23,97.12L75,396.8A28.45,28.45,0,0,0,115.2,437l15.24-15.25A55.7,55.7,0,0,1,170.25,405c29.25,0,57.3,22.7,57.3,57v21.54a28.45,28.45,0,0,0,56.9,0V462c0-34.29,28.05-57,57.3-57a55.7,55.7,0,0,1,39.81,16.77L396.8,437A28.45,28.45,0,0,0,437,396.8l-15.25-15.24c-35.84-35.84-10.45-97.12,40.23-97.12h21.54a28.45,28.45,0,1,0,0-56.89ZM379.88,307.32c-10.64,25.71-8.94,53.3,3.84,76.44a86.92,86.92,0,0,0-42-10.75A89.42,89.42,0,0,0,256,437.11,89.42,89.42,0,0,0,170.25,373a86.92,86.92,0,0,0-42,10.75c12.78-23.14,14.48-50.73,3.84-76.44s-31.33-44-56.69-51.32c25.36-7.34,46.05-25.63,56.69-51.32s8.94-53.3-3.84-76.44a87,87,0,0,0,42,10.75A89.42,89.42,0,0,0,256,74.88,89.42,89.42,0,0,0,341.74,139a87,87,0,0,0,42-10.75c-12.78,23.14-14.48,50.73-3.84,76.44s31.33,44,56.69,51.32C411.21,263.33,390.52,281.63,379.88,307.32ZM224,176a48,48,0,1,0,48,48A48,48,0,0,0,224,176Zm0,64a16,16,0,1,1,16-16A16,16,0,0,1,224,240Zm80,48a16,16,0,1,0,16,16A16,16,0,0,0,304,288Z"></path></svg>`;
        case "list-ul":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M32.39 224C14.73 224 0 238.33 0 256s14.73 32 32.39 32a32 32 0 0 0 0-64zm0-160C14.73 64 0 78.33 0 96s14.73 32 32.39 32a32 32 0 0 0 0-64zm0 320C14.73 384 0 398.33 0 416s14.73 32 32.39 32a32 32 0 0 0 0-64zM504 80H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8V88a8 8 0 0 0-8-8zm0 160H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 160H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`;
        case "portrait":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M320 0H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm32 448c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h256c17.6 0 32 14.4 32 32v384zM192 288c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C84.2 342.1 80 355 80 368.9V408c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-39.1c0-14 9-32.9 33.2-32.9 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 24.3 0 33.2 18.9 33.2 32.9V408c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-39.1c0-13.9-4.2-26.8-11.4-37.5-12.1-18-32.7-27.4-53.8-27.4z"></path></svg>`;
        case "ellipsis-v":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path  d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"></path></svg>`;
        case "sun-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M256 143.7c-61.8 0-112 50.3-112 112.1s50.2 112.1 112 112.1 112-50.3 112-112.1-50.2-112.1-112-112.1zm0 192.2c-44.1 0-80-35.9-80-80.1s35.9-80.1 80-80.1 80 35.9 80 80.1-35.9 80.1-80 80.1zm256-80.1c0-5.3-2.7-10.3-7.1-13.3L422 187l19.4-97.9c1-5.2-.6-10.7-4.4-14.4-3.8-3.8-9.1-5.5-14.4-4.4l-97.8 19.4-55.5-83c-6-8.9-20.6-8.9-26.6 0l-55.5 83-97.8-19.5c-5.3-1.1-10.6.6-14.4 4.4-3.8 3.8-5.4 9.2-4.4 14.4L90 187 7.1 242.5c-4.4 3-7.1 8-7.1 13.3 0 5.3 2.7 10.3 7.1 13.3L90 324.6l-19.4 97.9c-1 5.2.6 10.7 4.4 14.4 3.8 3.8 9.1 5.5 14.4 4.4l97.8-19.4 55.5 83c3 4.5 8 7.1 13.3 7.1s10.3-2.7 13.3-7.1l55.5-83 97.8 19.4c5.4 1.2 10.7-.6 14.4-4.4 3.8-3.8 5.4-9.2 4.4-14.4L422 324.6l82.9-55.5c4.4-3 7.1-8 7.1-13.3zm-116.7 48.1c-5.4 3.6-8 10.1-6.8 16.4l16.8 84.9-84.8-16.8c-6.6-1.4-12.8 1.4-16.4 6.8l-48.1 72-48.1-71.9c-3-4.5-8-7.1-13.3-7.1-1 0-2.1.1-3.1.3l-84.8 16.8 16.8-84.9c1.2-6.3-1.4-12.8-6.8-16.4l-71.9-48.1 71.9-48.2c5.4-3.6 8-10.1 6.8-16.4l-16.8-84.9 84.8 16.8c6.5 1.3 12.8-1.4 16.4-6.8l48.1-72 48.1 72c3.6 5.4 9.9 8.1 16.4 6.8l84.8-16.8-16.8 84.9c-1.2 6.3 1.4 12.8 6.8 16.4l71.9 48.2-71.9 48z"></path></svg>`;
        case "adjust":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M256 40c119.945 0 216 97.337 216 216 0 119.945-97.337 216-216 216-119.945 0-216-97.337-216-216 0-119.945 97.337-216 216-216m0-32C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm-32 124.01v247.98c-53.855-13.8-96-63.001-96-123.99 0-60.99 42.145-110.19 96-123.99M256 96c-88.366 0-160 71.634-160 160s71.634 160 160 160V96z"></path></svg>`;
        case "scroll-old":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M616 352h-72v-73.38L521.38 256 544 233.38v-82.75L521.38 128l22.25-22.28-.97-7.77C535.59 42.11 488.03 0 432 0H80C35.88 0 0 35.89 0 80v88c0 13.23 10.78 24 24 24h104v41.38L150.62 256 128 278.62v132.81c0 51.28 37.84 95.23 86.16 100.08 1.5.15 3 .14 4.5.23v.26h312C590.94 512 640 462.95 640 402.67V376c0-13.23-10.78-24-24-24zM128 160H32V80c0-26.47 21.53-48 48-48s48 21.53 48 48v80zm32 251.44V291.88L195.88 256 160 220.12V80c0-18-5.97-34.62-16.03-48H432c37.41 0 69.56 26.39 77.59 62.5L476.12 128 512 163.88v56.25L476.12 256 512 291.88V352h-73.38L416 374.62 393.38 352H320c-17.66 0-32 14.36-32 32v32c0 18.05-7.69 35.34-21.06 47.47-13.59 12.3-31.12 18.09-49.59 16.2-32.16-3.22-57.35-33.19-57.35-68.23zm448-8.77c0 42.64-34.69 77.33-77.34 77.33H294.83c15.82-17.55 25.17-40.18 25.17-64v-32h60.12L416 419.88 451.88 384H608v18.67z"></path></svg>`;
        case "align-top":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">  <polygon points="500 0 0 0 0 34.468 88.66 34.468 88.66 433.596 228.66 433.596 228.66 34.468 274.787 34.468 274.787 313.745 414.787 313.745 414.787 34.468 500 34.468 500 0" /></svg>
               `;
        case "align-middle":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><polygon points="500 234.489 414.787 234.489 414.787 111.149 274.787 111.149 274.787 234.489 228.66 234.489 228.66 50 88.66 50 88.66 234.489 0 234.489 0 268.957 88.66 268.957 88.66 450 228.66 450 228.66 268.957 274.787 268.957 274.787 391.149 414.787 391.149 414.787 268.957 500 268.957 500 234.489" /></svg>`;
        case "align-bottom":
            return `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 500 500"><rect x="88.66" y="65.404" width="140" height="400" /> <polygon points="414.787 465.532 414.787 186.255 274.787 186.255 274.787 465.532 0 465.532 0 500 500 500 500 465.532 414.787 465.532" /></svg>`;
        case "align-left":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">  <polygon points="433.596 271.34 34.468 271.34 34.468 225.213 313.745 225.213 313.745 85.213 34.468 85.213 34.468 0 0 0 0 500 34.468 500 34.468 411.34 433.596 411.34 433.596 271.34" /></svg>`;
        case "align-center":
            return `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 500 500">  <polygon points="450 271.34 268.957 271.34 268.957 225.213 391.149 225.213 391.149 85.213 268.957 85.213 268.957 0 234.489 0 234.489 85.213 111.149 85.213 111.149 225.213 234.489 225.213 234.489 271.34 50 271.34 50 411.34 234.489 411.34 234.489 500 268.957 500 268.957 411.34 450 411.34 450 271.34"/></svg>`;
        case "align-right":
            return `<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 500 500">    <rect x="65.404" y="271.34" width="400" height="140" /><polygon points="465.532 0 465.532 85.213 186.255 85.213 186.255 225.213 465.532 225.213 465.532 500 500 500 500 0 465.532 0"/></svg>`;
        case "space-vertical-around":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="120" y="296.302" width="260" height="140"/> <rect x="120" y="61.174" width="260" height="140"/> <path d="M403.446,500H96.554C87.412,500,80,493.284,80,485s7.412-15,16.554-15H403.446c9.142,0,16.554,6.716,16.554,15S412.588,500,403.446,500Z"/> <path d="M403.446,265H96.554C87.412,265,80,258.284,80,250s7.412-15,16.554-15H403.446c9.142,0,16.554,6.716,16.554,15S412.588,265,403.446,265Z"/> <path d="M403.446,31H96.554C87.412,31,80,24.284,80,16S87.412,1,96.554,1H403.446C412.588,1,420,7.716,420,16S412.588,31,403.446,31Z"/> </svg>`;
        case "space-vertical-between":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="122.414" y="296.84" width="260" height="140"/> <rect x="122.414" y="60.713" width="260" height="140"/> <path d="M405.859,265H98.968c-9.143,0-16.554-6.716-16.554-15s7.411-15,16.554-15H405.859c9.143,0,16.555,6.716,16.555,15S415,265,405.859,265Z"/> </svg>`;
        case "space-horizontal-around":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="60.552" y="124.264" width="140" height="260"/> <rect x="297.679" y="124.264" width="140" height="260"/> <path d="M485,424.263c-8.284,0-15-7.412-15-16.554V100.817c0-9.142,6.716-16.554,15-16.554s15,7.412,15,16.554V407.709C500,416.851,493.284,424.263,485,424.263Z"/> <path d="M250,424.263c-8.284,0-15-7.412-15-16.554V100.817c0-9.142,6.716-16.554,15-16.554s15,7.412,15,16.554V407.709C265,416.851,258.284,424.263,250,424.263Z"/> <path d="M15,424.263c-8.284,0-15-7.412-15-16.554V100.817c0-9.142,6.716-16.554,15-16.554s15,7.412,15,16.554V407.709C30,416.851,23.284,424.263,15,424.263Z"/> </svg>`;
        case "space-horizontal-between":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="58.975" y="121.704" width="140" height="260"/> <rect x="298.102" y="121.704" width="140" height="260"/> <path d="M250,421.705c-8.284,0-15-7.412-15-16.555V98.259c0-9.143,6.716-16.554,15-16.554s15,7.411,15,16.554V405.15C265,414.293,258.284,421.705,250,421.705Z"/> </svg>`;
        case "layer-group":
            return `<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M512 256.01c0-9.98-5.81-18.94-14.77-22.81l-99.74-43.27 99.7-43.26c9-3.89 14.81-12.84 14.81-22.81s-5.81-18.92-14.77-22.79L271.94 3.33c-10.1-4.44-21.71-4.45-31.87-.02L14.81 101.06C5.81 104.95 0 113.9 0 123.87s5.81 18.92 14.77 22.79l99.73 43.28-99.7 43.26C5.81 237.08 0 246.03 0 256.01c0 9.97 5.81 18.92 14.77 22.79l99.72 43.26-99.69 43.25C5.81 369.21 0 378.16 0 388.14c0 9.97 5.81 18.92 14.77 22.79l225.32 97.76a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l225.29-97.74c9-3.89 14.81-12.84 14.81-22.81 0-9.98-5.81-18.94-14.77-22.81l-99.72-43.26 99.69-43.25c9-3.89 14.81-12.84 14.81-22.81zM45.23 123.87l208.03-90.26.03-.02c1.74-.71 3.65-.76 5.45.02l208.03 90.26-208.03 90.27c-1.81.77-3.74.77-5.48 0L45.23 123.87zm421.54 264.27L258.74 478.4c-1.81.77-3.74.77-5.48 0L45.23 388.13l110.76-48.06 84.11 36.49a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l84.11-36.49 110.76 48.07zm-208.03-41.87c-1.81.77-3.74.77-5.48 0L45.23 256 156 207.94l84.1 36.5a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l84.1-36.49 110.77 48.07-208.03 90.25z"></path></svg>`;
        case "facebook-round":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>`;
        case "primary-doc":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <g>
        <path d="M149.075,177.875q13.047-5.4,27.225-12.375t27.675-15.3q13.5-8.322,25.875-17.551a177.165,177.165,0,0,0,22.275-19.574h46.8v273.85h-67.05V200.375a203.922,203.922,0,0,1-30.15,16.425q-16.653,7.425-32.4,12.825Z" />
        <path d="M438.681,40A21.344,21.344,0,0,1,460,61.319V438.681A21.344,21.344,0,0,1,438.681,460H61.319A21.344,21.344,0,0,1,40,438.681V61.319A21.344,21.344,0,0,1,61.319,40H438.681m0-40H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Z" />
      </g>
    </svg>
    `;
        case "primary-doc-invers":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <path d="M438.681,0H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0ZM297.425,388.05h-67.05V201.5a203.922,203.922,0,0,1-30.15,16.425q-16.653,7.425-32.4,12.825L147.575,179q13.047-5.4,27.225-12.375t27.675-15.3q13.5-8.322,25.875-17.551A177.165,177.165,0,0,0,250.625,114.2h46.8Z" />
    </svg>`;
        case "preview-doc":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <g>
        <path d="M438.681,40A21.344,21.344,0,0,1,460,61.319V438.681A21.344,21.344,0,0,1,438.681,460H61.319A21.344,21.344,0,0,1,40,438.681V61.319A21.344,21.344,0,0,1,61.319,40H438.681m0-40H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Z" />
        <path d="M247.218,179.532a67.28,67.28,0,0,0-19,3.052,33.841,33.841,0,0,1-46.086,46.242,67.868,67.868,0,1,0,65.09-49.294Zm193.557,59.235c-36.67-71.789-109.267-120.361-192.392-120.361S92.641,167.011,55.991,238.774a22.014,22.014,0,0,0,0,19.8c36.67,71.79,109.267,120.362,192.392,120.362s155.742-48.606,192.392-120.368A22.016,22.016,0,0,0,440.775,238.767Zm-193.557,97.02c-60.011,0-115.028-33.57-144.738-87.893C132.19,193.57,187.2,160,247.218,160s115.028,33.57,144.739,87.894C362.252,302.217,307.235,335.787,247.218,335.787Z" />
      </g>
    </svg>
    `;
        case "preview-doc-invers":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <g>
        <path d="M248.718,160.375c-60.017,0-115.028,33.57-144.738,87.894,29.71,54.323,84.727,87.893,144.738,87.893s115.034-33.57,144.739-87.893C363.746,193.945,308.735,160.375,248.718,160.375Zm65.5,106.607A67.973,67.973,0,1,1,183.628,229.2a33.615,33.615,0,0,0,16.424,4.419,33.94,33.94,0,0,0,29.662-50.661,64.66,64.66,0,0,1,38.037-.383A68.218,68.218,0,0,1,314.219,266.982Z" />
        <path d="M438.681,0H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Zm3.594,258.947c-36.65,71.762-109.267,120.368-192.392,120.368S94.161,330.743,57.491,258.953a22.014,22.014,0,0,1,0-19.8c36.65-71.763,109.267-120.368,192.392-120.368s155.722,48.572,192.392,120.361A22.016,22.016,0,0,1,442.275,258.947Z" />
      </g>
    </svg>
    `;
        case "production-doc":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <path d="M390.625,257.812a23.438,23.438,0,1,0,23.438,23.438A23.438,23.438,0,0,0,390.625,257.812Zm31.25-89.937V97.539A46.876,46.876,0,0,0,408.145,64.4L357.48,13.73A46.876,46.876,0,0,0,324.336,0H107.891C91.445,0,78.125,13.994,78.125,31.25V167.875A78.128,78.128,0,0,0,0,246V375a15.62,15.62,0,0,0,15.625,15.625h62.5v93.75A15.62,15.62,0,0,0,93.75,500h312.5a15.62,15.62,0,0,0,15.625-15.625v-93.75h62.5A15.62,15.62,0,0,0,500,375V246A78.128,78.128,0,0,0,421.875,167.875ZM121,39.875H312.5V93.75a15.62,15.62,0,0,0,15.625,15.625H379v62.5H121Zm258,420.25H122v-69.5H379ZM457.125,347.75H42.875V246a31.291,31.291,0,0,1,31.25-31.25h351.75A31.291,31.291,0,0,1,457.125,246Z" />
    </svg>
    `;
        case "production-doc-invers":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <path d="M421.875,167.875V97.539A46.876,46.876,0,0,0,408.145,64.4L357.48,13.73A46.876,46.876,0,0,0,324.336,0H107.891C91.445,0,78.125,13.994,78.125,31.25V167.875A78.128,78.128,0,0,0,0,246V375a15.62,15.62,0,0,0,15.625,15.625h62.5v93.75A15.62,15.62,0,0,0,93.75,500h312.5a15.62,15.62,0,0,0,15.625-15.625v-93.75h62.5A15.62,15.62,0,0,0,500,375V246A78.128,78.128,0,0,0,421.875,167.875ZM121,39.875H312.5V93.75a15.62,15.62,0,0,0,15.625,15.625H379v62.5H121Zm258,420.25H122v-69.5H379Zm11.021-155.794a23.438,23.438,0,1,1,23.438-23.437A23.443,23.443,0,0,1,390.021,304.331Z" />
    </svg>
    `;
        case "layout-snippet":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <g>
        <path d="M438.681,40A21.344,21.344,0,0,1,460,61.319V438.681A21.344,21.344,0,0,1,438.681,460H61.319A21.344,21.344,0,0,1,40,438.681V61.319A21.344,21.344,0,0,1,61.319,40H438.681m0-40H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Z" />
        <path d="M306.3,419.918a15,15,0,0,1-16.463-13.362h0a14.99,14.99,0,0,1,13.36-16.473h0a15,15,0,0,1,16.475,13.36h0a15,15,0,0,1-12.361,16.332h0C306.971,419.833,306.635,419.881,306.3,419.918Zm32.1-10.006a15.023,15.023,0,0,1,8.474-19.459h0a15,15,0,0,1,19.448,8.476h0a15,15,0,0,1-8.465,19.446h0a15.267,15.267,0,0,1-2.961.835h0A15.024,15.024,0,0,1,338.4,409.912Zm-85.17,9.247-.008.012h0a15.013,15.013,0,0,1-12.236-17.337h0A15,15,0,0,1,258.312,389.6h0a15.009,15.009,0,0,1,12.244,17.326h0a15.02,15.02,0,0,1-12.241,12.242h0A14.875,14.875,0,0,1,253.229,419.159Zm-50.618-1.082a15,15,0,0,1-7.1-19.985h0a15,15,0,0,1,20-7.093h0a14.988,14.988,0,0,1,7.09,19.988h0a14.977,14.977,0,0,1-11.015,8.337h0A14.849,14.849,0,0,1,202.611,418.077Z" />
        <path d="M345.891,112.072a15.014,15.014,0,0,1-7.742-19.758h0a15,15,0,0,1,19.758-7.732h0a15,15,0,0,1,7.732,19.748h0a14.987,14.987,0,0,1-12.783,8.962h0A15,15,0,0,1,345.891,112.072Zm-151.172-8.013a15,15,0,0,1,7.822-19.721h0a15,15,0,0,1,19.721,7.822h0a15.007,15.007,0,0,1-7.811,19.721h0a15.1,15.1,0,0,1-4.984,1.2h0A15.012,15.012,0,0,1,194.719,104.059ZM302.667,112.9h0a14.989,14.989,0,0,1-12.808-16.912h0a15,15,0,0,1,16.9-12.807h0a14.985,14.985,0,0,1,12.809,16.9h0a15,15,0,0,1-13.858,12.929h0A14.932,14.932,0,0,1,302.667,112.9Zm-61.82-12.891a14.994,14.994,0,0,1,12.858-16.874h0A14.993,14.993,0,0,1,270.569,96h0a15,15,0,0,1-12.86,16.873h0c-.347.044-.695.076-1.045.1h0A14.986,14.986,0,0,1,240.847,100.01Z" />
        <path d="M254.88,355.562l-8.631-6.142a497.046,497.046,0,0,1-51.729-43.463c-36.2-35.072-54.786-65.924-55.242-91.7-.3-16.99,7.154-31.8,21.556-42.839,15.728-12.052,33.054-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.432,16.034-2.99,32.148,1.2,46.592,12.124,15.439,11.675,23.43,27.262,23.108,45.076-.468,25.935-18.714,56.471-54.228,90.762a468.719,468.719,0,0,1-50.748,42.281ZM200.062,187.021c-6.894,0-13.8,2.712-20.982,8.212-6.912,5.3-9.936,11-9.807,18.488.3,17,16.582,42.016,45.861,70.436A478.656,478.656,0,0,0,255,318.5a450,450,0,0,0,38.736-33.146c28.585-27.658,44.5-52.329,44.8-69.467.091-5.135-.972-12.856-11.207-20.595-7.746-5.856-15.272-8-23-6.562-16.95,3.159-32.515,22.825-36.632,29.465l-13.078,21.1-12.582-21.364c-4.388-7.347-19.55-27.093-36.913-30.422A26.854,26.854,0,0,0,200.062,187.021Z" />
        <path d="M154.914,418.145a15,15,0,0,1-7.1-19.985h0a15,15,0,0,1,20-7.093h0a14.988,14.988,0,0,1,7.09,19.988h0a14.981,14.981,0,0,1-11.015,8.338h0A14.858,14.858,0,0,1,154.914,418.145Z" />
        <path d="M146.589,103.494a15,15,0,0,1,7.823-19.721h0A15,15,0,0,1,174.133,91.6h0a15.007,15.007,0,0,1-7.812,19.721h0a15.118,15.118,0,0,1-4.983,1.2h0A15.015,15.015,0,0,1,146.589,103.494Z" />
      </g>
    </svg>
    `;
        case "layout-snippet-invers":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <g>
        <path d="M320.09,195.292c-7.746-5.856-15.273-8-23-6.562-16.95,3.159-32.516,22.825-36.632,29.465l-13.078,21.1L234.8,217.929c-4.389-7.347-19.55-27.093-36.913-30.422a26.865,26.865,0,0,0-5.06-.486c-6.893,0-13.8,2.712-20.981,8.212-6.912,5.3-9.937,11-9.807,18.488.3,17,16.582,42.016,45.861,70.436A478.656,478.656,0,0,0,247.762,318.5,450,450,0,0,0,286.5,285.354c28.585-27.658,44.5-52.329,44.8-69.467C331.388,210.752,330.325,203.031,320.09,195.292Z" />
        <path d="M438.681,0H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0ZM329.149,92.314a15,15,0,1,1,7.742,19.758A15,15,0,0,1,329.149,92.314Zm-48.29,3.675A15.018,15.018,0,1,1,293.667,112.9,15,15,0,0,1,280.859,95.989ZM244.705,83.136a15,15,0,0,1,4,29.732c-.347.044-.695.076-1.045.1a15,15,0,0,1-2.959-29.831Zm-51.164,1.2a15,15,0,1,1-7.822,19.721A15,15,0,0,1,193.541,84.338Zm-46.129-.565a15,15,0,1,1-7.822,19.721A15,15,0,0,1,147.412,83.773ZM167.9,411.055a15,15,0,1,1-7.09-19.988A14.981,14.981,0,0,1,167.9,411.055Zm45.7-.068A15,15,0,1,1,206.507,391,14.975,14.975,0,0,1,213.6,410.987Zm47.959-4.062a14.974,14.974,0,0,1-17.327,12.234l-.008.012a15,15,0,1,1,17.335-12.246Zm36.75,12.85c-.335.058-.671.105-1.011.143a15.049,15.049,0,1,1,1.011-.143Zm50.55-1.4a15.267,15.267,0,0,1-2.961.835,15.035,15.035,0,1,1,2.961-.835ZM307.064,307.2a468.566,468.566,0,0,1-50.749,42.281l-8.673,6.081-8.631-6.142a497.115,497.115,0,0,1-51.73-43.463c-36.2-35.072-54.785-65.924-55.241-91.7-.3-16.99,7.153-31.8,21.556-42.839,15.727-12.052,33.053-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.432,16.034-2.99,32.147,1.2,46.592,12.124,15.439,11.675,23.429,27.262,23.108,45.076C360.823,242.373,342.578,272.909,307.064,307.2Z" />
      </g>
    </svg>
    `;
        case "group-snippet":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <g>
        <path d="M250,498c-66.937,0-129.657-25.233-176.6-71.053C26.066,380.754,0,318.623,0,252A250,250,0,0,1,426.776,75.224,248.361,248.361,0,0,1,500,252c0,66.623-26.066,128.754-73.4,174.947C379.657,472.767,316.938,498,250,498Zm0-456C134.205,42,40,136.205,40,252c0,115.514,92.243,206,210,206s210-90.486,210-206C460,136.205,365.8,42,250,42Z" />
        <path d="M274.537,421.95a15,15,0,0,1-16.464-13.362h0a14.99,14.99,0,0,1,13.361-16.473h0a15,15,0,0,1,16.474,13.36h0a15,15,0,0,1-12.361,16.332h0Q275.046,421.894,274.537,421.95Zm32.1-21.006a15.025,15.025,0,0,1,8.475-19.459h0a15,15,0,0,1,19.447,8.476h0a15,15,0,0,1-8.465,19.446h0a15.267,15.267,0,0,1-2.961.835h0A15.024,15.024,0,0,1,306.64,400.944Zm-85.17,19.247-.008.012h0a15.015,15.015,0,0,1-12.236-17.337h0a15,15,0,0,1,17.327-12.235h0A15.009,15.009,0,0,1,238.8,407.957h0A15.021,15.021,0,0,1,226.556,420.2h0A14.9,14.9,0,0,1,221.47,420.191Zm-50.618-16.082a15,15,0,0,1-7.1-19.985h0a15,15,0,0,1,20-7.093h0a14.989,14.989,0,0,1,7.091,19.988h0a14.98,14.98,0,0,1-11.016,8.337h0A14.85,14.85,0,0,1,170.852,404.109Z" />
        <path d="M315.941,117.156A15.012,15.012,0,0,1,308.2,97.4h0a15,15,0,0,1,19.758-7.732h0a15,15,0,0,1,7.732,19.748h0a14.988,14.988,0,0,1-12.783,8.962h0A15,15,0,0,1,315.941,117.156Zm-151.173-8.013a15,15,0,0,1,7.823-19.721h0a15,15,0,0,1,19.721,7.822h0a15.006,15.006,0,0,1-7.812,19.721h0a15.1,15.1,0,0,1-4.983,1.2h0A15.014,15.014,0,0,1,164.768,109.143Zm107.949-4.158h0a14.989,14.989,0,0,1-12.808-16.912h0a15,15,0,0,1,16.9-12.807h0a14.984,14.984,0,0,1,12.808,16.9h0A15,15,0,0,1,275.761,105.1h0A15,15,0,0,1,272.717,104.985ZM210.9,92.094A14.994,14.994,0,0,1,223.755,75.22h0a14.991,14.991,0,0,1,16.863,12.859h0a15,15,0,0,1-12.859,16.873h0c-.347.044-.7.076-1.045.1h0A14.986,14.986,0,0,1,210.9,92.094Z" />
        <path d="M250.93,352.427l-8.631-6.142a496.968,496.968,0,0,1-51.73-43.463c-36.2-35.072-54.785-65.924-55.241-91.7-.3-16.99,7.153-31.8,21.556-42.839,15.727-12.052,33.054-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.431,16.034-2.991,32.147,1.2,46.592,12.124C356.911,179.9,364.9,195.489,364.58,213.3c-.469,25.935-18.714,56.471-54.228,90.762A468.936,468.936,0,0,1,259.6,346.347ZM196.111,183.886c-6.893,0-13.8,2.713-20.981,8.213-6.912,5.3-9.937,11-9.807,18.487.3,17,16.582,42.017,45.861,70.436a478.656,478.656,0,0,0,39.866,34.343,449.818,449.818,0,0,0,38.736-33.146c28.585-27.657,44.5-52.328,44.8-69.467.091-5.135-.972-12.856-11.207-20.595-7.746-5.856-15.273-8-23-6.561-16.95,3.158-32.516,22.824-36.632,29.465l-13.078,21.1-12.582-21.364c-4.389-7.347-19.55-27.093-36.913-30.422A26.865,26.865,0,0,0,196.111,183.886Z" />
      </g>
    </svg>`;
        case "group-snippet-invers":
            return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <path d="M322.128,194.532c-7.746-5.856-15.273-8-23-6.561-16.95,3.158-32.516,22.824-36.632,29.465l-13.078,21.1-12.582-21.364c-4.389-7.347-19.55-27.093-36.913-30.422a26.865,26.865,0,0,0-5.06-.486c-6.893,0-13.8,2.713-20.981,8.213-6.912,5.3-9.937,11-9.807,18.487.3,17,16.582,42.017,45.861,70.436A478.656,478.656,0,0,0,249.8,317.74a449.818,449.818,0,0,0,38.736-33.146c28.585-27.657,44.5-52.328,44.8-69.467C333.426,209.992,332.363,202.271,322.128,194.532Z" />
      <path d="M426.776,75.224A250,250,0,0,0,0,252c0,66.623,26.066,128.754,73.4,174.947C120.343,472.767,183.063,498,250,498s129.657-25.233,176.6-71.053C473.934,380.754,500,318.623,500,252A248.361,248.361,0,0,0,426.776,75.224ZM306.949,99.773a15,15,0,1,1,7.742,19.758A15,15,0,0,1,306.949,99.773Zm-48.29-9.325a15.018,15.018,0,1,1,12.808,16.912A15,15,0,0,1,258.659,90.448ZM222.505,77.6a15,15,0,0,1,4,29.732c-.347.044-.7.076-1.045.1A15,15,0,0,1,222.505,77.6ZM171.341,91.8a15,15,0,1,1-7.823,19.721A15,15,0,0,1,171.341,91.8Zm18.248,307.6a15,15,0,1,1-7.091-19.988A14.978,14.978,0,0,1,189.589,399.394Zm47.958,10.938a14.974,14.974,0,0,1-17.327,12.234l-.008.012a15,15,0,1,1,17.335-12.246Zm36.75,13.85q-.5.087-1.01.143a15.051,15.051,0,1,1,1.01-.143Zm50.55-12.4a15.267,15.267,0,0,1-2.961.835,15.036,15.036,0,1,1,2.961-.835ZM309.1,306.44a468.936,468.936,0,0,1-50.748,42.282l-8.674,6.08-8.631-6.142a496.968,496.968,0,0,1-51.73-43.463c-36.2-35.072-54.785-65.924-55.241-91.7-.3-16.99,7.153-31.8,21.556-42.839,15.727-12.052,33.054-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.431,16.034-2.991,32.147,1.2,46.592,12.124,15.439,11.674,23.429,27.261,23.108,45.075C362.861,241.613,344.616,272.149,309.1,306.44Z"/>
  </svg>`;
        case "file-invoice":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M312 416h-80c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h80c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM64 240v96c0 8.84 8.19 16 18.29 16h219.43c10.1 0 18.29-7.16 18.29-16v-96c0-8.84-8.19-16-18.29-16H82.29C72.19 224 64 231.16 64 240zm32 16h192v64H96v-64zM72 96h112c4.42 0 8-3.58 8-8V72c0-4.42-3.58-8-8-8H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8zm0 64h112c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8zm297.9-62.02L286.02 14.1c-9-9-21.2-14.1-33.89-14.1H47.99C21.5.1 0 21.6 0 48.09v415.92C0 490.5 21.5 512 47.99 512h288.02c26.49 0 47.99-21.5 47.99-47.99V131.97c0-12.69-5.1-24.99-14.1-33.99zM256.03 32.59c2.8.7 5.3 2.1 7.4 4.2l83.88 83.88c2.1 2.1 3.5 4.6 4.2 7.4h-95.48V32.59zm95.98 431.42c0 8.8-7.2 16-16 16H47.99c-8.8 0-16-7.2-16-16V48.09c0-8.8 7.2-16.09 16-16.09h176.04v104.07c0 13.3 10.7 23.93 24 23.93h103.98v304.01z"></path></svg>`;
        case "clock-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path   d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg>`;
        case "page-plus-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M377,105,279.1,7a24,24,0,0,0-17-7H256V128H384v-6.1A23.92,23.92,0,0,0,377,105ZM224,136V0H24A23.94,23.94,0,0,0,0,24V488a23.94,23.94,0,0,0,24,24H360a23.94,23.94,0,0,0,24-24V160H248A24.07,24.07,0,0,1,224,136Zm72,176v16a16,16,0,0,1-16,16H216v64a16,16,0,0,1-16,16H184a16,16,0,0,1-16-16V344H104a16,16,0,0,1-16-16V312a16,16,0,0,1,16-16h64V232a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64A16,16,0,0,1,296,312Z"></path></svg>`;
        case "user-friends-solid":
            return `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>`;
        case "opacity":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M255.9.2h-64v64h64zM0 64.17v64h64v-64zM128 .2H64v64h64zm64 255.9v64h64v-64zM0 192.12v64h64v-64zM383.85.2h-64v64h64zm128 0h-64v64h64zM128 256.1H64v64h64zM511.8 448v-64h-64v64zm0-128v-64h-64v64zM383.85 512h64v-64h-64zm128-319.88v-64h-64v64zM128 512h64v-64h-64zM0 512h64v-64H0zm255.9 0h64v-64h-64zM0 320.07v64h64v-64zm319.88-191.92v-64h-64v64zm-64 128h64v-64h-64zm-64 128v64h64v-64zm128-64h64v-64h-64zm0-127.95h64v-64h-64zm0 191.93v64h64v-64zM64 384.05v64h64v-64zm128-255.9v-64h-64v64zm191.92 255.9h64v-64h-64zm-128-191.93v-64h-64v64zm128-127.95v64h64v-64zm-128 255.9v64h64v-64zm-64-127.95H128v64h64zm191.92 64h64v-64h-64zM128 128.15H64v64h64zm0 191.92v64h64v-64z"></path></svg>`;
        case "triangle-solid":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M329.6 24c-18.4-32-64.7-32-83.2 0L6.5 440c-18.4 31.9 4.6 72 41.6 72H528c36.9 0 60-40 41.6-72l-240-416z"></path></svg>`;
        case "filter-reset":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <path d="M281.25,349.269V453.125l-62.5-46.875V250.691a136.239,136.239,0,0,1-.135-32.076L46.875,46.875h406.25l-57.384,57.383a136.154,136.154,0,0,1,43.12,23.139L486.224,80.02C515.666,50.578,494.8,0,453.078,0H46.931C5.292,0-15.717,50.518,13.785,80.02l158.09,158.146V406.25c0,14.754,6.946,28.647,18.75,39.062l62.5,45.963c30.54,21.343,75,1.5,75-37.5V367.907A135.49,135.49,0,0,1,281.25,349.269Z"/>
        <path d="M383.977,234.255l14.251-14.25a19.937,19.937,0,0,0,0-28.19l-.192-.191a19.686,19.686,0,0,0-27.807,0l-14.442,14.443-14.251-14.252a19.933,19.933,0,0,0-28.189,28.19l14.251,14.25-14.251,14.252A19.932,19.932,0,0,0,341.536,276.7l14.251-14.252L370.038,276.7a19.933,19.933,0,0,0,28.19-28.189Z"/>
        <path d="M354.063,347.894A113.83,113.83,0,1,1,467.894,234.063,113.959,113.959,0,0,1,354.063,347.894Zm0-187.66a73.83,73.83,0,1,0,73.831,73.829A73.913,73.913,0,0,0,354.063,160.234Z"/>
      </svg>`;
        case "compact-disc":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path class="fa-secondary" d="M248,8C111,8,0,119,0,256S111,504,248,504,496,393,496,256,385,8,248,8ZM88,256H56C56,150.1,142.1,64,248,64V96C159.8,96,88,167.8,88,256Zm160,96a96,96,0,1,1,96-96A96,96,0,0,1,248,352Z"/>
        <path class="fa-primary" d="M248,160a96,96,0,1,0,96,96A96,96,0,0,0,248,160Zm0,128a32,32,0,1,1,32-32A32,32,0,0,1,248,288Z" opacity="0.4"/>
      </svg>`;
        case "chevron-double-down-duotone":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path class="fa-secondary" d="M207 285.54L12.7 91.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a24.08 24.08 0 0 1 33.9 0l154.7 154 154.7-154a23.9 23.9 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 285.54a24.2 24.2 0 0 1-34 0z" opacity="0.4"/>
        <path class="fa-primary" d="M207 477.54L12.7 283.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a23.9 23.9 0 0 1 33.9 0l154.7 154 154.7-154a24.08 24.08 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 477.54a24.2 24.2 0 0 1-34 0z"/>
      </svg>`;
        case "chevron-right":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/>
      </svg>`;
        case "chevron-left":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"/>
      </svg>`;
        case "angle-left":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
        <path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/>
      </svg>`;
        case "angle-right":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
        <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/>
      </svg>`;
        case "database":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M224 32c106 0 192 28.75 192 64v32c0 35.25-86 64-192 64S32 163.25 32 128V96c0-35.25 86-64 192-64m192 149.5V224c0 35.25-86 64-192 64S32 259.25 32 224v-42.5c41.25 29 116.75 42.5 192 42.5s150.749-13.5 192-42.5m0 96V320c0 35.25-86 64-192 64S32 355.25 32 320v-42.5c41.25 29 116.75 42.5 192 42.5s150.749-13.5 192-42.5m0 96V416c0 35.25-86 64-192 64S32 451.25 32 416v-42.5c41.25 29 116.75 42.5 192 42.5s150.749-13.5 192-42.5M224 0C145.858 0 0 18.801 0 96v320c0 77.338 146.096 96 224 96 78.142 0 224-18.801 224-96V96c0-77.338-146.096-96-224-96z"/>
      </svg>`;
        case "coins":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path class="fa-secondary" d="M416 311.4c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5zm-4.7-95.1c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2zM512 64c0-35.3-86-64-192-64S128 28.7 128 64s86 64 192 64 192-28.7 192-64z" opacity="0.4"/>
        <path class="fa-primary" d="M192 320c106 0 192-35.8 192-80s-86-80-192-80S0 195.8 0 240s86 80 192 80zM0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zm0-104.9V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4z"/>
      </svg>`;
        case "sync-alt":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h28.045c6.353 0 11.613-4.952 11.973-11.294C66.161 141.649 151.453 60 256 60c54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486zM491.699 256h-28.045c-6.353 0-11.613 4.952-11.973 11.294C445.839 370.351 360.547 452 256 452c-54.163 0-103.157-21.923-138.614-57.386l54.128-54.129c7.56-7.56 2.206-20.485-8.485-20.485H20c-6.627 0-12 5.373-12 12v143.029c0 10.691 12.926 16.045 20.485 8.485L80.65 431.35C125.525 476.233 187.516 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z"/>
      </svg>`;
        case "clock-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
      </svg>`;
        case "calendar-alt":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"/>
      </svg>`;
        case "calendar-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M400 64h-48V12c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v52H128V12c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zM48 96h352c8.822 0 16 7.178 16 16v48H32v-48c0-8.822 7.178-16 16-16zm352 384H48c-8.822 0-16-7.178-16-16V192h384v272c0 8.822-7.178 16-16 16z"/>
      </svg>`;
        case "coin-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 64C114.67 64 0 128.44 0 208v112c0 70.72 114.67 128 256 128s256-57.28 256-128V208c0-79.56-114.67-144-256-144zM64 366.61C43.69 352 32 335.68 32 320v-42.34A183.65 183.65 0 0 0 64 303zm80 35.32A306.25 306.25 0 0 1 96 385v-64.69a327.39 327.39 0 0 0 48 17zm96 13.68a450 450 0 0 1-64-6.61v-64.27a442.1 442.1 0 0 0 64 6.53zm96-6.61a450 450 0 0 1-64 6.64v-64.38a442.1 442.1 0 0 0 64-6.53zm80-24a306.25 306.25 0 0 1-48 16.9v-64.6a327.39 327.39 0 0 0 48-17zm64-65c0 15.68-11.69 32-32 46.61V303a183.65 183.65 0 0 0 32-25.37zm-224 0c-132 0-224-59-224-112S124 96 256 96s224 59 224 112-92 112-224 112z"/>
      </svg>`;
        case "page-inverse":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>
      </svg>`;
        case "coin":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 64C114.67 64 0 128.44 0 208v112c0 70.72 114.67 128 256 128s256-57.28 256-128V208c0-79.56-114.67-144-256-144zM88 363.37C62.42 349.16 48 333.2 48 320v-28.27a226 226 0 0 0 40 24.75zm96 30.88a348.83 348.83 0 0 1-64-16.32v-48.09a373.73 373.73 0 0 0 64 16.28zm112 4c-12.81 1.1-26.1 1.78-40 1.78s-27.19-.68-40-1.78v-48.18c13.07 1.16 26.36 1.93 40 1.93s26.93-.77 40-1.93zm96-20.29a348.83 348.83 0 0 1-64 16.32v-48.16a373.73 373.73 0 0 0 64-16.28zM464 320c0 13.2-14.42 29.16-40 43.37v-46.89a226 226 0 0 0 40-24.75zm-208-16c-119 0-208-50.68-208-96s89-96 208-96 208 50.68 208 96-88.95 96-208 96z"/>
        </svg>`;
        case "page-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16z"/>
      </svg>`;
        case "bars-light":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"/>
      </svg>`;
        case "island":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path class="fa-secondary" d="M284.91 358.8a144 144 0 0 0-43.71-6.8h-45.07c10-42.85 25-122.77 21-202.33L238.89 128h27.39c11.16 48 28.58 142.41 18.63 230.8z" opacity="0.4"></path>
        <path class="fa-primary" d="M241.2 352h-98.4A144 144 0 0 0 .36 474.78C-2.53 494.3 12.39 512 32.12 512h319.76c19.73 0 34.65-17.7 31.76-37.22A144 144 0 0 0 241.2 352zm206.62-238.36C439.69 67.43 393 32 336.53 32c-34.88 0-65.66 13.82-86.3 35.08C235.78 28.29 193.72 0 143.47 0 87 0 40.31 35.43 32.18 81.64a12.37 12.37 0 0 0 10.24 14.2 12.24 12.24 0 0 0 2.18.16H80l16-32 16 32h30.17c-34.21 35-39.62 86.88-14.54 122.58 4.36 6.2 13.14 7.31 18.5 1.95L238.89 128H368l16-32 16 32h35.4a12.38 12.38 0 0 0 12.6-12.18 12.24 12.24 0 0 0-.18-2.18z"></path>
      </svg>`;
        case "camera-retro-duotone":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path class="fa-secondary" d="M256 232a88 88 0 1 0 88 88 88 88 0 0 0-88-88zm0 56a32.09 32.09 0 0 0-32 32 16 16 0 0 1-32 0 64.06 64.06 0 0 1 64-64 16 16 0 0 1 0 32zM480 32H256l-64 48H16A16 16 0 0 0 0 96v64h512V64a32.09 32.09 0 0 0-32-32z" opacity="0.4"/><path class="fa-primary" d="M176 48a16 16 0 0 0-16-16H64a16 16 0 0 0-16 16v32h128zM0 160v272a48 48 0 0 0 48 48h416a48 48 0 0 0 48-48V160zm256 280a120 120 0 1 1 120-120 120 120 0 0 1-120 120z"/>
      </svg>`;
        case "map-duotone":
            return `<svg viewBox="0 0 576 512">
        <path class="fa-secondary" d="M554.06 161.16L416 224v288l139.88-55.95A32 32 0 0 0 576 426.34V176a16 16 0 0 0-21.94-14.84zM20.12 216A32 32 0 0 0 0 245.66V496a16 16 0 0 0 21.94 14.86L160 448V214.92a302.84 302.84 0 0 1-21.25-46.42zM288 359.67a47.78 47.78 0 0 1-36.51-17C231.83 319.51 210.92 293.09 192 266v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72A47.8 47.8 0 0 1 288 359.67z" opacity="0.4"/>
        <path class="fa-primary" d="M288 0a126 126 0 0 0-126 126c0 56.26 82.35 158.8 113.9 196a15.77 15.77 0 0 0 24.2 0C331.65 284.8 414 182.26 414 126A126 126 0 0 0 288 0zm0 168a42 42 0 1 1 42-42 42 42 0 0 1-42 42z"/>
      </svg>`;
        case "plane-duotone":
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path class="fa-secondary" d="M214.86 192h150.85L260.61 8.06A16 16 0 0 0 246.71 0h-65.5a16 16 0 0 0-15.38 20.39zm-49 299.6a16 16 0 0 0 15.35 20.4h65.5a16 16 0 0 0 13.89-8.06L365.71 320H214.86z" opacity="0.4"/>
        <path class="fa-primary" d="M480 320H112l-43.2 57.6A16 16 0 0 1 56 384H16A16 16 0 0 1 .49 364.12L32 256 .49 147.88A16 16 0 0 1 16 128h40a16 16 0 0 1 12.8 6.4L112 192h368c35.35 0 96 28.65 96 64s-60.65 64-96 64z"/>
      </svg>`;
        default:
            assertNever(icon);
    }
}
let WcIcon = class WcIcon extends h {
    constructor() {
        super(...arguments);
        this.primaryColor = "text";
        this.icon = "pen";
    }
    static get styles() {
        return r$1 `
:host, :host * {
  box-sizing: border-box;
}

:host {
  display: block;
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}


.color-arrows {
  fill: rgba(255,255,255,0.5);
}
svg.color-arrows:hover {
  fill:  rgba(255,255,255,0.6);
}

.color-headline {
  fill: var(--printess-headlineColor);
}
svg.color-headline:hover {
  fill: var(--printess-headlineColorHover);
}

.color-text {
    fill: var(--printess-textColor);
} 
svg.color-text:hover {
  fill: var(--printess-textColorHover);
}

.color-medium {
  fill: var(--printess-textColorDisabled);
} 
svg.color-medium:hover {
    fill: var(--printess-textColorDisabledHover);
}

.color-light {
  fill: var(--printess-textColorLight);
}   
.color-light:hover {  
  fill: var(--printess-textColorLightHover);
}

.color-toolbar {
  fill: var(--printess-toolbarColor);
} 
svg.color-toolbar:hover {
  fill: var(--printess-toolbarColorHover);
}
.color-remove {
  fill: var(--printess-textColor);
} 
svg.color-remove:hover {
  fill: tomato;
}
.color-red {
  fill: red;
} 
svg.color-red:hover {
  fill: tomato;
}
.color-pink, .color-pink:hover {
  fill: #d3277c;
}
.color-black, .color-black:hover {
  fill: black;
}
.color-green, .color-green:hover {
  fill: green;
}
.color-lightgreen, .color-lightgreen:hover {
  fill: #83c000;
}
.color-blue, .color-blue:hover {
  fill: blue;
}
.color-gray, .color-gray:hover {
  fill: #555555;
}
.color-lightgray, .color-lightgray:hover {
  fill: #bbb;
}
.color-warning, .color-warning:hover {
  fill: orange;
}
.color-frame {
  fill:  var(--printess-frameColor);
  } 
svg.color-frame:hover {
  fill: var(--printess-frameColorHover);
}

.color-head-toolbar  {
  fill:  var(--printess-headToolbarColor);
} 
svg.color-head-toolbar:hover {
  fill: var(--printess-headToolbarColorHover);
}
.color-island {
  fill: #C8DF52;
}

.color-island:hover {
  fill: #d5e974;
}

.color-ocher, .color-ocher:hover {
  fill: var(--fuerte-brown);
}
.color-aqua, .color-aqua:hover {
  fill: var(--fuerte-aqua);
}
`;
    }
    render() {
        let cl = "color-" + this.primaryColor;
        if (this.classList.contains("strict-no-zoom")) {
            cl += " strict-no-zoom";
        }
        return T `${o(getIcon(this.icon).replace('<svg ', ' <svg class="' + cl + '"'))}`;
    }
};
__decorate$d([
    e()
], WcIcon.prototype, "primaryColor", void 0);
__decorate$d([
    e()
], WcIcon.prototype, "icon", void 0);
WcIcon = __decorate$d([
    n$1("wc-icon")
], WcIcon);

const menuItemH = 28;
const submMenuHGap = menuItemH * 0.25;
const contextOverlayDiv = createOverlayDiv();
contextOverlayDiv.addEventListener("mousedown", removeCtxMenu);
const contextMenuDiv = document.createElement('div');
contextMenuDiv.classList.add("printess-ctx-menu");
contextMenuDiv.id = "contextMenu";
let canReceiveMenuClick = false;
function getLi(itm) {
    const li = document.createElement("li");
    if (itm.caption === "-") {
        li.classList.add("printess-ctx-menu-item-seperator");
        return li;
    }
    li.classList.add("printess-ctx-menu-item");
    if (itm.callback && !(itm.disabled === true)) {
        li.addEventListener("mouseup", () => {
            if (canReceiveMenuClick && itm.callback)
                itm.callback();
        });
    }
    if (itm.disabled) {
        li.classList.add("disabled");
        if (itm.icon) {
            const icon = new WcIcon();
            icon.icon = itm.icon;
            icon.primaryColor = "gray";
            li.appendChild(icon);
        }
        else {
            li.appendChild(document.createElement("div"));
        }
    }
    else if (!itm.textOnly) {
        if (itm.icon) {
            const icon = new WcIcon();
            icon.icon = itm.icon;
            if (itm.icon.indexOf("-invers") >= 0) {
                icon.primaryColor = "headline";
            }
            else {
                icon.primaryColor = "text";
            }
            li.appendChild(icon);
        }
        else {
            const icon = document.createElement("div");
            if (itm.color) {
                icon.style.backgroundColor = itm.color;
                icon.classList.add("color");
            }
            li.appendChild(icon);
        }
    }
    const caption = document.createElement("div");
    caption.classList.add("printess-ctx-menu-caption");
    caption.innerText = itm.caption;
    if (itm.font) {
        caption.style.fontFamily = itm.font;
        caption.style.fontSize = "11pt";
    }
    li.appendChild(caption);
    if (itm.sub) {
        const icon = new WcIcon();
        icon.icon = "carret-right-solid";
        icon.primaryColor = "text";
        icon.classList.add("arrow");
        li.appendChild(icon);
    }
    return li;
}
function showCtxMenu(event, items, xOffset = 0, yOffset = 0, pixelWidth = 180, showIfEddiIsActive = false) {
    event.preventDefault();
    const menuWidth = pixelWidth;
    removeCtxMenu();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (!event.target)
        return;
    if (!items) {
        const wc = event.target;
        if (typeof wc.getContextMenu === "function") {
            items = wc.getContextMenu(event.target, mouseX, mouseY);
        }
    }
    if (!items)
        return;
    const menuHeight = (items.filter(i => i.caption !== "-").length * menuItemH) + (items.filter(i => i.caption === "-").length * 7);
    contextMenuDiv.style.height = menuHeight + "px";
    contextMenuDiv.style.width = menuWidth + "px";
    event.preventDefault();
    let curX = mouseX;
    let curY = mouseY;
    let curSubX = mouseX;
    let curSubY = mouseY;
    contextMenuDiv.innerHTML = "";
    const menu = document.createElement("div");
    contextMenuDiv.appendChild(menu);
    const ul = document.createElement("ul");
    menu.appendChild(ul);
    canReceiveMenuClick = false;
    for (const itm of items) {
        const li = getLi(itm);
        li.addEventListener("mousedown", () => {
            canReceiveMenuClick = true;
        });
        li.addEventListener("mouseup", () => {
            if (canReceiveMenuClick)
                removeCtxMenu();
        });
        if (itm.sub && itm.sub.length) {
            li.classList.add("printess-sub-menu-trigger");
            const submenu = document.createElement("div");
            const subUl = document.createElement("ul");
            submenu.appendChild(subUl);
            submenu.classList.add("printess-sub-menu");
            for (const subItem of itm.sub) {
                const li = getLi(subItem);
                subUl.appendChild(li);
            }
            if ((window.innerHeight - mouseY) < submMenuHGap) {
                curSubY = (submMenuHGap - 40) - ((mouseY + submMenuHGap) - window.innerHeight);
            }
            else {
                curSubY = submMenuHGap;
            }
            if ((window.innerWidth - mouseX) < menuWidth * 2) {
                curSubX = -menuWidth;
            }
            else {
                curSubX = menuWidth;
            }
            submenu.style.top = curSubY + 'px';
            submenu.style.left = curSubX + 'px';
            submenu.style.width = menuWidth + 'px';
            li.onmouseover = () => {
                submenu.style.display = 'block';
            };
            submenu.onmouseover = () => {
                submenu.style.display = 'block';
            };
            li.onmouseout = () => {
                submenu.style.display = 'none';
            };
            submenu.onmouseout = () => {
                submenu.style.display = 'none';
            };
            li.appendChild(submenu);
        }
        ul.appendChild(li);
    }
    if (mouseY + menuHeight > window.innerHeight) {
        curY = window.innerHeight - menuHeight - 10;
    }
    else {
        curY = mouseY;
    }
    if ((window.innerWidth - (mouseX + xOffset)) < menuWidth) {
        curX = mouseX - menuWidth;
        contextMenuDiv.classList.add("printess-rev-ctx-menu");
    }
    else {
        contextMenuDiv.classList.remove("printess-rev-ctx-menu");
        curX = mouseX;
    }
    contextMenuDiv.style.top = (curY + yOffset) + 'px';
    contextMenuDiv.style.left = (curX + xOffset) + 'px';
    document.body.appendChild(contextOverlayDiv);
    document.body.appendChild(contextMenuDiv);
}
function removeCtxMenu() {
    if (contextMenuDiv.parentElement) {
        document.body.removeChild(contextMenuDiv);
    }
    if (contextOverlayDiv.parentElement) {
        document.body.removeChild(contextOverlayDiv);
    }
}

const config = {
    mobileDeviceWidth: 896,
    isMobile: isMobile(896)
};

const layoutStyles = r$1 `
  .account-layout {
    font-family: var(--printess-font);
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 200px 1fr;
    background-color: var(--fuerte-light);
  }

  #user-content {
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 10px 250px 40px 50px;
    overflow-y: scroll;
  }

  @media (max-width: 1200px) {
    #user-content {
      padding-right: 50px;
    }
  }
  
  .drawer {
    background-color: var(--fuerte-aqua);
    grid-column: 1/2;
    grid-row: 2/3;
    border-right: 1px solid #1a39601a;
    outline: none;
    padding: 30px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .account-layout {
      display: flex;
      flex-direction: column;
    }

    #user-content {
      padding: 50px 30px 20px;
    }

    .drawer {
      position: fixed;
      top: 50;
      left: 0;
      right: 0;
      bottom: auto;
      display: flex;
      flex-direction: column;
      height: auto;
      padding: 0;
      z-index: 1;
    }
  }
`;
const navbarStyles = r$1 `
  header {
    grid-column: 1/3;
    grid-row: 1/2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    z-index: 1;
    height: 50px;
    background-color: var(--fuerte-background-color);
    color: white;
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--fuerte-box-shadow);
  }

  .island {
    width: 20px;
    margin-left: 10px; 
    cursor: pointer;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    header::before {
      background-image: none;
    }

    .island {
      width: 0px;
    }
  }

  #printess-logo {
    display: inline-block;
    height: 35px;
    width: 120px;
    padding-bottom: 5px;
    padding-left: 0px;
    background-size: 100%;
    background-image: url(https://printess.com/printess-white-2.svg);
    background-position: 0px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    text-decoration: none;
    background-origin: content-box;
  }
`;

const drawerStyles = r$1 `
  .tab {
    cursor: pointer;
    font-family: var(--printess-font);
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    color: white;
    text-shadow: 1px 1px 2px #555;
  }

  .tab wc-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .selected {
    color: var(--fuerte-brown);
  }

  .user-icon {
    display: flex;
    align-items: center;
    position: relative;
  }

  .hidden {
    display: none;
  }

    @media (max-width: ${config.mobileDeviceWidth}px) {
    .menu-icon {
      position: fixed;
      top: 14px;
      left: 20px;
      height: 25px;
      width: 30px;
    }

    .tab {
      border-bottom: 1px solid #ddd;
      width: 100%;
      font-size: 15px;
      justify-content: center;
    }

    .hidden {
      display: none !important;
    }
  }
`;

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcAppDrawer = class WcAppDrawer extends h {
    constructor(selectedDrawer) {
        super();
        this.selectedDrawer = '';
        this.drawerOpen = false;
        this.drawers = [{
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
        this.selectedDrawer = selectedDrawer;
    }
    static get styles() {
        return [drawerStyles];
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    getDrawerSelection(callback) {
        this.callback = callback;
    }
    ;
    openDrawer() {
        this.drawerOpen = !this.drawerOpen;
        this.requestUpdate();
    }
    ;
    setDrawerSelection(name) {
        this.selectedDrawer = name;
        if (this.callback) {
            this.callback(this.selectedDrawer);
        }
    }
    ;
    render() {
        return T `
      ${config.isMobile ? T `<wc-icon @click=${this.openDrawer} class="menu-icon" primaryColor="toolbar" icon=${this.drawerOpen ? 'close' : 'bars-light'}></wc-icon>` : ''} 
      <aside class="drawer ${!this.drawerOpen && config.isMobile ? 'hidden' : ''}">
        ${appUser === 'admin' ? T `<div class="tab ${this.selectedDrawer === 'upload' ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${() => this.setDrawerSelection('upload')}>Foto Upload</div>` : ''}
        
        ${appUser === 'admin' ? T `<div class="tab ${this.selectedDrawer === 'sightseeing' ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${() => this.setDrawerSelection('sightseeing')}>Sightseeing</div>` : ''}

        ${this.drawers.map(d => T `<div class="tab ${this.selectedDrawer === d.name ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${() => this.setDrawerSelection(d.name)}><wc-icon primaryColor=${this.selectedDrawer === d.name ? "green" : "toolbar"} icon=${d.icon}></wc-icon>${d.title}</div>`)}
      </aside>
    `;
    }
    ;
};
__decorate$c([
    e({ type: String })
], WcAppDrawer.prototype, "selectedDrawer", void 0);
WcAppDrawer = __decorate$c([
    n$1("wc-app-drawer")
], WcAppDrawer);

const uploadStyles = r$1 `
  .upload-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    color: #555;
  }

  .title {
    text-align: center;
    padding-right: 150px;
  }
`;

class NobsBase {
    constructor(nobs, source) {
        if (nobs instanceof Nobs && source instanceof NobsBase) {
            nobs._called_from_constructor_findMutations(source);
            for (const key of Object.keys(source)) {
                const value = source[key];
                if (value instanceof NobsBase) {
                    if (nobs.hasObjectReplacement(value)) {
                        this[key] = nobs.getObjectReplacement(value);
                    }
                    else if (nobs._called_from_constructor_hasMutation(value)) {
                        this[key] = new value.constructor(nobs, value);
                    }
                    else {
                        this[key] = value;
                    }
                }
                else if (value instanceof Map) {
                    this[key] = nobs._called_from_constructor_cloneMap(value);
                }
                else if (Array.isArray(value)) {
                    this[key] = nobs._called_from_constructor_cloneArray(value);
                }
                else {
                    if (nobs.hasProperty(source, key)) {
                        this[key] = nobs.popProperty(source, key);
                    }
                    else {
                        this[key] = source[key];
                    }
                }
            }
            const props = nobs.getChangedProperties(source);
            if (props && props.size > 0) {
                for (const [key, value] of props) {
                    this[key] = value;
                }
            }
        }
    }
}
class Nobs {
    constructor() {
        this.createdObjects = new Map();
        this.replacedObjects = new Map();
        this.removedObjects = new Set();
        this.changedProperties = new Map();
        this.replacedCollections = new Map();
        this.mutatedObjects = new Set();
    }
    setProperty(item, propertyName, propertyValue) {
        if (item && (propertyValue instanceof NobsBase || propertyValue === null) && item[propertyName] instanceof NobsBase) {
            this.replaceObject(item[propertyName], propertyValue);
        }
        else {
            let map = this.changedProperties.get(item);
            if (!map) {
                map = new Map();
                this.changedProperties.set(item, map);
            }
            map.set(propertyName, propertyValue);
        }
        return this;
    }
    getChangedProperties(item) {
        return this.changedProperties.get(item);
    }
    getProperty(item, propertyName) {
        const map = this.changedProperties.get(item);
        if (map && map.has(propertyName)) {
            return map.get(propertyName);
        }
        else {
            return item[propertyName];
        }
    }
    popProperty(item, propertyName) {
        const map = this.changedProperties.get(item);
        if (map && map.has(propertyName)) {
            const r = map.get(propertyName);
            map.delete(propertyName);
            return r;
        }
        else {
            return item[propertyName];
        }
    }
    hasProperty(item, propertyName) {
        const map = this.changedProperties.get(item);
        return !!(map && map.has(propertyName));
    }
    replaceCollection(find, replace) {
        this.replacedCollections.set(find, replace);
        return this;
    }
    addToCollection(parentCollection, newObject, insertBefore = undefined, insertAfter = undefined) {
        let ar = this.createdObjects.get(parentCollection);
        if (!ar) {
            ar = [];
            this.createdObjects.set(parentCollection, ar);
        }
        const newItem = {
            object: newObject,
            insertBefore: insertBefore,
            insertAfter: insertAfter
        };
        ar.push(newItem);
        return this;
    }
    reOrderInsideCollection(parentCollection, object, insertBefore = undefined, insertAfter = undefined) {
        if (object !== insertBefore && object !== insertAfter) {
            this.removeObject(object);
            this.addToCollection(parentCollection, object, insertBefore, insertAfter);
        }
        return this;
    }
    replaceObject(find, replace) {
        this.replacedObjects.set(find, replace);
        return this;
    }
    hasObjectReplacement(find) {
        return this.replacedObjects.has(find);
    }
    getObjectReplacement(find) {
        return this.replacedObjects.get(find);
    }
    removeObject(x) {
        this.removedObjects.add(x);
        return this;
    }
    _called_from_constructor_hasMutation(obj) {
        return this.mutatedObjects.has(obj);
    }
    _called_from_constructor_findMutations(source) {
        let ret = false;
        for (const key of Object.keys(source)) {
            const value = source[key];
            if (this.hasProperty(source, key)) {
                ret = true;
            }
            if (value instanceof NobsBase) {
                if (this.replacedObjects.has(value) || this._called_from_constructor_findMutations(value)) {
                    this.mutatedObjects.add(value);
                    ret = true;
                }
            }
            else if (value instanceof Map || Array.isArray(value)) {
                if (this.replacedCollections.has(value)) {
                    this.mutatedObjects.add(value);
                    ret = true;
                }
                if (value instanceof Map) {
                    for (const itm of value.values()) {
                        if (this.removedObjects.has(itm) || this.replacedObjects.has(itm)) {
                            this.mutatedObjects.add(itm);
                            ret = true;
                        }
                        ret = this._called_from_constructor_findMutations(itm) || ret;
                    }
                }
                else {
                    for (const itm of value) {
                        if (this.removedObjects.has(itm) || this.replacedObjects.has(itm)) {
                            this.mutatedObjects.add(itm);
                            ret = true;
                        }
                        ret = this._called_from_constructor_findMutations(itm) || ret;
                    }
                }
                if (this.createdObjects.has(value)) {
                    ret = true;
                }
            }
        }
        if (ret) {
            this.mutatedObjects.add(source);
        }
        return ret;
    }
    static getId(obj) {
        const objectId = obj["id"];
        if (!objectId) {
            throw new Error("Nobs: By convention, objects stored in a Map need to have an 'id' property");
        }
        return objectId;
    }
    _called_from_constructor_cloneMap(collection) {
        const ret = new Map();
        const replacedCollection = this.replacedCollections.get(collection);
        if (replacedCollection && replacedCollection instanceof Map) {
            return replacedCollection;
        }
        let obj;
        const newItems = this.createdObjects.get(collection);
        for (const [id, itm] of collection.entries()) {
            if (!this.removedObjects.has(itm)) {
                obj = this.replacedObjects.get(itm);
                if (!obj && this.mutatedObjects.has(itm)) {
                    obj = new itm.constructor(this, itm);
                }
                if (!obj) {
                    obj = itm;
                }
                if (newItems) {
                    for (const newItem of newItems) {
                        if (newItem.insertBefore === obj) {
                            ret.set(Nobs.getId(newItem.object), newItem.object);
                        }
                    }
                }
                ret.set(id, obj);
                if (newItems) {
                    for (const newItem of newItems) {
                        if (newItem.insertAfter === obj) {
                            ret.set(Nobs.getId(newItem.object), newItem.object);
                        }
                    }
                }
            }
        }
        if (newItems) {
            for (const newItem of newItems) {
                if (newItem.insertBefore === undefined && newItem.insertAfter === undefined) {
                    ret.set(Nobs.getId(newItem.object), newItem.object);
                }
            }
        }
        return ret;
    }
    _called_from_constructor_cloneArray(collection) {
        const ret = [];
        const replacedCollection = this.replacedCollections.get(collection);
        if (replacedCollection && Array.isArray(replacedCollection)) {
            return replacedCollection;
        }
        let obj;
        const newItems = this.createdObjects.get(collection);
        for (const itm of collection) {
            if (!this.removedObjects.has(itm)) {
                obj = this.replacedObjects.get(itm);
                if (!obj && this.mutatedObjects.has(itm)) {
                    obj = new itm.constructor(this, itm);
                }
                if (!obj) {
                    obj = itm;
                }
                if (newItems) {
                    for (const newItem of newItems) {
                        if (newItem.insertBefore === obj) {
                            ret.push(newItem.object);
                        }
                    }
                }
                ret.push(obj);
                if (newItems) {
                    for (const newItem of newItems) {
                        if (newItem.insertAfter === obj) {
                            ret.push(newItem.object);
                        }
                    }
                }
            }
        }
        if (newItems) {
            for (const newItem of newItems) {
                if (newItem.insertBefore === undefined && newItem.insertAfter === undefined) {
                    ret.push(newItem.object);
                }
            }
        }
        return ret;
    }
}

class UploadNobs extends NobsBase {
    constructor(nobs_or_dto, source) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(nobs_or_dto, source);
        if (!(nobs_or_dto instanceof Nobs) && !(source instanceof UploadNobs)) {
            const model = nobs_or_dto;
            this.id = "";
            this.headline = (_a = model.headline) !== null && _a !== void 0 ? _a : "";
            this.story = (_b = model.story) !== null && _b !== void 0 ? _b : [];
            this.date = (_c = model.date) !== null && _c !== void 0 ? _c : new Date();
            this.location = (_d = model.location) !== null && _d !== void 0 ? _d : [];
            this.foldername = (_e = model.foldername) !== null && _e !== void 0 ? _e : "";
            this.popup = (_f = model.popup) !== null && _f !== void 0 ? _f : "";
            this.image = (_g = model.image) !== null && _g !== void 0 ? _g : "";
        }
    }
    ;
    toDto() {
        return {
            id: "",
            headline: this.headline,
            story: this.story,
            date: this.date,
            location: this.location,
            foldername: this.foldername,
            popup: this.popup,
            image: this.image
        };
    }
    ;
}

const fotoUploadStyles = r$1 `
  .foto-upload-container {
    margin-bottom: 15px;
  }

  .file-loader {
    position: relative;
    width: 300px;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: 10px 10px 15px;
    box-shadow: var(--fuerte-box-shadow);
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
  }

  label {
    cursor: pointer;
    height: auto;
    cursor: pointer;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }

  .preview {
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 300px;
  }

  img {
    height: 60px;
    margin: 10px;
  }
`;

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const fileTypes = [
    "image/jpg",
    "image/bmp",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "image/webp",
];
const validFileType = (file) => fileTypes.includes(file.type);
let WcUploadFotos = class WcUploadFotos extends h {
    constructor(foldername, date) {
        super();
        this.foldername = foldername;
        this.date = date;
    }
    static get styles() {
        return [fotoUploadStyles];
    }
    ;
    ;
    updateImageDisplay(e) {
        console.log(e.target.files);
        const curFiles = e.target.files;
        if (curFiles) {
            for (const file of curFiles) {
                if (validFileType(file)) {
                    const image = document.createElement('img');
                    const foldername = this.date + '_' + this.foldername;
                    image.src = URL.createObjectURL(file);
                    image.alt = file.name;
                    uploadImage(file, foldername);
                }
            }
            alert('files uploaded');
        }
    }
    ;
    render() {
        return T `
      <div class="foto-upload-container">
        <div class="file-loader">
          <label htmlFor='myfile'>UPLOAD FOTOS</label>
          <input type='file' name='myfile' id='myfile' accept=".jpg, .jpeg, .png, .tiff, .bmp" className='file-input' @change=${(e) => this.updateImageDisplay(e)} multiple />
        </div>
        <div className="preview">
        </div>        
      </div>
    `;
    }
    ;
};
__decorate$b([
    e({ type: String })
], WcUploadFotos.prototype, "foldername", void 0);
__decorate$b([
    e({ type: String })
], WcUploadFotos.prototype, "date", void 0);
__decorate$b([
    o$1('.preview')
], WcUploadFotos.prototype, "preview", void 0);
__decorate$b([
    o$1('.file-input')
], WcUploadFotos.prototype, "fileInput", void 0);
WcUploadFotos = __decorate$b([
    n$1("wc-upload-fotos")
], WcUploadFotos);

const formStyles = r$1 `
  form {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #555;
    padding-right: 150px;
    padding-top: 20px;
  }

  input {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
    padding: 5px 10px;
    width: 300px;
    height: 40px;
    outline: none;
    border: 1px solid #555;
    box-shadow: var(--fuerte-box-shadow);
  }

  textarea {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
    padding: 5px 10px;
    width: 300px;
    height: 200px;
    outline: none;
    border: 1px solid #555;
    box-shadow: var(--fuerte-box-shadow);
  }

  button {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
    padding: 5px 10px;
    width: 300px;
    height: 40px;
    background-color: var(--fuerte-background-color);
    border: none;
    outline: none;
    color: white;
    box-shadow: var(--fuerte-box-shadow);
    font-weight: 600;
    letter-spacing: 1.2px;
    cursor: pointer;
  }
`;

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let WcUploadForm = class WcUploadForm extends h {
    static get styles() {
        return [formStyles];
    }
    ;
    setState(nobs) {
        this.state = new UploadNobs(nobs, this.state);
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        const nobs = new Nobs();
        nobs.setProperty(this.state, 'id', '');
        this.setState(nobs);
    }
    ;
    handleSubmit(e) {
        return __awaiter$4(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                yield createTravelDocument(this.state);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    handleChange(e) {
        const nobs = new Nobs();
        const name = e.target.name;
        const value = e.target.value;
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
    }
    ;
    handleStory(e) {
        const nobs = new Nobs();
        const name = e.target.name;
        const value = e.target.value.split('_b');
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
    }
    ;
    handleLocation(e) {
        const nobs = new Nobs();
        const name = e.target.name;
        const value = e.target.value.split(',');
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
    }
    ;
    renderFileLoader() {
        const foldername = this.state ? this.state.foldername : '';
        const date = this.state ? this.state.date : '';
        return new WcUploadFotos(foldername, date);
    }
    ;
    render() {
        return T `
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
    }
    ;
};
__decorate$a([
    e({ type: Object })
], WcUploadForm.prototype, "state", void 0);
WcUploadForm = __decorate$a([
    n$1("wc-upload-form")
], WcUploadForm);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcUploadPage = class WcUploadPage extends h {
    static get styles() {
        return [uploadStyles];
    }
    ;
    render() {
        return T `
      <div class="upload-page">
        <h1 class="title">Upload Foto Story</h1>
        <wc-upload-form></wc-upload-form>
      </div>
    `;
    }
    ;
};
WcUploadPage = __decorate$9([
    n$1("wc-upload-page")
], WcUploadPage);

const dialogStyles = r$1 `
  .modal {
    font-family: var(--printess-text-font);
    color: #555555;
    display: block;
    position: fixed;
    z-index: 100;
    padding-top: 70px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .modal-wrapper {
    display: flex;
    justify-content: center;
    position: relative;
    background-color: black;
    margin: auto;
    height: 80vh;
    width: 67vw;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2), 0px 4px 20px rgba(0,0,0,0.2);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
  }

  .prev {
    position: absolute;
    top: 50%;
    left: 10px;
  }

  .next {
    position: absolute;
    top: 50%;
    right: 10px;
  }

  img {
    width: auto;
    height: 100%;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .modal {
      padding-top: 45px;
    }

    .modal-wrapper {
      width: 70vmin;
    }
  }

  wc-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 15px 20px;
  }

  button.submit {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    color: white;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: #e35fbc;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }
`;

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcBackdrop = class WcBackdrop extends h {
    constructor() {
        super();
    }
    ;
    static get styles() {
        return r$1 `
      :host, :host * {
          box-sizing: border-box;
      }
      :host  {
          position: absolute;
          left:0;
          top:0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 89;
      }
    `;
    }
    ;
    cancelMouse(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("mousedown", this.cancelMouse);
        this.addEventListener("mouseup", this.cancelMouse);
        this.addEventListener("mousemove", this.cancelMouse);
    }
    ;
    disconnectedCallback() {
        this.removeEventListener("mousedown", this.cancelMouse);
        this.removeEventListener("mouseup", this.cancelMouse);
        this.removeEventListener("mousemove", this.cancelMouse);
        super.disconnectedCallback();
    }
    ;
    render() {
        return T ``;
    }
    ;
};
WcBackdrop = __decorate$8([
    n$1("wc-backdrop")
], WcBackdrop);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcDialogImage = class WcDialogImage extends h {
    constructor(idx, images) {
        super();
        this.backdrop = new WcBackdrop();
        this.idx = idx;
        this.images = images;
    }
    static get styles() {
        return [dialogStyles];
    }
    ;
    ;
    showDialog() {
        document.body.appendChild(this.backdrop);
        document.body.appendChild(this);
    }
    ;
    closeDialog() {
        document.body.removeChild(this.backdrop);
        document.body.removeChild(this);
    }
    ;
    render() {
        return T `
      <div class="modal">
      
        <div class="modal-wrapper">
          <wc-icon class="close-button" primaryColor="island" icon="close" @click=${() => this.closeDialog()}></wc-icon>
          <wc-icon class="prev" primaryColor="island" icon="chevron-left" @click=${() => this.idx > 0 && this.idx--}></wc-icon>
          <img src=${this.images[this.idx]} alt="fuerte">
          <wc-icon class="next" primaryColor="island" icon="chevron-right" @click=${() => this.idx < this.images.length - 1 && this.idx++}></wc-icon>
        </div>

      </div>
    `;
    }
    ;
};
__decorate$7([
    e({ attribute: false, type: Number })
], WcDialogImage.prototype, "idx", void 0);
__decorate$7([
    e({ attribute: false, type: Array })
], WcDialogImage.prototype, "images", void 0);
WcDialogImage = __decorate$7([
    n$1("wc-dialog-image")
], WcDialogImage);

const fotostoryStyles = r$1 `
  .fotostory-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
  }

  .image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: 30px 0 60px;
  }

  img {
    width: auto;
    height: 250px;
    box-shadow: var(--fuerte-box-shadow);
    margin: 20px;
    cursor: pointer;
  }

  .lottie {
    width: 500px;
    height: 500px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .title {
      margin-bottom: 0;
      text-align: center;
    }

    .image-container {
      padding-top: 0px;
    }

    img {
      width: 100%;
      height: auto;
      margin: 10px;
      cursor: default;
    }

    .lottie {
      width: 100%;
    }
  }
`;

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcFotostory = class WcFotostory extends h {
    constructor(fotostory) {
        super();
        this.fotostory = fotostory;
    }
    static get styles() {
        return [fotostoryStyles];
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.fotostory && this.getPics(this.fotostory.foldername);
    }
    ;
    getPics(foldername) {
        let urlList = [];
        fetch(`https://api.github.com/repos/anjakhan/fuerteventura/contents/assets/${foldername}`)
            .then(response => response.json())
            .then(data => {
            data.forEach((foto) => urlList.push(foto.download_url));
        })
            .catch(error => console.error(error));
        setTimeout(() => this.images = urlList, 2000);
    }
    ;
    renderImage(idx) {
        const td = new WcDialogImage(idx, this.images);
        td.showDialog();
    }
    ;
    render() {
        return T `
    ${this.fotostory ? T `
      <div class="fotostory-container">
        <!-- <p>${this.fotostory.date}</p> -->
        <h1 class="title">${this.fotostory.headline}</h1>
        ${this.fotostory.story.map((story) => T `<p style="text-align: justify;">${story}</p>`)}
        <div class="image-container">
          ${this.images && this.images.length > 0 ? this.images.sort((a, b) => a < b ? -1 : 1).map((img, idx) => T `<img @click=${() => !config.isMobile && this.renderImage(idx)} src=${img} alt="fuerte">`) : T `<lottie-player class="lottie" src="https://assets9.lottiefiles.com/packages/lf20_mg67wxfu.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>`}
        </div>
        
        
      </div>
    ` : T `
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 50px;">
        <lottie-player class="lottie" src="https://assets1.lottiefiles.com/packages/lf20_ORPnX5.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
      </div>`}      
    `;
    }
    ;
};
__decorate$6([
    e({ type: Object })
], WcFotostory.prototype, "fotostory", void 0);
__decorate$6([
    e({ type: Array })
], WcFotostory.prototype, "images", void 0);
WcFotostory = __decorate$6([
    n$1("wc-fotostory")
], WcFotostory);

const fotoPreviewStyles = r$1 `
  .calendar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
  }

  .foto-calendar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: var(--fuerte-box-shadow);
    border-radius: 10px;
    margin-top: 20px;
    width: 640px;
    padding-bottom: 20px;
    background-color: #fff7e6;
  }

  img {
    height: 415px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .calendar-month {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
    padding: 30px 50px 10px;
    text-align: center;
  }

  .calendar-month wc-icon {
    width: 30px;
    height: 30px;
  }

  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .calendar-day {
    font-weight: bold;
    padding: 20px 35px;
    color: var(--fuerte-aqua);
  }

  .month {
    display: grid;
    grid-template-columns: repeat(7, 90px);
    grid-template-rows: repeat(5, 50px);
    justify-content: center;
  }

  .date-box {
    display: flex;
    font-weight: bold;
    color: #555;
    text-align: center;
    cursor: pointer;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 50px;
  }

  .date-text {
    text-align: center;
    min-width: 20px;
    min-height: 20px;
  }

  .date-box:hover .date-text {
    background-color: var(--fuerte-brown);
    border-radius: 100px;
    padding: 5px;
    color: white;
  }

  .today {
    background-color: var(--fuerte-aqua);
    border-radius: 100px;
    padding: 5px;
    color: white;
  }
  
  .date-box:hover .today {
    background-color: var(--fuerte-aqua);
  }

  .disabled {
    cursor: default;
  }

  .back-to-calendar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .foto-calendar {
      margin-top: 40px;
      width: 100%;
    }

    img {
      width: 100%;
      height: auto;
    }

    .calendar-day {
      font-size: 3vmin;
    }

    .calendar-month {
      font-size: 4vmin;
      padding: 20px 10% 10px;
    }

    .calendar-month wc-icon {
      height: 5vmin;
    }

    .table-header {
      display: grid;
      grid-template-columns: repeat(7, 13%);
      grid-template-rows: repeat(1, 7vmin);
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .calendar-day {
      padding: 0px;
      align-self: center;
    }
  
    .month {
      display: grid;
      grid-template-columns: repeat(7, 13%);
      grid-template-rows: repeat(5, 7vmin);
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .date-box {
      width: 100%;
      font-size: 3vmin;
      height: 7vmin;
    }

    .date-text {
      padding: 0.5vmin;
      line-height: 7vmin;
      min-width: 7vmin;
    }
  }

  .hidden {
    display: none;
  }
`;

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let WcFotoPreview = class WcFotoPreview extends h {
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
        return __awaiter$3(this, void 0, void 0, function* () {
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
        return T `
      <div class="date-box disabled"></div>
      ${array.map((x, idx) => T `
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
        return T `
      <div class="date-box disabled"></div>
      <div class="date-box disabled"></div>
      <div class="date-box disabled"></div>
      ${array.map((x, idx) => T `
      <div class="date-box" @click=${() => this.renderFotos(idx + 1, 7)} style="cursor: ${idx > 5 ? 'default' : 'cursor'}">
        <span class="date-text ${this.date.getDate() === idx + 1 && this.date.getMonth() === 6 ? 'today' : ''}">${idx + 1}</span>
      </div>`)}
      <div class="date-box disabled"></div>
    `;
    }
    render() {
        return T `
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
__decorate$5([
    e({ type: Array })
], WcFotoPreview.prototype, "fotos", void 0);
__decorate$5([
    e({ type: Object })
], WcFotoPreview.prototype, "fotostory", void 0);
__decorate$5([
    e({ type: Object })
], WcFotoPreview.prototype, "date", void 0);
__decorate$5([
    e({ type: String })
], WcFotoPreview.prototype, "month", void 0);
__decorate$5([
    e({ type: Boolean })
], WcFotoPreview.prototype, "showStory", void 0);
WcFotoPreview = __decorate$5([
    n$1("wc-foto-preview")
], WcFotoPreview);

const traveldetailsStyles = r$1 `
  .travel-details-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
    padding-top: 30px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 40px;
  }

  .flight, .apartment {
    background-color: #fff7e6;
    box-shadow: var(--fuerte-box-shadow);
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .apartment {
    width: 410px;
  }

  .flight {
    padding: 10px 30px;
  }

  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  img {
    width: 410px; 
    border-top-right-radius: 10px; 
    border-top-left-radius: 10px;
  }

  wc-icon {
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }

  @media screen and (max-width: 490px) {
    .flight, .apartment {
      max-width: 100%;
    }

    img {
      max-width: 100%;
    }
  }
`;

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcTraveldetailsPage = class WcTraveldetailsPage extends h {
    static get styles() {
        return [traveldetailsStyles];
    }
    ;
    render() {
        return T `
      <div class="travel-details-container">
        <h1 class="title">Reisedaten</h1>
        <div class="flight">
          <h3 class="flex">Berlin (Brandenburg) <wc-icon primaryColor="gray" icon="plane-duotone"></wc-icon> Fuerteventura</h3>
          <p class="flex"><wc-icon primaryColor="gray" icon="calendar-alt"></wc-icon>08.06.2021</p>
          <p class="flex"><wc-icon primaryColor="gray" icon="clock-light"></wc-icon>06:50 - 10:55 (11:55 DE)</p>
        </div>
        <div class="flight">
          <h3 class="flex">Fuerteventura <wc-icon primaryColor="gray" icon="plane-duotone"></wc-icon> Berlin (Brandenburg)</h3>
          <p class="flex"><wc-icon primaryColor="gray" icon="calendar-alt"></wc-icon>06.07.2021</p>
          <p class="flex"><wc-icon primaryColor="gray" icon="clock-light"></wc-icon>11:30 (12:30 DE) - 17:15</p>
        </div>
        <div class="apartment">
          <img src="https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/CallePuntaPesebre.png" alt="apartment">
          <div class="apartment-info">
            <h3 class="flex">Casa Luciano</h3>
            <p class="flex">Calle Punta Pesebre, 8, Jardin del Sol</p>
            <p class="flex">Fase 1, Casa 13, Costa Calma,</p>
            <p class="flex">Canarias 35627, Spain</p>          
          </div>
        </div>
      </div>
    `;
    }
    ;
};
WcTraveldetailsPage = __decorate$4([
    n$1("wc-traveldetails-page")
], WcTraveldetailsPage);

const L = window.L;
const travelledPlaces = [{
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
const createMap = (mapid, fotostory) => {
    const zoom = config.isMobile ? 9 : 10;
    const map = L.map(mapid).setView([28.378412972969333, -14.115175194361001], zoom);
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
    }).addTo(map);
    fotostory && fotostory.map((story) => {
        const marker = L.marker([parseFloat(story.location[0]), parseFloat(story.location[1])]).addTo(map).bindPopup(`<b>${story.popup}</b><br>${story.date}`);
        new Date(story.date).getDate() === date - 1 && new Date(story.date).getMonth() + 1 === month && marker.openPopup();
    });
    travelledPlaces.map(p => {
        L.marker(p.location).addTo(map).bindPopup(`<b>${p.name}</b><br>${p.date}`);
    });
};
const sightseeings = [{
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
const createToDoMap = (mapid) => {
    const zoom = config.isMobile ? 9 : 10;
    const map = L.map(mapid).setView([28.378412972969333, -14.115175194361001], zoom);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
    }).addTo(map);
    sightseeings.map((s) => {
        L.marker(s.location).addTo(map).bindPopup(`<b>${s.name}</b><br>${s.location}`);
    });
};

const mapStyles$1 = r$1 `
  /* .leaflet-map-pane {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  } */

  img {
    position: absolute;
  }
  /* .leaflet-control-container {
    position: fixed;
    bottom: 10px;
    right: 20px;
    padding: 10px 20px;
    z-index: 10;
    font-size: 10px;
    color: white;
  }

  .leaflet-control-container a {
    color: var(--fuerte-aqua);
  }

  .leaflet-control-zoom-out, .leaflet-control-zoom-in {
    position: fixed;
    background-color: white;
    border-radius: 4px;
    color: #555;
    padding: 5px 7px;
    top: 70;
    right: 30;
    text-decoration: none;
  }

  .leaflet-control-zoom-out a, .leaflet-control-zoom-in a {
    color: #555;
  }

  .leaflet-control-zoom-in {
    right: 55px;
  } */

  /* required styles */

.leaflet-pane,
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile-container,
.leaflet-pane > svg,
.leaflet-pane > canvas,
.leaflet-zoom-box,
.leaflet-image-layer,
.leaflet-layer {
	position: absolute;
	left: 0;
	top: 0;
	}
.leaflet-container {
	overflow: hidden;
	}
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow {
	-webkit-user-select: none;
	   -moz-user-select: none;
	        user-select: none;
	  -webkit-user-drag: none;
	}
/* Prevents IE11 from highlighting tiles in blue */
.leaflet-tile::selection {
	background: transparent;
}
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */
.leaflet-safari .leaflet-tile {
	image-rendering: -webkit-optimize-contrast;
	}
/* hack that prevents hw layers "stretching" when loading new tiles */
.leaflet-safari .leaflet-tile-container {
	width: 1600px;
	height: 1600px;
	-webkit-transform-origin: 0 0;
	}
.leaflet-marker-icon,
.leaflet-marker-shadow {
	display: block;
	}
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
.leaflet-container .leaflet-overlay-pane svg,
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer,
.leaflet-container .leaflet-tile {
	max-width: none !important;
	max-height: none !important;
	}

.leaflet-container.leaflet-touch-zoom {
	-ms-touch-action: pan-x pan-y;
	touch-action: pan-x pan-y;
	}
.leaflet-container.leaflet-touch-drag {
	-ms-touch-action: pinch-zoom;
	/* Fallback for FF which doesn't support pinch-zoom */
	touch-action: none;
	touch-action: pinch-zoom;
}
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
	-ms-touch-action: none;
	touch-action: none;
}
.leaflet-container {
	-webkit-tap-highlight-color: transparent;
}
.leaflet-container a {
	-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
}
.leaflet-tile {
	filter: inherit;
	visibility: hidden;
	}
.leaflet-tile-loaded {
	visibility: inherit;
	}
.leaflet-zoom-box {
	width: 0;
	height: 0;
	-moz-box-sizing: border-box;
	     box-sizing: border-box;
	z-index: 800;
	}
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
.leaflet-overlay-pane svg {
	-moz-user-select: none;
	}

.leaflet-pane         { z-index: 400; }

.leaflet-tile-pane    { z-index: 200; }
.leaflet-overlay-pane { z-index: 400; }
.leaflet-shadow-pane  { z-index: 500; }
.leaflet-marker-pane  { z-index: 600; }
.leaflet-tooltip-pane   { z-index: 650; }
.leaflet-popup-pane   { z-index: 700; }

.leaflet-map-pane canvas { z-index: 100; }
.leaflet-map-pane svg    { z-index: 200; }

.leaflet-vml-shape {
	width: 1px;
	height: 1px;
	}
.lvml {
	behavior: url(#default#VML);
	display: inline-block;
	position: absolute;
	}


/* control positioning */

.leaflet-control {
	position: relative;
	z-index: 800;
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
	pointer-events: auto;
	}
.leaflet-top,
.leaflet-bottom {
	position: absolute;
	z-index: 1000;
	pointer-events: none;
	}
.leaflet-top {
	top: 60;
	}
.leaflet-right {
	right: 0;
	}
.leaflet-bottom {
	bottom: 0;
	}
.leaflet-left {
	left: 10;
	}
.leaflet-control {
	float: right;
	clear: both;
	}
.leaflet-right .leaflet-control {
	float: right;
	}
.leaflet-top .leaflet-control {
	margin-top: 10px;
	}
.leaflet-bottom .leaflet-control {
	margin-bottom: 10px;
	}
.leaflet-left .leaflet-control {
	margin-left: 10px;
	}
.leaflet-right .leaflet-control {
	margin-right: 10px;
	}


/* zoom and fade animations */

.leaflet-fade-anim .leaflet-tile {
	will-change: opacity;
	}
.leaflet-fade-anim .leaflet-popup {
	opacity: 0;
	-webkit-transition: opacity 0.2s linear;
	   -moz-transition: opacity 0.2s linear;
	        transition: opacity 0.2s linear;
	}
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
	opacity: 1;
	}
.leaflet-zoom-animated {
	-webkit-transform-origin: 0 0;
	    -ms-transform-origin: 0 0;
	        transform-origin: 0 0;
	}
.leaflet-zoom-anim .leaflet-zoom-animated {
	will-change: transform;
	}
.leaflet-zoom-anim .leaflet-zoom-animated {
	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
	}
.leaflet-zoom-anim .leaflet-tile,
.leaflet-pan-anim .leaflet-tile {
	-webkit-transition: none;
	   -moz-transition: none;
	        transition: none;
	}

.leaflet-zoom-anim .leaflet-zoom-hide {
	visibility: hidden;
	}


/* cursors */

.leaflet-interactive {
	cursor: pointer;
	}
.leaflet-grab {
	cursor: -webkit-grab;
	cursor:    -moz-grab;
	cursor:         grab;
	}
.leaflet-crosshair,
.leaflet-crosshair .leaflet-interactive {
	cursor: crosshair;
	}
.leaflet-popup-pane,
.leaflet-control {
	cursor: auto;
	}
.leaflet-dragging .leaflet-grab,
.leaflet-dragging .leaflet-grab .leaflet-interactive,
.leaflet-dragging .leaflet-marker-draggable {
	cursor: move;
	cursor: -webkit-grabbing;
	cursor:    -moz-grabbing;
	cursor:         grabbing;
	}

/* marker & overlays interactivity */
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-image-layer,
.leaflet-pane > svg path,
.leaflet-tile-container {
	pointer-events: none;
	}

.leaflet-marker-icon.leaflet-interactive,
.leaflet-image-layer.leaflet-interactive,
.leaflet-pane > svg path.leaflet-interactive,
svg.leaflet-image-layer.leaflet-interactive path {
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
	pointer-events: auto;
	}

/* visual tweaks */

.leaflet-container {
	background: #ddd;
	outline: 0;
	}
.leaflet-container a {
	color: #0078A8;
	}
.leaflet-container a.leaflet-active {
	outline: 2px solid orange;
	}
.leaflet-zoom-box {
	border: 2px dotted #38f;
	background: rgba(255,255,255,0.5);
	}


/* general typography */
.leaflet-container {
	font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
	}


/* general toolbar styles */

.leaflet-bar {
	box-shadow: 0 1px 5px rgba(0,0,0,0.65);
	border-radius: 4px;
	}
.leaflet-bar a,
.leaflet-bar a:hover {
	background-color: #fff;
	border-bottom: 1px solid #ccc;
	width: 26px;
	height: 26px;
	line-height: 26px;
	display: block;
	text-align: center;
	text-decoration: none;
	color: black;
	}
.leaflet-bar a,
.leaflet-control-layers-toggle {
	background-position: 50% 50%;
	background-repeat: no-repeat;
	display: block;
	}
.leaflet-bar a:hover {
	background-color: #f4f4f4;
	}
.leaflet-bar a:first-child {
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	}
.leaflet-bar a:last-child {
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	border-bottom: none;
	}
.leaflet-bar a.leaflet-disabled {
	cursor: default;
	background-color: #f4f4f4;
	color: #bbb;
	}

.leaflet-touch .leaflet-bar a {
	width: 30px;
	height: 30px;
	line-height: 30px;
	}
.leaflet-touch .leaflet-bar a:first-child {
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	}
.leaflet-touch .leaflet-bar a:last-child {
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	}

/* zoom control */

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
	font: bold 18px 'Lucida Console', Monaco, monospace;
	text-indent: 1px;
	}

.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {
	font-size: 22px;
	}


/* layers control */

.leaflet-control-layers {
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);
	background: #fff;
	border-radius: 5px;
	}
.leaflet-control-layers-toggle {
	background-image: url(images/layers.png);
	width: 36px;
	height: 36px;
	}
.leaflet-retina .leaflet-control-layers-toggle {
	background-image: url(images/layers-2x.png);
	background-size: 26px 26px;
	}
.leaflet-touch .leaflet-control-layers-toggle {
	width: 44px;
	height: 44px;
	}
.leaflet-control-layers .leaflet-control-layers-list,
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {
	display: none;
	}
.leaflet-control-layers-expanded .leaflet-control-layers-list {
	display: block;
	position: relative;
	}
.leaflet-control-layers-expanded {
	padding: 6px 10px 6px 6px;
	color: #333;
	background: #fff;
	}
.leaflet-control-layers-scrollbar {
	overflow-y: scroll;
	overflow-x: hidden;
	padding-right: 5px;
	}
.leaflet-control-layers-selector {
	margin-top: 2px;
	position: relative;
	top: 1px;
	}
.leaflet-control-layers label {
	display: block;
	}
.leaflet-control-layers-separator {
	height: 0;
	border-top: 1px solid #ddd;
	margin: 5px -10px 5px -6px;
	}

/* Default icon URLs */
.leaflet-default-icon-path {
	background-image: url(images/marker-icon.png);
	}


/* attribution and scale controls */

.leaflet-container .leaflet-control-attribution {
	background: #fff;
	background: rgba(255, 255, 255, 0.7);
	margin: 0;
	}
.leaflet-control-attribution,
.leaflet-control-scale-line {
	padding: 0 5px;
	color: #333;
	}
.leaflet-control-attribution a {
	text-decoration: none;
	}
.leaflet-control-attribution a:hover {
	text-decoration: underline;
	}
.leaflet-container .leaflet-control-attribution,
.leaflet-container .leaflet-control-scale {
	font-size: 11px;
	}
.leaflet-left .leaflet-control-scale {
	margin-left: 5px;
	}
.leaflet-bottom .leaflet-control-scale {
	margin-bottom: 5px;
	}
.leaflet-control-scale-line {
	border: 2px solid #777;
	border-top: none;
	line-height: 1.1;
	padding: 2px 5px 1px;
	font-size: 11px;
	white-space: nowrap;
	overflow: hidden;
	-moz-box-sizing: border-box;
	     box-sizing: border-box;

	background: #fff;
	background: rgba(255, 255, 255, 0.5);
	}
.leaflet-control-scale-line:not(:first-child) {
	border-top: 2px solid #777;
	border-bottom: none;
	margin-top: -2px;
	}
.leaflet-control-scale-line:not(:first-child):not(:last-child) {
	border-bottom: 2px solid #777;
	}

.leaflet-touch .leaflet-control-attribution,
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
	box-shadow: none;
	}
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
	border: 2px solid rgba(0,0,0,0.2);
	background-clip: padding-box;
	}


/* popup */

.leaflet-popup {
	position: absolute;
	text-align: center;
	margin-bottom: 20px;
	}
.leaflet-popup-content-wrapper {
	padding: 1px;
	text-align: left;
	border-radius: 12px;
	}
.leaflet-popup-content {
	margin: 13px 19px;
	line-height: 1.4;
	}
.leaflet-popup-content p {
	margin: 18px 0;
	}
.leaflet-popup-tip-container {
	width: 40px;
	height: 20px;
	position: absolute;
	left: 50%;
	margin-left: -20px;
	overflow: hidden;
	pointer-events: none;
	}
.leaflet-popup-tip {
	width: 17px;
	height: 17px;
	padding: 1px;

	margin: -10px auto 0;

	-webkit-transform: rotate(45deg);
	   -moz-transform: rotate(45deg);
	    -ms-transform: rotate(45deg);
	        transform: rotate(45deg);
	}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
	background: white;
	color: #333;
	box-shadow: 0 3px 14px rgba(0,0,0,0.4);
	}
.leaflet-container a.leaflet-popup-close-button {
	position: absolute;
	top: 0;
	right: 0;
	padding: 4px 4px 0 0;
	border: none;
	text-align: center;
	width: 18px;
	height: 14px;
	font: 16px/14px Tahoma, Verdana, sans-serif;
	color: #c3c3c3;
	text-decoration: none;
	font-weight: bold;
	background: transparent;
	}
.leaflet-container a.leaflet-popup-close-button:hover {
	color: #999;
	}
.leaflet-popup-scrolled {
	overflow: auto;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
	}

.leaflet-oldie .leaflet-popup-content-wrapper {
	-ms-zoom: 1;
	}
.leaflet-oldie .leaflet-popup-tip {
	width: 24px;
	margin: 0 auto;

	-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
	filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
	}
.leaflet-oldie .leaflet-popup-tip-container {
	margin-top: -1px;
	}

.leaflet-oldie .leaflet-control-zoom,
.leaflet-oldie .leaflet-control-layers,
.leaflet-oldie .leaflet-popup-content-wrapper,
.leaflet-oldie .leaflet-popup-tip {
	border: 1px solid #999;
	}


/* div icon */

.leaflet-div-icon {
	background: #fff;
	border: 1px solid #666;
	}


/* Tooltip */
/* Base styles for the element that has a tooltip */
.leaflet-tooltip {
	position: absolute;
	padding: 6px;
	background-color: #fff;
	border: 1px solid #fff;
	border-radius: 3px;
	color: #222;
	white-space: nowrap;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	pointer-events: none;
	box-shadow: 0 1px 3px rgba(0,0,0,0.4);
	}
.leaflet-tooltip.leaflet-clickable {
	cursor: pointer;
	pointer-events: auto;
	}
.leaflet-tooltip-top:before,
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
	position: absolute;
	pointer-events: none;
	border: 6px solid transparent;
	background: transparent;
	content: "";
	}

/* Directions */

.leaflet-tooltip-bottom {
	margin-top: 6px;
}
.leaflet-tooltip-top {
	margin-top: -6px;
}
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-top:before {
	left: 50%;
	margin-left: -6px;
	}
.leaflet-tooltip-top:before {
	bottom: 0;
	margin-bottom: -12px;
	border-top-color: #fff;
	}
.leaflet-tooltip-bottom:before {
	top: 0;
	margin-top: -12px;
	margin-left: -6px;
	border-bottom-color: #fff;
	}
.leaflet-tooltip-left {
	margin-left: -6px;
}
.leaflet-tooltip-right {
	margin-left: 6px;
}
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
	top: 50%;
	margin-top: -6px;
	}
.leaflet-tooltip-left:before {
	right: 0;
	margin-right: -12px;
	border-left-color: #fff;
	}
.leaflet-tooltip-right:before {
	left: 0;
	margin-left: -12px;
	border-right-color: #fff;
	}

  #mapid {
    position: fixed;
    top: 0;
    left: 200;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    #mapid {
      height: 100vh!important;
			left: 0;
    }
.leaflet-left {
	left: 0;
	}
.leaflet-top {
	top: 60;
	}
  }
`;

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let WcFuerteMapPage = class WcFuerteMapPage extends h {
    static get styles() {
        return [mapStyles$1];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.loadFotos();
    }
    ;
    loadFotos() {
        return __awaiter$2(this, void 0, void 0, function* () {
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
    renderMap() {
        var _a;
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100vh';
        mapContainer.style.width = '100vw';
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(mapContainer);
        createMap(mapContainer, this.fotos);
    }
    ;
    render() {
        return T `
        ${this.renderMap()}
    `;
    }
    ;
};
__decorate$3([
    e({ type: Array })
], WcFuerteMapPage.prototype, "fotos", void 0);
__decorate$3([
    o$1('#mapid')
], WcFuerteMapPage.prototype, "mapid", void 0);
WcFuerteMapPage = __decorate$3([
    n$1("wc-fuerte-map-page")
], WcFuerteMapPage);

const mapStyles = r$1 `
  /* .leaflet-map-pane {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  } */

  img {
    position: absolute;
  }
  /* .leaflet-control-container {
    position: fixed;
    bottom: 10px;
    right: 20px;
    padding: 10px 20px;
    z-index: 10;
    font-size: 10px;
    color: white;
  }

  .leaflet-control-container a {
    color: var(--fuerte-aqua);
  }

  .leaflet-control-zoom-out, .leaflet-control-zoom-in {
    position: fixed;
    background-color: white;
    border-radius: 4px;
    color: #555;
    padding: 5px 7px;
    top: 70;
    right: 30;
    text-decoration: none;
  }

  .leaflet-control-zoom-out a, .leaflet-control-zoom-in a {
    color: #555;
  }

  .leaflet-control-zoom-in {
    right: 55px;
  } */

  /* required styles */

.leaflet-pane,
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile-container,
.leaflet-pane > svg,
.leaflet-pane > canvas,
.leaflet-zoom-box,
.leaflet-image-layer,
.leaflet-layer {
	position: absolute;
	left: 0;
	top: 0;
	}
.leaflet-container {
	overflow: hidden;
	}
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow {
	-webkit-user-select: none;
	   -moz-user-select: none;
	        user-select: none;
	  -webkit-user-drag: none;
	}
/* Prevents IE11 from highlighting tiles in blue */
.leaflet-tile::selection {
	background: transparent;
}
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */
.leaflet-safari .leaflet-tile {
	image-rendering: -webkit-optimize-contrast;
	}
/* hack that prevents hw layers "stretching" when loading new tiles */
.leaflet-safari .leaflet-tile-container {
	width: 1600px;
	height: 1600px;
	-webkit-transform-origin: 0 0;
	}
.leaflet-marker-icon,
.leaflet-marker-shadow {
	display: block;
	}
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
.leaflet-container .leaflet-overlay-pane svg,
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer,
.leaflet-container .leaflet-tile {
	max-width: none !important;
	max-height: none !important;
	}

.leaflet-container.leaflet-touch-zoom {
	-ms-touch-action: pan-x pan-y;
	touch-action: pan-x pan-y;
	}
.leaflet-container.leaflet-touch-drag {
	-ms-touch-action: pinch-zoom;
	/* Fallback for FF which doesn't support pinch-zoom */
	touch-action: none;
	touch-action: pinch-zoom;
}
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
	-ms-touch-action: none;
	touch-action: none;
}
.leaflet-container {
	-webkit-tap-highlight-color: transparent;
}
.leaflet-container a {
	-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
}
.leaflet-tile {
	filter: inherit;
	visibility: hidden;
	}
.leaflet-tile-loaded {
	visibility: inherit;
	}
.leaflet-zoom-box {
	width: 0;
	height: 0;
	-moz-box-sizing: border-box;
	     box-sizing: border-box;
	z-index: 800;
	}
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
.leaflet-overlay-pane svg {
	-moz-user-select: none;
	}

.leaflet-pane         { z-index: 400; }

.leaflet-tile-pane    { z-index: 200; }
.leaflet-overlay-pane { z-index: 400; }
.leaflet-shadow-pane  { z-index: 500; }
.leaflet-marker-pane  { z-index: 600; }
.leaflet-tooltip-pane   { z-index: 650; }
.leaflet-popup-pane   { z-index: 700; }

.leaflet-map-pane canvas { z-index: 100; }
.leaflet-map-pane svg    { z-index: 200; }

.leaflet-vml-shape {
	width: 1px;
	height: 1px;
	}
.lvml {
	behavior: url(#default#VML);
	display: inline-block;
	position: absolute;
	}


/* control positioning */

.leaflet-control {
	position: relative;
	z-index: 800;
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
	pointer-events: auto;
	}
.leaflet-top,
.leaflet-bottom {
	position: absolute;
	z-index: 1000;
	pointer-events: none;
	}
.leaflet-top {
	top: 60;
	}
.leaflet-right {
	right: 0;
	}
.leaflet-bottom {
	bottom: 0;
	}
.leaflet-left {
	left: 10;
	}
.leaflet-control {
	float: right;
	clear: both;
	}
.leaflet-right .leaflet-control {
	float: right;
	}
.leaflet-top .leaflet-control {
	margin-top: 10px;
	}
.leaflet-bottom .leaflet-control {
	margin-bottom: 10px;
	}
.leaflet-left .leaflet-control {
	margin-left: 10px;
	}
.leaflet-right .leaflet-control {
	margin-right: 10px;
	}


/* zoom and fade animations */

.leaflet-fade-anim .leaflet-tile {
	will-change: opacity;
	}
.leaflet-fade-anim .leaflet-popup {
	opacity: 0;
	-webkit-transition: opacity 0.2s linear;
	   -moz-transition: opacity 0.2s linear;
	        transition: opacity 0.2s linear;
	}
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
	opacity: 1;
	}
.leaflet-zoom-animated {
	-webkit-transform-origin: 0 0;
	    -ms-transform-origin: 0 0;
	        transform-origin: 0 0;
	}
.leaflet-zoom-anim .leaflet-zoom-animated {
	will-change: transform;
	}
.leaflet-zoom-anim .leaflet-zoom-animated {
	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
	}
.leaflet-zoom-anim .leaflet-tile,
.leaflet-pan-anim .leaflet-tile {
	-webkit-transition: none;
	   -moz-transition: none;
	        transition: none;
	}

.leaflet-zoom-anim .leaflet-zoom-hide {
	visibility: hidden;
	}


/* cursors */

.leaflet-interactive {
	cursor: pointer;
	}
.leaflet-grab {
	cursor: -webkit-grab;
	cursor:    -moz-grab;
	cursor:         grab;
	}
.leaflet-crosshair,
.leaflet-crosshair .leaflet-interactive {
	cursor: crosshair;
	}
.leaflet-popup-pane,
.leaflet-control {
	cursor: auto;
	}
.leaflet-dragging .leaflet-grab,
.leaflet-dragging .leaflet-grab .leaflet-interactive,
.leaflet-dragging .leaflet-marker-draggable {
	cursor: move;
	cursor: -webkit-grabbing;
	cursor:    -moz-grabbing;
	cursor:         grabbing;
	}

/* marker & overlays interactivity */
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-image-layer,
.leaflet-pane > svg path,
.leaflet-tile-container {
	pointer-events: none;
	}

.leaflet-marker-icon.leaflet-interactive,
.leaflet-image-layer.leaflet-interactive,
.leaflet-pane > svg path.leaflet-interactive,
svg.leaflet-image-layer.leaflet-interactive path {
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
	pointer-events: auto;
	}

/* visual tweaks */

.leaflet-container {
	background: #ddd;
	outline: 0;
	}
.leaflet-container a {
	color: #0078A8;
	}
.leaflet-container a.leaflet-active {
	outline: 2px solid orange;
	}
.leaflet-zoom-box {
	border: 2px dotted #38f;
	background: rgba(255,255,255,0.5);
	}


/* general typography */
.leaflet-container {
	font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
	}


/* general toolbar styles */

.leaflet-bar {
	box-shadow: 0 1px 5px rgba(0,0,0,0.65);
	border-radius: 4px;
	}
.leaflet-bar a,
.leaflet-bar a:hover {
	background-color: #fff;
	border-bottom: 1px solid #ccc;
	width: 26px;
	height: 26px;
	line-height: 26px;
	display: block;
	text-align: center;
	text-decoration: none;
	color: black;
	}
.leaflet-bar a,
.leaflet-control-layers-toggle {
	background-position: 50% 50%;
	background-repeat: no-repeat;
	display: block;
	}
.leaflet-bar a:hover {
	background-color: #f4f4f4;
	}
.leaflet-bar a:first-child {
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	}
.leaflet-bar a:last-child {
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	border-bottom: none;
	}
.leaflet-bar a.leaflet-disabled {
	cursor: default;
	background-color: #f4f4f4;
	color: #bbb;
	}

.leaflet-touch .leaflet-bar a {
	width: 30px;
	height: 30px;
	line-height: 30px;
	}
.leaflet-touch .leaflet-bar a:first-child {
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	}
.leaflet-touch .leaflet-bar a:last-child {
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	}

/* zoom control */

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
	font: bold 18px 'Lucida Console', Monaco, monospace;
	text-indent: 1px;
	}

.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {
	font-size: 22px;
	}


/* layers control */

.leaflet-control-layers {
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);
	background: #fff;
	border-radius: 5px;
	}
.leaflet-control-layers-toggle {
	background-image: url(images/layers.png);
	width: 36px;
	height: 36px;
	}
.leaflet-retina .leaflet-control-layers-toggle {
	background-image: url(images/layers-2x.png);
	background-size: 26px 26px;
	}
.leaflet-touch .leaflet-control-layers-toggle {
	width: 44px;
	height: 44px;
	}
.leaflet-control-layers .leaflet-control-layers-list,
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {
	display: none;
	}
.leaflet-control-layers-expanded .leaflet-control-layers-list {
	display: block;
	position: relative;
	}
.leaflet-control-layers-expanded {
	padding: 6px 10px 6px 6px;
	color: #333;
	background: #fff;
	}
.leaflet-control-layers-scrollbar {
	overflow-y: scroll;
	overflow-x: hidden;
	padding-right: 5px;
	}
.leaflet-control-layers-selector {
	margin-top: 2px;
	position: relative;
	top: 1px;
	}
.leaflet-control-layers label {
	display: block;
	}
.leaflet-control-layers-separator {
	height: 0;
	border-top: 1px solid #ddd;
	margin: 5px -10px 5px -6px;
	}

/* Default icon URLs */
.leaflet-default-icon-path {
	background-image: url(images/marker-icon.png);
	}


/* attribution and scale controls */

.leaflet-container .leaflet-control-attribution {
	background: #fff;
	background: rgba(255, 255, 255, 0.7);
	margin: 0;
	}
.leaflet-control-attribution,
.leaflet-control-scale-line {
	padding: 0 5px;
	color: #333;
	}
.leaflet-control-attribution a {
	text-decoration: none;
	}
.leaflet-control-attribution a:hover {
	text-decoration: underline;
	}
.leaflet-container .leaflet-control-attribution,
.leaflet-container .leaflet-control-scale {
	font-size: 11px;
	}
.leaflet-left .leaflet-control-scale {
	margin-left: 5px;
	}
.leaflet-bottom .leaflet-control-scale {
	margin-bottom: 5px;
	}
.leaflet-control-scale-line {
	border: 2px solid #777;
	border-top: none;
	line-height: 1.1;
	padding: 2px 5px 1px;
	font-size: 11px;
	white-space: nowrap;
	overflow: hidden;
	-moz-box-sizing: border-box;
	     box-sizing: border-box;

	background: #fff;
	background: rgba(255, 255, 255, 0.5);
	}
.leaflet-control-scale-line:not(:first-child) {
	border-top: 2px solid #777;
	border-bottom: none;
	margin-top: -2px;
	}
.leaflet-control-scale-line:not(:first-child):not(:last-child) {
	border-bottom: 2px solid #777;
	}

.leaflet-touch .leaflet-control-attribution,
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
	box-shadow: none;
	}
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
	border: 2px solid rgba(0,0,0,0.2);
	background-clip: padding-box;
	}


/* popup */

.leaflet-popup {
	position: absolute;
	text-align: center;
	margin-bottom: 20px;
	}
.leaflet-popup-content-wrapper {
	padding: 1px;
	text-align: left;
	border-radius: 12px;
	}
.leaflet-popup-content {
	margin: 13px 19px;
	line-height: 1.4;
	}
.leaflet-popup-content p {
	margin: 18px 0;
	}
.leaflet-popup-tip-container {
	width: 40px;
	height: 20px;
	position: absolute;
	left: 50%;
	margin-left: -20px;
	overflow: hidden;
	pointer-events: none;
	}
.leaflet-popup-tip {
	width: 17px;
	height: 17px;
	padding: 1px;

	margin: -10px auto 0;

	-webkit-transform: rotate(45deg);
	   -moz-transform: rotate(45deg);
	    -ms-transform: rotate(45deg);
	        transform: rotate(45deg);
	}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
	background: white;
	color: #333;
	box-shadow: 0 3px 14px rgba(0,0,0,0.4);
	}
.leaflet-container a.leaflet-popup-close-button {
	position: absolute;
	top: 0;
	right: 0;
	padding: 4px 4px 0 0;
	border: none;
	text-align: center;
	width: 18px;
	height: 14px;
	font: 16px/14px Tahoma, Verdana, sans-serif;
	color: #c3c3c3;
	text-decoration: none;
	font-weight: bold;
	background: transparent;
	}
.leaflet-container a.leaflet-popup-close-button:hover {
	color: #999;
	}
.leaflet-popup-scrolled {
	overflow: auto;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
	}

.leaflet-oldie .leaflet-popup-content-wrapper {
	-ms-zoom: 1;
	}
.leaflet-oldie .leaflet-popup-tip {
	width: 24px;
	margin: 0 auto;

	-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
	filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
	}
.leaflet-oldie .leaflet-popup-tip-container {
	margin-top: -1px;
	}

.leaflet-oldie .leaflet-control-zoom,
.leaflet-oldie .leaflet-control-layers,
.leaflet-oldie .leaflet-popup-content-wrapper,
.leaflet-oldie .leaflet-popup-tip {
	border: 1px solid #999;
	}


/* div icon */

.leaflet-div-icon {
	background: #fff;
	border: 1px solid #666;
	}


/* Tooltip */
/* Base styles for the element that has a tooltip */
.leaflet-tooltip {
	position: absolute;
	padding: 6px;
	background-color: #fff;
	border: 1px solid #fff;
	border-radius: 3px;
	color: #222;
	white-space: nowrap;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	pointer-events: none;
	box-shadow: 0 1px 3px rgba(0,0,0,0.4);
	}
.leaflet-tooltip.leaflet-clickable {
	cursor: pointer;
	pointer-events: auto;
	}
.leaflet-tooltip-top:before,
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
	position: absolute;
	pointer-events: none;
	border: 6px solid transparent;
	background: transparent;
	content: "";
	}

/* Directions */

.leaflet-tooltip-bottom {
	margin-top: 6px;
}
.leaflet-tooltip-top {
	margin-top: -6px;
}
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-top:before {
	left: 50%;
	margin-left: -6px;
	}
.leaflet-tooltip-top:before {
	bottom: 0;
	margin-bottom: -12px;
	border-top-color: #fff;
	}
.leaflet-tooltip-bottom:before {
	top: 0;
	margin-top: -12px;
	margin-left: -6px;
	border-bottom-color: #fff;
	}
.leaflet-tooltip-left {
	margin-left: -6px;
}
.leaflet-tooltip-right {
	margin-left: 6px;
}
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
	top: 50%;
	margin-top: -6px;
	}
.leaflet-tooltip-left:before {
	right: 0;
	margin-right: -12px;
	border-left-color: #fff;
	}
.leaflet-tooltip-right:before {
	left: 0;
	margin-left: -12px;
	border-right-color: #fff;
	}

  #mapid {
    position: fixed;
    top: 0;
    left: 200;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    #mapid {
      height: 100vh!important;
			left: 0;
    }
.leaflet-left {
	left: 0;
	}
.leaflet-top {
	top: 60;
	}
  }
`;

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcSightseeingPage = class WcSightseeingPage extends h {
    static get styles() {
        return [mapStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    renderMap() {
        var _a;
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100vh';
        mapContainer.style.width = '100vw';
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(mapContainer);
        createToDoMap(mapContainer);
    }
    ;
    render() {
        return T `
        ${this.renderMap()}
    `;
    }
    ;
};
__decorate$2([
    o$1('#mapid')
], WcSightseeingPage.prototype, "mapid", void 0);
WcSightseeingPage = __decorate$2([
    n$1("wc-sightseeing-page")
], WcSightseeingPage);

const fotosFoldersStyles = r$1 `
  .folder-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: center;
  }

  .folder {
    margin: 10px;
    border-radius: 4px;
    box-shadow: var(--fuerte-box-shadow);
    cursor: pointer;
  }

  img {
    width: auto;
    height: 200px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .subtitle {
    font-family: var(--fuerte-text-font);
    background-color: var(--fuerte-brown);
    padding: 7px 10px;
    word-wrap: break-word;
    font-size: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
  }

  .back-to-fotos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    img {
      width: auto;
      height: 100px;
    }
  }
`;

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let WcFotosFolders = class WcFotosFolders extends h {
    constructor() {
        super(...arguments);
        this.showFotostory = false;
    }
    static get styles() {
        return [fotosFoldersStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.loadFotos();
    }
    ;
    loadFotos() {
        return __awaiter$1(this, void 0, void 0, function* () {
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
        });
    }
    ;
    renderFotostory(fotostory) {
        this.fotostory = fotostory;
        this.showFotostory = true;
    }
    ;
    render() {
        return T `
      ${this.showFotostory ? T `
        <p style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding-top: 30px; color: #555">
          <wc-icon @click=${() => this.showFotostory = false} primaryColor="gray" icon="angle-left" style="cursor: pointer; width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
          ${this.fotostory.date}
        </p>
        ${new WcFotostory(this.fotostory)}
        <div class="back-to-fotos" @click=${() => this.showFotostory = false}>
          <wc-icon primaryColor="gray" icon="angle-left" style="width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
          Zurück zu Fotos
        </div>
        ` : T `
        <div class="folder-container">
        ${this.fotos.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(f => T `
          <div class="folder" @click=${() => this.renderFotostory(f)}>
            <img src="https://raw.githubusercontent.com/anjakhan/fuerteventura/main/assets/${f.foldername}/${f.image}" alt="folder">
            <div class="subtitle">${config.isMobile ? f.date : f.foldername}</div>
          </div>
        `)}
      </div>`}
    `;
    }
    ;
};
__decorate$1([
    e({ type: Array })
], WcFotosFolders.prototype, "fotos", void 0);
__decorate$1([
    e({ type: Object })
], WcFotosFolders.prototype, "fotostory", void 0);
__decorate$1([
    e({ type: Boolean })
], WcFotosFolders.prototype, "showFotostory", void 0);
WcFotosFolders = __decorate$1([
    n$1("wc-fotos-folders")
], WcFotosFolders);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcAppLayout = class WcAppLayout extends h {
    constructor() {
        super(...arguments);
        this.selectedDrawer = 'latest-story';
    }
    static get styles() {
        return [layoutStyles, navbarStyles];
    }
    ;
    render() {
        return T `
        <div class="account-layout">
            <header>
                <wc-icon primaryColor="island" icon="island" class="island"></wc-icon><h3>Fuerteventura</h3><div style="min-width: 60px;"></div>
                <div class="user-icon" style="position: fixed; right: 40px; top; 0px; z-index: 99;">
                    <wc-icon @mousedown=${(e) => this.userClick(e)} primaryColor="island" icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
                </div>
            </header>

            <div class="drawer">${this.renderDrawer()}</div>  
            
            <div id="user-content">
                ${this.getUserContent()}
            </div>
        </div>
        `;
    }
    ;
    renderDrawer() {
        const td = new WcAppDrawer(this.selectedDrawer);
        td.getDrawerSelection(selectedDrawer => {
            this.selectedDrawer = selectedDrawer;
        });
        return td;
    }
    ;
    getUserContent() {
        switch (this.selectedDrawer) {
            case ('latest-story'): return new WcFotosFolders();
            case ('trip-details'): return new WcTraveldetailsPage();
            case ('foto-preview'): return new WcFotoPreview();
            case ('upload'): return new WcUploadPage();
            case ('map'): return new WcFuerteMapPage();
            case ('sightseeing'): return new WcSightseeingPage();
        }
    }
    ;
    userClick(e) {
        showCtxMenu(e, [
            {
                caption: "Log out",
                callback: () => {
                    this.logoutUser();
                }
            },
        ]);
    }
    ;
    logoutUser() {
        logoutFunc();
    }
    ;
};
__decorate([
    e({ type: String })
], WcAppLayout.prototype, "selectedDrawer", void 0);
WcAppLayout = __decorate([
    n$1("wc-app-layout")
], WcAppLayout);

r$1 `
  :host, :host * {
    box-sizing: border-box; 
  }
  :host  {
    position: absolute;
    background-color: var(--printess-panelBackground);
    box-shadow: black 0 0 10px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    overflow: auto;
    max-height: 100vh;
    max-width: 100vw;
    
    font-family: Lato, sans-serif; 
    font-size: var(--printess-textSize);
    color:  var(--printess-textColor); 
    display: grid;
    width: fit-content;
    grid-template-rows: 1fr auto;
    z-index: 100;
}
  .content {
    padding: var(--printess-dialog-padding);
    overflow: auto;
  }
  .footer {                
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    column-gap: calc(var(--printess-dialog-padding) / 2);
    padding: var(--printess-dialog-padding);
    border-top: 1px solid var(--printess-textColorDisabled);
  }
  .header {                
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding: var(--printess-dialog-padding);
    padding-bottom: 25px;
    border-bottom: 1px solid var(--printess-textColorDisabled);
    font-size: var(--printess-headlineSize);
    color: var(--printess-headlineColor);
    
  }
  h1 {
    font-size: var(--printess-headlineSize);
    color: var(--printess-headlineColor);
    margin-top: 20px;
    margin-bottom: 10px;
  }
  p {
    font-size: var(--printess-textSize);
    line-height: 1.4;
    color: var(--printess-textColor);
    margin-top: 10px;
    margin-bottom: 20px;
  }
  p > b {
    color: var(--printess-headlineColor);
  }
`;
r$1 `
  
    :host {
      display: block;
      width: 100%;
      overflow: hidden; 
    } 
     
   /* :host > *:not(.seperator) {*/
    :host > *:not(.two-cols) {
      /*border-bottom: 20px solid yellow;*/
        margin-bottom: 7px;
    }
    .two-cols > * {
      margin-bottom: 7px;
    }
    .seperator {
      height: 0px;
      opacity: 0.5;
      border-bottom: dashed 1px var(--printess-textColorDisabled);
    }
    p {
      font-size: 12px;
      color: var(--printess-textColor);
      margin: 0px;
      margin-bottom: 3px;
    }
    b {
      background-color: var(--printess-headlineColor);
      color: white;
      padding: 2px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 15%;
      box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
      margin-right: 3px;
      margin-left: 3px;
    }
    h5 {
      font-size: 14px;
      color: var(--printess-textColor);
      margin-bottom: 3px;
      margin-top: 2px;
    }
    .section-head {
        font-size: var(--printess-labelSize);
        margin: 0;
        margin-bottom: 10px;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
  }
  .two-cols.uneven {
      grid-template-columns: auto 1fr;
      
  }
  .two-cols.fr2fr1 {
      grid-template-columns: 2fr 1fr;
      
  }
    .buyer-properties-devider {
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 4px;
        font-size: var(--printess-textSize); /* 16px; */
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .admin-properties-devider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 2px;
        padding-bottom: 3px;
        font-size: var(--printess-labelSize);  
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .anchor-grid {
      display: grid;
            
      align-items: stretch;
      align-content: stretch;
      grid-gap: 8px 8px;
      grid-template-rows:   var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
      grid-template-columns:    var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
                  
      grid-template-areas:  "m_lt m_ct m_rt"
                            "m_lm m_cm m_rm"
                            "m_lb m_cb m_rb";
      margin-top: 10px;                        
    }
    
    .anchor-box {
        grid-column-start: m_lt; 
        grid-column-end: m_rb;
        grid-row-start: m_lt; 
        grid-row-end: m_rb;
        padding: calc(var(--printess-anchor-size) / 2);
    }
    .anchor-box > div {
        border: 1px solid var(--printess-headlineColor); 
        height: 100%;
    }
    .anchor-grid > .checker {
        border: var(--printess-headlineColor) 1px solid;
      border-radius: 10%;
      transition: border-color;
      transition-duration: 0.7s;
      cursor: pointer;
    }
    .anchor-grid > .checker:hover {
         background-color: white;
    }
    
    .anchor-grid >  .on {
        background-color: var(--printess-headlineColor);
    }
    .anchor-grid >  .off {
        background-color: #eee;
    }
    
    .anchor-grid > .checker.on:hover {
        background-color: var(--printess-headlineColorHover);
    }
    
    .anchor-grid > .mixed {
        background-color: #ddd;
    }
    .anchor-grid > .null {
        background-color: yellow;
    }
`;
r$1 `
  
    :host {
      display: block;
      width: 100%;
      overflow: hidden; 
    } 
   /* :host > *:not(.seperator) {*/
    :host > *:not(.two-cols) {
      /*border-bottom: 20px solid yellow;*/
        margin-bottom: 7px;
    }
    .two-cols > * {
      margin-bottom: 7px;
    }
    .seperator {
      height: 0px;
      opacity: 0.5;
      border-bottom: dashed 1px var(--printess-textColorDisabled);
    }
    p {
      font-size: 12px;
      color: var(--printess-textColor);
      margin: 0px;
      margin-bottom: 3px;
    }
    b {
      background-color: var(--printess-headlineColor);
      color: white;
      padding: 2px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 15%;
      box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
      margin-right: 3px;
      margin-left: 3px;
    }
    h5 {
      font-size: 14px;
      color: var(--printess-textColor);
      margin-bottom: 3px;
      margin-top: 2px;
    }
    .section-head {
        font-size: var(--printess-labelSize);
        margin: 0;
        margin-bottom: 10px;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
  }
    .two-cols.uneven {
      grid-template-columns: auto 1fr;
      
  }
    .header-bar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
       
        padding: 4px;
       
    }
    .header-bar-title {
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color: var(--printess-headlineColorInverse);
    }
    .header-button {
      grid-column: 3;
      border: 1px solid var(--printess-headlineColorInverse);
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row;
    } 
    .header-button:hover {
      background-color: rgba(0,0,0,0.1);
    }
    .header-button-icon {
      padding: 2px;
      width: 24px;
      height: 24px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: uppercase;
      color:  var(--printess-headlineColorInverse);
    }
    .header-button-text {
      padding: 2px 6px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color:  var(--printess-headlineColorInverse);
    }
    /****** IMAGE PROPERTIES ******/
    .image-property-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 15px;
      align-items: center;
    }
    
    .image-property-caption {
      color: var(--printess-headlineColor);
      font-size: 14px; 
      font-weight: bold;
    }
    .image-property-container {
      display: flex;
      flex-wrap: wrap;
    }
    .image-property-button {
      margin: 5px;
      padding: 3px;
      background-color:  var( --printess-fatButtonBackgroundSelected);
      color:  var(--printess-fatButtonForeground);
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row;
    } 
    
    .image-property-button-icon {
      padding: 2px;
      width: 24px;
      height: 24px;
      font-size: var(--printess-textSize); /* 16px; */
      fill:  var(--printess-fatButtonForeground);
    }
    .image-property-button-text {
      padding: 2px 6px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color:  var( --printess-fatButtonForeground);
    } 
    .image-property-button.sepia > * {
      color: #a39775;
      fill: #a39775;
    }
    .image-property-button.enhance > * {
      color: #7b658b;
      fill: #7b658b;
    }
    .image-property-button:hover {
      background-color: var(--printess-headlineColor);
    }
    .image-property-button:hover > * {
      color: var(--printess-headlineColorInverse);
      fill: var(--printess-headlineColorInverse);
    }
    
   /* .image-property-button.sepia:hover > * {
      color: #746b53;
      fill: #746b53;
    }*/
  
   /* .image-property-button.enhance:hover > * {
      color: #544560;
      fill: #544560;
    }*/
   
    
    .color-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .color-list > * {
      margin: 4px;
    }
    
    .admin-properties-devider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 2px;
        padding-bottom: 3px;
        font-size: var(--printess-labelSize);  
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .anchor-grid {
      display: grid;
            
      align-items: stretch;
      align-content: stretch;
      grid-gap: 8px 8px;
      grid-template-rows:   var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
      grid-template-columns:    var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
                  
      grid-template-areas:  "m_lt m_ct m_rt"
                            "m_lm m_cm m_rm"
                            "m_lb m_cb m_rb";
      margin-top: 10px;                        
    }
    
    .anchor-box {
        grid-column-start: m_lt; 
        grid-column-end: m_rb;
        grid-row-start: m_lt; 
        grid-row-end: m_rb;
        padding: calc(var(--printess-anchor-size) / 2);
    }
    .anchor-box > div {
        border: 1px solid var(--printess-headlineColor); 
        height: 100%;
    }
    .anchor-grid > .checker {
        border: var(--printess-headlineColor) 1px solid;
      border-radius: 10%;
      transition: border-color;
      transition-duration: 0.7s;
      cursor: pointer;
    }
    .anchor-grid > .checker:hover {
         background-color: white;
    }
    
    .anchor-grid >  .on {
        background-color: var(--printess-headlineColor);
    }
    .anchor-grid >  .off {
        background-color: #eee;
    }
    
    .anchor-grid > .checker.on:hover {
        background-color: var(--printess-headlineColorHover);
    }
    
    .anchor-grid > .mixed {
        background-color: #ddd;
    }
    .anchor-grid > .null {
        background-color: yellow;
    }
    .imageListWrapper {
        display: block;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 22px; /* because of scrollbar */
    }
    .imageList {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: -2px;
    }
    .imageItem {
        display: grid;
        grid-template-columns: 70px;
        grid-template-rows: 70px;
        margin: 2px;
        cursor: pointer;
    }
    .small-image-list {
        height: 70px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 2px;
    }
    .small-image-item {
        width: 33px;
        height: 33px;
        margin-right: 2px;
        margin-bottom: 2px;
        cursor: pointer;
    }
   
    .imageBox {
        width: 100%;  
        height: 100%;
      
        background-size: cover;
        border: 1px solid  var(--printess-textColor);
        border-radius: 3px;
        background-color: #bbb;
     } 
     .imageBox:hover {
      border: 1px solid  var(--printess-headlineColor);
     }
     .imageBox.selected {
        border: 2px solid  var(--printess-headlineColor);
    }
    .imageName {
        font-size: 9px;
        text-overflow: ellipsis;
        width: 100%;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }   
    .image-upload .progress {
      width: 250px; 
      border: 1px solid black; 
      height: 22px;
    }
    .image-upload-progress > div {
      background: var(--printess-headlineColor); 
      height: 100%; 
      color: var(--printess-headlineColorInverse);
      text-align: center;
      padding: 2px;
    }

    









    
`;
const masterStyles = r$1 ` 
:root {
    --printess-properties-width: 442px;
    --printess-resourcebar-width: 32px;
    --printess-toolbar-width: 38px;
    --printess-open-toolbar-width: 72px;
    --printess-top-tabs-height: 36px;
    --printess-dialog-padding: 20px;
    --printess-anchor-size: 10px; /* small boxes in anchor grid */
    /**** PATH EDITOR  ******/
    --printess-path-editor-cover-bg: rgba(0,0,0,0.1);
    --printess-path-editor-cover-border: 1px solid rgba(0,0,0,0.5);
    --printess-path-editor-path-color: #21b7ff;
    --printess-path-editor-disabled-path-color: #bbbbbb;
    /**** Z-INDEX *****/
    --printess-z-index-ui-hint: 9987;
    --printess-z-index-context-menu: 9990;
    --printess-z-index-box-drag: 9985;
    --printess-z-index-box-selection: 9980;
    --printess-z-index-click-action-boxes: 9975;
    --printess-z-index-page-border: 9970;
    --printess-z-index-pasteboard: 9960;
    --printess-z-index-bleed: 9962;
    
    
    /*** FRAME  ***/
    --printess-frame-mover-size: 5px;
    --printess-extra-mover-catch-offset: -14px;
    --printess-cropper-large-side: 15px;
    --printess-cropper-small-side: 5px;
    --printess-annotationColor: DarkSlateBlue;
    --printess-rubberBandColor: red;
    --printess-resource-toolbar-width: 32px;
    --printess-resource-panel-initial-width: 200px;
    /* Mobile buyer side */ 
    /***** FORM PADDING *****/
    --printess-input-top-padding: 0; /*8px;*/ 
 
    /***** TEXT SIZE *****/
    --printess-annotationSize: 10px;
    --printess-labelSize: 11px;
    --printess-inputSize: 12px;
    --printess-textSize: 14px;
    --printess-headlineSize: 18px;
 
    /****** HEAD-TOOLBAR *******/ 
    --printess-headToolbarColor: white;
    --printess-headToolbarColorHover: #ffcccc;
    --printess-headToolbarBackgroundColor:   rgb(150, 150, 150);
    --printess-headToolbarBorderColor:   #444444; 
    /*** VAADIN COLOR MAPPING ***/
    --lumo-primary-text-color: var(--printess-headlineColor);
    --lumo-primary-color: var(--printess-headlineColor);
    --lumo-secondary-text-color: var(--printess-textColor) ;
    --lumo-disabled-text-color: var(--printess-textColorDisabled);  
    --lumo-body-text-color: var(--printess-inputColor);
    --lumo-base-color: var(--printess-panelBackground);
    --lumo-contrast-60pct: var(--printess-textColor);
    --lumo-contrast-5pct: var(--printess-inputBackgroundDisabled); /* input disabled background color */ 
    --lumo-contrast-10pct: var(--printess-inputBackground); /*rgba(255,255,255,0.2);*/ /* input background-color */
    --lumo-contrast-20pct: var(--printess-radioBackground); /*rgba(255,255,255,0.2);*/ /* input background-color used in radio buttons */
    --lumo-contrast-30pct: var(--printess-radioBackgroundHover); /*rgba(255,255,255,0.2);*/ /* input background-color used in radio buttons */
    --lumo-space-m: var(--printess-input-top-padding); /* padding-top of vaadin-text-box */
    --vaadin-text-field-default-width: 50px; /* make smaller to addopt to 100% later */
    /*input and button captions */ 
    --lumo-font-size-s: var(--printess-inputSize); /* input box size */
    --lumo-font-size-m:  var(--printess-inputSize); /* select-box does not react to theme=small */
    /*labels*/
    --lumo-font-size-xs:  var(--printess-labelSize); 
   
    /* MOBILE THEME DEFAULT */ 
    --printess-maxContrastColor: white;
    --printess-maxContrastColorInverse: black;
   
    /****** TEXT COLORS ********/
    --printess-headlineColor: #ff82d7;  
    --printess-headlineColorInverse: white;  
    --printess-headlineColorHover: #ffbeea;  
    --printess-textColor:#fff;
    --printess-textColorDisabled: #ddd;
    --printess-menuColorDisabled: #aaa;
    --printess-textColorHover: #fff;
    
    --printess-inputColor: white;
    --printess-inputColorDisabled:  rgb(200,200,200);
    --printess-inputBackground: rgba(255, 255, 255, 0.1);
    --printess-radioBackground: rgba(255, 255, 255, 0.2);
    --printess-radioBackgroundHover: rgba(255, 255, 255, 0.3);
    --printess-inputBackgroundDisabled: rgba(255, 255, 255, 0.05); 
    /****** FAT-BUTTON *****/
    --printess-fatButtonBackground: var(--printess-panelBackground);
    --printess-fatButtonBackgroundHover: var( --panelBackgroundHover:);
    --printess-fatButtonBackgroundSelected: var(--printess-panelBackgroundSelected);
    --printess-fatButtonForeground: var(--printess-textColor);
    --printess-fatButtonForegroundSelected: var(--printess-headlineColor);
     /****** SIDE-TOOLBARs *******/ 
    --printess-toolbarColor:  #fff;
    --printess-toolbarColorHover: #fff;
    --printess-toolbarBackgroundSelected: #000;
    --printess-toolbarBackground: #333; 
    --printess-toolbarBackgroundHover: #222;
    --printess-toolbarBorderColor:  Indigo; /* black */
     /*** PANEL COLORS ***/
    --printess-panelBackground: #15518e; //   hsl(214, 90%, 52%);  
    --printess-panelBackgroundSelected: #2a2a2a;
    --printess-panelAnchorMixed: #934a7c;
    --printess-panelBackgroundHover: #222;
    --printess-slider-rail: hsl(216, 85%, 68%);
    --printess-frameColor: #21b7ff;
    --printess-frameColorHover:  #1ca0df;
     
}
/* DESKTOP / TABLET STYLES */






  
*, *:before, *:after {
    box-sizing: border-box;
}
#printessMainGrid h1 {
  color: var(--printess-headlineColor);
}
#printessMainGrid h2 {
  color: red; 
}
#printessMainGrid {
    background: var(--printess-panelBackground); /* #727272;*/
    font-family: Lato, sans-serif; 
    font-size: var(--printess-textSize);
    overflow: hidden;
    margin: 0;
    padding: 0;
    color:  var(--printess-textColor); 
    opacity: 0; /* until loaded */
}
.printess-container-fullscreen {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: initial !important;
  height: initial !important;
  right: 0 !important;
  bottom: 0 !important;
}
#printessCopyPasteIndicator {
    background-color: black;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    opacity: 0.25;
}
#printess-clipboard-container {
    height: 16px;
    width: 50px;
    position: absolute;
   right: 100px;;
    top: 0
}
 
/*
 ************** MAIN LAYOUT GRID  *******************
 */
#printessMainGrid {
    transform: none;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*width: 100vw;
    height: 100vh;*/
   /* background-color: transparent;*/
    display: grid;
    grid-gap: 0;
    grid-template-rows: 0px 36px auto 100px;
    grid-template-columns: 1fr;
    grid-template-areas: 'doc-selector' 'toolbar' 'stage' 'properties';
}
#printessMainGrid.hide-controls {
    grid-template-areas: 'stage';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
}
#printessMainGrid.hide-controls > .doc-selector,
#printessMainGrid.hide-controls > .toolbar,
#printessMainGrid.hide-controls > .printess-resources,
#printessMainGrid.hide-controls > .printess-properties,
#printessMainGrid.hide-controls > .printess-buyer-pages,
#printessMainGrid.hide-controls > .printess-data-panel,
#printessMainGrid.hide-controls > .printess-footer,
#printessMainGrid.hide-controls > #resourcesSplitterBar,
#printessMainGrid.hide-controls > #propertiesSplitterBar
{
  display: none !important;
}
.printess-data-panel {
  border-top: 1px solid black;
  grid-area: data;
  height: inherit;
}
.printess-resources {
    grid-area: resources;
    display: none;
    height: 100%;
    background: var(--printess-panelBackground);
}
#propertiesSplitterBar {
    grid-area: propertiesSplitterBar;
}
#resourcesSplitterBar {
    grid-area: resourcesSplitterBar;
    display: none;
}
#printessMainGrid.admin > #resourcesSplitterBar {
    display: block;
}
#resourcesSplitterBar, #propertiesSplitterBar {
    background-color: black; /* loooks better in dark and light mode var(--printess-maxContrastColor); */
    cursor: ew-resize;
    position: relative;
    display: none;
}
#resourcesSplitterBar::after, #propertiesSplitterBar::after {
    content: "";
    position: absolute;
    background-color: transparent;
    width: 7px;
    left: -3px;
    top: 0;
    bottom: 0;
    cursor: ew-resize;
}
.printess-nav-bar {
    grid-row: 2;
    height: 100%;
    width: 100%;
    grid-area: toolbar;
}
.printess-doc-selector {
    grid-row: 1;
    grid-area: doc-selector;
    display: none;
}
.printess-stage {
    grid-area: stage;
    height: 100%;
    overflow: hidden;
    background: #4e4e50;
    position: relative;
}
.printess-stage  > .printess-content {
    width: 1200px;
    height: 1200px;
    position: relative;
    /* background: white;*/
}
.printess-properties {
    grid-area: properties;
    height: 100%;
    background: var(--printess-panelBackground);
    position: relative;
}
.printess-buyer-pages {
    grid-area: pages;
    height: 100%;
    display: none;
    background: var(--printess-panelBackground);
}
#printessMainGrid.buyer > .printess-buyer-pages {
    display: block;
}
.printess-footer {
    background-color: lightblue;
    grid-area: footer;
}














 /*
 ******** SAFARI WEB APP NOTIFICATION 
 */
 #webAppNotification {
  z-index: 99999;
  display: none;
  position: absolute;
  bottom: 30px;
  left: 5%;
  right: 5%;
  height: 80px;
  padding: 7px;
  border-radius: 3px;
  background-color: #f7f8ef; /* ED6BB8FF*/ 
  color:  black;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  box-shadow: 0px 5px 10px black;
} 
/* Triangle hack to make tooltip look like a speech bubble */
#webAppNotification:after {
  position: absolute;
  bottom: -20px;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 20px solid #f7f8ef;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
  
}
#webAppNotification > .closeAppNotification {
  position: absolute;
  cursor: pointer;
  left: 4px;
  top: 4px;
  text-decoration: underline; 
  color: darkblue;
}
#webAppNotification > .closeAppNotification:hover {
  color: red;
}
/*
 ************** CONTEXT MENU AND TOAST************
 */
/*
.printess-toastwrp {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    overflow: hidden;
    z-index: -999;
}
.printess-toast {
    position: absolute;
    border-radius: 3px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.43);
    color: rgba(255, 255, 255, 0.84);
    animation-name: printess-toast;
    animation-duration: 1s;
    animation-iteration-count: 1;
    transition-timing-function: cubic-bezier(0.27, 0.81, 0.86, 1.37);
}
@keyframes printess-toast {
    0% {
        top: 100vh;
    }
    30% {
        top: 90vh;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        top: 90vh;
    }
}*/
/* BASIC MENU */
.printess-ctx-menu, .printess-rev-ctx-menu, .printess-sub-menu {
    cursor: pointer;
    position: absolute;
    border-radius: 2px;
    width: 150px;
    height: 200px;
    background-color: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 4px #555;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    transition: 0.2s;
    font-family: Lato, sans-serif; 
}
.printess-ctx-menu-item {
    position: relative;
    display: grid;
    grid-template-columns: 24px 1fr 24px;
    grid-template-rows: 28px;
    list-style-type: none;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
  
}
.printess-ctx-menu-item-seperator {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--printess-textColorDisabled);
    margin-top: 3px;
    margin-bottom: 3px;
}
.printess-ctx-menu-item > .printess-ctx-menu-caption {
  color: #555555;
  white-space: nowrap;
  align-self: center;
  font-size: var(--printess-inputSize);
  padding-left: 10px;
}
.printess-ctx-menu-item > wc-icon {
   width: 16px;
   height: 16px; 
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item > wc-icon.arrow {
   width: 14px;
   height: 14px;
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item > .color {
   width: 16px;
   height: 16px;
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item.disabled > .printess-ctx-menu-caption{
    color: var(--printess-menuColorDisabled);
}
.printess-ctx-menu-item:hover {
    background-color: var(--printess-headlineColor);
}
.printess-ctx-menu-item:hover > .printess-ctx-menu-caption, .printess-ctx-menu-item:hover > wc-icon {
    color: #fff;
}
 .printess-ctx-menu-item.disabled:hover {
    background-color: transparent; 
    
}
 .printess-ctx-menu-item.disabled:hover > .printess-ctx-menu-caption{
     color: var(--printess-menuColorDisabled);
}
.printess-ctx-menu:hover, .printess-rev-ctx-menu:hover, .printess-sub-menu:hover {
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.05) inset, 0px 4px 8px #555;
}
.printess-ctx-menu ul {
    margin: 0;
    padding: 0;
    text-align: left;
}
.printess-ctx-menu {
    animation-name: printess-appear;
    z-index: var(--printess-z-index-context-menu);
}
.printess-rev-ctx-menu {
    animation-name: printess-revappear;
}
.printess-sub-menu {
    height: 175px;
    display: none;
    overflow: auto;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.05) inset, 0px 4px 8px #555;
}
.printess-sub-menu:hover {
    display: block;
}
.printess-red-line {
    position: absolute;
    height: 3px;
    width: 25px;
    top: 12px;
    left: 1px;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
    background-color: red;
}
@keyframes printess-appear { 
    0% {
        transform: scale(0.1) translateX(-100px);
    }
    100% {
        transform: scale(1) translateX(0px);
    }
}
@keyframes printess-revappear {
    0% {
        transform: scale(0.1) translateX(100px);
    }
    100% {
        transform: scale(1) translateX(0px);
    }
}
`;

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
const wcAppLayout = new WcAppLayout();
let appUser = 'user';
function setDisplay(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.style.display = value;
    }
}
(_a = document.getElementById("createAccountCtrl")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const email = (_d = document.getElementById("emailCtrl")) === null || _d === void 0 ? void 0 : _d.value;
    const pwd = (_e = document.getElementById("passwordCtrl")) === null || _e === void 0 ? void 0 : _e.value;
    yield signinUser(email, pwd);
}));
(_b = document.getElementById("google-signin")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield signinWithGoogle();
}));
firebase.auth().onAuthStateChanged(function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user) {
            user.email === 'trulli90@gmail.com' ? appUser = 'admin' : appUser = 'user';
            setDisplay("userAccount", "");
            setDisplay("loginPage", "none");
            const controlHost = document.getElementById('userAccount');
            controlHost === null || controlHost === void 0 ? void 0 : controlHost.append(wcAppLayout);
            const head = document.getElementsByTagName('head')[0];
            const s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            s.appendChild(document.createTextNode(masterStyles.toString()));
            head.appendChild(s);
        }
        else {
            setDisplay("loginPage", "");
        }
    });
});
const logoutFunc = () => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield firebase.auth().signOut();
        window.location.reload();
    }))();
};
(_c = document.getElementById("eye")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const eye = document.getElementById("eye");
    const input = document.getElementById("passwordCtrl");
    if (input.type === "password") {
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
        input.type = "text";
    }
    else {
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
        input.type = "password";
    }
});

export { appUser, logoutFunc };
