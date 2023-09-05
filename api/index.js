const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Jade said write: Connected to MongoDB');
  // Your code here
})
.catch((error) => {
  console.error('Jade said write: Error connecting to MongoDB:', error);
});
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json()); // for typeerror: cannot destructure property 'username' of req.body as it is undefined

app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173',
}));

app.get('/test', (req, res) => {
  res.json('ok')
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({ username, password });
    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('cookieNameToken', token).status(201).json({
        id: createdUser._id,
      })
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json('error');
  }
})

app.listen(4040);

// k2kiFrj8yI0FNjIJ