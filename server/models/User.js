const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    studyDuration: { type: Number, default: 25 }, // Durasi belajar default (dalam menit)
    breakDuration: { type: Number, default: 5 }, // Durasi istirahat default (dalam menit)
    favoriteMusic: { type: String, default: null }, // ID lagu favorit
  },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
, // Referensi tugas yang selesai
  studySessions: [
    {
      date: { type: Date, default: Date.now },
      duration: { type: Number }, // Durasi sesi belajar (menit)
    },
  ],
  settings: {
    theme: { type: String, default: 'light' }, // Tema (light/dark)
    language: { type: String, default: 'en' }, // Bahasa
  },
});

module.exports = mongoose.model('User', userSchema);
