import * as express from "express";
import { forRoles } from "../auth/role-checker";
import { Roles } from "../enums/roles";
import { UserManager } from "../services/user-manager";

const router = express.Router();

router.post("/", forRoles([Roles.ADMIN]), (req, res) => {
  req.assert("username", "username must be provided").notEmpty();
  req.assert("password", "password cannot be blank").notEmpty();

  if (req.validationErrors()) {
    return res.status(400).send(req.validationErrors());
  }

  UserManager.createUser({
    username: req.body.username,
    password: req.body.password,
    role: Roles.USER,
  }).then(() => {
    res.status(201).send({ message: "Created" });
  }).catch((err) => {
    if (err.message) {
      res.status(400).send(err);
    } else {
      res.sendStatus(500);
    }
  });
});

export { router as UserAPI };
