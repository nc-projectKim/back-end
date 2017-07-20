const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();

const query = {
    dateItems: {
        dateChosen: 'lastEditTime',
        from: 1484335371000,
        to: 1501197395000
    },
    findWord: 'labore',
    queryTags: ['Sticky']
};

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/notes/${data.uid}/`)
    })
    .then((noteRef) => {
       return noteRef.once('value');
    })
    .then(function (data) {
        const dataObj = {};
        data.forEach(function(childData) {
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
    .then(function(obj) {
        console.log(obj);
    });

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
