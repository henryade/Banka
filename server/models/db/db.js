    
import { Pool } from "pg";
<<<<<<< HEAD
import {
  USER, HOST, PASSWORD, DATABASE, DBPORT,
} from "../../config";
import { CREATETABLES } from "../controller";
=======
import dotenv from "dotenv";

dotenv.config();
// import { CREATETABLES } from "../controller";
>>>>>>> ch-refactor-165853483

class Model {
  constructor() {
    this.pool = Model.initConn();
<<<<<<< HEAD
    this.createTable(CREATETABLES);
    this.pool.on("error", (err) => {
      console.log("Error occured");
    });
    this.pool.on("connect", (err) => {
      console.log("connection successful");
    });
=======
>>>>>>> ch-refactor-165853483
  }

  async createTable(type) {
    await this.pool.query(type);
  }

  async insertTable(query, values) {
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async modifyDb(query) {
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async queryDb(query) {
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getAll(query) {
    const result = await this.pool.query(query);
    return result.rows;
  }

  async deleteTable(table) {
    const queryText = `DELETE FROM ${table}`;
    await this.pool.query(queryText);
  }

  static initConn() {
    const pool = new Pool({
<<<<<<< HEAD
      user: USER,
      host: HOST,
      password: PASSWORD,
      database: DATABASE,
      port: DBPORT,
=======
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DBPORT,
      host: process.env.HOST,
>>>>>>> ch-refactor-165853483
      ssl: true,
    });
    return pool;
  }
}

const model = new Model();
export default model;
