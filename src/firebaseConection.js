import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJ1HCgwMc6lLr4ByqVpYZQCZKY344jiUg",
    authDomain: "curso-625cc.firebaseapp.com",
    projectId: "curso-625cc",
    storageBucket: "curso-625cc.appspot.com",
    messagingSenderId: "839643930856",
    appId: "1:839643930856:web:ff25195e32d13b03caa95d",
    measurementId: "G-6FKWHP1L5Z"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};

