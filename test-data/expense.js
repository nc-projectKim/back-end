const firebase = require('firebase');
const database = require('../config');

const expense = {
    created: Date.now(),
    expenseDate: Date.now(),
    amount: 200.19,
    currency: 'GBP',
    description: 'parking for 25s econds outside arndale',
    haveReceipt: true,
    chargeTo: 'Northcoders',
    lastEditTime: Date.now()
};

// Sign in existing user
firebase.auth().signInWithEmailAndPassword('john.smith3@gmail.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const expenseRef = database.ref(`/expenses/${id}`);
        expenseRef.on('child_added', (snap) => console.log(snap.val()))
        return expenseRef.push(expense);
    })
    .catch(function(err) {
        console.log(err);
 });