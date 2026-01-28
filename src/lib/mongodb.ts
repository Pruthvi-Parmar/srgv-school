import { MongoClient } from "mongodb";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise() {
  if (global.__mongoClientPromise) return global.__mongoClientPromise;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing required env var: MONGODB_URI");
  global.__mongoClientPromise = new MongoClient(uri, { maxPoolSize: 10 }).connect();
  return global.__mongoClientPromise;
}

export async function getDb() {
  const client = await getMongoClientPromise();
  const dbName = process.env.MONGODB_DB || undefined;
  return client.db(dbName);
}


