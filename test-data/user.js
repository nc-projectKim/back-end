const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();
const usersRef = database.ref('/users');
const users = require('./seed/users.json')

const password = 'password123'
const email = 'John.Jones@google.com'


const keys = Object.keys(users);

const promises = keys.map(key => {
    firebase.auth().createUserWithEmailAndPassword(`${key}@gmail.com`, password)
});

Promise.all(promises)
    .then(function (data) {
        console.log(data)
    })
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then(function (data) {
    //         usersRef.push({
    //             ID: data.uid,
    //             firstName: 'John',
    //             lastName: 'Smith',
    //             password: password,
    //             phoneNumber: 0161123456,
    //             createdOn: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    //             avatar: 'www.google.com/avatar.jpg'
    //         });
    //     })
    .catch(function (err) {
        console.log(err)
    });
