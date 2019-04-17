"use strict";

var _database = require("../models/database");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  /**
   * Gets all users
   * @return {obj}    - returns a copy of all users
   */
  getUsers: function getUsers() {
    return JSON.parse(JSON.stringify(_database2.default.USERS.USER));
  },

  /**
   * Gets all accounts
   * @return {obj}    - returns a copy of all accounts
   */
  getAccounts: function getAccounts() {
    return JSON.parse(JSON.stringify(_database2.default.ACCOUNTS));
  },


  /**
   * Gets all transactions
   * @return {obj}    - returns a copy of all transactions.
   */
  getTransactions: function getTransactions() {
    return JSON.parse(JSON.stringify(_database2.default.TRANSACTIONS));
  },


  /**
   * Gets all staff
   * @return {obj}    - returns a copy of all staff
   */

  // getStaff() {
  //   return JSON.parse(JSON.stringify(db.USERS.STAFF));
  // },

  // getAdmin() {
  //   return JSON.parse(JSON.stringify(db.USERS.ADMIN));
  // },

  /**
  * Saves object to database
  * @param {obj} obj - object to be saved
  * @param {string} model - the dictionary name the object is to be saved
  */

  save: function save(obj, model) {
    if (model.toUpperCase() === "USER") _database2.default.USERS.USER.push(obj);
    _database2.default[model].push(obj);
  },


  /**
  * Saves object to user array-object in database
  * @param {obj} obj - object to be saved
  */

  saveUser: function saveUser(obj) {
    if (obj.isAdmin === true) _database2.default.USERS.ADMIN.push(obj);else if (obj.isAdmin === false && obj.type.toLowerCase() === "staff") _database2.default.USERS.STAFF.push(obj);else _database2.default.USERS.USER.push(obj);
  },


  /**
   * Create a User
   * @param {obj} obj - object to be saved
   */
  createUser: function createUser(token, id, firstName, lastName, email, password, type, isAdmin) {
    var user = {
      token: token,
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      type: type,
      isAdmin: isAdmin
    };
    this.saveUser(user);
  },


  /**
   * find object from database
   * @param {string} key - the key reference to be checked
   * @param {string} value - the value to be matched
   * @return {obj}    - returns a account obj that meets the pararmeters specified
   */
  findOneUser: function findOneUser(Key, Value) {
    return this.getUsers().find(function (field) {
      return field[Key] === Value;
    });
  },


  /**
   * Create a Account
   * @param {obj} obj - object to be saved
   */
  createAccount: function createAccount(id, accountNumber, createdOn, owner, gender, status, firstName, lastName, email, type, balance, phoneNumber, dob, address) {
    var userAccount = {
      id: id,
      accountNumber: accountNumber,
      createdOn: createdOn,
      owner: owner,
      gender: gender,
      status: status,
      firstName: firstName,
      lastName: lastName,
      email: email,
      balance: balance,
      phoneNumber: phoneNumber,
      dob: dob,
      address: address,
      type: type

    };
    this.save(userAccount, "ACCOUNTS");
  },


  /**
   * Find object from database
   * @param {number} value - the value to be matched
   * @return {obj}    - returns a account obj that meets the pararmeters specified
   */
  findAccountById: function findAccountById(Value) {
    return this.getAccounts().find(function (field) {
      return field.owner === Value;
    });
  },


  /**
   * Find object from database
   * @param {number} accountNumber - the value to be matched
   * @return {obj}    - returns a account obj that meets the pararmeters specified
   */
  findAccountByAccountNumber: function findAccountByAccountNumber(accountNumber) {
    return this.getAccounts().find(function (field) {
      return field.accountNumber === accountNumber;
    });
  },


  /**
   * Create a Transaction
   * @param {obj} obj - object to be saved
   */
  createTransaction: function createTransaction(id, createdOn, type, accountNumber,
  // cashier,
  amount, oldBalance, newBalance, depositor, phoneNumber) {
    var userTransaction = {
      id: id,
      createdOn: createdOn,
      type: type,
      accountNumber: accountNumber,
      // cashier,
      amount: amount,
      oldBalance: oldBalance,
      newBalance: newBalance,
      depositor: depositor,
      phoneNumber: phoneNumber
    };
    this.save(userTransaction, "TRANSACTIONS");
  },


  /**
   * Find object from database
   * @param {number} value - the value to be matched
   * @return {obj}    - returns a account obj that meets the pararmeters specified
   */
  findTransactionById: function findTransactionById(Value) {
    return this.getTransactions().find(function (field) {
      return field.id === Value;
    });
  },


  /**
   * Find object from database
   * @param {number} value - the value to be matched
   * @return {obj}    - returns a account obj that meets the pararmeters specified
   */
  findTransactionByAccountNumber: function findTransactionByAccountNumber(Value) {
    return this.getTransactions().find(function (field) {
      return field.accountNumber === Value;
    });
  },

  /**
  * Delete object from database
  * @param {obj} specificAccount - the account obj to be deleted
  */
  deleteAccount: function deleteAccount(specificAccount) {
    var allAccount = _database2.default.ACCOUNTS;
    var index = allAccount.indexOf(specificAccount);
    allAccount.splice(index, 1);
  },


  /**
   * Find object from database
   * @param {string} type - the array-object to be updated
   * @param {obj} account - the aqccount to be updated
   * @param {any} value - the value to be changed
   * @param {string} key - the key to be matched
   */
  updateDB: function updateDB(type, account, value, key) {
    var accountToChange = _database2.default[type.toUpperCase()].find(function (acc) {
      return acc.accountNumber === account.accountNumber;
    });
    accountToChange[key] = value;
  }
};