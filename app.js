const express = require("express");
const app = express();
const cors = require("cors");

const giftroutes = require("./routes/giftRoutes");
const searchRoutes = require("./routes/searchRoutes");

app.use(cors());
app.use(express.json());

// Routes
app.use(giftroutes);
app.use(searchRoutes);

app.get("/", (req, res) => {
  res.send("🎁 Serveur GiftLink en marche !");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});