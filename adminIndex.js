var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f;
import { firebase, signinUser, signinWithGoogle, signinWithPhone } from "./code/firebase.js";
import { WcAppLayout } from "./components/app-layout/WcAppLayout";
import { WcDialogResetPassword } from "./components/dialogs/WcDialogResetPassword.js";
import { masterStyles } from "./styles.js";
export const adm = {
    useAdminMode: false,
    canUseAdminMode: false,
    isPinnedUser: false
};
export let currentUser = {
    id: '',
    displayName: '',
    eMailAddress: '',
    phone: '',
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
(_a = document.getElementById("passwordCtrl")) === null || _a === void 0 ? void 0 : _a.addEventListener("keyup", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    if (event.key === "Enter" || event.which === 13) {
        event.preventDefault();
        (_g = document.getElementById("createAccountCtrl")) === null || _g === void 0 ? void 0 : _g.click();
    }
}));
(_b = document.getElementById("createAccountCtrl")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const email = (_h = document.getElementById("emailCtrl")) === null || _h === void 0 ? void 0 : _h.value;
    const pwd = (_j = document.getElementById("passwordCtrl")) === null || _j === void 0 ? void 0 : _j.value;
    yield signinUser(email, pwd);
}));
(_c = document.getElementById("google-signin")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield signinWithGoogle();
}));
(_d = document.getElementById("phone-signin")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield signinWithPhone();
}));
firebase.auth().onAuthStateChanged(function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user) {
            const localDate = new Date(user.metadata.lastSignInTime);
            currentUser = {
                id: user.uid,
                displayName: user.displayName,
                eMailAddress: user.email,
                phone: user.phone,
                isEmailAddressVerified: user.emailVerified,
                lastLogin: localDate,
                code: user.providerData[0].photoURL,
                isActivated: false
            };
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
(_e = document.getElementById("eye")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
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
(_f = document.getElementById("password-reset")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    const td = new WcDialogResetPassword();
    td.showDialog();
    return td;
});
//# sourceMappingURL=adminIndex.js.map