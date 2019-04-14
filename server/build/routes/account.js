"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _accountController = require("../controllers/accountController");

var _accountController2 = _interopRequireDefault(_accountController);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", _accountController2.default.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", _accountController2.default.changeAccountStatus);

// ////////////////////////
/// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", _accountController2.default.deleteAccount);

module.exports = router;