require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan'); // Logging
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');
const musicRoutes = require('./routes/music');

// Middleware
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: 'http://localhost:3000', // Izinkan hanya frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length'],
  })
);
app.use(bodyParser.json());
app.use(morgan('dev'));

// Middleware untuk menangani header CORS khusus untuk file audio
app.use('/music', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Izinkan frontend
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');
    res.setHeader('Accept-Ranges', 'bytes'); // Streaming file
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Izinkan cross-origin
    next();
  });

// Middleware untuk melayani file statis
app.use('/music', express.static(path.join(__dirname, 'public', 'music')));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/sessions', sessionRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('FocusMate Backend is Running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
