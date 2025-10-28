const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./models/db');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('GiftLink API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
