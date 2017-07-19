const firebase = require('firebase');
const config = require('../config');
const _ = require('underscore')

firebase.initializeApp(config);

const database = firebase.database();

firebase.auth().signInWithEmailAndPassword('John.Smith@google1.com', 'password123')
    .then((data) => {
        return database.ref(`/billings/${data.uid}/`);
    })
    .then((billRef) => {
       return billRef.once('value');
    })
    .then(function (data) {
        const dataObj = {};
        data.forEach(function(childData) {
            const test = childData.val().description.indexOf('temporibus') !== -1 || 
                        childData.val().note.indexOf('temporibus') !== -1 ||
                        childData.val().client.indexOf('temporibus') !== -1;
            if (test) {
                dataObj[childData.key] = childData.val();
            }
        });
        return dataObj; 
    })
    .then(function(obj) {
        console.log(_.map(obj, function (item, key) {
            return {key, desc:item.description, note:item.note, client:item.client};
        }));
    });
