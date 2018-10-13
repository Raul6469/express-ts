import * as express from "express";
import { Message } from "../entities/message";
import { MessageManager } from "../services/message-manager";
const router = express.Router();

router.get("/", (req, res) => {
  MessageManager.getMessages().then((messages: Message[]) => {
    res.send(messages);
  });
});

router.post("/", (req, res) => {
  if (req.body.message) {
    MessageManager.pushMessage(req.body.message);
    res.sendStatus(201);
  } else {
    res.status(400);
    res.send({ message: "You must provide a message" });
  }
});

export { router as MessageAPI };
