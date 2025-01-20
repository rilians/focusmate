const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Pastikan model User benar
const router = express.Router();

// Registrasi Pengguna
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log('Registration request received:', { name, email });
  
      if (!name || !email || !password) {
        console.log('Validation failed: missing fields');
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Validation failed: email already in use');
        return res.status(400).json({ message: 'Email is already in use' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      console.log('User registered successfully:', newUser);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error during registration:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

// Login Pengguna
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware Auth
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get User Info
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('completedTasks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user info:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
