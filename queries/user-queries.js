const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const database = firebase.database();
const userRef = database.ref('/users')

userRef.once('value')
 .then(function (snap) {
 console.log('snap.val()', snap.val());
 });
