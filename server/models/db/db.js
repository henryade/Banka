    
import { Pool } from "pg";
import {
  USER, HOST, PASSWORD, DATABASE, DBPORT,
} from "../../config";
import { CREATETABLES } from "../controller";

class Model {
  constructor() {
    this.pool = Model.initConn();
    this.createTable(CREATETABLES);
    this.pool.on("error", (err) => {
      console.log("Error occured");
    });
    this.pool.on("connect", (err) => {
      console.log("connection successful");
    });
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
      user: USER,
      host: HOST,
      password: PASSWORD,
      database: DATABASE,
      port: DBPORT,
      ssl: true,
    });
    return pool;
  }
}

const model = new Model();
module.exports = model;
