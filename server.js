require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.post('/test', (req, res) => {
  res.send('Test route works!');
});

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// MongoDB connection
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
