import { DataTypes } from 'sequelize';
import sequelize from '../config/db.mjs';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  material: { // NUEVO
    type: DataTypes.STRING,
    allowNull: true,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Order;
