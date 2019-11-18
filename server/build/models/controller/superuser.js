"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../db/db"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var execute = function execute() {
  var hash, res, query;
  return regeneratorRuntime.async(function execute$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hash = _bcryptjs["default"].hashSync(process.env.superuserPassword, 10);
          _context.next = 3;
          return regeneratorRuntime.awrap(_db["default"].createTable(_index.CREATETABLES));

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
          return regeneratorRuntime.awrap(_db["default"].insertTable(query));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

execute();
var _default = execute;
exports["default"] = _default;