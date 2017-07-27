const firebase = require('firebase');
const database = require('../config');

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

