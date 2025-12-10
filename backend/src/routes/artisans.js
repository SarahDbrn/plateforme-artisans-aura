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

// -----------------------------------
// POST /api/artisans/:id/contact
// -----------------------------------
router.post('/:id/contact', async (req, res) => {
  const artisanId = req.params.id;
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    // vérifier que l’artisan existe
    const artisan = await Artisan.findByPk(artisanId);
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan non trouvé.' });
    }

    // 👉 Pour le devoir : on simule l’envoi
    console.log('📩 Nouveau message de contact :');
    console.log('Artisan :', artisan.name, `(id: ${artisanId})`);
    console.log('De      :', name, `<${email}>`);
    console.log('Objet   :', subject);
    console.log('Message :', message);

    return res.status(201).json({
      success: true,
      message: 'Message bien reçu par la plateforme.',
    });
  } catch (err) {
    console.error('Erreur lors du traitement du contact :', err);
    return res
      .status(500)
      .json({ error: "Erreur serveur lors de l'envoi du message." });
  }
});


module.exports = router;
