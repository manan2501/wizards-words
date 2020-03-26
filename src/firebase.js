import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAAsuvC_yxhhswYuQRM_2uuo6o2E_uGFTc",
  authDomain: "wizard-word.firebaseapp.com",
  databaseURL: "https://wizard-word.firebaseio.com",
  projectId: "wizard-word",
  storageBucket: "wizard-word.appspot.com",
  messagingSenderId: "377767773994",
  appId: "1:377767773994:web:c5a576aeb95d9a516ec053",
  measurementId: "G-QTC1JSHR05"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig)
export const fireDb = fire.firestore()

export default fire;