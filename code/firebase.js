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
    apiKey: "AIzaSyBUbyQiqE7TSAS2J5iIVII1Z99tKdd0AuE",
    authDomain: "fuerteventura-d4e75.firebaseapp.com",
    projectId: "fuerteventura-d4e75",
    storageBucket: "fuerteventura-d4e75.appspot.com",
    messagingSenderId: "378393506142",
    appId: "1:378393506142:web:4d16e60264d0388a685fcf"
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
;
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
;
export const createTravelDocument = (traveldoc) => {
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
export const getTravelDocs = () => {
    const docs = firestore.collection("fuerte").get()
        .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
    });
    return docs;
};
export const uploadImage = (file, foldername) => {
    const storage = firebase.storage().ref(`${foldername}/${file.name}`);
    storage.put(file);
};
export const dowloadFile = (filename) => {
    const storageRef = firebase.storage().ref();
    return storageRef.child(filename).getDownloadURL();
};
export function downloadImageURL(foldername = '2021-06-06_costa_testing') {
    return __awaiter(this, void 0, void 0, function* () {
        const listOfUrls = [];
        var storageRef = firebase.storage().ref(foldername);
        storageRef.listAll().then((res) => {
            let promises = res.items.forEach((item) => item.getDownloadURL());
            Promise.all(promises).then((downloadURLs) => {
                console.log('res 1', downloadURLs);
                listOfUrls.push(downloadURLs);
            });
        });
        return listOfUrls;
    });
}
export const firestore = firebase.firestore();
//# sourceMappingURL=firebase.js.map