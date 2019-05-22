    
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class Model {
  constructor() {
    this.pool = Model.initConn();
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
    const obj = {
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DBPORT,
      host: process.env.HOST,
    }
    if (obj.user !== "wwtenmmm") obj.ssl = true;
    const pool = new Pool(obj);
    return pool;
  }
}

const model = new Model();
export default model;
