const firebase = require('firebase');
const config = require('../config');

// variables required for testing the query
const email = 'John.Smith@google1.com';
const password = 'password123';

const query = {
    dateItems: {
        dateChosen: 'expenseDate',
        from: 1484335371000,
        to: 1501197395000
    },
    findWord: 'animi',
    queryItems: {
        haveReceipt: true,
        chargeTo: null
    }
};

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
        return database.ref(`/expenses/${data.uid}/`)
    })
    .then((expenseRef) => {
       return expenseRef.once('value');
    })
    .then(function (data) {
        const dataObj = {};
        data.forEach(function(childData) {
            const childObject = childData.val();
            const testDate = childObject[query.dateItems.dateChosen] >= query.dateItems.from
                            && childObject[query.dateItems.dateChosen] <= query.dateItems.to;
            let include = true;
            for (let key of Object.keys(query.queryItems)) {
                if (query.queryItems[key] !== null && childObject[key] !== query.queryItems[key]) {
                    include = false;
                }
            }
            if (query.findWord !== null) {
                const regex = new RegExp(query.findWord, 'i');
                const testWord = regex.test(childObject.description) || 
                        regex.test(childObject.note) ||
                        regex.test(childObject.client);
                if (!testWord) include = false;
            }
            if (include && testDate) {
                dataObj[childData.key] = childData.val();
            }
        });
        return dataObj; 
    })
    .then(function(obj) {
        console.log(obj);
    });

