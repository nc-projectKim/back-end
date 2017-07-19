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
        console.log(_.map(data, x => x.dueDate));
    });

function filterByDate(billItem) {
    return billItem.dueDate >= 1484335371000 && billItem.dueDate <= 1488197395000;
}