"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userController = require("../controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

var _dbValidation = require("../middleware/dbValidation");

var _dbValidation2 = _interopRequireDefault(_dbValidation);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// /////////////////////////////////////////////
// View all Account Owned by a Specific User //
// ///////////////////////////////////////////

router.get("/user/:email/accounts", _authorization2.default.user, _validation2.default.email, _dbValidation2.default.email, _userController2.default.getAccounts);

// ////////////////
// Create Staff //
// //////////////

router.post("/users", _authorization2.default.admin, _validation2.default.checkStaff, _dbValidation2.default.checkStaff, _userController2.default.createUser);

router.get("/:email/user", _authorization2.default.staff_admin, _validation2.default.email, _dbValidation2.default.email, _userController2.default.getUser);

exports.default = router;