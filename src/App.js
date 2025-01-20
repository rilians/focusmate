// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axiosInstance from './api/axiosConfig';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TimerPage from './pages/TimerPage';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import StatsPage from './pages/StatsPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/';

    if (token) {
      axiosInstance
        .get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data && res.data.id) {  // Pastikan data pengguna dan ID tersedia
            setCurrentUser(res.data);
            if (window.location.pathname === '/') {
              window.history.replaceState(null, null, lastVisitedPage);
            }
          } else {
            throw new Error("User data is incomplete or missing ID");
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          setCurrentUser(null);
        });
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('lastVisitedPage');
    setCurrentUser(null);
  };

  const saveLastVisitedPage = (path) => {
    localStorage.setItem('lastVisitedPage', path);
  };

  return (
    <Router>
      {currentUser && <Header currentUser={currentUser} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to={localStorage.getItem('lastVisitedPage') || '/home'} /> : <LandingPage />
          }
        />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            currentUser ? (
              <HomePage onEnter={() => saveLastVisitedPage('/home')} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/timer"
          element={
            currentUser ? (
              <TimerPage currentUser={currentUser} onEnter={() => saveLastVisitedPage('/timer')} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            currentUser ? (
              <TasksPage onEnter={() => saveLastVisitedPage('/tasks')} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <StatsPage onEnter={() => saveLastVisitedPage('/dashboard')} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            currentUser ? (
              <ProfilePage onEnter={() => saveLastVisitedPage('/profile')} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
