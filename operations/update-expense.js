const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const email = 'John.Smith@google1.com';
const password = 'password123';
const expenseId = '-KpLPSBPY83Xe-i9mopJ'

const newExpense = {
    amount: 203.00,
    lastEditTime: Date.w()
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
