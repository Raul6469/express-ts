import { Message } from "../entities/message"
import { MongoDB } from "../providers/mongodb";

export class MessageManager {

    public static async pushMessage(message: string) {
        let db = await MongoDB.Instance.getClient();
        let messagesDB = db.collection('messages');

        messagesDB.insert(
            {
                message: message
            }
        )
    }

    public static async getMessages(): Promise<Message[]> {
        return new Promise<Message[]>(async(resolve, reject) => {
            let db = await MongoDB.Instance.getClient();
            let messagesDB = db.collection('messages');
    
            messagesDB.find({}).toArray((err: any, docs: Message[]) => {
                resolve(docs);
            })
        })
    }
}