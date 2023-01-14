import { MongoClient } from 'mongodb';

export async function connectDb() {
  const client = await MongoClient.connect('mongodb://0.0.0.0:27017');
  return client;
}
