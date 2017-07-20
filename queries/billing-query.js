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

const findWord = 'ut';

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
                const test = childObject.description.indexOf(findWord) !== -1 || 
                        childObject.note.indexOf(findWord) !== -1 ||
                        childObject.client.indexOf(findWord) !== -1;
                if (queryItems[key] !== null && childObject[key] !== queryItems[key]) {
                    include = false;
                }
                if (test) include = false;
                console.log(key, queryItems[key], childObject[key], include);
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
