const firebase = require('firebase');
const config = require('../config');
const billings = require('./seed/billing.json')
const keys = Object.keys(billings);

firebase.initializeApp(config);

const database = firebase.database();

// const note = {
//     created: Date.now(),
//     title: 'The Brothers Karamazov',
//     text: 'Doomed',
//     tags: ['code', 'firebase'],
//     lastEditTime: Date.now()
// };

// Sign in existing user
firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return data.uid;
    })
    .then((id) => {
        const billingsRef = database.ref(`/billings/${id}`);
        const promises = keys.map(key => {
            return billingsRef.push(billings[key]);
        });
        return Promise.all(promises);
    })
    .then(function (data) {
        console.log(data);
        // billingsRef.on('child_added', (snap) => console.log(snap.val())) 
        // return billingsRef.push(note);
    })
    .catch(function (err) {
        console.log(err);
    });