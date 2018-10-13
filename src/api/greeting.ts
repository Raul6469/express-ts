import { Request, Response } from "express";

export let hello = (req: Request, res: Response) => {
  res.send({
    message: "Hello " + req.user.username + "!",
  });
};
