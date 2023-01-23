import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAzZv10faqcqG2Ew75-ka4rCoFA6buWI2k",
    authDomain: "tickets-28b5f.firebaseapp.com",
    projectId: "tickets-28b5f",
    storageBucket: "tickets-28b5f.appspot.com",
    messagingSenderId: "241861826697",
    appId: "1:241861826697:web:b04988e1a1eeaf00c2ce58",
    measurementId: "G-LSJV2XY6TL"
};

const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

export {auth, db, storage };