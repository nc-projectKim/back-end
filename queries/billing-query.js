const firebase = require('firebase');
const database = require('../config');

const query = {
    dateItems: {
        dateChosen: 'billDate',
        from: 1484335371000,
        to: 1488197395000
    },
    findWord: 'dolore',
    queryItems:{
        invoiced: true,
        overdue: null,
        client: null
    }
};

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/billings/${data.uid}/`)
    })
    .then((billingRef) => {
       return billingRef.once('value');
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
