require('dotenv').config()

import express from "express";

let cors = require('cors');

import * as greeting from './api/greeting'
import { MessageAPI } from './api/messages-route'
import { AuthGuard } from './auth/auth-guard';
import { TokenIssuer } from './auth/token-issuer';

const app = express()

app.use(cors())

app.use(express.json())

app.use('/auth', TokenIssuer)

app.use(AuthGuard)

app.get('/', greeting.hello)
app.use('/message', MessageAPI)

export default app;