import data from "../controllers/dbController";
import dbs from "../models/db/db";
import { DBQUERY } from "../models/controller";

const error = (res, status, msg) => res.status(status).json({
  status,
  error: msg,
});

module.exports = {
  async accountCheck(req, res, next) {
    const account = await data.findAccountByAccountNumber(parseInt(req.params.accountNumber));

    if (!account) {
      return error(res, 404, "Account Not Found");
    }
    req.account = account;
    next();
  },
  async checkUser(req, res, next) {
    const User = await data.findOneUser(req.body.email);
    if (User) {
      return error(res, 400, "email already exist");
    }
    next();
  },
  async checkStaff(req, res, next) {
    const User = await data.findStaff(req.body.email, "staff");
    if (User) {
      return error(res, 400, "email already exist");
    }
    next();
  },
  async signin(req, res, next) {
    const User = await dbs.queryDb(DBQUERY.SELECT.USER.EMAIL([req.body.email]));
    if (User === undefined) {
      return error(res, 401, "Auth failed");
    }
    req.body.User = User;
    next();
  },
  async db(req, res, next) {
    try {
      req.body.datafield = await data.getAccounts([req.query.status]);
    } catch (err) {
      console.log(err);
    }
    next();
  },
  async email(req, res, next) {
    const response = await data.findAccountByEmail(req.params.email);
    if (response.length === 0 || response[0] === undefined) {
      return error(res, 400, "Email not found");
    }

    next();
  },
};
