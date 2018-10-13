require("dotenv").config();

import * as fs from "fs";
import { Db } from "mongodb";
import { MongoDB } from "../src/providers/mongodb";

async function initDb() {
  const db: Db = await MongoDB.Instance.getClient();

  await initData(db, "users", "data/users.json");
  await initData(db, "messages");

  process.exit(0);
}

async function initData(db: Db, collectionName: string, filePath?: string) {
  return new Promise(async (resolve, reject) => {
    if (filePath) {
      fs.readFile(filePath, async (err, JsonData) => {
        const data = JSON.parse(JsonData.toString());
        const collection = db.collection(collectionName);
        await collection.deleteMany({});
        await collection.insertMany(data);
        console.log("> " + collectionName + " collection initialized");
        resolve();
      });
    } else {
      const collection = db.collection(collectionName);
      await collection.deleteMany({});
      console.log("> " + collectionName + " collection reset");
      resolve();
    }
  });
}

initDb();
