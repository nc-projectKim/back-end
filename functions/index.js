const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

exports.newNoteValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const original = req.body;
    if (!original.created || isNaN(original.created)) original.created = Date.now();
    if (typeof original.text !== 'string') original.text = original.text.toString();
    if (!original.title) {
      const noteDate = new Date(original.created).toUTCString()
      original.title = `Note created on ${noteDate}`;
    }
    if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
    const notesRef = admin.database().ref(`/notes/${original.userId}`);
    notesRef.push(original);
    res.status(200).send(original)
  });
});

exports.updatedNoteValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const original = req.body;
    const noteId = original.noteId
    const notesRef = admin.database().ref(`/notes/${original.userId}/${noteId}`);
    if (original.title) notesRef.update({"title" : original.title})
    if (original.text) {
      if (typeof original.text !== 'string') original.text = original.text.toString();
      notesRef.update({ "text": original.text })
    }
    if (original.tags) notesRef.update({ "tags": original.tags })
    notesRef.update({ "lastEditTime": Date.now() })
    res.status(200).send(original)
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
    const original = req.body;
    if (!original.created || isNaN(original.created)) original.created = Date.now();
    if (!original.expenseDate || isNaN(original.expenseDate)) original.expenseDate = Date.now();
    if (!original.currency) original.currency = 'GBP';
    if (typeof original.currency !== 'string') original.currency = original.currency.toString();
    if (!original.description) {
      const expenseDate = new Date(original.created).toUTCString()
      original.description = `Expense created on ${expenseDate}`;
    }
    if (typeof original.description !== 'string') original.description = original.description.toString();
    if (typeof original.haveReceipt !== 'boolean') original.haveReceipt = false;
    if (typeof original.chargeTo !== 'string') original.chargeTo = original.chargeTo.toString();
    if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
    const expensesRef = admin.database().ref(`/expenses/${original.userId}`);
    expensesRef.push(original);
    res.status(200).send(original)
  });
});

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


exports.newBillingValidation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const original = req.body;
    if (!original.created || isNaN(original.created)) original.created = Date.now();
    if (!original.billDate || isNaN(original.billDate)) original.billDate = Date.now();
    if (!original.dueDate || isNaN(original.dueDate)) {
      original.dueDate = Date.now();
      original.dueDate.setTime(original.dueDate.getTime() + 30);
    }
    if (typeof original.client !== 'string') original.client = original.client.toString();
    if (!original.amount) original.amount = original.rate * original.timeWorked;
    if (!original.currency) original.currency = 'GBP';
    if (typeof original.currency !== 'string') original.currency = original.currency.toString();
    if (!original.description) {
      const billingDate = new Date(original.created).toUTCString()
      original.description = `Billing to ${original.client} created on ${billingDate}`;
    }
    if (typeof original.description !== 'string') original.description = original.description.toString();
    if (typeof original.note !== 'string') original.note = original.note.toString();
    if (typeof original.invoiced !== 'boolean') original.invoiced = false;
    if (typeof original.received !== 'boolean') original.received = false;
    if (Date.now() > original.dueDate) original.overdue = true;
    if (typeof original.overdue !== 'boolean') original.overdue = false;
    if (!original.lastEditTime || isNaN(original.lastEditTime)) original.lastEditTime = Date.now();
    const billingsRef = admin.database().ref(`/billings/${original.userId}`);
    billingsRef.push(original);
    res.status(200).send(original)
  });
});

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