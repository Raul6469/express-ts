import { Request, Response } from 'express'

export let hello = function(req: Request, res: Response) {
    res.send('Hello!')
}