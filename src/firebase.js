import { initializeApp } from "firebase/app";
import { GoogleAuthProvider} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFunctions} from 'firebase/functions';


const firebaseConfig = {
    apiKey: "",
    authDomain: "custom-text-tasks.firebaseapp.com",
    projectId: "custom-text-tasks",
    storageBucket: "custom-text-tasks.firebasestorage.app",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);


export { provider, db,  auth, doc, setDoc,  serverTimestamp, functions };
