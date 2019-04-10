import db from "../models/database";

module.exports = {
  getUsers() {
    const b = JSON.parse(JSON.stringify(db.USERS));
    return b;
  },
  getAccounts() {
    const a = JSON.parse(JSON.stringify(db.ACCOUNTS));
    return a;
  },
  save(obj, model) {
    db[model].push(obj);
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
    this.save(user, "USERS");
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
};
