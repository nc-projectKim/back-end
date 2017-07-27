// code ported to front end

const firebase = require('firebase');
const database = require('../config');

const expense = {
    created: 'banana',
    expenseDate: Date.now(),
    amount: 200.19,
    haveReceipt: 'banana',
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