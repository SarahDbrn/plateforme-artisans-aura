-- La base et les tables

USE artisans_auras;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE specialities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE artisans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  city VARCHAR(100) NOT NULL,
  about TEXT,
  email VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  top TINYINT(1) DEFAULT 0,
  speciality_id INT NOT NULL,
  FOREIGN KEY (speciality_id) REFERENCES specialities(id)
);

-- Catégories
INSERT INTO categories (id, name) VALUES (1, 'Alimentation');
INSERT INTO categories (id, name) VALUES (2, 'Bâtiment');
INSERT INTO categories (id, name) VALUES (3, 'Fabrication');
INSERT INTO categories (id, name) VALUES (4, 'Services');

-- Spécialités
INSERT INTO specialities (id, name, category_id) VALUES (1,  'Bijoutier',     3);
INSERT INTO specialities (id, name, category_id) VALUES (2,  'Boucher',       1);
INSERT INTO specialities (id, name, category_id) VALUES (3,  'Boulanger',     1);
INSERT INTO specialities (id, name, category_id) VALUES (4,  'Chauffagiste',  2);
INSERT INTO specialities (id, name, category_id) VALUES (5,  'Chocolatier',   1);
INSERT INTO specialities (id, name, category_id) VALUES (6,  'Coiffeur',      4);
INSERT INTO specialities (id, name, category_id) VALUES (7,  'Couturier',     3);
INSERT INTO specialities (id, name, category_id) VALUES (8,  'Electricien',   2);
INSERT INTO specialities (id, name, category_id) VALUES (9,  'Ferronier',     3);
INSERT INTO specialities (id, name, category_id) VALUES (10, 'Fleuriste',     4);
INSERT INTO specialities (id, name, category_id) VALUES (11, 'Menuisier',     2);
INSERT INTO specialities (id, name, category_id) VALUES (12, 'Plombier',      2);
INSERT INTO specialities (id, name, category_id) VALUES (13, 'Toiletteur',    4);
INSERT INTO specialities (id, name, category_id) VALUES (14, 'Traiteur',      1);
INSERT INTO specialities (id, name, category_id) VALUES (15, 'Webdesign',     4);

-- Artisans
INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Boucherie Dumont',
  4.5,
  'Lyon',
  'Texte à propos à compléter',
  'boucherie.dumond@gmail.com',
  NULL,
  0,
  2  -- Boucher
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Au pain chaud',
  4.8,
  'Montélimar',
  'Texte à propos à compléter',
  'aupainchaud@hotmail.com',
  NULL,
  1,
  3  -- Boulanger (artisan du mois)
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Or Féérique',
  4.9,
  'Annecy',
  'Artisan bijoutier de qualité.',
  'contact@orfeerique.fr',
  'https://orfeeriqueshop.fr',
  1,
  1
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Choco Délices',
  4.7,
  'Grenoble',
  'Chocolaterie artisanale.',
  'contact@chocodelices.fr',
  NULL,
  0,
  5
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'ThermoPlus',
  4.2,
  'Clermont-Ferrand',
  'Spécialiste chauffage et maintenance.',
  'service@thermoplus.fr',
  NULL,
  0,
  4
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Studio BelleChevelure',
  4.6,
  'Lyon',
  'Salon de coiffure moderne.',
  'contact@bellechevelure.com',
  'https://bellechevelure.com',
  1,
  6
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Atelier Fil & Style',
  4.4,
  'Saint-Étienne',
  'Créations textiles sur mesure.',
  'atelierfilstyle@gmail.com',
  NULL,
  0,
  7
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'RLC Électricité',
  4.3,
  'Valence',
  'Expert en installations électriques.',
  'contact@rlc-electricite.fr',
  NULL,
  0,
  8
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Forge d’Acier',
  4.8,
  'Bourg-en-Bresse',
  'Travail du métal artisanal.',
  'contact@forgedacier.fr',
  NULL,
  1,
  9
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Pétales & Cie',
  4.7,
  'Lyon',
  'Créations florales uniques.',
  'contact@petalescie.fr',
  'https://petalescie.fr',
  0,
  10
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'BoisTradition',
  4.4,
  'Chambéry',
  'Menuiserie artisanale.',
  'contact@boistradition.fr',
  NULL,
  0,
  11
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'AquaFlow',
  4.1,
  'Roanne',
  'Service plomberie rapide.',
  'contact@aquaflow.fr',
  NULL,
  0,
  12
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Chien Chic',
  4.6,
  'Lyon',
  'Toilettage pour animaux.',
  'contact@chienchic.fr',
  'https://chienchic.fr',
  1,
  13
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Saveurs en Fête',
  4.9,
  'Villeurbanne',
  'Traiteur pour tous vos événements.',
  'contact@saveursenfete.fr',
  'https://saveursenfete.fr',
  1,
  14
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'PixelCraft',
  4.8,
  'Grenoble',
  'Studio web & design.',
  'contact@pixelcraft.fr',
  'https://pixelcraft.fr',
  1,
  15
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Le Pain Doré',
  4.5,
  'Annecy',
  'Boulanger artisanal.',
  'contact@lepaindore.fr',
  NULL,
  0,
  3
);

INSERT INTO artisans (name, rating, city, about, email, website, top, speciality_id)
VALUES (
  'Maison Dubois',
  4.4,
  'Clermont-Ferrand',
  'Boucherie familiale.',
  'contact@maisondubois.fr',
  NULL,
  0,
  2
);
