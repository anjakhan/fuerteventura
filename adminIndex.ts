import { firebase, signinUser, signinWithGoogle, signinWithPhone } from "./code/firebase.js";

import { WcAppLayout } from "./components/app-layout/WcAppLayout";
import { WcDialogResetPassword } from "./components/dialogs/WcDialogResetPassword.js";

import { masterStyles } from "./styles.js";

export const adm = {
  useAdminMode: false,
  canUseAdminMode: false,
  isPinnedUser: false
};

export type User = {
  id: string;
  displayName: string;
  eMailAddress: string;
  phone: string;
  isEmailAddressVerified: boolean;
  lastLogin: Date;
  code: string;
  isActivated: boolean;
}

export let currentUser: User = {
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

function setDisplay(id: string, value: string): void {
  const node = document.getElementById(id);

  if (node) {
    node.style.display = value;
  }
}

document.getElementById("passwordCtrl")?.addEventListener("keyup", async (event) => {
  if (event.key === "Enter" || event.which === 13) {
    event.preventDefault();
    document.getElementById("createAccountCtrl")?.click();
  }
})

document.getElementById("createAccountCtrl")?.addEventListener("click", async () => {
  const email = (<HTMLInputElement>document.getElementById("emailCtrl"))?.value;
  const pwd = (<HTMLInputElement>document.getElementById("passwordCtrl"))?.value;
  await signinUser(email, pwd);
})

document.getElementById("google-signin")?.addEventListener("click", async () => {
  await signinWithGoogle();
})

document.getElementById("phone-signin")?.addEventListener("click", async () => {
  await signinWithPhone();
})

firebase.auth().onAuthStateChanged(async function (user: any) {
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
    setDisplay("userAccount", ""); // show user account
    setDisplay("loginPage", "none");

    const controlHost = document.getElementById('userAccount');
    controlHost?.append(wcAppLayout);

    const head = document.getElementsByTagName('head')[0];
    const s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.appendChild(document.createTextNode(masterStyles.toString()));
    head.appendChild(s);
  } else {
    setDisplay("loginPage", "");
  }
});

export const logoutFunc = (): void => {
  (async () => {
    await firebase.auth().signOut();
    window.location.reload();
  })();
}

document.getElementById("eye")?.addEventListener("click", () => {
  const eye = <HTMLInputElement>document.getElementById("eye");
  const input = <HTMLInputElement>document.getElementById("passwordCtrl");

  if (input.type === "password") {
    eye.classList.remove("fa-eye-slash");
    eye.classList.add("fa-eye");
    input.type = "text";
  } else {
    eye.classList.remove("fa-eye");
    eye.classList.add("fa-eye-slash");
    input.type = "password";
  }
});

document.getElementById("password-reset")?.addEventListener("click", () => {
  const td = new WcDialogResetPassword();
  td.showDialog();
  return td;
});