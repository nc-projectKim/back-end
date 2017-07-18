const faker = require('faker');
const fs = require('fs');

// creates random test database

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

function createNotesData() {
    let data = {};
    const milli = 7776;
    const top = 1498680060000;
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

createNotesData();