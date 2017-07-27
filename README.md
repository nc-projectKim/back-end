# Project Kim Server Side

## Installation

You will need nodejs installed locally.
To install:
1. Clone the repo:
```bash
git clone https://github.com/nc-projectKim/back-end.git
```
2. Install dependencies.
``` bash
npm install
```
3. You will need a valid firebase config file. See below for details.

## Purpose

Project Kim is based around a Firebase back-end. (See <https://firebase.google.com/docs/>). The purpose of this code is to enable/assist:
1. Login and authentication (through Facebook)
2. Database management including deployment of cloud functions for data validation
3. Database seeding for development
4. Coding basic CRUD operations (although this code has mainly been ported to the front end for deployment.)
5. Query logic (ported to front end).

## Design

Much of the functionality normally associated with the server side of an application is provided by Firebase without the need for extensive coding. Some of the server-side functionality around data validation is included here (in the `functions` folder) but deployed to Firebase for production.

We made a decision early in the project to implement authentication through Facebook and the code to achieve this is presented in the `logon` folder.

Database seeding for development purposes was carried out using `faker`. Firebase stores data as JSON, so no models are enforced as classes on the back end, but the following models were adopted for consistency with front-end functionality:

### Notes
``` javascript
"[NOTE_ID]": {
		"created": 1487863286000, // Unix time stamp
		"text": "Dolor et cumque eius similique non ad deserunt. Ab assumenda id tempore nihil doloribus delectus. Ad consequuntur accusantium esse aliquam qui laudantium iusto et.",
		"title": "quod-alias-et",
		"tags": [
			"Quality-focused"
		],
		"lastEditTime": 1487863286000 // Unix time stamp
	}
```

### Expenses
``` javascript
"[EXPENSE_ID]": {
		"created": 1495129652000, // Unix time stamp
		"expenseDate": 1484928685000, // Unix time stamp
		"amount": 37.69,
		"currency": "GBP",
		"description": "Voluptatem quaerat dolorum autem qui dolores beatae et modi voluptatum.",
		"haveReceipt": true, // boolean
		"chargeTo": "Mertz Inc",
		"lastEditTime": 1495129652000 // Unix time stamp
	}
```

Queries return all the entities for a given user and are then filtered at the front-end. Possible filters include by date, key words and boolean flags. This functionality is called from the front-end applications, as are the basic CRUD calls.

In order to run the code, you will need a valid firebase config file which might look like this:
``` javascript
const firebase = require('firebase');

const config = {
  apiKey: "AIzaSytXLv_9kV5zzh1-iNTL7PQB4iS-eXJnEE", // provided by firebase
  authDomain: "myfabproject.firebaseapp.com",
  databaseURL: "https://myfabproject.firebaseio.com",
  projectId: "myfabproject",
  storageBucket: "myfabproject.appspot.com",
  messagingSenderId: "178884992366" // provided by firebase
};

firebase.initializeApp(config);
const database = firebase.database();

module.exports = database;
```

To get these credentials, sign up for Firebase and click on ```Add Project```.
# Project-Overview
