import { FotoUploadDto } from '../code/nobs/UploadNobs';

export const firebase = (<any>window).firebase;

const config = {
  apiKey: "AIzaSyBUbyQiqE7TSAS2J5iIVII1Z99tKdd0AuE",
  authDomain: "fuerteventura-d4e75.firebaseapp.com",
  projectId: "fuerteventura-d4e75",
  storageBucket: "fuerteventura-d4e75.appspot.com",
  messagingSenderId: "378393506142",
  appId: "1:378393506142:web:4d16e60264d0388a685fcf"
};

firebase.initializeApp(config);

const checkErrorCode = (errorCode: string) => {
  const errorContainer = document.getElementById("errorContainer")
  const errorWrapper = document.getElementById("errorWrapper");
  errorContainer ? errorContainer.style.display = "" : false;
  if (errorCode === "auth/email-already-in-use") {
    errorWrapper ? errorWrapper.innerHTML = "This email address is already in use. <br>Did you mean to sign in?" : "";
  } else if (errorCode === "auth/invalid-email") {
    errorWrapper ? errorWrapper.textContent = "Invalid e-mail address!" : "";
  } else if (errorCode === "auth/weak-password") {
    errorWrapper ? errorWrapper.textContent = "Your password is weaaaak!" : "";
  } else if (errorCode === "auth/wrong-password") {
    errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
  } else if (errorCode === "auth/user-not-found") {
    errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
  } else if (errorCode === "auth/too-many-requests") {
    errorWrapper ? errorWrapper.innerHTML = "Access to this account has been temporarily <br>disabled due to many failed login attempts." : "";
  }
}

export async function signinWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    checkErrorCode(errorCode);
    throw error;
  }
}

export async function createUser(name: string, email: string, password: string) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    userCredential.user.updateProfile({ displayName: name });
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    // const errorMessage = error.message;

    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    checkErrorCode(errorCode);

    throw error;
  }
};

export async function signinUser(email: string, password: string) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    checkErrorCode(errorCode);
    throw error;
  }
};

export const createTravelDocument = (traveldoc: FotoUploadDto) => {
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
    .then((docRef: any) => {
      console.log("Document written with ID: ", docRef.id);
      alert('Fotostory created');
      firestore.collection('fuerte').doc(`${docRef.id}`).set({
        id: docRef.id
      }, { merge: true });
    })
    .catch((error: string) => {
      console.error("Error adding document: ", error);
    });
};

export const getTravelDocs = () => {
  const docs = firestore.collection("fuerte").get()
    .then((querySnapshot: any) => {
      return querySnapshot.docs.map((doc: any) => doc.data());
    })
  return docs;
};

export const uploadImage = (file: any, foldername: string) => {
  const storage = firebase.storage().ref(`${foldername}/${file.name}`);
  storage.put(file);
};

export const dowloadFile = (filename: string) => {
  const storageRef = firebase.storage().ref();
  return storageRef.child(filename).getDownloadURL();
};

// const getImgRes = (itemRef: any) => {
//   return itemRef.getDownloadURL()
// };

// export const getImages = (foldername: any) => {
//   const storageRef = firebase.storage().ref(foldername);
//   let pictures;
//   storageRef.listAll().then((res: any) => {
//     res.items.forEach((itemRef: any) => console.log(getImgRes(itemRef)));
//   }).catch((err: string) => console.log(err))
//   return pictures;
// };

export async function downloadImageURL(foldername: string = '2021-06-06_costa_testing') {
  const listOfUrls: any = [];
  var storageRef = firebase.storage().ref(foldername);
  storageRef.listAll().then((res: any) => {
    let promises = res.items.forEach((item: any) => item.getDownloadURL());

    Promise.all(promises).then((downloadURLs) => {
      console.log('res 1', downloadURLs)
      listOfUrls.push(downloadURLs);
    });
  })
  return listOfUrls;
}

//gs://fuerteventura-d4e75.appspot.com/2021-06-06_costa_testing/fuerteventura-3-playa-cofete.jpeg

export const firestore = firebase.firestore();