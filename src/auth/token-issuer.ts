import * as express from 'express'
import { Request, Response } from 'express'
var router = express.Router()

import * as jwt from 'jsonwebtoken'

const users = [
    {
        id: 1,
        username: 'raul',
        password: 'pwd'
    }
]

const tokenOptions: jwt.SignOptions = {
    expiresIn: 60*15,
    issuer: 'express-ts'
}

router.post('/', (req: Request, res: Response) => {
    const user = users.find(user => req.body.username === user.username && req.body.password === user.password)
    
    if(user) {
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'mySecret', tokenOptions)

        res.status(200).send({token: token})
    } else {
        res.status(401).send({error: 'Incorrect credentials'})
    }
})

export { router as TokenIssuer }