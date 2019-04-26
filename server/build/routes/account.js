"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _accountController = require("../controllers/accountController");

var _accountController2 = _interopRequireDefault(_accountController);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

var _dbValidation = require("../middleware/dbValidation");

var _dbValidation2 = _interopRequireDefault(_dbValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// ///////////////////
// View All Account //
// /////////////////

router.get("/accounts", _authorization2.default.staff_admin, _validation2.default.allAccount, _dbValidation2.default.db, _accountController2.default.viewAllAccount);

// /////////////////////////
// View specific Account //
// ///////////////////////

router.get("/accounts/:accountNumber", _authorization2.default.staff_admin, _dbValidation2.default.accountCheck, _accountController2.default.viewSpecificAccount);

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", _validation2.default.createAccount, _authorization2.default.user, _accountController2.default.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", _authorization2.default.staff_admin, _validation2.default.changeAccountStatus, _dbValidation2.default.accountCheck, _accountController2.default.changeAccountStatus);

// ////////////////////////
/// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", _authorization2.default.staff_admin, _validation2.default.deleteAccount, _dbValidation2.default.accountCheck, _accountController2.default.deleteAccount);

module.exports = router;