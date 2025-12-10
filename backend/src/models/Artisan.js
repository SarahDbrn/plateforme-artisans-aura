const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define(
  'Artisan',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    about: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING },
    top: { type: DataTypes.BOOLEAN, defaultValue: false },
    speciality_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: 'artisans',
    timestamps: false,
  }
);

module.exports = Artisan;
