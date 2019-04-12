"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _account = _interopRequireDefault(require("./routes/account"));

var _transaction = _interopRequireDefault(require("./routes/transaction"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  res.send("Home Page");
});
app.use("/api/v1", _transaction["default"]);
app.use("/api/v1", _account["default"]);
app.use("/api/v1", _index["default"]);
var _default = app;
exports["default"] = _default;