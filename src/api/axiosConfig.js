import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Use environment variable or default to localhost

const axiosInstance = axios.create({
  baseURL: baseURL
});

export default axiosInstance;
