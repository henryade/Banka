"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../db/db"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var execute =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var hash, res, query;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hash = _bcryptjs["default"].hashSync(process.env.superuserPassword, 10);
            _context.next = 3;
            return _db["default"].createTable(_index.CREATETABLES);

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
            return _db["default"].insertTable(query);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function execute() {
    return _ref.apply(this, arguments);
  };
}();

execute();
var _default = execute;
exports["default"] = _default;