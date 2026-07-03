// ==============================
// Firebase Core Setup
// Nyi Nyi HR Access System
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKr7hFr8pnD_kVLfhHrga0PvImGOXwnLk",
  authDomain: "nyi-nyi-portfolio-hr.firebaseapp.com",
  projectId: "nyi-nyi-portfolio-hr",
  storageBucket: "nyi-nyi-portfolio-hr.firebasestorage.app",
  messagingSenderId: "271387204444",
  appId: "1:271387204444:web:ccf3b524663bd0825f3f99",
  measurementId: "G-6764MBM60J"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(
      doc(db, "hrLoginLogs", user.uid),
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        lastLogin: serverTimestamp()
      },
      { merge: true }
    );

    window.location.href = "hr.html";
  } catch (error) {
    alert("Google Login failed. Please try again.");
    console.error(error);
  }
}

function logoutUser() {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error);
    });
}

function protectHRPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "auth.html";
    }
  });
}

export {
  auth,
  db,
  loginWithGoogle,
  logoutUser,
  protectHRPage,
  onAuthStateChanged
};
