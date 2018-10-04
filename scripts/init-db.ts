require('dotenv').config()

import { MongoDB } from "../src/providers/mongodb";
import * as fs from "fs";
import { Db } from "mongodb";

async function initDb() {
    let db: Db = await MongoDB.Instance.getClient();

    await initData(db, 'users', 'data/users.json');

    process.exit(0);
}

async function initData(db: Db, collectionName: string, filePath: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, async (err, JsonData) => {
            const data = JSON.parse(JsonData.toString());
            let collection = db.collection(collectionName);
            await collection.deleteMany({});
            await collection.insertMany(data);
            console.log('> ' + collectionName + ' collection initialized')
            resolve();
        })
    })
}

initDb()