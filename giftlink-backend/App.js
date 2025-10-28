require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const logger = require('./logger');
const connectToDatabase = require('./models/db');
const { loadData } = require("./util/import-mongo/index");


const app = express();
const port = 3060;


app.use(express.json());
app.use(cors());
app.use(pinoHttp({ logger }));

connectToDatabase()
  .then(() => logger.info('✅ Connected to MongoDB'))
  .catch((err) => logger.error('❌ Failed to connect to DB', err));


const giftRoutes = require('./routes/giftRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');


app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);


app.get('/', (req, res) => {
  res.send('🎁 GiftLink backend is running!');
});


app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});


app.listen(port, () => {
  logger.info(`🚀 Server running on http://localhost:${port}`);
});
