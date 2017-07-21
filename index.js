const firebase = require('firebase');
const config = require('./config');


firebase.initializeApp(config);

const ref = firebase.app().database().ref();
ref.once('value')
 .then(function (snap) {
 console.log('snap.val()', snap.val());
 });
