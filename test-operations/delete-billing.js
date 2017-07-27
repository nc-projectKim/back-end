//test function to delete a billing
//this functionality has NOT YET been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

// this function logs on as a test user and deletes note -KpLWSpXHxJX9SPanj41

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then(function (id) {
        const billingRef = database.ref(`/billings/${id}/-KpLWSpXHxJX9SPanj41`)
        return billingRef.remove();
    });