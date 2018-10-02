import { Message } from "../entities/message"
import { MongoDB } from "../providers/mongodb";

export class MessageManager {

    public static pushMessage(message: string) {
        let messagesDB = MongoDB.Instance.getClient().collection('messages');

        messagesDB.insert(
            {
                message: message
            }
        )
    }

    public static getMessages(): Promise<Message[]> {
        return new Promise((resolve, reject) => {
            let messagesDB = MongoDB.Instance.getClient().collection('messages');
    
            messagesDB.find({}).toArray((err: any, docs: Message[]) => {
                resolve(docs);
            })
        })
    }
}