// const firebase = require('firebase');
// bulk seed database with notes for fake user

const database = require('../config');

const notes = require('./seed/notes.json')
const keys = Object.keys(notes);

function enterNotes() {
    const notesRef = database.ref('/notes/N3yaIqLPkoQZXgSmb8jmeZqTVw43');
    const promises = keys.map(key => {
        return notesRef.push(notes[key])
    });
    return Promise.all(promises)
        .then(function (data) {
            console.log(data)
            // notesRef.on('child_added', (snap) => console.log(snap.val())) 
            // return notesRef.push(note);
        })
        .catch(function (err) {
            console.log(err);
        });
}
enterNotes();

