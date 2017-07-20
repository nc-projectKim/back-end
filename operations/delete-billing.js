const firebase = require('firebase');
const database = require('../config');



firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const billingRef = database.ref(`/billings/${id}/-KpLWSpXHxJX9SPanj41`)
        return billingRef.remove();
    });