/**
 * Create Tables
 */
const CREATETABLES = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY UNIQUE,
        "firstName" VARCHAR(25) NOT NULL,
        "lastName" VARCHAR(25) NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password TEXT NOT NULL,
        type TEXT NOT NULL,
        "isAdmin" boolean NOT NULL
        );
    CREATE TABLE IF NOT EXISTS
      accounts(
        id SERIAL PRIMARY KEY UNIQUE,
        email VARCHAR NOT NULL UNIQUE,
        "accountNumber" NUMERIC (10) NOT NULL UNIQUE,
        owner INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(20) NOT NULL,
        "createdOn" TIMESTAMP,
        status VARCHAR(7) NOT NULL,
        balance NUMERIC (13, 2) NOT NULL
      );
  CREATE TABLE IF NOT EXISTS
    transactions(
      id SERIAL PRIMARY KEY UNIQUE,
      type VARCHAR(6) NOT NULL,
      "accountNumber" NUMERIC (10) NOT NULL REFERENCES accounts("accountNumber") ON DELETE CASCADE,
      cashier INTEGER REFERENCES users(id),
      amount NUMERIC (12, 2) NOT NULL,
      oldbalance NUMERIC (20, 2) NOT NULL,
      newbalance NUMERIC (20, 2) NOT NULL,
      "createdOn" TIMESTAMP,
      depositor_name VARCHAR(25) NOT NULL,
      depositor_phone_number NUMERIC (13) NOT NULL
  );

  INSERT INTO users("firstName","lastName",email,password,type,"isAdmin") VALUES ('Second','Nme','staff5@gmail.com','$2y$10$zrLAN0nrtJ1JyVMD6BHUM.ZXak4.rvrdP2whzeMuCudRuFCvcVzZm','staff',false), ('Second','Nme','user5@gmail.com','$2y$10$TMc8YcK/7CcCpfJRCToIQ.MOEU970aFyzMEF6epiPkCBfgvSOuKIq','client',false), ('Forth','Desth','admin3@gmail.com','$2y$10$zrLAN0nrtJ1JyVMD6BHUM.ZXak4.rvrdP2whzeMuCudRuFCvcVzZm','staff',true) ON CONFLICT DO NOTHING;
  INSERT INTO accounts(email,"accountNumber",owner,type,"createdOn",status,balance) VALUES ('user6@gmail.com',9000134322,2,'Savings',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'active',400000.00), ('user5@gmail.com',9000134354,2,'Current',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'dormant',5000000.00), ('user75@gmail.com',9000134302,2,'Current',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'active',4000000.00), ('user7@gmail.com',9000134394,2,'Savings',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'active',5000000.00) ON CONFLICT DO NOTHING;
  INSERT INTO transactions(type,"accountNumber",cashier,amount,oldbalance,newbalance,"createdOn",depositor_name,depositor_phone_number) VALUES ('credit',9000134322,1,4000, 400000, 394000,TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'henry',2348062879553), ('debit', 9000134354, 3,4000, 400000, 396000,TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'harry',2348062898553), ('debit', 9000134354, 3,4000, 396000, 39200, TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'harry',2348062898553) ON CONFLICT DO NOTHING;
  `;

const DBQUERY = {
  GETALL: {
    USER: () => ({
      text: "SELECT * FROM users",
    }),
    ACCOUNT: values => ({
      text: "SELECT * FROM accounts WHERE (status = $1 or $1 is null)",
      values,
    }),

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
        text: "SELECT * FROM users WHERE email = $1 AND type = $2",
        values,
      }),
      OWNER: values => ({
        text: "SELECT id FROM users WHERE email = $1",
        values,
      }),
    },
    ACCOUNT: {
      TYPE: values => ({
        text: "SELECT * FROM users WHERE id IN (SELECT owner FROM accounts WHERE type = $1 AND \"accountNumber\" = $2)",
        values,
      }),
      EMAIL: values => ({
        text: "SELECT * FROM accounts WHERE owner IN (SELECT id FROM users WHERE email = $1)",
        values,
      }),
      ACCOUNTNUMBER: values => ({
        text: "SELECT * FROM accounts WHERE \"accountNumber\" = $1",
        values,
      }),
    },
    TRANSACTION: {
      ID: values => ({
        text: "SELECT * FROM transactions WHERE id = $1",
        values,
      }),
      ACCOUNTNUMBER: values => ({
        text: "SELECT * FROM transactions WHERE \"accountNumber\" = $1",
        values,
      }),
    },
    CHECK: values => ({
      text: "SELECT * FROM accounts WHERE \"accountNumber\" = $1",
      values,
    }),
  },
  INSERT: {
    USER: values => ({
      text: "INSERT INTO users(\"firstName\",\"lastName\",email,password,type,\"isAdmin\") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      values,
    }),
    ACCOUNT: values => ({
      text: "INSERT INTO accounts(email,\"accountNumber\",owner,type,\"createdOn\",status,balance) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      values,
    }),
    TRANSACTION: values => ({
      text: "INSERT INTO transactions(type,\"accountNumber\",cashier,amount,oldbalance,newbalance,\"createdOn\",depositor_name,depositor_phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      values,
    }),
  },
  UPDATE: {
    ACCOUNT: values => ({
      text: "UPDATE accounts SET status = $1 WHERE \"accountNumber\" = $2 RETURNING *",
      values,
    }),
    BALANCE: values => ({
      text: "UPDATE accounts SET balance = $1 WHERE \"accountNumber\" = $2 RETURNING *",
      values,
    }),
  },
  DELETE: {
    ACCOUNT: values => ({
      text: "DELETE FROM accounts WHERE \"accountNumber\" = $1 RETURNING *",
      values,
    }),
    USER: values => ({
      text: "DELETE FROM users WHERE email = $1 RETURNING *",
      values,
    }),
  },
};

module.exports = {
  CREATETABLES,
  DBQUERY,
};
