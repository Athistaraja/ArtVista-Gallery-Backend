// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if username or email already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    user = new User({ username, email, password, role });
    await user.save();

    // Generate JWT
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Include userId in the response
    res.json({ token, role: user.role, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
