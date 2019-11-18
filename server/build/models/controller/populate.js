"use strict";

var _db = _interopRequireDefault(require("../db/db"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var execute = function execute() {
  return regeneratorRuntime.async(function execute$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _db["default"].createTable(_index.POPULATETABLES);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

execute();