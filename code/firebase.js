var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const firebase = window.firebase;
const config = {
    apiKey: "AIzaSyCDUKsrnycenQiUaqr3fQ2cmj4bnhOtta4",
    authDomain: "phone-auth-test-35d0b.firebaseapp.com",
    projectId: "phone-auth-test-35d0b",
    storageBucket: "phone-auth-test-35d0b.appspot.com",
    messagingSenderId: "78922657454",
    appId: "1:78922657454:web:ce7cc4d2823e6570dbc73f"
};
firebase.initializeApp(config);
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
export function signinWithGoogle() {
    return __awaiter(this, void 0, void 0, function* () {
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
export function signinWithPhone() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("phone signin");
        firebase.auth().useDeviceLanguage();
    });
}
export function createUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userCredential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
            userCredential.user.updateProfile({ displayName: name });
            return userCredential;
        }
        catch (error) {
            const errorCode = error.code;
            checkErrorCode(errorCode);
            throw error;
        }
    });
}
export function signinUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
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
export function changePassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = firebase.auth().currentUser;
            yield user.updatePassword(password);
            alert("Password changed successfully!");
        }
        catch (error) {
            alert(error.message);
            throw error;
        }
    });
}
export function sendPasswordResetMail(email = firebase.auth().currentUser.email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield firebase.auth().sendPasswordResetEmail(email);
        }
        catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            alert(error.message);
            throw error;
        }
    });
}
export function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = firebase.auth().currentUser;
            yield user.delete();
        }
        catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            throw error;
        }
    });
}
//# sourceMappingURL=firebase.js.map