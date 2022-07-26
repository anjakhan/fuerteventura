export const firebase = (<any>window).firebase;

const config = {
  apiKey: "AIzaSyCDUKsrnycenQiUaqr3fQ2cmj4bnhOtta4",
  authDomain: "phone-auth-test-35d0b.firebaseapp.com",
  projectId: "phone-auth-test-35d0b",
  storageBucket: "phone-auth-test-35d0b.appspot.com",
  messagingSenderId: "78922657454",
  appId: "1:78922657454:web:ce7cc4d2823e6570dbc73f"
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

export async function signinWithGoogle(): Promise<void> {
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

export async function signinWithPhone(): Promise<void> {
  console.log("phone signin");
  firebase.auth().useDeviceLanguage();
}

export async function createUser(name: string, email: string, password: string): Promise<void> {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    userCredential.user.updateProfile({ displayName: name });
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    checkErrorCode(errorCode);

    throw error;
  }
}

export async function signinUser(email: string, password: string): Promise<void> {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    checkErrorCode(errorCode);
    throw error;
  }
}

export async function changePassword(password: string): Promise<void> {
  try {
    const user = firebase.auth().currentUser;
    await user.updatePassword(password);
    alert("Password changed successfully!")
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export async function sendPasswordResetMail(email: string = firebase.auth().currentUser.email): Promise<void> {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode);
    alert(error.message);
    throw error;
  }
}

export async function deleteUser(): Promise<void> {
  try {
    const user = firebase.auth().currentUser;
    await user.delete();
  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode);
    throw error;
  }
}