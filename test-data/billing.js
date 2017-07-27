const firebase = require('firebase');
const database = require('../config');
// billing functionality was not delivered

const billing = {
    created: Date.now(),
    rate: 75.50,
    timeWorked: 2.5,
    client: 'Jones & Co',
    note: 'absolutely never working for them again',
    invoiced: false,
    dueDate: Date.now(),
    received: 'banana',
    overdue: false,
    lastEditTime: Date.now()
};

// Sign in existing user
firebase.auth().signInWithEmailAndPassword('john.smith3@gmail.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const billingRef = database.ref(`/billings/${id}`);
        billingRef.on('child_added', (snap) => console.log(snap.val()))
        return billingRef.push(billing);
    })
    .catch(function(err) {
        console.log(err);
 });