const firebase = require('firebase');
const database = require('../config');

const userRef = database.ref('/users')

userRef.once('value')
 .then(function (snap) {
 console.log('snap.val()', snap.val());
 });
