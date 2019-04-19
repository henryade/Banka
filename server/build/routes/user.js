"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _accountController = require("../controllers/accountController");

var _accountController2 = _interopRequireDefault(_accountController);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// /////////////////////////
// View all User Account //
// ///////////////////////

router.get("/userId/accounts");