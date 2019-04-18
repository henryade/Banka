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

// ///////////////////
// View All Account //
// /////////////////

router.get("/accounts", _accountController2.default.viewAllAccount);

// /////////////////////////
// View specific Account //
// ///////////////////////

router.get("/accounts/:accountNumber", _accountController2.default.viewSpecificAccount);

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", _validation2.default.createAccount, _accountController2.default.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", _validation2.default.changeAccountStatus, _accountController2.default.changeAccountStatus);

// ////////////////////////
/// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", _validation2.default.deleteAccount, _accountController2.default.deleteAccount);

module.exports = router;