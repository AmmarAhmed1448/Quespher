import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, get, child, update, push } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';


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

function extractDate(dateString) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const d = new Date(dateString);

    const formattedDate = `${d.getDate() < 10 ? 0 : ""} ${d.getDate()}-${months[(d.getMonth())]}-${d.getFullYear()}`

    return formattedDate;
}


function extractBlogId(blogId) {
    const params = new URLSearchParams(window.location.search);
    return params.get(blogId);

}

function createComment(author, content, date) {
    // Create the comment div element
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment', 'my-10');

    // Create the userInfo div element
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('userInfo', 'flex', 'items-center', 'gap-x-10');

    // Create the user image element
    const userImage = document.createElement('img');
    userImage.classList.add('w-10', 'h-10', 'rounded-full');
    userImage.src = 'https://pics.craiyon.com/2023-06-12/3d5f09e2a8c244af9c1085c3e6f9de42.webp';
    userImage.alt = 'User Image';

    // Create the user info container
    const userInfoContainer = document.createElement('div');

    // Create the author name element
    const authorName = document.createElement('div');
    authorName.classList.add('font-bold', 'text-sm');
    authorName.textContent = author;

    // Create the date element
    const commentDate = document.createElement('div');
    commentDate.classList.add('text-xs');
    commentDate.textContent = date;

    // Append user info elements to userInfoDiv
    userInfoContainer.appendChild(authorName);
    userInfoContainer.appendChild(commentDate);
    userInfoDiv.appendChild(userImage);
    userInfoDiv.appendChild(userInfoContainer);

    // Create the comment content paragraph element
    const commentContent = document.createElement('p');
    commentContent.classList.add('mx-20', 'my-5', 'text-sm');
    commentContent.textContent = content;

    // Append userInfoDiv and commentContent to commentDiv
    commentDiv.appendChild(userInfoDiv);
    commentDiv.appendChild(commentContent);

    // Return the created comment div
    return commentDiv;
}




const options = {
    // debug: 'info',
    modules: {
        toolbar: ''
    },
    // placeholder: 'Compose an epic...',
    readOnly: true,
    theme: 'snow'
};


const editor2 = new Quill('#quill-container', options);

// let sjson = JSON.stringify(delta);
// let ojson = JSON.parse(sjson);
// console.log(delta)
// // console.log(sjson)
// console.log(ojson)
// editor2.setContents(ojson);



// const getData = document.getElementById("getData");

function getData() {

    const blogId = extractBlogId('blogId');
    const dbRef = ref(database);
    get(child(dbRef, `blog/${blogId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();

            const keys = Object.keys(data);
            console.log(keys)

            document.getElementById("title").innerText = data.blogData.title
            document.getElementById("category").innerText = data.blogData.category;
            document.getElementById("type").innerText = data.blogData.type;
            document.getElementById("status").innerText = data.blogData.status;
            document.getElementById("author").innerText = data.blogData.authorName;
            document.getElementById("articleDate").innerText = extractDate(data.blogData.date);
            // document.getElementById("commentAuthor").innerText = data.comments.author;
            // document.getElementById("commentDate").innerText = extractDate(data.blogData.date);
            // document.getElementById("commentContent").innerText = data.comments.commentContent;
            // document.getElementById("commentAuthorPicture").innerText = data.blogData.commentAuthorPicture;

            editor2.setContents(data.blogData.delta);

            if (keys.length > 1) {
                const commentContainer = document.getElementById('commentContainer');
                console.log(`round:`)
                for (let i = 1; i < keys.length; i++) {
                    let author = data[keys[i]].author;
                    let date = extractDate(data[keys[i]].date);
                    let commentContent = data[keys[i]].commentText;


                    let newComment = createComment(author, commentContent, date);

                    console.log(`author: ${author}, date: ${date}, commentContent: ${commentContent}`);
                    commentContainer.append(newComment);
                }
            }

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);

    });
}



getData();


function writeComment() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userName = user.displayName;
                const commentText = document.getElementById('commentTextArea').value;
                const date = new Date().toDateString();
                const blogId = extractBlogId('blogId');

                // A post entry.
                const commentData = {
                    author: userName,
                    commentText: commentText,
                    date: date,
                };

                // Get a key for a new Post.
                const newCommentKey = push(child(ref(database), `blog/${blogId}/comments`)).key;

                // Write the new post's data simultaneously in the posts list and the user's post list.
                const updates = {};
                updates[`blog/${blogId}/comments` + newCommentKey] = commentData;

                update(ref(database), updates)
                    .then(() => {
                        resolve(commentData); // Resolve with the commentData
                    })
                    .catch((error) => {
                        reject(error); // Reject if there's an error
                    });
            } else {
                console.log("Sign in first");
                reject(new Error("Sign in first")); // Reject with an error
            }
        });
    });
}



const read = document.getElementById("read");
const logout = document.getElementById("logout");
const profile = document.getElementById("profile");
const commentBtn = document.getElementById("commentBtn");

read.addEventListener('click', () => {
    window.location.href = "showques.html"
})

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signed out")
        window.location.href = "signin.html"
    }).catch((error) => {
        // An error happened.
        console.log("Failed to sign out")
    });

})


profile.addEventListener('click', () => {
    window.location.href = "profile.html"
})

commentBtn.addEventListener('click', () => {
    // const commentData = writeComment();
    // console.log(commentData);
    
    writeComment()
    .then((commentData) => {
        console.log("commnet resolved")
        createComment(commentData.author, commentData.commentText, commentData.date);
    })
    .catch((error) => {
        console.log(error)
    })
})