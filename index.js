const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./mongodb');
const auth = require('./routes/auth');
const artwork = require('./routes/artwork');
const cart = require('./routes/cart')
// const payment = require('./routes/payment');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 4500;

connectDB();

app.use(cors());

// Middleware
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/artwork',artwork);
app.use('/api/cart',cart);
// app.use('/api/payment', payment);


app.get('/', (req, res) => {
    res.send('Welcome to the Artvista Gallery API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
