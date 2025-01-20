import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const HomePage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axiosInstance.get('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h1>Welcome, {userName || 'User'}!</h1>
        <p>Your ultimate study companion to boost productivity.</p>
        <p>
          FocusMate helps you stay productive by timing your study sessions and keeping track of
          your tasks. Get started by setting up your profile or starting a new study session.
        </p>
        <div style={styles.buttonContainer}>
          <a href="/timer">
            <button style={styles.button}>Start Studying</button>
          </a>
          <a href="/profile">
            <button style={styles.button}>Set Up Profile</button>
          </a>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  main: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default HomePage;
