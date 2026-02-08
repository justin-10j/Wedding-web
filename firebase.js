import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtyKQPqjVd2BJo5NM9nUgGdp7MYct5f0w",
  authDomain: "wedding-invitation-49fab.firebaseapp.com",
  projectId: "wedding-invitation-49fab",
  storageBucket: "wedding-invitation-49fab.firebasestorage.app",
  messagingSenderId: "411590759614",
  appId: "1:411590759614:web:7646e3fddde6f961eafaef"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
