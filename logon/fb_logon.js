const firebase = require('firebase');
const database = require('../config');

var provider = new firebase.auth.FacebookAuthProvider();

export default function logOnWithFacebook(e) {
  e.preventDefault();
  firebase.auth().signInWithPopup(provider)
    .then(function (data) {
      var user = data.user;
      const usersRef = database.ref(`/users/${user.uid}`);
      usersRef.push({
        displayName: user.displayName,
        email: user.email,
        // lastName:  now in the displayName
        // password: no longer relevant, not passed from FB
        phoneNumber: user.phoneNumber,
        createdOn: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        avatar: user.photoURL
      });
    })
    .catch(function (error) {
      console.log(error)
    });

}
