import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, push, set, child } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';


const firebaseConfig = {
  apiKey: "AIzaSyCitYPwal0hut1_V__4VvTPcefOEbG3unI",
  authDomain: "quespher.firebaseapp.com",
  projectId: "quespher",
  databaseURL: "https://quespher-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "quespher.appspot.com",
  messagingSenderId: "635807394056",
  appId: "1:635807394056:web:85cf045a92dab33d8624bd",
  measurementId: "G-TGBB3V6JJ8"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const database = getDatabase(app);





function createCard(title, content, author, date) {
    // Create the card container
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('w-3/4', 'my-10', 'p-5', 'border-2', 'border-slate-500', 'rounded-xl');

    // Create the title element
    const titleElement = document.createElement('p');
    titleElement.classList.add('font-bold', 'text-xl');
    titleElement.textContent = title;

    // Create the content element
    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    // Create the author and date container
    const authorDateDiv = document.createElement('div');
    authorDateDiv.classList.add('flex', 'justify-between');

    // Create the author element
    const authorElement = document.createElement('span');
    authorElement.textContent = author;

    // Create the date element
    const dateElement = document.createElement('span');
    dateElement.textContent = date;

    // Append elements to the card container
    authorDateDiv.appendChild(authorElement);
    authorDateDiv.appendChild(dateElement);
    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(contentElement);
    cardDiv.appendChild(authorDateDiv);

    return cardDiv;
}


// Example usage:
const cardsContainer = document.getElementById('cards');
const card1 = createCard('Introduction to CS', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo nam error dolor expedita sequi earum magni quis quae exercitationem maiores!', 'Ammar Ahmed Khan', '14 Jan, 2024');
const card2 = createCard('Introduction to CS', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo nam error dolor expedita sequi earum magni quis quae exercitationem maiores!', 'Ammar Ahmed Khan', '14 Jan, 2024');

cardsContainer.appendChild(card1);
cardsContainer.appendChild(card2);