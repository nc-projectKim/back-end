const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const email = 'John.Smith@google1.com';
const password = 'password123';
const expenseId = '-KpLPSBEENI6mp5C6cRe'

function deleteExpense (expenseId) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const expenseRef = database.ref(`/expenses/${id}/${expenseId}`)
        return expenseRef.remove();
    });
}

deleteExpense(expenseId);

