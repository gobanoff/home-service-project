import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, ObjectId } from 'mongodb';

// Подключение к базе данных
const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please add your Mongo URI to Vercel Environment Variables');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Обработчик запроса
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Замените 'test' на имя вашей базы данных

    const collection = db.collection('businesses'); // Замените 'businesses' на имя вашей коллекции

    const { id } = req.query;

    if (req.method === 'GET') {
      try {
        if (typeof id !== 'string') {
          return res.status(400).json({ message: 'Invalid ID format' });
        }

        const business = await collection.findOne({ _id: new ObjectId(id) });

        if (!business) {
          return res.status(404).json({ message: 'Business not found' });
        }

        return res.status(200).json(business);
      } catch (error) {
        console.error('Error fetching business:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}