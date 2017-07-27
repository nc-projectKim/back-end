// const firebase = require('firebase');

// bulk seed expenses for fake user
const database = require('../config');

const expenses = require('./seed/expenses.json')
const keys = Object.keys(expenses);


function enterExpenses () {
    const expensesRef = database.ref('/expenses/N3yaIqLPkoQZXgSmb8jmeZqTVw43');
    const promises = keys.map(key => {
        return expensesRef.push(expenses[key]);
    });
    return Promise.all(promises)
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });
}

enterExpenses();