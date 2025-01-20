const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true } // Pastikan durasi adalah angka
});

module.exports = mongoose.model('Session', SessionSchema);
