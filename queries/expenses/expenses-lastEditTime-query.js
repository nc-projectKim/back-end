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
    .then((user) => {
        return database.ref(`/expenses/${user.uid}/`)
    })
    .then((noteRef) => {
       return noteRef.once('value');
    })
    .then(function (data) {
        return _.chain(data.val())
       .filter(filterBylastEditTime)
       .sortBy('lastEditTime')

    })
    .then(function(data) {
        console.log(data);
    });

function filterBylastEditTime(expense) {
    return expense.lastEditTime >= startDate && expense.lastEditTime <= endDate;
}