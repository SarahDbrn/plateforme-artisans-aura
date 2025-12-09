import dotenv from 'dotenv';

dotenv.config();

export default function authApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Accès à l’API non autorisé' });
  }

  return next();
}
