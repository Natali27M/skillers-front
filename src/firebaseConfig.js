import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAub7-VlpY-LIUJwNmeZcHdkpzSYVRxc1k",
    authDomain: "skilliant-dcfd5.firebaseapp.com",
    projectId: "skilliant-dcfd5",
    storageBucket: "skilliant-dcfd5.appspot.com",
    messagingSenderId: "889805425930",
    appId: "1:889805425930:web:ceeac9dc6c24e42e77fef3",
    databaseURL: "https://skilliant-dcfd5-default-rtdb.firebaseio.com/"

};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
