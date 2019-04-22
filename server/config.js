import dotenv from "dotenv";

dotenv.config();

module.exports = {
  port: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  USER: process.env.USER,
  HOST: process.env.HOST,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  DBPORT: process.env.DBPORT,
};
