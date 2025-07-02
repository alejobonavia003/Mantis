import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";

const Block = sequelize.define('Block', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  configuration: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_index'
  },
    fileName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'fileName'
  },
  page: DataTypes.STRING

}, {
  tableName: 'blocks',
  timestamps: true,
  underscored: true
});

export default Block;