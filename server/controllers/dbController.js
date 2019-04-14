import db from "../models/database";

module.exports = {
  getUsers() {
    return JSON.parse(JSON.stringify(db.USERS.USER));
  },
  getAccounts() {
    return JSON.parse(JSON.stringify(db.ACCOUNTS));
  },
  getTransactions() {
    return JSON.parse(JSON.stringify(db.TRANSACTIONS));
  },
  getStaff() {
    return JSON.parse(JSON.stringify(db.USERS.STAFF));
  },
  getAdmin() {
    return JSON.parse(JSON.stringify(db.USERS.ADMIN));
  },
  save(obj, model) {
    if (model === "USER") db.USERS.USER.push(obj);
    db[model].push(obj);
  },
  saveUser(obj) {
    if (obj.isAdmin === true) db.USERS.ADMIN.push(obj);
    else if (obj.isAdmin === false && obj.type.toLowerCase() === "staff") db.USERS.STAFF.push(obj);
    else db.USERS.USER.push(obj);
  },
  createUser(
    token,
    id,
    firstName,
    lastName,
    email,
    password,
    type,
    isAdmin,
  ) {
    const user = {
      token,
      id,
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin,
    };
    this.saveUser(user);
  },
  findOneUser(Key, Value) {
    return this.getUsers().find(field => field[Key] === Value);
  },
  createAccount(
    id,
    accountNumber,
    createdOn,
    owner,
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
    const userAccount = {
      id,
      accountNumber,
      createdOn,
      owner,
      status,
      firstName,
      lastName,
      email,
      balance,
      phoneNumber,
      dob,
      address,
      type,

    };
    this.save(userAccount, "ACCOUNTS");
  },
  findAccountById(Value) {
    return this.getAccounts().find(field => field.owner === Value);
  },
  findAccountByAccountNumber(accountNumber) {
    return this.getAccounts().find(field => field.accountNumber === accountNumber);
  },
  createTransaction(
    id,
    createdOn,
    type,
    accountNumber,
    // cashier,
    amount,
    oldBalance,
    newBalance,
    depositor,
    phoneNumber,
  ) {
    const userTransaction = {
      id,
      createdOn,
      type,
      accountNumber,
      // cashier,
      amount,
      oldBalance,
      newBalance,
      depositor,
      phoneNumber,
    };
    this.save(userTransaction, "TRANSACTIONS");
  },
  findTransactionById(Value) {
    return this.getTransactions().find(field => field.id === Value);
  },
  findTransactionByAccountNumber(Value) {
    return this.getTransactions().find(field => field.accountNumber === Value);
  },
  deleteAccount(specificAccount) {
    const allAccount = db.ACCOUNTS;
    const index = allAccount.indexOf(specificAccount);
    allAccount.splice(index, 1);
  },
};
