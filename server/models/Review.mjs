import { DataTypes } from 'sequelize';
import db from '../config/db.mjs';
import Psychologist from './Psychologist.mjs';

const Review = db.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  psychologistId: {
    type: DataTypes.UUID, // <--- CAMBIA ESTO
    allowNull: false,
    references: {
      model: Psychologist,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  updatedAt: false,
  tableName: 'reviews',
});

Review.belongsTo(Psychologist, { foreignKey: 'psychologistId' });

export default Review;