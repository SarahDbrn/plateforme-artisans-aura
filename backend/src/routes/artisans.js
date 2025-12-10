const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Artisan, Speciality, Category } = require('../models');

router.get('/', async (req, res) => {
  const { search, categoryId, top } = req.query;

  const whereArtisan = {};
  const include = [
    {
      model: Speciality,
      include: [Category],
    },
  ];

  if (search) {
    whereArtisan.name = { [Op.like]: `%${search}%` };
  }

  if (top === 'true') {
    whereArtisan.top = true;
  }

  if (categoryId) {
    // filtrer sur la catégorie via la spécialité
    include[0].where = { category_id: categoryId };
  }

  try {
    const artisans = await Artisan.findAll({
      where: whereArtisan,
      include,
    });
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [
        {
          model: Speciality,
          include: [Category],
        },
      ],
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan non trouvé' });
    }

    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
