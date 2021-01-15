import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBKNSbwlXUQQz8AjgsTpdZbZ5eyEAaGLYE",
  authDomain: "melini-business.firebaseapp.com",
  databaseURL: "https://melini-business.firebaseio.com",
  projectId: "melini-business",
  storageBucket: "melini-business.appspot.com",
  messagingSenderId: "549153800919",
  appId: "1:549153800919:web:86136b0f37072f92"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)


const auth = firebaseApp.auth()
const db = firebaseApp.database()
const storage = firebaseApp.storage()

export { auth, db, storage } 
