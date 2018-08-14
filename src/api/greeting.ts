import { Request, Response } from 'express'

export let hello = function(req: Request, res: Response) {
    res.send({
        message: 'Hello ' + req.user.username + '!' 
    })
}