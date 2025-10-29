const express = require('express');
const router = express.Router();

// Endpoint test
router.get('/', (req, res) => {
  res.json({ message: "Gift routes working!" });
});

module.exports = router;
