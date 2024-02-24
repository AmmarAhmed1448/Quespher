import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, push, get, child } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';


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



const getRecords = () => {
  return new Promise((res, rej) => {
    get(child(ref(database), `blog/`)).then((snapshot) => {
      if (snapshot.exists()) {
        res(snapshot.val())

      } else {
        rej("No data available")
      }
    }).catch((error) => {
      rej(error)
    });
  })
  
}




function extractDate(dateString) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const d = new Date(dateString);

  const formattedDate = `${d.getDate() < 10 ? 0 : ""} ${d.getDate()}-${months[(d.getMonth())]}-${d.getFullYear()}`

  return formattedDate;
}
 

function createCard(blogId, title, content, author, date) {
  // Create the card container
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('w-3/4', 'my-10', 'p-5', 'border-2', 'border-slate-500', 'rounded-xl');

  // const titleElement = document.createElement('p');
  const anchorElement = document.createElement('a');
  anchorElement.classList.add('no-underline', 'decoration-inherit', 'font-bold', 'text-xl');
  anchorElement.setAttribute('href', `./readQues.html?blogId=${blogId}`)
  anchorElement.textContent = title;

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
  // cardDiv.appendChild(titleElement);
  cardDiv.appendChild(anchorElement);
  cardDiv.appendChild(contentElement);
  cardDiv.appendChild(authorDateDiv);

  return cardDiv;
}



const write = document.getElementById("write");
write.addEventListener('click', () => {
  window.location.href = "writeQues.html"
})

// Example usage:

// const card1 = createCard('Introduction to CS', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo nam error dolor expedita sequi earum magni quis quae exercitationem maiores!', 'Ammar Ahmed Khan', '14 Jan, 2024');
// const card2 = createCard('Introduction to CS', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo nam error dolor expedita sequi earum magni quis quae exercitationem maiores!', 'Ammar Ahmed Khan', '14 Jan, 2024');


getRecords().then((res) => {
  const cardsContainer = document.getElementById('cards');
  for(const element in res){
    console.log(res[element]);
    console.log(res[element].blogData)
    cardsContainer.appendChild((createCard(element, res[element].blogData.title, "This is dummy title", res[element].blogData.authorName, extractDate(res[element].blogData.date))))
  }
}).catch((error) => {
  console.log(error)
})
