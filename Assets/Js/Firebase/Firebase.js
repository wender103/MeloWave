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

function Checar_Fora_Do_Ar() {
  let Admin_Infos
  let feito = false

  db.collection('Admin').get().then((snapshot) => {
    snapshot.docs.forEach(Admin => {
      Admin_Infos = Admin.data()
    })

    if(!feito) {
      feito = true
      location.href = 'fora_do_ar.html'
    }
  })

} Checar_Fora_Do_Ar()