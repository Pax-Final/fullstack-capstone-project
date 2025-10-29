const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// GET /api/search?q=nomDuCadeau
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');

    const query = req.query.q || '';
    const regex = new RegExp(query, 'i'); // recherche insensible à la casse

    const results = await collection.find({ name: regex }).toArray();

    res.json({ results });
  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
