import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setAuth({ token: response.data.token, user: response.data.user });
      alert('Login successful!');
    } catch (err) {
      alert(err.response.data.message || 'Login failed.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
