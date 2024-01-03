// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpijOaOn5A80cDDVnSm6DC-VwvzBsX7jk",
  authDomain: "reactsns-v1-6dad0.firebaseapp.com",
  projectId: "reactsns-v1-6dad0",
  storageBucket: "reactsns-v1-6dad0.appspot.com",
  messagingSenderId: "506000159569",
  appId: "1:506000159569:web:c2b96b67afc98180231970"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);