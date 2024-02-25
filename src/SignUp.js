// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';


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


const auth = getAuth(app);







// ***********************************************************
// Sign Up Code


const signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click', () => {



  const userNameInputField = document.getElementById('userName');
  const emailInputfield = document.getElementById('email');
  const passwordInputfield = document.getElementById('password');




  const userName  = userNameInputField.value;
  const email = emailInputfield.value;
  const password = passwordInputfield.value;




// * Sign Up Firebase Code
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    //! Remoce this console log                                     !!!!!
    console.log(userCredential);
    
    updateProfile(user, {
      displayName: userName
    })

  window.location.href = "showQues.html"; // Redirect to your sign-in page

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //! Remove this console log                                     !!!!!!!
    console.log(errorMessage);
  });
})




// *****************************************************************



const signIn = document.getElementById("signIn");
signIn.addEventListener('click', () => {
  window.location.href = "SignIn.html"; // Redirect to your sign-in page

})