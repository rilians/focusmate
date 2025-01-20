import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Konfirmasi data sebelum dikirim
    const confirm = window.confirm(
      `Are you sure your data is correct?\n\nName: ${formData.name}\nEmail: ${formData.email}`
    );
    if (!confirm) return;

    try {
      const response = await axiosInstance.post('/api/users/register', formData);
      if (response.status === 201) {
        alert('Registration successful. Redirecting to login page...');
        navigate('/login'); // Redirect ke halaman login
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
