import db from "../models/database";

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
  getAccounts() {
    return JSON.parse(JSON.stringify(db.ACCOUNTS));
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

  save(obj, model) {
    if (model.toUpperCase() === "USER") db.USERS.USER.push(obj);
    db[model].push(obj);
  },

  /**
 * Saves object to user array-object in database
 * @param {obj} obj - object to be saved
 */

  saveUser(obj) {
    if (obj.isAdmin === true) db.USERS.ADMIN.push(obj);
    else if (obj.isAdmin === false && obj.type.toLowerCase() === "staff") db.USERS.STAFF.push(obj);
    else db.USERS.USER.push(obj);
  },

  /**
 * Create a User
 * @param {obj} obj - object to be saved
 */
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

  /**
 * find object from database
 * @param {string} key - the key reference to be checked
 * @param {string} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findOneUser(Key, Value) {
    return this.getUsers().find(field => field[Key] === Value);
  },

  /**
 * Create a Account
 * @param {obj} obj - object to be saved
 */
  createAccount(
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
    const userAccount = {
      id,
      accountNumber,
      createdOn,
      owner,
      gender,
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

  /**
 * Find object from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findAccountById(Value) {
    return this.getAccounts().find(field => field.owner === Value);
  },

  /**
 * Find object from database
 * @param {number} accountNumber - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findAccountByAccountNumber(accountNumber) {
    return this.getAccounts().find(field => field.accountNumber === accountNumber);
  },

  /**
 * Create a Transaction
 * @param {obj} obj - object to be saved
 */
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

  /**
 * Find object from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findTransactionById(Value) {
    return this.getTransactions().find(field => field.id === Value);
  },

  /**
 * Find object from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findTransactionByAccountNumber(Value) {
    return this.getTransactions().find(field => field.accountNumber === Value);
  },

  /**
 * Find objects from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findAllAccountTransactionsByAccountNumber(Value) {
    return this.getTransactions().filter(obj => obj.accountNumber === Value);
  },

  /**
 * Find objects from database
 * @param {number} value - the value to be matched
 * @return {obj}    - returns a account obj that meets the pararmeters specified
 */
  findAllAccountByStatus(Value) {
    return this.getAccounts().filter(obj => obj.status === Value);
  },

  /**
 * Delete object from database
 * @param {obj} specificAccount - the account obj to be deleted
 */
  deleteAccount(specificAccount) {
    const allAccount = db.ACCOUNTS;
    const index = allAccount.indexOf(specificAccount);
    allAccount.splice(index, 1);
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
 * @param {number} accountNumber - the value to be matched
 * @param {obj} obj - the list of fields to be changed
 */
  // updateTransactionDB(accountNumber, obj) {
  //   const accountToChange = this.getTransactions().find(acc => acc.accountNumber === accountNumber);
  //   const account = this.getAccounts().find(acc => acc.accountNumber === parseInt(accountNumber));
  //   const changes = Object.entries(obj);

  //   for (let i = 0; i < changes.length; i += 1) {
  //     const [first, last] = changes[i];
  //     accountToChange[first] = last;
  //     // if (first === "newBalance") this.updateDB("accounts", account, last, "balance")
  //   }
  // },
};
