"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _account = require("./routes/account");

var _account2 = _interopRequireDefault(_account);

var _transaction = require("./routes/transaction");

var _transaction2 = _interopRequireDefault(_transaction);

var _index = require("./routes/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use("/api/v1", _transaction2.default);
app.use("/api/v1", _account2.default);
app.use("/api/v1", _index2.default);

app.get("/", function (req, res) {
  res.send("Home Page");
});
app.use("*", function (req, res, next) {
  var err = new Error("Page Not Found");
  res.status(404).json({
    status: 404,
    message: "Page Not Found"
  });
});

exports.default = app;