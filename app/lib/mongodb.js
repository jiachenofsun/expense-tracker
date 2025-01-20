import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

export async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(uri);
  }
  return client;
}