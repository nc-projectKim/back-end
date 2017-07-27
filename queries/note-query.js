//Function to query a user's notes using keywords or edit dates, or a combination of the two;
//This functionality has been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

// Sample query
const query = {
    dateItems: {
        dateChosen: 'lastEditTime',
        from: 1484335371000,
        to: 1501197395000
    },
    findWord: 'labore',
    queryTags: ['Sticky']
};

// Main on-submit function
// The function takes the output of a user query as the variable "query" and uses its elements to filter through user's notes

function queryNotes(query) {
    const userId = firebase.auth().currentUser.uid;
    return database.ref(`/notes/${userId}/`)
})
        .then((noteRef) => {
    return noteRef.once('value');
})
    .then(function (data) {
        const dataObj = {};
        data.forEach(function (childData) {
            const childObject = childData.val();
            const testDate = childObject[query.dateItems.dateChosen] >= query.dateItems.from
                && childObject[query.dateItems.dateChosen] <= query.dateItems.to;
            let include = true;
            if (!filterByTag(childObject)) include = false;
            if (query.findWord !== null) {
                const regex = new RegExp(query.findWord, 'i');
                const testWord = regex.test(childObject.text) ||
                    regex.test(childObject.title);
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
}

// helper function to iterate through the tags

function filterByTag(note) {
    const regexes = query.queryTags.map((ele) => {
        return new RegExp(ele, 'i')
    });
    if (note.tags) {
        var containsAll = true;
        for (var i = 0; i < regexes.length; i++) {
            const filtered = note.tags.filter((ele) => {
                return regexes[i].test(ele);
            }).length;

            if (filtered === 0) {
                containsAll = false;
                break;
            }
        }
        return containsAll;
    }
    else return false;
}

module.exports = queryNotes, filterByTag;

