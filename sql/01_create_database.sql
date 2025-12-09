-- ==========================================
-- SCRIPT DE CREATION DE LA BASE DE DONNEES
-- Plateforme des artisans - Région AURA
-- ==========================================

-- 1. Création de la base
CREATE DATABASE IF NOT EXISTS plateforme_artisans
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE plateforme_artisans;

-- 2. Table des catégories (Bâtiment, Services, Fabrication, Alimentation)
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialties;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- 3. Table des spécialités (rattachées à une seule catégorie)
CREATE TABLE specialties (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_specialties_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. Table des artisans
-- Un artisan appartient à UNE spécialité (et donc à UNE catégorie via cette spécialité)
CREATE TABLE artisans (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  rating FLOAT NOT NULL DEFAULT 0,
  city VARCHAR(100) NOT NULL,
  description TEXT NULL,
  website VARCHAR(255) NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0, -- artisans du mois
  specialty_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_artisans_specialty
    FOREIGN KEY (specialty_id)
    REFERENCES specialties(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. Index pour optimiser les recherches (nom, ville, note, mise en avant)
CREATE INDEX idx_artisans_name ON artisans (name);
CREATE INDEX idx_artisans_city ON artisans (city);
CREATE INDEX idx_artisans_rating ON artisans (rating);
CREATE INDEX idx_artisans_is_featured ON artisans (is_featured);

CREATE INDEX idx_specialties_name ON specialties (name);
CREATE INDEX idx_categories_name ON categories (name);
