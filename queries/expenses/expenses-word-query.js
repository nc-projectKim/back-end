const firebase = require('firebase');
const config = require('../../config');
const _ = require('underscore')

const startDate = 1484335371000;
const endDate = 1488197395000;
const email = 'John.Smith@google1.com';
const password = 'password123';
const searchTerm = 'temporibus'

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
        const dataObj = {}
       _.filter(data.val(), filterByWord)
       .forEach(ele => {
           dataObj[ele.key] = ele;
       }) 
        return dataObj;
    })
    .then(function(data) {
        console.log(data);
    });

function filterByWord(expense) {
    return expense.description.indexOf(searchTerm) !== -1 || expense.chargeTo.indexOf(searchTerm) !== -1;
}
