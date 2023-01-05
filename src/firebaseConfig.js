import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYpsxajHEuH7r4Hsq9I26La0b01XSJAdw",
    authDomain: "skilliant-e4cc9.firebaseapp.com",
    projectId: "skilliant-e4cc9",
    storageBucket: "skilliant-e4cc9.appspot.com",
    messagingSenderId: "140592799129",
    appId: "1:140592799129:web:03cc266109f77c4a3e8708",
    measurementId: "G-49CHFSRNKS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const db = getDatabase(app);
export {storage};
