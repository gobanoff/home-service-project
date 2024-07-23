/*disable-eslint*/
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (!client.isConnected()) await client.connect();
  const db = client.db('test'); 
  const collection = db.collection('bookings'); 
  const documents = await collection.find({}).toArray();
  res.status(200).json(documents);
}