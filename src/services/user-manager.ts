import { User } from "../entities/user";
import { MongoDB } from "../providers/mongodb";
import { MongoError, WriteOpResult } from "mongodb";

import * as bcrypt from "bcrypt";

export class UserManager {

  public static async createUser(user: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      bcrypt.hash(user.password, process.env.SALT_ROUNDS, async function(err, hash) {
        if(err) reject();
        user.password = hash;

        let db = await MongoDB.Instance.getClient()
        let userDB = db.collection('users');
  
        userDB.insertOne(user, (err: MongoError, res: WriteOpResult) => {
          if (!err) {
            resolve();
          }
        });
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

        if(!user) {
          resolve(null);
        }

        bcrypt.compare(password, user.password, function(err, res) {
          res ? resolve(user) : resolve(null);
        });
      })
    })
  }

}