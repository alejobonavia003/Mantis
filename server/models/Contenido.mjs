import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";

const Contenido = sequelize.define("ContenidoHeader", {
  clave: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // La clave debe ser única
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Contenido;