import * as express from "express";
import { NextFunction, Request, Response } from "express";
const router = express.Router();

export function forRoles(roles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleOk = roles.find((roles) => roles === req.user.role);

    if (roleOk) {
      next();
    } else {
      res.status(403).send({message: "Unauthorized request"});
    }
  };
}
