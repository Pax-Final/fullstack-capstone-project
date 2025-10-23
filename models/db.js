const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

let dbInstance = null;

async function connectToDatabase() {
  try {
    
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connexion réussie à MongoDB");

    dbInstance = client.db("giftDB");
    console.log("📦 Base de données giftDB connectée");

    return dbInstance;
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
