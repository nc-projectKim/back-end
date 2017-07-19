const firebase = require('firebase');
const config = require('../../config');
const _ = require('underscore')

const email = 'John.Smith@google1.com';
const password = 'password123';

// this variable will be passed to onSubmit handler based on whether the user ticks the box (to see expenses with receipts) or not;
const ticked = true;

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        return database.ref(`/expenses/${user.uid}/`)
    })
    .then((noteRef) => {
        return noteRef.once('value');
    })
    .then(function (data) {
        const dataObj = {};
        data.forEach(function(childData) {
            if (childData.val().haveReceipt === ticked) {
                dataObj[childData.key] = childData.val();
            }
        });
        return dataObj; 
    })
    .then(function(obj) {
        console.log(_.map(obj, function (item, key) {
            return {key, item};
        }));
    });