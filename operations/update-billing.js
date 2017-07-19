const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const newBilling = {
    amount: 3700.73,
    lastEditTime: Date.now()
}

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const billingRef = database.ref(`/billings/${id}/-KpLWSpXHxJX9SPanj41`)
        return billingRef.update(newBilling);
    });