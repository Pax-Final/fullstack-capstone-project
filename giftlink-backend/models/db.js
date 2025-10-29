const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/giftlink';
const DB_NAME = 'giftlinkdb';

require('dotenv').config();
console.log("MONGO_URI =", MONGO_URI);

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && cachedClient) {
    return cachedDb;
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // Tester la connexion
    await db.command({ ping: 1 });
    
    cachedClient = client;
    cachedDb = db;

    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Essayer avec une base de données locale en fallback
    console.log('🔄 Trying local MongoDB...');
    const localClient = new MongoClient('mongodb://localhost:27017/giftlink');
    
    try {
      await localClient.connect();
      const localDb = localClient.db(DB_NAME);
      await localDb.command({ ping: 1 });
      
      cachedClient = localClient;
      cachedDb = localDb;
      
      console.log('✅ Connected to local MongoDB');
      return localDb;
    } catch (localError) {
      console.error('❌ Local MongoDB also failed:', localError.message);
      throw error; // Relancer l'erreur originale
    }
  }
}

module.exports = connectToDatabase;
