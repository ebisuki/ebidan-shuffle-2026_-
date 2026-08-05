import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import { 
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} 
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCCiSLmcBztkWWxbV84wGSdHKXWDZ-ZxZc",
    authDomain: "ebidan-shuffle-2026.firebaseapp.com",
    projectId: "ebidan-shuffle-2026",
    storageBucket: "ebidan-shuffle-2026.firebasestorage.app",
    messagingSenderId: "993284827304",
    appId: "1:993284827304:web:23d2dd79510830d38bba9d",
    measurementId: "G-Z1NJJF2D5S"
  };


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const db = getFirestore(app);

signInAnonymously(auth)
.then(() => {
  console.log("Firebase匿名ログイン成功");
})
.catch((error) => {
  console.log(error);
});


onAuthStateChanged(auth, (user) => {

  if(user){

    console.log(
      "ユーザーID:",
      user.uid
    );

  }

});