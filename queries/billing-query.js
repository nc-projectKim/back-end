//Function to query a user's expenses using keywords, edit dates, client names and receipt flags or a combination of any of the above;
//This functionality has NOT YET been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');


// sample query
const query = {
    dateItems: {
        dateChosen: 'billDate',
        from: 1484335371000,
        to: 1488197395000
    },
    findWord: 'dolore',
    queryItems: {
        invoiced: true,
        overdue: null,
        client: null
    }
};

// Main on-submit function
// The function takes the output of a user query as the variable "query" and uses its elements to filter through user's expenses

function queryBillings(query) {
    const userId = firebase.auth().currentUser.uid;
    return database.ref(`/billings/${userId}/`)
})
    .then((billingRef) => {
    return billingRef.once('value');
})
    .then(function (data) {
        const dataObj = {};
        data.forEach(function (childData) {
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
    .then(function (obj) {
        console.log(obj);
    });

    module.exports = queryBillings;
