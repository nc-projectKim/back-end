const firebase = require('firebase');
const database = require('../config');

const email = 'John.Smith@google1.com';
const password = 'password123';
const expenseId = '-KpLPSBPY83Xe-i9mopJ'

const newExpense = {
    amount: 203.00,
    lastEditTime: Date.now()
}

function updateExpense(expenseId) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            return data.uid;
        })
        .then(function (id) {
            const expenseRef = database.ref(`/expenses/${id}/${expenseId}`)
            return expenseRef.update(newExpense);
        })
}

updateExpense(expenseId);
