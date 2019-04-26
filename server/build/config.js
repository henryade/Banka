"use strict";

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

module.exports = {
  port: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  USER: process.env.USER,
  HOST: process.env.HOST,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  DBPORT: process.env.DBPORT
};