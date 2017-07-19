const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const newNote = {
    text: 'new text',
    lastEditTime: Date.now()
}

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const noteRef = database.ref(`/notes/${id}/-KpK3h4WSXDFWnY7uFR1`)
        return noteRef.update(newNote);
    })