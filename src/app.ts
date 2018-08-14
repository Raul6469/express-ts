require('dotenv').config()

import express from "express";

import * as greeting from './api/greeting'
import { MessageAPI } from './api/messages-route'
import { AuthGuard } from './auth/auth-guard';
import { TokenIssuer } from './auth/token-issuer';

const app = express()

app.use(express.json())

app.use('/auth', TokenIssuer)

app.use(AuthGuard)

app.get('/', greeting.hello)
app.use('/message', MessageAPI)

app.listen(3000, () => console.log('Example app listening on port 3000!'))