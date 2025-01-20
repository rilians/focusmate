import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // Logout handler
    navigate('/'); // Kembali ke Landing Page
  };

  return (
    <header style={headerStyle}>
      <h1>FocusMate</h1>
      <nav>
        <ul style={navListStyle}>
          <li><Link to="/home" style={linkStyle}>Home</Link></li>
          <li><Link to="/timer" style={linkStyle}>Timer</Link></li>
          <li><Link to="/tasks" style={linkStyle}>Tasks</Link></li>
          <li><Link to="/profile" style={linkStyle}>Profile</Link></li>
          <li><Link to="/dashboard" style={linkStyle}>Stats</Link></li>
          <li>
            <button onClick={handleLogoutClick} style={buttonStyle}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 20px',
};

const navListStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'space-evenly',
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'underline',
};

export default Header;
