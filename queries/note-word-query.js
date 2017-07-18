const firebase = require('firebase');
const config = require('../config');
const _ = require('underscore')

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/notes/${data.uid}/`)
    })
    .then((noteRef) => {
       return noteRef.once('value');
    })
    .then(function (data) {
       return _.filter(data.val(), filterByWord); 
    })
    .then(function(data) {
        console.log(data);
    });

function filterByWord(note) {
    return note.text.indexOf('temporibus') !== -1 || note.title.indexOf('temporibus') !== -1;
}