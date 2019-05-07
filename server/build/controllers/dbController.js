"use strict";

var _db = require("../models/db/db");

var _db2 = _interopRequireDefault(_db);

var _controller = require("../models/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  /**
  * Gets all accounts
  * @return {obj}    - returns a copy of all accounts
  */
  getAccounts: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _db2.default.getAll(_controller.DBQUERY.GETALL.ACCOUNT(values));

            case 2:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAccounts(_x) {
      return _ref.apply(this, arguments);
    }

    return getAccounts;
  }(),


  /**
  * Create a User
  * @param {obj} obj - object to be saved
  */
  createUser: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(firstName, lastName, email, password, type, isAdmin) {
      var user, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = [firstName, lastName, email, password, type, isAdmin];
              _context2.next = 3;
              return _db2.default.insertTable(_controller.DBQUERY.INSERT.USER(user));

            case 3:
              res = _context2.sent;
              return _context2.abrupt("return", res);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createUser(_x2, _x3, _x4, _x5, _x6, _x7) {
      return _ref2.apply(this, arguments);
    }

    return createUser;
  }(),


  /**
  * find object from database
  * @param {string} key - the key reference to be checked
  * @param {string} value - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findOneUser: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email) {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _db2.default.queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([email]));

            case 2:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function findOneUser(_x8) {
      return _ref3.apply(this, arguments);
    }

    return findOneUser;
  }(),
  findOwner: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _db2.default.queryDb(_controller.DBQUERY.SELECT.USER.ID([id]));

            case 2:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function findOwner(_x9) {
      return _ref4.apply(this, arguments);
    }

    return findOwner;
  }(),
  findStaff: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(email, type) {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = {};
              _context5.prev = 1;
              _context5.next = 4;
              return _db2.default.queryDb(_controller.DBQUERY.SELECT.USER.TYPE([email, type]));

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
      }, _callee5, this, [[1, 7]]);
    }));

    function findStaff(_x10, _x11) {
      return _ref5.apply(this, arguments);
    }

    return findStaff;
  }(),


  /**
  * Create a Account
  * @param {obj} obj - object to be saved
  */
  createAccount: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email, accountNumber, createdOn, owner, status, type, balance) {
      var userAccount, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userAccount = [email, accountNumber, owner, type, createdOn, status, balance];
              _context6.next = 3;
              return _db2.default.insertTable(_controller.DBQUERY.INSERT.ACCOUNT(userAccount));

            case 3:
              res = _context6.sent;
              return _context6.abrupt("return", res);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function createAccount(_x12, _x13, _x14, _x15, _x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    }

    return createAccount;
  }(),


  /**
  * Find object from database
  * @param {string} value - the value to be matched
  * @return {array}    - returns an array of account that meets the pararmeters specified
  */
  findAccountByEmail: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(email) {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _db2.default.getAll(_controller.DBQUERY.SELECT.ACCOUNT.EMAIL([email]));

            case 2:
              res = _context7.sent;
              return _context7.abrupt("return", res);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function findAccountByEmail(_x19) {
      return _ref7.apply(this, arguments);
    }

    return findAccountByEmail;
  }(),


  /**
  * Find object from database
  * @param {string} key - the value to be matched
  * @param {any} value - the value to be matched
  * @param {string} key1 - the value to be matched
  * @param {any} value1 - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findAccount: function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(type, email) {
      var res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _db2.default.modifyDb(_controller.DBQUERY.SELECT.ACCOUNT.TYPE([type, email]));

            case 2:
              res = _context8.sent;
              return _context8.abrupt("return", res);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function findAccount(_x20, _x21) {
      return _ref8.apply(this, arguments);
    }

    return findAccount;
  }(),

  /**
  * Find object from database
  * @param {number} accountNumber - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findAccountByAccountNumber: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(accountNumber) {
      var response;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _db2.default.queryDb(_controller.DBQUERY.SELECT.ACCOUNT.ACCOUNTNUMBER([accountNumber]));

            case 2:
              response = _context9.sent;
              return _context9.abrupt("return", response);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function findAccountByAccountNumber(_x22) {
      return _ref9.apply(this, arguments);
    }

    return findAccountByAccountNumber;
  }(),


  /**
  * Create a Transaction
  * @param {obj} obj - object to be saved
  */
  createTransaction: function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance, depositor, phoneNumber) {
      var userTransaction, res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              userTransaction = [type, accountNumber, cashier, amount, oldBalance, newBalance, createdOn, depositor, phoneNumber];
              _context10.next = 3;
              return _db2.default.insertTable(_controller.DBQUERY.INSERT.TRANSACTION(userTransaction));

            case 3:
              res = _context10.sent;
              return _context10.abrupt("return", res);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function createTransaction(_x23, _x24, _x25, _x26, _x27, _x28, _x29, _x30, _x31) {
      return _ref10.apply(this, arguments);
    }

    return createTransaction;
  }(),


  /**
  * Find object from database
  * @param {number} value - the value to be matched
  * @return {obj}    - returns a account obj that meets the pararmeters specified
  */
  findTransactionById: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(id) {
      var res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _db2.default.queryDb(_controller.DBQUERY.SELECT.TRANSACTION.ID([id]));

            case 2:
              res = _context11.sent;
              return _context11.abrupt("return", res);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function findTransactionById(_x32) {
      return _ref11.apply(this, arguments);
    }

    return findTransactionById;
  }(),


  /**
  * Find objects from database
  * @param {number} value - the value to be matched
  * @return {array}    - returns an array of accounts that meets the pararmeters specified
  */
  findAllAccountTransactionsByAccountNumber: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(accountNumber) {
      var result;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _db2.default.getAll(_controller.DBQUERY.SELECT.TRANSACTION.ACCOUNTNUMBER([accountNumber]));

            case 2:
              result = _context12.sent;
              return _context12.abrupt("return", result);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function findAllAccountTransactionsByAccountNumber(_x33) {
      return _ref12.apply(this, arguments);
    }

    return findAllAccountTransactionsByAccountNumber;
  }(),

  /**
  * Find objects from database
  * @param {string} status - the status to be assigned
  * @param {number} value - the value to be matched
  * @return {array}    - returns an array of account that meets the pararmeters specified
  */
  findAccountByStatus: function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(status, accountNumber) {
      var res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _db2.default.modifyDb(_controller.DBQUERY.UPDATE.ACCOUNT([status, accountNumber]));

            case 2:
              res = _context13.sent;
              return _context13.abrupt("return", res);

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function findAccountByStatus(_x34, _x35) {
      return _ref13.apply(this, arguments);
    }

    return findAccountByStatus;
  }(),


  /**
  * Delete object from database
  * @param {obj} specificAccount - the account obj to be deleted
  */
  deleteAccount: function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(specificAccountNumber) {
      var response;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _db2.default.modifyDb(_controller.DBQUERY.DELETE.ACCOUNT([specificAccountNumber]));

            case 2:
              response = _context14.sent;
              return _context14.abrupt("return", response);

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function deleteAccount(_x36) {
      return _ref14.apply(this, arguments);
    }

    return deleteAccount;
  }(),
  deleteUser: function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(email) {
      var response;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return _db2.default.modifyDb(_controller.DBQUERY.DELETE.USER([email]));

            case 2:
              response = _context15.sent;
              return _context15.abrupt("return", response);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function deleteUser(_x37) {
      return _ref15.apply(this, arguments);
    }

    return deleteUser;
  }(),

  /**
  * Find object from database
  * @param {obj} number - the account number of the account to be updated
  * @param {number} balance - the value to be changed
  * @param {string} key - the key to be matched
  */
  updateBalance: function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(balance, accountNumber) {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _db2.default.queryDb(_controller.DBQUERY.UPDATE.BALANCE([balance, accountNumber]));

            case 2:
              res = _context16.sent;
              return _context16.abrupt("return", res);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function updateBalance(_x38, _x39) {
      return _ref16.apply(this, arguments);
    }

    return updateBalance;
  }()
};