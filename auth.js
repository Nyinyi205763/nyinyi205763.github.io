import { loginWithGoogle } from "./firebase.js";

const googleLoginBtn = document.getElementById("googleLoginBtn");

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", () => {
    loginWithGoogle();
  });
}
