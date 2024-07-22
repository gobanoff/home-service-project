import { MongoClient } from 'mongodb';

// MongoDB prisijungimo stringas
const uri = process.env.MONGO_URI;

// Inicializuokite MongoDB klientą
let client;
if (process.env.NODE_ENV === 'production') {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('data');
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
