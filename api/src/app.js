import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { sequelize } from './models/index.js';
import authApiKey from './middleware/authApiKey.js';
import artisansRoutes from './routes/artisans.routes.js';
import categoriesRoutes from './routes/categories.routes.js';

dotenv.config();

const app = express();

// Sécurité de base
app.use(helmet());

// CORS : n’autoriser que ton front
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

// Limitation de débit sur l’API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', apiLimiter);

// Parsing JSON
app.use(express.json());

// Middleware clé API
app.use('/api', authApiKey);

// Routes
app.use('/api/artisans', artisansRoutes);
app.use('/api/categories', categoriesRoutes);

// Ping de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Synchronisation BDD au démarrage
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connexion MySQL OK');
    // à remplacer plus tard par migrations
    // await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Erreur connexion MySQL :', error);
  }
}
initDatabase();

export default app;
