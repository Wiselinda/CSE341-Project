require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      {
        url: 'https://cse341-project-2-n9dh.onrender.com',
      },
    ],
  },
  apis: ['./routes/contacts.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root/test routes
app.get('/', (req, res) => res.send('API is running. Try /contacts or /api-docs'));
app.get('/test', (req, res) => res.send('Test route works!'));

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err.message));
