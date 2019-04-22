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
  checkUser(req, res, next) {
    const User = data.findOneUser("email", req.body.email);
    if (User) {
      return error(res, 400, "email already exist");
    }
    next();
  },
  checkStaff(req, res, next) {
    const User = data.findStaff("email", req.body.email);
    if (User) {
      return error(res, 400, "email already exist");
    }
    next();
  },
  async signin(req, res, next) {
    let User = {};
    try{
      User = await dbs.modifyDb(DBQUERY.SELECT.USER.EMAIL([req.body.email.toString()]));
      // console.log(User)
    } catch (err) {
      return error(res, 401, err);
    }
     
    // const staff = data.findStaff("email", req.body.email);
    // //  data.findOneUser("email", req.body.email);
    // if (staff) {
    //   req.body.User = staff;
    // } else if (User) {
      req.body.User = User;
    // } else {
    //   return error(res, 401, "Auth failed");
    // }
    next();
  },
 async db(req, res, next) {
    req.body.datafield = await data.getAccounts();
    // if (req.body.datafield.length === 0) {
    //   return error(res, 404, "Database Error");
    // }
    if (req.query.status) {
      req.body.datafield = data.findAllAccountByStatus(req.query.status);
    }
    next();
  },
  email(req, res, next) {
    if (data.findAccountByEmail(req.params.email).length === 0) {

      return error(res, 400, "Email not found");
    }
    next();
  },
};
