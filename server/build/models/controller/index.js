"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create Tables
 */
var CREATETABLES = "\nDROP TABLE IF EXISTS users CASCADE;\nDROP TABLE IF EXISTS accounts CASCADE;\nDROP TABLE IF EXISTS transactions CASCADE;\n\nCREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY UNIQUE,\n        \"firstName\" VARCHAR(25) NOT NULL,\n        \"lastName\" VARCHAR(25) NOT NULL,\n        email VARCHAR NOT NULL UNIQUE,\n        password TEXT NOT NULL,\n        type TEXT NOT NULL,\n        \"isAdmin\" boolean NOT NULL\n        );\n    CREATE TABLE IF NOT EXISTS\n      accounts(\n        id SERIAL PRIMARY KEY UNIQUE,\n        email VARCHAR NOT NULL,\n        \"accountNumber\" NUMERIC (10) NOT NULL UNIQUE,\n        owner INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n        type VARCHAR(20) NOT NULL,\n        \"createdOn\" TIMESTAMP,\n        status VARCHAR(7) NOT NULL,\n        balance NUMERIC (13, 2) NOT NULL\n      );\n  CREATE TABLE IF NOT EXISTS\n    transactions(\n      id SERIAL PRIMARY KEY UNIQUE,\n      type VARCHAR(6) NOT NULL,\n      \"accountNumber\" NUMERIC (10) NOT NULL REFERENCES accounts(\"accountNumber\") ON DELETE CASCADE,\n      cashier INTEGER REFERENCES users(id),\n      amount NUMERIC (12, 2) NOT NULL,\n      oldbalance NUMERIC (20, 2) NOT NULL,\n      newbalance NUMERIC (20, 2) NOT NULL,\n      \"createdOn\" TIMESTAMP,\n      depositor_name VARCHAR(25) NOT NULL,\n      depositor_phone_number NUMERIC (13) NOT NULL\n  );\n\n  INSERT INTO users(\"firstName\",\"lastName\",email,password,type,\"isAdmin\") VALUES ('Second','Nme','staff5@gmail.com','$2y$10$zrLAN0nrtJ1JyVMD6BHUM.ZXak4.rvrdP2whzeMuCudRuFCvcVzZm','staff',false), ('Second','Name','user5@gmail.com','$2y$10$TMc8YcK/7CcCpfJRCToIQ.MOEU970aFyzMEF6epiPkCBfgvSOuKIq','client',false), ('Forth','Desth','admin3@gmail.com','$2y$10$zrLAN0nrtJ1JyVMD6BHUM.ZXak4.rvrdP2whzeMuCudRuFCvcVzZm','staff',true), ('Second','Name','clasiqaas@gmail.com','$2y$10$TMc8YcK/7CcCpfJRCToIQ.MOEU970aFyzMEF6epiPkCBfgvSOuKIq','client',false);\n  INSERT INTO accounts(email,\"accountNumber\",owner,type,\"createdOn\",status,balance) VALUES ('user5@gmail.com',9000134322,2,'Savings',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'active',400000.00), ('clasiqaas@gmail.com',9000240793,4,'Current',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'active',5000000.00), ('user5@gmail.com',9000134354,2,'Current',TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'dormant',5000000.00);\n  INSERT INTO transactions(type,\"accountNumber\",cashier,amount,oldbalance,newbalance,\"createdOn\",depositor_name,depositor_phone_number) VALUES ('credit',9000134322,1,4000, 400000, 394000,TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'henry',2348062879553), ('debit', 9000134354, 3,4000, 400000, 396000,TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'harry',2348062898553), ('debit', 9000134354, 3,4000, 396000, 39200, TO_TIMESTAMP('01-01-2017 10:2', 'DD-MM-YYYY SS:MS'),'harry',2348062898553);\n  ";

var DBQUERY = {
  GETALL: {
    USER: function USER() {
      return {
        text: "SELECT * FROM users"
      };
    },
    ACCOUNT: function ACCOUNT(values) {
      return {
        text: "SELECT * FROM accounts WHERE (status = $1 or $1 is null)",
        values: values
      };
    },

    TRANSACTION: function TRANSACTION() {
      return {
        text: "SELECT * FROM transactions"
      };
    }
  },
  SELECT: {
    USER: {
      ID: function ID(values) {
        return {
          text: "SELECT * FROM users WHERE id = $1",
          values: values
        };
      },
      TYPE: function TYPE(values) {
        return {
          text: "SELECT * FROM users WHERE email = $1 AND type = $2",
          values: values
        };
      },
      EMAIL: function EMAIL(values) {
        return {
          text: "SELECT * FROM users WHERE email = $1",
          values: values
        };
      }
    },
    ACCOUNT: {
      TYPE: function TYPE(values) {
        return {
          text: "SELECT * FROM users WHERE id IN (SELECT owner FROM accounts WHERE type = $1 AND email = $2)",
          values: values
        };
      },
      EMAIL: function EMAIL(values) {
        return {
          text: "SELECT * FROM accounts WHERE owner IN (SELECT id FROM users WHERE email = $1)",
          values: values
        };
      },
      ACCOUNTNUMBER: function ACCOUNTNUMBER(values) {
        return {
          text: "SELECT * FROM accounts WHERE \"accountNumber\" = $1",
          values: values
        };
      }
    },
    TRANSACTION: {
      ID: function ID(values) {
        return {
          text: "SELECT * FROM transactions WHERE id = $1",
          values: values
        };
      },
      ACCOUNTNUMBER: function ACCOUNTNUMBER(values) {
        return {
          text: "SELECT * FROM transactions WHERE \"accountNumber\" = $1",
          values: values
        };
      }
    },
    CHECK: function CHECK(values) {
      return {
        text: "SELECT * FROM accounts WHERE \"accountNumber\" = $1",
        values: values
      };
    }
  },
  INSERT: {
    USER: function USER(values) {
      return {
        text: "INSERT INTO users(\"firstName\",\"lastName\",email,password,type,\"isAdmin\") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        values: values
      };
    },
    ACCOUNT: function ACCOUNT(values) {
      return {
        text: "INSERT INTO accounts(email,\"accountNumber\",owner,type,\"createdOn\",status,balance) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        values: values
      };
    },
    TRANSACTION: function TRANSACTION(values) {
      return {
        text: "INSERT INTO transactions(type,\"accountNumber\",cashier,amount,oldbalance,newbalance,\"createdOn\",depositor_name,depositor_phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        values: values
      };
    }
  },
  UPDATE: {
    ACCOUNT: function ACCOUNT(values) {
      return {
        text: "UPDATE accounts SET status = $1 WHERE \"accountNumber\" = $2 RETURNING *",
        values: values
      };
    },
    BALANCE: function BALANCE(values) {
      return {
        text: "UPDATE accounts SET balance = $1 WHERE \"accountNumber\" = $2 RETURNING *",
        values: values
      };
    }
  },
  DELETE: {
    ACCOUNT: function ACCOUNT(values) {
      return {
        text: "DELETE FROM accounts WHERE \"accountNumber\" = $1 RETURNING *",
        values: values
      };
    },
    USER: function USER(values) {
      return {
        text: "DELETE FROM users WHERE email = $1 RETURNING *",
        values: values
      };
    }
  }
};
exports.CREATETABLES = CREATETABLES;
exports.DBQUERY = DBQUERY;