const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware CORS
app.use(cors());

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'build')));

// Gérer toutes les routes pour SPA (Single Page Application)
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Démarrer le serveur
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`GiftWebsite server running on port ${PORT}`);
});
