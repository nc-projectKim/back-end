const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const nodemailer = require('nodemailer');

// const gmailEmail = encodeURIComponent(functions.config().gmail.email);
// const gmailPassword = encodeURIComponent(functions.config().gmail.password);
// const mailTransport = nodemailer.createTransport(
//     `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(event => {
//   const snapshot = event.data;
//   const val = snapshot.val();

//   const mailOptions = {
//     from: '"Kim" <noreply@firebase.com>',
//     to: val.email
//   };

//     mailOptions.subject = 'Thanks and Welcome!';
//     mailOptions.text = 'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.';
//     return mailTransport.sendMail(mailOptions).then(() => {
//       console.log('New subscription confirmation email sent to:', val.email);
//     }).catch(error => {
//       console.error('There was an error while sending the email:', error);  
//     });
// });

exports.validateNote = functions.database.ref('/notes/{userId}/{noteId}')
    .onCreate(event => {
        const original = event.data.val()
        console.log(event.data.val());
        if (!original.created || isNaN(original.created)) original.created = Date.now();
        if (typeof original.text !== 'string') original.text = original.text.toString();
        if (!original.title) {
          const noteDate = new Date(original.created).toUTCString()
          original.title = `Note created on ${noteDate}`;
        }
        if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
        return event.data.ref.set(original);
    });