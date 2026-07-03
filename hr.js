import { protectHRPage, logoutUser } from "./firebase.js";

protectHRPage();

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logoutUser();
  });
}
