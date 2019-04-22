/**
 * Create Tables
 */
const CREATETABLES = {
  USER: `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY UNIQUE,
        firstName VARCHAR(25) NOT NULL,
        lastName VARCHAR(25) NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password TEXT NOT NULL,
        type TEXT NOT NULL,
        isAdmin boolean NOT NULL
        )
    `,
  ACCOUNT:
    `CREATE TABLE IF NOT EXISTS
      accounts(
        id INTEGER PRIMARY KEY UNIQUE,
        accountNumber NUMERIC (10) NOT NULL UNIQUE,
        owner INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(20) NOT NULL,
        createdOn TIMESTAMP,
        status VARCHAR(7) NOT NULL,
        balance NUMERIC (13, 2) NOT NULL
      )`,
  TRANSACTION: `CREATE TABLE IF NOT EXISTS
    transactions(
      id INTEGER PRIMARY KEY UNIQUE,
      type VARCHAR(6) NOT NULL,
      accountNumber NUMERIC (10) NOT NULL REFERENCES accounts(accountNumber) ON DELETE CASCADE,
      cashier INTEGER REFERENCES users(id),
      amount NUMERIC (12, 2) NOT NULL,
      oldbalance NUMERIC (20, 2) NOT NULL,
      newbalance NUMERIC (20, 2) NOT NULL,
      createdOn TIMESTAMP,
      depositor_name VARCHAR(25) NOT NULL,
      depositor_phone_number NUMERIC (13) NOT NULL
  )`,
};

const DBQUERY = {
  GETALL: {
    USER: () => ({
      text: "SELECT * FROM users",
    }),
    ACCOUNT() {
      return "SELECT * FROM accounts";
    },

    TRANSACTION: () => ({
      text: "SELECT * FROM transactions",
    }),
  },
  SELECT: {
    USER: {
      EMAIL: values => ({
        text: "SELECT * FROM users WHERE email = $1",
        values,
      }),
      TYPE: values => ({
        text: "SELECT * FROM users WHERE type = $1",
        values,
      }),
      OWNER: values => ({
        text: "SELECT id FROM users WHERE email = $1",
        values,
      }),
    },
    ACCOUNT: {
      TYPE: values => ({
        text: "SELECT * FROM users WHERE id IN (SELECT owner FROM accounts WHERE type = $1)",
        values,
      }),
      ACCOUNTNUMBER: values => ({
        text: "SELECT * FROM accounts WHERE accountNumber = $1",
        values,
      }),
      STATUS: values => ({
        text: "SELECT * FROM accounts WHERE status = $1",
        values,
      }),
    },
    TRANSACTION: {
      ID: values => ({
        text: "SELECT * FROM transactions WHERE id = $1",
        values,
      }),
      ACCOUNTNUMBER: values => ({
        text: "SELECT * FROM transactions WHERE accountnumber = $1",
        values,
      }),
    },
    CHECK: values => ({
      text: "SELECT * FROM accounts WHERE accountnumber = $1",
      values,
    }),
  },
  INSERT: {
    USER: values => ({
      text: "INSERT INTO users(firstname,lastname,email,password,type,isAdmin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      values,
    }),
    ACCOUNT: values => ({
      text: "INSERT INTO accounts(id,accountNumber,owner,type,createdOn,status,balance) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      values,
    }),
    TRANSACTION: values => ({
      text: "INSERT INTO transactions(id,type,accountNumber,cashier,amount,oldbalance,newbalance,createdOn,depositor_name,depositor_phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      values,
    }),
  },
  UPDATE: {
    ACCOUNT: values => ({
      text: "UPDATE accounts SET status = $1 WHERE accountNumber = $2 RETURNING *",
      values,
    }),
    BALANCE: values => ({
      text: "UPDATE accounts SET balance = $1 WHERE accountNumber = $2 RETURNING *",
      values,
    }),
  },
  DELETE: {
    ACCOUNT: values => ({
      text: "DELETE FROM accounts WHERE accountNumber = $1 RETURNING *",
      values,
    }),
  },
};

const dropTable = table => `DROP TABLE IF EXISTS ${table} CASCADE`;

module.exports = {
  CREATETABLES,
  DBQUERY,
  dropTable,
};
