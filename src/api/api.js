import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan URL backend Anda
});

// Tambahkan token autentikasi jika diperlukan
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
