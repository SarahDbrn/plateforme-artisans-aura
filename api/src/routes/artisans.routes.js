import express from 'express';
import { Op } from 'sequelize';
import { Artisan, Specialty, Category } from '../models/index.js';

const router = express.Router();

// GET /api/artisans?search=&categoryId=&specialtyId=&featured=true
router.get('/', async (req, res) => {
  try {
    const {
      search,
      categoryId,
      specialtyId,
      featured,
    } = req.query;

    const where = {};
    if (featured === 'true') {
      where.is_featured = true;
    }
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const include = [
      {
        model: Specialty,
        include: [Category],
      },
    ];

    if (specialtyId) {
      include[0].where = { id: specialtyId };
    }
    if (categoryId) {
      include[0].include[0].where = { id: categoryId };
    }

    const artisans = await Artisan.findAll({ where, include });

    res.json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/artisans/:id
router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [
        {
          model: Specialty,
          include: [Category],
        },
      ],
    });

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }

    return res.json(artisan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
