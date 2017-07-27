//test function to delete a billing
//this functionality has NOT YET been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

export default deleteBilling = (billingId) => {
    const userId = firebase.auth().currentUser.uid;
    const billingRef = database.ref(`/billings/${userId}/${noteId}`)
    return billingRef.remove()
        .catch(err => {
            console.log(err);
        });