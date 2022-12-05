import {initializeApp} from 'firebase/app';
import {getAuth} from  "firebase/auth";
import { getDatabase } from "firebase/database";

// import 'firebase/firestore';


  const firebaseConfig = {
    apiKey: "AIzaSyCgFwsI_TA3pRM--zD55O8wLW_2pnBZfs4",
    authDomain: "simple-notes-firebase-9ac4d.firebaseapp.com",
    projectId: "simple-notes-firebase-9ac4d",
    storageBucket: "simple-notes-firebase-9ac4d.appspot.com",
    messagingSenderId: "1060427308926",
    appId: "1:1060427308926:web:bd70e58c21a51904935d2f",
    measurementId: "G-9R3GEX0NLR"
  };

  const firebase = initializeApp(firebaseConfig);
  getAuth(firebase);
  getDatabase(firebase);

  export default firebase;