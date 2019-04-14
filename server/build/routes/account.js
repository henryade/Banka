"use strict";

var _express = _interopRequireDefault(require("express"));

var _accountController = _interopRequireDefault(require("../controllers/accountController"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}

var router = _express["default"].Router(); // ///////////////////
// Create Account //
// /////////////////


router.post("/accounts", _accountController["default"].createAccount); // ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber/activate", _accountController["default"].activateAccount);
router.patch("/accounts/:accountNumber/deactivate", _accountController["default"].deactivateAccount); // ////////////////////////
// /// Delete Account ///
// //////////////////////

router["delete"]("/accounts/:accountNumber", _accountController["default"].deleteAccount);
module.exports = router;