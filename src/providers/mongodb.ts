import { Db } from "mongodb";

export class MongoDB {

    private static _instance: MongoDB

    private db: any;

    private url: string = process.env.MONGODB_URL;

    private constructor() {
        let mongoClient = require('mongodb').MongoClient;
        let currentThis = this;
        mongoClient.connect(this.url, { useNewUrlParser: true }, (err: any, database: any) => { 
            const db = database.db(process.env.DB_NAME);
            currentThis.db = db;
        })
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public getClient(): Db {
        return this.db;
    }
}