import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAdb7vll3nst21RRdxqJwEtOKb6yMSgALg",
    authDomain: "jproject-be7b6.firebaseapp.com",
    projectId: "jproject-be7b6",
    storageBucket: "jproject-be7b6.appspot.com",
    messagingSenderId: "594533888532",
    appId: "1:594533888532:web:a7b96f149b8ba1927cad01",
    measurementId: "G-00KDMQYLT8"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig)


const auth = firebaseApp.auth()
const db = firebaseApp.database()
const storage = firebaseApp.storage()

export { auth, db, storage} 
