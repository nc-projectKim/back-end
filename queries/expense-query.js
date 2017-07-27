//Function to query a user's expenses using keywords, edit dates, client names and receipt flags or a combination of any of the above;
//This functionality has been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');


// sample query
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

// Main on-submit function
// The function takes the output of a user query as the variable "query" and uses its elements to filter through user's expenses

function queryExpenses(query) {
    const userId = firebase.auth().currentUser.uid;
    return database.ref(`/expenses/${userId}/`)
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

module.exports = queryExpenses;