import { DataTypes } from 'sequelize';
import db from '../config/db.mjs';
import Psychologist from './Psychologist.mjs';

const ReviewToken = db.define('ReviewToken', {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  createdAt: true,
  updatedAt: false,
  tableName: 'review_tokens',
});

ReviewToken.belongsTo(Psychologist, { foreignKey: 'psychologistId' });

export default ReviewToken;