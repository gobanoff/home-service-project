import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local or Vercel Environment Variables');
}

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Убедитесь, что название базы данных 'test' соответствует вашей базе данных

    const collection = db.collection('categories'); // Убедитесь, что коллекция 'businesses' существует
    const documents = await collection.find({}).toArray();

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

