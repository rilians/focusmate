import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MusicProvider } from './context/MusicContext'; // Untuk konteks musik

// Inisialisasi elemen root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render aplikasi utama
root.render(
  <React.StrictMode>
    {/* MusicProvider untuk konteks musik */}
    <MusicProvider>
      <App />
    </MusicProvider>
  </React.StrictMode>
);

// Log atau laporkan metrik performa (opsional)
reportWebVitals();
