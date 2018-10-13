import { Message } from "../entities/message";
import { MongoDB } from "../providers/mongodb";

export class MessageManager {

  public static async pushMessage(message: string) {
    const db = await MongoDB.Instance.getClient();
    const messagesDB = db.collection("messages");

    messagesDB.insertOne(
      {
        message,
      },
    );
  }

  public static async getMessages(): Promise<Message[]> {
    return new Promise<Message[]>(async (resolve, reject) => {
      const db = await MongoDB.Instance.getClient();
      const messagesDB = db.collection("messages");

      messagesDB.find({}).toArray((err: any, docs: Message[]) => {
        resolve(docs);
      });
    });
  }
}
