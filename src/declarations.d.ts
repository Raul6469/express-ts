import { Request } from 'express';

export interface Request extends Request {
    user?: UserPayload
}

export interface UserPayload {
    id: number
    username: string
}