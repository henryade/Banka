import { Pool } from "pg";
import {
  USER, HOST, PASSWORD, DATABASE, DBPORT,
} from "../../config";
import { CREATETABLES, dropTable } from "../controller";

class Model {
  constructor() {
    this.pool = Model.initConn();
    this.createTable(CREATETABLES.USER);
    this.createTable(CREATETABLES.ACCOUNT);
    this.createTable(CREATETABLES.TRANSACTION);
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
    await this.pool.query(queryText)

  }

  dropTables(queryText) {
    this.pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  static initConn() {
    const pool = new Pool({
      user: USER,
      host: HOST,
      password: PASSWORD,
      database: DATABASE,
      port: DBPORT,
    });
    return pool;
  }
}

const model = new Model();
module.exports = model;
