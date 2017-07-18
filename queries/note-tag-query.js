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
        return _.filter(data.val(), filterByTag);
    })
    .then(function (data) {
        console.log(data);
    });

function filterByTag(note) {
    const regex = new RegExp('face', 'i')
    if (note.tags) return note.tags.filter((tag) => regex.test(tag)).length > 0;
    else return false; 
}