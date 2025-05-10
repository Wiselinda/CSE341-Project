require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root route (for Render or browser check)
app.get('/', (req, res) => {
  res.send('API is running. Try /contacts or /test for available routes.');
});

// Test route
app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// MongoDB connection
console.log('MONGO_URI:', process.env.MONGO_URI); // Debug line

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
