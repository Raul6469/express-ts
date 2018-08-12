import { Request, Response } from 'express'

export let hello = function(req: any, res: Response) {
    res.send('Hello ' + req.user.username + '!')
}