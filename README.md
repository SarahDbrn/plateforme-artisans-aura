1# Plateforme Artisans AURA

## 1. Fonctionnalités principales

### Front-end (React)

- Design **mobile first** (maquettes Figma — responsive desktop / tablette / mobile).
- Pages :
  - Accueil
  - Liste des artisans (avec filtres et recherche)
  - Fiche artisan détaillée
  - Pages légales (mentions légales, données personnelles, accessibilité, cookies)
  - Page 404
- Header dynamique avec menu alimenté par l’API.
- Barre de recherche globale dans l’en-tête.
- Formulaire de contact envoyant un message via l’API.
- Titres & meta-descriptions pour le SEO.
- Respect des normes d’accessibilité WCAG 2.1.

### Back-end (Node.js + Express)

- API REST sécurisée interrogeant une base MySQL.
- Création de trois modèles Sequelize :
  - `Category`
  - `Speciality`
  - `Artisan`
- Endpoints :
  - `GET /categories`
  - `GET /specialities`
  - `GET /artisans`
  - `GET /artisans/:id`
  - `POST /artisans/:id/contact`
- Validation des données envoyées au formulaire.
- Protection contre :
  - Injections SQL
  - XSS
  - Mauvaise configuration CORS
- Gestion des variables sensibles via `.env`.
- API servie uniquement en HTTPS sur Render.

### Base de données (MySQL)

- **Nom de la base** : `artisans_auras`
- Relations :
  - 1 Catégorie → N Spécialités
  - 1 Spécialité → N Artisans

#### Scripts SQL fournis

Deux scripts SQL sont fournis pour coller à la consigne :

- `database.sql`  
  👉 **Script de création de la base** : création de la base `artisans_auras` et des tables `categories`, `specialities`, `artisans`.

- `seed.sql`  
  👉 **Script d’alimentation de la base** : insertion des données d’exemple (catégories, spécialités et artisans).  
  Les données d’artisans sont basées sur le fichier `data.xlsx`.

Ces scripts peuvent être rejoués à tout moment pour réinitialiser la base.

---

## 2. Liens du projet

### Site en ligne (Front-end)

https://plateforme-artisans-aura.onrender.com/

### API en ligne (Back-end)

https://artisans-backend-f4wf.onrender.com

### Repository GitHub

https://github.com/SarahDbrn/plateforme-artisans-aura

### Maquettes Figma

#### Mobile

![Mobile Home](./design/Home%20(Mobile).png)  
![Mobile Liste](./design/Liste%20artisans%20(Mobile).png)  
![Mobile Fiche](./design/Fiche%20Artisan%20(Mobile).png)  
![Mobile 404](./design/Page%20404%20(Mobile).png)

#### Desktop

![Desktop Home](./design/Home%20(Desktop).png)  
![Desktop Liste](./design/Liste%20Artisans%20(Desktop).png)  
![Desktop Fiche](./design/Fiche%20Artisan%20(Desktop).png)  
![Desktop 404](./design/Page%20404%20(Desktop).png)

#### Tablette

![Tablette Home](./design/Home%20(Tablette).png)  
![Tablette Liste](./design/Liste%20artisans%20(Tablette).png)  
![Tablette Fiche](./design/Fiche%20Artisan%20(Tablette).png)  
![Tablette 404](./design/Page%20404%20(Tablette).png)

---

## 3. Installation & lancement

### Prérequis

- Node.js v16+
- MySQL ou MariaDB
- `npm` ou `yarn`

### Installation du backend

cd backend
npm install

#### Configurer les variables d'environnement

Créer un fichier .env dans /backend :
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=artisans_auras
DB_PORT=3306

API_KEY=your_api_key

DB_NAME doit correspondre au nom utilisé dans les scripts SQL (artisans_auras).

#### Créer & alimenter la base de données

Depuis le client MySQL :
mysql -u root -p

Puis dans MySQL :
SOURCE sql/database.sql;
SOURCE sql/seed.sql;

database.sql crée la base et les tables.
seed.sql insère les données (catégories, spécialités, artisans).
Les scripts sont rejouables : database.sql peut supprimer/recréer la base proprement avant de la reconstruire.

#### Lancer le serveur API

npm start

L'API tourne sur : http://localhost:5000

### Installation du frontend

cd frontend
npm install
npm start

L’application front est accessible sur :
http://localhost:3000

---

## 4. Structure du projet

plateforme-artisans-aura/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── Artisan.js
│   │   │   ├── Category.js
│   │   │   ├── Speciality.js
│   │   │   └── index.js
│   │   ├── routes/
│   │   │   ├── artisans.js
│   │   │   └── categories.js
│   │   └── server.js
│   ├── .env (non versionné)
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
│── database.sql   # Script de création de la base
│── seed.sql       # Script d'alimentation (INSERT)
│
├── data.xlsx          # Données source pour les artisans
└── README.md

---

## 5. Sécurité mise en place

- Sequelize → protection contre les injections SQL.
- CORS configuré (domaines autorisés uniquement).
- Validation des champs formulaires côté front et côté back.
- Variables sensibles dans .env (non versionné).
- HTTPS obligatoire sur Render.
- Architecture séparée front / back.
- Headers sécurisés recommandés (helmet).

---

## 6. Veille sécurité

### Sources étudiées

- OWASP Top 10
- CERT-FR
- Node.js best practices
- React Security Guidelines

### Vulnérabilités surveillées

- XSS
- CSRF
- Injection SQL
- Exposition .env
- Manque de validation côté serveur

### Mesures appliquées

- Contrôles d’entrée
- CORS restrictif
- Sécurisation des formulaires
- Logs d’erreurs contrôlés
- Utilisation de Sequelize

---

## 7. Auteur

Projet réalisé par Sarah DEBRUYNE dans le cadre du module Développement Web.
Année : 2025

---

## 8. Licence
Projet pédagogique – reproduction interdite hors usage scolaire.

---
