const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// GET /api/gifts/search
// Exemple de requête : /api/gifts/search?name=Puzzle&category=Jeux&state=Neuf&age_years=5
router.get("/api/gifts/search", async (req, res) => {
  try {
    // 🧩 Tâche 1 : Se connecter à MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    // 🔍 Construire la requête de filtre
    const query = {};

    // 🧩 Tâche 2 : Vérifier si le nom existe et n’est pas vide
    if (req.query.name && req.query.name.trim() !== "") {
      // recherche insensible à la casse
      query.name = { $regex: req.query.name.trim(), $options: "i" };
    }

    // 🧩 Tâche 3 : Ajouter les autres filtres si présents
    if (req.query.category && req.query.category.trim() !== "") {
      query.category = req.query.category.trim();
    }

    if (req.query.state && req.query.state.trim() !== "") {
      query.state = req.query.state.trim();
    }

    if (req.query.age_years && !isNaN(req.query.age_years)) {
      query.age_years = Number(req.query.age_years);
    }

    // 🧩 Tâche 4 : Récupérer les cadeaux filtrés
    const gifts = await collection.find(query).toArray();

    // Retourner les résultats
    res.json(gifts);
  } catch (error) {
    console.error("❌ Erreur lors de la recherche de cadeaux :", error);
    res.status(500).json({ message: "Erreur serveur lors de la recherche de cadeaux" });
  }
});

module.exports = router;