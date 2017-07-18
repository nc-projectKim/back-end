const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const billing = {
    created: Date.now(),
    billDate: Date.now(),
    rate: 75.50,
    timeWorked: 2.5,
    amount: 200.19,
    currency: 'GBP',
    description: 'Slaved for hours over some firebase stuff',
    client: 'Jones & Co',
    note: 'absolutely never working for them again',
    invoiced: false,
    dueDate: Date.now(),
    received: false,
    overdue: false,
    lastEditTime: Date.now()
};

// Sign in existing user
firebase.auth().signInWithEmailAndPassword('john.smith3@gmail.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const billingRef = database.ref(`/billing/${id}`);
        billingRef.on('child_added', (snap) => console.log(snap.val()))
        return billingRef.push(billing);
    })
    .catch(function(err) {
        console.log(err);
 });