import { Db } from "mongodb";

export class MongoDB {

  private static _instance: MongoDB;

  private db: any;

  private url: string = process.env.MONGODB_URL;

  private constructor() {
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async getClient(): Promise<Db> {
    return new Promise<Db>((resolve, reject) => {
      if (this.db) {
        return resolve(this.db);
      } else {
        const mongoClient = require("mongodb").MongoClient;
        const currentThis = this;
        mongoClient.connect(this.url, { useNewUrlParser: true }, (err: any, database: any) => {
          if (err) { reject(); }
          const db = database.db(process.env.DB_NAME);
          currentThis.db = db;
          resolve(db);
        });
      }
    });
  }
}
