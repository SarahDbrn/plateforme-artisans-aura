const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const categoriesRoutes = require('./routes/categories');
const artisansRoutes = require('./routes/artisans');

const app = express();

// -----------------------------
// CORS
// -----------------------------
const allowedOrigins = [
  'http://localhost:3000',
  'https://plateforme-artisans-aura.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser aussi les requêtes sans origin (Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// -----------------------------
// Middlewares
// -----------------------------
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/categories', categoriesRoutes);
app.use('/api/artisans', artisansRoutes);

// -----------------------------
// Lancement du serveur
// -----------------------------
const PORT = process.env.PORT || 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à MySQL OK');
    app.listen(PORT, () => {
      console.log(`API en écoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base :', err);
  });
