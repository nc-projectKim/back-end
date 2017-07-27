//test function to update a note without validation
//this functionality has been moved to the front-end repository

const firebase = require('firebase');
const database = require('../config');

const {email, password} = require('../test-user-config');

//sample updated note
const newNote = {
    tags: ['sticky'],
    lastEditTime: Date.now()
}

module.exports = updateNote =(noteId) => {
    const userId = firebase.auth().currentUser.uid;
    const noteRef = database.ref(`/notes/${userId}/${noteId}`)
    return noteRef.update(newNote)
        .catch(err => {
            console.log(err);
        });

};