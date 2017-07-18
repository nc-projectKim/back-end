const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const noteRef = database.ref(`/notes/${id}/-KpK3h4_2mQgWYRAbfeN`)
        return noteRef.remove();
    })