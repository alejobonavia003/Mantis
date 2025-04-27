import { DataTypes } from 'sequelize';
import sequelize from '../config/db.mjs';

const Product = sequelize.define('productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion_corta: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descripcion_larga: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false

  },
   stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }, 
  galeria_imagenes: {
    type: DataTypes.JSONB, // Almacenará un array de URLs
    allowNull: true,
    defaultValue: []
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true
  }

}, {
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'updated_at',
  tableName: 'productos'
});

export default Product;
