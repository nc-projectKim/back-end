const firebase = require('firebase');
const database = require('../config');

const notes = require('./seed/notes.json')
const keys = Object.keys(notes);

// const note = {
//     created: Date.now(),
//     title: 'The Brothers Karamazov',
//     text: 'Doomed',
//     tags: ['code', 'firebase'],
//     lastEditTime: Date.now()
// };

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const notesRef = database.ref(`/notes/${id}`);
        const promises = keys.map(key => {
            return notesRef.push(notes[key])
        })
        return Promise.all(promises)
    })
    .then(function (data) {
        console.log(data)
        // notesRef.on('child_added', (snap) => console.log(snap.val())) 
        // return notesRef.push(note);
    })
    .catch(function (err) {
        console.log(err);
    });