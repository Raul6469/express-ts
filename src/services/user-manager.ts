import { User } from "../entities/user";
import { MongoDB } from "../providers/mongodb";
import { MongoError, WriteOpResult } from "mongodb";

export class UserManager {

  public static async createUser(user: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let db = await MongoDB.Instance.getClient()
      let userDB = db.collection('users');

      userDB.insertOne(user, (err: MongoError, res: WriteOpResult) => {
        if (!err) {
          resolve();
        }
      });
    })
  }

  public static async authenticateUser(username: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      let db = await MongoDB.Instance.getClient()
      let userDB = db.collection('users');

      userDB.findOne({username: username}, (err: MongoError, user: User) => {
        if(err) {
          reject();
        }

        user && user.password === password ? resolve(user) : resolve(null);
      })
    })
  }

}