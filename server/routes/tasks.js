// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Mendapatkan semua tugas
router.get('/tasks/completed', auth, async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user, completed: true });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Menambahkan tugas baru
// Menambahkan tugas baru
// Menambahkan tugas baru
router.post('/', async (req, res) => {
    const { title, description, deadline, priority, tags, user } = req.body;
  
    console.log('Request Body:', req.body); // Debugging
  
    try {
      // Validasi data wajib
      if (!title || !user) {
        return res.status(400).json({ error: 'Title and user are required.' });
      }
  
      const validPriorities = ['low', 'medium', 'high'];
      if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: `Invalid priority value: ${priority}` });
      }
  
      const newTask = new Task({
        title,
        description: description || '',
        deadline: deadline || null,
        priority: priority || 'low',
        tags: tags || [],
        user,
      });
  
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      console.error('Error creating task:', err);
      res.status(400).send(err.toString());
    }
  });
  
  

// Mengupdate status tugas
router.put('/:id', async (req, res) => {
  const { completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).send('Task not found');
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
