// code ported to front end as 'add Note' method
const firebase = require('firebase');
const database = require('../config');

const notes = require('./seed/notes.json')
const keys = Object.keys(notes);


function addNote(data) {
    const note = {
        created: Date.now(),
        title: 'Hello',
        text: 'Bob Dylan forevs',
        tags: [],
        lastEditTime: Date.now()
    };
    const userId = 'ExkVJBLKOthqpycAiAdkAHdvPfA3';
    const notesRef = database.ref(`/notes/${userId}`);
    return notesRef.push(note)
        .then(res => {
            note.key = res.key;
        })
        .catch(err => {
            console.log(err);
        });

}

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/notes/' + userId).once('value').then(function (snapshot) {
//     return snapshot;
// }).catch(function(error) {
//     console.log(error)
// });