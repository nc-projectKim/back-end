const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const billingRef = database.ref(`/billings/${id}/-KpLWSpXHxJX9SPanj41`)
        return billingRef.remove();
    });