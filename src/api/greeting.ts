import { Request, Response } from 'express'

export let hello = function(req: any, res: Response) {
    res.send({
        message: 'Hello ' + req.user.username + '!' 
    })
}