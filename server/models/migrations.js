import db from "./database";





module.exports = {
  getUsers() {
    return db.USER;
  }
}