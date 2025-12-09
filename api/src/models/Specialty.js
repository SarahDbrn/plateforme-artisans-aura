import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Specialty = sequelize.define(
    'Specialty',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'specialties',
      timestamps: false,
    },
  );

  return Specialty;
};
