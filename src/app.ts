import * as express from 'express'
import { Request, Response } from 'express'

import * as greeting from './api/greeting'
import { MessageAPI } from './api/messages-route'

const app = express()

app.use(express.json())

app.get('/', greeting.hello)
app.use('/message', MessageAPI)

app.listen(3000, () => console.log('Example app listening on port 3000!'))