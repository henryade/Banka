"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _db = require("../db/db");

var _db2 = _interopRequireDefault(_db);

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var execute = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var hash, res, query;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hash = _bcryptjs2.default.hashSync(process.env.superuserPassword, 10);
            _context.next = 3;
            return _db2.default.createTable(_index.CREATETABLES);

          case 3:
            res = _context.sent;
            query = {
              text: "INSERT INTO users(\"firstName\",\"lastName\",email,password,type,\"isAdmin\") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
              values: [process.env.firstName, process.env.lastName, process.env.superuserEmail, hash, "staff", true]
            };

            if (!(res === undefined)) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return _db2.default.insertTable(query);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function execute() {
    return _ref.apply(this, arguments);
  };
}();
execute();
exports.default = execute;