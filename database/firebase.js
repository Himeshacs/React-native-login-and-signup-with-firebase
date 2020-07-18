

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCc7BXdbXRjHxIvZLtWOkSUQ-XzX3GdKBA",
  authDomain: "iparking-db-f6f0b.firebaseapp.com",
  databaseURL: "https://iparking-db-f6f0b.firebaseio.com",
  projectId: "iparking-db-f6f0b",
  storageBucket: "iparking-db-f6f0b.appspot.com",
  messagingSenderId: "55390842931",
  appId: "1:55390842931:web:a41d87952bddaf45ccb346",
  measurementId: "G-H8BQ2E9DYL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;