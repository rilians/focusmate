// src/components/TaskList.js
import React from 'react';
import axiosInstance from '../api/axiosConfig';

const TaskList = ({ tasks, fetchTasks }) => {
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/tasks/${id}`);
            fetchTasks(); // Refresh task list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleCompleted = async (task) => {
        try {
            await axiosInstance.put(`/api/tasks/${task._id}`, { completed: !task.completed });
            fetchTasks(); // Refresh task list after updating
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div>
            <h2>Your Tasks</h2>
            {tasks.map(task => (
                <div key={task._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}> {/* Ensure unique keys */}
                    <h3>{task.title}</h3>
                    <p><strong>Description:</strong> {task.description || 'No description'}</p>
                    <p><strong>Due Date:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</p>
                    <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    {task.tags && task.tags.length > 0 && (
                        <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
                    )}
                    <button onClick={() => handleToggleCompleted(task)}>
                        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                    <button onClick={() => handleDelete(task._id)}>Delete Task</button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
