/*jshint esversion: 8 */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importer la connexion à la base de données
const connectToDatabase = require('./models/db');

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'GiftLink Backend is running!' });
});

// Routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Démarrer le serveur après connexion à la DB
async function startServer() {
  try {
    await connectToDatabase();
    console.log('✅ Connected to MongoDB');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
