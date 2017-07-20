const firebase = require('firebase');
const database = require('../config');

const users = require('./seed/users.json')

const password = 'password123'
const email = 'John.Smith@google1.com'

firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (data) {
        const usersRef = database.ref(`/users/${data.uid}`);
        usersRef.push({
            firstName: 'John',
            lastName: 'Smith',
            password: password,
            phoneNumber: 0161987654,
            createdOn: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
            avatar: 'www.google.com/avatar2.jpg'
        });
    })
    .catch(function (err) {
        console.log(err)
    });


// code previously used to seed users
// const keys = Object.keys(users);

// const promises = keys.map(key => {
//     firebase.auth().createUserWithEmailAndPassword(`${key}@google.com`, password)
// });

// Promise.all(promises)
//     .then(function (data) {
//         console.log(data)
//     })
