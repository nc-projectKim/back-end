// Firebase Cloud functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

// function to validate a new note
exports.newNoteValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    dataObj.created = Date.now();
    if (typeof dataObj.text !== 'string') dataObj.text = dataObj.text.toString();
    if (!dataObj.title) {
      const noteDate = new Date(dataObj.created).toUTCString()
      dataObj.title = `Note created on ${noteDate}`;
    }
    dataObj.lastEditTime = Date.now();
    admin.database().ref(`/notes/${dataObj.userId}`)
      .push(dataObj)
    res.status(200).end('note created')
  });
});


// function to validate an updated note
exports.updatedNoteValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    const noteId = dataObj.noteId
    const notesRef = admin.database().ref(`/notes/${dataObj.userId}/${noteId}`);
    if (typeof dataObj.text !== 'string') dataObj.text = dataObj.text.toString();
    dataObj.lastEditTime = Date.now();
    notesRef.update(dataObj)
    res.status(200).send('note updated')
  });
});

// function to validate a new expense
exports.newExpenseValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    dataObj.created = Date.now();
    if (!dataObj.expenseDate || isNaN(dataObj.expenseDate)) dataObj.expenseDate = Date.now();
    if (!dataObj.currency) dataObj.currency = 'GBP';
    if (typeof dataObj.currency !== 'string') dataObj.currency = dataObj.currency.toString();
    if (!dataObj.description) {
      const expenseDate = new Date(dataObj.created).toUTCString()
      dataObj.description = `Expense created on ${expenseDate}`;
    }
    if (typeof dataObj.description !== 'string') dataObj.description = dataObj.description.toString();
    if (typeof dataObj.haveReceipt !== 'boolean') dataObj.haveReceipt = false;
    if (typeof dataObj.chargeTo !== 'string') dataObj.chargeTo = dataObj.chargeTo.toString();
    dataObj.lastEditTime = Date.now();
    admin.database().ref(`/expenses/${dataObj.userId}`)
      .push(dataObj)
    res.status(200).send('expense created')
  });
});

//Function to validate an updated expense
exports.updatedExpenseValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    const expenseId = dataObj.expenseId;
    if (typeof dataObj.currency !== 'string') dataObj.currency = dataObj.currency.toString();
    if (typeof dataObj.description !== 'string') dataObj.description = dataObj.description.toString();
    if (typeof dataObj.chargeTo !== 'string') dataObj.chargeTo = dataObj.chargeTo.toString();
    dataObj.lastEditTime = Date.now();
    admin.database().ref(`/expenses/${dataObj.userId}/${expenseId}`).update(dataObj)
    res.status(200).send('expense updated')
  });
});




// Function to validate a new billing - not yet in production
// exports.newBillingValidation = functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
//     const original = req.body;
//     if (!original.created || isNaN(original.created)) original.created = Date.now();
//     if (!original.billDate || isNaN(original.billDate)) original.billDate = Date.now();
//     if (!original.dueDate || isNaN(original.dueDate)) {
//       original.dueDate = Date.now();
//       original.dueDate.setTime(original.dueDate.getTime() + 30);
//     }
//     if (typeof original.client !== 'string') original.client = original.client.toString();
//     if (!original.amount) original.amount = original.rate * original.timeWorked;
//     if (!original.currency) original.currency = 'GBP';
//     if (typeof original.currency !== 'string') original.currency = original.currency.toString();
//     if (!original.description) {
//       const billingDate = new Date(original.created).toUTCString()
//       original.description = `Billing to ${original.client} created on ${billingDate}`;
//     }
//     if (typeof original.description !== 'string') original.description = original.description.toString();
//     if (typeof original.note !== 'string') original.note = original.note.toString();
//     if (typeof original.invoiced !== 'boolean') original.invoiced = false;
//     if (typeof original.received !== 'boolean') original.received = false;
//     if (Date.now() > original.dueDate) original.overdue = true;
//     if (typeof original.overdue !== 'boolean') original.overdue = false;
//     if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
//     const billingsRef = admin.database().ref(`/billings/${original.userId}`);
//     billingsRef.push(original);
//     res.status(200).send(original)
//   });
// });

