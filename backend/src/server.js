const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const { Category, Speciality, Artisan } = require('./models');

const categoriesRoutes = require('./routes/categories');
const artisansRoutes = require('./routes/artisans');

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // adapte si besoin
  })
);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes métier
app.use('/api/categories', categoriesRoutes);
app.use('/api/artisans', artisansRoutes);

const PORT = process.env.PORT || 3001;

// Connexion à la base puis lancement du serveur
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

  console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
