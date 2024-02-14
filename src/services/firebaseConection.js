import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAzbDHK6ETp_8KK5sAB5HByWw7m4FRXzTE",
    authDomain: "wheyinbox.firebaseapp.com",
    projectId: "wheyinbox",
    storageBucket: "wheyinbox.appspot.com",
    messagingSenderId: "157285769024",
    appId: "1:157285769024:web:8091457311168ecd4224a5",
    measurementId: "G-XQD16192RR"
};

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export {auth, db, storage};