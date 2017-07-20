const firebase = require('firebase');
const config = require('../../config');
const _ = require('underscore')

// variables required for testing the query
const email = 'John.Smith@google1.com';
const password = 'password123';

const query = {
    createdFrom: 1484335371000,
    createdTo: 1488197395000,
    expenseDateFrom: null,
    expenseDateTo: null,
    lastEditTimeFrom: null,
    lastEditTimeTo: null,
    searchTerm: 'temporibus',
    haveReceipt: true
}

firebase.initializeApp(config);

const database = firebase.database();

function queryExpense(query) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            return database.ref(`/expenses/${data.uid}/`)
        })
        .then((noteRef) => {
            return noteRef.once('value');
        })
        .then((data) => {
            const dataObj = {};
            data.forEach((childData) => {
                dataObj[childData.key] = childData.val();
                dataObj[childData.key]['key'] = childData.key
            });
            return dataObj;
        }).then((data) => {
            return _.chain(data)
                .filter(filterByCreatedDate)
                .sortBy('created')
        }).then(output => console.log(output))
}

function filterByCreatedDate(expense) {
    if (!query.createdFrom && !query.createdTo) return expense;
    else return expense.created >= query.createdFrom && expense.created <= queryCreatedTo;
}

queryExpense(startDate, endDate)

