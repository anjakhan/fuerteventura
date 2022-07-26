var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { firebase, signinUser, signinWithGoogle } from "./code/firebase.js";
import { WcAppLayout } from "./components/app-layout/WcAppLayout";
import { masterStyles } from "./styles.js";
const wcAppLayout = new WcAppLayout();
export let appUser = 'user';
function setDisplay(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.style.display = value;
    }
}
;
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
export const logoutFunc = () => {
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
    ;
});
//# sourceMappingURL=adminIndex.js.map