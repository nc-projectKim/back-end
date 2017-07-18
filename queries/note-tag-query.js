const firebase = require('firebase');
const config = require('../config');
const _ = require('underscore');
const keywords = ['unbranded', 'payment']

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/notes/${data.uid}/`)
    })
    .then((noteRef) => {
        return noteRef.once('value');
    })
    .then(function (data) {
        return _.filter(data.val(), filterByTag);
    })
    .then(function (data) {
        console.log(data);
    });

function filterByTag(note) {
    const regexes = keywords.map((ele) => {
        return new RegExp(ele, 'i')
    });
    if (note.tags) {
        var containsAll = true;
        for (var i = 0; i < regexes.length; i++) {
            const filtered = note.tags.filter((ele) => {
                return regexes[i].test(ele)
            }).length

            if (filtered === 0) {
                containsAll = false;
                break;
            }
            // if (note.tags) return note.tags.filter((tag) => regex.test(tag)).length > 0;
            // // Initialize flag -> guess that this product is correct
            // containsAll = true;
            // for (var j = 0; j < regexes.length; j++) {
            //     // console.log(regexes[j].test(note.tags[i]))
            //     // console.log(note.tags[i])
            //     if (!regexes[j].test(note.tags[i])) {
            //         // This keyword is not matched -> incorrect product
            //         containsAll = false;
            //         break;
            //     }
            // }
            // // All note.tags has been matched

        }
        return containsAll;
    }
    else return false;

}
//     const regex = new RegExp('face', 'i')
//     if (note.tags) return note.tags.filter((tag) => regex.test(tag)).length > 0;
//     else return false; 
// }

