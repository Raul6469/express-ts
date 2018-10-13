import * as express from "express";
import { UserManager } from "../services/user-manager";

const router = express.Router();

router.post("/", (req, res) => {
  UserManager.createUser({
    username: req.body.username,
    password: req.body.password,
  }).then(() => {
    res.status(201).send({ message: "Created" });
  });
});

export { router as UserAPI };
