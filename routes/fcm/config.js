const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDMSUzStEQqqgaiAFgnqBG1NjV3vW2HTGo",
    authDomain: "fcmproject-c5d53.firebaseapp.com",
    projectId: "fcmproject-c5d53",
    storageBucket: "fcmproject-c5d53.appspot.com",
    messagingSenderId: "84920070507",
    appId: "1:84920070507:web:2fe1588c6d0828639b1c2e",
    measurementId: "G-VCLMZV434G"
  };

firebase.initializeApp(firebaseConfig)
let database = firebase.database();

module.exports = database;