import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/api/users/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/users/${userId}`, userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </label>
        <label>
          Study Duration (minutes):
          <input
            type="number"
            value={userData.preferences.studyDuration}
            onChange={(e) =>
              setUserData({
                ...userData,
                preferences: { ...userData.preferences, studyDuration: parseInt(e.target.value) },
              })
            }
          />
        </label>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            value={userData.preferences.breakDuration}
            onChange={(e) =>
              setUserData({
                ...userData,
                preferences: { ...userData.preferences, breakDuration: parseInt(e.target.value) },
              })
            }
          />
        </label>
        <button onClick={handleSave}>Save Changes</button>
      </div>

      <h3>Study Sessions</h3>
      <ul>
        {userData.studySessions.map((session, index) => (
          <li key={index}>
            Date: {new Date(session.date).toLocaleDateString()}, Duration: {session.duration} minutes
          </li>
        ))}
      </ul>

      <h3>Completed Tasks</h3>
      <ul>
        {userData.completedTasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description || 'No description'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
