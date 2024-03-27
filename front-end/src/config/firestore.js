// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3Rwe4FHkRHfIEr25fGbPECa0warB_Rrw",
  authDomain: "mewvies-d5186.firebaseapp.com",
  projectId: "mewvies-d5186",
  storageBucket: "mewvies-d5186.appspot.com",
  messagingSenderId: "375663160360",
  appId: "1:375663160360:web:d7caabfeb776bf0c56591d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export {firebaseApp, db};