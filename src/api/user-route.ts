import * as express from "express";
import { UserManager } from "../services/user-manager";

const router = express.Router();

router.post("/", (req, res) => {
  req.assert("username", "username must be provided").notEmpty();
  req.assert("password", "password cannot be blank").notEmpty();

  if (req.validationErrors()) {
    return res.status(400).send(req.validationErrors());
  }

  UserManager.createUser({
    username: req.body.username,
    password: req.body.password,
  }).then(() => {
    res.status(201).send({ message: "Created" });
  });
});

export { router as UserAPI };
