import { signinWithGoogle, createUser, firebase } from "./code/firebase";

// const errorContainer = document.getElementById("errorContainer") as HTMLDivElement;

// function showError(message: string) {
//   errorContainer.textContent = message;
// }

function setDisplay(id: string, value: string): void {
  const node = document.getElementById(id);

  if (node) {
    node.style.display = value;
  }
}

let first = true;

document.getElementById("createAccountCtrl")?.addEventListener("click", async () => {
  const name = (<HTMLInputElement>document.getElementById("nameCtrl"))?.value;
  const email = (<HTMLInputElement>document.getElementById("emailCtrl"))?.value;
  const pwd = (<HTMLInputElement>document.getElementById("passwordCtrl"))?.value;
  first = false;
  await createUser(name, email, pwd);
})

document.getElementById("google-signin")?.addEventListener("click", async () => {
  await signinWithGoogle();
})

firebase.auth().onAuthStateChanged(async function (user: any) {
  if (user) {
    if (first) {
      alert("You are already logged in... should redirect to editor I guess ;), logging out now");
    } else {
      alert("yay... created user! logging out again ;)");
    }
    // await firebase.auth().signOut();
    // window.location.reload();
  } else {
    setDisplay("createContainer", "");
    setDisplay("loginContainer", "");
  }
});

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

document.getElementById("request-demo")?.addEventListener("click", () => {
  const name = (<HTMLInputElement>document.getElementById("nameCtrl"))?.value;
  const email = (<HTMLInputElement>document.getElementById("emailCtrl"))?.value;
  const demoName = (<HTMLInputElement>document.getElementById("demoNameCtrl"));
  const demoEmail = (<HTMLInputElement>document.getElementById("demoEmailCtrl"));
  const signup = <HTMLDivElement>document.getElementById("signupContainer");
  const demo = <HTMLDivElement>document.getElementById("demoContainer");

  if (name) demoName.value = name;
  if (email) demoEmail.value = email;

  signup.style.display = "none";
  demo.style.display = "";
});

document.getElementById("send-request")?.addEventListener("click", () => {
  const signup = <HTMLDivElement>document.getElementById("signupContainer");
  const demo = <HTMLDivElement>document.getElementById("demoContainer");
  signup.style.display = "";
  demo.style.display = "none";
});
