const firebase = require('firebase');
const config = require('../config');
const expenses = require('./seed/expenses.json')
const keys = Object.keys(expenses);

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
        const expensesRef = database.ref(`/expenses/${id}`);
        const promises = keys.map(key => {
            return expensesRef.push(expenses[key]);
        });
        return Promise.all(promises);
    })
    .then(function (data) {
        console.log(data);
        // expensesRef.on('child_added', (snap) => console.log(snap.val())) 
        // return expensesRef.push(note);
    })
    .catch(function (err) {
        console.log(err);
    });