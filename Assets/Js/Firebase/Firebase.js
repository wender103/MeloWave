const firebaseConfig = {
    apiKey: "AIzaSyAQC5i6X4iUFOuEET1m5LhzxenC_IrVMCA",
    authDomain: "melowave-f6f7c.firebaseapp.com",
    projectId: "melowave-f6f7c",
    storageBucket: "melowave-f6f7c.appspot.com",
    messagingSenderId: "381222612964",
    appId: "1:381222612964:web:e6a1d264b6e3bfed4de1f1"
}

  // Initialize Firebase
firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()