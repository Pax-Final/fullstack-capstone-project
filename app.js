const express = require("express");
const app = express();
const cors = require("cors");

// ✅ Tâche 1 : Importer giftRoutes et le stocker dans une constante appelée giftroutes
const giftroutes = require("./routes/giftRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Tâche 2 : Ajouter giftRoutes au serveur avec app.use()
app.use(giftroutes);

// Route de base pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("🎁 Serveur GiftLink en marche !");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});