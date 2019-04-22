import db from "../models/jsObject/database";
import dbs from "../models/db/db";
import { DBQUERY } from "../models/controller";

module.exports = {
/**
 * Gets all users
 * @return {obj}    - returns a copy of all users
 */
  getUsers() {
    return JSON.parse(JSON.stringify(db.USERS.USER));
  },
  /**
 * Gets all accounts
 * @return {obj}    - returns a copy of all accounts
 */
  async getAccounts() {
    return await dbs.getAll(DBQUERY.GETALL.ACCOUNT());
    // return JSON.parse(JSON.stringify(db.ACCOUNTS));
  },

  /**
 * Gets all transactions
 * @return {obj}    - returns a copy of all transactions.
 */
  getTransactions() {
    return JSON.parse(JSON.stringify(db.TRANSACTIONS));
  },

  /**
 * Gets all staff
 * @return {obj}    - returns a copy of all staff
 */

  getStaff() {
    return JSON.parse(JSON.stringify(db.USERS.STAFF));
  },

  /**
 * Saves object to database
 * @param {obj} obj - object to be saved
 * @param {string} model - the dictionary name the object is to be saved
 */

  save(obj, model) {
    db[model].push(obj);
  },

  /**
 * Saves object to user array-object in database
 * @param {obj} obj - object to be saved
 */

  saveUser(obj) {
    if (obj.type.toLowerCase() === "staff") db.USERS.STAFF.push(obj);
    else db.USERS.USER.push(obj);
  },

  /**
 * Create a User
 * @param {obj} obj - object to be saved
 */
  async createUser(
    // token,
    firstName,
    lastName,
    email,
    password,
    type,
    isAdmin,
  ) {
    const user = [
      // token,
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin,
    ];
    const res = await dbs.insertTable(DBQUERY.INSERT.USER(user));
    return res;
  },

  /**
 * find object from database
 * @param {string} key - the key reference to be checked
 * @param {string} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findOneUser(Key, Value) {
    return this.getUsers().find(field => field[Key] === Value);
  },
  async findOwner(email) {
    const result = await dbs.queryDb(DBQUERY.SELECT.USER.OWNER([email]));
    if (result) {
      return result.id;
    }
  },

  findStaff(Key, Value) {
    return this.getStaff().find(field => field[Key] === Value);
  },

  /**
 * Create a Account
 * @param {obj} obj - object to be saved
 */
  async createAccount(
    id,
    accountNumber,
    createdOn,
    owner,
    gender,
    status,
    firstName,
    lastName,
    email,
    type,
    balance,
    phoneNumber,
    dob,
    address,
  ) {
    const userAccount = [
      id,
      accountNumber,
      owner,
      type,
      createdOn,
      status,
      // gender,
      // firstName,
      // lastName,
      // email,
      balance,
    // phoneNumber,
    // dob,
    // address,
    ];
    // [id,accountNumber,owner,type,createdOn,status,balance]
    const res = await dbs.insertTable(DBQUERY.INSERT.ACCOUNT(userAccount));
    return res;
  // this.save(userAccount, "ACCOUNTS");
  },

  /**
 * Find object from database
 * @param {string} value - the value to be matched
 * @return {array}    - returns an array of account that meets the pararmeters specified
 */
  findAccountByEmail(Value) {
    return this.getAccounts().filter(field => field.email === Value);
  },

  /**
 * Find object from database
 * @param {string} key - the value to be matched
 * @param {any} value - the value to be matched
 * @param {string} key1 - the value to be matched
 * @param {any} value1 - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  async findAccount(value1) {
    const res = await dbs.modifyDb(DBQUERY.SELECT.ACCOUNT.TYPE([value1]));
    return res;
    // return this.getAccounts().find(field => field[key] === value && field[key1] === value1);
  },
  /**
 * Find object from database
 * @param {number} accountNumber - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  async findAccountByAccountNumber(accountNumber) {
    const response = await dbs.queryDb(DBQUERY.SELECT.ACCOUNT.ACCOUNTNUMBER([accountNumber]));
    return response;
    // return this.getAccounts().find(field => field.accountNumber === accountNumber);
  },

  /**
 * Create a Transaction
 * @param {obj} obj - object to be saved
 */
  async createTransaction(
    id,
    createdOn,
    type,
    accountNumber,
    cashier,
    amount,
    oldBalance,
    newBalance,
    depositor,
    phoneNumber,
  ) {
    const userTransaction = [
      id,
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance,
      createdOn,
      depositor,
      phoneNumber,
    ];
    // [id,type,accountNumber,cashier,amount,oldbalance,newbalance,created_date,depositor_name,depositor_phone_number]
    const res = await dbs.insertTable(DBQUERY.INSERT.TRANSACTION(userTransaction));
    return res;
    // this.save(userTransaction, "TRANSACTIONS");
  },

  /**
 * Find object from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  async findTransactionById(id) {
    const res = await dbs.query(DBQUERY.SELECT.TRANSACTION.ID([id]));
    return res;
    // return this.getTransactions().find(field => field.id === Value);
  },

  //   /**
  //  * Find object from database
  //  * @param {number} value - the value to be matched
  //  * @return {obj}    - returns a account obj that meets the pararmeters specified
  //  */
  //   findTransactionByAccountNumber(Value) {
  //     return this.getTransactions().find(field => field.accountNumber === Value);
  //   },

  /**
 * Find objects from database
 * @param {number} value - the value to be matched
 * @return {array}    - returns an array of accounts that meets the pararmeters specified
 */
  async findAllAccountTransactionsByAccountNumber(accountNumber) {
    const result = await dbs.getAll(DBQUERY.SELECT.TRANSACTION.ACCOUNTNUMBER([accountNumber]));
    return result;
    // return this.getTransactions().filter(obj => obj.accountNumber === Value);
  },

  /**
 * Find objects from database
 * @param {number} value - the value to be matched
 * @return {array}    - returns an array of account that meets the pararmeters specified
 */
  findAllAccountByStatus(Value) {
    return this.getAccounts().filter(obj => obj.status === Value);
  },
  /**
 * Find objects from database
 * @param {string} status - the status to be assigned
 * @param {number} value - the value to be matched
 * @return {array}    - returns an array of account that meets the pararmeters specified
 */
  async findAccountByStatus(status, accountNumber) {
    const res = await dbs.modifyDb(DBQUERY.UPDATE.ACCOUNT([status, accountNumber]));
    return res;
    // return this.getAccounts().filter(obj => obj.status === Value);
  },

  /**
 * Delete object from database
 * @param {obj} specificAccount - the account obj to be deleted
 */
  async deleteAccount(specificAccountNumber) {
    const response = await dbs.modifyDb(DBQUERY.DELETE.ACCOUNT([specificAccountNumber]));
    return response;
    // const allAccount = db.ACCOUNTS;
    // const index = allAccount.indexOf(specificAccount);
    // allAccount.splice(index, 1);
  },

  /**
 * Find object from database
 * @param {string} type - the array-object to be updated
 * @param {obj} account - the aqccount to be updated
 * @param {any} value - the value to be changed
 * @param {string} key - the key to be matched
 */
  updateDB(type, account, value, key) {
    const accountToChange = db[type.toUpperCase()].find(acc => acc.accountNumber === account.accountNumber);
    accountToChange[key] = value;
  },

  /**
 * Find object from database
 * @param {string} type - the array-object to be updated
 * @param {obj} account - the aqccount to be updated
 * @param {any} value - the value to be changed
 * @param {string} key - the key to be matched
 */
  updateAccountDB(accountNumber, key, value) {
    const accountToChange = db.ACCOUNTS.find(acc => acc.accountNumber === accountNumber);
    accountToChange[key] = value;
  },
  /**
 * Find object from database
 * @param {string} type - the array-object to be updated
 * @param {obj} account - the aqccount to be updated
 * @param {any} value - the value to be changed
 * @param {string} key - the key to be matched
 */
  // updateAccountDB(accountNumber, key, value) {
  //   const accountToChange = db.ACCOUNTS.find(acc => acc.accountNumber === accountNumber);
  //   accountToChange[key] = value;
  // },
  /**
 * Find object from database
 * @param {obj} number - the account number of the account to be updated
 * @param {number} balance - the value to be changed
 * @param {string} key - the key to be matched
 */
  async updateBalance(balance, accountNumber) {
    const res = await dbs.queryDb(DBQUERY.UPDATE.BALANCE([balance, accountNumber]));
    return res;
    // accountToChange[key] = value;
  },
};
