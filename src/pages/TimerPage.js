import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import axiosInstance from '../api/axiosConfig';

const TimerPage = ({ currentUser }) => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setError("User is not defined or doesn't have an ID");
      return;
    }

    // Fetch user's study sessions
    axiosInstance
      .get(`/api/sessions?user=${currentUser.id}`)
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching study sessions:', error);
        setError('Failed to fetch study sessions');
      });
  }, [currentUser]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>Study Timer</h1>
      <Timer userId={currentUser.id} />
      <h2>Your Study Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            Date: {new Date(session.date).toLocaleDateString()}, Duration: {session.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimerPage;
