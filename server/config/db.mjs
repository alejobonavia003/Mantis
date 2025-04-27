import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DATABASE_URL; // Asegúrate de usar "DATABASE_URL" correctamente

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario en Railway
    },
  },
  logging: false, // Opcional: desactivar logs SQL en consola
});

export default sequelize;
