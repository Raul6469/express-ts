# express-ts [![Build Status](https://travis-ci.com/Raul6469/express-ts.svg?branch=master)](https://travis-ci.com/Raul6469/express-ts) [![codecov](https://codecov.io/gh/Raul6469/express-ts/branch/master/graph/badge.svg)](https://codecov.io/gh/Raul6469/express-ts)

This is an attempt to build a simple REST API with Express, TypeScript and MongoDB, and unit testing with Jest. Feedback and contributions welcome!

## Execution

You will require these programs installed on your machine:
- NodeJS and npm
- MongoDB

You can use Postman to test the API endpoints.

1. Install required dependencies with `npm install`
2. Create a `db` folder in the project root and start MongoDB with `mongod --dbpath=db`
3. Create a `.env` file based on the `.env.example`. You can change the parameters if you want
4. Initialize the database data by running `npm run init-db`
5. Start the server with `npm start`

## Usage

### Authentication

You will have to provide a JSON Web Token to access the protected endpoints:

```
POST /auth
```

Body:
```json
{
	"username": "raul",
	"password": "pwd"
}
```

Provide the following header in each of your requests:
```
Authorization: Bearer <your token>
```

### Messages
You can create and view messages that will be stored in the database:

```
POST /message
```

Body:
```json
{
	"message": "test"
}
```

And to get the list of existing messages:

```
GET /message
```

## Testing

```
npm test
```
