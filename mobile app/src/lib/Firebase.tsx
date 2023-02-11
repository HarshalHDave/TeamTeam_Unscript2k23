// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmgQ_VrLlxGFUGNdQ2w2i_rfZp23YFYvk",
  authDomain: "unscript2k23.firebaseapp.com",
  projectId: "unscript2k23",
  storageBucket: "unscript2k23.appspot.com",
  messagingSenderId: "450408809788",
  appId: "1:450408809788:web:46962de438b0c21bf50a39",
  measurementId: "G-YTLEWETH5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
