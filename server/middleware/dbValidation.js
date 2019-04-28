import data from "../controllers/dbController";
import dbs from "../models/db/db";
import { DBQUERY } from "../models/controller";

const error = (res, status, msg) => res.status(status).json({
  status,
  error: msg,
});

exports.accountCheck = async (req, res, next) => {
  const account = await data.findAccountByAccountNumber(parseInt(req.params.accountNumber, 10));

  if (!account) {
    return error(res, 404, "Account Not Found");
  }
  req.account = account;
  next();
  return null;
};
exports.checkUser = async (req, res, next) => {
  const User = await data.findOneUser(req.body.email);
  if (User) {
    return error(res, 400, "email already exist");
  }
  next();
  return null;
};
exports.checkStaff = async (req, res, next) => {
  const User = await data.findStaff(req.body.email, "staff");
  if (User) {
    return error(res, 400, "email already exist");
  }
  next();
  return null;
};
exports.signin = async (req, res, next) => {
  const User = await dbs.queryDb(DBQUERY.SELECT.USER.EMAIL([req.body.email]));
  if (User === undefined) {
    return error(res, 401, "Auth failed");
  }
  req.body.User = User;
  next();
  return null;
};
exports.db = async (req, res, next) => {
  try {
    req.body.datafield = await data.getAccounts([req.query.status]);
  } catch (err) {
    return res.status(400).json({
      status: 400,
      err,
    });
  }
  next();
  return null;
};
exports.email = async (req, res, next) => {
  const response = await data.findAccountByEmail(req.params.email);
  if (response.length === 0 || response[0] === undefined) {
    return error(res, 400, "Email not found");
  }

  next();
  return null;
};
