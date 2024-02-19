// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCitYPwal0hut1_V__4VvTPcefOEbG3unI",
  authDomain: "quespher.firebaseapp.com",
  projectId: "quespher",
  storageBucket: "quespher.appspot.com",
  messagingSenderId: "635807394056",
  appId: "1:635807394056:web:85cf045a92dab33d8624bd",
  measurementId: "G-TGBB3V6JJ8"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)



// ****************************************************************

//* Sign In Code 


const signInBtn = document.getElementById('signInBtn');

signInBtn.addEventListener('click', () => {



  const emailInputfield = document.getElementById('email');
  const passwordInputfield = document.getElementById('password');




  const email = emailInputfield.value;
  const password = passwordInputfield.value;


//* Firebase Code
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    //! Remove this console log                                     !!!!!!!
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //! Remove this console log                                     !!!!!!!
  });
});



// ****************************************************************

const signUp = document.getElementById("signUp");
signUp.addEventListener('click', () => {
  window.location.href = "SignUp.html"; // Redirect to your sign-in page

})