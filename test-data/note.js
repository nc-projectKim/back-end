const firebase = require('firebase');
const database = require('../config');

const notes = require('./seed/notes.json')
const keys = Object.keys(notes);

//     const note = {
//         created: 'banana',
//         text: 'Doomed',
//         tags: ['code', 'firebase'],
//         lastEditTime: null
//     }

// firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
//     .then((data) => {
//         return data.uid;
//     })
//     .then((id) => {
//         const notesRef = database.ref(`/notes/${id}`);
//             return notesRef.push(note)
//         .then(res => {
//             note.key = res.key;
//         })
//         .catch(err => {
//             console.log(err);
//         });

//     });


//     const promises = keys.map(key => {
//         return notesRef.push(notes[key])
//     })
//     return Promise.all(promises)
// })
// .then(function (data) {
//     console.log(data)
//     // notesRef.on('child_added', (snap) => console.log(snap.val())) 
//     // return notesRef.push(note);
// })
// .catch(function (err) {
//     console.log(err);
// });


export default addNote(data) {
    const note = {
        created: Date.now(),
        title: data.title,
        text: data.text,
        tags: [...data.tags],
        lastEditTime: Date.now()
    };
    const userId = firebase.auth().currentUser.uid;
    const notesRef = database.ref(`/notes/${userId}`);
    return notesRef.push(note)
        .then(res => {
            note.key = res.key;
        })
        .catch(err => {
            console.log(err);
        });

}

var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/notes/' + userId).once('value').then(function (snapshot) {
    return snapshot;
}).catch(function(error) {
    console.log(error)
});