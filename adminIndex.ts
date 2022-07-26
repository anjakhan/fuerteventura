import { firebase, signinUser, signinWithGoogle } from "./code/firebase.js";
import { WcAppLayout } from "./components/app-layout/WcAppLayout";
import { masterStyles } from "./styles.js";

const wcAppLayout = new WcAppLayout();
export let appUser: string = 'user';

function setDisplay(id: string, value: string): void {
  const node = document.getElementById(id);

  if (node) {
    node.style.display = value;
  }
};

document.getElementById("createAccountCtrl")?.addEventListener("click", async () => {
  const email = (<HTMLInputElement>document.getElementById("emailCtrl"))?.value;
  const pwd = (<HTMLInputElement>document.getElementById("passwordCtrl"))?.value;
  await signinUser(email, pwd);
});

document.getElementById("google-signin")?.addEventListener("click", async () => {
  await signinWithGoogle();
});

firebase.auth().onAuthStateChanged(async function (user: any) {
  if (user) {
    user.email === 'trulli90@gmail.com' ? appUser = 'admin' : appUser = 'user';
    setDisplay("userAccount", ""); // show user account
    setDisplay("loginPage", "none"); const controlHost = document.getElementById('userAccount');
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

export const logoutFunc = () => {
  (async () => {
    await firebase.auth().signOut();
    window.location.reload();
  })();
};

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
  };
});