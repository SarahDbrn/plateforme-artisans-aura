USE plateforme_artisans;

-- ==========================================
-- INSERT CATEGORIES
-- ==========================================

INSERT INTO categories (name) VALUES
('Bâtiment'),
('Services'),
('Fabrication'),
('Alimentation');

-- ==========================================
-- INSERT SPECIALTIES
-- Chaque spécialité est attachée à UNE catégorie
-- ==========================================

INSERT INTO specialties (name, category_id) VALUES
('Menuiserie', 1),
('Plomberie', 1),
('Électricité', 1),

('Nettoyage', 2),
('Coiffure', 2),
('Jardinage', 2),

('Métallerie', 3),
('Ébénisterie', 3),
('Textile', 3),

('Boulangerie', 4),
('Pâtisserie', 4),
('Charcuterie', 4);

-- ==========================================
-- INSERT ARTISANS
-- Chaque artisan doit appartenir à UNE spécialité
-- ==========================================

-- Artisans du mois (is_featured = 1)
INSERT INTO artisans (name, rating, city, description, website, is_featured, specialty_id) VALUES
('Atelier Dubois', 5, 'Lyon (69)',
 'Spécialiste en menuiserie depuis plus de 20 ans.',
 'https://www.atelier-dubois.fr',
 1,
 (SELECT id FROM specialties WHERE name = "Menuiserie")),

('Services & Co', 5, 'Grenoble (38)',
 'Entreprise de plomberie intervenant rapidement.',
 NULL,
 1,
 (SELECT id FROM specialties WHERE name = "Plomberie")),

('Boulangerie Rondeau', 4, 'Pontoise (95)',
 'Boulangerie artisanale proposant pains et viennoiseries.',
 NULL,
 1,
 (SELECT id FROM specialties WHERE name = "Boulangerie"));

-- Artisans bonus
INSERT INTO artisans (name, rating, city, description, website, is_featured, specialty_id) VALUES
('Métal Création', 5, 'Saint-Étienne (42)',
 'Artisan spécialisé dans la métallerie personnalisée.',
 NULL,
 0,
 (SELECT id FROM specialties WHERE name = "Métallerie")),

('Coiffure Élégance', 4, 'Clermont-Ferrand (63)',
 'Salon de coiffure moderne et chaleureux.',
 NULL,
 0,
 (SELECT id FROM specialties WHERE name = "Coiffure")),

('Jardin Vert', 5, 'Annecy (74)',
 'Entreprise de jardinage spécialisée dans les espaces verts.',
 NULL,
 0,
 (SELECT id FROM specialties WHERE name = "Jardinage")),

('Pâtisserie Douceur', 4, 'Valence (26)',
 'Pâtisserie artisanale avec spécialités locales.',
 NULL,
 0,
 (SELECT id FROM specialties WHERE name = "Pâtisserie")),

('ÉlecMaster', 4.5, 'Lyon (69)',
 'Artisan électricien pour rénovations et installations.',
 NULL,
 0,
 (SELECT id FROM specialties WHERE name = "Électricité"));
