
import * as firebase from 'firebase';

import '@firebase/auth';
import '@firebase/firestore';
import "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDU0RzFiFa1tiwtPmpO3B9162rtmCwzCv0",
    authDomain: "gerencie-sua-cozinha.firebaseapp.com",
    databaseURL: "https://gerencie-sua-cozinha.firebaseio.com",
    projectId: "gerencie-sua-cozinha",
    storageBucket: "gerencie-sua-cozinha.appspot.com",
    messagingSenderId: "546152970900",
    appId: "1:546152970900:web:dd5bacb501d4522c245281",
    measurementId: "G-N0HCX2M4GP"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };