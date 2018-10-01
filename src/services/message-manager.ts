import { Message } from "../entities/message"
import { MongoDB } from "../providers/mongodb";

export class MessageManager {

    private static _instance: MessageManager

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public pushMessage(message: string) {
        let messagesDB = MongoDB.Instance.getClient().collection('messages');

        messagesDB.insert(
            {
                message: message
            }
        )
    }

    public getMessages(): Promise<Message[]> {
        return new Promise((resolve, reject) => {
            let messagesDB = MongoDB.Instance.getClient().collection('messages');
    
            messagesDB.find({}).toArray((err: any, docs: Message[]) => {
                resolve(docs);
            })
        })
    }
}