"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _dbValidation = _interopRequireDefault(require("../middleware/dbValidation"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

var _validation = _interopRequireDefault(require("../middleware/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // /////////////////////////////////////////////
// View all Account Owned by a Specific User //
// ///////////////////////////////////////////


router.get("/user/:email/accounts", _authorization["default"].user, _validation["default"].email, _dbValidation["default"].email, _userController["default"].getAccounts); // ////////////////
// Create Staff //
// //////////////

router.post("/users", _authorization["default"].admin, _validation["default"].checkStaff, _dbValidation["default"].checkStaff, _userController["default"].createUser);
router.get("/:email/user", _authorization["default"].staff_admin, _validation["default"].email, _dbValidation["default"].email, _userController["default"].getUser);
var _default = router;
exports["default"] = _default;