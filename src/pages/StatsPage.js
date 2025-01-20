import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const StatsPage = ({ userId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found. User might not be logged in.');
        return;
      }

      try {
        const response = await axiosInstance.get('/api/sessions/stats', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            user: userId,
            startDate: '2025-01-01', // Example date range
            endDate: '2025-01-31',
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [userId]);

  if (!stats) return <p>Loading stats...</p>;

  // Data for bar chart
  const barData = {
    labels: ['Total Study Time (min)', 'Total Sessions', 'Completed Tasks'],
    datasets: [
      {
        label: 'Progress Overview',
        data: [stats.totalStudyTime, stats.totalSessions, stats.completedTasks],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderWidth: 1,
      },
    ],
  };

  // Data for pie chart
  const pieData = {
    labels: ['Study Time', 'Other Activities'],
    datasets: [
      {
        data: [stats.totalStudyTime, 1440 - stats.totalStudyTime], // Assuming a 24-hour day
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Learning Progress Dashboard</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3>Overview</h3>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
            },
          }}
        />
      </div>
      <div style={{ maxWidth: '600px', margin: '20px auto' }}>
        <h3>Daily Activity Distribution</h3>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StatsPage;
