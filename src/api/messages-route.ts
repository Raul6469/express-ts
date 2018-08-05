import * as express from 'express'
import { MessageManager } from '../services/message-manager';
var router = express.Router()

const messageManager = MessageManager.Instance

router.get('/', (req, res) => {
    res.send(messageManager.getMessages())
})

router.post('/', (req, res) => {
    if(req.body.message) {
        messageManager.pushMessage(req.body.message)
        res.sendStatus(201)
    } else {
        res.status(400)
        res.send({message: 'You must provide a message'})
    }
})

export { router as MessageAPI }