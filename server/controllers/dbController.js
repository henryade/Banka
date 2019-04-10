import db from "../models/database";

module.exports = {
  getUsers() {
    return db.USER;
  },
  save(obj) {
    db.USER.push(obj);
  },
  createUser(
    token,
    id,
    firstName,
    lastName,
    email,
    password,
  ) {
    const user = {
      token,
      id,
      firstName,
      lastName,
      email,
      password,
    };
    this.save(user);
  },
  findOneUser(Key, Value) {
    return this.getUsers().find(field => field[Key] === Value);
  },
};
