-- Script de création de la base : database.sql

-- Création de la base (si elle n'existe pas déjà)
CREATE DATABASE IF NOT EXISTS artisans_auras
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE artisans_auras;

-- Table catégories
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Table spécialités
CREATE TABLE specialities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Table artisans
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
