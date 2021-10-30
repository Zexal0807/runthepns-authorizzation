# runtheons-authorizzation

- [Introduction](https://github.com/Zexal0807/runtheons-authorizzation#introduction)
- [Getting started](https://github.com/Zexal0807/runtheons-authorizzation#getting-started)
  - [Prerequisites](https://github.com/Zexal0807/runtheons-authorizzation#prerequisites)
  - [Installation](https://github.com/Zexal0807/runtheons-authorizzation#installation)
- [Use](https://github.com/Zexal0807/runtheons-authorizzation#use)
- [Example of use](https://github.com/Zexal0807/runtheons-authorizzation#example-of-use)

# Introduction

This reposity manage the autorizzations of Runtheons BackEnd
The autorizzation is manage as a object (AuthorizzationToken), than explain which autorizzations you must have
Each autorizzations is calculate in a specific functions inside Authorizzation class
If the aforementioned documentation is not clear or contains errors, please report it immediately to the email address **bugs-documentation@runtheons.com** or report the issue here on GitHub. Please be extremely clear and precise in the description of the issue so that moderators can correct it as soon as possible.

# Getting started

## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/Zexal0807/runtheons-authorizzation` to add the package to the project

# Use

In your project create an `auth.js` file, where yuo specific the list of the avaible authorizzation

Use add method for add a new athorizzation

```javascript
void Authorizzation.add(String name, Object auth)
```

In auth object you must specific:

| Key   | Description                                                                                                     |
| ----- | --------------------------------------------------------------------------------------------------------------- |
| check | Is a function that recive a object contains the session data and the Express.Request, and must return a boolean |
| error | Is a function that will be call when check return false                                                         |

In auth object you can specific:
| Key | Description |
| ------- | --------------------------------------------------------------------------------------------------------------- |
| success | Is a function that will be call when check return true |

And then export the custom authorizzation for use the creted constant

For check an authorizzation use check method

```javascript
object Authorizzation.check(String[] const, Object session)
```

It return an object with `status` and an array of error (specify in error function of the auth)

# Example of use

Create an `auth.js` file like

```javascript
const Authorizzation = require('@runtheons/authorizzation');

var newAuth = {
	check: (session, req) => {
		return session == undefined;
	},
	success: () => {
		console.log('Authorizzation success');
	},
	error: () => {
		console.log('Authorizzation fail');
		return 'You are not logged';
	}
};

Authorizzation.add('NOT_LOGGED', newAuth);

module.exports = Authorizzation;
```

Then in your Express.js project

```javascript

const customAuthorizzation = require("./auth.js");

var session = getSession();

var isAuthorizzation = customAuthorizzation.check([ customAuthorizzation.NOT_LOGGED], session);

console.log(isAuthorizzation);

Result:
{
	result: true,
	errors: []
}
```
