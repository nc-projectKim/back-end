const firebase = require('firebase');
const database = require('../config');

const newNote = {
    tags: ['sticky'],
    lastEditTime: Date.now()
}

// firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
//     .then((data) => {
//         return data.uid;
//     })
//     .then(function (id) {
//         const noteRef = database.ref(`/notes/${id}/-KpK3h4bwr6VoaRh8aex`)
//         return noteRef.update(newNote);
//     })

export default updateNote(noteId) {
    const updatedNote = {
        text: 'Doomed1',
        lastEditTime: Date.now()
    };
    const userId = firebase.auth().currentUser.uid;
    const noteRef = database.ref(`/notes/${userId}/${noteId}`)
    return noteRef.update(newNote)
        .catch(err => {
            console.log(err);
        });

}