const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = require('../config')
admin.initializeApp(functions.config().firebase);

exports.validateNote = functions.database.ref('/notes')
    .onWrite(event => {
        const original = event.data.val();
        if (!original.created || isNaN(original.created)) original.created = Date.now();
        if (typeof original.text !== 'string') original.text = original.text.toString();
        if (!original.title) original.title = `Note created on ${original.created.toDateString()}`;
        if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
        return event.data.ref.set(original);
    });