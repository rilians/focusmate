const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const auth = require('../middleware/auth'); // Pastikan middleware autentikasi diimpor dengan benar

// Endpoint untuk menyimpan sesi belajar
router.post('/add', auth, async (req, res) => {
  try {
    const { duration } = req.body;

    // Validasi input
    if (!duration || duration <= 0) {
      return res.status(400).json({ message: 'Invalid duration' });
    }

    // Buat sesi belajar baru
    const session = new Session({
      user: req.user.id,
      duration,
    });

    await session.save();

    res.status(201).json({ message: 'Study session saved successfully', session });
  } catch (error) {
    console.error('Error saving study session:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint untuk mengambil semua sesi belajar pengguna
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({ date: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
