"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Model =
/*#__PURE__*/
function () {
  function Model() {
    _classCallCheck(this, Model);

    this.pool = Model.initConn();
  }

  _createClass(Model, [{
    key: "createTable",
    value: function () {
      var _createTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(type) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.pool.query(type);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createTable(_x) {
        return _createTable.apply(this, arguments);
      }

      return createTable;
    }()
  }, {
    key: "insertTable",
    value: function () {
      var _insertTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(query, values) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.pool.query(query, values);

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result.rows[0]);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function insertTable(_x2, _x3) {
        return _insertTable.apply(this, arguments);
      }

      return insertTable;
    }()
  }, {
    key: "modifyDb",
    value: function () {
      var _modifyDb = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(query) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.pool.query(query);

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result.rows[0]);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function modifyDb(_x4) {
        return _modifyDb.apply(this, arguments);
      }

      return modifyDb;
    }()
  }, {
    key: "queryDb",
    value: function () {
      var _queryDb = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(query) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.pool.query(query);

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result.rows[0]);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function queryDb(_x5) {
        return _queryDb.apply(this, arguments);
      }

      return queryDb;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(query) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.pool.query(query);

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", result.rows);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAll(_x6) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "deleteTable",
    value: function () {
      var _deleteTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(table) {
        var queryText;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                queryText = "DELETE FROM ".concat(table);
                _context6.next = 3;
                return this.pool.query(queryText);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteTable(_x7) {
        return _deleteTable.apply(this, arguments);
      }

      return deleteTable;
    }()
  }], [{
    key: "initConn",
    value: function initConn() {
      var obj = {
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DBPORT,
        host: process.env.HOST
      };
      var pool = new _pg.Pool(obj);
      return pool;
    }
  }]);

  return Model;
}();

var model = new Model();
var _default = model;
exports["default"] = _default;