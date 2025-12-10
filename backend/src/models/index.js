const Category = require('./Category');
const Speciality = require('./Speciality');
const Artisan = require('./Artisan');

// 1 catégorie → plusieurs spécialités
Category.hasMany(Speciality, { foreignKey: 'category_id' });
Speciality.belongsTo(Category, { foreignKey: 'category_id' });

// 1 spécialité → plusieurs artisans
Speciality.hasMany(Artisan, { foreignKey: 'speciality_id' });
Artisan.belongsTo(Speciality, { foreignKey: 'speciality_id' });

module.exports = { Category, Speciality, Artisan };
