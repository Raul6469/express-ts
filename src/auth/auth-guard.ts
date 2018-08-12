import * as express from 'express'
import { Response } from 'express'
import { Request, UserPayload } from '../declarations'
var router = express.Router()

import * as jwt from 'jsonwebtoken'

router.all('*', (req: Request, res: Response, next) => {
    if(!req.get('Authorization')) {
        res.status(401).send({error: 'You must be authenticated'})
    } else {
        const authorizationType = req.get('Authorization').split(' ')[0]
        const token = req.get('Authorization').split(' ')[1]

        if(authorizationType !== 'Bearer') {
            res.status(401).send({error: 'You must provide a Bearer token'})
        } else {
            try {
                req.user = jwt.verify(token, process.env.TOKEN_SECRET) as UserPayload
                next()
            } catch (error) {
                res.status(401).send({error: 'Invalid token'})
            }
        }
    }
})

export { router as AuthGuard }