const firebase = require('firebase');
const config = require('../config');
const _ = require('underscore')

firebase.initializeApp(config);

const database = firebase.database();

const queryItems = {
    invoiced: true,
    overdue: null,
    client: null,
};

const findWord = /dolore/i;

const dateItems = {
    dateChosen: 'billDate',
    from: 1484335371000,
    to: 1488197395000
};

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/billings/${data.uid}/`)
    })
    .then((noteRef) => {
       return noteRef.once('value');
    })
    .then(function (data) {
        const dataObj = {};
        data.forEach(function(childData) {
            const childObject = childData.val();
            const testDate = childObject[dateItems.dateChosen] >= dateItems.from
                            && childObject[dateItems.dateChosen] <= dateItems.to;
            let include = true;
            for (let key of Object.keys(queryItems)) {
                if (queryItems[key] !== null && childObject[key] !== queryItems[key]) {
                    include = false;
                }
            }
            const testWord = findWord.test(childObject.description) || 
                    findWord.test(childObject) ||
                    findWord.test(childObject);
            if (!testWord) include = false;
            console.log(childObject.description, childObject.client, childObject.note, testWord);
            if (include && testDate) {
                dataObj[childData.key] = childData.val();
            }
        });
        return dataObj; 
    })
    .then(function(obj) {
        console.log(obj);
    });
