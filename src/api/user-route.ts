import * as express from 'express'
import { UserManager } from '../services/user-manager';

var router = express.Router()

router.post('/', (req, res) => {
    UserManager.createUser({
        id: null,
        login: req.body.login,
        password: req.body.password
    }).then(() => {
        res.status(201).send({message: 'Created'})
    })
})

export { router as UserAPI }