var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
    apiKey: "AIzaSyAggX7zwnqbVl56pZP4O7oH0QtPu9YMph0",
    authDomain: "printess-saas.firebaseapp.com",
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
    return __awaiter$6(this, void 0, void 0, function* () {
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
    return __awaiter$6(this, void 0, void 0, function* () {
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

var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createRequestInit(method, bodyContent, contentType, token) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": contentType
    };
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    const r = {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: headers,
        redirect: "error",
        referrerPolicy: "no-referrer",
        body: bodyContent
    };
    return r;
}
function postPlainText(url, json, token) {
    return __awaiter$5(this, void 0, void 0, function* () {
        const response = yield fetch(url, createRequestInit("POST", json, "text/plain", token));
        return response;
    });
}
function postJson(url, json, token) {
    return __awaiter$5(this, void 0, void 0, function* () {
        const response = yield fetch(url, createRequestInit("POST", json, "application/json", token));
        return response;
    });
}

var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ServerErrorResponse {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static Create(response) {
        return __awaiter$4(this, void 0, void 0, function* () {
            if (response.headers.get("Content-Type") === "application/json; charset=utf-8") {
                const json = yield response.json();
                if (typeof json.c === "number" && typeof json.m === "string") {
                    return new ServerErrorResponse(json.c, json.m);
                }
            }
            return new ServerErrorResponse(response.status, response.statusText);
        });
    }
}
class PrintessApi {
    constructor(urlPrefix, token) {
        this.urlPrefix = urlPrefix || "http://localhost:5000";
        this.token = token;
    }
    postPlainText(path, json) {
        return __awaiter$4(this, void 0, void 0, function* () {
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            const url = this.urlPrefix + path;
            return postPlainText(url, json, this.token);
        });
    }
    postJson(path, json) {
        return __awaiter$4(this, void 0, void 0, function* () {
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            const url = this.urlPrefix + path;
            return postJson(url, json, this.token);
        });
    }
    loginWithGoogleAuthToken(googleToken) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const response = yield this.postPlainText("/jwttokenlogin", googleToken);
            if (response.status === 200) {
                return yield response.json();
            }
            return yield ServerErrorResponse.Create(response);
        });
    }
    activate(userId, activationCode) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                userId: userId,
                activationCode: activationCode
            };
            const response = yield this.postJson("/printess/activate", JSON.stringify(model));
            if (response.status === 200) {
                return;
            }
            return yield ServerErrorResponse.Create(response);
        });
    }
    loadOrders(model) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const response = yield this.postJson("/orders/list", JSON.stringify(model));
            if (response.status === 200) {
                return yield response.json();
            }
            return yield ServerErrorResponse.Create(response);
        });
    }
    loadProductionJobs() {
        return __awaiter$4(this, void 0, void 0, function* () {
            const r = [];
            r.push({
                enqueuedOn: new Date(),
                processingOn: new Date(),
                finishedOn: new Date(),
                failedOn: new Date(),
                isFinalStatus: true,
                errorDetails: null,
                jobId: "my job id",
                productionType: "templateId",
                files: [
                    {
                        documentName: "my document",
                        fileSize: 2000,
                        downloadUrl: "https://www.example.com",
                        pages: 2
                    }
                ]
            });
            return r;
        });
    }
}
class PrintessAdminApi {
    constructor(urlPrefix, token) {
        this.urlPrefix = urlPrefix || "http://localhost:5000";
        this.token = token;
    }
    postJson(path, json) {
        return __awaiter$4(this, void 0, void 0, function* () {
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            const url = this.urlPrefix + path;
            const response = yield postJson(url, json, this.token);
            if (response.status === 200) {
                return yield response.json();
            }
            return yield ServerErrorResponse.Create(response);
        });
    }
    postJsonVoid(path, json) {
        return __awaiter$4(this, void 0, void 0, function* () {
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            const url = this.urlPrefix + path;
            const response = yield postJson(url, json, this.token);
            if (response.status === 200) {
                return;
            }
            return yield ServerErrorResponse.Create(response);
        });
    }
    loadUsers(search) {
        return __awaiter$4(this, void 0, void 0, function* () {
            return this.postJson("/admin/codes/load", JSON.stringify(search));
        });
    }
    activateUser(userId) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                userId: userId
            };
            return this.postJsonVoid("admin/user/activate", JSON.stringify(model));
        });
    }
    deactivateUser(userId) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                userId: userId
            };
            return this.postJsonVoid("admin/user/deactivate", JSON.stringify(model));
        });
    }
    setEmailVerified(userId) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                userId: userId
            };
            return this.postJsonVoid("admin/user/setemailverified", JSON.stringify(model));
        });
    }
    setEmailUnverified(userId) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                userId: userId
            };
            return this.postJsonVoid("admin/user/setemailunverified", JSON.stringify(model));
        });
    }
    loadWhitelist() {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {};
            return this.postJson("admin/whitelist/load", JSON.stringify(model));
        });
    }
    addWhitelistEntry(email) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                email: email
            };
            return this.postJsonVoid("admin/whitelist/add", JSON.stringify(model));
        });
    }
    removeWhitelistEntry(email) {
        return __awaiter$4(this, void 0, void 0, function* () {
            const model = {
                email: email
            };
            return this.postJsonVoid("admin/whitelist/remove", JSON.stringify(model));
        });
    }
}
class ApiStream {
    constructor(domain, stream, token, onMessage) {
        switch (stream) {
            case "orders":
                this.endpoint = "wss://" + domain + "/stream/orders";
                break;
        }
        this.closeConnection = false;
        this.timeout = 250;
        this.token = token;
        this.onMessage = onMessage;
        this.connect();
    }
    disconnect() {
        clearInterval(this.pingHandle);
        clearTimeout(this.timeoutHandle);
        this.closeConnection = true;
        this.socket.close();
    }
    tryReconnect() {
        clearInterval(this.pingHandle);
        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(() => this.connect(), this.timeout);
    }
    connect() {
        if (this.closeConnection === true) {
            return;
        }
        this.timeout = Math.min(this.timeout * 1.5, 10000);
        this.socket = new WebSocket(this.endpoint);
        this.socket.onerror = () => {
            this.tryReconnect();
        };
        this.socket.onclose = () => {
            this.tryReconnect();
        };
        this.socket.onopen = () => {
            const c = {
                c: adm.useAdminMode ? "adminAuth" : "auth",
                p: this.token
            };
            this.timeout = 250;
            clearInterval(this.pingHandle);
            this.pingHandle = window.setInterval(() => this.sendPing(), 25000);
            this.socket.send(JSON.stringify(c));
        };
        this.socket.onmessage = (ev) => {
            const c = JSON.parse(ev.data);
            switch (c.c) {
                case "ping":
                    this.sendPong();
                    break;
                case "pong":
                    break;
                case "auth":
                    break;
                default:
                    this.onMessage(c);
            }
        };
    }
    sendPing() {
        const c = {
            c: "ping",
            p: ""
        };
        this.socket.send(JSON.stringify(c));
    }
    sendPong() {
        const c = {
            c: "pong",
            p: ""
        };
        this.socket.send(JSON.stringify(c));
    }
}
class OrderStream extends ApiStream {
    constructor(domain, token, onMessage) {
        super(domain, "orders", token, (sc) => {
            if (sc.c == "order") {
                const dto = JSON.parse(sc.p);
                onMessage(dto);
            }
        });
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$3,i$4,s$5,e$4;const o$6=globalThis.trustedTypes,l$2=o$6?o$6.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$5=`lit$${(Math.random()+"").slice(9)}$`,h$2="?"+n$5,r$2=`<${h$2}>`,u$2=document,c$2=(t="")=>u$2.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$3=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c$2(),t),t,void 0,s);}return n.I(t),n},E=u$2.createTreeWalker(u$2,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m$1:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f$1,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m$1?u=f$1:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f$1?s+r$2:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$5+a):s+n$5+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$2?l$2.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$5)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$5),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$5),i=t.length-1;if(i>0){e.textContent=o$6?o$6.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c$2()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c$2());}}}else if(8===e.nodeType)if(e.data===h$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$5,t+1));)d.push({type:7,index:l}),t+=n$5.length-1;}l++;}}static createElement(t,i){const s=u$2.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u$2).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$3(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u$2.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c$2()),this.k(c$2()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}const Z={Z:"$lit$",U:n$5,Y:h$2,q:1,X:M,tt:k,it:a$3,st:S$1,et:C,ot:H,nt:L,rt:R,lt:I,ht:z};null===(i$4=(t$3=globalThis).litHtmlPlatformSupport)||void 0===i$4||i$4.call(t$3,N,C),(null!==(s$5=(e$4=globalThis).litHtmlVersions)&&void 0!==s$5?s$5:e$4.litHtmlVersions=[]).push("2.0.0-rc.2");

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol();class n$4{constructor(t,n){if(n!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t$2&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const s$4=t=>new n$4(t+"",e$3),o$5=new Map,r$1=(t,...s)=>{const r=s.reduce(((e,s,o)=>e+(t=>{if(t instanceof n$4)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[o+1]),t[0]);let i=o$5.get(r);return void 0===i&&o$5.set(r,i=new n$4(r,e$3)),i},i$3=(e,n)=>{t$2?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style");n.textContent=t.cssText,e.appendChild(n);}));},S=t$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return s$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3,e$2,h$1,r;const o$4={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$3=(t,i)=>i!==t&&(i==i||t==t),l$1={attribute:!0,type:String,converter:o$4,reflect:!1,hasChanged:n$3};class a$2 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$1}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i));}else void 0!==i&&s.push(S(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$3(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$1){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$4.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$4.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$3)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$2.finalized=!0,a$2.shadowRootOptions={mode:"open"},null===(e$2=(s$3=globalThis).reactiveElementPlatformSupport)||void 0===e$2||e$2.call(s$3,{ReactiveElement:a$2}),(null!==(h$1=(r=globalThis).reactiveElementVersions)&&void 0!==h$1?h$1:r.reactiveElementVersions=[]).push("1.0.0-rc.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var i$2,l,o$3,s$2,n$2,a$1;(null!==(i$2=(a$1=globalThis).litElementVersions)&&void 0!==i$2?i$2:a$1.litElementVersions=[]).push("3.0.0-rc.1");class h extends a$2{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h.finalized=!0,h._$litElement$=!0,null===(o$3=(l=globalThis).litElementHydrateSupport)||void 0===o$3||o$3.call(l,{LitElement:h}),null===(n$2=(s$2=globalThis).litElementPlatformSupport)||void 0===n$2||n$2.call(s$2,{LitElement:h});

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
const i$1=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$1(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$1(e,n)}

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
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=t=>(...i)=>({_$litDirective$:t,values:i});class s$1{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends s$1{constructor(i){if(super(i),this.vt=A,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A)return this.Vt=void 0,this.vt=r;if(r===w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=i(n);

var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
__decorate$i([
    e$1()
], WcIcon.prototype, "primaryColor", void 0);
__decorate$i([
    e$1()
], WcIcon.prototype, "icon", void 0);
WcIcon = __decorate$i([
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

const accountStyles = r$1 `
  .account-page {
    font-family: var(--printess-text-font);
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
  }

  .card {
    width: 80%;
    margin-top: 30px;
    margin-bottom: 70px;
  }

  wc-icon {
    padding: 5px 0 0 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .pink { border-bottom: 2px solid var(--printess-pink); }
  .green { border-bottom: 2px solid var(--printess-green); }
  .magenta { border-bottom: 2px solid #d20064; }
  .blue { border-bottom: 2px solid var(--printess-blue); }

  .table-header {
    padding-left: 20px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 0;
  }

  .title {
    font-size: 18px;
    font-weight: 400;
    line-height: 50px;
    margin: 0;
  }

  .pink .table-header { background-color: var(--printess-pink); }
  .green .table-header { background-color: var(--printess-green); }
  .magenta .table-header { background-color: #d20064; }
  .blue .table-header { background-color: var(--printess-blue); }

  dl {
    display: grid;
    margin-top: 0;
    margin-bottom: 0;
    grid-template-columns: 120px calc(100% - 120px);
  }

  dt, dd {
    display: flex;
    line-height: 25px;
    margin-left: 0;
    text-align: left;
    padding: 10px 20px;
  }

  dd {
    display: flex;
    justify-content: space-between;
  }

  .token {
    width: 70%;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pink dt:nth-of-type(even), .pink dd:nth-of-type(even) {
    background-color: var(--printess-lightpink);
  }
  .green dt:nth-of-type(even), .green dd:nth-of-type(even) {
    background-color: var(--printess-lightgreen);
  }
  .blue dt:nth-of-type(even), .blue dd:nth-of-type(even) {
    background-color: var(--printess-lightblue);
  }

  input.readonly {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
  }

  button {
    padding: 2px 7px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }

  .settings {
    padding: 7px 20px;
    margin: 20px 15px;
  }

  .pink button { background-color: var(--printess-pink); }
  .green button { background-color: var(--printess-green); }
  .magenta button { background-color: #d20064; }
  .blue button { background-color: var(--printess-blue); }

  .pink .hide-token {
    background-color: var(--printess-pink);
    border: 1px solid var(--printess-pink);
    color: var(--printess-pink);
  }
  .green .hide-token {
    background-color: var(--printess-lightgreen);
    border: 1px solid var(--printess-green);
    color: var(--printess-green);
  }
  .magenta .hide-token {
    background-color: var(--printess-lightmagenta);
    border: 1px solid var(--printess-magenta);
    color: var(--printess-magenta);
  }
  .blue .hide-token {
    background-color: var(--printess-lightblue);
    border: 1px solid var(--printess-blue);
    color: var(--printess-blue);
  }
  
  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }

    .card {
      width: 100%;
      margin-bottom: 50px;
    }

    .table-header {
      padding-left: 10px;
    }

    .title {
      font-size: 14px;
      line-height: 36px;
      margin: 0;
    }

    dl {
      grid-template-columns: 80px calc(100% - 80px);
    }

    dd, dt {
      font-size: 12px;
      word-break: break-word;
      line-height: 16px;
      padding: 10px;
    }

    .table-body p {
      font-size: 12px;
      padding: 0 10px;
    }

    .settings {
      font-size: 12px;
    }
  }
`;

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
    background-color: #fefefe;
    margin: auto;
    width: 50vmin;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2), 0px 4px 20px rgba(0,0,0,0.2);
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .modal {
      padding-top: 45px;
    }

    .modal-wrapper {
      width: 70vmin;
    }
  }

  .pink { border-bottom: 2px solid #e35fbc; }
  .green { border-bottom: 2px solid var(--printess-green); }
  .magenta { border-bottom: 2px solid var(--printess-magenta); }
  .blue { border-bottom: 2px solid var(--printess-blue); }

  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 20px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 0;
  }

  .modal-title {
    line-height: 50px;
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }

  wc-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 15px 20px;
  }

  .pink .modal-header { background-color: #e35fbc; }
  .green .modal-header { background-color: var(--printess-green); }
  .magenta .modal-header { background-color: var(--printess-magenta); }
  .blue .modal-header { background-color: var(--printess-blue); }

  .modal-content {
    padding: 20px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    min-height: 160px;
  }

  label {
    font-size: 14px;
    padding-left: 2px;
  }

  input {
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    margin-top: 7px;
    border: 1px solid rgb(118, 118, 118);
  }

  input:hover {
    background-color: var(--printess-lightpink);
    border: 1px solid rgb(118, 118, 118);
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

  .pink .submit { background-color: #e35fbc; }
  .green .submit { background-color: var(--printess-green); }
  .magenta .submit { background-color: var(--printess-magenta); }
  .blue .submit { background-color: var(--printess-blue); }

  .pink .submit:hover {
    background-color: #e447b6;
  }
`;

var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
WcBackdrop = __decorate$h([
    n$1("wc-backdrop")
], WcBackdrop);

const pinnedUserStyles = r$1 `
  .pinned-user {
    display: grid;
    margin-top: 0;
    margin-bottom: 0;
    grid-template-columns: 250px calc(100% - 250px);
  }

  .pinned-user.lightgreen {
    background-color: var(--printess-lightgreen);
  }

  wc-icon {
    padding: 5px 0 0 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .pinned-user-name, .pinned-user-email {
    display: flex;
    font-size: 16px;
    line-height: 25px;
    margin-left: 0;
    font-weight: 400;
    text-align: left;
    padding: 10px 20px;
  }

  .pinned-user-email {
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 2px 7px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }

  .pink button { background-color: var(--printess-pink); }
  .green button { background-color: var(--printess-green); }
  .magenta button { background-color: var(--printess-magenta); }
  .blue button { background-color: var(--printess-blue); }

  .button-span {
    display: flex;
    flex-direction: row;
  }

  .user-name {
    padding-left: 10px;
  }
`;

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcPinnedUser = class WcPinnedUser extends h {
    constructor(name, email, idx) {
        super();
        this.name = '';
        this.email = '';
        this.name = name;
        this.email = email;
        this.idx = idx;
    }
    static get styles() {
        return [pinnedUserStyles];
    }
    ;
    ;
    render() {
        return T `
      <div class="pinned-user green ${this.idx % 2 === 0 ? '' : 'lightgreen'}">
        <div class="pinned-user-name">
          <wc-icon icon="user-solid"></wc-icon>
          <span name="user-name" class="user-name">${this.name}</span>
        </div>
        <div class="pinned-user-email">
          <span name="user-email" class="user-email">${this.email}</span>
          <span class="button-span">
            <button @click=${this.adjustUserRights} style="margin-right: 10px;">user rights</button>
            <button @click=${this.removeUser}>remove user</button>
          </span>
        </div>
      </div>
    `;
    }
    ;
    adjustUserRights(e) {
        console.log(e.target.parentNode.parentNode.querySelector('span.user-email').textContent);
    }
    ;
    removeUser(e) {
        this.remove();
    }
    ;
};
__decorate$g([
    e$1({ type: String })
], WcPinnedUser.prototype, "name", void 0);
__decorate$g([
    e$1({ type: String })
], WcPinnedUser.prototype, "email", void 0);
__decorate$g([
    e$1({ type: Number })
], WcPinnedUser.prototype, "idx", void 0);
WcPinnedUser = __decorate$g([
    n$1("wc-pinned-user")
], WcPinnedUser);

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcDialogPinUser = class WcDialogPinUser extends h {
    constructor() {
        super();
        this.errorMsg = '';
        this.backdrop = new WcBackdrop();
    }
    ;
    showDialog(callback) {
        this.callback = callback;
        document.body.appendChild(this.backdrop);
        document.body.appendChild(this);
    }
    ;
    closeDialog() {
        document.body.removeChild(this.backdrop);
        document.body.removeChild(this);
    }
    ;
    static get styles() {
        return [dialogStyles];
    }
    ;
    render() {
        return T `
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Add User</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${() => this.closeDialog()}></wc-icon>
          </div>
      
          <div class="modal-content">
            <div>
              <label for="name" style="display: flex;">Pin a user: &nbsp;<span style="color: red; display: ${this.errorMsg ? 'block' : 'none'}"> ${this.errorMsg}</span></label>
              <input type="text" id="name" name="name" placeholder="user name">
              <input type="email" id="email" name="email" placeholder="e-mail address" required>
              <button @click=${this.addUser} class="submit">Add User</button>
            </div>
          </div>
        </div>
      
      </div>
    `;
    }
    ;
    addUser(e) {
        const name = e.target.parentNode.querySelector('#name').value;
        const email = e.target.parentNode.querySelector('#email').value;
        if (!name && email.indexOf('@') === -1) {
            this.errorMsg = 'to pin a user fill in name and email address';
            return;
        }
        if (!name) {
            this.errorMsg = 'name missing';
            return;
        }
        if (email.indexOf('@') === -1) {
            this.errorMsg = 'no valid email address';
            return;
        }
        this.errorMsg = '';
        if (this.callback) {
            this.callback(name, email);
        }
        this.closeDialog();
    }
    ;
};
__decorate$f([
    e$1({ type: String })
], WcDialogPinUser.prototype, "errorMsg", void 0);
WcDialogPinUser = __decorate$f([
    n$1("wc-dialog-pin-user")
], WcDialogPinUser);

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcAccountPage = class WcAccountPage extends h {
    constructor() {
        super(...arguments);
        this.pinnedUsers = [{
                name: 'Christoph Clermont',
                email: 'cc@printess.com'
            }];
        this.currentUser = currentUser;
    }
    static get styles() {
        return [accountStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    render() {
        return T `
            <div class="account-page"> 
                <h3 class="topic">Profile</h3>
            
                <div class="card green">
                    <div class="table-header">
                        <h3 class="title">Personal Information</h3>
                    </div>
                    <div class="table-body">
                        <dl>
                            <dt>Name:</dt>
                            <dd>${this.currentUser.displayName}</dd>
                            <dt>Email:</dt>
                            <dd>${this.currentUser.eMailAddress}</dd>
                            <!-- <dt>Password:</dt>
                            <dd>********</dd> -->
                            <dt>Last Login:</dt>
                            <dd>${this.currentUser.lastLogin}</dd>
                        </dl>
                        <!-- <button class="settings">Edit Settings</button> -->
                    </div>
                </div>
            
                <h3 class="topic">Danger Zone</h3>
                <p class="subtopic">Irreversible and destructive actions</p>
            
                <div class="card magenta">
                    <div class="table-header">
                        <h3 class="title">Delete Account</h3>
                    </div>
                    <div class="table-body">
                        <p style="padding-left: 20px;">Once you delete this account, there is no going back. All your content will
                            be deleted.</p>
                        <button class="settings">Delete Account</button>
                    </div>
                </div>
            </div>
        `;
    }
    ;
    addUser(e) {
        const td = new WcDialogPinUser();
        td.showDialog((name, email) => {
            this.pinnedUsers = [...this.pinnedUsers, { name, email }];
        });
    }
    ;
};
__decorate$e([
    e$1({ type: Array })
], WcAccountPage.prototype, "pinnedUsers", void 0);
WcAccountPage = __decorate$e([
    n$1("wc-account-page")
], WcAccountPage);

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

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getData(api) {
    return __awaiter$3(this, void 0, void 0, function* () {
        const response = yield fetch(api);
        const data = yield response.json();
        return data;
    });
}

const templateStyles = r$1 `
  .template-item {    
    width: 270px;
    display: flex;
    border-radius: 5px;
    padding: 20px;
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .pink  { background-color: var(--printess-lightpink); }
  .green  { background-color: var(--printess-lightgreen); }
  .blue  { background-color: var(--printess-lightblue); }
  .magenta  { background-color: var(--printess-lightmagenta); }

  .template-img {
    display: flex;
    width: 100px;
    padding-right:20px;
    justify-content: center;
    align-items: center;
  }

  img {
    border-radius: 5px;
    width: 100px;
    height: 80px;
    object-fit: cover;
  }

  .template-txt {
    justify-content: center;
    margin: auto;
    width: 180px;
  }

  .template-title {
    margin-top: 0;
  }

  .template-info {
    margin-bottom: 0;
    font-size: 12px;
    line-height: 20px;
  }
`;

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcTemplatePreview = class WcTemplatePreview extends h {
    constructor(template, color) {
        super();
        this.color = '';
        this.color = color;
        this.template = template;
    }
    static get styles() {
        return [templateStyles];
    }
    ;
    render() {
        var _a, _b, _c, _d;
        return T `
            <div class="template-item ${this.color}">
                <div class="template-img">
                    <img src=${this.template && this.template.imageSource} alt=${(_a = this.template) === null || _a === void 0 ? void 0 : _a.templateName}>
                </div>
                <div class="template-txt">
                    <p class="template-title">${(_b = this.template) === null || _b === void 0 ? void 0 : _b.templateName}</p>
                    <p class="template-info">
                        <span>created: ${(_c = this.template) === null || _c === void 0 ? void 0 : _c.dateCreated}</span><br>
                        <span>last modified: ${(_d = this.template) === null || _d === void 0 ? void 0 : _d.dateModified}</span>
                    </p>
                </div>
            </div>
        `;
    }
    ;
};
__decorate$d([
    e$1({ attribute: true, type: Object })
], WcTemplatePreview.prototype, "template", void 0);
__decorate$d([
    e$1({ attribute: true, type: String })
], WcTemplatePreview.prototype, "color", void 0);
WcTemplatePreview = __decorate$d([
    n$1("wc-template-preview")
], WcTemplatePreview);

const templatesPageStyles = r$1 `
  .template-page {
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
  }

  .template-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    grid-gap: 20px;
    margin-top: 30px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }
  }
`;

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcTemplatesPage = class WcTemplatesPage extends h {
    static get styles() {
        return [templatesPageStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        getData('../../mockup/templates.json')
            .then(data => this.templates = data.templates);
    }
    renderTemplates() {
        if (this.templates) {
            return T `${this.templates.map((template, idx) => new WcTemplatePreview(template, ['green', 'pink', 'blue',
                'magenta'][idx % 4]))}`;
        }
        else {
            return T `<p>Templates loading ...</p>`;
        }
    }
    ;
    render() {
        return T `
            <div class="template-page">
                <h3 class="topic">User Templates</h3>
                <p class="subtopic">Templates list</p>
                <div class="template-wrapper">
                    ${this.renderTemplates()}
                </div>
            </div>
        `;
    }
    ;
};
__decorate$c([
    e$1({ type: Array })
], WcTemplatesPage.prototype, "templates", void 0);
WcTemplatesPage = __decorate$c([
    n$1("wc-templates-page")
], WcTemplatesPage);

class SearchOrders extends NobsBase {
    constructor(nobs_or_dto_or_templateName, source) {
        var _a, _b, _c, _d;
        super(nobs_or_dto_or_templateName, source);
        if (!(nobs_or_dto_or_templateName instanceof Nobs) && !(source instanceof SearchOrders)) {
            if (typeof nobs_or_dto_or_templateName === "string") {
                this.templateName = nobs_or_dto_or_templateName;
                this.origin = "";
                this.productType = "";
                this.externalOrderId = "";
            }
            else {
                const model = nobs_or_dto_or_templateName;
                this.templateName = (_a = model.templateName) !== null && _a !== void 0 ? _a : "";
                this.templateNameOperator = model.templateNameOperator;
                this.origin = (_b = model.origin) !== null && _b !== void 0 ? _b : "";
                this.productType = (_c = model.productType) !== null && _c !== void 0 ? _c : "";
                this.externalOrderId = (_d = model.externalOrderId) !== null && _d !== void 0 ? _d : "";
                this.startDate = model.startDate;
                this.endDate = model.endDate;
                this.isFinished = model.isFinished;
                this.isImposed = model.isImposed;
                this.take = model.take;
                this.skip = model.skip;
            }
        }
    }
    toDto() {
        return {
            templateName: this.templateName,
            templateNameOperator: this.templateNameOperator,
            origin: this.origin,
            productType: this.productType,
            externalOrderId: this.externalOrderId,
            startDate: this.startDate,
            endDate: this.endDate,
            isFinished: this.isFinished,
            isImposed: this.isImposed,
            isFailed: this.isFailed,
            take: this.take,
            skip: this.skip,
            payload: adm.useAdminMode ? "skipUserIdCheck" : ""
        };
    }
}

const printjobsStyles = r$1 `
  .user-orders {
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
    color: #555555;
  }

  .filter-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }

  .setting-buttons {
    display: flex;
    flex-direction: row;
  }

  .inline {
    display: flex;
    align-items: center;
  }

  .template-name-label {
    font-size: 16px;
  }

  .table-settings {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    height: 35px;
    margin-right: 10px;
    cursor: pointer;
    border: 1px solid #ADADAD;
    outline: none;
    border-radius: 4px;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .table-settings:hover {
    background-color: #e2e2e2;
  }

  .input-label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 200px;
  }

  label {
    font-size: 12px;
    font-weight: 400;
    color: #555555;
  }

  input {
    padding: 10px 20px;
    background-color: #f8f8f8;
    border-radius: 4px;
    border: none;
    outline: none;
    margin: 10px 10px 0 0;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--printess-text-font);
    height: 40px;
    width: 200px;
    color:  #555555;
  }

  .expanded-filter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  select {
    padding: 10px 20px;
    margin: 10px 10px 0 0;
    height: 40px;
    width: 200px;
    font-family: var(--printess-text-font);
    font-size: 14px;
    font-weight: 400;
    background-color: #f8f8f8;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #555555;
  }

  wc-icon {
    width: 25px;
    height: 25px;
  }

  .table-container {
    margin-top: 10px;
  }

  .hidden {
    display: none;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }

    .filter-wrapper {
      margin-top: 20px;
    }

    .setting-buttons {
      margin-bottom: 10px;
    }

    .table-settings {
      font-size: 12px;
      padding: 7px 10px;
      height: 30px;
      margin-right: 5px;
    }

    .inline {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      margin-top: 20px;
    }

    .template-name-label {
      font-size: 12px;
    }
    
    input {
      padding: 0 15px;
      font-size: 12px;
      height: 30px;
    }

    label {
      font-size: 12px;
    }

    wc-icon {
      width: 15px;
      height: 15px;
    }

    .inline wc-icon {
      width: 20px;
      height: 20px;
    }
  }
`;

class ValueDebounce {
    constructor(callback) {
        this.timeout = 1000;
        this.callback = callback;
    }
    change(value, timeout = 1000) {
        this.value = value;
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(() => {
            this.callback(this.value);
        }, timeout);
    }
    immediate(value) {
        this.value = value;
        this.callback(value);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {et:t}=Z,e=()=>document.createComment(""),u$1=(o,i,n)=>{var v;const l=o.A.parentNode,r=void 0===i?o.B:i.A;if(void 0===n){const i=l.insertBefore(e(),r),v=l.insertBefore(e(),r);n=new t(i,v,o,o.options);}else {const t=n.B.nextSibling,i=n.M!==o;if(i&&(null===(v=n.Q)||void 0===v||v.call(n,o),n.M=o),t!==r||i){let o=n.A;for(;o!==t;){const t=o.nextSibling;l.insertBefore(o,r),o=t;}}}return n},c$1=(o,t,i=o)=>(o.I(t,i),o),s={},f=(o,t=s)=>o.H=t,a=o=>o.H,m=o=>{var t;null===(t=o.P)||void 0===t||t.call(o,!1,!0);let i=o.A;const n=o.B.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=i(class extends s$1{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}Mt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.Mt(e,s,t).values}update(s,[t,r,c]){var d;const p=a(s),{values:v,keys:a$1}=this.Mt(t,r,c);if(!p)return this.Pt=a$1,v;const h=null!==(d=this.Pt)&&void 0!==d?d:this.Pt=[],m$1=[];let x,y,j=0,k=p.length-1,w$1=0,b=v.length-1;for(;j<=k&&w$1<=b;)if(null===p[j])j++;else if(null===p[k])k--;else if(h[j]===a$1[w$1])m$1[w$1]=c$1(p[j],v[w$1]),j++,w$1++;else if(h[k]===a$1[b])m$1[b]=c$1(p[k],v[b]),k--,b--;else if(h[j]===a$1[b])m$1[b]=c$1(p[j],v[b]),u$1(s,m$1[b+1],p[j]),j++,b--;else if(h[k]===a$1[w$1])m$1[w$1]=c$1(p[k],v[w$1]),u$1(s,p[j],p[k]),k--,w$1++;else if(void 0===x&&(x=u(a$1,w$1,b),y=u(h,j,k)),x.has(h[j]))if(x.has(h[k])){const e=y.get(a$1[w$1]),t=void 0!==e?p[e]:null;if(null===t){const e=u$1(s,p[j]);c$1(e,v[w$1]),m$1[w$1]=e;}else m$1[w$1]=c$1(t,v[w$1]),u$1(s,p[j],t),p[e]=null;w$1++;}else m(p[k]),k--;else m(p[j]),j++;for(;w$1<=b;){const e=u$1(s,m$1[b+1]);c$1(e,v[w$1]),m$1[w$1++]=e;}for(;j<=k;){const e=p[j++];null!==e&&m(e);}return this.Pt=a$1,f(s,m$1),w}});

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */

function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */

function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */

function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */

function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */

function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * var result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */

function isLastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  return endOfDay(date).getTime() === endOfMonth(date).getTime();
}

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */

function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  var result; // Check for the difference of less than month

  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      // This will check if the date is end of Feb and assign a higher end of month date
      // to compare it with Jan
      dateLeft.setDate(30);
    }

    dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign; // Check for cases of one full calendar month

    if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }

    result = sign * (difference - Number(isLastMonthNotFull));
  } // Prevent negative zero


  return result === 0 ? 0 : result;
}

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */

function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
function formatDistance$1(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
}

function buildFormatLongFn(args) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.

};
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
}

var localize = {
  ordinalNumber: ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};

function buildMatchPatternFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var matchResult = string.match(args.matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);

    if (!parseResult) {
      return null;
    }

    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

function buildMatchFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var value;

    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
      value = findIndex(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    } else {
      value = findKey(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    }

    value = args.valueCallback ? args.valueCallback(value) : value;
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
}

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */

var locale = {
  code: 'en-US',
  formatDistance: formatDistance$1,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }

  dirtyObject = dirtyObject || {};

  for (var property in dirtyObject) {
    if (dirtyObject.hasOwnProperty(property)) {
      target[property] = dirtyObject[property];
    }
  }

  return target;
}

function cloneObject(dirtyObject) {
  return assign({}, dirtyObject);
}

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWords ` to `formatDistance`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 * - The order of arguments is swapped to make the function
 *   consistent with `differenceIn...` functions.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWords(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 11, 32, 0),
 *     { addSuffix: true }
 *   ) //=> 'in about 1 hour'
 *
 *   // v2.0.0 onward
 *
 *   formatDistance(
 *     new Date(1986, 3, 4, 11, 32, 0),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { addSuffix: true }
 *   ) //=> 'in about 1 hour'
 *   ```
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */

function formatDistance(dirtyDate, dirtyBaseDate) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  requiredArgs(2, arguments);
  var locale$1 = options.locale || locale;

  if (!locale$1.formatDistance) {
    throw new RangeError('locale must contain formatDistance property');
  }

  var comparison = compareAsc(dirtyDate, dirtyBaseDate);

  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }

  var localizeOptions = cloneObject(options);
  localizeOptions.addSuffix = Boolean(options.addSuffix);
  localizeOptions.comparison = comparison;
  var dateLeft;
  var dateRight;

  if (comparison > 0) {
    dateLeft = toDate(dirtyBaseDate);
    dateRight = toDate(dirtyDate);
  } else {
    dateLeft = toDate(dirtyDate);
    dateRight = toDate(dirtyBaseDate);
  }

  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1000;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months; // 0 up to 2 mins

  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return locale$1.formatDistance('lessThanXSeconds', 5, localizeOptions);
      } else if (seconds < 10) {
        return locale$1.formatDistance('lessThanXSeconds', 10, localizeOptions);
      } else if (seconds < 20) {
        return locale$1.formatDistance('lessThanXSeconds', 20, localizeOptions);
      } else if (seconds < 40) {
        return locale$1.formatDistance('halfAMinute', null, localizeOptions);
      } else if (seconds < 60) {
        return locale$1.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale$1.formatDistance('xMinutes', 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale$1.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale$1.formatDistance('xMinutes', minutes, localizeOptions);
      }
    } // 2 mins up to 0.75 hrs

  } else if (minutes < 45) {
    return locale$1.formatDistance('xMinutes', minutes, localizeOptions); // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale$1.formatDistance('aboutXHours', 1, localizeOptions); // 1.5 hrs up to 24 hrs
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale$1.formatDistance('aboutXHours', hours, localizeOptions); // 1 day up to 1.75 days
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale$1.formatDistance('xDays', 1, localizeOptions); // 1.75 days up to 30 days
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale$1.formatDistance('xDays', days, localizeOptions); // 1 month up to 2 months
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale$1.formatDistance('aboutXMonths', months, localizeOptions);
  }

  months = differenceInMonths(dateRight, dateLeft); // 2 months up to 12 months

  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale$1.formatDistance('xMonths', nearestMonth, localizeOptions); // 1 year up to max Date
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12); // N years up to 1 years 3 months

    if (monthsSinceStartOfYear < 3) {
      return locale$1.formatDistance('aboutXYears', years, localizeOptions); // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale$1.formatDistance('overXYears', years, localizeOptions); // N years 9 months up to N year 12 months
    } else {
      return locale$1.formatDistance('almostXYears', years + 1, localizeOptions);
    }
  }
}

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */

function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

const tableStyles$1 = r$1 `
  .table-wrapper {
    overflow: auto;
    border-bottom: 2px solid #d0049b;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    font-family: var(--printess-text-font);
  }
  
  table {
    margin-top:0;
    position: relative;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
  }

  td, th {
    padding: 7px 20px;
    line-height: 25px;
    white-space: nowrap;
    color: #555555;
  }

  tr:nth-child(odd){
    background-color:rgba(208, 4, 155, 0.04);
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #d0049b;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    position: sticky;
    top:0;
  }

  td a {
    text-decoration: none;
    color: #d3277c;
  }

  wc-icon {
    width: 25px;
    height: 25px;
  }

  .flex {
    display: flex;
  }

  .hide {
    display: none;
  }

  .loader {
    position: fixed;
    left: 50%;
    top: 50%;
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--printess-magenta);
    border-color: var(--printess-magenta) transparent var(--printess-magenta) transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner,
  .spinner:after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
  }
  .spinner {
    font-size: 8px;
    position: relative;
    border-top: 0.5em solid rgba(230,0,126, 0.2);
    border-right: 0.5em solid rgba(230,0,126, 0.2);
    border-bottom: 0.5em solid rgba(230,0,126, 0.2);
    border-left: 0.5em solid #e6007e;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`;

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcDialogErrorMessage = class WcDialogErrorMessage extends h {
    constructor(errorMsg) {
        super();
        this.backdrop = new WcBackdrop();
        this.errorMsg = errorMsg;
    }
    static get styles() {
        return [dialogStyles, r$1 `
      .modal-wrapper {
        width: 70vmin;
      }
    `];
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
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Failure Details</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${() => this.closeDialog()}></wc-icon>
          </div>

          <div class="modal-content">
            <p style="word-break: break-word;">${this.errorMsg}</p>
            <button @click=${this.closeDialog} class="submit">Close</button>
          </div>
        </div>
      </div>
    `;
    }
    ;
};
__decorate$b([
    e$1({ attribute: false, type: String })
], WcDialogErrorMessage.prototype, "errorMsg", void 0);
WcDialogErrorMessage = __decorate$b([
    n$1("wc-dialog-error-message")
], WcDialogErrorMessage);

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const columns = [{
        name: 'id',
        title: 'ID'
    }, {
        name: 'jobId',
        title: 'Job ID'
    }, {
        name: 'userInfo',
        title: 'User Info'
    }, {
        name: 'userId',
        title: 'User ID'
    }, {
        name: 'sourceUserId',
        title: 'Source User ID'
    }, {
        name: 'externalOrderId',
        title: 'External Order ID'
    }, {
        name: 'templateName',
        title: 'Template Name'
    }, {
        name: 'origin',
        title: 'Origin'
    }, {
        name: 'shopSaveId',
        title: 'Shop Save ID'
    }, {
        name: 'productType',
        title: 'Product Type'
    }, {
        name: 'createdOn',
        title: 'Created'
    }, {
        name: 'finishedOn',
        title: 'Finished'
    }, {
        name: 'isFinished',
        title: 'Status'
    }, {
        name: 'failureDetails',
        title: 'Failure Details'
    }, {
        name: 'result',
        title: 'Pdf File'
    }, {
        name: 'document',
        title: 'Documents'
    }, {
        name: 'pages',
        title: 'Pages'
    }, {
        name: 'size',
        title: 'Size'
    }, {
        name: 'loadableTemplateName',
        title: 'Loadable Template Name'
    }];
let WcPrintjobsTable = class WcPrintjobsTable extends h {
    constructor(data, headers) {
        super();
        this.data = data;
        this.headers = headers;
        const localSettings = localStorage.getItem('tableSettings');
        localSettings ? this.headers = JSON.parse(localSettings) : this.headers;
    }
    static get styles() {
        return [tableStyles$1];
    }
    ;
    ;
    showError(error) {
        console.log('error msg: ', error.message, 'error code: ', error.code);
    }
    ;
    getUserInfo(item) {
        let r = "";
        if (this.data.users) {
            const main = this.data.users.filter(u => u.id === item.userId)[0];
            if (main) {
                r += main.d + " (" + main.e + ")";
            }
            if (item.sourceUserId) {
                const source = this.data.users.filter(u => u.id === item.sourceUserId)[0];
                if (source) {
                    r += ", issued by " + source.d + " (" + source.e + ")";
                }
            }
        }
        return r;
    }
    render() {
        return T `    
    ${!this.data ? T `<div class="loader"></div>` : T `
    <div class="table-wrapper">
      <table class="layout display responsive-table">
        <thead>
          <tr>
            ${c(columns, item => item.name, item => T `
              <th class=${this.headers.includes(`${item.title}`) ? '' : 'hide'}>${item.title}</th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${this.data && c(this.data.orders, item => item.id, item => {
            var _a, _b;
            const userInfo = this.getUserInfo(item);
            return T `
            <tr>
              <td class='orders-id ${this.headers.includes('ID') ? '' : 'hide'}'>${item.id}</td>
              <td class=${this.headers.includes('Job ID') ? '' : 'hide'}>${item.jobId}</td>
              <td class=${this.headers.includes('User Info') ? '' : 'hide'}>${userInfo}</td>
              <td class=${this.headers.includes('User ID') ? '' : 'hide'}>${item.userId}</td>
              <td class=${this.headers.includes('Source User ID') ? '' : 'hide'}>${item.sourceUserId}</td>
              <td class=${this.headers.includes('External Order ID') ? '' : 'hide'}>${item.externalOrderId}</td>
              <td class=${this.headers.includes('Template Name') ? '' : 'hide'}><a href="https://editor.printess.com/?name=${encodeURIComponent(item.loadableTemplateName)}${currentUser.id === item.userId ? "" : "&userId=" + item.userId}" target="_blank" style="display:flex;flex-direction:row;" title=${userInfo}><wc-icon primaryColor="pink" icon="printess-wand"></wc-icon> &nbsp ${item.templateName}</a></td>
              <td class=${this.headers.includes('Origin') ? '' : 'hide'}>${item.origin}</td>
              <td class=${this.headers.includes('Shop Save ID') ? '' : 'hide'}>${item.shopSaveId}</td>
              <td class=${this.headers.includes('Product Type') ? '' : 'hide'}>${item.productType}</td>
              <td class=${this.headers.includes('Created') ? '' : 'hide'}>${formatDistance(subDays(new Date(item.createdOn), 0), new Date(), { addSuffix: true })}</td>
              <td class=${this.headers.includes('Finished') ? '' : 'hide'}>${item.isFinished ? formatDistance(subDays(new Date(item.finishedOn ? item.finishedOn : 0), 0), new Date(), { addSuffix: true }) : ''}</td>
              <td class=${this.headers.includes('Status') ? '' : 'hide'}>${this.statusValue(item.isFinished, item.isFailure, item.failureDetails, item.jobId, item.createdOn)}</td>
              <td class=${this.headers.includes('Failure Details') ? '' : 'hide'}>${item.failureDetails}</td>
              <td class=${this.headers.includes('Pdf File') ? 'flex' : 'hide'}>${this.pdfValue((_a = item.result) === null || _a === void 0 ? void 0 : _a.r, (_b = item.result) === null || _b === void 0 ? void 0 : _b.zip)}</td>
              <td class=${this.headers.includes('Documents') ? '' : 'hide'}>${item.documents}</td>
              <td class=${this.headers.includes('Pages') ? '' : 'hide'}>${item.pages}</td>
              <td class=${this.headers.includes('Size') ? '' : 'hide'}>${item.size ? T `${(item.size / 1000000).toFixed(2)} MB` : '0 MB'}</td>
              <td class=${this.headers.includes('Loadable Template Name') ? '' : 'hide'}><a href="https://editor.printess.com/?name=${item.loadableTemplateName}" target="_blank" title=${userInfo}>${item.loadableTemplateName}</a></td>
            </tr>
          `;
        })}
          </tbody>
      </table>
    </div>
    `}`;
    }
    ;
    showErrorMsg(message) {
        const td = new WcDialogErrorMessage(message);
        td.showDialog();
    }
    ;
    statusValue(isFinished, isFailure, failureDetails, jobId, createdOn) {
        if (isFinished && !isFailure) {
            return T `<wc-icon primaryColor="lightgreen" icon="check"></wc-icon>`;
        }
        else if (!isFinished) {
            return T `<div class="spinner"></div>`;
        }
        else {
            return T `<wc-icon primaryColor="pink" icon="warning" @click=${() => this.showErrorMsg(failureDetails)} style="cursor: pointer;"></wc-icon>`;
        }
    }
    ;
    pdfValue(fileUrl, zipUrl) {
        if (fileUrl) {
            return T `${Object.keys(fileUrl).map((url) => T `
        <a href=${fileUrl[url]} style="display: inline-block" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse" style="margin-right: 10px;"></wc-icon>
        </a>`)}`;
        }
        else if (zipUrl) {
            return T `
        <a href="${zipUrl}" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse"></wc-icon>
        </a>`;
        }
        else {
            return T `<wc-icon primaryColor="gray" icon="page-light"></wc-icon>`;
        }
    }
};
__decorate$a([
    e$1({ attribute: false, type: Object })
], WcPrintjobsTable.prototype, "data", void 0);
__decorate$a([
    e$1({ attribute: false, type: Array })
], WcPrintjobsTable.prototype, "headers", void 0);
__decorate$a([
    e$1({ attribute: false, type: String })
], WcPrintjobsTable.prototype, "errorMsg", void 0);
__decorate$a([
    e$1({ attribute: false, type: Object })
], WcPrintjobsTable.prototype, "productionStatus", void 0);
WcPrintjobsTable = __decorate$a([
    n$1("wc-printjobs-table")
], WcPrintjobsTable);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobileColumns = [{
        name: 'id',
        title: 'ID'
    }, {
        name: 'jobId',
        title: 'Job ID'
    }, {
        name: 'userInfo',
        title: 'User Info'
    }, {
        name: 'userId',
        title: 'User ID'
    }, {
        name: 'sourceUserId',
        title: 'Source User ID'
    }, {
        name: 'externalOrderId',
        title: 'External Order ID'
    }, {
        name: 'origin',
        title: 'Origin'
    }, {
        name: 'shopSaveId',
        title: 'Shop Save ID'
    }, {
        name: 'productType',
        title: 'Product Type'
    }, {
        name: 'createdOn',
        title: 'Created'
    }, {
        name: 'result',
        title: 'Pdf File'
    }, {
        name: 'loadableTemplateName',
        title: 'Loadable Template Name'
    }];
let WcDialogTableSettings = class WcDialogTableSettings extends h {
    constructor() {
        super();
        this.state = ['ID', 'Template Name', 'Created', 'Status', 'Pdf File', 'Documents', 'Pages', 'Size'];
        this.headerSelection = config.isMobile ? mobileColumns : columns;
        this.backdrop = new WcBackdrop();
    }
    static get styles() {
        return [dialogStyles, r$1 `
      label {
        cursor: pointer;
        font-family: var(--printess-text-font);
      }
      input {
        width: auto;
      }

      [type="checkbox"] {
        position: relative;
        border: none;
        border-radius: 10px;
        outline: none;
        left: 0px;
        top: -10px;
        width: 40px;
        height: 16px;
        z-index: 0;
        -webkit-appearance: none;
      }

      [type="checkbox"]:focus, [type="checkbox"]:hover {
        display: hidden;
        border: none;
        outline: none;
      }

      [type="checkbox"] + label {
        position: relative;
        display: block;
        cursor: pointer;
        line-height: 1.3;
        padding-left: 70px;
        position: relative;
        margin-top: -35px;
      }
      [type="checkbox"] + label:before {
        width: 40px;
        height: 18px;
        border-radius: 30px;
        border: 2px solid #ddd;
        background-color: #EEE;
        content: "";
        margin-right: 15px;
        transition: background-color 0.5s linear;
        z-index: 5;
        position: absolute;
        left: 0px;
      }
      [type="checkbox"] + label:after {
        width: 18px;
        height: 18px;
        border-radius: 30px;
        background-color: #fff;
        content: "";
        transition: margin 0.1s linear;
        box-shadow: 0px 0px 5px #aaa;
        position: absolute;
        left: 2px;
        top: 2px;
        z-index: 10;
      }
      [type="checkbox"]:checked + label:before {
        background-color: #e35fbc;
      }
      [type="checkbox"]:checked + label:after {
        margin: 0 0 0 22px;
      }
    `];
    }
    ;
    ;
    showDialog(callback) {
        this.callback = callback;
        document.body.appendChild(this.backdrop);
        document.body.appendChild(this);
        const localSettings = localStorage.getItem('tableSettings');
        localSettings ? this.state = JSON.parse(localSettings) : this.state;
    }
    ;
    closeDialog() {
        document.body.removeChild(this.backdrop);
        document.body.removeChild(this);
    }
    ;
    checkAll(e) {
        var _a, _b;
        if (!e.target.checked) {
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('input').forEach(item => item.checked = false);
            this.state = [];
        }
        else {
            columns.forEach((col) => this.state.push(col.title));
            (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelectorAll('input').forEach(item => item.checked = true);
        }
    }
    ;
    addColumn(e) {
        const column = e.target.value;
        if (!this.state.includes(column)) {
            this.state = [...this.state, column];
        }
        else {
            const i = this.state.indexOf(column);
            this.state.splice(i, 1);
        }
    }
    ;
    adjustTable() {
        if (this.callback) {
            this.callback(this.state);
        }
        localStorage.setItem('tableSettings', JSON.stringify(this.state));
        this.closeDialog();
    }
    ;
    render() {
        return T `
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Select Columns</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${() => this.closeDialog()}></wc-icon>
          </div>

          <div class="modal-content">
            <input @change=${this.checkAll} type="checkbox" name="all" id="all" value="Select All">
            <label for="all" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #777777"> Select All</label>

            ${c(this.headerSelection, item => item.name, item => T `
              <input @change=${this.addColumn} type="checkbox" name=${item.name} id=${item.name} value=${item.title} ?checked=${this.state.includes(`${item.title}`)}>
              <label for=${item.name}> ${item.title}</label><br>
            `)}

            <button @click=${this.adjustTable} class="submit">Change Table Settings</button>
          </div>
        </div>
      </div>
    `;
    }
    ;
};
__decorate$9([
    e$1({ type: Array })
], WcDialogTableSettings.prototype, "state", void 0);
WcDialogTableSettings = __decorate$9([
    n$1("wc-dialog-table-settings")
], WcDialogTableSettings);

const paginationStyles = r$1 `
  wc-icon {
    width: 25px;
    height: 25px;
  }

  .pagination-container {
    font-size: 14px; 
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    align-items: center;
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .page-button {
    cursor: pointer;
    margin-left: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    width: 30px;
    height: 30px;
    border-radius: 4px;
  }

  .page-button:hover {
    background-color: #eee;
  }

  .page-button wc-icon {
    width: 20px;
    height: 20px;
  }

  .active-page {
    background-color: #d0049b;
    color: white;
  }

  .active-page:hover {
    background-color: #d0049b;
    cursor: default;
  }

  .disabled:hover, .disabled:focus {
    cursor: default;
    background-color: transparent;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    width: 80px;
  }

  .current-take {
    background-color: #f8f8f8;
    border-radius: 4px;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: 400;
    height: 40px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .entries-list {
    display: block;
    position: absolute;
    width: 80px;
    left: 0;
    z-index: 1;
    border: 1px solid lightgray;
    background-color: white;
    border-radius: 4px;
  }

  .top {
    top: 40px;
  }

  .bottom {
    bottom: 40px;
  }

  .entry {
    display: block;
    text-align: center;
    padding: 10px 20px;
    cursor: pointer;
  }

  .entry:hover {
    background-color: #eee;
  }

  .hidden {
    display: none;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .pagination-container {
      font-size: 12px;
      grid-template-columns: 2fr 1fr 3fr;
    }

    .current-take {
      font-size: 12px;
      height: 30px;
      width: 80px;
    }

    .top {
      top: 30px;
    }

    .bottom {
      bottom: 30px;
    }

    .page-button {
      margin-left: 0;
      width: 20px;
      height: 20px;
    }

    wc-icon {
      width: 15px;
      height: 15px;
    }

    .page-button wc-icon {
      width: 15px;
      height: 15px;
    }
  }
`;

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcPagination = class WcPagination extends h {
    constructor(count, page, skip, take, position) {
        super();
        this.hideTopList = true;
        this.hideBottomList = true;
        this.page = 1;
        this.take = 100;
        this.skip = 0;
        this.count = count;
        this.page = page;
        this.skip = skip;
        this.take = take;
        this.position = position;
    }
    static get styles() {
        return [paginationStyles];
    }
    ;
    ;
    getPageValues(callback) {
        this.callback = callback;
    }
    ;
    displayTopList() {
        this.hideTopList = !this.hideTopList;
    }
    ;
    displayBottomList() {
        this.hideBottomList = !this.hideBottomList;
    }
    ;
    changeEntries(e) {
        const value = e.target.getAttribute('data-value');
        this.take = value !== null ? parseInt(value) : this.take;
        this.skip = 0;
        this.page = 1;
        this.position === 'top' ? this.hideTopList = !this.hideTopList : this.hideBottomList = !this.hideBottomList;
        if (this.callback) {
            this.callback(this.page, this.skip, this.take);
        }
    }
    ;
    updateTable() {
        const rest = this.count % this.take;
        this.skip = (this.page - 1) * this.take;
        if (this.skip === this.count) {
            this.take = rest;
            this.skip = this.count - rest;
        }
        if (this.callback) {
            this.callback(this.page, this.skip, this.take);
        }
    }
    ;
    nextPage() {
        if (this.page === Math.ceil(this.count / this.take))
            return;
        this.page++;
        this.updateTable();
    }
    ;
    prevPage() {
        if (this.page === 1)
            return;
        this.page--;
        this.updateTable();
    }
    ;
    firstPage() {
        if (this.page === 1)
            return;
        this.page = 1;
        this.updateTable();
    }
    ;
    lastPage() {
        if (this.page === Math.ceil(this.count / this.take))
            return;
        this.page = Math.ceil(this.count / this.take);
        this.updateTable();
    }
    ;
    render() {
        return T `
    <div class="pagination-container">
      <div>
        ${config.isMobile ? T `
          ${this.take * this.page - this.take + 1} - ${this.page * this.take > this.count ? this.count : this.page * this.take} / ${this.count}` : T `
        Showing ${this.take * this.page - this.take + 1} to ${this.page * this.take > this.count ? this.count : this.page * this.take} of ${this.count} entries`}
        
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        ${config.isMobile ? '' : T `<span>Entries: &nbsp</span>`}
        <div class="dropdown">
          <div class="current-take" @click=${this.displayTopList}>${this.take}<wc-icon primaryColor="gray" icon="carret-down-solid" style="margin-left: 10px;"></wc-icon></div>
          <div class="entries-list ${this.position} ${this.hideTopList ? 'hidden' : ''}">
            <div @click=${this.changeEntries} class="entry" data-value="10">10</div>
            <div @click=${this.changeEntries} class="entry" data-value="20">20</div>
            <div @click=${this.changeEntries} class="entry" data-value="50">50</div>
            <div @click=${this.changeEntries} class="entry" data-value="100">100</div>
            <div @click=${this.changeEntries} class="entry" data-value="200">200</div>
            <div @click=${this.changeEntries} class="entry" data-value="500">500</div>
          </div>
        </div>
      </div>
      <div class="paging" style="display: flex; justify-content: flex-end; align-items: center;">
        <button @click=${this.firstPage} class="page-button ${this.page === 1 ? "disabled" : ""}" style="margin: 0;">
          <wc-icon primaryColor=${this.page === 1 ? "gray" : "black"} icon="collapseLeft"></wc-icon>
        </button>
        <button @click=${this.prevPage} class="page-button ${this.page === 1 ? "disabled" : ""}" style="margin: 0;">
          <wc-icon primaryColor=${this.page === 1 ? "gray" : "black"} icon="angle-left"></wc-icon>
        </button>
        <span style="margin: 0 10px;">${this.page} ${config.isMobile ? '' : T `of ${Math.ceil(this.count / this.take)}`}</span>
        <button @click=${this.nextPage} class="page-button ${this.page === Math.ceil(this.count / this.take) ? "disabled" : ""}" style=" margin-left: 0;">
          <wc-icon primaryColor=${this.page === Math.ceil(this.count / this.take) ? "gray" : "black"} icon="angle-right"></wc-icon>
        </button>
        <button @click=${this.lastPage} class="page-button ${this.page === Math.ceil(this.count / this.take) ? "disabled" : ""}" style="margin: 0 5px 0 0;">
          <wc-icon primaryColor=${this.page === Math.ceil(this.count / this.take) ? "gray" : "black"} icon="expandLeft"></wc-icon>
        </button>
      </div>
    </div>
  `;
    }
    ;
};
__decorate$8([
    e$1({ attribute: false, type: Boolean })
], WcPagination.prototype, "hideTopList", void 0);
__decorate$8([
    e$1({ attribute: false, type: Boolean })
], WcPagination.prototype, "hideBottomList", void 0);
__decorate$8([
    e$1({ attribute: false, type: Number })
], WcPagination.prototype, "page", void 0);
__decorate$8([
    e$1({ attribute: false, type: Number })
], WcPagination.prototype, "take", void 0);
__decorate$8([
    e$1({ attribute: false, type: Number })
], WcPagination.prototype, "skip", void 0);
__decorate$8([
    e$1({ attribute: false, type: Number })
], WcPagination.prototype, "count", void 0);
__decorate$8([
    e$1({ attribute: false, type: String })
], WcPagination.prototype, "position", void 0);
WcPagination = __decorate$8([
    n$1("wc-pagination")
], WcPagination);

const tableStyles = r$1 `
  .table-wrapper {
    margin-top: 15px;
    overflow: auto;
    border-bottom: 2px solid #d0049b;
    font-family: var(--printess-text-font);
  }

  a {
    text-decoration: none;
    color: white;
  }

  dl {
    display: grid;
    margin-top: 0;
    margin-bottom: 20px;
    grid-template-columns: 80px calc(100% - 80px);
  }

  .mobile-table-header {
    font-size: 14px;
    padding: 10px 20px;
    grid-column: 1 / span 2;
    background-color: #D0049B;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  dt, dd {
    display: flex;
    line-height: 16px;
    margin-left: 0;
    text-align: left;
    padding: 10px;
    font-size: 12px;
  }

  dd {
    display: flex;
    justify-content: space-between;
  }

  dt:nth-of-type(even), dd:nth-of-type(even) {
    background-color: #D0049B19;
  }

  dd a {
    text-decoration: none;
    color: #d3277c;
  }

  wc-icon {
    width: 15px;
    height: 15px;
  }

  .flex {
    display: flex;
  }

  .hide {
    display: none;
  }

  .loader {
    position: fixed;
    left: 50%;
    top: 50%;
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--printess-magenta);
    border-color: var(--printess-magenta) transparent var(--printess-magenta) transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner,
  .spinner:after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
  }
  .spinner {
    font-size: 8px;
    position: relative;
    border-top: 0.5em solid rgba(230,0,126, 0.2);
    border-right: 0.5em solid rgba(230,0,126, 0.2);
    border-bottom: 0.5em solid rgba(230,0,126, 0.2);
    border-left: 0.5em solid #e6007e;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`;

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcPrintjobsTableMobile = class WcPrintjobsTableMobile extends h {
    constructor(data, headers) {
        super();
        this.data = data;
        this.headers = headers;
        const localSettings = localStorage.getItem('tableSettings');
        localSettings ? this.headers = JSON.parse(localSettings) : this.headers;
    }
    static get styles() {
        return [tableStyles];
    }
    ;
    ;
    showError(error) {
        console.log('error msg: ', error.message, 'error code: ', error.code);
    }
    ;
    getUserInfo(item) {
        let r = "";
        if (this.data.users) {
            const main = this.data.users.filter(u => u.id === item.userId)[0];
            if (main) {
                r += main.d + " (" + main.e + ")";
            }
            if (item.sourceUserId) {
                const source = this.data.users.filter(u => u.id === item.sourceUserId)[0];
                if (source) {
                    r += ", issued by " + source.d + " (" + source.e + ")";
                }
            }
        }
        return r;
    }
    render() {
        return T `    
    ${!this.data ? T `<div class="loader"></div>` : T `
    <div class="table-wrapper">
      
        ${this.data && c(this.data.orders, item => item.id, item => {
            var _a, _b;
            const userInfo = this.getUserInfo(item);
            return T `
      <dl>
        ${this.headers.includes('Template Name') ? T `
          <div class="mobile-table-header"><a href="https://editor.printess.com/?name=${encodeURIComponent(item.loadableTemplateName)}${currentUser.id === item.userId ? "" : "&userId=" + item.userId}" target="_blank" style="display:flex;flex-direction:row;" title=${userInfo}><wc-icon primaryColor="toolbar" icon="printess-wand"></wc-icon> &nbsp ${item.templateName}</a></div>
        ` : ''}
        ${this.headers.includes('ID') ? T `
          <dt>ID</dt>
          <dd>${item.id}</dd>
        ` : ''}
        ${this.headers.includes('Job ID') ? T `
          <dt>Job ID</dt>
          <dd>${item.jobId}</dd>
        ` : ''}
        ${this.headers.includes('User Info') ? T `
          <dt>User Info</dt>
          <dd>${userInfo}</dd>
        ` : ''}
        ${this.headers.includes('User ID') ? T `
          <dt>User ID</dt>
          <dd>${item.userId}</dd>
        ` : ''}
        ${this.headers.includes('Source User ID') ? T `
          <dt>Source User ID</dt>
          <dd>${item.sourceUserId}</dd>
        ` : ''}
        ${this.headers.includes('External Order ID') ? T `
          <dt>External Order ID</dt>
          <dd>${item.externalOrderId}</dd>
        ` : ''}
        ${this.headers.includes('Origin') ? T `
          <dt>Origin</dt>
          <dd>${item.origin}</dd>
        ` : ''}
        ${this.headers.includes('Shop Save ID') ? T `
          <dt>Shop Save ID</dt>
          <dd>${item.shopSaveId}</dd>
        ` : ''}
        ${this.headers.includes('Product Type') ? T `
          <dt>Product Type</dt>
          <dd>${item.productType}</dd>
        ` : ''}
        ${this.headers.includes('Created') ? T `
          <dt>Created</dt>
          <dd>
            ${formatDistance(subDays(new Date(item.createdOn), 0), new Date(), { addSuffix: true })}
            ${this.statusValue(item.isFinished, item.isFailure, item.failureDetails, item.jobId, item.createdOn)}
          </dd>
        ` : ''}
        ${this.headers.includes('Pdf File') ? T `
          <dt>Pdf File</dt>
          <dd>
            ${this.pdfValue((_a = item.result) === null || _a === void 0 ? void 0 : _a.r, (_b = item.result) === null || _b === void 0 ? void 0 : _b.zip)}
            (${item.size ? T `${(item.size / 1000000).toFixed(2)} MB` : '0 MB'})
          </dd>
        ` : ''}
        ${this.headers.includes('Loadable Template Name') ? T `
          <dt>Loadable Template Name</dt>
          <dd><a href="https://editor.printess.com/?name=${encodeURIComponent(item.loadableTemplateName)}${currentUser.id === item.userId ? "" : "&userId=" + item.userId}" target="_blank" title=${userInfo}>${item.loadableTemplateName}</a></dd>
        ` : ''}
      </dl>
      `;
        })}
    

      <!-- <table class="layout display responsive-table">
        <thead>
          <tr>
            ${c(columns, item => item.name, item => T `
              <th class=${this.headers.includes(`${item.title}`) ? '' : 'hide'}>${item.title}</th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${this.data && c(this.data.orders, item => item.id, item => {
            var _a, _b;
            const userInfo = this.getUserInfo(item);
            return T `
            <tr>
              <td class='orders-id ${this.headers.includes('ID') ? '' : 'hide'}'>${item.id}</td>
              <td class=${this.headers.includes('Job ID') ? '' : 'hide'}>${item.jobId}</td>
              <td class=${this.headers.includes('User Info') ? '' : 'hide'}>${userInfo}</td>
              <td class=${this.headers.includes('User ID') ? '' : 'hide'}>${item.userId}</td>
              <td class=${this.headers.includes('Source User ID') ? '' : 'hide'}>${item.sourceUserId}</td>
              <td class=${this.headers.includes('External Order ID') ? '' : 'hide'}>${item.externalOrderId}</td>
              <td class=${this.headers.includes('Template Name') ? '' : 'hide'}><a href="https://editor.printess.com/?name=${encodeURIComponent(item.loadableTemplateName)}${currentUser.id === item.userId ? "" : "&userId=" + item.userId}" target="_blank" style="display:flex;flex-direction:row;" title=${userInfo}><wc-icon primaryColor="pink" icon="printess-wand"></wc-icon> &nbsp ${item.templateName}</a></td>
              <td class=${this.headers.includes('Origin') ? '' : 'hide'}>${item.origin}</td>
              <td class=${this.headers.includes('Shop Save ID') ? '' : 'hide'}>${item.shopSaveId}</td>
              <td class=${this.headers.includes('Product Type') ? '' : 'hide'}>${item.productType}</td>
              <td class=${this.headers.includes('Created') ? '' : 'hide'}>${formatDistance(subDays(new Date(item.createdOn), 0), new Date(), { addSuffix: true })}</td>
              <td class=${this.headers.includes('Finished') ? '' : 'hide'}>${item.isFinished ? formatDistance(subDays(new Date(item.finishedOn ? item.finishedOn : 0), 0), new Date(), { addSuffix: true }) : ''}</td>
              <td class=${this.headers.includes('Status') ? '' : 'hide'}>${this.statusValue(item.isFinished, item.isFailure, item.failureDetails, item.jobId, item.createdOn)}</td>
              <td class=${this.headers.includes('Failure Details') ? '' : 'hide'}>${item.failureDetails}</td>
              <td class=${this.headers.includes('Pdf File') ? 'flex' : 'hide'}>${this.pdfValue((_a = item.result) === null || _a === void 0 ? void 0 : _a.r, (_b = item.result) === null || _b === void 0 ? void 0 : _b.zip)}</td>
              <td class=${this.headers.includes('Documents') ? '' : 'hide'}>${item.documents}</td>
              <td class=${this.headers.includes('Pages') ? '' : 'hide'}>${item.pages}</td>
              <td class=${this.headers.includes('Size') ? '' : 'hide'}>${item.size ? T `${(item.size / 1000000).toFixed(2)} MB` : '0 MB'}</td>
              <td class=${this.headers.includes('Loadable Template Name') ? '' : 'hide'}><a href="https://editor.printess.com/?name=${item.loadableTemplateName}" target="_blank" title=${userInfo}>${item.loadableTemplateName}</a></td>
            </tr>
          `;
        })}
          </tbody>
      </table> -->
    </div>
    `}`;
    }
    ;
    showErrorMsg(message) {
        const td = new WcDialogErrorMessage(message);
        td.showDialog();
    }
    ;
    statusValue(isFinished, isFailure, failureDetails, jobId, createdOn) {
        if (isFinished && !isFailure) {
            return T `<wc-icon primaryColor="lightgreen" icon="check"></wc-icon>`;
        }
        else if (!isFinished) {
            return T `<div class="spinner"></div>`;
        }
        else {
            return T `<wc-icon primaryColor="pink" icon="warning" @click=${() => this.showErrorMsg(failureDetails)} style="cursor: pointer;"></wc-icon>`;
        }
    }
    ;
    pdfValue(fileUrl, zipUrl) {
        if (fileUrl) {
            return T `${Object.keys(fileUrl).map((url) => T `
        <a href=${fileUrl[url]} style="display: inline-block" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse" style="margin-right: 10px;"></wc-icon>
        </a>`)}`;
        }
        else if (zipUrl) {
            return T `
        <a href="${zipUrl}" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse"></wc-icon>
        </a>`;
        }
        else {
            return T `<wc-icon primaryColor="gray" icon="page-light"></wc-icon>`;
        }
    }
};
__decorate$7([
    e$1({ attribute: false, type: Object })
], WcPrintjobsTableMobile.prototype, "data", void 0);
__decorate$7([
    e$1({ attribute: false, type: Array })
], WcPrintjobsTableMobile.prototype, "headers", void 0);
__decorate$7([
    e$1({ attribute: false, type: String })
], WcPrintjobsTableMobile.prototype, "errorMsg", void 0);
__decorate$7([
    e$1({ attribute: false, type: Object })
], WcPrintjobsTableMobile.prototype, "productionStatus", void 0);
WcPrintjobsTableMobile = __decorate$7([
    n$1("wc-printjobs-table-mobile")
], WcPrintjobsTableMobile);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
let WcPrintjobsPage = class WcPrintjobsPage extends h {
    constructor() {
        super();
        this.headers = ['ID', 'Template Name', 'Created', 'Status', 'Pdf File', 'Documents', 'Pages', 'Size'];
        this.hideFilter = true;
        this.page = 1;
        this.take = 100;
        this.skip = 0;
        this.isFilter = false;
        this.loadTemplatesDebounce = new ValueDebounce((value) => __awaiter$2(this, void 0, void 0, function* () {
            const apiResponse = yield api.loadOrders(value);
            if (apiResponse instanceof ServerErrorResponse) {
                this.showError(apiResponse);
            }
            else {
                this.data = apiResponse;
            }
        }));
        this.date = new Date();
        this.date.setDate(this.date.getDate() - 30);
        this.state = new SearchOrders({
            templateName: '',
            origin: '',
            productType: '',
            externalOrderId: '',
            take: this.take,
            startDate: this.date
        });
    }
    static get styles() {
        return [printjobsStyles];
    }
    ;
    setState(nobs) {
        this.state = new SearchOrders(nobs, this.state);
    }
    ;
    showError(error) {
        console.log('error msg: ', error.message, 'error code: ', error.code);
    }
    ;
    ;
    handleOrder(o) {
        console.log(o);
        if (this.page === 1 && !this.isFilter) {
            let count = this.data.count;
            let users = this.data.users;
            let newOrders = [];
            let hasNewOrder = false;
            this.data.orders.forEach(order => {
                if (order.id === o.id) {
                    hasNewOrder = true;
                    if (o.isFinished) {
                        this.status.value !== 'isProcessing' && newOrders.push(o);
                        this.status.value === 'isProcessing' && count--;
                    }
                    else {
                        newOrders.push(order);
                    }
                }
                else {
                    newOrders.push(order);
                }
            });
            if (!hasNewOrder) {
                if (this.status.value === 'isProcessing' && o.isFinished) {
                    count--;
                    newOrders.length > this.take && newOrders.pop();
                }
                else {
                    count++;
                    newOrders = [o, ...newOrders];
                    newOrders.length > this.take && newOrders.pop();
                }
            }
            this.data = { orders: newOrders, count, users };
        }
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        const model = this.state.toDto();
        this.loadTemplatesDebounce.immediate(model);
        this.connectOrderStream();
    }
    ;
    connectOrderStream() {
        var _a;
        if (this.orderStream) {
            this.orderStream.disconnect();
        }
        this.orderStream = new OrderStream(apiEndpoint, (_a = api.token) !== null && _a !== void 0 ? _a : "", this.handleOrder.bind(this));
        if (this.orderStream) ;
    }
    ;
    loadTemplates() {
        const model = this.state.toDto();
        this.loadTemplatesDebounce.change(model, 500);
    }
    ;
    setSearchOrders(value, name) {
        const nobs = new Nobs();
        this.page = 1;
        nobs.setProperty(this.state, 'skip', 0);
        nobs.setProperty(this.state, 'take', this.take);
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
        this.loadTemplates();
    }
    ;
    onSearchOrderChange(e) {
        let searchValue = e.target.value;
        this.isFilter = true;
        const searchName = e.target.name;
        this.setSearchOrders(searchValue, searchName);
    }
    ;
    onStatusChange(e) {
        const nobs = new Nobs();
        this.page = 1;
        this.isFilter = true;
        let finishedValue;
        let failureValue;
        switch (e.target.value) {
            case ('all'):
                finishedValue = undefined;
                failureValue = undefined;
                break;
            case ('isFinished'):
                finishedValue = true;
                failureValue = false;
                break;
            case ('isProcessing'):
                finishedValue = false;
                failureValue = false;
                this.isFilter = false;
                break;
            case ('isFailed'):
                finishedValue = true;
                failureValue = true;
                break;
        }
        nobs.setProperty(this.state, 'skip', 0);
        nobs.setProperty(this.state, 'take', this.take);
        nobs.setProperty(this.state, 'isFinished', finishedValue);
        nobs.setProperty(this.state, 'isFailed', failureValue);
        this.setState(nobs);
        this.loadTemplates();
    }
    ;
    expandFilter() {
        this.hideFilter = !this.hideFilter;
    }
    ;
    resetFilter() {
        var _a;
        this.page = 1;
        this.isFilter = false;
        this.state = new SearchOrders({
            templateName: '',
            origin: '',
            productType: '',
            externalOrderId: '',
            take: this.take,
            startDate: this.date
        });
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('input').forEach(i => i.value = '');
        this.status.value = 'all';
        const model = this.state.toDto();
        this.loadTemplatesDebounce.immediate(model);
    }
    ;
    setTableSettings() {
        const td = new WcDialogTableSettings();
        td.showDialog(headers => {
            this.headers = headers;
        });
    }
    ;
    setPagination(position) {
        if (this.data) {
            const td = new WcPagination(this.data.count, this.page, this.skip, this.take, position);
            td.getPageValues((page, skip, take) => {
                this.page = page;
                this.skip = skip;
                this.take = take;
                this.applyPagination();
            });
            return td;
        }
    }
    ;
    applyPagination() {
        const nobs = new Nobs();
        nobs.setProperty(this.state, 'take', this.take);
        nobs.setProperty(this.state, 'skip', this.skip);
        this.setState(nobs);
        this.loadTemplates();
    }
    ;
    renderTable() {
        return config.isMobile ? new WcPrintjobsTableMobile(this.data, this.headers) : new WcPrintjobsTable(this.data, this.headers);
    }
    ;
    toggleAdminMode() {
        adm.useAdminMode = !adm.useAdminMode;
        this.connectOrderStream();
        this.loadTemplates();
        this.requestUpdate();
    }
    render() {
        console.log(this.data);
        return T `
      <div class="user-orders">
        <h3 class="topic">Print Jobs</h3>
        <p class="subtopic">Customer orders</p>

        <div class="filter-wrapper">
          <div class="setting-buttons">
            <button @click=${this.setTableSettings} class="table-settings">${config.isMobile ? T `<wc-icon primaryColor="gray" icon="settings" style="width: 15px; margin-right: 10px;"></wc-icon>` : 'select'} columns</button>
            <button @click=${this.loadTemplates} class="table-settings">${config.isMobile ? T `<wc-icon primaryColor="gray" icon="sync-alt" style="width: 12px; margin-right: 10px;"></wc-icon>` : 'refresh'}  printjobs</button>
          ${adm.canUseAdminMode ? T `<button @click=${this.toggleAdminMode} class="table-settings"><wc-icon primaryColor="gray" icon=${adm.useAdminMode ? 'user-crown-solid' : 'user-solid'} style="width: 14px; margin-right: 10px;"></wc-icon>${adm.useAdminMode ? "admin" : "user"}</button>` : ""}
          </div>

          <div class="inline">
            <wc-icon @click=${this.expandFilter} primaryColor="gray" icon=${this.hideFilter ? "carret-right-solid" : "carret-down-solid"} style="cursor: pointer;"></wc-icon>
            <label class="template-name-label" for="templateName">Search:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="templateName" placeholder="template name" style="margin: 0 10px;">
            <wc-icon @click=${this.resetFilter} primaryColor="gray" icon="filter-reset" style="cursor: pointer;"></wc-icon>
          </div>
        </div>

        <div class="expanded-filter ${this.hideFilter ? 'hidden' : ''}" style="margin-top: 20px;">
          <div class="input-label">
            <label for="origin">Origin:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="origin" placeholder="origin">
          </div>
          <div class="input-label">
            <label for="productType">Product Type:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="productType" placeholder="product type">
          </div>
          <div class="input-label">
            <label for="externalOrderId">External Order ID:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="externalOrderId" placeholder="external order id">
          </div>
          <div class="input-label">
            <label for="startDate">From:</label>
            <input @change=${this.onSearchOrderChange} type="date" name="startDate" placeholder="start date">
          </div>
          <div class="input-label">
            <label for="endDate">To:</label>
            <input @change=${this.onSearchOrderChange} type="date" name="endDate" placeholder="end date">
          </div>
          <div class="input-label">
            <label for="status">Status:</label>
            <select @change=${this.onStatusChange} name="status">
              <option value="all">All</option>
              <option value="isFinished">Finished</option>
              <option value="isProcessing">Unfinished</option>
              <option value="isFailed">Failed</option>
            </select>
          </div>
        </div>
        
        ${this.data && this.data.count === 0 ?
            T `<div style="width: 100%; display: flex; justify-content: center;"><p>~ No Print Jobs available ~</p></div>`
            : T `
        <div class="pagination" style="margin-top: 30px;">
          ${this.setPagination("top")}
        </div>
        
        <div class="table-container">
          ${this.renderTable()}
        </div>
        
        <div class="pagination" style="margin-top: 10px;">
          ${this.setPagination("bottom")}
        </div>
        `}
      </div>
  `;
    }
    ;
};
__decorate$6([
    e$1({ attribute: false, type: Object })
], WcPrintjobsPage.prototype, "state", void 0);
__decorate$6([
    e$1({ attribute: false, type: Object })
], WcPrintjobsPage.prototype, "data", void 0);
__decorate$6([
    e$1({ attribute: false, type: Array })
], WcPrintjobsPage.prototype, "headers", void 0);
__decorate$6([
    e$1({ attribute: false, type: Boolean })
], WcPrintjobsPage.prototype, "hideFilter", void 0);
__decorate$6([
    e$1({ attribute: false, type: Number })
], WcPrintjobsPage.prototype, "page", void 0);
__decorate$6([
    e$1({ attribute: false, type: Number })
], WcPrintjobsPage.prototype, "take", void 0);
__decorate$6([
    e$1({ attribute: false, type: Number })
], WcPrintjobsPage.prototype, "skip", void 0);
__decorate$6([
    e$1({ attribute: false, type: Object })
], WcPrintjobsPage.prototype, "date", void 0);
__decorate$6([
    e$1({ attribute: false, type: Boolean })
], WcPrintjobsPage.prototype, "isFilter", void 0);
__decorate$6([
    o$1('select')
], WcPrintjobsPage.prototype, "status", void 0);
WcPrintjobsPage = __decorate$6([
    n$1("wc-printjobs-page")
], WcPrintjobsPage);

const statisticsStyles = r$1 `
  .printjobs-statistics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }

  .box {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding: 15px 20px 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(248, 248, 248);
    border-radius: 4px;
    min-width: 200px;
  }

  wc-icon {
    grid-column: 1;
    grid-row: 1;
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }

  .text-wrapper {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .topic {
    font-size: 14px;
  }

  .value {
    font-size: 22px;
  }

  hr {
    grid-column: 1 / span 2;
    grid-row: 2;
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
  }

  .status {
    grid-column: 1 / span 2;
    grid-row: 2;
    font-size: 12px;
    color: #bbbbbb;
    padding-top: 10px;
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: row;
  }
`;

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcPrintjobsStatistics = class WcPrintjobsStatistics extends h {
    constructor(data) {
        super();
        this.printjobs = 0;
        this.data = data;
    }
    static get styles() {
        return [statisticsStyles];
    }
    ;
    setState(nobs) {
        this.state = new SearchOrders(nobs, this.state);
    }
    ;
    showError(error) {
        console.log('error msg: ', error.message, 'error code: ', error.code);
    }
    ;
    ;
    handleOrder(o) {
        console.log(o);
        o.isFinished ? this.printjobs-- : this.printjobs++;
        if (this.data && o.isFinished) {
            this.data = { orders: [o, ...this.data.orders], count: this.data.count++, users: this.data.users };
        }
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.connectOrderStream();
    }
    ;
    connectOrderStream() {
        var _a;
        if (this.orderStream) {
            this.orderStream.disconnect();
        }
        this.orderStream = new OrderStream(apiEndpoint, (_a = api.token) !== null && _a !== void 0 ? _a : "", this.handleOrder.bind(this));
        if (this.orderStream) ;
    }
    ;
    usageValue() {
        let usage = 0;
        this.data && this.data.orders.forEach(o => usage += o.size);
        if (usage < 10000) {
            return `${usage} Byte`;
        }
        else if (usage < 100000000) {
            return `${(usage / 1000000).toFixed(2)} MB`;
        }
        else {
            return `${(usage / 1000000000).toFixed(2)} GB`;
        }
    }
    ;
    getRecentPrintjobs() {
        const date = new Date();
        date.setHours(date.getHours() - 1);
        return this.data.orders.filter(o => new Date(o.createdOn).getTime() >= date.getTime());
    }
    ;
    createdValue() {
        if (this.data) {
            const printjobs = this.getRecentPrintjobs();
            return printjobs.length;
        }
        return 0;
    }
    ;
    errorValue() {
        if (this.data) {
            const printjobs = this.getRecentPrintjobs();
            return printjobs.filter(o => o.isFailure === true).length;
        }
        return 0;
    }
    ;
    creditValue() {
        if (this.data) {
            const date = new Date();
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            const filter = this.data.orders.filter(o => new Date(o.createdOn).getTime() >= date.getTime() && !o.isFailure);
            return filter.length;
        }
        return 0;
    }
    ;
    render() {
        console.log('statistics', this.data);
        return T `
      <div class="printjobs-statistics">
        <div class="space box">
          <wc-icon primaryColor="gray" icon="database"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Total Usage</span>
            <span class="value">${this.usageValue()}</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="calendar-light" style="width: 15px; height: 15px;"></wc-icon>
            Last 30 days
          </div>
        </div>
        <div class="production box">
          <wc-icon primaryColor="gray" icon="page-light"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">In Production</span>
            <span class="value">${this.printjobs > 0 ? this.printjobs : 0}</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="sync-alt" style="width: 15px; height: 15px;"></wc-icon>
            Updated now
          </div>
        </div>
        <div class="creation box">
          <wc-icon primaryColor="gray" icon="page-inverse"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Created</span>
            <span class="value">${Math.ceil(this.createdValue() / 60)} / min</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="sync-alt" style="width: 15px; height: 15px;"></wc-icon>
            Updated now
          </div>
        </div>
        <div class="errors box">
          <wc-icon primaryColor="gray" icon="warning"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Errors</span>
            <span class="value">${this.errorValue()}</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="clock-light" style="width: 15px; height: 15px;"></wc-icon>
            In the last hour
          </div>
        </div>
        <div class="credits box">
          <wc-icon primaryColor="gray" icon="coin"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Credits</span>
            <span class="value"><span style="color: ${this.creditValue() > 1000 ? 'rgb(211, 39, 124)' : '#555555'}">${this.creditValue()}</span> / 1.000</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="calendar-light" style="width: 15px; height: 15px;"></wc-icon>
            Current month
          </div>
        </div>
      </div>
  `;
    }
    ;
};
__decorate$5([
    e$1({ attribute: false, type: Object })
], WcPrintjobsStatistics.prototype, "state", void 0);
__decorate$5([
    e$1({ attribute: false, type: Object })
], WcPrintjobsStatistics.prototype, "data", void 0);
__decorate$5([
    e$1({ attribute: false, type: Number })
], WcPrintjobsStatistics.prototype, "printjobs", void 0);
WcPrintjobsStatistics = __decorate$5([
    n$1("wc-printjobs-statistics")
], WcPrintjobsStatistics);

const dashboardStyles = r$1 `
  .dashboard {
    font-family: var(--printess-text-font);
    color: #555555;    
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
    color: #555555;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }
  }
`;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render$1 = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render$1(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a$1;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                // Type assert to adhere to Bazel's "must type assert JSON parse" rule.
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this
                    .requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._updateState = 0;
        this._updatePromise =
            new Promise((res) => this._enableUpdatingResolver = res);
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this._hasRequestedUpdate) {
            return;
        }
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     * @deprecated Override `getUpdateComplete()` instead for forward
     *     compatibility with `lit-element` 3.0 / `@lit/reactive-element`.
     */
    _getUpdateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async getUpdateComplete() {
     *       await super.getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a$1 = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a$1] = true;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const standardProperty = (options, element) => {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor &&
        !('value' in element.descriptor)) {
        return Object.assign(Object.assign({}, element), { finisher(clazz) {
                clazz.createProperty(element.key, options);
            } });
    }
    else {
        // createProperty() takes care of defining the property, but we still
        // must return some kind of descriptor, so return a descriptor for an
        // unused prototype field. The finisher calls createProperty().
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            // When @babel/plugin-proposal-decorators implements initializers,
            // do this instead of the initializer below. See:
            // https://github.com/babel/babel/issues/9260 extras: [
            //   {
            //     kind: 'initializer',
            //     placement: 'own',
            //     initializer: descriptor.initializer,
            //   }
            // ],
            initializer() {
                if (typeof element.initializer === 'function') {
                    this[element.key] = element.initializer.call(this);
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
            }
        };
    }
};
const legacyProperty = (options, proto, name) => {
    proto.constructor
        .createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function property(options) {
    // tslint:disable-next-line:no-any decorator
    return (protoOrDescriptor, name) => (name !== undefined) ?
        legacyProperty(options, protoOrDescriptor, name) :
        standardProperty(options, protoOrDescriptor);
}

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `supportsAdoptingStyleSheets` is true then we assume
            // CSSStyleSheet is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.5.1');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */
class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = userStyles === undefined ? [] : [userStyles];
        }
        // Ensure that there are no invalid CSSStyleSheet instances here. They are
        // invalid in two conditions.
        // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
        //     this is impossible to check except via .replaceSync or use
        // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
        //     false)
        this._styles = this._styles.map((s) => {
            if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                const cssText = Array.prototype.slice.call(s.cssRules)
                    .reduce((css, rule) => css + rule.cssText, '');
                return unsafeCSS(cssText);
            }
            return s;
        });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow(this.constructor.shadowRootOptions);
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */
LitElement.render = render;
/** @nocollapse */
LitElement.shadowRootOptions = { mode: 'open' };

/**
 * @license
 * Copyright 2014-2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Promise that resolves when the gviz loader script is loaded, which
 * provides access to the Google Charts loading API.
 */
const loaderPromise = new Promise((resolve, reject) => {
    // Resolve immediately if the loader script has been added already and
    // `google.charts.load` is available. Adding the loader script twice throws
    // an error.
    if (typeof google !== 'undefined' && google.charts &&
        typeof google.charts.load === 'function') {
        resolve();
    }
    else {
        // Try to find existing loader script.
        let loaderScript = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
        if (!loaderScript) {
            // If the loader is not present, add it.
            loaderScript = document.createElement('script');
            // Specify URL directly to pass JS compiler conformance checks.
            loaderScript.src = 'https://www.gstatic.com/charts/loader.js';
            document.head.appendChild(loaderScript);
        }
        loaderScript.addEventListener('load', resolve);
        loaderScript.addEventListener('error', reject);
    }
});
/**
 * Loads Google Charts API with the selected settings or using defaults.
 *
 * The following settings are available:
 * - version: which version of library to load, default: 'current',
 * - packages: which chart packages to load, default: ['corechart'],
 * - language: what language to load library in, default: `lang` attribute on
 *   `<html>` or 'en' if not specified,
 * - mapsApiKey: key to use for maps API.
 */
async function load(settings = {}) {
    await loaderPromise;
    const { version = 'current', packages = ['corechart'], language = document.documentElement.lang || 'en', mapsApiKey, } = settings;
    return google.charts.load(version, {
        'packages': packages,
        'language': language,
        'mapsApiKey': mapsApiKey,
    });
}
/**
 * Creates a DataTable object for use with a chart.
 *
 * Multiple different argument types are supported. This is because the
 * result of loading the JSON data URL is fed into this function for
 * DataTable construction and its format is unknown.
 *
 * The data argument can be one of a few options:
 *
 * - null/undefined: An empty DataTable is created. Columns must be added
 * - !DataTable: The object is simply returned
 * - {{cols: !Array, rows: !Array}}: A DataTable in object format
 * - {{cols: !Array}}: A DataTable in object format without rows
 * - !Array<!Array>: A DataTable in 2D array format
 *
 * Un-supported types:
 *
 * - Empty !Array<!Array>: (e.g. `[]`) While technically a valid data
 *   format, this is rejected as charts will not render empty DataTables.
 *   DataTables must at least have columns specified. An empty array is most
 *   likely due to a bug or bad data. If one wants an empty DataTable, pass
 *   no arguments.
 * - Anything else
 *
 * See <a
 * href="https://developers.google.com/chart/interactive/docs/reference#datatable-class">the
 * docs</a> for more details.
 *
 * @param data The data which we should use to construct new DataTable object
 */
async function dataTable(data) {
    // Ensure that `google.visualization` namespace is added to the document.
    await load();
    if (data == null) {
        return new google.visualization.DataTable();
    }
    else if (data.getNumberOfRows) {
        // Data is already a DataTable
        return data;
    }
    else if (data.cols) { // data.rows may also be specified
        // Data is in the form of object DataTable structure
        return new google.visualization.DataTable(data);
    }
    else if (data.length > 0) {
        // Data is in the form of a two dimensional array.
        return google.visualization.arrayToDataTable(data);
    }
    else if (data.length === 0) {
        // Chart data was empty.
        // We throw instead of creating an empty DataTable because most
        // (if not all) charts will render a sticky error in this situation.
        throw new Error('Data was empty.');
    }
    throw new Error('Data format was not recognized.');
}
/**
 * Creates new `ChartWrapper`.
 * @param container Element in which the chart will be drawn
 */
async function createChartWrapper(container) {
    // Ensure that `google.visualization` namespace is added to the document.
    await load();
    // Typings suggest that `chartType` is required in `ChartSpecs`, but it works
    // without it.
    return new google.visualization.ChartWrapper({ 'container': container });
}

/**
 * @license
 * Copyright 2014-2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const DEFAULT_EVENTS = ['ready', 'select'];
/**
 * Constructor names for supported chart types.
 *
 * `ChartWrapper` expects a constructor name and assumes `google.visualization`
 *  as the default namespace.
 */
const CHART_TYPES = {
    'area': 'AreaChart',
    'bar': 'BarChart',
    'md-bar': 'google.charts.Bar',
    'bubble': 'BubbleChart',
    'calendar': 'Calendar',
    'candlestick': 'CandlestickChart',
    'column': 'ColumnChart',
    'combo': 'ComboChart',
    'gantt': 'Gantt',
    'gauge': 'Gauge',
    'geo': 'GeoChart',
    'histogram': 'Histogram',
    'line': 'LineChart',
    'md-line': 'google.charts.Line',
    'org': 'OrgChart',
    'pie': 'PieChart',
    'sankey': 'Sankey',
    'scatter': 'ScatterChart',
    'md-scatter': 'google.charts.Scatter',
    'stepped-area': 'SteppedAreaChart',
    'table': 'Table',
    'timeline': 'Timeline',
    'treemap': 'TreeMap',
    'wordtree': 'WordTree',
};
/**
 * `google-chart` encapsulates Google Charts as a web component, allowing you to
 * easily visualize data. From simple line charts to complex hierarchical tree
 * maps, the chart element provides a number of ready-to-use chart types.
 *
 * ```html
 * <google-chart
 *     type='pie'
 *     options='{"title": "Distribution of days in 2001Q1"}'
 *     cols='[{"label":"Month", "type":"string"}, {"label":"Days",
 *         "type":"number"}]' rows='[["Jan", 31],["Feb", 28],["Mar", 31]]'>
 *   </google-chart>
 * ```
 *
 * Note: if you're passing JSON as attributes, single quotes are necessary to be
 * valid JSON. See
 * https://www.polymer-project.org/1.0/docs/devguide/properties#configuring-object-and-array-properties.
 *
 * Height and width are specified as style attributes:
 * ```css
 * google-chart {
 *   height: 300px;
 *   width: 50em;
 * }
 * ```
 *
 * Data can be provided in one of three ways:
 *
 * - Via the `cols` and `rows` attributes:
 *   ```
 *   cols='[{"label":"Mth", "type":"string"},{"label":"Days", "type":"number"}]'
 *   rows='[["Jan", 31],["Feb", 28],["Mar", 31]]'
 *   ```
 *
 * - Via the `data` attribute, passing in the data directly:
 *   ```
 *   data='[["Month", "Days"], ["Jan", 31], ["Feb", 28], ["Mar", 31]]'
 *   ```
 *
 * - Via the `data` attribute, passing in the URL to a resource containing the
 *   data, in JSON format:
 *   ```
 *   data='http://example.com/chart-data.json'
 *   ```
 *
 * - Via the `data` attribute, passing in a Google DataTable object:
 *   ```
 *   data='{{dataTable}}'
 *   ```
 *
 * - Via the `view` attribute, passing in a Google DataView object:
 *   ```
 *   view='{{dataView}}'
 *   ```
 *
 * You can display the charts in locales other than "en" by setting the `lang`
 * attribute on the `html` tag of your document:
 * ```
 * <html lang="ja">
 * ```
 *
 * @demo demo/index.html
 */
class GoogleChart extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Fired after a chart type is rendered and ready for interaction.
         *
         * @event google-chart-ready
         * @param {{chart: !Object}} detail The raw chart object.
         */
        /**
         * Fired when the user makes a selection in the chart.
         *
         * @event google-chart-select
         * @param {{chart: !Object}} detail The raw chart object.
         */
        /**
         * Type of the chart.
         *
         * Should be one of:
         * - `area`
         * - `(md-)bar`
         * - `bubble`
         * - `calendar`
         * - `candlestick`
         * - `column`
         * - `combo`
         * - `gantt`
         * - `gauge`
         * - `geo`
         * - `histogram`
         * - `(md-)line`
         * - `org`
         * - `pie`
         * - `sankey`
         * - `(md-)scatter`
         * - `stepped-area`
         * - `table`
         * - `timeline`
         * - `treemap`
         * - `wordtree`
         *
         * See <a
         * href="https://google-developers.appspot.com/chart/interactive/docs/gallery">Google
         * Visualization API reference (Chart Gallery)</a> for details.
         */
        this.type = 'column';
        /**
         * Enumerates the chart events that should be fired.
         *
         * Charts support a variety of events. By default, this element only
         * fires on `ready` and `select`. If you would like to be notified of
         * other chart events, use this property to list them.
         * Events `ready` and `select` are always fired.
         *
         * Changes to this property are _not_ observed. Events are attached only
         * at chart construction time.
         */
        this.events = [];
        /**
         * Sets the options for the chart.
         *
         * Example:
         * ```
         * {
         *   title: "Chart title goes here",
         *   hAxis: {title: "Categories"},
         *   vAxis: {title: "Values", minValue: 0, maxValue: 2},
         *   legend: "none"
         * }
         * ```
         * See <a
         * href="https://google-developers.appspot.com/chart/interactive/docs/gallery">Google
         * Visualization API reference (Chart Gallery)</a> for the options available
         * to each chart type.
         *
         * Setting this property always redraws the chart. If you would like to make
         * changes to a sub-property, be sure to reassign the property:
         * ```
         * const options = googleChart.options;
         * options.vAxis.logScale = true;
         * googleChart.options = options;
         * ```
         * (Note: Missing parent properties are not automatically created.)
         */
        this.options = undefined;
        /**
         * Sets the data columns for this object.
         *
         * When specifying data with `cols` you must also specify `rows`, and
         * not specify `data`.
         *
         * Example:
         * <pre>[{label: "Categories", type: "string"},
         *  {label: "Value", type: "number"}]</pre>
         * See <a
         * href="https://google-developers.appspot.com/chart/interactive/docs/reference#DataTable_addColumn">Google
         * Visualization API reference (addColumn)</a> for column definition format.
         */
        this.cols = undefined;
        /**
         * Sets the data rows for this object.
         *
         * When specifying data with `rows` you must also specify `cols`, and
         * not specify `data`.
         *
         * Example:
         * <pre>[["Category 1", 1.0],
         *  ["Category 2", 1.1]]</pre>
         * See <a
         * href="https://google-developers.appspot.com/chart/interactive/docs/reference#addrow">Google
         * Visualization API reference (addRow)</a> for row format.
         */
        this.rows = undefined;
        /**
         * Sets the entire dataset for this object.
         * Can be used to provide the data directly, or to provide a URL from
         * which to request the data.
         *
         * The data format can be a two-dimensional array or the DataTable format
         * expected by Google Charts.
         * See <a
         * href="https://google-developers.appspot.com/chart/interactive/docs/reference#DataTable">Google
         * Visualization API reference (DataTable constructor)</a> for data table
         * format details.
         *
         * When specifying data with `data` you must not specify `cols` or `rows`.
         *
         * Example:
         * ```
         * [["Categories", "Value"],
         *  ["Category 1", 1.0],
         *  ["Category 2", 1.1]]
         * ```
         */
        // Note: type: String, because it is parsed manually in the observer.
        this.data = undefined;
        /**
         * Sets the entire dataset for this object to a Google DataView.
         *
         * See <a
         * href="https://google-developers.appspot.com/chart/interactive/docs/reference#dataview-class">Google
         * Visualization API reference (DataView)</a> for details.
         *
         * When specifying data with `view` you must not specify `data`, `cols` or
         * `rows`.
         */
        this.view = undefined;
        /**
         * Selected datapoint(s) in the chart.
         *
         * An array of objects, each with a numeric row and/or column property.
         * `row` and `column` are the zero-based row or column number of an item
         * in the data table to select.
         *
         * To select a whole column, set row to null;
         * to select a whole row, set column to null.
         *
         * Example:
         * ```
         * [{row:0,column:1}, {row:1, column:null}]
         * ```
         */
        this.selection = undefined;
        /**
         * Whether the chart is currently rendered.
         * @export
         */
        this.drawn = false;
        /**
         * Internal data displayed on the chart.
         */
        // tslint:disable-next-line:enforce-name-casing
        this._data = undefined;
        /**
         * Internal chart object.
         */
        this.chartWrapper = null;
        this.redrawTimeoutId = undefined;
    }
    /** @override */
    render() {
        return html `
      <div id="styles"></div>
      <div id="chartdiv"></div>
    `;
    }
    /** @override */
    firstUpdated() {
        createChartWrapper(this.shadowRoot.getElementById('chartdiv'))
            .then((chartWrapper) => {
            this.chartWrapper = chartWrapper;
            this.typeChanged();
            google.visualization.events.addListener(chartWrapper, 'ready', () => {
                this.drawn = true;
            });
            google.visualization.events.addListener(chartWrapper, 'select', () => {
                this.selection = chartWrapper.getChart().getSelection();
            });
            this.propagateEvents(DEFAULT_EVENTS, chartWrapper);
        });
    }
    /** @override */
    updated(changedProperties) {
        if (changedProperties.has('type'))
            this.typeChanged();
        if (changedProperties.has('rows') || changedProperties.has('cols')) {
            this.rowsOrColumnsChanged();
        }
        if (changedProperties.has('data'))
            this.dataChanged();
        if (changedProperties.has('view'))
            this.viewChanged();
        if (changedProperties.has('_data') ||
            changedProperties.has('options'))
            this.redraw();
        if (changedProperties.has('selection'))
            this.selectionChanged();
    }
    /** Reacts to chart type change. */
    typeChanged() {
        if (this.chartWrapper == null)
            return;
        this.chartWrapper.setChartType(CHART_TYPES[this.type] || this.type);
        const lastChart = this.chartWrapper.getChart();
        google.visualization.events.addOneTimeListener(this.chartWrapper, 'ready', () => {
            // Ready event fires after `chartWrapper` is initialized.
            const chart = this.chartWrapper.getChart();
            if (chart !== lastChart) {
                this.propagateEvents(this.events.filter((eventName) => !DEFAULT_EVENTS.includes(eventName)), chart);
            }
            const stylesDiv = this.shadowRoot.getElementById('styles');
            if (!stylesDiv.children.length) {
                this.localizeGlobalStylesheets(stylesDiv);
            }
            if (this.selection) {
                this.selectionChanged();
            }
        });
        this.redraw();
    }
    /**
     * Adds listeners to propagate events from the chart.
     */
    propagateEvents(events, eventTarget) {
        for (const eventName of events) {
            google.visualization.events.addListener(eventTarget, eventName, (event) => {
                this.dispatchEvent(new CustomEvent(`google-chart-${eventName}`, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        // Events fire after `chartWrapper` is initialized.
                        chart: this.chartWrapper.getChart(),
                        data: event,
                    }
                }));
            });
        }
    }
    /** Sets the selectiton on the chart. */
    selectionChanged() {
        if (this.chartWrapper == null)
            return;
        const chart = this.chartWrapper.getChart();
        if (chart == null)
            return;
        if (chart.setSelection) {
            // Workaround for timeline chart which emits select event on setSelection.
            // See issue #256.
            if (this.type === 'timeline') {
                const oldSelection = JSON.stringify(chart.getSelection());
                const newSelection = JSON.stringify(this.selection);
                if (newSelection === oldSelection)
                    return;
            }
            chart.setSelection(this.selection);
        }
    }
    /**
     * Redraws the chart.
     *
     * Called automatically when data/type/selection attributes change.
     * Call manually to handle view updates, page resizes, etc.
     */
    redraw() {
        if (this.chartWrapper == null || this._data == null)
            return;
        // `ChartWrapper` can be initialized with `DataView` instead of `DataTable`.
        this.chartWrapper.setDataTable(this._data);
        this.chartWrapper.setOptions(this.options || {});
        this.drawn = false;
        if (this.redrawTimeoutId !== undefined)
            clearTimeout(this.redrawTimeoutId);
        this.redrawTimeoutId = window.setTimeout(() => {
            // Drawing happens after `chartWrapper` is initialized.
            this.chartWrapper.draw();
        }, 5);
    }
    /**
     * Returns the chart serialized as an image URI.
     *
     * Call this after the chart is drawn (`google-chart-ready` event).
     */
    get imageURI() {
        if (this.chartWrapper == null)
            return null;
        const chart = this.chartWrapper.getChart();
        return chart && chart.getImageURI();
    }
    /** Handles changes to the `view` attribute. */
    viewChanged() {
        if (!this.view)
            return;
        this._data = this.view;
    }
    /** Handles changes to the rows & columns attributes. */
    async rowsOrColumnsChanged() {
        const { rows, cols } = this;
        if (!rows || !cols)
            return;
        try {
            const dt = await dataTable({ cols });
            dt.addRows(rows);
            this._data = dt;
        }
        catch (reason) {
            this.shadowRoot.getElementById('chartdiv').textContent = reason;
        }
    }
    /**
     * Handles changes to the `data` attribute.
     */
    dataChanged() {
        let data = this.data;
        let dataPromise;
        if (!data) {
            return;
        }
        let isString = false;
        // Polymer 2 will not call observer if type:Object is set and fails, so
        // we must parse the string ourselves.
        try {
            // Try to deserialize the value of the `data` property which might be a
            // serialized array.
            data = JSON.parse(data);
        }
        catch (e) {
            isString = typeof data === 'string' || data instanceof String;
        }
        if (isString) {
            // Load data asynchronously, from external URL.
            dataPromise = fetch(data).then(response => response.json());
        }
        else {
            // Data is all ready to be processed.
            dataPromise = Promise.resolve(data);
        }
        dataPromise.then(dataTable).then(data => {
            this._data = data;
        });
    }
    /**
     * Queries global document head for Google Charts `link#load-css-*` and clones
     * them into the local root's `div#styles` element for shadow dom support.
     */
    localizeGlobalStylesheets(stylesDiv) {
        // Get all Google Charts stylesheets.
        const stylesheets = Array.from(document.head.querySelectorAll('link[rel="stylesheet"][type="text/css"][id^="load-css-"]'));
        for (const stylesheet of stylesheets) {
            // Clone necessary stylesheet attributes.
            const clonedStylesheet = document.createElement('link');
            clonedStylesheet.setAttribute('rel', 'stylesheet');
            clonedStylesheet.setAttribute('type', 'text/css');
            // `href` is always present.
            clonedStylesheet.setAttribute('href', stylesheet.getAttribute('href'));
            stylesDiv.appendChild(clonedStylesheet);
        }
    }
}
/** @nocollapse */
GoogleChart.styles = css `
    :host {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      margin: 0;
      padding: 0;
      width: 400px;
      height: 300px;
    }

    :host([hidden]) {
      display: none;
    }

    :host([type="gauge"]) {
      width: 300px;
      height: 300px;
    }

    #chartdiv {
      width: 100%;
    }

    /* Workaround for slow initial ready event for tables. */
    .google-visualization-table-loadtest {
      padding-left: 6px;
    }
  `;
__decorate$4([
    property({ type: String, reflect: true })
], GoogleChart.prototype, "type", void 0);
__decorate$4([
    property({ type: Array })
], GoogleChart.prototype, "events", void 0);
__decorate$4([
    property({ type: Object, hasChanged: () => true })
], GoogleChart.prototype, "options", void 0);
__decorate$4([
    property({ type: Array })
], GoogleChart.prototype, "cols", void 0);
__decorate$4([
    property({ type: Array })
], GoogleChart.prototype, "rows", void 0);
__decorate$4([
    property({ type: String })
], GoogleChart.prototype, "data", void 0);
__decorate$4([
    property({ type: Object })
], GoogleChart.prototype, "view", void 0);
__decorate$4([
    property({ type: Array })
], GoogleChart.prototype, "selection", void 0);
__decorate$4([
    property({ type: Object })
], GoogleChart.prototype, "_data", void 0);
customElements.define('google-chart', GoogleChart);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
let WcDashboardPage = class WcDashboardPage extends h {
    constructor() {
        super();
        this.loadTemplatesDebounce = new ValueDebounce((value) => __awaiter$1(this, void 0, void 0, function* () {
            const apiResponse = yield api.loadOrders(value);
            if (apiResponse instanceof ServerErrorResponse) {
                this.showError(apiResponse);
            }
            else {
                this.data = apiResponse;
            }
        }));
        const date = new Date();
        date.setDate(date.getDate() - 30);
        this.state = new SearchOrders({
            templateName: '',
            origin: '',
            productType: '',
            externalOrderId: '',
            startDate: date
        });
    }
    static get styles() {
        return [dashboardStyles];
    }
    ;
    setState(nobs) {
        this.state = new SearchOrders(nobs, this.state);
    }
    ;
    showError(error) {
        console.log('error msg: ', error.message, 'error code: ', error.code);
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        const model = this.state.toDto();
        this.loadTemplatesDebounce.immediate(model);
    }
    ;
    renderStatistics() {
        return new WcPrintjobsStatistics(this.data);
    }
    ;
    render() {
        console.log('dashboard', this.data);
        return T `
      <div class="dashboard">
        <h3 class="topic">Dashboard</h3>
        <p class="subtopic">Printjobs Statistics</p>

        <div class="statistics-container">
          ${this.renderStatistics()}
        </div>

        <!-- <div class="daily-printjobs">
          <google-chart style="width: 100%"
            type='line'
            data='[["Bar", "Height" ], ["Bar 1", 10], ["Bar 2", 14], ["Bar 3", 16], ["Bar 4", 22],["Bar 5", 28]]'>
          </google-chart>
        </div> -->
      </div>
  `;
    }
    ;
};
__decorate$3([
    e$1({ attribute: false, type: Object })
], WcDashboardPage.prototype, "state", void 0);
__decorate$3([
    e$1({ attribute: false, type: Object })
], WcDashboardPage.prototype, "data", void 0);
WcDashboardPage = __decorate$3([
    n$1("wc-dashboard-page")
], WcDashboardPage);

const paymentStyles = r$1 `
  .payment-page {
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
  }
  
  .icons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .icon {
    margin: 20px;
    padding-top: 10px;
    font-size: 12px;
  }

  wc-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }
  }
`;

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcPaymentPage = class WcPaymentPage extends h {
    constructor() {
        super(...arguments);
        this.wcicons = ["page-light", "coin-light", "coin", "page-inverse", "calendar-light", "calendar-alt", "clock-light", "sync-alt", "coins", "database", "angle-left", "angle-right", "chevron-left", "chevron-right", "filter-reset", "compact-disc", "chevron-double-down-duotone", "image", "portrait", "bezier", "text", "pathText", "magnet", "pointer", "close-square", "close", "docRef", "collapseLeft", "expandLeft", "edit", "pen", "pencil-ruler", "plus", "plus-circle", "plus-square", "minus", "shapes", "square", "settings", "vector-shape", "address-card", "paperclip", "facing-pages", "page", "cog", "perspective", "style", "story", "text-flow", "exchange", "text-align-justify-justify", "text-align-justify-left", "text-align-justify-right", "text-align-justify-center", "text-align-left", "text-align-right", "text-align-center", "check", "check-square", "user-circle", "user-solid", "user-crown-solid", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "arrows", "arrows-circle", "arrows-h", "arrows-v", "carret-down-solid", "carret-right-solid", "text-size", "text-width", "line-height", "line-width", "palette", "brush", "undo", "undo-solid", "redo", "redo-solid", "copy", "copy-solid", "paste", "cut", "object-ungroup", "trash", "trash-solid", "remove-format", "clipboard", "search-plus", "search-minus", "search-light", "save", "slash", "empty", "cloud-upload-alt", "folder-open-solid", "tint", "warp-arc", "warp-flag", "warp-bulge", "warp-arc-upper", "warp-pit-upper", "warp-arc-lower", "warp-pit-lower", "warp-fish", "warp-squeeze", "warp-mug", "mesh", "crop", "fill-image", "fit-image", "vertical-align-bottom-baseline", "vertical-align-center-baseline", "vertical-align-center", "vertical-align-top", "vertical-align-bottom", "warning", "effects", "robot", "microchip", "record", "play", "running", "rotator", "lock-closed", "lock-open", "lock-closed-solid", "user-lock-closed", "user-lock-opened", "link", "stroke-cap-round", "stroke-cap-projecting", "stroke-cap-butt", "stroke-align-center", "stroke-align-inside", "stroke-align-outside", "stroke-join-miter", "stroke-join-round", "stroke-join-bevel", "wrap-both-sides", "no-wrap", "printess-wand", "print-solid", "shopping-cart", "shopping-cart-solid", "shopping-cart-add", "folder-plus", "eye-solid", "eye-solid-slash", "font", "send-back", "send-backward", "bring-front", "bring-forward", "distort", "list-ul", "ellipsis-v", "sun-light", "adjust", "scroll-old", "align-top", "align-middle", "align-bottom", "align-left", "align-center", "align-right", "space-vertical-around", "space-vertical-between", "space-horizontal-around", "space-horizontal-between", "layer-group", "ruler", "layout-snippet", "layout-snippet-invers", "group-snippet", "group-snippet-invers", "primary-doc", "primary-doc-invers", "preview-doc", "preview-doc-invers", "production-doc", "production-doc-invers", "facebook-round", "clock-solid", "page-plus-solid", "user-friends-solid", "opacity", "file-invoice", "help", "triangle-solid", "mirror-x", "mirror-y"].sort();
    }
    static get styles() {
        return [paymentStyles];
    }
    ;
    render() {
        return T `
            <div class="payment-page">
                <h3 class="topic">Payments</h3>
                <p class="subtopic">Order list</p>
            
                <div class="icons">
                    ${this.wcicons.map((icon) => T `<p class="icon">
                        <wc-icon primaryColor="green" icon="${icon}"></wc-icon><span>${icon}</span>
                    </p>`)}
                </div>
            </div>
        `;
    }
    ;
};
__decorate$2([
    e$1({ type: Array })
], WcPaymentPage.prototype, "wcicons", void 0);
WcPaymentPage = __decorate$2([
    n$1("wc-payment-page")
], WcPaymentPage);

const layoutStyles = r$1 `
  .account-layout {
    font-family: var(--printess-font);
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 200px 1fr;
  }

  #user-content {
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 40px 50px;
    overflow-y: scroll;
  }
  
  .drawer {
    background-color: #ececec;
    grid-column: 1/2;
    grid-row: 2/3;
    border-right: 1px solid #1a39601a;
    outline: none;
    padding: 50px;
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
      display: flex;
      flex-direction: column;
      height: auto;
      padding: 0;
      z-index: 10;
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
    background-color: var(--printess-navbar-blue);
    padding-left: 70.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    color: #222;
    font-family: var(--printess-font);
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    color: #555555;
  }

  .selected {
    color: var(--printess-pink);
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
      top: 17px;
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

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcAppDrawer = class WcAppDrawer extends h {
    constructor(selectedDrawer) {
        super();
        this.selectedDrawer = 'dashboard';
        this.drawerOpen = false;
        this.debug = window.location.hostname === 'localhost' || window.location.href.indexOf('debug=1') > 0 || window.printessDebug === true;
        this.drawers = [{
                name: 'dashboard',
                title: 'Dashboard'
            }, {
                name: 'account',
                title: 'User Profile'
            }, {
                name: 'templates',
                title: 'Templates'
            }, {
                name: 'printJobs',
                title: 'Print Jobs'
            }, {
                name: 'editor',
                title: 'Editor'
            }, {
                name: 'payment',
                title: 'Payment'
            }, {
                name: 'settings',
                title: 'Settings'
            }];
        this.publicDrawer = [{
                name: 'dashboard',
                title: 'Dashboard'
            }, {
                name: 'account',
                title: 'User Profile'
            }, {
                name: 'printJobs',
                title: 'Print Jobs'
            }, {
                name: 'editor',
                title: 'Editor'
            }];
        this.selectedDrawer = selectedDrawer;
    }
    static get styles() {
        return [drawerStyles];
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
        ${this.debug ? this.drawers.map(d => T `<div class="tab ${this.selectedDrawer === d.name ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${() => this.setDrawerSelection(d.name)}>${d.title}<wc-icon class=${d.name === "editor" ? '' : 'hidden'} primaryColor=${this.selectedDrawer === 'editor' ? 'pink' : 'gray'} icon="printess-wand" style="margin-left: 10px; width: 17px; height: 17px;"></wc-icon></div>`) :
            this.publicDrawer.map(d => T `<div class="tab ${this.selectedDrawer === d.name ? "selected" : ""}"  style="display: flex; align-items: center;"
          @click=${() => this.setDrawerSelection(d.name)}>${d.title}<wc-icon class=${d.name === "editor" ? '' : 'hidden'} primaryColor=${this.selectedDrawer === 'editor' ? 'pink' : 'gray'} icon="printess-wand" style="margin-left: 10px; width: 17px; height: 17px;"></wc-icon></div>`)}
      </aside>
    `;
    }
    ;
};
__decorate$1([
    e$1({ type: String })
], WcAppDrawer.prototype, "selectedDrawer", void 0);
WcAppDrawer = __decorate$1([
    n$1("wc-app-drawer")
], WcAppDrawer);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WcAppLayout = class WcAppLayout extends h {
    constructor() {
        super(...arguments);
        this.selectedDrawer = 'dashboard';
        this.drawerOpen = false;
    }
    static get styles() {
        return [layoutStyles, navbarStyles];
    }
    ;
    render() {
        return T `
        <div class="account-layout">
            <header>                
                <a href="https://printess.com" id="printess-logo"></a>
                <div class="user-icon" style="margin-right: 40px;">
                    <wc-icon @mousedown=${(e) => this.userClick(e)} icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
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
    openDrawer() {
        this.drawerOpen = !this.drawerOpen;
        this.requestUpdate();
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
            case ('account'): return new WcAccountPage();
            case ('templates'): return new WcTemplatesPage();
            case ('printJobs'): return new WcPrintjobsPage();
            case ('dashboard'): return new WcDashboardPage();
            case ('editor'):
                window.open('https://editor.printess.com/', '_self');
                break;
            case ('payment'): return new WcPaymentPage();
            case ('settings'): return T `<p>not implemented</p>`;
            default: assertNever(this.selectedDrawer);
        }
    }
    ;
    userClick(e) {
        showCtxMenu(e, [
            {
                caption: currentUser.displayName,
                disabled: true
            },
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
    e$1({ type: String })
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

class JOSEError extends Error {
    constructor(message) {
        super(message);
        this.code = JOSEError.code;
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
JOSEError.code = 'ERR_JOSE_GENERIC';
class JWTClaimValidationFailed extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = JWTClaimValidationFailed.code;
        this.claim = claim;
        this.reason = reason;
    }
}
JWTClaimValidationFailed.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
class JOSEAlgNotAllowed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JOSEAlgNotAllowed.code;
    }
}
JOSEAlgNotAllowed.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
class JOSENotSupported extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JOSENotSupported.code;
    }
}
JOSENotSupported.code = 'ERR_JOSE_NOT_SUPPORTED';
class JWSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWSInvalid.code;
    }
}
JWSInvalid.code = 'ERR_JWS_INVALID';
class JWTInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWTInvalid.code;
    }
}
JWTInvalid.code = 'ERR_JWT_INVALID';
class JWSSignatureVerificationFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWSSignatureVerificationFailed.code;
        this.message = 'signature verification failed';
    }
}
JWSSignatureVerificationFailed.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
class JWTExpired extends JWTClaimValidationFailed {
    constructor() {
        super(...arguments);
        this.code = JWTExpired.code;
    }
}
JWTExpired.code = 'ERR_JWT_EXPIRED';

const encoder = new TextEncoder();
const decoder = new TextDecoder();
function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    buffers.forEach((buffer) => {
        buf.set(buffer, i);
        i += buffer.length;
    });
    return buf;
}

const isDisjoint = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters) {
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};

function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}

const checkKeyType = (alg, key) => {
    if (alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        alg.match(/^A\d{3}(?:GCM)KW$/)) {
        if (key instanceof Uint8Array || key.type === 'secret') {
            return;
        }
        throw new TypeError('CryptoKey or KeyObject instances for symmetric algorithms must be of type "secret"');
    }
    if (key instanceof Uint8Array) {
        throw new TypeError('CryptoKey or KeyObject instances must be used for asymmetric algorithms');
    }
    if (key.type === 'secret') {
        throw new TypeError('CryptoKey or KeyObject instances for asymmetric algorithms must not be of type "secret"');
    }
};

function getGlobal() {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    throw new Error('unable to locate global object');
}
var globalThis$1 = getGlobal();

const decode = (input) => {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    try {
        return new Uint8Array(globalThis$1
            .atob(encoded)
            .split('')
            .map((c) => c.charCodeAt(0)));
    }
    catch (_a) {
        throw new TypeError('The input to be decoded is not correctly encoded.');
    }
};

function subtleDsa(alg) {
    switch (alg) {
        case 'HS256':
            return { hash: { name: 'SHA-256' }, name: 'HMAC' };
        case 'HS384':
            return { hash: { name: 'SHA-384' }, name: 'HMAC' };
        case 'HS512':
            return { hash: { name: 'SHA-512' }, name: 'HMAC' };
        case 'PS256':
            return {
                hash: { name: 'SHA-256' },
                name: 'RSA-PSS',
                saltLength: 256 >> 3,
            };
        case 'PS384':
            return {
                hash: { name: 'SHA-384' },
                name: 'RSA-PSS',
                saltLength: 384 >> 3,
            };
        case 'PS512':
            return {
                hash: { name: 'SHA-512' },
                name: 'RSA-PSS',
                saltLength: 512 >> 3,
            };
        case 'RS256':
            return { hash: { name: 'SHA-256' }, name: 'RSASSA-PKCS1-v1_5' };
        case 'RS384':
            return { hash: { name: 'SHA-384' }, name: 'RSASSA-PKCS1-v1_5' };
        case 'RS512':
            return { hash: { name: 'SHA-512' }, name: 'RSASSA-PKCS1-v1_5' };
        case 'ES256':
            return { hash: { name: 'SHA-256' }, name: 'ECDSA', namedCurve: 'P-256' };
        case 'ES384':
            return { hash: { name: 'SHA-384' }, name: 'ECDSA', namedCurve: 'P-384' };
        case 'ES512':
            return { hash: { name: 'SHA-512' }, name: 'ECDSA', namedCurve: 'P-521' };
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

var crypto = globalThis$1.crypto;
function isCryptoKey(key) {
    if (typeof globalThis$1.CryptoKey === 'undefined') {
        return false;
    }
    return key != null && key instanceof globalThis$1.CryptoKey;
}

var checkKeyLength = (alg, key) => {
    if (alg.startsWith('HS')) {
        const bitlen = parseInt(alg.substr(-3), 10);
        const { length } = key.algorithm;
        if (typeof length !== 'number' || length < bitlen) {
            throw new TypeError(`${alg} requires symmetric keys to be ${bitlen} bits or larger`);
        }
    }
    if (alg.startsWith('RS') || alg.startsWith('PS')) {
        const { modulusLength } = key.algorithm;
        if (typeof modulusLength !== 'number' || modulusLength < 2048) {
            throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
        }
    }
};

function getCryptoKey(alg, key, usage) {
    if (isCryptoKey(key)) {
        return key;
    }
    if (key instanceof Uint8Array) {
        if (!alg.startsWith('HS')) {
            throw new TypeError('symmetric keys are only applicable for HMAC-based algorithms');
        }
        return crypto.subtle.importKey('raw', key, { hash: { name: `SHA-${alg.substr(-3)}` }, name: 'HMAC' }, false, [usage]);
    }
    throw new TypeError('invalid key input');
}

const verify = async (alg, key, signature, data) => {
    const cryptoKey = await getCryptoKey(alg, key, 'verify');
    checkKeyLength(alg, cryptoKey);
    const algorithm = subtleDsa(alg);
    try {
        return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
    }
    catch (_a) {
        return false;
    }
};

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) ||
        protectedHeader.crit.length === 0 ||
        protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    }
    else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
            throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}

const validateAlgorithms = (option, algorithms) => {
    if (algorithms !== undefined &&
        (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};

const checkExtensions = validateCrit.bind(undefined, JWSInvalid, new Map([['b64', true]]));
const checkAlgOption = validateAlgorithms.bind(undefined, 'algorithms');
async function flattenedVerify(jws, key, options) {
    var _a;
    if (!isObject(jws)) {
        throw new JWSInvalid('Flattened JWS must be an object');
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== 'string') {
        throw new JWSInvalid('JWS Protected Header incorrect type');
    }
    if (jws.payload === undefined) {
        throw new JWSInvalid('JWS Payload missing');
    }
    if (typeof jws.signature !== 'string') {
        throw new JWSInvalid('JWS Signature missing or incorrect type');
    }
    if (jws.header !== undefined && !isObject(jws.header)) {
        throw new JWSInvalid('JWS Unprotected Header incorrect type');
    }
    let parsedProt = {};
    if (jws.protected) {
        const protectedHeader = decode(jws.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader));
    }
    if (!isDisjoint(parsedProt, jws.header)) {
        throw new JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header,
    };
    const extensions = checkExtensions(options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has('b64')) {
        b64 = parsedProt.b64;
        if (typeof b64 !== 'boolean') {
            throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && checkAlgOption(options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== 'string') {
            throw new JWSInvalid('JWS Payload must be a string');
        }
    }
    else if (typeof jws.payload !== 'string' && !(jws.payload instanceof Uint8Array)) {
        throw new JWSInvalid('JWS Payload must be a string or an Uint8Array instance');
    }
    if (typeof key === 'function') {
        key = await key(parsedProt, jws);
    }
    checkKeyType(alg, key);
    const data = concat(encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ''), encoder.encode('.'), typeof jws.payload === 'string' ? encoder.encode(jws.payload) : jws.payload);
    const signature = decode(jws.signature);
    const verified = await verify(alg, key, signature, data);
    if (!verified) {
        throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        payload = decode(jws.payload);
    }
    else if (typeof jws.payload === 'string') {
        payload = encoder.encode(jws.payload);
    }
    else {
        payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    return result;
}

async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = decoder.decode(jws);
    }
    if (typeof jws !== 'string') {
        throw new JWSInvalid('Compact JWS must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split('.');
    if (length !== 3) {
        throw new JWSInvalid('Invalid Compact JWS');
    }
    const verified = await flattenedVerify({
        payload: (payload || undefined),
        protected: protectedHeader || undefined,
        signature: (signature || undefined),
    }, key, options);
    return { payload: verified.payload, protectedHeader: verified.protectedHeader };
}

var epoch = (date) => Math.floor(date.getTime() / 1000);

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
var secs = (str) => {
    const matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError('invalid time period format');
    }
    const value = parseFloat(matched[1]);
    const unit = matched[2].toLowerCase();
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            return Math.round(value);
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            return Math.round(value * minute);
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            return Math.round(value * hour);
        case 'day':
        case 'days':
        case 'd':
            return Math.round(value * day);
        case 'week':
        case 'weeks':
        case 'w':
            return Math.round(value * week);
        default:
            return Math.round(value * year);
    }
};

const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
var jwtPayload = (protectedHeader, encodedPayload, options = {}) => {
    const { typ } = options;
    if (typ &&
        (typeof protectedHeader.typ !== 'string' ||
            normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', 'typ', 'check_failed');
    }
    let payload;
    try {
        payload = JSON.parse(decoder.decode(encodedPayload));
    }
    catch (_a) {
    }
    if (!isObject(payload)) {
        throw new JWTInvalid('JWT Claims Set must be a top-level JSON object');
    }
    const { issuer } = options;
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new JWTClaimValidationFailed('unexpected "iss" claim value', 'iss', 'check_failed');
    }
    const { subject } = options;
    if (subject && payload.sub !== subject) {
        throw new JWTClaimValidationFailed('unexpected "sub" claim value', 'sub', 'check_failed');
    }
    const { audience } = options;
    if (audience &&
        !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
        throw new JWTClaimValidationFailed('unexpected "aud" claim value', 'aud', 'check_failed');
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
        case 'string':
            tolerance = secs(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = epoch(currentDate || new Date());
    if (payload.iat !== undefined || options.maxTokenAge) {
        if (typeof payload.iat !== 'number') {
            throw new JWTClaimValidationFailed('"iat" claim must be a number', 'iat', 'invalid');
        }
        if (payload.exp === undefined && payload.iat > now + tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
        }
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', 'exp', 'check_failed');
        }
    }
    if (options.maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof options.maxTokenAge === 'number' ? options.maxTokenAge : secs(options.maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
        }
    }
    return payload;
};

async function jwtVerify(jwt, key, options) {
    var _a;
    const verified = await compactVerify(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes('b64')) && verified.protectedHeader.b64 === false) {
        throw new JWTInvalid('JWTs MUST NOT use unencoded payload');
    }
    const payload = jwtPayload(verified.protectedHeader, verified.payload, options);
    return { payload, protectedHeader: verified.protectedHeader };
}

function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch (jwk.kty) {
        case 'oct': {
            switch (jwk.alg) {
                case 'HS256':
                case 'HS384':
                case 'HS512':
                    algorithm = { name: 'HMAC', hash: { name: `SHA-${jwk.alg.substr(-3)}` } };
                    keyUsages = ['sign', 'verify'];
                    break;
                case 'A128CBC-HS256':
                case 'A192CBC-HS384':
                case 'A256CBC-HS512':
                    throw new JOSENotSupported(`${jwk.alg} keys cannot be imported as CryptoKey instances`);
                case 'A128GCM':
                case 'A192GCM':
                case 'A256GCM':
                case 'A128GCMKW':
                case 'A192GCMKW':
                case 'A256GCMKW':
                    algorithm = { name: 'AES-GCM' };
                    keyUsages = ['encrypt', 'decrypt'];
                    break;
                case 'A128KW':
                case 'A192KW':
                case 'A256KW':
                    algorithm = { name: 'AES-KW' };
                    keyUsages = ['wrapKey', 'unwrapKey'];
                    break;
                case 'PBES2-HS256+A128KW':
                case 'PBES2-HS384+A192KW':
                case 'PBES2-HS512+A256KW':
                    algorithm = { name: 'PBKDF2' };
                    keyUsages = ['deriveBits'];
                    break;
                default:
                    throw new JOSENotSupported('unsupported or invalid JWK "alg" (Algorithm) Parameter value');
            }
            break;
        }
        case 'RSA': {
            switch (jwk.alg) {
                case 'PS256':
                case 'PS384':
                case 'PS512':
                    algorithm = { name: 'RSA-PSS', hash: { name: `SHA-${jwk.alg.substr(-3)}` } };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'RS256':
                case 'RS384':
                case 'RS512':
                    algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: { name: `SHA-${jwk.alg.substr(-3)}` } };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'RSA-OAEP':
                case 'RSA-OAEP-256':
                case 'RSA-OAEP-384':
                case 'RSA-OAEP-512':
                    algorithm = {
                        name: 'RSA-OAEP',
                        hash: { name: `SHA-${parseInt(jwk.alg.substr(-3), 10) || 1}` },
                    };
                    keyUsages = jwk.d ? ['decrypt', 'unwrapKey'] : ['encrypt', 'wrapKey'];
                    break;
                default:
                    throw new JOSENotSupported('unsupported or invalid JWK "alg" (Algorithm) Parameter value');
            }
            break;
        }
        case 'EC': {
            switch (jwk.alg) {
                case 'ES256':
                case 'ES384':
                case 'ES512':
                    algorithm = { name: 'ECDSA', namedCurve: jwk.crv };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'ECDH-ES':
                case 'ECDH-ES+A128KW':
                case 'ECDH-ES+A192KW':
                case 'ECDH-ES+A256KW':
                    algorithm = { name: 'ECDH', namedCurve: jwk.crv };
                    keyUsages = jwk.d ? ['deriveBits'] : [];
                    break;
                default:
                    throw new JOSENotSupported('unsupported or invalid JWK "alg" (Algorithm) Parameter value');
            }
            break;
        }
        default:
            throw new JOSENotSupported('unsupported or invalid JWK "kty" (Key Type) Parameter value');
    }
    return { algorithm, keyUsages };
}
const parse = async (jwk) => {
    var _a, _b;
    const { algorithm, keyUsages } = subtleMapping(jwk);
    let format = 'jwk';
    let keyData = { ...jwk };
    delete keyData.alg;
    if (algorithm.name === 'PBKDF2') {
        format = 'raw';
        keyData = decode(jwk.k);
    }
    return crypto.subtle.importKey(format, keyData, algorithm, (_a = jwk.ext) !== null && _a !== void 0 ? _a : false, (_b = jwk.key_ops) !== null && _b !== void 0 ? _b : keyUsages);
};

async function parseJwk(jwk, alg, octAsKeyObject) {
    if (!isObject(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg || (alg = jwk.alg);
    if (typeof alg !== 'string' || !alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    switch (jwk.kty) {
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : (octAsKeyObject = jwk.ext !== true);
            if (octAsKeyObject) {
                return parse({ ...jwk, alg, ext: false });
            }
            return decode(jwk.k);
        case 'RSA':
            if (jwk.oth !== undefined) {
                throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return parse({ ...jwk, alg });
        default:
            throw new JOSENotSupported('unsupported "kty" (Key Type) Parameter value');
    }
}

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
const apiEndpoint = "api.printess.com";
const adm = {
    useAdminMode: false,
    canUseAdminMode: false
};
const api = new PrintessApi('https://' + apiEndpoint);
const adminApi = new PrintessAdminApi('https://' + apiEndpoint);
let currentUser = {
    id: '',
    displayName: '',
    eMailAddress: '',
    isEmailAddressVerified: false,
    lastLogin: new Date(),
    code: '',
    isActivated: false
};
const wcAppLayout = new WcAppLayout();
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
            const localDate = new Date(user.metadata.lastSignInTime);
            currentUser = {
                id: user.uid,
                displayName: user.displayName,
                eMailAddress: user.email,
                isEmailAddressVerified: user.emailVerified,
                lastLogin: localDate,
                code: user.providerData[0].photoURL,
                isActivated: false
            };
            setDisplay("userAccount", "");
            yield printessLogin(user);
        }
        else {
            setDisplay("loginPage", "");
        }
    });
});
function readTokenData(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rsaPublicKey = yield parseJwk({
                kty: 'RSA',
                e: 'AQAB',
                n: 'wXIBXKQ_dpETu27jq5mx2blcCqrjvF5B0zuI4I1O3LJjOFqEKJrfIfVxVNf9er4qfQquSLaNYf_780rtUZTZkqX5rittfeTiQqzMVuFwipmfNdqlFMJeJiZAlZRq_t1BOQ9FxaE2Iz85eo_uWxT_tcXYDVPiLn-SzJNV2BNrLOvE1Qb3fqz3t-Tol4LudlcNI_-1DWRGTqHlllC6BUivFfbaBbCJBK1zTHJNtzXDvpNvADJWzmbRn8mBUcRjNFqPwUX6dwa_SudQ0oKvuBJXJhaxo1mfNntJj2UIOuJDBrNqEmY8uaUjNHzAtrzh2YUaTwaG6R6vdGlDsbqXWV6m966Y1KZP2tMv1cMyD0EgfOBGLKp98MY8uO3KvvN_8lfSyHbHMAz-I_0Gd7n1LjRUIFGmrXHp-xnyiZw3MuwhVyIP9JUzH87HQ5OlOfSJeaknqa9mWvoMldD0LnUdiaVXef7icTMjppykadj8rOiC5VAmhL6Cm_EL_GFLmylyQ5cSW0b6ns6ufO-3OuIAaxd5iacuIkgZr1ZX-r_ViA4lUnjl2fp-DEi_-BZPQCVzvwWE8QNKxTMpj1qm2rIvR1cWDcxQNuoyJEAEynk_b0vUxaWiu91dNgUtmC8AOunCxr7Hj41YBJPhRI2I985MF4xRLWISLhFmkttT0NpWUxzxsf0'
            }, 'RS256');
            const { payload } = yield jwtVerify(token, rsaPublicKey, {
                issuer: "Printess GmbH & Co.KG",
                audience: "printess-saas"
            });
            if (payload.role) {
                if (typeof payload.role === "string") {
                    if (payload.role === "admin") {
                        adm.canUseAdminMode = true;
                    }
                }
                else {
                    const roles = payload.role;
                    roles.forEach(role => {
                        if (role === "admin") {
                            adm.canUseAdminMode = true;
                        }
                    });
                }
            }
        }
        catch (error) {
            console.error(error);
        }
        if (adm.canUseAdminMode) {
            adm.useAdminMode = true;
        }
    });
}
function printessLogin(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = yield user.getIdToken();
        const apiResponse = yield api.loginWithGoogleAuthToken(authToken);
        if (apiResponse instanceof ServerErrorResponse) {
            alert(apiResponse.message);
            setDisplay("loginPage", "");
        }
        else {
            setDisplay("loginPage", "none");
            adminApi.token = apiResponse.token;
            api.token = apiResponse.token;
            yield readTokenData(apiResponse.token);
            const controlHost = document.getElementById('userAccount');
            controlHost === null || controlHost === void 0 ? void 0 : controlHost.append(wcAppLayout);
            const head = document.getElementsByTagName('head')[0];
            const s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            s.appendChild(document.createTextNode(masterStyles.toString()));
            head.appendChild(s);
        }
    });
}
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

export { adm, api, apiEndpoint, currentUser, logoutFunc };
