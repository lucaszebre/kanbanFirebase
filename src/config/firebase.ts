import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZtgWCYP_vMHzL9IoK2QQRvJOSga0GCbw",
  authDomain: "kanbatask2.firebaseapp.com",
  databaseURL: "https://kanbatask2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kanbatask2",
  storageBucket: "kanbatask2.appspot.com",
  messagingSenderId: "599370732411",
  appId: "1:599370732411:web:551c51f92976b3e29923de"
};

// Check if the app has been initialized, and if not, initialize it.
const app = firebase.initializeApp(firebaseConfig);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
