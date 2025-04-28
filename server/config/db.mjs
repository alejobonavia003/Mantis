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

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false  }); // alter: true para actualizar tablas existentes sin perder datos
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the models:', error);
  }
};

export { sequelize, connectDB, syncDB };

export default sequelize;
