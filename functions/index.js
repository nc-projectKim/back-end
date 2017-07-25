const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

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
      .then(() => {
        res.status(200).send('note created')
      });
  });
});

exports.updatedNoteValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    const noteId = dataObj.noteId
    const notesRef = admin.database().ref(`/notes/${dataObj.userId}/${noteId}`);
    if (typeof dataObj.text !== 'string') dataObj.text = dataObj.text.toString();
    dataObj.lastEditTime = Date.now();
    notesRef.update(dataObj)
      .then(() => {
        res.status(200).send('note updated')
      })

  });
});

//old version of note validation
// exports.validateNote = functions.database.ref('/notes/{userId}/{noteId}')
//   .onWrite(event => {
//     const original = event.data.val()
//     console.log(event.data.val());
//     if (!original.created || isNaN(original.created)) original.created = Date.now();
//     if (typeof original.text !== 'string') original.text = original.text.toString();
//     if (!original.title) {
//       const noteDate = new Date(original.created).toUTCString()
//       original.title = `Note created on ${noteDate}`;
//     }
//     if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
//     return event.data.ref.set(original);
//   });

exports.newExpenseValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    if (!dataObj.created || isNaN(dataObj.created)) dataObj.created = Date.now();
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
    if (!dataObj.lastEditTime || isNaN(dataObj.lastEditTime)) dataObj.lastEditTime = Date.now();
    admin.database().ref(`/expenses/${dataObj.userId}`)
    .push(dataObj)
      .then(() => {
        res.status(200).send('expense created')
      });
  });
});

exports.updatedExpenseValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dataObj = req.body;
    const expenseId = dataObj.expenseId;
    if (typeof dataObj.currency !== 'string') dataObj.currency = dataObj.currency.toString();
    if (typeof dataObj.description !== 'string') dataObj.description = dataObj.description.toString();
    if (typeof dataObj.chargeTo !== 'string') dataObj.chargeTo = dataObj.chargeTo.toString();
    dataObj.lastEditTime = Date.now();
    admin.database().ref(`/expenses/${dataObj.userId}/${expenseId}`).update(dataObj)
      .then(() => {
        res.status(200).send('expense updated')
      });
  });
});

//old version of expense validation
// exports.validateExpense = functions.database.ref('/expenses/{userId}/{expenseId}')
//   .onWrite(event => {
//     const original = event.data.val()
//     if (!original.created || isNaN(original.created)) original.created = Date.now();
//     if (!original.expenseDate || isNaN(original.expenseDate)) original.expenseDate = Date.now();
//     if (!original.currency) original.currency = 'GBP';
//     if (typeof original.currency !== 'string') original.currency = original.currency.toString();
//     if (!original.description) {
//       const expenseDate = new Date(original.created).toUTCString()
//       original.description = `Expense created on ${expenseDate}`;
//     }
//     if (typeof original.description !== 'string') original.description = original.description.toString();
//     if (typeof original.haveReceipt !== 'boolean') original.haveReceipt = false;
//     if (typeof original.chargeTo !== 'string') original.chargeTo = original.chargeTo.toString();
//     if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
//     return event.data.ref.set(original);
//   });


// Billing validation - not yet in production
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

// exports.validateBilling = functions.database.ref('/billings/{userId}/{billingId}')
//   .onWrite(event => {
//     const original = event.data.val()
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
//     return event.data.ref.set(original);
//   });
