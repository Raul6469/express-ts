import { MongoError, WriteOpResult } from "mongodb";
import { User } from "../entities/user";
import { MongoDB } from "../providers/mongodb";

import * as bcrypt from "bcrypt";

export class UserManager {

  public static async createUser(user: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const existing = await this.existingUsername(user.username);

      if (existing) {
        return reject({message: "Username already taken"});
      }

      bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS), async (err, hash) => {
        if (err) { reject(); }
        user.password = hash;

        const db = await MongoDB.Instance.getClient();
        const userDB = db.collection("users");

        userDB.insertOne(user, (err: MongoError, res: WriteOpResult) => {
          if (!err) {
            resolve();
          }
        });
      });
    });
  }

  public static async authenticateUser(username: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const db = await MongoDB.Instance.getClient();
      const userDB = db.collection("users");

      userDB.findOne({ username }, (err: MongoError, user: User) => {
        if (err) {
          reject();
          return;
        }

        if (!user) {
          resolve(null);
          return;
        }

        bcrypt.compare(password, user.password, (err, res) => {
          res ? resolve(user) : resolve(null);
        });
      });
    });
  }

  /**
   * Returns `true` if the provided username is already
   * existing in the database
   * @param username
   */
  public static async existingUsername(username: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      const db = await MongoDB.Instance.getClient();
      const userDB = db.collection("users");

      userDB.findOne({username}, (err: MongoError, user: User) => {
        if (err) {
          reject();
          return;
        }

        user ? resolve(true) : resolve(false);
      });
    });
  }

}
