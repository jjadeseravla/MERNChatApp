const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
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


const bcryptSalt = bcrypt.genSaltSync(5);

const app = express();
app.use(express.json()); // for typeerror: cannot destructure property 'username' of req.body as it is undefined
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173',
}));

app.get('/test', (req, res) => {
  res.json('ok')
});

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    // 4: token, secret, options and a callback
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      // in frontend you cant read the secret cos its encoded
      if (err) throw err;
      res.json(userData);
    })
  } else {
    res.status(401).json('no token');
  }
})


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });
    jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('cookieNameToken', token, {sameSite: 'none', secure:true}).status(201).json({
        id: createdUser._id,
      })
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json('error');
  }
})

app.post('/login', async (req, res) => {
  const { username, password} = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      // User not found in the database
      return res.status(404).json('User not found');
    }
    if (findUser) {
      const passOk = bcrypt.compareSync(password, findUser.password);
      if (!passOk) {
        // Password does not match
        return res.status(401).json('Incorrect password');
      }
      if (passOk) {
        // if password is ok, then we can regenerate the cookie
        jwt.sign({ userId: findUser._id, username }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('cookieNameToken', token, { sameSite: 'none', secure: true }).status(201).json({
            id: findUser._id, 
          })
        })
      }
    }
  } catch (err) {
    console.log('HERE')
    if (err) throw err;
    res.status(404).json('cannot find user login details');
  }
})

app.listen(4040);

// k2kiFrj8yI0FNjIJ