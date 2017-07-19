const firebase = require('firebase');
const config = require('../config');
const _ = require('underscore')

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/billings/${data.uid}/`)
    })
    .then((noteRef) => {
       return noteRef.once('value');
    })
    .then(function (data) {
       return _.filter(data.val(), filterByDate); 
    })
    .then(function(data) {
        console.log(_.map(data, x => x.lastEditTime));
    });

function filterByDate(billItem) {
    return billItem.lastEditTime >= 1484335371000 && billItem.lastEditTime <= 1488197395000;
}