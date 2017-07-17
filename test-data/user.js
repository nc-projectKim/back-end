const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();
const usersRef = database.ref('/users');

const email = 'John.Smith3@gmail.com';
const password = 'password123'

firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (data) {
        usersRef.push({
            ID: data.uid,
            firstName: 'John',
            lastName: 'Smith',
            password: password,
            phoneNumber: 0161123456,
            createdOn: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            avatar: 'www.google.com/avatar.jpg'
        });
    })
    .catch(function (err) {
        console.log(err)
    });