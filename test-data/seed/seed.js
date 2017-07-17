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

createUserData();