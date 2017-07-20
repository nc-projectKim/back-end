const firebase = require('firebase');
const config = require('../config');
const _ = require('underscore');
const keywords = ['unbranded']

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
    console.log(note.tags);
    const regexes = keywords.map((ele) => {
        return new RegExp(ele, 'i')
    });
    if (note.tags) {
        var containsAll = true;
        for (var i = 0; i < regexes.length; i++) {
            const filtered = note.tags.filter((ele) => {
                return regexes[i].test(ele);
            }).length;

            if (filtered === 0) {
                containsAll = false;
                break;
            }
        }
        return containsAll;
    }
    else return false;
}


