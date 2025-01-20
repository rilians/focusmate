// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: {
    type: Date,
    validate: {
      validator: (value) => value > Date.now(), // Pastikan deadline di masa depan
      message: 'Deadline must be in the future.',
    },
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'], // Sesuaikan nilai enum
    default: 'low',
  },
  tags: { type: [String], default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Pastikan ini ObjectId
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
