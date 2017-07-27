//test function to delete an expense
//this functionality has been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

export default deleteExpense = (expenseId) => {
    const userId = firebase.auth().currentUser.uid;
    const expenseRef = database.ref(`/expenses/${userId}/${noteId}`)
    return expenseRef.remove()
        .catch(err => {
            console.log(err);
        });
}


