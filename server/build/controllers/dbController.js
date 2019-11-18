"use strict";

var _db = _interopRequireDefault(require("../models/db/db"));

var _controller = require("../models/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = {
  /**
  * Gets all accounts
  * @return {obj}    - returns a copy of all accounts
  */
  getAccounts: function getAccounts(values) {
    var res;
    return regeneratorRuntime.async(function getAccounts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_db["default"].getAll(_controller.DBQUERY.GETALL.ACCOUNT(values)));

          case 2:
            res = _context.sent;
            return _context.abrupt("return", res);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },

  /**
  * Create a User
  * @param {obj} obj - object to be saved
  */
  createUser: function createUser(firstName, lastName, email, password, type, isAdmin) {
    var user, res;
    return regeneratorRuntime.async(function createUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = [firstName, lastName, email, password, type, isAdmin];
            _context2.next = 3;
            return regeneratorRuntime.awrap(_db["default"].insertTable(_controller.DBQUERY.INSERT.USER(user)));

          case 3:
            res = _context2.sent;
            return _context2.abrupt("return", res);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },

  /**
  * find object from database
  * @param {string} key - the key reference to be checked
  * @param {string} value - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findOneUser: function findOneUser(email) {
    var result;
    return regeneratorRuntime.async(function findOneUser$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([email])));

          case 2:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  findOwner: function findOwner(id) {
    var result;
    return regeneratorRuntime.async(function findOwner$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.USER.ID([id])));

          case 2:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  findStaff: function findStaff(email, type) {
    var result;
    return regeneratorRuntime.async(function findStaff$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            result = {};
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.USER.TYPE([email, type])));

          case 4:
            result = _context5.sent;
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", _context5.t0);

          case 10:
            return _context5.abrupt("return", result);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 7]]);
  },

  /**
  * Create a Account
  * @param {obj} obj - object to be saved
  */
  createAccount: function createAccount(email, accountNumber, createdOn, owner, status, type, balance) {
    var userAccount, res;
    return regeneratorRuntime.async(function createAccount$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userAccount = [email, accountNumber, owner, type, createdOn, status, balance];
            _context6.next = 3;
            return regeneratorRuntime.awrap(_db["default"].insertTable(_controller.DBQUERY.INSERT.ACCOUNT(userAccount)));

          case 3:
            res = _context6.sent;
            return _context6.abrupt("return", res);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
  },

  /**
  * Find object from database
  * @param {string} value - the value to be matched
  * @return {array}    - returns an array of account that meets the pararmeters specified
  */
  findAccountByEmail: function findAccountByEmail(email) {
    var res;
    return regeneratorRuntime.async(function findAccountByEmail$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(_db["default"].getAll(_controller.DBQUERY.SELECT.ACCOUNT.EMAIL([email])));

          case 2:
            res = _context7.sent;
            return _context7.abrupt("return", res);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  },

  /**
  * Find object from database
  * @param {string} key - the value to be matched
  * @param {any} value - the value to be matched
  * @param {string} key1 - the value to be matched
  * @param {any} value1 - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findAccount: function findAccount(type, email) {
    var res;
    return regeneratorRuntime.async(function findAccount$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(_db["default"].modifyDb(_controller.DBQUERY.SELECT.ACCOUNT.TYPE([type, email])));

          case 2:
            res = _context8.sent;
            return _context8.abrupt("return", res);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    });
  },

  /**
  * Find object from database
  * @param {number} accountNumber - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findAccountByAccountNumber: function findAccountByAccountNumber(accountNumber) {
    var response;
    return regeneratorRuntime.async(function findAccountByAccountNumber$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.ACCOUNT.ACCOUNTNUMBER([accountNumber])));

          case 2:
            response = _context9.sent;
            return _context9.abrupt("return", response);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    });
  },

  /**
  * Create a Transaction
  * @param {obj} obj - object to be saved
  */
  createTransaction: function createTransaction(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance, depositor, phoneNumber) {
    var userTransaction, res;
    return regeneratorRuntime.async(function createTransaction$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            userTransaction = [type, accountNumber, cashier, amount, oldBalance, newBalance, createdOn, depositor, phoneNumber];
            _context10.next = 3;
            return regeneratorRuntime.awrap(_db["default"].insertTable(_controller.DBQUERY.INSERT.TRANSACTION(userTransaction)));

          case 3:
            res = _context10.sent;
            return _context10.abrupt("return", res);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    });
  },

  /**
  * Find object from database
  * @param {number} value - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findTransactionById: function findTransactionById(id) {
    var res;
    return regeneratorRuntime.async(function findTransactionById$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.TRANSACTION.ID([id])));

          case 2:
            res = _context11.sent;
            return _context11.abrupt("return", res);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    });
  },

  /**
  * Find objects from database
  * @param {number} value - the value to be matched
  * @return {array}    - returns an array of accounts that meets the pararmeters specified
  */
  findAllAccountTransactionsByAccountNumber: function findAllAccountTransactionsByAccountNumber(accountNumber) {
    var result;
    return regeneratorRuntime.async(function findAllAccountTransactionsByAccountNumber$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(_db["default"].getAll(_controller.DBQUERY.SELECT.TRANSACTION.ACCOUNTNUMBER([accountNumber])));

          case 2:
            result = _context12.sent;
            return _context12.abrupt("return", result);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    });
  },

  /**
  * Find objects from database
  * @param {string} status - the status to be assigned
  * @param {number} value - the value to be matched
  * @return {array}    - returns an array of account that meets the pararmeters specified
  */
  findAccountByStatus: function findAccountByStatus(status, accountNumber) {
    var res;
    return regeneratorRuntime.async(function findAccountByStatus$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return regeneratorRuntime.awrap(_db["default"].modifyDb(_controller.DBQUERY.UPDATE.ACCOUNT([status, accountNumber])));

          case 2:
            res = _context13.sent;
            return _context13.abrupt("return", res);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    });
  },

  /**
  * Find objects from database
  * @param {string} imageURL - the status to be assigned
  * @param {email} email - the string to be matched
  * @return {array}    - returns an array of account that meets the pararmeters specified
  */
  findUserByEmail: function findUserByEmail(image, email) {
    var res;
    return regeneratorRuntime.async(function findUserByEmail$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return regeneratorRuntime.awrap(_db["default"].modifyDb(_controller.DBQUERY.UPDATE.USER([image, email])));

          case 2:
            res = _context14.sent;
            return _context14.abrupt("return", res);

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    });
  },

  /**
  * Find objects from database
  * @param {string} imageURL - the status to be assigned
  * @param {email} email - the string to be matched
  * @return {array}    - returns an array of account that meets the pararmeters specified
  */
  findUserByEmailAndUpdate: function findUserByEmailAndUpdate(password, email) {
    var res;
    return regeneratorRuntime.async(function findUserByEmailAndUpdate$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return regeneratorRuntime.awrap(_db["default"].modifyDb(_controller.DBQUERY.UPDATE.PASSWORD([password, email])));

          case 2:
            res = _context15.sent;
            return _context15.abrupt("return", res);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    });
  },

  /**
  * Delete object from database
  * @param {obj} specificAccount - the account obj to be deleted
  */
  deleteAccount: function deleteAccount(specificAccountNumber) {
    var response;
    return regeneratorRuntime.async(function deleteAccount$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return regeneratorRuntime.awrap(_db["default"].modifyDb(_controller.DBQUERY.DELETE.ACCOUNT([specificAccountNumber])));

          case 2:
            response = _context16.sent;
            return _context16.abrupt("return", response);

          case 4:
          case "end":
            return _context16.stop();
        }
      }
    });
  },
  deleteUser: function deleteUser(email) {
    var response;
    return regeneratorRuntime.async(function deleteUser$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return regeneratorRuntime.awrap(_db["default"].modifyDb(_controller.DBQUERY.DELETE.USER([email])));

          case 2:
            response = _context17.sent;
            return _context17.abrupt("return", response);

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    });
  },

  /**
  * Find object from database
  * @param {obj} number - the account number of the account to be updated
  * @param {number} balance - the value to be changed
  * @param {string} key - the key to be matched
  */
  updateBalance: function updateBalance(balance, accountNumber) {
    var res;
    return regeneratorRuntime.async(function updateBalance$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.UPDATE.BALANCE([balance, accountNumber])));

          case 2:
            res = _context18.sent;
            return _context18.abrupt("return", res);

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    });
  }
};