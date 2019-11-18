"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    value: function createTable(type) {
      return regeneratorRuntime.async(function createTable$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.pool.query(type));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "insertTable",
    value: function insertTable(query, values) {
      var result;
      return regeneratorRuntime.async(function insertTable$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.pool.query(query, values));

            case 2:
              result = _context2.sent;
              return _context2.abrupt("return", result.rows[0]);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "modifyDb",
    value: function modifyDb(query) {
      var result;
      return regeneratorRuntime.async(function modifyDb$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.pool.query(query));

            case 2:
              result = _context3.sent;
              return _context3.abrupt("return", result.rows[0]);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "queryDb",
    value: function queryDb(query) {
      var result;
      return regeneratorRuntime.async(function queryDb$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.pool.query(query));

            case 2:
              result = _context4.sent;
              return _context4.abrupt("return", result.rows[0]);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getAll",
    value: function getAll(query) {
      var result;
      return regeneratorRuntime.async(function getAll$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.pool.query(query));

            case 2:
              result = _context5.sent;
              return _context5.abrupt("return", result.rows);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteTable",
    value: function deleteTable(table) {
      var queryText;
      return regeneratorRuntime.async(function deleteTable$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              queryText = "DELETE FROM ".concat(table);
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.pool.query(queryText));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: "initConn",
    value: function initConn() {
      var obj = {
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DBPORT,
        host: process.env.HOST,
        ssl: true
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