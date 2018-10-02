import { User } from "../entities/user";
import { MongoDB } from "../providers/mongodb";
import { MongoError, WriteOpResult } from "mongodb";

export class UserManager {

  public static async createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      let userDB = MongoDB.Instance.getClient().collection('users');

      userDB.insert(user, (err: MongoError, res: WriteOpResult) => {
        if (!err) {
          resolve();
        }
      });
    })
  }

  public static async authenticateUser(username: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      let userDB = MongoDB.Instance.getClient().collection('users');

      userDB.findOne({username: username}, (err: MongoError, user: User) => {
        if(err) {
          reject();
        }

        user.password === password ? resolve(user) : resolve(null);
      })
    })
  }

}