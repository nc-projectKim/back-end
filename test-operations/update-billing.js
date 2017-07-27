//test function to update a billing
//this functionality has NOT YET been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

//sample updated billing
const newBilling = {
    amount: 1000.75,
    lastEditTime: Date.now()
}

module.exports = updateBilling =(noteId) => {
    const userId = firebase.auth().currentUser.uid;
    const billingRef = database.ref(`/billings/${userId}/${noteId}`)
        return billingRef.update(newBilling);
    });