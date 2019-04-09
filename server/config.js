import dotenv from "dotenv";

dotenv.config();

module.exports = {
  port: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
};
