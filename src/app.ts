import * as express from 'express'
import { Request, Response } from 'express'

import * as greeting from './api/greeting'

const app = express()

app.get('/', greeting.hello)

app.listen(3000, () => console.log('Example app listening on port 3000!'))