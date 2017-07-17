const firebase = require('firebase');
const config = require('../config')
const ref = firebase.database()

firebase.initializeApp(config);

const email = 'John.Smith1@gmail.com';
const password = 'password123'

var usersRef = ref.child(‘users’);

var userRef = usersRef.push();
console.log(‘user key’, userRef.key);
// Create a new ref and save data to it in one step
var userRef = usersRef.push({
 name: ‘Christopher’,
 description: ‘I eat too much ice cream’
});


// firebase.auth().createUserWithEmailAndPassword(email, password)
// .then(function (data) {
//     console.log(data.uid)
// })
//  .catch(function (err) {
//    console.log(err)
//  });