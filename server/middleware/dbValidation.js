import data from "../controllers/dbController";

const error = (res, status, msg) => res.status(status).json({
  status,
  error: msg,
});

module.exports = {
  accountCheck(req, res, next) {
    const account = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
    if (!account) {
      return error(res, 400, "Invalid account number");
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
  signin(req, res, next) {
    const staff = data.findStaff("email", req.body.email);
    const User = data.findOneUser("email", req.body.email);
    if (staff) {
      req.body.User = staff;
      next();
    } else if (User) {
      req.body.User = User;
      next();
    }
    return error(res, 401, "Auth failed");
  },
  db(req, res, next) {
    req.body.datafield = data.getAccounts();
    if (req.body.datafield.length === 0) {
      return error(res, 404, "Database Error");
    }
    if (req.query.status) {
      req.body.datafield = data.findAllAccountByStatus(req.query.status);
    }
    next();
  },
};
