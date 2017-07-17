const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const note = {
    created: Date.now(),
    title: 'The Brothers Karamazov',
    text: 'Doomed',
    tags: ['code', 'firebase'],
    lastEditTime: Date.now()
};

// Sign in existing user
firebase.auth().signInWithEmailAndPassword('john.smith3@gmail.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const notesRef = database.ref(`/notes/${id}`);
        notesRef.on('child_added', (snap) => console.log(snap.val()))
        return notesRef.push(note);
    })
    .catch(function(err) {
        console.log(err);
 });