"use strict";

var _database = require("../models/database");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getUsers: function getUsers() {
    return JSON.parse(JSON.stringify(_database2.default.USERS));
  },
  getAccounts: function getAccounts() {
    return JSON.parse(JSON.stringify(_database2.default.ACCOUNTS));
  },
  getTransactions: function getTransactions() {
    return JSON.parse(JSON.stringify(_database2.default.TRANSACTIONS));
  },
  save: function save(obj, model) {
    _database2.default[model].push(obj);
  },
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
    this.save(user, "USERS");
  },
  findOneUser: function findOneUser(Key, Value) {
    return this.getUsers().find(function (field) {
      return field[Key] === Value;
    });
  },
  createAccount: function createAccount(id, accountNumber, createdOn, owner, status, firstName, lastName, email, type, balance, phoneNumber, dob, address) {
    var userAccount = {
      id: id,
      accountNumber: accountNumber,
      createdOn: createdOn,
      owner: owner,
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
  findAccountById: function findAccountById(Value) {
    return this.getAccounts().find(function (field) {
      return field.owner === Value;
    });
  },
  findAccountByAccountNumber: function findAccountByAccountNumber(accountNumber) {
    return this.getAccounts().find(function (field) {
      return field.accountNumber === accountNumber;
    });
  },
  createTransaction: function createTransaction(id, createdOn, type, accountNumber,
  //cashier,
  amount, oldBalance, newBalance, depositor, phoneNumber) {
    var userTransaction = {
      id: id,
      createdOn: createdOn,
      type: type,
      accountNumber: accountNumber,
      //cashier,
      amount: amount,
      oldBalance: oldBalance,
      newBalance: newBalance,
      depositor: depositor,
      phoneNumber: phoneNumber
    };
    this.save(userTransaction, "TRANSACTIONS");
  },
  findTransactionById: function findTransactionById(Value) {
    return this.getTransactions().find(function (field) {
      return field.id === Value;
    });
  },
  findTransactionByAccountNumber: function findTransactionByAccountNumber(Value) {
    return this.getTransactions().find(function (field) {
      return field.accountNumber === Value;
    });
  },
  deleteAccount: function deleteAccount(specificAccount) {
    var allAccount = _database2.default.ACCOUNTS;
    var index = allAccount.indexOf(specificAccount);
    allAccount.splice(index, 1);
  }
};