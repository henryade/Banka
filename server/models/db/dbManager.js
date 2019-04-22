import { Pool } from "pg";
import * as runnable from "make-runnable";
import {
  USER, HOST, PASSWORD, DATABASE, DBPORT,
} from "../../config";
import {
  createUserTables, createAccountTables, createTransactionTables, user, account, transaction,
} from "../controller";


export const QUERY = {
  INSERT_USER: values => ({
    text: "INSERT INTO users(id, firstname,lastname,email,password,type,isAdmin) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    values,
  }),

  UPDATE_USER: "",
  FETCH_USER_BY_ID: "",

};

const queyry = QUERY.INSERT_USER([334, 788]);

class Model {
  constructor() {
    // this should be sett to a funtion
    this.poolErrorListener = null;
    this.pool = Model.initConn();
    // this.USERQUERY = "INSERT INTO users(id, firstname,lastname,email,password,type,isAdmin) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    // this.accountQuery = "INSERT INTO accounts(id,accountNumber,owner,type,createdOn,status,balance) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    // this.transactionQuery = "INSERT INTO transactions(id,type,accountNumber,cashier,amount,oldbalance,newbalance,created_date,depositor_name,depositor_phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *";
    this.pool.on("error", (err) => {
      if (this.poolErrorListener) { this.poolErrorListener(err); }
    //   console.log("Error occured");
    });
    this.pool.on("connect", (err) => {
      console.log("connection successful");
    });
  }

  createTable(type) {
    this.pool.query(type)
      .then((res) => {
        console.log(res);
        this.pool.end();
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  execute(query, callback) {
    return new Promise((res, rej) => {
      this.pool.connect((err, client, done) => {
        if (err) {
          return rej(err);
        }
        return res({ client, done });
      });
    }).then(pool => Model.performOperation(query, pool, callback));
  }


  static performOperation(query, pool, callback) {
    const promise = new Promise((res, rej) => {
      pool.client.query(query, (err, result) => {
        pool.done();
        if (err) {
          return rej(err);
        }
        return res(result);
      });
    });

    if (callback && typeof callback === "function") {
      promise.then(callback.bind(null, null), callback);
    }

    return promise;
  }

  deleteTable(table) {
    const queryText = `DELETE FROM ${table}`;
    this.pool.query(queryText)
      .then((res) => {
        console.log(res);
        this.pool.end();
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  dropTables(table) {
    const queryText = `DROP TABLE IF EXISTS ${table}`;
    this.pool.query(queryText)
      .then((res) => {
        console.log(res);
        this.pool.end();
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  close() {
    this.pool.on("remove", () => {
      console.log("client removed");
      process.exit(0);
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
// model.poolErrorListener = (err) => {
//   // handle the error from pool
// };

const insertOp = new SQLOperation(QUERY.INSERT_USER, []);
model.execute(insertOp)
  .then(() => {})
  .catch(() => {});

model.execute(insertOp, (err, result) => {

});
// model.createTable(createTransactionTables());
model.insertTable(model.accountQuery, account());
// module.exports =
// model.deleteTable("accounts");
// model.dropTables("accounts");












import { Pool } from "pg";
import {
  USER, HOST, PASSWORD, DATABASE, DBPORT,
} from "../../config";
import {
  createUserTables, createAccountTables, createTransactionTables, DBQUERY,
} from "../controller";

// require("make-runnable");


class Model {
  constructor() {
    this.pool = Model.initConn();
    // this.userQuery = "INSERT INTO users(id, firstname,lastname,email,password,type,isAdmin) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    // this.accountQuery = "INSERT INTO accounts(id,accountNumber,owner,type,createdOn,status,balance) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    this.transactionQuery = "INSERT INTO transactions(id,type,accountNumber,cashier,amount,oldbalance,newbalance,createdOn,depositor_name,depositor_phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *";
    this.pool.on("error", (err) => {
      console.log("Error occured");
    });
    this.pool.on("connect", (err) => {
      console.log("connection successful");
    });
  }

  createTable(type) {
    this.pool.query(type)
      .then((res) => {
        console.log(res);
        this.pool.end();
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  async insertTable(query, values) {
    let result = {};
    try {
      const client = await this.pool.connect();
      result = await client.query(query, values);
    } catch (err) {
      console.log(err);
    }
    // this.pool.end();
    return result.rows[0];
  }

  async select(query) {
    const client = await this.pool.connect();
    const result = await client.query(query);

    this.pool.end();
    return result.rows[0];
  }

  deleteTable(table) {
    const queryText = `DELETE FROM ${table}`;
    this.pool.query(queryText)
      .then((res) => {
        console.log(res);
        this.pool.end();
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  dropTables(table) {
    const queryText = `DROP TABLE IF EXISTS ${table} CASCADE`;
    this.pool.query(queryText)
      .then((res) => {
        console.log(res);
        // this.pool.end();
      })
      .catch((err) => {
        console.log(err);
        this.pool.end();
      });
  }

  close() {
    this.pool.on("remove", () => {
      console.log("client removed");
      process.exit(0);
    });
  }

  async restart() {
    // await this.dropTables("transactions");
    await this.createTable(createTransactionTables());
  }

  async loadData() {
    // const user = () => [40608, "sample", "user", "user1@gmail.com", "$2y$10$a0MwiU52OXxY2heoXj/WUOZ0tIdpL1i180SHna6jjGlsVrHdAUjn2", "client", false];

    // [id,accountNumber,owner,type,createdOn,status,balance]
    // const account = () =>  [40690, 3459897879, 40608, "Savings", new Date(Date.now()), "active", 400000.34];
    // const account1 = () =>  [40619, 3459897889, 31627, "Savings", new Date(Date.now()), "active", 400000.34];
    // const account2 = () =>  [40629, 3458978979, 31315, "Savings", new Date(Date.now()), "active", 400000.34];

    // [id,type,accountNumber,cashier,amount,oldbalance,newbalance,created_date,depositor_name,depositor_phone_number]
    // const transaction = () => [54047, "credit", 3459897879, 40608, 4374.32, 3487428.43, 438472.34, new Date(Date.now()), "sampler", 2345479893333];
    // const transaction1 = () => [55007, "credit", 3459897879, 40608, 4374.32, 3487428.43, 438472.34, new Date(Date.now()), "sampler", 2345479893333];
    // try {
    //   await this.insertTable(this.transactionQuery, transaction());
    //   await this.insertTable(this.transactionQuery, transaction1());
    // } catch (err) {
    //   console.log(err);
    // }
    // this.pool.end();
    // await this.insertTable(this.accountQuery, account2());
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
//  const execute = async () => {
//   await model.dropTables("transaction");
//   await model.createTable(createTransactionTables());
//   await model.insertTable(model.transactionQuery, transaction());

// }
// model.restart();
model.loadData();

// execute();
// model.createTable(createTransactionTables());
// model.insertTable(model.transactionQuery, transaction());
// model.deleteTable("accounts");
// model.dropTables("transactions");

// module.exports = model;
