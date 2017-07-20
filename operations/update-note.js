const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const newNote = {
    tags: ['sticky'],
    lastEditTime: Date.now()
}

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const noteRef = database.ref(`/notes/${id}/-KpK3h4bwr6VoaRh8aex`)
        return noteRef.update(newNote);
    })