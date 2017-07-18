const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/notes/${data.uid}`)
    })
    .then((noteRef) => {
        noteRef.limitToFirst(10).once('value')
            .then(function (snap) {
                console.log('snap.val()', snap.val());
            });
    });


