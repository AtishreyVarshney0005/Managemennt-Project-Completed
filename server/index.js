const express = require('express');
const cors = require('cors');
require('dotenv').config();

if (!process.env.PORT) {
  console.error('❌ ERROR: PORT not defined in .env');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET not defined in .env');
  process.exit(1);
}

const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/products', authMiddleware, require('./routes/products'));
app.use('/sales', authMiddleware, require('./routes/sales'));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});