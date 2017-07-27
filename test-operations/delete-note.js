const firebase = require('firebase');
const database = require('../config');

// firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
//     .then((data) => {
//         return data.uid;
//     })
//     .then(function (id) {
//         const noteRef = database.ref(`/notes/${id}/-KpK3h4_2mQgWYRAbfeN`)
//         return noteRef.remove();
//     })

export default function deleteNote(noteId) {
    const userId = firebase.auth().currentUser.uid;
    const noteRef = database.ref(`/notes/${userId}/${noteId}`)
    return noteRef.remove();
        .catch(err => {
        console.log(err);
    });

}