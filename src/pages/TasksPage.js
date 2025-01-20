// src/pages/TasksPage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import TaskList from '../components/TaskList';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('low'); // Default priority
  const [tags, setTags] = useState(''); // Comma-separated tags

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
  
    const newTask = {
      title,
      description,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      priority: 'low', // Nilai default untuk priority
      tags: [], // Kosongkan tags jika tidak ada
      user: '678da80833374f7ccedbbb1a', // Ganti dengan ID pengguna valid dari database
    };
  
    try {
      const response = await axiosInstance.post('/api/tasks', newTask);
      setTasks([...tasks, response.data]); // Tambahkan tugas baru ke daftar
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (error) {
      console.error('Failed to add task:', error.response?.data || error.message);
    }
  };
  
  
  

  return (
    <div>
      <h1>Manage Tasks</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Deadline:</label>
          <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g., work, urgent"
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default TasksPage;
