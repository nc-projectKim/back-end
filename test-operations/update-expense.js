//test function to update an expense
//this functionality has been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

const { email, password } = require('../test-user-config');

// sample updated expense
const newExpense = {
    amount: 203.00,
    lastEditTime: Date.now()
}

module.exports = updateExpense = (expenseId) => {
    const userId = firebase.auth().currentUser.uid;
    const expenseRef = database.ref(`/expenses/${userId}/${noteId}`)
    return expenseRef.update(newExpense)
        .catch(err => {
            console.log(err);
        });
}
