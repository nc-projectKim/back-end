// billing functionality not delivered

const firebase = require('firebase');
const database = require('../config');

const billings = require('./seed/billing.json')
const keys = Object.keys(billings);

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const billingsRef = database.ref(`/billings/${id}`);
        const promises = keys.map(key => {
            return billingsRef.push(billings[key]);
        });
        return Promise.all(promises);
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });