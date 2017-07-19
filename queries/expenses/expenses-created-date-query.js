const firebase = require('firebase');
const config = require('../../config');
const _ = require('underscore')

const startDate = 1484335371000;
const endDate = 1488197395000;
const email = 'John.Smith@google1.com';
const password = 'password123';

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
        return database.ref(`/expenses/${data.uid}/`)
    })
    .then((noteRef) => {
       return noteRef.once('value');
    })
    .then(function (data) {
        return _.chain(data.val())
       .filter(filterByCreatedDate)
       .sortBy('created')

    })
    .then(function(data) {
        console.log(data);
    });

function filterByCreatedDate(expense) {
    return expense.created >= startDate && expense.created <= endDate;
}