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
       return _.filter(data.val(), filterByDate); 
    })
    .then(function(data) {
        console.log(data);
    });

function filterByDate(note) {
    return note.lastEditTime >= 1484335371000 && note.lastEditTime <= 1488197395000;
}