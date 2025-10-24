const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");
const { ObjectId } = require("mongodb"); // Nécessaire pour manipuler les IDs MongoDB

// ✅ Endpoint pour récupérer tous les cadeaux
router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gifts = await collection.find().toArray();
    res.json(gifts);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des cadeaux :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des cadeaux" });
  }
});

// ✅ Endpoint pour récupérer un cadeau spécifique par ID
router.get("/api/gifts/:id", async (req, res) => {
  try {
    // 🧩 Tâche 1 : Se connecter à MongoDB
    const db = await connectToDatabase();

    // 🎁 Tâche 2 : Récupérer la collection de cadeaux
    const collection = db.collection("gifts");

    // 🆔 Tâche 3 : Trouver un cadeau spécifique par ID
    const { id } = req.params;
    const gift = await collection.findOne({ _id: new ObjectId(id) });

    if (!gift) {
      return res.status(404).json({ message: "Cadeau non trouvé" });
    }

    res.json(gift);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du cadeau :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du cadeau" });
  }
});

module.exports = router;
