import sequelize from '../config/database.js';
import CategoryModel from './Category.js';
import SpecialtyModel from './Specialty.js';
import ArtisanModel from './Artisan.js';

const Category = CategoryModel(sequelize);
const Specialty = SpecialtyModel(sequelize);
const Artisan = ArtisanModel(sequelize);

// Associations
// Une catégorie a plusieurs spécialités
Category.hasMany(Specialty, { foreignKey: 'categoryId' });
Specialty.belongsTo(Category, { foreignKey: 'categoryId' });

// Une spécialité a plusieurs artisans
Specialty.hasMany(Artisan, { foreignKey: 'specialtyId' });
Artisan.belongsTo(Specialty, { foreignKey: 'specialtyId' });

export { sequelize, Category, Specialty, Artisan };
