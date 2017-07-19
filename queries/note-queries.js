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
       return noteRef.once('value')
    })
    .then(function (data) {
       return _.sortBy(data.val(), "created"); 
    })
    .then(function(data) {
        return _.chain(data)
        .map(function (ele) {
            return ele
        })
        .each(console.log)
    });


