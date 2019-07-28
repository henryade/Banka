"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _accountController = _interopRequireDefault(require("../controllers/accountController"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

var _validation = _interopRequireDefault(require("../middleware/validation"));

var _dbValidation = _interopRequireDefault(require("../middleware/dbValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // ///////////////////
// View All Account //
// /////////////////


router.get("/accounts", _authorization["default"].staff_admin, _validation["default"].allAccount, _dbValidation["default"].db, _accountController["default"].viewAllAccount); // /////////////////////////
// View specific Account //
// ///////////////////////

router.get("/accounts/:accountNumber", _authorization["default"].staff_admin, _dbValidation["default"].accountCheck, _accountController["default"].viewSpecificAccount); // ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", _validation["default"].createAccount, _authorization["default"].user, _accountController["default"].createAccount); // ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", _authorization["default"].staff_admin, _validation["default"].changeAccountStatus, _dbValidation["default"].accountCheck, _accountController["default"].changeAccountStatus); // ////////////////////////
// // Delete Account //////
// //////////////////////

router["delete"]("/accounts/:accountNumber", _authorization["default"].staff_admin, _validation["default"].deleteAccount, _dbValidation["default"].accountCheck, _accountController["default"].deleteAccount);
var _default = router;
exports["default"] = _default;