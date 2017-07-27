//test function to delete a note
//this functionality has been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

export default deleteNote = (noteId) => {
    const userId = firebase.auth().currentUser.uid;
    const noteRef = database.ref(`/notes/${userId}/${noteId}`)
    return noteRef.remove()
        .catch(err => {
        console.log(err);
    });

}