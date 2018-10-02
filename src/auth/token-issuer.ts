import * as express from 'express'
import { Request, Response } from 'express'
import { UserManager } from '../services/user-manager';
var router = express.Router()

import * as jwt from 'jsonwebtoken'

const tokenOptions: jwt.SignOptions = {
    expiresIn: 60*15,
    issuer: 'express-ts'
}

router.post('/', async (req: Request, res: Response) => {
    const user = await UserManager.authenticateUser(req.body.username, req.body.password);
    
    if(user) {
        const payload = {
            id: user.id,
            username: user.login
        }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'mySecret', tokenOptions)

        res.status(200).send({token: token})
    } else {
        res.status(401).send({error: 'Incorrect credentials'})
    }
})

export { router as TokenIssuer }