const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Speciality = sequelize.define(
  'Speciality',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: 'specialities',
    timestamps: false,
  }
);

module.exports = Speciality;
