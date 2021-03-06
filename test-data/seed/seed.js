// functions to create test data and save to JSON

const faker = require('faker');
const fs = require('fs');

// creates random test database

// create user objects
function createUserData() {
    let data = {};
    for (let k = 0; k < 50; k++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const phoneNumber = faker.phone.phoneNumber();
        const avatar = faker.internet.avatar();
        data['user' + k.toString()] = {firstName, lastName, phoneNumber, avatar};
    }
    const fileData = JSON.stringify(data);
    fs.writeFile('users.json', fileData, function (err) {
        console.log(err);
    });
}

// create note objects
function createNotesData() {
    let data = {};
    const milli = 7776;
    const top = 1501100000000;
    for (let k = 0; k < 25; k++) {
        const created = fakeRandomDate();
        const text = faker.lorem.paragraph();
        const title = faker.lorem.slug();
        const tags = [];
        const randLength = Math.floor(Math.random() * 3);
        for (let k = 0; k < randLength; k++) {
            tags.push(faker.random.word());
        }
        const randPeriod = Math.floor(Math.random() * milli * 1000000);
        const lastEditTime = Math.random() > 0.7 ? Math.max(top, created + randPeriod) : created;
        data['note' + k.toString()] = {created, text, title, tags, lastEditTime};
    }
    const fileData = JSON.stringify(data, null, '\t');
    fs.writeFile('notes.json', fileData, function (err) {
        console.log(err);
    });
}

// create expenses objects
function createExpensesData() {
    let data = {};
    const milli = 7776;
    const top = 1498680060000;
    for (let k = 0; k < 25; k++) {
        const created = fakeRandomDate();
        const expenseDate = fakeRandomDate();
        const amount = Math.floor(Math.random() * 10000) / 100;
        const currency = 'GBP';
        const description = faker.lorem.sentence();
        const haveReceipt = Math.random() > 0.5 ? true : false;
        const chargeTo = faker.company.companyName();
        const randPeriod = Math.floor(Math.random() * milli * 1000000);
        const lastEditTime = Math.random() > 0.7 ? Math.max(top, created + randPeriod) : created;
        data['expense' + k.toString()] = {created, expenseDate, amount, currency, description, haveReceipt,
                                            chargeTo, lastEditTime};
    }
    const fileData = JSON.stringify(data, null, '\t');
    fs.writeFile('expenses.json', fileData, function (err) {
        console.log(err);
    });
}

// create billing objects (not delivered)
function createBillingData() {
    let data = {};
    const milli = 7776;
    const top = 1498680060000;
    for (let k = 0; k < 25; k++) {
        const created = fakeRandomDate();
        const billDate = fakeRandomDate();
        const rate = Math.floor(Math.random() * 50000) / 100;
        const timeWorked = Math.floor(Math.random() * 50) / 10;
        const amount = Math.floor(Math.random() * 10000) / 100;
        const currency = 'GBP';
        const description = faker.lorem.sentence();
        const client = faker.company.companyName();
        const note = faker.lorem.sentence();
        const invoiced = Math.random() > 0.5 ? true : false;
        const randPeriod1 = Math.floor(Math.random() * milli * 1000000);
        const dueDate = created + randPeriod1;
        const received = Math.random() > 0.5 ? true : false;
        const overdue = Math.random() > 0.5 ? true : false;
        const lastEditTime = Math.random() > 0.7 ? Math.max(top, created + randPeriod1) : created;
        data['bill' + k.toString()] = {created, billDate, rate, timeWorked, amount, currency, 
                                        description, client, note, invoiced, dueDate, received, overdue, lastEditTime};
    }
    const fileData = JSON.stringify(data, null, '\t');
    fs.writeFile('billing.json', fileData, function (err) {
        console.log(err);
    });
}

// helper functions
function fakeRandomDate() {
    const rand1 = randBetween(0,5);
    const rand2 = randBetween(1,28);
    const rand3 = randBetween(8, 20);
    const rand4 = randBetween(0, 60);
    const rand5 = randBetween(0, 60);
    return new Date(2017, rand1, rand2, rand3, rand4, rand5).valueOf();
}

function randBetween(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

// call
createExpensesData();
createUserData();
createNotesData();
// createBillingData();