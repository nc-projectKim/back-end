const firebase = require('firebase');
const database = require('../config');

const newBilling = {
    amount: 1000.75,
    lastEditTime: Date.now()
}

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const billingRef = database.ref(`/billings/${id}/-KpLWSpFErcxHcmoSfio`)
        return billingRef.update(newBilling);
    });