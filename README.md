# express-ts [![Build Status](https://travis-ci.com/Raul6469/express-ts.svg?branch=master)](https://travis-ci.com/Raul6469/express-ts) [![codecov](https://codecov.io/gh/Raul6469/express-ts/branch/master/graph/badge.svg)](https://codecov.io/gh/Raul6469/express-ts) [![Maintainability](https://api.codeclimate.com/v1/badges/0627f1c3093f2a7c72c2/maintainability)](https://codeclimate.com/github/Raul6469/express-ts/maintainability) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/01cec4e5e46142899a3839e704eefeaa)](https://www.codacy.com/app/vb4007/express-ts?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Raul6469/express-ts&amp;utm_campaign=Badge_Grade)

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
