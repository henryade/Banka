import dbs from "../models/db/db";
import { DBQUERY } from "../models/controller";

module.exports = {
  /**
 * Gets all accounts
 * @return {obj}    - returns a copy of all accounts
 */
  async getAccounts(values) {
    const res = await dbs.getAll(DBQUERY.GETALL.ACCOUNT(values));
    return res;
  },

  /**
 * Create a User
 * @param {obj} obj - object to be saved
 */
  async createUser(
    firstName,
    lastName,
    email,
    password,
    type,
    isAdmin,
  ) {
    const user = [
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
  async findOneUser(email) {
    const result = await dbs.queryDb(DBQUERY.SELECT.USER.EMAIL([email]));
    return result;
  },
<<<<<<< HEAD
  async findOwner(email) {
    const result = await dbs.queryDb(DBQUERY.SELECT.USER.OWNER([email]));
    return result.id;
=======
  async findOwner(id) {
    const result = await dbs.queryDb(DBQUERY.SELECT.USER.ID([id]));
    return result;
>>>>>>> ch-refactor-165853483
  },

  async findStaff(email, type) {
    let result = {};
    try {
      result = await dbs.queryDb(DBQUERY.SELECT.USER.TYPE([email, type]));
    } catch (err) {
      return err;
    }
    return result;
  },

  /**
 * Create a Account
 * @param {obj} obj - object to be saved
 */
  async createAccount(
    email,
    accountNumber,
    createdOn,
    owner,
    status,
    type,
    balance,
  ) {
    const userAccount = [
      email,
      accountNumber,
      owner,
      type,
      createdOn,
      status,
      balance,
    ];
    const res = await dbs.insertTable(DBQUERY.INSERT.ACCOUNT(userAccount));
    return res;
  },

  /**
 * Find object from database
 * @param {string} value - the value to be matched
 * @return {array}    - returns an array of account that meets the pararmeters specified
 */
  async findAccountByEmail(email) {
    const res = await dbs.getAll(DBQUERY.SELECT.ACCOUNT.EMAIL([email]));
    return res;
  },

  /**
 * Find object from database
 * @param {string} key - the value to be matched
 * @param {any} value - the value to be matched
 * @param {string} key1 - the value to be matched
 * @param {any} value1 - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
<<<<<<< HEAD
  async findAccount(type, accountNumber) {
    const res = await dbs.modifyDb(DBQUERY.SELECT.ACCOUNT.TYPE([type, accountNumber]));
=======
  async findAccount(type, email) {
    const res = await dbs.modifyDb(DBQUERY.SELECT.ACCOUNT.TYPE([type, email]));
>>>>>>> ch-refactor-165853483
    return res;
  },
  /**
 * Find object from database
 * @param {number} accountNumber - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  async findAccountByAccountNumber(accountNumber) {
    const response = await dbs.queryDb(DBQUERY.SELECT.ACCOUNT.ACCOUNTNUMBER([accountNumber]));
    return response;
  },

  /**
 * Create a Transaction
 * @param {obj} obj - object to be saved
 */
  async createTransaction(
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
    const res = await dbs.insertTable(DBQUERY.INSERT.TRANSACTION(userTransaction));
    return res;
  },

  /**
 * Find object from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  async findTransactionById(id) {
    const res = await dbs.queryDb(DBQUERY.SELECT.TRANSACTION.ID([id]));
    return res;
  },

  /**
 * Find objects from database
 * @param {number} value - the value to be matched
 * @return {array}    - returns an array of accounts that meets the pararmeters specified
 */
  async findAllAccountTransactionsByAccountNumber(accountNumber) {
    const result = await dbs.getAll(DBQUERY.SELECT.TRANSACTION.ACCOUNTNUMBER([accountNumber]));
    return result;
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
  },

  /**
 * Delete object from database
 * @param {obj} specificAccount - the account obj to be deleted
 */
  async deleteAccount(specificAccountNumber) {
    const response = await dbs.modifyDb(DBQUERY.DELETE.ACCOUNT([specificAccountNumber]));
    return response;
  },
  async deleteUser(email) {
    const response = await dbs.modifyDb(DBQUERY.DELETE.USER([email]));
    return response;
  },
  /**
 * Find object from database
 * @param {obj} number - the account number of the account to be updated
 * @param {number} balance - the value to be changed
 * @param {string} key - the key to be matched
 */
  async updateBalance(balance, accountNumber) {
    const res = await dbs.queryDb(DBQUERY.UPDATE.BALANCE([balance, accountNumber]));
    return res;
  },
};
