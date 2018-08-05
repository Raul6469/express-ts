import { Message } from "../entities/message"

export class MessageManager {

    private static _instance: MessageManager

    private messages: Array<Message>
    private messageCounter: number

    private constructor() {
        this.messageCounter = 0
        this.messages = new Array<Message>()
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public pushMessage(message: string) {
        this.messages.push(
            {
                id: this.messageCounter,
                message: message
            }
        )
        this.messageCounter++
    }

    public getMessages(): Array<Message> {
        return this.messages
    }
}